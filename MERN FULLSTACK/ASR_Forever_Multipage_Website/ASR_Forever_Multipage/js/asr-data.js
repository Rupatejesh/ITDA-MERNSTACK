/* =========================================
   ASR FOREVER — STRUCTURED DOMAIN DATA
   Works in both Node.js (backend) and Browser (fallback)
========================================= */

(function (root, factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        root.ASR_DATA = factory();
    }
}(typeof globalThis !== "undefined" ? globalThis : this, function () {
    const topics = [
        {
            slug: "land",
            number: "01",
            title: "Tribal Land Protection",
            page: "land.html",
            icon: "🌳",
            category: "Rights & Governance",
            tagline: "Land-rights awareness, records and lawful protection.",
            helpline: "ITDA Land Cell / Tahsildar Office • Dial 1902 (PGRS)",
            portal: "Meebhoomi AP / Revenue & Tribal Welfare Department",
            cards: [
                {
                    id: "land-law",
                    icon: "⚖️",
                    title: "Know the Law",
                    tag: "Fifth Schedule & LTR 1/70",
                    shortDesc: "Understand Fifth Schedule safeguards, AP Scheduled Areas Land Transfer Regulation (LTR 1 of 1970), and RoFR (Forest Rights Act 2006) protections.",
                    keyPoints: [
                        "Transfers of immovable property in Scheduled Areas to non-tribals are prohibited under LTR 1/70.",
                        "Individual Forest Rights (IFR) and Community Forest Resource (CFR) rights are protected under FRA 2006.",
                        "Gram Sabha consent is vital before any land acquisition or diversion."
                    ],
                    documents: ["Fifth Schedule Provisions", "LTR 1/70 Case Reference", "FRA 2006 Title (Patta)"],
                    authority: "Special Deputy Collector (Tribal Welfare) & RDO",
                    actionLabel: "View Legal Safeguards"
                },
                {
                    id: "land-records",
                    icon: "📜",
                    title: "Know Your Records",
                    tag: "Pattas & Survey Maps",
                    shortDesc: "Maintain updated Adangal/Pahani, 1B Register, D-Form Patta, RoFR Patta, and FMB survey boundary sketches.",
                    keyPoints: [
                        "Verify survey number, extent, and enjoyment column in village revenue records.",
                        "Keep digital & laminated copies of RoFR Pattas and 1B extracts.",
                        "Cross-check boundary stones and Aadhaar/family passbook consistency."
                    ],
                    documents: ["1B / ROR Extract", "Adangal / Pahani", "D-Form / RoFR Patta", "FMB Sketch"],
                    authority: "Village Revenue Officer (VRO) / Village Secretariat & Tahsildar",
                    actionLabel: "Document Checklist"
                },
                {
                    id: "land-protect",
                    icon: "🛡️",
                    title: "Protect Lawfully",
                    tag: "Lawful Action",
                    shortDesc: "Document suspected encroachments or benami land transfers and submit structured representations to competent revenue and ITDA authorities.",
                    keyPoints: [
                        "Record date, survey number, village/mandal, and witness statements.",
                        "File an LTR petition before the Special Deputy Collector (TW) or Sub-Collector.",
                        "Use PGRS (1902) for transparent tracking and acknowledgement."
                    ],
                    documents: ["Survey & Mandal Details", "Timestamped Site Photos", "Patta / Possession Proof"],
                    authority: "ITDA Project Officer / Sub-Collector / SDC (TW)",
                    actionLabel: "How to Report"
                },
                {
                    id: "land-youth",
                    icon: "🧑‍🎓",
                    title: "Youth Awareness",
                    tag: "Community Legal Literacy",
                    shortDesc: "Educated tribal youth can assist elders in reading Meebhoomi records, verifying mutations, and attending Mandal legal awareness camps.",
                    keyPoints: [
                        "Assist elders at Village Secretariats for certified record downloads.",
                        "Organize village-level RoFR and LTR awareness workshops.",
                        "Connect families with District Legal Services Authority (DLSA) free legal aid."
                    ],
                    documents: ["Volunteer Registration", "Village Literacy Kit", "DLSA Free Legal Aid Info"],
                    authority: "DLSA Legal Aid Clinics & Tribal Youth Volunteers",
                    actionLabel: "Join as Land Volunteer"
                }
            ]
        },
        {
            slug: "pesa",
            number: "02",
            title: "PESA & Gram Sabha",
            page: "pesa.html",
            icon: "🏡",
            category: "Rights & Governance",
            tagline: "Community participation and village awareness.",
            helpline: "District Panchayat Office / ITDA PESA Coordinator",
            portal: "Ministry of Panchayati Raj — PESA & eGramSwaraj",
            cards: [
                {
                    id: "pesa-participate",
                    icon: "🏡",
                    title: "Participate",
                    tag: "Active Attendance",
                    shortDesc: "Attend scheduled and special Gram Sabha meetings to review village development plans, budgets, and local resolutions.",
                    keyPoints: [
                        "Verify quorum requirements and prior public notice (drum-beat / notice board).",
                        "Review Gram Panchayat Development Plan (GPDP) works and social audit reports.",
                        "Ensure resolutions are accurately recorded in the official minutes book."
                    ],
                    documents: ["Gram Sabha Notice", "Attendance Register", "GPDP Proposal Copy"],
                    authority: "Panchayat Secretary & Sarpanch / Gram Sabha",
                    actionLabel: "Meeting Checklist"
                },
                {
                    id: "pesa-voice",
                    icon: "🗣️",
                    title: "Community Voice",
                    tag: "Inclusive Quorum",
                    shortDesc: "Ensure women, youth, SHG members, farmers, and elders actively propose priorities and speak freely in Gram Sabha sessions.",
                    keyPoints: [
                        "Reserve agenda time for drinking water, school hostels, health, and livelihoods.",
                        "Encourage women SHG representatives to audit nutrition and market plans.",
                        "Read out resolutions in local tribal languages for universal clarity."
                    ],
                    documents: ["Citizen Proposal Note", "Women & Youth Agenda Sheet"],
                    authority: "Gram Sabha President & Ward Members",
                    actionLabel: "Raise Agenda Point"
                },
                {
                    id: "pesa-understand",
                    icon: "📚",
                    title: "Understand PESA",
                    tag: "PESA Act 1996",
                    shortDesc: "Learn core PESA powers: minor forest produce (MFP) ownership, village market control, minor water bodies, and prior consultation.",
                    keyPoints: [
                        "Section 4 empowers Gram Sabha to safeguard traditions, customs, and community resources.",
                        "Prior consultation/recommendation on minor minerals and land alienation prevention.",
                        "Management of village Santhas (markets) and local institutions."
                    ],
                    documents: ["PESA Act 1996 Summary", "AP PESA Rules Guide"],
                    authority: "Mandal Parishad Development Officer (MPDO) & ITDA",
                    actionLabel: "Explore PESA Powers"
                },
                {
                    id: "pesa-participation",
                    icon: "🤝",
                    title: "Community Participation",
                    tag: "Social Audit & Transparency",
                    shortDesc: "Village works last longer when youth and villagers track MGNREGS, water pipelines, and school infrastructure together.",
                    keyPoints: [
                        "Check work-site display boards for sanctioned budget and timeline.",
                        "Participate in MGNREGS and Tribal Welfare social audits.",
                        "Keep community copies of Gram Sabha resolutions."
                    ],
                    documents: ["Social Audit Checklist", "Work Sanction Details"],
                    authority: "Mandal Social Audit Team & Gram Panchayat",
                    actionLabel: "Social Audit Guide"
                }
            ]
        },
        {
            slug: "santha",
            number: "03",
            title: "Tribal Santha",
            page: "santha.html",
            icon: "⛺",
            category: "Livelihoods & Markets",
            tagline: "Local vendors, farmers and livelihoods.",
            helpline: "GCC (Girijan Co-operative Corporation) & Gram Panchayat",
            portal: "AP GCC / e-NAM & Local Santha Directory",
            cards: [
                {
                    id: "santha-weekly",
                    icon: "⛺",
                    title: "Weekly Santha",
                    tag: "Market Calendar",
                    shortDesc: "Organised weekly markets across Paderu, Chintapalli, Araku, Rampachodavaram, and Munchingiput with clean sheds and drinking water.",
                    keyPoints: [
                        "Fixed weekly market days: Monday (Chintapalli), Friday (Paderu), Saturday (Araku region).",
                        "Designated shaded platforms, clean water, and waste bins for produce hygiene.",
                        "Transparent stall allocation prioritized for local tribal producers."
                    ],
                    documents: ["Vendor ID / Gram Sabha Pass", "Weighing Scale Calibration"],
                    authority: "Gram Panchayat & GCC Depot",
                    actionLabel: "View Santha Schedule"
                },
                {
                    id: "santha-shops",
                    icon: "🏪",
                    title: "Local Tribal Shops",
                    tag: "Village Enterprises",
                    shortDesc: "Support tribal youth and families in setting up sustainable Kirana, millet snack, agri-input, and repair shops in their habitations.",
                    keyPoints: [
                        "Access working capital through TRICOR, MUDRA, and SHG bank linkages.",
                        "Standardize digital UPI QR payments and clear price boards.",
                        "Bundle local coffee, honey, and bamboo crafts for tourists."
                    ],
                    documents: ["Udyam Registration", "Panchayat Trade NOC", "Bank Account & UPI"],
                    authority: "TRICOR / DRDA Velugu & Lead Bank",
                    actionLabel: "Shop Setup Guide"
                },
                {
                    id: "santha-farmer",
                    icon: "🥬",
                    title: "Farmer to Customer",
                    tag: "Zero Middlemen",
                    shortDesc: "Direct farm-gate selling of hill millets, rajma, turmeric, ginger, pippali, pepper, tamarind, and organic wild honey.",
                    keyPoints: [
                        "Check GCC Minimum Support Price (MSP) for Minor Forest Produce before selling.",
                        "Use digital weighing scales to prevent under-weighing losses.",
                        "Grade and clean produce at village collection centres for 20-35% higher price."
                    ],
                    documents: ["MSP Rate Card", "Farmer Producer Group (FPO) ID"],
                    authority: "GCC Procurement Centres & Rythu Bharosa Kendras (RBK)",
                    actionLabel: "Check Produce Guide"
                },
                {
                    id: "santha-fair",
                    icon: "⚖️",
                    title: "Fair & Lawful Markets",
                    tag: "Weights & Protections",
                    shortDesc: "Prevent unauthorized stall encroachment and unfair pricing by reporting violations to Panchayat and Legal Metrology officials.",
                    keyPoints: [
                        "Verify Legal Metrology seal on weighing balances.",
                        "Report illegal fee collection or stall capture to MPDO / PGRS.",
                        "Ensure PESA Gram Sabha oversight on Santha auction/management."
                    ],
                    documents: ["Fee Receipt", "Violation Photo Evidence"],
                    authority: "Gram Sabha Market Committee & Legal Metrology",
                    actionLabel: "Fair Market Rules"
                },
                {
                    id: "santha-women",
                    icon: "👩‍🌾",
                    title: "Women Vendors",
                    tag: "SHG Empowerment",
                    shortDesc: "Dedicated safe zones, storage lockers, and micro-credit access for tribal women vendors and Self-Help Groups.",
                    keyPoints: [
                        "Priority front-row sheds for women farmers carrying head-load produce.",
                        "Cold-storage / drying yard links through ITDA & Velugu.",
                        "Group transport sharing to reduce travel cost to weekly Santhas."
                    ],
                    documents: ["SHG Membership Card", "Stall Priority Pass"],
                    authority: "DRDA-Velugu & Village Organisation (VO)",
                    actionLabel: "SHG Vendor Support"
                },
                {
                    id: "santha-digital",
                    icon: "📱",
                    title: "Digital Market",
                    tag: "Catalogues & Direct Orders",
                    shortDesc: "Tribal youth create WhatsApp Business catalogues, QR menus, and ONDC/direct shipping links for Araku coffee and hill spices.",
                    keyPoints: [
                        "Publish weekly fresh-stock lists with clear unit weights and dispatch days.",
                        "Connect local FPOs with urban bulk buyers in Visakhapatnam & Vijayawada.",
                        "Use simple accounting apps to track daily sales and stock."
                    ],
                    documents: ["Product Catalogue Template", "FSSAI Basic Registration"],
                    authority: "ITDA Skill Hub & FPO Digital Desk",
                    actionLabel: "Register as Vendor"
                }
            ]
        },
        {
            slug: "tourism",
            number: "04",
            title: "Tribal Tourism",
            page: "tourism.html",
            icon: "🏞️",
            category: "Livelihoods & Markets",
            tagline: "Local people creating tourism opportunities.",
            helpline: "APTDC / ITDA Eco-Tourism Cell • Dial 1800-425-45454",
            portal: "AP Tourism & Community Eco-Tourism Network",
            cards: [
                {
                    id: "tourism-transport",
                    icon: "🚙",
                    title: "Local Transport",
                    tag: "Authorised Mobility",
                    shortDesc: "Train and license local youth drivers for safe hill-terrain jeep, auto, and cab circuits linking Araku, Lambasingi, Vanjangi, and Maredumilli.",
                    keyPoints: [
                        "Transparent fixed-fare charts displayed at viewpoints and railway stations.",
                        "Hill-driving safety training, first-aid kits, and vehicle fitness badges.",
                        "Subsidized transport vehicle loans via TRICOR & ST Corporation."
                    ],
                    documents: ["Commercial Driving Badge", "Vehicle Permit", "Route Fare Card"],
                    authority: "RTA & ITDA Youth Livelihood Cell",
                    actionLabel: "Transport Permit Info"
                },
                {
                    id: "tourism-guides",
                    icon: "🥾",
                    title: "Local Guides",
                    tag: "Certified Trail Guides",
                    shortDesc: "Youth trained in biodiversity, first aid, storytelling, and multilingual communication guiding treks in Eastern Ghats valleys.",
                    keyPoints: [
                        "Official ID card issued after Forest & Tourism orientation training.",
                        "Zero-littering trail briefing for every visiting group.",
                        "Fixed half-day and full-day guide fee structure."
                    ],
                    documents: ["Guide Training Certificate", "First-Aid Basics", "ID Badge"],
                    authority: "Forest Department (VSS) & AP Tourism",
                    actionLabel: "Apply as Local Guide"
                },
                {
                    id: "tourism-coffee",
                    icon: "☕",
                    title: "Coffee Plantation Tours",
                    tag: "Agri-Tourism",
                    shortDesc: "Guided walks through shade-grown Arabica coffee & black pepper estates showing cherry picking, pulping, drying, and cupping.",
                    keyPoints: [
                        "Hands-on tasting & farm-gate roasted coffee packet sales.",
                        "Explain organic tribal shade-canopy farming under silver oak trees.",
                        "Direct revenue share to the grower family."
                    ],
                    documents: ["Plantation Walk Map", "Grower Cooperative Tie-up"],
                    authority: "Coffee Board & GCC / Local FPOs",
                    actionLabel: "Plantation Tour Model"
                },
                {
                    id: "tourism-waterfalls",
                    icon: "🌊",
                    title: "Waterfall Guides",
                    tag: "Safety & Stewardship",
                    shortDesc: "Safe route guidance, monsoon flash-flood alerts, and crowd safety at Katiki, Chaparai, Tajangi, and Amruthadhara waterfalls.",
                    keyPoints: [
                        "Mark safe viewing zones and slippery rock warnings.",
                        "Check upstream rainfall alerts during monsoon months.",
                        "Community Vana Samrakshana Samithi (VSS) entry management."
                    ],
                    documents: ["VSS Safety Protocol", "Emergency Rescue Contacts"],
                    authority: "Local VSS Committee & Police Outpost",
                    actionLabel: "Safety Protocol"
                },
                {
                    id: "tourism-food",
                    icon: "🍲",
                    title: "Tribal Food Stalls",
                    tag: "Authentic Hill Cuisine",
                    shortDesc: "Hygienic stalls serving Bamboo Chicken (Bongulo Chicken), Ragi Sangati, millet laddus, pakodas, and freshly brewed tribal coffee.",
                    keyPoints: [
                        "FSSAI hygiene certification and clean biodegradable leaf plates.",
                        "Display allergen-free millet & organic ingredient stories.",
                        "Boost seasonal income for women SHG culinary teams."
                    ],
                    documents: ["FSSAI Registration", "Clean Food Kit"],
                    authority: "Gram Panchayat & Food Safety Officer",
                    actionLabel: "Food Stall Checklist"
                },
                {
                    id: "tourism-dhimsa",
                    icon: "💃",
                    title: "Dhimsa Cultural Shows",
                    tag: "Dignified Heritage",
                    shortDesc: "Community-owned evening cultural troupes performing authentic Dhimsa with fair artist remuneration and cultural context.",
                    keyPoints: [
                        "Direct payment to troupe bank account with fixed per-show honorarium.",
                        "Brief narration on instrument names (Tudumu, Mori, Kiridi) and meaning.",
                        "Respectful photography guidelines for guests."
                    ],
                    documents: ["Cultural Troupe Registration", "Standard Rate Card"],
                    authority: "ITDA Culture Wing & Gram Sabha",
                    actionLabel: "Register Cultural Troupe"
                },
                {
                    id: "tourism-centre",
                    icon: "🎥",
                    title: "Culture Projection Centre",
                    tag: "Storytelling Hub",
                    shortDesc: "Mini audio-visual visitor centres showcasing Alluri Sita Rama Raju history, Eastern Ghats ecology, and responsible travel rules.",
                    keyPoints: [
                        "Short 15-minute multilingual documentaries (Telugu, Hindi, English).",
                        "Interactive district map highlighting craft clusters and eco-stays.",
                        "Operated by trained local youth."
                    ],
                    documents: ["Visitor Brief Script", "Audio-Visual Archive"],
                    authority: "ITDA & Tribal Museum",
                    actionLabel: "Centre Blueprint"
                },
                {
                    id: "tourism-visitor",
                    icon: "🎟️",
                    title: "Visitor Services",
                    tag: "Helpdesks & Ticketing",
                    shortDesc: "Digital QR ticketing, parking coordination, and tourist helpdesks managed by local youth committees.",
                    keyPoints: [
                        "Transparent digital receipts for parking and entry fees.",
                        "Multilingual tourist map & emergency contact handouts.",
                        "Reinvest surplus fees into village sanitation."
                    ],
                    documents: ["VSS / Panchayat Resolution", "QR Ticket Log"],
                    authority: "Village Eco-Tourism Committee",
                    actionLabel: "Service Standards"
                },
                {
                    id: "tourism-craft",
                    icon: "🧺",
                    title: "Craft & Produce Shops",
                    tag: "Made in ASR",
                    shortDesc: "Curated souvenir kiosks selling bamboo crafts, terracotta, handloom textiles, turmeric, honey, and Araku coffee.",
                    keyPoints: [
                        "Origin tag showing artisan/farmer name and village.",
                        "Eco-friendly cloth and paper gift packaging.",
                        "Accept cash and UPI for effortless tourist purchases."
                    ],
                    documents: ["Artisan Card", "Origin Label Template"],
                    authority: "TRIFED / Lepakshi & GCC",
                    actionLabel: "Artisan Listing"
                },
                {
                    id: "tourism-homestay",
                    icon: "🏠",
                    title: "Community Homestays",
                    tag: "Eco-Stays",
                    shortDesc: "Regulated family-run homestays offering clean rooms, local breakfast, and authentic hill hospitality without losing land ownership.",
                    keyPoints: [
                        "Keep land and home ownership 100% with the tribal family.",
                        "Follow AP Homestay registration, fire safety, and clean washroom standards.",
                        "Online listing support via community tourism portal."
                    ],
                    documents: ["AP Homestay Registration", "House Safety Checklist"],
                    authority: "AP Tourism & ITDA Eco-Tourism",
                    actionLabel: "Start a Homestay"
                },
                {
                    id: "tourism-digital",
                    icon: "📸",
                    title: "Digital Tourism",
                    tag: "Youth Media Creators",
                    shortDesc: "Local creators producing drone/photo reels, verified Google Maps pins, and responsible destination guides.",
                    keyPoints: [
                        "Accurate seasonal guides (winter mist, coffee blossom, monsoon safety).",
                        "Promote lesser-known villages to reduce overcrowding.",
                        "Freelance digital marketing for local homestays."
                    ],
                    documents: ["Creator Portfolio", "Responsible Geo-Tagging"],
                    authority: "Youth Digital Collective",
                    actionLabel: "Creator Guidelines"
                },
                {
                    id: "tourism-eco",
                    icon: "♻️",
                    title: "Eco Guardians",
                    tag: "Zero-Plastic Hills",
                    shortDesc: "Youth green brigades running plastic-bottle deposit points, trail clean-ups, and eco-awareness drives.",
                    keyPoints: [
                        "Install bamboo dustbins and drinking water refill stations.",
                        "Penalty/deposit system for single-use plastic bottles at checkposts.",
                        "Monthly community cleanup drives with schools."
                    ],
                    documents: ["Green Brigade Roster", "Waste Segregation Plan"],
                    authority: "VSS, Gram Panchayat & Swachh Andhra",
                    actionLabel: "Join Eco Guardians"
                }
            ]
        },
        {
            slug: "sports",
            number: "05",
            title: "Tribal Sports",
            page: "sports.html",
            icon: "🏹",
            category: "Youth & Heritage",
            tagline: "Archery, football, athletics and training.",
            helpline: "SAAP District Sports Authority (DSA) & ITDA Sports Officer",
            portal: "Sports Authority of Andhra Pradesh (SAAP) / Khelo India",
            cards: [
                {
                    id: "sports-archery",
                    icon: "🏹",
                    title: "Archery",
                    tag: "Precision & Heritage",
                    shortDesc: "Channel traditional bow-and-arrow focus into modern Indian & Recurve archery with certified coaches and target ranges.",
                    keyPoints: [
                        "Selection camps at Paderu, Araku, and Rampachodavaram sports hostels.",
                        "Equipment support through SAAP & Khelo India Tribal Games.",
                        "Pathway to State, National, and Sports Authority of India (SAI) academies."
                    ],
                    documents: ["Age Proof / Birth Certificate", "ST Community Certificate", "Fitness Certificate"],
                    authority: "District Sports Development Officer (DSDO) & SAI",
                    actionLabel: "Archery Trial Info"
                },
                {
                    id: "sports-football",
                    icon: "⚽",
                    title: "Football",
                    tag: "Village Leagues",
                    shortDesc: "Structured inter-mandal football tournaments, evening turf/ground practice, and referee/coaching clinics for boys and girls.",
                    keyPoints: [
                        "Form registered village youth clubs for Mandal & District leagues.",
                        "Provide boots, jerseys, and injury-prevention warmups.",
                        "Scout talented strikers and defenders for state residential academies."
                    ],
                    documents: ["Team Roster", "Player Aadhaar & Age Proof"],
                    authority: "District Football Association & SAAP",
                    actionLabel: "Register Football Team"
                },
                {
                    id: "sports-athletics",
                    icon: "🏃",
                    title: "Athletics",
                    tag: "Endurance & Track",
                    shortDesc: "High-altitude hill stamina makes ASR youth strong in 800m, 1500m, 5000m, cross-country, and javelin events.",
                    keyPoints: [
                        "Morning track sessions on nutrition, hydration, and sprint mechanics.",
                        "Preparation for Army/Police physical tests and national athletics meets.",
                        "Stopwatch timing logs to track monthly improvement."
                    ],
                    documents: ["Medical Fitness", "Previous Meet Timings"],
                    authority: "DSA Athletics Coach & APTWR School PETs",
                    actionLabel: "Training Schedule"
                },
                {
                    id: "sports-school",
                    icon: "🏫",
                    title: "School Talent",
                    tag: "Early Scouting (U-14 / U-17)",
                    shortDesc: "Identify gifted athletes early across Ashram Schools, Gurukulams, KGBVs, and ZP High Schools.",
                    keyPoints: [
                        "Annual school-cluster talent hunts with standardized fitness tests.",
                        "Dedicated sports diet & academic balance in residential hostels.",
                        "Mentor-teacher tracking for promising U-14/U-17 students."
                    ],
                    documents: ["School Bonafide", "PET Recommendation"],
                    authority: "Tribal Welfare Education & School Games Federation",
                    actionLabel: "School Scouting"
                },
                {
                    id: "sports-youth",
                    icon: "🧑‍🤝‍🧑",
                    title: "Open Youth Participation",
                    tag: "Inclusive Pathways",
                    shortDesc: "Unemployed youth and school dropouts aged 15-23 can join evening community grounds, kabaddi, volleyball, and coaching camps.",
                    keyPoints: [
                        "Open evening fitness & skill-building hubs at Gram Panchayat grounds.",
                        "Peer mentorship combining sports discipline with skill/job guidance.",
                        "Zero entry barriers for village youth."
                    ],
                    documents: ["Basic Registration Form", "Aadhaar ID"],
                    authority: "NYKS (Nehru Yuva Kendra) & Youth Clubs",
                    actionLabel: "Join Open Trials"
                },
                {
                    id: "sports-official",
                    icon: "🏆",
                    title: "Official Opportunities",
                    tag: "Scholarships & Quotas",
                    shortDesc: "Guide medalists on sports quota admissions, Khelo India scholarships, cash incentives, and government recruitment.",
                    keyPoints: [
                        "Preserve verified participation & merit certificates (Form-I, II, III).",
                        "Apply for SAAP sports kits, diet allowances, and travel grants.",
                        "Track upcoming 2% Sports Quota notifications in AP Govt jobs."
                    ],
                    documents: ["Merit Certificates", "Bank Passbook", "Sports ID"],
                    authority: "SAAP & Ministry of Youth Affairs and Sports",
                    actionLabel: "Scholarship & Quota Guide"
                }
            ]
        },
        {
            slug: "culture",
            number: "06",
            title: "Culture & Language",
            page: "culture.html",
            icon: "💃",
            category: "Youth & Heritage",
            tagline: "Dhimsa, languages, heritage and museums.",
            helpline: "Tribal Cultural Research & Training Institute (TCR&TI) / Araku Tribal Museum",
            portal: "Ministry of Tribal Affairs — TRI & Digital Heritage",
            cards: [
                {
                    id: "culture-dhimsa",
                    icon: "💃",
                    title: "Dhimsa",
                    tag: "Living Dance Tradition",
                    shortDesc: "Document the 8 forms of Dhimsa (Boda, Gunderi, Goodi Beta, Potara-Tola, Bhag, Natikari, Kunda, Baya) with music and attire stories.",
                    keyPoints: [
                        "Record traditional instruments: Mori, Tudumu, Dappu, Kiridi, and Jodukommulu.",
                        "Teach young students the steps and social harmony values of Dhimsa.",
                        "Ensure festival performers receive fair recognition and honorarium."
                    ],
                    documents: ["Dance Form Notes", "Instrument Archive"],
                    authority: "Community Elders & Tribal Museum Araku",
                    actionLabel: "Explore Dhimsa Forms"
                },
                {
                    id: "culture-languages",
                    icon: "🗣️",
                    title: "Tribal Languages",
                    tag: "Adivasi Mother Tongues",
                    shortDesc: "Preserve Kuvi, Konda, Gadaba, Bagata, Valmiki, Koya, Savara, and local hill dialects through bilingual audio dictionaries and primers.",
                    keyPoints: [
                        "Create audio wordbanks of everyday phrases, plants, crops, and songs.",
                        "Develop illustrated bilingual picture books for primary school children.",
                        "Empower youth to record native pronunciation cleanly on smartphones."
                    ],
                    documents: ["Bilingual Wordlist", "Audio Consent Form"],
                    authority: "MLE (Multilingual Education) Schools & TCR&TI",
                    actionLabel: "Language Preservation Kit"
                },
                {
                    id: "culture-oral",
                    icon: "👴",
                    title: "Oral History",
                    tag: "Elders' Wisdom",
                    shortDesc: "With informed community consent, record elders sharing Rampa Rebellion memories, Alluri Sita Rama Raju folklore, and village origins.",
                    keyPoints: [
                        "Always obtain verbal/written consent and credit the storyteller by name.",
                        "Store original recordings with village name, date, and translation.",
                        "Share approved stories back with local schools."
                    ],
                    documents: ["Storyteller Consent Sheet", "Interview Questions"],
                    authority: "Gram Sabha & Youth Heritage Club",
                    actionLabel: "Oral History Guide"
                },
                {
                    id: "culture-museum",
                    icon: "🏛️",
                    title: "Digital Museum",
                    tag: "Community Archive",
                    shortDesc: "Build a curated digital gallery of traditional farming tools, bamboo ornaments, festive attire, and folk paintings.",
                    keyPoints: [
                        "High-resolution photos with creator story and historical usage notes.",
                        "Link village archives with the Araku Valley Tribal Museum.",
                        "Prevent cultural misappropriation through proper attribution."
                    ],
                    documents: ["Artefact Catalog Sheet", "Attribution Metadata"],
                    authority: "Araku Tribal Museum & TRI",
                    actionLabel: "Submit Cultural Story"
                },
                {
                    id: "culture-crafts",
                    icon: "🧶",
                    title: "Traditional Crafts",
                    tag: "Artisan Livelihoods",
                    shortDesc: "Preserve bamboo basketry, gourd craft, natural-dye weaving, and wood carving while connecting artisans to fair markets.",
                    keyPoints: [
                        "Provide Artisan ID cards (Pehchan) for exhibition and loan access.",
                        "Organize design-refresh workshops without losing traditional motifs.",
                        "Link crafts to TRIFED Tribes India & tourist souvenir centres."
                    ],
                    documents: ["Artisan Pehchan Card", "Craft Training Log"],
                    authority: "TRIFED & Development Commissioner (Handicrafts)",
                    actionLabel: "Artisan Support"
                },
                {
                    id: "culture-ecotourism",
                    icon: "🌿",
                    title: "Culture & Eco-Tourism",
                    tag: "Community Museums",
                    shortDesc: "Combine forest conservation knowledge, sacred groves, and living village museums into sustainable community-owned experiences.",
                    keyPoints: [
                        "Protect sacred groves and medicinal plant knowledge under Biodiversity Registers.",
                        "Ensure festival calendars (Itukula Panduga, Kotha Amavasya) stay community-led.",
                        "Channel visitor contributions into youth cultural fellowships."
                    ],
                    documents: ["People's Biodiversity Register (PBR)", "Festival Calendar"],
                    authority: "AP Biodiversity Board & Gram Sabha",
                    actionLabel: "Biodiversity & Culture"
                }
            ]
        },
        {
            slug: "health",
            number: "07",
            title: "Disaster & Health",
            page: "health.html",
            icon: "🚑",
            category: "Safety & Welfare",
            tagline: "Emergency connectivity and safer hill communities.",
            helpline: "108 Ambulance • 104 Health • 1077 District Disaster Control • 112 Emergency",
            portal: "APSDMA & Tribal Health Mission / 108 Services",
            cards: [
                {
                    id: "health-landslide",
                    icon: "🌧️",
                    title: "Landslide Preparedness",
                    tag: "Monsoon Safety",
                    shortDesc: "Early warning checks, slope-crack monitoring, safe evacuation shelters, and pre-positioned ration kits in vulnerable ghat habitations.",
                    keyPoints: [
                        "Watch for tilted trees, muddy spring water, or hillside cracks during heavy rain.",
                        "Keep emergency go-bags ready: Aadhaar, pattas, torch, medicines, dry food.",
                        "Save District Disaster Control (1077) and Mandal Revenue numbers."
                    ],
                    documents: ["Village Evacuation Map", "Emergency Go-Bag Checklist"],
                    authority: "APSDMA & Tahsildar / MPDO",
                    actionLabel: "Landslide Checklist"
                },
                {
                    id: "health-transport",
                    icon: "🚑",
                    title: "Emergency Transport",
                    tag: "108 & Feeder Ambulances",
                    shortDesc: "Coordinate 108 ambulances, bike/feeder ambulances, and community stretcher teams for last-mile hill habitations.",
                    keyPoints: [
                        "Dial 108 immediately and share exact landmark / hamlet coordinates.",
                        "Maintain village volunteer roster to assist patient transfer to motorable road.",
                        "Pre-identify nearest PHC, CHC, and Area Hospital (Paderu / Rampachodavaram)."
                    ],
                    documents: ["Nearest PHC/CHC Directory", "Hamlet GPS Pin"],
                    authority: "108 Emergency Services & DMHO",
                    actionLabel: "Emergency Directory"
                },
                {
                    id: "health-maternal",
                    icon: "🤰",
                    title: "Maternal Care",
                    tag: "Zero-Delay Delivery",
                    shortDesc: "Track high-risk pregnancies early, utilize Birth Waiting Homes (Maarpu / Maternity Waiting Rooms), and ensure 102/108 transport.",
                    keyPoints: [
                        "Register every pregnancy with ASHA & ANM for iron/nutrition tracking.",
                        "Shift expecting mothers from remote hamlets to Birth Waiting Homes 2 weeks early.",
                        "Access JSY & Dr. NTR Vaidya Seva / PMMVY maternal benefits."
                    ],
                    documents: ["MCP (Mother & Child) Card", "Aadhaar & Bank Details"],
                    authority: "ASHA, ANM & Medical Officer (PHC)",
                    actionLabel: "Maternal Safety Plan"
                },
                {
                    id: "health-network",
                    icon: "🏥",
                    title: "Health Network",
                    tag: "PHCs & Sickle Cell Care",
                    shortDesc: "Know local PHCs, Village Health Clinics, malaria/dengue testing, and National Sickle Cell Anaemia Elimination screening.",
                    keyPoints: [
                        "Free Sickle Cell screening cards available at PHCs and Ashram schools.",
                        "Use 104 mobile medical units for regular BP, sugar, and antenatal checks.",
                        "Keep mosquito nets and clean drinking water practices during monsoon."
                    ],
                    documents: ["Sickle Cell Status Card", "ABHA Health ID"],
                    authority: "Village Health Clinic & ITDA Health Wing",
                    actionLabel: "Find Health Services"
                },
                {
                    id: "health-blood",
                    icon: "🩸",
                    title: "Blood Availability",
                    tag: "Donor Network",
                    shortDesc: "Maintain a verified local youth blood-donor directory connected with Paderu District Hospital and Rampachodavaram blood banks.",
                    keyPoints: [
                        "Register voluntary youth donors by blood group and mandal.",
                        "Verify stock via e-RaktKosh portal before critical transfers.",
                        "Prioritize emergency support for sickle cell & maternity cases."
                    ],
                    documents: ["Donor Consent & Group Card", "Hospital Blood Bank Contact"],
                    authority: "Area Hospital Blood Bank & Youth Red Cross",
                    actionLabel: "Register Blood Donor"
                },
                {
                    id: "health-roads",
                    icon: "🛣️",
                    title: "Remote Road Access",
                    tag: "Connectivity Tracking",
                    shortDesc: "Document washed-out culverts, fallen trees, and un-connected hamlets through geo-tagged photos for PGRS and ITDA engineering action.",
                    keyPoints: [
                        "Capture clear road-blockage photo with hamlet name and mandal.",
                        "Escalate urgent monsoon blockages to R&B / PR Engineering & 1077.",
                        "Track pending BT road proposals under PM-JANMAN."
                    ],
                    documents: ["Geo-tagged Photo", "Hamlet Population Note"],
                    authority: "Panchayat Raj Engineering & PM-JANMAN",
                    actionLabel: "Report Road Issue"
                },
                {
                    id: "health-drone",
                    icon: "🚁",
                    title: "Future Drone Solutions",
                    tag: "Regulated Air Logistics",
                    shortDesc: "Explore DGCA-approved medical drone corridors for emergency vaccines, blood samples, and snakebite anti-venom during road cut-offs.",
                    keyPoints: [
                        "Identify safe, obstacle-free village landing pads near PHCs/Schools.",
                        "Partner with authorized HealthTech pilots under state health approvals.",
                        "Cut medicine delivery time from 3 hours to under 20 minutes."
                    ],
                    documents: ["Landing Zone Feasibility Note", "DGCA Compliance Info"],
                    authority: "AP Health Dept & Civil Aviation Guidelines",
                    actionLabel: "View Concept Brief"
                },
                {
                    id: "health-comm",
                    icon: "📡",
                    title: "Emergency Communication",
                    tag: "Signal & Solar Backup",
                    shortDesc: "Strengthen BSNL/4G tower uptime, solar charging points at Village Secretariats, and community WhatsApp alert trees.",
                    keyPoints: [
                        "List high-signal emergency calling points in every hill habitation.",
                        "Keep solar power banks ready at Gram Sachivalayam during cyclones.",
                        "Verify official alerts before forwarding to prevent panic."
                    ],
                    documents: ["Village Signal Map", "Emergency Contact Tree"],
                    authority: "Village Secretariat & Telecom Nodal Officer",
                    actionLabel: "Alert Tree Setup"
                }
            ]
        },
        {
            slug: "pgrs",
            number: "08",
            title: "PGRS",
            page: "pgrs.html",
            icon: "📢",
            category: "Rights & Governance",
            tagline: "Know, complain, track and follow up.",
            helpline: "PGRS Toll-Free Helpline: 1902",
            portal: "meekosam.ap.gov.in (Public Grievance Redressal System)",
            cards: [
                {
                    id: "pgrs-step1",
                    icon: "📷",
                    title: "Step 1: Document",
                    tag: "Gather Clear Evidence",
                    shortDesc: "Collect exact dates, village/mandal names, affected family count, and clear photos or scanned documents before filing.",
                    keyPoints: [
                        "Take sharp daytime photos showing the exact location/issue.",
                        "Keep previous application numbers or Gram Sabha resolutions ready.",
                        "Note down exact names of schemes, roads, or survey numbers."
                    ],
                    documents: ["Photo Evidence", "Dates & Location Details", "Prior Receipts"],
                    authority: "Citizen / Village Volunteer",
                    actionLabel: "Evidence Checklist"
                },
                {
                    id: "pgrs-step2",
                    icon: "📝",
                    title: "Step 2: Explain",
                    tag: "Structured Summary",
                    shortDesc: "Write a concise 3-part statement: (1) What is the problem, (2) Who is affected & where, (3) Specific lawful action requested.",
                    keyPoints: [
                        "Avoid vague paragraphs — lead with the core issue in 2 lines.",
                        "Specify exact relief needed (e.g., repair culvert, issue patta copy, restore streetlight).",
                        "Include working phone number for officer verification calls."
                    ],
                    documents: ["Problem Summary Draft", "Contact Mobile Number"],
                    authority: "Complainant / Helper",
                    actionLabel: "Draft Grievance Now"
                },
                {
                    id: "pgrs-step3",
                    icon: "🏢",
                    title: "Step 3: Correct Authority",
                    tag: "Right Department",
                    shortDesc: "Route each grievance to the right office: Revenue (Land), Tribal Welfare/ITDA, Panchayat Raj (Roads/Water), Medical, or Civil Supplies.",
                    keyPoints: [
                        "Land/Patta -> Tahsildar / RDO / SDC (TW).",
                        "Village Water/Sanitation/Streetlights -> MPDO / Gram Panchayat.",
                        "Hostels/Scholarships/GCC -> ITDA Project Officer / DTWO."
                    ],
                    documents: ["Department Mapping Guide"],
                    authority: "District Collectorate & ITDA Monday PGRS",
                    actionLabel: "Department Directory"
                },
                {
                    id: "pgrs-step4",
                    icon: "📤",
                    title: "Step 4: Submit",
                    tag: "Official Acknowledgement",
                    shortDesc: "Submit through PGRS Portal (meekosam.ap.gov.in), call 1902, visit Village Secretariat, or attend District/ITDA Monday PGRS.",
                    keyPoints: [
                        "Always collect and photograph the generated Grievance Reference ID.",
                        "Verify your mobile OTP and SMS confirmation.",
                        "Never pay bribes — PGRS submission is completely free."
                    ],
                    documents: ["Aadhaar (if required)", "Acknowledgement Slip"],
                    authority: "Village Secretariat / Collectorate PGRS Desk",
                    actionLabel: "Open Submission Form"
                },
                {
                    id: "pgrs-step5",
                    icon: "🔎",
                    title: "Step 5: Track",
                    tag: "Follow-Up & Reopen",
                    shortDesc: "Monitor officer inspection remarks using your Reference ID and request re-opening if closed without genuine resolution.",
                    keyPoints: [
                        "Check status every 7 days via portal or 1902.",
                        "Review officer upload/endorsement report carefully.",
                        "Use feedback rating honestly to escalate unresolved issues."
                    ],
                    documents: ["Reference ID", "Inspection Endorsement"],
                    authority: "1902 Call Centre & Appellate Officer",
                    actionLabel: "Track by Reference ID"
                },
                {
                    id: "pgrs-youth",
                    icon: "🤝",
                    title: "Youth Digital Support",
                    tag: "Ethical Assistance",
                    shortDesc: "Digitally literate tribal youth help elders draft, upload, and track grievances transparently without impersonating officials.",
                    keyPoints: [
                        "Always file in the affected citizen's own name and phone number.",
                        "Hand over the printed/SMS reference ID directly to the applicant.",
                        "Organize weekly village helpdesks before Monday PGRS."
                    ],
                    documents: ["Volunteer Ethics Code", "Helpdesk Logbook"],
                    authority: "Tribal Youth Digital Volunteers",
                    actionLabel: "Become PGRS Helper"
                }
            ]
        },
        {
            slug: "business",
            number: "09",
            title: "Entrepreneurship",
            page: "business.html",
            icon: "☕",
            category: "Livelihoods & Markets",
            tagline: "Coffee, turmeric, honey and startups.",
            helpline: "ITDA Skill & Enterprise Hub • DIC (District Industries Centre)",
            portal: "Udyam Registration / PMFME & TRICOR Entrepreneurship",
            cards: [
                {
                    id: "biz-coffee",
                    icon: "☕",
                    title: "Coffee",
                    tag: "Araku Valley Arabica",
                    shortDesc: "Move beyond raw parchment beans into pulp washing, medium/dark roasting, grind packs, café kiosks, and GI-tagged branding.",
                    keyPoints: [
                        "Roasted & packed coffee earns 3x–4x higher margin than raw cherry.",
                        "Leverage Araku Coffee GI recognition and organic certification.",
                        "Access PMFME 35% subsidy for micro-roasting & packaging units."
                    ],
                    documents: ["FSSAI License", "Udyam Registration", "Coffee Board / FPO Tie-up"],
                    authority: "Coffee Board, GCC & DIC (PMFME)",
                    actionLabel: "Coffee Enterprise Plan"
                },
                {
                    id: "biz-turmeric",
                    icon: "🟡",
                    title: "Turmeric",
                    tag: "High-Curcumin Value Add",
                    shortDesc: "Solar drying, boiling, polishing, lab-tested curcumin grading, and sealed retail pouches for Chintapalli/Paderu hill turmeric.",
                    keyPoints: [
                        "Solar dryers prevent fungal spoilage and keep bright golden colour.",
                        "Test curcumin % to unlock premium organic & spice export buyers.",
                        "Form SHG/FPO common facility centres for grinding machines."
                    ],
                    documents: ["Spices Board Info", "FSSAI Basic", "Packaging Design"],
                    authority: "Spices Board & Horticulture Dept",
                    actionLabel: "Turmeric Processing"
                },
                {
                    id: "biz-honey",
                    icon: "🍯",
                    title: "Honey",
                    tag: "Pure Forest & Apiary Honey",
                    shortDesc: "Moisture reduction, hygienic glass-jar bottling, batch testing, and sustainable rock-bee harvesting without harming colonies.",
                    keyPoints: [
                        "Train collectors in sustainable comb-trimming methods.",
                        "Use food-grade glass jars with tamper-proof seals and origin QR codes.",
                        "Add value with infused ginger, cinnamon, and pepper honey."
                    ],
                    documents: ["Agmark / FSSAI", "Lab Purity Report"],
                    authority: "KVIC Honey Mission & GCC",
                    actionLabel: "Honey Value Chain"
                },
                {
                    id: "biz-spices",
                    icon: "🌱",
                    title: "Ginger & Spices",
                    tag: "Pepper, Pippali & Ginger",
                    shortDesc: "Clean sorting, dehydration, dry-ginger powder, black pepper grading, and bulk B2B supply contracts.",
                    keyPoints: [
                        "Clean cold-chain or ventilated storage cuts post-harvest loss.",
                        "Combine pepper + turmeric + ginger into gift spice boxes for tourists.",
                        "Sell directly on ONDC and B2B food networks."
                    ],
                    documents: ["FPO Membership", "GST / Udyam"],
                    authority: "AP Food Processing Society & ITDA",
                    actionLabel: "Spice Packaging Guide"
                },
                {
                    id: "biz-mfp",
                    icon: "🧺",
                    title: "Forest Produce",
                    tag: "Van Dhan Vikas Kendra",
                    shortDesc: "Value-add tamarind cakes, shikakai, amla candies, hill brooms, and adda-leaf plates through Van Dhan Vikas Kendras (VDVK).",
                    keyPoints: [
                        "15 SHGs (300 gatherers) can form a Van Dhan Kendra for toolkits & training.",
                        "Sell biodegradable adda-leaf plates to temple trusts and eco-events.",
                        "Ensure sustainable forest harvesting practices."
                    ],
                    documents: ["VDVK Proposal", "SHG Group Resolution"],
                    authority: "TRIFED & GCC Van Dhan Cell",
                    actionLabel: "VDVK Scheme Info"
                },
                {
                    id: "biz-digital",
                    icon: "💻",
                    title: "Digital Business",
                    tag: "E-Commerce & Branding",
                    shortDesc: "Build brand logos, product photography, WhatsApp stores, UPI payment links, and India Post / courier dispatch workflows.",
                    keyPoints: [
                        "Use India Post Dak Ghar Niryat Kendra / Parcel rates for affordable shipping.",
                        "Create consistent bilingual packaging (Telugu + English).",
                        "Track unit cost, packaging cost, and net profit per order."
                    ],
                    documents: ["Brand Name Check", "India Post Business Account"],
                    authority: "MSME / Startup Andhra Pradesh",
                    actionLabel: "Launch Digital Store"
                },
                {
                    id: "biz-ai",
                    icon: "🤖",
                    title: "AI for Enterprise",
                    tag: "Smart Youth Tools",
                    shortDesc: "Use AI tools responsibly for bilingual product descriptions, packaging copy, bookkeeping templates, and market research.",
                    keyPoints: [
                        "Draft clean product brochures in Telugu, Hindi, and English.",
                        "Generate social-media festival campaign calendars in minutes.",
                        "Verify all factual claims and prices manually before publishing."
                    ],
                    documents: ["Youth AI Prompt Playbook"],
                    authority: "ITDA Digital Skill Centres",
                    actionLabel: "AI Business Toolkit"
                },
                {
                    id: "biz-youth",
                    icon: "👥",
                    title: "Youth Entrepreneurship",
                    tag: "Local Problem Solvers",
                    shortDesc: "Identify local hill gaps — solar repairs, agri-drone spraying, eco-stays, cold storage, or coaching hubs — and build viable startups.",
                    keyPoints: [
                        "Start lean with a 30-day pilot in 1–2 mandals before taking big loans.",
                        "Combine PMEGP / Stand-Up India / TRICOR subsidies.",
                        "Mentor school students in practical enterprise thinking."
                    ],
                    documents: ["1-Page Business Canvas", "Project Report (DPR)"],
                    authority: "DIC, TRICOR & RSETI Training",
                    actionLabel: "Register Startup Idea"
                }
            ]
        },
        {
            slug: "schemes",
            number: "10",
            title: "Government Schemes",
            page: "schemes.html",
            icon: "🎓",
            category: "Safety & Welfare",
            tagline: "Know schemes, documents and opportunities.",
            helpline: "Gram Sachivalayam Helpdesk • Dial 1902 / 14500",
            portal: "pmjanman.tribal.gov.in • jnanabhumi.ap.gov.in • scholarships.gov.in",
            cards: [
                {
                    id: "schemes-edu",
                    icon: "🎓",
                    title: "Education",
                    tag: "Scholarships & Hostels",
                    shortDesc: "Post-Matric & Pre-Matric ST Scholarships (Jnanabhumi / NSP), EMRS & Gurukulam admissions, Ambedkar Overseas Vidya Nidhi.",
                    keyPoints: [
                        "Track annual Jnanabhumi & National Scholarship Portal (NSP) deadlines.",
                        "Ensure Aadhaar-NPCI bank seeding so scholarship DBT does not fail.",
                        "Explore Eklavya Model Residential Schools (EMRS) & IIT/NEET coaching."
                    ],
                    documents: ["Integrated Caste & Income Certificate", "Aadhaar-Seeded Bank Passbook", "Bonafide & Previous Marks"],
                    authority: "District Tribal Welfare Officer (DTWO) & Principals",
                    actionLabel: "Education Schemes"
                },
                {
                    id: "schemes-emp",
                    icon: "🧑‍💼",
                    title: "Employment",
                    tag: "Skills & Placements",
                    shortDesc: "ITDA Youth Training Centres (YTC), APSSDC skill courses, PMEGP self-employment, and DSC/Police/SSC exam coaching.",
                    keyPoints: [
                        "Free residential skill training in electrical, solar, nursing, hospitality & IT.",
                        "Free study materials and coaching camps at Paderu & Rampachodavaram.",
                        "Register on APSSDC & National Career Service (NCS) portals."
                    ],
                    documents: ["10th/Inter/Degree Marks", "ST Certificate", "Passport Photos"],
                    authority: "ITDA YTC & APSSDC Skill Hubs",
                    actionLabel: "Skill & Job Programs"
                },
                {
                    id: "schemes-ent",
                    icon: "🏪",
                    title: "Enterprise",
                    tag: "Credit & Subsidies",
                    shortDesc: "TRICOR ST economic support units, Stand-Up India (₹10L–₹1Cr), PMFME food processing (35% grant), and Mudra loans.",
                    keyPoints: [
                        "Stand-Up India reserves bank loans for ST/SC & women greenfield enterprises.",
                        "PMEGP offers up to 35% margin-money subsidy in rural areas for ST applicants.",
                        "Prepare a realistic bankable Detailed Project Report (DPR)."
                    ],
                    documents: ["Project Report (DPR)", "Udyam Certificate", "Caste & Aadhaar", "Quotation"],
                    authority: "TRICOR, DIC & Lead District Manager (Banks)",
                    actionLabel: "Subsidy & Loan Guide"
                },
                {
                    id: "schemes-agri",
                    icon: "🌾",
                    title: "Agriculture",
                    tag: "Farmers & Coffee Growers",
                    shortDesc: "PM-KISAN / Annadata Sukhibhava, RoFR land development under MGNREGS, drip irrigation, and Coffee Board expansion subsidies.",
                    keyPoints: [
                        "RoFR patta holders are eligible for PM-KISAN & MGNREGS land leveling/bunding.",
                        "Check e-Crop booking at Rythu Bharosa Kendra (RBK) every season.",
                        "Access 90% micro-irrigation & spice/coffee planting subsidies."
                    ],
                    documents: ["RoFR / Land Patta", "e-Crop Receipt", "Bank Passbook"],
                    authority: "RBK / Agriculture Officer & Horticulture Dept",
                    actionLabel: "Farmer Benefits"
                },
                {
                    id: "schemes-docs",
                    icon: "📄",
                    title: "Document Awareness",
                    tag: "Zero-Rejection Prep",
                    shortDesc: "Avoid repeated trips to Mandal offices by checking Integrated Caste, Income, Residence, Aadhaar-NPCI link, and Rice Card status first.",
                    keyPoints: [
                        "Verify name spelling matches identically across Aadhaar, SSC, and Caste records.",
                        "Check NPCI Aadhaar-bank mapper status before applying for DBT schemes.",
                        "Keep scanned PDFs (<200KB) in a safe family folder."
                    ],
                    documents: ["Aadhaar", "Integrated ST Certificate", "Income & Residence", "NPCI-Linked Bank"],
                    authority: "Village / Ward Secretariat (Meeseva)",
                    actionLabel: "Document Readiness Check"
                },
                {
                    id: "schemes-volunteers",
                    icon: "📱",
                    title: "Youth Digital Volunteers",
                    tag: "PM-JANMAN & Outreach",
                    shortDesc: "Youth volunteers help PVTG and remote hill families check eligibility for PM-JANMAN housing, solar power, and ration cards.",
                    keyPoints: [
                        "Conduct monthly saturation checks in remote hamlets.",
                        "Explain official eligibility clearly without charging any commission.",
                        "Help families track application IDs online."
                    ],
                    documents: ["Volunteer Sign-up", "PM-JANMAN Saturation Checklist"],
                    authority: "ITDA & Village Secretariat",
                    actionLabel: "Register as Volunteer"
                }
            ]
        }
    ];

    const gallery = [
        {
            id: "gal-easternghats",
            title: "Eastern Ghats",
            subtitle: "Mountains • Forests • Mist",
            category: "nature",
            location: "Paderu – Lambasingi – Chintapalli Belt",
            image: "images/easternghats.jpg",
            description: "Misty hill ranges, perennial streams, and rich biodiversity spanning the Alluri Sita Rama Raju district."
        },
        {
            id: "gal-dhimsa",
            title: "Dhimsa",
            subtitle: "Culture • Dance • Community",
            category: "culture",
            location: "Araku Valley & Tribal Habitations",
            image: "images/dhimsa.jpg",
            description: "Vibrant circle dance uniting tribal communities during festivals, harvests, and celebrations."
        },
        {
            id: "gal-coffee",
            title: "Tribal Coffee",
            subtitle: "Plantations • Livelihoods",
            category: "livelihoods",
            location: "Araku, Chintapalli & Ananthagiri",
            image: "images/coffee.jpg",
            description: "World-renowned shade-grown organic Arabica coffee cultivated sustainably by tribal farmers."
        },
        {
            id: "gal-tourism",
            title: "Tourism",
            subtitle: "Nature • Adventure • Local Opportunities",
            category: "nature",
            location: "Vanjangi, Maredumilli & Katiki",
            image: "images/tourism.jpg",
            description: "Community-led eco-tourism generating local jobs for guides, drivers, homestays, and artisans."
        },
        {
            id: "gal-sports",
            title: "Tribal Sports",
            subtitle: "Football • Archery • Athletics",
            category: "sports",
            location: "ASR District Playgrounds & Hostels",
            image: "images/sports.jpg",
            description: "Nurturing raw endurance and precision in archery, football, and athletics across hill villages."
        },
        {
            id: "gal-santha",
            title: "Tribal Santha",
            subtitle: "Markets • Farmers • Livelihoods",
            category: "markets",
            location: "Weekly Village Shandies",
            image: "images/santha.jpg",
            description: "Bustling weekly markets where farmers sell millets, turmeric, honey, spices, and forest produce."
        },
        {
            id: "gal-land",
            title: "Scheduled Land & Forests",
            subtitle: "Rights • Records • Stewardship",
            category: "livelihoods",
            location: "Fifth Schedule Villages",
            image: "images/land.jpg",
            description: "Protecting ancestral tribal lands and community forest resources through legal awareness."
        },
        {
            id: "gal-pesa",
            title: "Gram Sabha & PESA",
            subtitle: "Village Voice • Self-Governance",
            category: "culture",
            location: "Scheduled Gram Panchayats",
            image: "images/pesa.jpg",
            description: "Informed village assemblies deciding local priorities, resources, and development plans."
        },
        {
            id: "gal-health",
            title: "Hill Health & Safety",
            subtitle: "Preparedness • Emergency Care",
            category: "livelihoods",
            location: "Remote Hill Habitations",
            image: "images/health.jpg",
            description: "Strengthening emergency response, maternal waiting homes, and landslide readiness."
        }
    ];

    const sampleGrievances = [
        {
            refId: "ASR-PGRS-2026-1001",
            citizenName: "Killo Ramesh",
            mandal: "Chintapalli",
            village: "Lammasingi",
            category: "Road & Connectivity",
            department: "Panchayat Raj Engineering",
            subject: "Monsoon culvert repair needed near school approach road",
            description: "Heavy rain damaged the culvert linking the hamlet to the main BT road, affecting 108 ambulance and school bus access.",
            status: "In Progress — Field Inspection Scheduled",
            createdAt: "2026-11-10T09:30:00.000Z",
            updates: [
                { date: "2026-11-10", note: "Grievance registered and assigned to AE (PR), Chintapalli." },
                { date: "2026-11-14", note: "Site verification completed; estimate uploaded for repair." }
            ]
        },
        {
            refId: "ASR-PGRS-2026-1002",
            citizenName: "Korra Satyavati",
            mandal: "Paderu",
            village: "Chintalaveedhi",
            category: "Land & RoFR Records",
            department: "Revenue / ITDA Land Cell",
            subject: "RoFR Patta survey boundary clarification request",
            description: "Requesting joint verification of survey boundary markers and digital 1B entry update for family cultivation plot.",
            status: "Assigned to Mandal Surveyor",
            createdAt: "2026-11-18T11:15:00.000Z",
            updates: [
                { date: "2026-11-18", note: "Received at Paderu Mandal PGRS desk." }
            ]
        }
    ];

    const sampleCommunity = [
        {
            id: "REG-2026-101",
            name: "Gemmeli Prasad",
            mandal: "Araku Valley",
            topic: "tourism",
            role: "Certified Local Trek & Coffee Guide",
            phone: "98xxxxxx12",
            notes: "Speaks Telugu, English, Hindi & Kuvi; trained in waterfall trail safety.",
            createdAt: "2026-11-05T10:00:00.000Z"
        },
        {
            id: "REG-2026-102",
            name: "Pangi Lakshmi",
            mandal: "Chintapalli",
            topic: "business",
            role: "Turmeric & Hill Honey SHG Producer",
            phone: "94xxxxxx45",
            notes: "Looking for solar dryer & FSSAI packaging support for 18 women farmers.",
            createdAt: "2026-11-12T14:20:00.000Z"
        },
        {
            id: "REG-2026-103",
            name: "Vanapalli Suresh",
            mandal: "Rampachodavaram",
            topic: "sports",
            role: "U-19 Archery & Athletics Aspirant",
            phone: "91xxxxxx78",
            notes: "District 1500m finalist seeking SAAP hostel trial dates.",
            createdAt: "2026-11-19T08:45:00.000Z"
        }
    ];

    return {
        topics,
        gallery,
        sampleGrievances,
        sampleCommunity
    };
}));
