/* =========================================
   ASR FOREVER — NODE.JS BACKEND SERVER
   Serves all multipage HTML/CSS/JS/images + REST APIs
   Persists PGRS grievances & community registrations in data/db.json
========================================= */

const http = require("node:http");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const ASR_DATA = require("./js/asr-data.js");

const PORT = Number(process.env.PORT) || 3000;
const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, "data");
const DB_PATH = path.join(DATA_DIR, "db.json");

const MIME_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".txt": "text/plain; charset=utf-8",
    ".ico": "image/x-icon"
};

let dbWriteQueue = Promise.resolve();

async function ensureDatabase() {
    await fsp.mkdir(DATA_DIR, { recursive: true });
    try {
        await fsp.access(DB_PATH, fs.constants.F_OK);
    } catch {
        const initialDb = {
            grievances: ASR_DATA.sampleGrievances,
            registrations: ASR_DATA.sampleCommunity,
            updatedAt: new Date().toISOString()
        };
        await fsp.writeFile(DB_PATH, JSON.stringify(initialDb, null, 2), "utf8");
    }
}

async function readDb() {
    await ensureDatabase();
    const raw = await fsp.readFile(DB_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return {
        grievances: Array.isArray(parsed.grievances) ? parsed.grievances : [],
        registrations: Array.isArray(parsed.registrations) ? parsed.registrations : []
    };
}

function writeDb(mutator) {
    dbWriteQueue = dbWriteQueue.then(async () => {
        const db = await readDb();
        const result = await mutator(db);
        db.updatedAt = new Date().toISOString();
        await fsp.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
        return result;
    });
    return dbWriteQueue;
}

function sendJson(res, statusCode, payload) {
    const body = JSON.stringify(payload, null, 2);
    res.writeHead(statusCode, {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    });
    res.end(body);
}

function parseJsonBody(req, maxBytes = 64 * 1024) {
    return new Promise((resolve, reject) => {
        let size = 0;
        const chunks = [];
        req.on("data", (chunk) => {
            size += chunk.length;
            if (size > maxBytes) {
                reject(Object.assign(new Error("Request body too large"), { statusCode: 413 }));
                req.destroy();
                return;
            }
            chunks.push(chunk);
        });
        req.on("end", () => {
            if (chunks.length === 0) {
                resolve({});
                return;
            }
            try {
                const text = Buffer.concat(chunks).toString("utf8");
                resolve(JSON.parse(text));
            } catch {
                reject(Object.assign(new Error("Invalid JSON body"), { statusCode: 400 }));
            }
        });
        req.on("error", reject);
    });
}

function cleanText(value, maxLen = 400) {
    if (typeof value !== "string") return "";
    return value.trim().replace(/\s+/g, " ").slice(0, maxLen);
}

function mapDepartment(category) {
    const map = {
        "Land & RoFR Records": "Revenue / ITDA Land Cell",
        "Road & Connectivity": "Panchayat Raj Engineering",
        "Health & Emergency": "DMHO / 108 & PHC Network",
        "PESA & Gram Sabha": "District Panchayat / MPDO",
        "Santha & Markets": "Gram Panchayat & GCC",
        "Schemes & Scholarships": "DTWO / Village Secretariat"
    };
    return map[category] || "District Collectorate / ITDA PGRS";
}

async function handleApi(req, res, urlObj) {
    const pathname = urlObj.pathname;
    const method = req.method.toUpperCase();

    if (method === "OPTIONS") {
        res.writeHead(204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        });
        res.end();
        return;
    }

    if (method === "GET" && pathname === "/api/health") {
        const db = await readDb();
        sendJson(res, 200, {
            ok: true,
            service: "ASR Forever Backend",
            timestamp: new Date().toISOString(),
            topicsCount: ASR_DATA.topics.length,
            grievancesCount: db.grievances.length,
            registrationsCount: db.registrations.length
        });
        return;
    }

    if (method === "GET" && pathname === "/api/stats") {
        const db = await readDb();
        const totalCards = ASR_DATA.topics.reduce((acc, t) => acc + t.cards.length, 0);
        sendJson(res, 200, {
            missions: ASR_DATA.topics.length,
            topicCards: totalCards,
            galleryItems: ASR_DATA.gallery.length,
            grievancesSubmitted: db.grievances.length,
            communityMembers: db.registrations.length
        });
        return;
    }

    if (method === "GET" && pathname === "/api/topics") {
        const query = cleanText(urlObj.searchParams.get("q") || "", 80).toLowerCase();
        const category = cleanText(urlObj.searchParams.get("category") || "", 60).toLowerCase();

        let results = ASR_DATA.topics;
        if (category && category !== "all") {
            results = results.filter((t) => t.category.toLowerCase() === category);
        }
        if (query) {
            results = results.filter((t) => {
                const inTopic =
                    t.title.toLowerCase().includes(query) ||
                    t.tagline.toLowerCase().includes(query) ||
                    t.category.toLowerCase().includes(query);
                const inCards = t.cards.some(
                    (c) =>
                        c.title.toLowerCase().includes(query) ||
                        c.shortDesc.toLowerCase().includes(query) ||
                        c.tag.toLowerCase().includes(query)
                );
                return inTopic || inCards;
            });
        }
        sendJson(res, 200, { count: results.length, topics: results });
        return;
    }

    if (method === "GET" && pathname.startsWith("/api/topics/")) {
        const slug = cleanText(pathname.slice("/api/topics/".length), 40).toLowerCase();
        const topic = ASR_DATA.topics.find((t) => t.slug === slug);
        if (!topic) {
            sendJson(res, 404, { error: "Topic not found" });
            return;
        }
        sendJson(res, 200, { topic });
        return;
    }

    if (method === "GET" && pathname === "/api/gallery") {
        const category = cleanText(urlObj.searchParams.get("category") || "", 40).toLowerCase();
        const items =
            category && category !== "all"
                ? ASR_DATA.gallery.filter((item) => item.category.toLowerCase() === category)
                : ASR_DATA.gallery;
        sendJson(res, 200, { count: items.length, items });
        return;
    }

    if (method === "GET" && pathname === "/api/grievances") {
        const db = await readDb();
        const mandal = cleanText(urlObj.searchParams.get("mandal") || "", 60).toLowerCase();
        const items = mandal
            ? db.grievances.filter((g) => g.mandal.toLowerCase() === mandal)
            : db.grievances;
        sendJson(res, 200, { count: items.length, grievances: items });
        return;
    }

    if (method === "GET" && pathname.startsWith("/api/grievances/")) {
        const refId = cleanText(pathname.slice("/api/grievances/".length), 40).toUpperCase();
        const db = await readDb();
        const found = db.grievances.find((g) => g.refId.toUpperCase() === refId);
        if (!found) {
            sendJson(res, 404, { error: `No grievance found for Reference ID ${refId}` });
            return;
        }
        sendJson(res, 200, { grievance: found });
        return;
    }

    if (method === "POST" && pathname === "/api/grievances") {
        const body = await parseJsonBody(req);
        const citizenName = cleanText(body.citizenName, 80);
        const mandal = cleanText(body.mandal, 60);
        const village = cleanText(body.village, 80);
        const category = cleanText(body.category, 60) || "General Grievance";
        const subject = cleanText(body.subject, 140);
        const description = cleanText(body.description, 800);

        if (!citizenName || !mandal || !subject || !description) {
            sendJson(res, 400, {
                error: "Please provide citizenName, mandal, subject, and description."
            });
            return;
        }

        const created = await writeDb((db) => {
            const suffix = String(1001 + db.grievances.length + crypto.randomInt(10, 99));
            const refId = `ASR-PGRS-2026-${suffix}`;
            const now = new Date().toISOString();
            const record = {
                refId,
                citizenName,
                mandal,
                village: village || "Main Habitation",
                category,
                department: mapDepartment(category),
                subject,
                description,
                status: "Submitted — Awaiting Officer Review",
                createdAt: now,
                updates: [
                    {
                        date: now.slice(0, 10),
                        note: `Registered via ASR Forever portal and routed to ${mapDepartment(category)}.`
                    }
                ]
            };
            db.grievances.unshift(record);
            return record;
        });

        sendJson(res, 201, { message: "Grievance submitted successfully", grievance: created });
        return;
    }

    if (method === "PATCH" && pathname.startsWith("/api/grievances/")) {
        const refId = cleanText(pathname.slice("/api/grievances/".length), 40).toUpperCase();
        const body = await parseJsonBody(req);
        const note = cleanText(body.note, 300);
        if (!note) {
            sendJson(res, 400, { error: "Follow-up note is required." });
            return;
        }
        const updated = await writeDb((db) => {
            const target = db.grievances.find((g) => g.refId.toUpperCase() === refId);
            if (!target) return null;
            target.updates.push({
                date: new Date().toISOString().slice(0, 10),
                note
            });
            target.status = "Follow-up Added — Under Review";
            return target;
        });
        if (!updated) {
            sendJson(res, 404, { error: `No grievance found for Reference ID ${refId}` });
            return;
        }
        sendJson(res, 200, { message: "Follow-up added", grievance: updated });
        return;
    }

    if (method === "GET" && pathname === "/api/community") {
        const db = await readDb();
        const topic = cleanText(urlObj.searchParams.get("topic") || "", 40).toLowerCase();
        const items = topic
            ? db.registrations.filter((r) => r.topic.toLowerCase() === topic)
            : db.registrations;
        sendJson(res, 200, { count: items.length, registrations: items });
        return;
    }

    if (method === "POST" && pathname === "/api/community") {
        const body = await parseJsonBody(req);
        const name = cleanText(body.name, 80);
        const mandal = cleanText(body.mandal, 60);
        const topic = cleanText(body.topic, 40).toLowerCase() || "general";
        const role = cleanText(body.role, 100);
        const phone = cleanText(body.phone, 20);
        const notes = cleanText(body.notes, 400);

        if (!name || !mandal || !role) {
            sendJson(res, 400, { error: "Please provide name, mandal, and role/interest." });
            return;
        }

        const created = await writeDb((db) => {
            const id = `REG-2026-${101 + db.registrations.length}`;
            const maskedPhone = phone
                ? phone.replace(/(\d{2})\d{4}(\d{2,4})/, "$1xxxx$2")
                : "Provided";
            const entry = {
                id,
                name,
                mandal,
                topic,
                role,
                phone: maskedPhone,
                notes: notes || "Registered via ASR Forever community portal.",
                createdAt: new Date().toISOString()
            };
            db.registrations.unshift(entry);
            return entry;
        });

        sendJson(res, 201, { message: "Registration saved", registration: created });
        return;
    }

    sendJson(res, 404, { error: "API endpoint not found" });
}

async function serveStatic(res, pathname) {
    const cleanPath = pathname === "/" ? "/index.html" : pathname;
    const safeRelPath = decodeURIComponent(cleanPath).replace(/^\/+/, "");
    const resolvedPath = path.resolve(ROOT_DIR, safeRelPath);

    // Prevent path traversal and block direct reads of server internals/db
    if (
        !resolvedPath.startsWith(ROOT_DIR) ||
        safeRelPath.startsWith("data/") ||
        safeRelPath === "server.js" ||
        safeRelPath === "package.json"
    ) {
        res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Forbidden");
        return;
    }

    try {
        const stat = await fsp.stat(resolvedPath);
        if (!stat.isFile()) {
            res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("Not Found");
            return;
        }
        const ext = path.extname(resolvedPath).toLowerCase();
        const contentType = MIME_TYPES[ext] || "application/octet-stream";
        const content = await fsp.readFile(resolvedPath);
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
    } catch {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("404 — Page Not Found");
    }
}

const server = http.createServer(async (req, res) => {
    try {
        const urlObj = new URL(req.url, `http://${req.headers.host || "localhost"}`);
        if (urlObj.pathname.startsWith("/api/")) {
            await handleApi(req, res, urlObj);
            return;
        }
        await serveStatic(res, urlObj.pathname);
    } catch (err) {
        const status = err.statusCode || 500;
        sendJson(res, status, { error: err.message || "Internal server error" });
    }
});

ensureDatabase().then(() => {
    server.listen(PORT, () => {
        console.log(`ASR Forever server running at http://localhost:${PORT}`);
    });
});
