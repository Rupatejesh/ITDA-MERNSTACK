ASR FOREVER — FULL-STACK MULTI-PAGE WEBSITE
=============================================

How to Run (with Node.js Backend + Persistent Storage):
  1. Start the backend server:
       node server.js   (or: npm start)
  2. Open in browser:
       http://localhost:3000

You can also open index.html directly in a browser (static fallback mode).

Pages (12 total):
  - Home: index.html (cinematic launch, live stats, mission filters & search)
  - 10 Topic Pages: land.html, pesa.html, santha.html, tourism.html,
    sports.html, culture.html, health.html, pgrs.html, business.html, schemes.html
  - Visual Gallery: gallery.html (category filters & story lightbox)

Backend REST APIs (served by server.js, persisted in data/db.json):
  - GET  /api/health
  - GET  /api/stats
  - GET  /api/topics?q=&category=
  - GET  /api/topics/:slug
  - GET  /api/gallery?category=
  - GET  /api/grievances
  - GET  /api/grievances/:refId
  - POST /api/grievances
  - PATCH /api/grievances/:refId
  - GET  /api/community?topic=
  - POST /api/community

Structure:
  - server.js       Node.js HTTP & REST API server
  - package.json    Project manifest & start scripts
  - data/db.json    Persistent JSON database (auto-created on startup)
  - css/style.css   Shared styles, grids, modals & responsive layout
  - js/asr-data.js  Structured mission, card & gallery data
  - js/script.js    Frontend interactivity & API client
  - images/         Website photos and launch graphics
