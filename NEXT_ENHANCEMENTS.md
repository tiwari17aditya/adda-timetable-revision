# Next Enhancements — Implementation Queue & Completed Log

This file tracks implemented and planned enhancements for the AIR 10 Mock Test Tracker.

---

## ✅ Priority 1: Database Save Fix (NaN Guard) [COMPLETED]

**Status:** ✅ Completed
**Fix:** Added `safeNum()` and `safeInt()` numerical guards inside `saveStateToNeon()` in `app.js` to convert empty or invalid input values into safe numbers before building Postgres SQL query strings, preventing `column "nan" does not exist` errors.

---

## ✅ Priority 2: Form Default Prefill [COMPLETED]

**Status:** ✅ Completed
**Fix:** Updated `initCategoryFormOptions()` and `resetForm()` in `app.js` to auto-select `prelims_full` and prefill paper defaults (Qs, Marks, Time) automatically so logs are never saved with an empty `categoryId`.

---

## ✅ Priority 3: Visible DB Sync Status Indicator [COMPLETED]

**Status:** ✅ Completed
**Fix:** Added `#db-sync-badge` element in `index.html`, styled in `styles.css`, and controlled dynamically by `updateSyncIndicator()` in `app.js` (🟢 Synced / 🔵 Syncing... / 🔴 Sync Error).

---

## ✅ Priority 4: Neon Cloud DB Persistence & Security [COMPLETED]

**Status:** ✅ Completed
**Fix:**
- Removed hardcoded Neon credentials from `app.js` (security alert from Neon).
- Implemented dynamic DB settings modal (`#neon-config-modal`) — connection string stored securely in browser `localStorage`, never committed to source code.
- Added Vercel serverless proxy (`/api/neon.js`) to bypass browser CORS preflight issues with Neon HTTP API custom headers.
- Switched deployment from GitHub Pages to **Vercel** (static site + serverless API on same domain).
- Single-call batched SQL `INSERT ... ON CONFLICT DO UPDATE` for high-performance atomic DB writes.
- Auto-purge of stale/revoked connection strings from `localStorage`.

---

## 💡 Future Ideas

- **Offline Queue:** Queue failed DB writes and retry on next page load.
- **Per-Category Analytics:** Separate accuracy trend graph per category (Prelims vs Mains vs Chapter tests).
- **Export to PDF:** Print-friendly view of all 399 paper badges and score logs.
- **Revision Notes per Paper:** Allow attaching a text note to each paper badge (beyond just topic name).
