/* =========================================
   ASR FOREVER — CINEMATIC LAUNCH + INTERACTIVE ENGINE
   Connects to Node.js backend (/api/*) with seamless fallback to ASR_DATA
========================================= */

function startASRLaunch() {
    const screen = document.getElementById("curtainScreen");
    if (!screen) return;

    sessionStorage.setItem("asr_launched", "1");
    screen.classList.add("launching");
    screen.classList.add("show-first");

    setTimeout(function () {
        screen.classList.add("show-second");
        startFlowerCelebration();
    }, 4300);

    setTimeout(function () {
        screen.style.transition = "opacity 1.5s ease";
        screen.style.opacity = "0";
    }, 8000);

    setTimeout(function () {
        screen.style.display = "none";
    }, 9500);
}

function skipASRLaunch() {
    const screen = document.getElementById("curtainScreen");
    if (!screen) return;
    sessionStorage.setItem("asr_launched", "1");
    screen.style.display = "none";
}

function replayASRLaunch() {
    const screen = document.getElementById("curtainScreen");
    if (!screen) return;
    sessionStorage.removeItem("asr_launched");
    screen.classList.remove("launching", "show-first", "show-second");
    screen.style.transition = "";
    screen.style.opacity = "1";
    screen.style.display = "block";
    startASRLaunch();
}

function startFlowerCelebration() {
    const container = document.getElementById("flowerCelebration");
    if (!container) return;

    const flowers = ["🌸", "🌼", "🌺", "🌿", "✨"];
    for (let i = 0; i < 55; i++) {
        const flower = document.createElement("span");
        flower.classList.add("flower");
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.left = Math.random() * 100 + "%";
        flower.style.animationDuration = (3 + Math.random() * 3) + "s";
        flower.style.animationDelay = (Math.random() * 1.5) + "s";
        flower.style.fontSize = (18 + Math.random() * 25) + "px";
        container.appendChild(flower);
        setTimeout(function () {
            flower.remove();
        }, 7000);
    }
}

/* =========================================
   DATA & BACKEND API ADAPTER
========================================= */

const STORAGE_KEYS = {
    grievances: "asr_local_grievances_v1",
    community: "asr_local_community_v1"
};

function isHttpMode() {
    return window.location.protocol === "http:" || window.location.protocol === "https:";
}

function getLocalStore(key, seed) {
    try {
        const raw = localStorage.getItem(key);
        if (raw) return JSON.parse(raw);
        localStorage.setItem(key, JSON.stringify(seed));
        return seed.slice();
    } catch {
        return seed.slice();
    }
}

function saveLocalStore(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch {
        // Ignore storage errors
    }
}

async function fetchStats() {
    if (isHttpMode()) {
        try {
            const res = await fetch("/api/stats");
            if (res.ok) return await res.json();
        } catch {
            // fallback below
        }
    }
    const data = window.ASR_DATA || { topics: [], gallery: [], sampleGrievances: [], sampleCommunity: [] };
    const grievances = getLocalStore(STORAGE_KEYS.grievances, data.sampleGrievances || []);
    const community = getLocalStore(STORAGE_KEYS.community, data.sampleCommunity || []);
    return {
        missions: (data.topics || []).length,
        topicCards: (data.topics || []).reduce((acc, t) => acc + t.cards.length, 0),
        galleryItems: (data.gallery || []).length,
        grievancesSubmitted: grievances.length,
        communityMembers: community.length
    };
}

async function fetchTopics(query = "", category = "all") {
    if (isHttpMode()) {
        try {
            const params = new URLSearchParams();
            if (query) params.set("q", query);
            if (category && category !== "all") params.set("category", category);
            const res = await fetch(`/api/topics?${params.toString()}`);
            if (res.ok) {
                const payload = await res.json();
                return payload.topics || [];
            }
        } catch {
            // fallback below
        }
    }
    const all = (window.ASR_DATA && window.ASR_DATA.topics) || [];
    return all.filter((t) => {
        const catOk = !category || category === "all" || t.category.toLowerCase() === category.toLowerCase();
        const q = query.trim().toLowerCase();
        const qOk =
            !q ||
            t.title.toLowerCase().includes(q) ||
            t.tagline.toLowerCase().includes(q) ||
            t.cards.some((c) => c.title.toLowerCase().includes(q) || c.shortDesc.toLowerCase().includes(q));
        return catOk && qOk;
    });
}

async function fetchTopicBySlug(slug) {
    if (isHttpMode()) {
        try {
            const res = await fetch(`/api/topics/${encodeURIComponent(slug)}`);
            if (res.ok) {
                const payload = await res.json();
                return payload.topic || null;
            }
        } catch {
            // fallback below
        }
    }
    const all = (window.ASR_DATA && window.ASR_DATA.topics) || [];
    return all.find((t) => t.slug === slug) || null;
}

async function fetchGallery(category = "all") {
    if (isHttpMode()) {
        try {
            const params = category && category !== "all" ? `?category=${encodeURIComponent(category)}` : "";
            const res = await fetch(`/api/gallery${params}`);
            if (res.ok) {
                const payload = await res.json();
                return payload.items || [];
            }
        } catch {
            // fallback below
        }
    }
    const all = (window.ASR_DATA && window.ASR_DATA.gallery) || [];
    if (!category || category === "all") return all;
    return all.filter((item) => item.category.toLowerCase() === category.toLowerCase());
}

async function fetchGrievances() {
    if (isHttpMode()) {
        try {
            const res = await fetch("/api/grievances");
            if (res.ok) {
                const payload = await res.json();
                return payload.grievances || [];
            }
        } catch {
            // fallback below
        }
    }
    const seed = (window.ASR_DATA && window.ASR_DATA.sampleGrievances) || [];
    return getLocalStore(STORAGE_KEYS.grievances, seed);
}

async function lookupGrievance(refId) {
    const clean = refId.trim().toUpperCase();
    if (isHttpMode()) {
        try {
            const res = await fetch(`/api/grievances/${encodeURIComponent(clean)}`);
            const payload = await res.json();
            if (res.ok) return { ok: true, grievance: payload.grievance };
            return { ok: false, error: payload.error || "Reference ID not found" };
        } catch {
            // fallback below
        }
    }
    const list = await fetchGrievances();
    const found = list.find((g) => g.refId.toUpperCase() === clean);
    return found ? { ok: true, grievance: found } : { ok: false, error: `No grievance found for ${clean}` };
}

async function submitGrievance(formData) {
    if (isHttpMode()) {
        try {
            const res = await fetch("/api/grievances", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const payload = await res.json();
            if (res.ok) return { ok: true, grievance: payload.grievance };
            return { ok: false, error: payload.error || "Submission failed" };
        } catch {
            // fallback below
        }
    }
    const seed = (window.ASR_DATA && window.ASR_DATA.sampleGrievances) || [];
    const list = getLocalStore(STORAGE_KEYS.grievances, seed);
    const refId = `ASR-PGRS-2026-${1001 + list.length + Math.floor(Math.random() * 80)}`;
    const now = new Date().toISOString();
    const created = {
        refId,
        citizenName: formData.citizenName,
        mandal: formData.mandal,
        village: formData.village || "Main Habitation",
        category: formData.category,
        department: "District / ITDA PGRS Cell",
        subject: formData.subject,
        description: formData.description,
        status: "Submitted — Saved Locally",
        createdAt: now,
        updates: [{ date: now.slice(0, 10), note: "Submitted via local offline mode." }]
    };
    list.unshift(created);
    saveLocalStore(STORAGE_KEYS.grievances, list);
    return { ok: true, grievance: created };
}

async function fetchCommunity(topicSlug = "") {
    if (isHttpMode()) {
        try {
            const q = topicSlug ? `?topic=${encodeURIComponent(topicSlug)}` : "";
            const res = await fetch(`/api/community${q}`);
            if (res.ok) {
                const payload = await res.json();
                return payload.registrations || [];
            }
        } catch {
            // fallback below
        }
    }
    const seed = (window.ASR_DATA && window.ASR_DATA.sampleCommunity) || [];
    const list = getLocalStore(STORAGE_KEYS.community, seed);
    return topicSlug ? list.filter((r) => r.topic === topicSlug) : list;
}

async function submitCommunity(formData) {
    if (isHttpMode()) {
        try {
            const res = await fetch("/api/community", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const payload = await res.json();
            if (res.ok) return { ok: true, registration: payload.registration };
            return { ok: false, error: payload.error || "Registration failed" };
        } catch {
            // fallback below
        }
    }
    const seed = (window.ASR_DATA && window.ASR_DATA.sampleCommunity) || [];
    const list = getLocalStore(STORAGE_KEYS.community, seed);
    const created = {
        id: `REG-2026-${101 + list.length}`,
        name: formData.name,
        mandal: formData.mandal,
        topic: formData.topic,
        role: formData.role,
        phone: formData.phone || "Provided",
        notes: formData.notes || "Registered via ASR Forever portal.",
        createdAt: new Date().toISOString()
    };
    list.unshift(created);
    saveLocalStore(STORAGE_KEYS.community, list);
    return { ok: true, registration: created };
}

/* =========================================
   HTML ESCAPING & MODAL
========================================= */

function escapeHtml(str) {
    return String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function ensureModal() {
    let backdrop = document.getElementById("asrModalBackdrop");
    if (backdrop) return backdrop;

    backdrop = document.createElement("div");
    backdrop.id = "asrModalBackdrop";
    backdrop.className = "asr-modal-backdrop";
    backdrop.innerHTML = `
        <div class="asr-modal" role="dialog" aria-modal="true" aria-labelledby="asrModalTitle">
            <button type="button" class="asr-modal-close" aria-label="Close modal">&times;</button>
            <div id="asrModalBody"></div>
        </div>
    `;
    document.body.appendChild(backdrop);

    backdrop.addEventListener("click", function (e) {
        if (e.target === backdrop || e.target.closest(".asr-modal-close")) {
            backdrop.classList.remove("open");
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && backdrop.classList.contains("open")) {
            backdrop.classList.remove("open");
        }
    });

    return backdrop;
}

function openModal(htmlContent) {
    const backdrop = ensureModal();
    const body = document.getElementById("asrModalBody");
    body.innerHTML = htmlContent;
    backdrop.classList.add("open");
}

function openCardDetailModal(topic, card) {
    const docsHtml = (card.documents || [])
        .map(
            (doc) => `
            <label>
                <input type="checkbox">
                <span>${escapeHtml(doc)}</span>
            </label>`
        )
        .join("");

    const pointsHtml = (card.keyPoints || [])
        .map((pt) => `<li>${escapeHtml(pt)}</li>`)
        .join("");

    openModal(`
        <span class="card-tag">${escapeHtml(topic.number)} • ${escapeHtml(topic.title)} • ${escapeHtml(card.tag)}</span>
        <h2 id="asrModalTitle">${escapeHtml(card.icon)} ${escapeHtml(card.title)}</h2>
        <p>${escapeHtml(card.shortDesc)}</p>

        <div class="modal-section-title">Key Action Points</div>
        <ul class="card-points">${pointsHtml}</ul>

        <div class="modal-section-title">Interactive Document / Readiness Checklist</div>
        <div class="checklist-items">${docsHtml}</div>

        <div class="modal-section-title">Competent Authority & Helpline</div>
        <div class="card-meta">
            <strong>Office:</strong> ${escapeHtml(card.authority)}<br>
            <strong>Helpline:</strong> ${escapeHtml(topic.helpline)}<br>
            <strong>Portal:</strong> ${escapeHtml(topic.portal)}
        </div>

        <div class="card-actions" style="margin-top:18px;">
            <button type="button" class="button" onclick="document.getElementById('asrModalBackdrop').classList.remove('open'); const p = document.getElementById('communityActionPanel') || document.getElementById('pgrsActionPanel'); if(p) p.scrollIntoView({behavior:'smooth'});">
                Take Action on This Page ↓
            </button>
            <a href="pgrs.html" class="button-outline">File / Track PGRS →</a>
        </div>
    `);
}

function openTopicPreviewModal(topic) {
    const cardsPreview = topic.cards
        .map(
            (c) => `
            <div class="record-item">
                <strong>${escapeHtml(c.icon)} ${escapeHtml(c.title)}</strong>
                <span class="record-badge">${escapeHtml(c.tag)}</span>
                <p style="margin-top:6px; font-size:13px;">${escapeHtml(c.shortDesc)}</p>
            </div>`
        )
        .join("");

    openModal(`
        <span class="card-tag">Mission ${escapeHtml(topic.number)} • ${escapeHtml(topic.category)}</span>
        <h2 id="asrModalTitle">${escapeHtml(topic.icon)} ${escapeHtml(topic.title)}</h2>
        <p>${escapeHtml(topic.tagline)}</p>
        <div class="card-meta" style="margin-top:12px;">
            <strong>Helpline:</strong> ${escapeHtml(topic.helpline)}<br>
            <strong>Portal:</strong> ${escapeHtml(topic.portal)}
        </div>
        <div class="modal-section-title">Included Action Cards (${topic.cards.length})</div>
        <div class="record-list">${cardsPreview}</div>
        <div class="card-actions" style="margin-top:18px;">
            <a href="${escapeHtml(topic.page)}" class="button">Open Full ${escapeHtml(topic.title)} Page →</a>
        </div>
    `);
}

/* =========================================
   NAVBAR ACTIVE STATE
========================================= */

function highlightActiveNav() {
    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach((link) => {
        const href = link.getAttribute("href");
        if (href === currentFile) {
            link.classList.add("active");
        }
    });
}

/* =========================================
   HOME PAGE ENHANCEMENTS
========================================= */

async function initHomePage() {
    const curtain = document.getElementById("curtainScreen");
    if (curtain && sessionStorage.getItem("asr_launched") === "1") {
        curtain.style.display = "none";
    }

    const statsTarget = document.getElementById("homeStatsBar");
    if (statsTarget) {
        const stats = await fetchStats();
        statsTarget.innerHTML = `
            <div class="stat-box">
                <div class="stat-value">${stats.missions}</div>
                <div class="stat-label">Core ASR Missions</div>
            </div>
            <div class="stat-box">
                <div class="stat-value">${stats.topicCards}</div>
                <div class="stat-label">Action & Rights Guides</div>
            </div>
            <div class="stat-box">
                <div class="stat-value">${stats.grievancesSubmitted}</div>
                <div class="stat-label">PGRS Grievances Logged</div>
            </div>
            <div class="stat-box">
                <div class="stat-value">${stats.communityMembers}</div>
                <div class="stat-label">Youth & Community Members</div>
            </div>
        `;
    }

    const cardsGrid = document.getElementById("homeMissionsGrid");
    const filterBar = document.getElementById("homeFilterBar");
    if (!cardsGrid || !filterBar) return;

    let activeCategory = "all";
    let searchQuery = "";

    async function renderMissions() {
        const topics = await fetchTopics(searchQuery, activeCategory);
        const cardsHtml = topics
            .map(
                (t) => `
                <div class="card">
                    <div class="card-body">
                        <div class="icon">${escapeHtml(t.icon)}</div>
                        <span class="card-tag">${escapeHtml(t.number)} • ${escapeHtml(t.category)}</span>
                        <h3>${escapeHtml(t.title)}</h3>
                        <p>${escapeHtml(t.tagline)}</p>
                        <ul class="card-points">
                            ${t.cards.slice(0, 2).map((c) => `<li><strong>${escapeHtml(c.title)}:</strong> ${escapeHtml(c.tag)}</li>`).join("")}
                        </ul>
                        <div class="card-meta">${t.cards.length} detailed action cards • ${escapeHtml(t.helpline.split("•")[0].trim())}</div>
                    </div>
                    <div class="card-actions">
                        <a class="button" href="${escapeHtml(t.page)}">Explore →</a>
                        <button type="button" class="button-outline preview-topic-btn" data-slug="${escapeHtml(t.slug)}">Quick View</button>
                    </div>
                </div>`
            )
            .join("");

        const showGalleryCard =
            (activeCategory === "all" || activeCategory === "Youth & Heritage") &&
            (!searchQuery || "asr gallery visual tribes eastern ghats".includes(searchQuery.toLowerCase()));

        const galleryCardHtml = showGalleryCard
            ? `
            <div class="card">
                <div class="card-body">
                    <div class="icon">🖼️</div>
                    <span class="card-tag">11 • Visual Archive</span>
                    <h3>ASR Visual Gallery</h3>
                    <p>Explore landscapes, Dhimsa culture, tribal coffee, Santha markets, and community life across the Eastern Ghats.</p>
                    <ul class="card-points">
                        <li><strong>Categories:</strong> Nature, Culture, Livelihoods & Sports</li>
                        <li><strong>Interactive:</strong> Category filters & story lightbox</li>
                    </ul>
                    <div class="card-meta">9 curated high-resolution visual stories</div>
                </div>
                <div class="card-actions">
                    <a class="button" href="gallery.html">Open Gallery →</a>
                </div>
            </div>`
            : "";

        cardsGrid.innerHTML =
            cardsHtml + galleryCardHtml ||
            `<div class="empty-state">No missions matched "<strong>${escapeHtml(searchQuery)}</strong>". Try clearing the filter.</div>`;

        cardsGrid.querySelectorAll(".preview-topic-btn").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const topic = await fetchTopicBySlug(btn.dataset.slug);
                if (topic) openTopicPreviewModal(topic);
            });
        });
    }

    filterBar.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            activeCategory = btn.dataset.category || "all";
            renderMissions();
        });
    });

    const searchInput = document.getElementById("homeMissionSearch");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            renderMissions();
        });
    }

    renderMissions();
}

/* =========================================
   TOPIC PAGES HYDRATION & INTERACTIVE PANELS
========================================= */

function renderCommunityPanel(topic) {
    const container = document.querySelector("section.container");
    if (!container || document.getElementById("communityActionPanel")) return;

    const panel = document.createElement("div");
    panel.id = "communityActionPanel";
    panel.className = "interactive-panel";
    panel.innerHTML = `
        <h2>🤝 Community Participation & Helpdesk — ${escapeHtml(topic.title)}</h2>
        <p class="panel-sub">Register as a youth volunteer, local participant, vendor, athlete, or entrepreneur to connect with ${escapeHtml(topic.title)} initiatives (saved to backend database).</p>
        <div class="panel-grid">
            <div class="panel-box">
                <h3>Join / Register Interest</h3>
                <form id="communityForm" class="form-grid">
                    <div class="form-row">
                        <input class="asr-input" type="text" name="name" placeholder="Full Name *" required>
                        <select class="asr-select" name="mandal" required>
                            <option value="">Select Mandal *</option>
                            <option value="Paderu">Paderu</option>
                            <option value="Araku Valley">Araku Valley</option>
                            <option value="Chintapalli">Chintapalli</option>
                            <option value="Rampachodavaram">Rampachodavaram</option>
                            <option value="Maredumilli">Maredumilli</option>
                            <option value="Ananthagiri">Ananthagiri</option>
                            <option value="G. Madugula">G. Madugula</option>
                            <option value="Munchingiput">Munchingiput</option>
                            <option value="Y. Ramavaram">Y. Ramavaram</option>
                            <option value="Other ASR Mandal">Other ASR Mandal</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <input class="asr-input" type="text" name="role" placeholder="Role / Interest (e.g., Volunteer, Guide, Vendor) *" required>
                        <input class="asr-input" type="tel" name="phone" placeholder="Mobile Number (optional)">
                    </div>
                    <textarea class="asr-textarea" name="notes" placeholder="Village name, skills, or support needed..."></textarea>
                    <button type="submit" class="button" style="margin-top:4px;">Submit Registration →</button>
                    <div id="communityFormMsg" class="status-msg"></div>
                </form>
            </div>
            <div class="panel-box">
                <h3>Registered Community Directory</h3>
                <div id="communityList" class="record-list">
                    <div class="record-item">Loading community members...</div>
                </div>
            </div>
        </div>
    `;

    const navFooter = container.querySelector(".nav-footer-buttons") || container.querySelector("a.button");
    if (navFooter) {
        container.insertBefore(panel, navFooter);
    } else {
        container.appendChild(panel);
    }

    async function refreshDirectory() {
        const listEl = document.getElementById("communityList");
        const items = await fetchCommunity(topic.slug);
        if (!items.length) {
            listEl.innerHTML = `<div class="record-item">No registrations yet for ${escapeHtml(topic.title)}. Be the first to join!</div>`;
            return;
        }
        listEl.innerHTML = items
            .map(
                (item) => `
                <div class="record-item">
                    <strong>${escapeHtml(item.name)}</strong>
                    <span class="record-badge">${escapeHtml(item.mandal)}</span>
                    <div style="color:#75e6b5; margin-top:3px;">${escapeHtml(item.role)}</div>
                    <div style="color:#cde3dc; margin-top:4px;">${escapeHtml(item.notes)}</div>
                </div>`
            )
            .join("");
    }

    const form = document.getElementById("communityForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const msgEl = document.getElementById("communityFormMsg");
        const fd = new FormData(form);
        const result = await submitCommunity({
            name: fd.get("name"),
            mandal: fd.get("mandal"),
            role: fd.get("role"),
            phone: fd.get("phone"),
            notes: fd.get("notes"),
            topic: topic.slug
        });

        msgEl.className = `status-msg show ${result.ok ? "success" : "error"}`;
        if (result.ok) {
            msgEl.textContent = `Registered! ID: ${result.registration.id} (${result.registration.name})`;
            form.reset();
            refreshDirectory();
        } else {
            msgEl.textContent = result.error;
        }
    });

    refreshDirectory();
}

function renderPgrsPanel() {
    const container = document.querySelector("section.container");
    if (!container || document.getElementById("pgrsActionPanel")) return;

    const panel = document.createElement("div");
    panel.id = "pgrsActionPanel";
    panel.className = "interactive-panel";
    panel.innerHTML = `
        <h2>📢 Live PGRS Grievance Submission & Tracking</h2>
        <p class="panel-sub">Test submitting a grievance to receive an instant Reference ID (saved in backend storage) or track existing sample IDs like <strong>ASR-PGRS-2026-1001</strong> and <strong>ASR-PGRS-2026-1002</strong>.</p>
        <div class="panel-grid">
            <div class="panel-box">
                <h3>Submit New Grievance</h3>
                <form id="pgrsSubmitForm" class="form-grid">
                    <div class="form-row">
                        <input class="asr-input" type="text" name="citizenName" placeholder="Applicant Name *" required>
                        <select class="asr-select" name="mandal" required>
                            <option value="">Select Mandal *</option>
                            <option value="Paderu">Paderu</option>
                            <option value="Araku Valley">Araku Valley</option>
                            <option value="Chintapalli">Chintapalli</option>
                            <option value="Rampachodavaram">Rampachodavaram</option>
                            <option value="Maredumilli">Maredumilli</option>
                            <option value="Ananthagiri">Ananthagiri</option>
                            <option value="G. Madugula">G. Madugula</option>
                            <option value="Munchingiput">Munchingiput</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <input class="asr-input" type="text" name="village" placeholder="Village / Hamlet">
                        <select class="asr-select" name="category" required>
                            <option value="Land & RoFR Records">Land & RoFR Records</option>
                            <option value="Road & Connectivity">Road & Connectivity</option>
                            <option value="Health & Emergency">Health & Emergency</option>
                            <option value="PESA & Gram Sabha">PESA & Gram Sabha</option>
                            <option value="Santha & Markets">Santha & Markets</option>
                            <option value="Schemes & Scholarships">Schemes & Scholarships</option>
                        </select>
                    </div>
                    <input class="asr-input" type="text" name="subject" placeholder="Short Subject (e.g., Drinking water pipeline leak) *" required>
                    <textarea class="asr-textarea" name="description" placeholder="Describe problem, location, and requested resolution *" required></textarea>
                    <button type="submit" class="button" style="margin-top:4px;">Submit & Generate Reference ID →</button>
                    <div id="pgrsSubmitMsg" class="status-msg"></div>
                </form>
            </div>

            <div class="panel-box">
                <h3>Track Grievance by Reference ID</h3>
                <form id="pgrsTrackForm" class="form-row" style="margin-bottom:14px;">
                    <input class="asr-input" type="text" id="trackRefInput" placeholder="e.g., ASR-PGRS-2026-1001" required>
                    <button type="submit" class="button" style="margin-top:0;">Track Status</button>
                </form>
                <div id="pgrsTrackResult" style="margin-bottom:16px;"></div>

                <h3>Recent Grievances</h3>
                <div id="pgrsRecentList" class="record-list">
                    <div class="record-item">Loading grievances...</div>
                </div>
            </div>
        </div>
    `;

    const navFooter = container.querySelector(".nav-footer-buttons") || container.querySelector("a.button");
    if (navFooter) {
        container.insertBefore(panel, navFooter);
    } else {
        container.appendChild(panel);
    }

    function renderGrievanceCard(g) {
        const updatesHtml = (g.updates || [])
            .map((u) => `<li><strong>${escapeHtml(u.date)}:</strong> ${escapeHtml(u.note)}</li>`)
            .join("");
        return `
            <div class="record-item" style="border-color:#48e3a5;">
                <div><strong>${escapeHtml(g.refId)}</strong> <span class="record-badge">${escapeHtml(g.status)}</span></div>
                <div style="margin-top:5px;"><strong>${escapeHtml(g.subject)}</strong></div>
                <div style="font-size:12.5px; color:#bfe0d4; margin-top:4px;">
                    Applicant: ${escapeHtml(g.citizenName)} • ${escapeHtml(g.village)}, ${escapeHtml(g.mandal)} • Dept: ${escapeHtml(g.department)}
                </div>
                <p style="margin-top:6px;">${escapeHtml(g.description)}</p>
                <ul class="card-points" style="margin-top:8px;">${updatesHtml}</ul>
            </div>
        `;
    }

    async function loadRecent() {
        const listEl = document.getElementById("pgrsRecentList");
        const items = await fetchGrievances();
        listEl.innerHTML = items
            .map(
                (g) => `
                <div class="record-item">
                    <strong>${escapeHtml(g.refId)}</strong>
                    <span class="record-badge">${escapeHtml(g.mandal)}</span>
                    <div style="color:#75e6b5; margin-top:3px;">${escapeHtml(g.subject)}</div>
                    <div style="font-size:12px; color:#bfe0d4; margin-top:3px;">Status: ${escapeHtml(g.status)}</div>
                </div>`
            )
            .join("");
    }

    document.getElementById("pgrsSubmitForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = e.target;
        const msgEl = document.getElementById("pgrsSubmitMsg");
        const fd = new FormData(form);
        const result = await submitGrievance({
            citizenName: fd.get("citizenName"),
            mandal: fd.get("mandal"),
            village: fd.get("village"),
            category: fd.get("category"),
            subject: fd.get("subject"),
            description: fd.get("description")
        });

        msgEl.className = `status-msg show ${result.ok ? "success" : "error"}`;
        if (result.ok) {
            msgEl.innerHTML = `Grievance Registered! Reference ID: <strong>${escapeHtml(result.grievance.refId)}</strong>`;
            document.getElementById("trackRefInput").value = result.grievance.refId;
            document.getElementById("pgrsTrackResult").innerHTML = renderGrievanceCard(result.grievance);
            form.reset();
            loadRecent();
        } else {
            msgEl.textContent = result.error;
        }
    });

    document.getElementById("pgrsTrackForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const refId = document.getElementById("trackRefInput").value;
        const out = document.getElementById("pgrsTrackResult");
        const res = await lookupGrievance(refId);
        if (res.ok) {
            out.innerHTML = renderGrievanceCard(res.grievance);
        } else {
            out.innerHTML = `<div class="status-msg show error">${escapeHtml(res.error)}</div>`;
        }
    });

    loadRecent();
}

async function initTopicPage(slug) {
    const topic = await fetchTopicBySlug(slug);
    if (!topic) return;

    const container = document.querySelector("section.container");
    const cardsGrid = container ? container.querySelector(".cards") : null;
    if (!container || !cardsGrid) return;

    // Insert helpline & filter banner above the cards grid
    if (!document.getElementById("topicBannerInfo")) {
        const banner = document.createElement("div");
        banner.id = "topicBannerInfo";
        banner.className = "topic-banner-info";
        banner.innerHTML = `
            <div><strong>Helpline:</strong> ${escapeHtml(topic.helpline)}</div>
            <div><strong>Official Portal:</strong> ${escapeHtml(topic.portal)}</div>
            <div><input id="topicCardSearch" class="search-input" type="search" placeholder="Filter ${escapeHtml(topic.title)} cards..."></div>
        `;
        container.insertBefore(banner, cardsGrid);
    }

    function renderTopicCards(filterText = "") {
        const q = filterText.trim().toLowerCase();
        const filtered = topic.cards.filter(
            (c) =>
                !q ||
                c.title.toLowerCase().includes(q) ||
                c.tag.toLowerCase().includes(q) ||
                c.shortDesc.toLowerCase().includes(q) ||
                c.keyPoints.some((p) => p.toLowerCase().includes(q))
        );

        if (!filtered.length) {
            cardsGrid.innerHTML = `<div class="empty-state">No cards match "<strong>${escapeHtml(filterText)}</strong>".</div>`;
            return;
        }

        cardsGrid.innerHTML = filtered
            .map(
                (card) => `
                <div class="card">
                    <div class="card-body">
                        <div class="icon">${escapeHtml(card.icon)}</div>
                        <span class="card-tag">${escapeHtml(card.tag)}</span>
                        <h3>${escapeHtml(card.title)}</h3>
                        <p>${escapeHtml(card.shortDesc)}</p>
                        <ul class="card-points">
                            ${card.keyPoints.map((pt) => `<li>${escapeHtml(pt)}</li>`).join("")}
                        </ul>
                        <div class="card-meta">
                            <strong>Authority:</strong> ${escapeHtml(card.authority)}
                        </div>
                    </div>
                    <div class="card-actions">
                        <button type="button" class="button card-detail-btn" data-card-id="${escapeHtml(card.id)}">
                            ${escapeHtml(card.actionLabel)} →
                        </button>
                    </div>
                </div>`
            )
            .join("");

        cardsGrid.querySelectorAll(".card-detail-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                const card = topic.cards.find((c) => c.id === btn.dataset.cardId);
                if (card) openCardDetailModal(topic, card);
            });
        });
    }

    const searchInput = document.getElementById("topicCardSearch");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => renderTopicCards(e.target.value));
    }

    renderTopicCards();

    if (slug === "pgrs") {
        renderPgrsPanel();
    } else {
        renderCommunityPanel(topic);
    }
}

/* =========================================
   GALLERY PAGE INTERACTIVITY
========================================= */

async function initGalleryPage() {
    const grid = document.getElementById("galleryGrid");
    const filterBar = document.getElementById("galleryFilterBar");
    if (!grid || !filterBar) return;

    let activeCategory = "all";

    async function renderGallery() {
        const items = await fetchGallery(activeCategory);
        if (!items.length) {
            grid.innerHTML = `<div class="empty-state">No gallery items found in this category.</div>`;
            return;
        }

        grid.innerHTML = items
            .map(
                (item) => `
                <div class="gallery-card" data-gal-id="${escapeHtml(item.id)}">
                    <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">
                    <div class="gallery-overlay">
                        <span class="card-tag" style="margin-bottom:8px;">${escapeHtml(item.category.toUpperCase())}</span>
                        <h2>${escapeHtml(item.title)}</h2>
                        <p>${escapeHtml(item.subtitle)}</p>
                    </div>
                </div>`
            )
            .join("");

        grid.querySelectorAll(".gallery-card").forEach((el) => {
            el.addEventListener("click", () => {
                const item = items.find((i) => i.id === el.dataset.galId);
                if (!item) return;
                openModal(`
                    <img class="modal-img" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">
                    <span class="card-tag">${escapeHtml(item.category.toUpperCase())} • ${escapeHtml(item.location)}</span>
                    <h2 id="asrModalTitle">${escapeHtml(item.title)}</h2>
                    <p>${escapeHtml(item.description)}</p>
                `);
            });
        });
    }

    filterBar.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            activeCategory = btn.dataset.category || "all";
            renderGallery();
        });
    });

    renderGallery();
}

/* =========================================
   BOOTSTRAP ON PAGE LOAD
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    highlightActiveNav();
    const pageType = document.body.dataset.page || "";
    const topicSlug = document.body.dataset.topic || "";

    if (pageType === "home") {
        initHomePage();
    } else if (pageType === "gallery") {
        initGalleryPage();
    } else if (topicSlug) {
        initTopicPage(topicSlug);
    }
});
