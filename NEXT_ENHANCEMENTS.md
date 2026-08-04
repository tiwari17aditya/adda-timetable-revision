# Next Enhancements — Pending Implementation Queue

This file tracks planned and pending enhancements for the AIR 10 Mock Test Tracker.
Each item below is ready to implement on request.

---

## 🔧 Priority 1: Database Save Fix (NaN Guard)

**Problem:** When a test score form is submitted with empty fields, JavaScript's `parseFloat("")` returns `NaN`. The SQL query builder emits `NaN` as a literal value into the SQL string, causing Postgres to reject it with:
```
column "nan" does not exist
```
Data shows in the UI (localStorage) but is **never written to the Neon Postgres database**.

**Note:** CORS is NOT the issue. Neon's HTTP API fully allows `Neon-Connection-String` from browsers:
```
access-control-allow-origin: *
access-control-allow-headers: Neon-Connection-String, ...
```

**Fix (one file, `app.js` only):** Add `safeNum()` and `safeInt()` guard helpers inside `saveStateToNeon()`:
```js
const safeNum = (v, fallback = 0) => {
    const n = typeof v === 'number' ? v : parseFloat(v);
    return (isNaN(n) || !isFinite(n)) ? fallback : n;
};
const safeInt = (v, fallback = 1) => {
    const n = typeof v === 'number' ? v : parseInt(v, 10);
    return (isNaN(n) || !isFinite(n)) ? fallback : n;
};
```
Replace all bare `${m.field || 0}` with `${safeNum(m.field, 0)}` and `${m.paperNum || 0}` with `${safeInt(m.paperNum, 1)}` in the SQL value row builder.

**Scope:** Surgical edit to `saveStateToNeon()` only. No other changes.

---

## 🔧 Priority 2: Form Default Prefill

**Problem:** Opening the Log Mock Score tab shows a blank category dropdown. If user submits without selecting a category, `categoryId` is `""` (empty string) → SQL `category_id = ''` → record saved but not visible in the right section.

**Fix:** In `initCategoryFormOptions()`, auto-select the first category (`prelims_full`) and immediately call `updatePaperNumOptions()` + `applyCategoryDefaults()` so Paper #1 is pre-selected.

**Scope:** One function change in `app.js`.

---

## 🔧 Priority 3: Visible DB Sync Status Indicator

**Enhancement:** Add a small status badge in the UI header (e.g. 🟢 Synced / 🔴 Not Synced) that reflects the real-time state of the last Neon DB write. If an error occurs, the badge turns red and shows the error message.

**Scope:** `index.html` (badge element) + `app.js` (update badge on sync success/fail).

---

## 💡 Future Ideas

- **Offline Queue:** Queue failed DB writes and retry on next page load.
- **Per-Category Analytics:** Separate accuracy trend graph per category (Prelims vs Mains vs Chapter tests).
- **Export to PDF:** Print-friendly view of all 399 paper badges and score logs.
- **Revision Notes per Paper:** Allow attaching a text note to each paper badge (beyond just topic name).
