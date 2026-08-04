# TARGET AIR 10: Banking Exam 2026 Mock Test Tracker & Strategy Dashboard

[![Deploy to GitHub Pages](https://github.com/tiwari17aditya/adda-timetable-revision/actions/workflows/deploy.yml/badge.svg)](https://github.com/tiwari17aditya/adda-timetable-revision/actions/workflows/deploy.yml)
[![Live App](https://img.shields.io/badge/Live%20App-GitHub%20Pages-brightgreen)](https://tiwari17aditya.github.io/adda-timetable-revision/)
[![Database](https://img.shields.io/badge/Database-Neon%20Serverless%20Postgres-blue)](https://neon.tech/)

A high-performance, single-page web application (SPA) for tracking **399 test papers** across **20 mock test categories** and the **IBPS PO Aug 2–Aug 22 daily execution strategy**, backed by **Neon Serverless Postgres** cloud database with multi-device sync.

🌐 **Live App**: [https://tiwari17aditya.github.io/adda-timetable-revision/](https://tiwari17aditya.github.io/adda-timetable-revision/)

---

## ✨ Features

### 📂 20 Mock Test Categories (399 Total Papers)
| # | Category | Papers |
|---|---|---|
| 1 | Prelims Full Mock Test | 20 |
| 2 | MBT Prelims (Memory Based) | 37 |
| 3 | Prelims Section Tests | 30 |
| 4 | Reasoning Chapter Test | 10 |
| 5 | Quants Chapter Test | 20 |
| 6 | English Chapter Test | 5 |
| 7 | Reasoning Topic Test | 21 |
| 8 | Quants Topic Test | 43 |
| 9 | English Topic Tests | 25 |
| 10 | Full Length Mock Test | 20 |
| 11 | 2025 Section Test | 30 |
| 12 | 2025 Subject Test | 30 |
| 13 | Full Length Mock Mains | 10 |
| 14 | Mains Section Test 2026 | 20 |
| 15 | Mains Subject Test 2026 | 20 |
| 16 | MBT Mains | 8 |
| 17 | Static Banking Topic Test | 22 |
| 18 | Weekly Current Affairs | 48 |
| 19 | Descriptive Test | 5 |
| 20 | Personality Test | 5 |

### 🏷️ Topic / Chapter Name Badges
- Enter a topic name (e.g. *Syllogism*, *Puzzles & Seating*, *Quadratic Eq*) when logging a test.
- The 399-paper matrix badge **replaces the paper number with the topic name** automatically.

### 🎯 IBPS PO Daily Execution Tracker (Aug 2–Aug 22)
- 4-Phase routine across 21 days, 63 total sessions.
- Morning / Afternoon / Evening & Analysis segments tracked interactively.

### 🗄️ Neon Serverless Postgres Cloud Sync
- All test records saved permanently in the cloud.
- Multi-device sync — access your data from any device.
- **Strict rule: data is NEVER deleted without explicit user request.**

### 📊 Real-Time Analytics & SVG Trend Graph
- Auto-calculates Accuracy %, Score %, Speed (sec/Q), Unattempted Qs.
- SVG trajectory graph plotted against AIR 10 target (99.5%ile).

### 💯 Flexible Score Inputs
- `step="any"` on all score fields — enter any integer or decimal (82.5, 74.25, 65.33, etc.).
- Dates displayed as **`DD:MM:YYYY`** across all views.

---

## 🗄️ Database Schema (Neon Postgres)

```sql
-- Mock test attempt records
CREATE TABLE IF NOT EXISTS adda_mock_logs (
    id TEXT PRIMARY KEY,
    category_id TEXT NOT NULL,
    paper_num INTEGER NOT NULL,
    date TEXT NOT NULL,
    source TEXT NOT NULL,
    duration NUMERIC, total_qs NUMERIC, total_marks NUMERIC,
    attempted NUMERIC, correct NUMERIC, wrong NUMERIC,
    score NUMERIC, percentile NUMERIC, cutoff NUMERIC,
    weaknesses TEXT, topic_name TEXT,
    accuracy NUMERIC, score_pct NUMERIC, unattempted NUMERIC, speed NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- IBPS PO schedule checklist
CREATE TABLE IF NOT EXISTS adda_ibps_checked (
    id TEXT PRIMARY KEY,
    checked BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 📁 Project Structure

```
adda-timetable-revision/
├── .agents/
│   ├── AGENTS.md                    # Agent rules: packup, DB integrity, token optimization
│   └── skills/mock-tracker-optimization/SKILL.md
├── .github/workflows/deploy.yml     # GitHub Actions → GitHub Pages CI/CD
├── index.html                       # Single-page app structure
├── app.js                           # Business logic & Neon DB adapter
├── styles.css                       # Dark-mode glassmorphism design system
├── schema.sql                       # Neon Postgres DDL
├── TECH_STACK.md                    # Technology reference
└── TOKEN_TRACKING.md                # Session & feature milestone log
```

---

## 🚀 Deployment

Every push to `main` → GitHub Actions → deploys to `gh-pages` → live at GitHub Pages.
