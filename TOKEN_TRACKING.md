# Session Token Tracking & Feature Milestone Log

## Project: TARGET AIR 10 — Banking Exam 2026 Mock Test Tracker

---

## 📋 Protocols

| Protocol | Description |
|---|---|
| **Token Optimization** | High-density outputs, compact diffs, concise explanations |
| **Database Integrity** | NEVER delete/truncate Neon Postgres data without explicit user request |
| **Packup Routine** | On "packup": git add+commit+push, update docs, log session here |

---

## 🗓️ Feature Milestone Log

| Phase | Feature / Change | Files | Status |
|---|---|---|---|
| 1 | 20-Category 399-Paper Mock Catalog + Dashboard SPA | `index.html`, `app.js`, `styles.css` | ✅ |
| 2 | IBPS PO Aug 2–Aug 22 Daily Execution Strategy Tracker | `app.js`, `index.html` | ✅ |
| 3 | Neon Serverless Postgres DDL + HTTP Adapter | `schema.sql`, `app.js` | ✅ |
| 4 | GitHub Actions CI/CD → GitHub Pages deployment | `.github/workflows/deploy.yml` | ✅ |
| 5 | Agent Skills + AGENTS.md token & rules config | `.agents/` | ✅ |
| 6 | TECH_STACK.md architecture documentation | `TECH_STACK.md` | ✅ |
| 7 | Date picker fix: `YYYY-MM-DD` internal, `DD:MM:YYYY` display | `app.js` | ✅ |
| 8 | Legacy record migration + non-destructive Neon DB merge | `app.js` | ✅ |
| 9 | UI date format standardized to `DD:MM:YYYY` | `app.js` | ✅ |
| 10 | **Topic/Chapter Name field** + dynamic badge replacement on 399-matrix | `index.html`, `app.js`, `styles.css` | ✅ |
| 11 | `step="any"` on all score/marks inputs (flexible decimals) | `index.html` | ✅ |
| 12 | DB integrity protection rule in AGENTS.md | `.agents/AGENTS.md` | ✅ |
| 13 | Packup routine rule in AGENTS.md + README.md created | `README.md`, `.agents/AGENTS.md` | ✅ |
| 14 | Session rollback to Phase 10 state (Topic/Chapter clean point) | git reset `72160ac` | ✅ |
| 15 | Refresh Data-Loss fix: Push-before-pull, local precedence merge, beforeunload listener | `app.js` | ✅ |
| 16 | Neon Cloud DB Remote Deletions (`deleteMockFromNeon`, `clearAllFromNeon`) | `app.js` | ✅ |
| 17 | Priority 1: `safeNum`/`safeInt` SQL input guards for empty field protection | `app.js` | ✅ |
| 18 | Priority 2: Form default prefill for category selection (`prelims_full`) | `app.js` | ✅ |
| 19 | Priority 3: Real-time Cloud DB Sync status badge indicator (🟢 Synced / 🔵 Syncing / 🔴 Error) | `index.html`, `styles.css`, `app.js` | ✅ |
| 20 | **Security**: Removed hardcoded Neon credentials; dynamic DB settings modal with `localStorage` storage | `app.js`, `index.html` | ✅ |
| 21 | **Proxy**: Vercel serverless `/api/neon.js` to bypass browser CORS preflight on Neon HTTP API | `api/neon.js`, `vercel.json` | ✅ |
| 22 | **Migration**: Switched hosting from GitHub Pages → **Vercel** (same-domain static + serverless) | `.github/workflows/deploy.yml`, `vercel.json`, `app.js` | ✅ |

---

## 📈 Project Metrics

| Metric | Value |
|---|---|
| Total Test Papers | 399 across 20 categories |
| Daily Routine Sessions | 63 sessions across 21 days |
| Database Tables | `adda_mock_logs`, `adda_ibps_checked` |
| Live URL | https://adda-timetable-revision.vercel.app |
| API Proxy | https://adda-timetable-revision.vercel.app/api/neon |
| Status Indicator | Real-time Neon Cloud DB Sync Badge |
| Last Updated | 2026-08-09 |

