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

---

## 📈 Project Metrics

| Metric | Value |
|---|---|
| Total Test Papers | 399 across 20 categories |
| Daily Routine Sessions | 63 sessions across 21 days |
| Database Tables | `adda_mock_logs`, `adda_ibps_checked` |
| Live URL | https://tiwari17aditya.github.io/adda-timetable-revision/ |
| Current HEAD | `72160ac` — Topic/Chapter Name feature |
