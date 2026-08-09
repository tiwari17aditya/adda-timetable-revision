/* app.js: Banking Exam 2026 - 20 Mock Test Series Tracker (399 Papers) + IBPS PO Daily Tracker */

// 20 Mock Series Catalog Definition (399 Total Papers)
const MOCK_SERIES_CATALOG = {
    "prelims_full": {
        name: "Prelims Full Mock Test",
        totalPapers: 20,
        defaultQs: 100,
        defaultMarks: 100,
        defaultTime: 60,
        type: "prelims",
        icon: "fa-clipboard-check",
        desc: "Full length 100Q Prelims exams (Quant, Reasoning, English)"
    },
    "mbt_prelims": {
        name: "MBT Prelims",
        totalPapers: 37,
        defaultQs: 100,
        defaultMarks: 100,
        defaultTime: 60,
        type: "prelims",
        icon: "fa-brain",
        desc: "Memory Based Tests from actual past exam shifts"
    },
    "prelims_section": {
        name: "Prelims Section Tests",
        totalPapers: 30,
        defaultQs: 35,
        defaultMarks: 35,
        defaultTime: 20,
        type: "prelims",
        icon: "fa-list-ol",
        desc: "20-minute sectional speed drills"
    },
    "reasoning_chapter": {
        name: "Reasoning Chapter Test",
        totalPapers: 10,
        defaultQs: 20,
        defaultMarks: 20,
        defaultTime: 15,
        type: "topic",
        icon: "fa-puzzle-piece",
        desc: "Chapter-wise reasoning practice papers"
    },
    "quants_chapter": {
        name: "Quants Chapter Test",
        totalPapers: 20,
        defaultQs: 20,
        defaultMarks: 20,
        defaultTime: 15,
        type: "topic",
        icon: "fa-calculator",
        desc: "Chapter-wise quants practice papers"
    },
    "english_chapter": {
        name: "English Chapter Test",
        totalPapers: 5,
        defaultQs: 20,
        defaultMarks: 20,
        defaultTime: 15,
        type: "topic",
        icon: "fa-font",
        desc: "Grammar & vocabulary chapter tests"
    },
    "reasoning_topic": {
        name: "Reasoning Topic Test",
        totalPapers: 21,
        defaultQs: 15,
        defaultMarks: 15,
        defaultTime: 10,
        type: "topic",
        icon: "fa-diagram-project",
        desc: "Targeted topic-level reasoning tests"
    },
    "quants_topic": {
        name: "Quants Topic Test",
        totalPapers: 43,
        defaultQs: 15,
        defaultMarks: 15,
        defaultTime: 10,
        type: "topic",
        icon: "fa-percent",
        desc: "Topic drills for Speed Math, DI & Arithmetic"
    },
    "english_topic": {
        name: "English Topic Tests",
        totalPapers: 25,
        defaultQs: 15,
        defaultMarks: 15,
        defaultTime: 10,
        type: "topic",
        icon: "fa-spell-check",
        desc: "Reading comprehension, fillers & error spotting"
    },
    "full_length": {
        name: "Full Length Mock Test",
        totalPapers: 20,
        defaultQs: 100,
        defaultMarks: 100,
        defaultTime: 60,
        type: "prelims",
        icon: "fa-file-signature",
        desc: "Standard 100-mark full mock papers"
    },
    "section_2025": {
        name: "2025 Section Test",
        totalPapers: 30,
        defaultQs: 35,
        defaultMarks: 35,
        defaultTime: 20,
        type: "prelims",
        icon: "fa-clock-rotate-left",
        desc: "Archive sectional practice papers"
    },
    "subject_2025": {
        name: "2025 Subject Test",
        totalPapers: 30,
        defaultQs: 50,
        defaultMarks: 50,
        defaultTime: 30,
        type: "prelims",
        icon: "fa-book-open",
        desc: "Full subject tests from 2025 series"
    },
    "mains_full": {
        name: "Full Length Mock Mains",
        totalPapers: 10,
        defaultQs: 155,
        defaultMarks: 200,
        defaultTime: 180,
        type: "mains",
        icon: "fa-trophy",
        desc: "Full-length 3-hour Mains examination mocks"
    },
    "mains_section_2026": {
        name: "Mains Section Test 2026",
        totalPapers: 20,
        defaultQs: 45,
        defaultMarks: 60,
        defaultTime: 45,
        type: "mains",
        icon: "fa-chart-column",
        desc: "Advanced high-level Mains section papers"
    },
    "mains_subject_2026": {
        name: "Mains Subject Test 2026",
        totalPapers: 20,
        defaultQs: 50,
        defaultMarks: 50,
        defaultTime: 45,
        type: "mains",
        icon: "fa-graduation-cap",
        desc: "Comprehensive Mains subject tests"
    },
    "mbt_mains": {
        name: "MBT Mains",
        totalPapers: 8,
        defaultQs: 155,
        defaultMarks: 200,
        defaultTime: 180,
        type: "mains",
        icon: "fa-award",
        desc: "Memory based Mains exam shift papers"
    },
    "static_banking": {
        name: "Static Banking Topic Test",
        totalPapers: 22,
        defaultQs: 20,
        defaultMarks: 20,
        defaultTime: 12,
        type: "ca-banking",
        icon: "fa-building-columns",
        desc: "RBI, Financial Systems & Banking awareness"
    },
    "weekly_ca": {
        name: "Weekly Current Affairs",
        totalPapers: 48,
        defaultQs: 50,
        defaultMarks: 50,
        defaultTime: 25,
        type: "ca-banking",
        icon: "fa-newspaper",
        desc: "Weekly current affairs & financial bulletins"
    },
    "descriptive_test": {
        name: "Descriptive Test",
        totalPapers: 5,
        defaultQs: 2,
        defaultMarks: 25,
        defaultTime: 30,
        type: "special",
        icon: "fa-pen-nib",
        desc: "Essay & Letter writing evaluation tests"
    },
    "personality_test": {
        name: "Personality Test",
        totalPapers: 5,
        defaultQs: 1,
        defaultMarks: 100,
        defaultTime: 30,
        type: "special",
        icon: "fa-user-tie",
        desc: "Interview & GD prep evaluations"
    }
};

// Calculate Total Available Papers across all 20 categories
const TOTAL_AVAILABLE_PAPERS = Object.values(MOCK_SERIES_CATALOG).reduce((sum, item) => sum + item.totalPapers, 0); // 399

// IBPS PO Prelims Daily Schedule (Aug 2 to Aug 22) - Extracted from Gemini PDF
const IBPS_PO_SCHEDULE = [
    // Phase 1: Core Conditioning (Aug 2 - Aug 8)
    { phase: 1, phaseTitle: "Phase 1: Core Conditioning (Aug 2 - Aug 8)", date: "Aug 2", morning: "Prelims Full Mock", afternoon: "Section Test 1 (Weakest) & Section Test 2 (2nd Weakest)", evening: "Analyze Full Mock Errors, Analyze Section Tests, Log errors in notebook" },
    { phase: 1, phaseTitle: "Phase 1: Core Conditioning (Aug 2 - Aug 8)", date: "Aug 3", morning: "Prelims Full Mock", afternoon: "Section Test 1 (Weakest) & Section Test 2 (2nd Weakest)", evening: "Analyze Full Mock Errors, Analyze Section Tests, Log errors in notebook" },
    { phase: 1, phaseTitle: "Phase 1: Core Conditioning (Aug 2 - Aug 8)", date: "Aug 4", morning: "Prelims Full Mock", afternoon: "Section Test 1 (Weakest) & Section Test 2 (2nd Weakest)", evening: "Analyze Full Mock Errors, Analyze Section Tests, Log errors in notebook" },
    { phase: 1, phaseTitle: "Phase 1: Core Conditioning (Aug 2 - Aug 8)", date: "Aug 5", morning: "Prelims Full Mock", afternoon: "Section Test 1 (Weakest) & Section Test 2 (2nd Weakest)", evening: "Analyze Full Mock Errors, Analyze Section Tests, Log errors in notebook" },
    { phase: 1, phaseTitle: "Phase 1: Core Conditioning (Aug 2 - Aug 8)", date: "Aug 6", morning: "Prelims Full Mock", afternoon: "Section Test 1 (Weakest) & Section Test 2 (2nd Weakest)", evening: "Analyze Full Mock Errors, Analyze Section Tests, Log errors in notebook" },
    { phase: 1, phaseTitle: "Phase 1: Core Conditioning (Aug 2 - Aug 8)", date: "Aug 7", morning: "Prelims Full Mock", afternoon: "Section Test 1 (Weakest) & Section Test 2 (2nd Weakest)", evening: "Analyze Full Mock Errors, Analyze Section Tests, Log errors in notebook" },
    { phase: 1, phaseTitle: "Phase 1: Core Conditioning (Aug 2 - Aug 8)", date: "Aug 8", morning: "Prelims Full Mock", afternoon: "Section Test 1 (Weakest) & Section Test 2 (2nd Weakest)", evening: "Analyze Full Mock Errors, Analyze Section Tests, Log errors in notebook" },

    // Phase 2: Real-Exam Adaptation (Aug 9 - Aug 15)
    { phase: 2, phaseTitle: "Phase 2: Real-Exam Adaptation (Aug 9 - Aug 15)", date: "Aug 9", morning: "MBT Prelims (Prev Year)", afternoon: "Prelims Full Mock", evening: "Analyze MBT Paper, Analyze Full Mock, 1x Topic/Chapter Test (Weak area)" },
    { phase: 2, phaseTitle: "Phase 2: Real-Exam Adaptation (Aug 9 - Aug 15)", date: "Aug 10", morning: "MBT Prelims (Prev Year)", afternoon: "Prelims Full Mock", evening: "Analyze MBT Paper, Analyze Full Mock, 1x Topic/Chapter Test (Weak area)" },
    { phase: 2, phaseTitle: "Phase 2: Real-Exam Adaptation (Aug 9 - Aug 15)", date: "Aug 11", morning: "MBT Prelims (Prev Year)", afternoon: "Prelims Full Mock", evening: "Analyze MBT Paper, Analyze Full Mock, 1x Topic/Chapter Test (Weak area)" },
    { phase: 2, phaseTitle: "Phase 2: Real-Exam Adaptation (Aug 9 - Aug 15)", date: "Aug 12", morning: "MBT Prelims (Prev Year)", afternoon: "Prelims Full Mock", evening: "Analyze MBT Paper, Analyze Full Mock, 1x Topic/Chapter Test (Weak area)" },
    { phase: 2, phaseTitle: "Phase 2: Real-Exam Adaptation (Aug 9 - Aug 15)", date: "Aug 13", morning: "MBT Prelims (Prev Year)", afternoon: "Prelims Full Mock", evening: "Analyze MBT Paper, Analyze Full Mock, 1x Topic/Chapter Test (Weak area)" },
    { phase: 2, phaseTitle: "Phase 2: Real-Exam Adaptation (Aug 9 - Aug 15)", date: "Aug 14", morning: "MBT Prelims (Prev Year)", afternoon: "Prelims Full Mock", evening: "Analyze MBT Paper, Analyze Full Mock, 1x Topic/Chapter Test (Weak area)" },
    { phase: 2, phaseTitle: "Phase 2: Real-Exam Adaptation (Aug 9 - Aug 15)", date: "Aug 15", morning: "MBT Prelims (Prev Year)", afternoon: "Prelims Full Mock", evening: "Analyze MBT Paper, Analyze Full Mock, 1x Topic/Chapter Test (Weak area)" },

    // Phase 3: Peak Performance (Aug 16 - Aug 21)
    { phase: 3, phaseTitle: "Phase 3: Peak Performance (Aug 16 - Aug 21)", date: "Aug 16", morning: "MBT Prelims", afternoon: "Prelims Full Mock", evening: "Strict Strategy Review (MBT & Mock), Review Formula/Mistake Book" },
    { phase: 3, phaseTitle: "Phase 3: Peak Performance (Aug 16 - Aug 21)", date: "Aug 17", morning: "MBT Prelims", afternoon: "Prelims Full Mock", evening: "Strict Strategy Review (MBT & Mock), Review Formula/Mistake Book" },
    { phase: 3, phaseTitle: "Phase 3: Peak Performance (Aug 16 - Aug 21)", date: "Aug 18", morning: "MBT Prelims", afternoon: "Prelims Full Mock", evening: "Strict Strategy Review (MBT & Mock), Review Formula/Mistake Book" },
    { phase: 3, phaseTitle: "Phase 3: Peak Performance (Aug 16 - Aug 21)", date: "Aug 19", morning: "MBT Prelims", afternoon: "Prelims Full Mock", evening: "Strict Strategy Review (MBT & Mock), Review Formula/Mistake Book" },
    { phase: 3, phaseTitle: "Phase 3: Peak Performance (Aug 16 - Aug 21)", date: "Aug 20", morning: "MBT Prelims", afternoon: "Prelims Full Mock", evening: "Strict Strategy Review (MBT & Mock), Review Formula/Mistake Book" },
    { phase: 3, phaseTitle: "Phase 3: Peak Performance (Aug 16 - Aug 21)", date: "Aug 21", morning: "MBT Prelims", afternoon: "Prelims Full Mock", evening: "Strict Strategy Review (MBT & Mock), Review Formula/Mistake Book" },

    // Phase 4: Pre-Exam Cool Down (Aug 22)
    { phase: 4, phaseTitle: "Phase 4: Pre-Exam Cool Down (Aug 22)", date: "Aug 22", morning: "Revise Squares, Cubes, Tables, Revise English Grammar Rules", afternoon: "No Mocks! Review Mistakes Only", evening: "Pack bag, print Admit Card & ID, Sleep early (7-8 hours)" }
];

// Application State
const appState = {
    mocks: [],
    ibpsChecked: {}, // "Aug 2_morning" -> boolean
    systemLogs: []
};

// Logging System Console
function logEvent(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    appState.systemLogs.unshift({ timestamp, message, type });
    if (appState.systemLogs.length > 100) appState.systemLogs.pop();

    const consoleEl = document.getElementById('sys-log-console');
    if (consoleEl) {
        const logRow = document.createElement('div');
        logRow.className = `log-row ${type}`;
        logRow.innerHTML = `<span class="log-time">[${timestamp}]</span><span class="log-msg">${escapeHtml(message)}</span>`;
        consoleEl.insertBefore(logRow, consoleEl.firstChild);
        consoleEl.scrollTop = 0;
    }
    console.log(`[${type.toUpperCase()}] ${message}`);
}

function escapeHtml(text) {
    if (typeof text !== 'string') return '';
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function safeExecute(fn, context) {
    try {
        return fn();
    } catch (e) {
        logEvent(`ERR [${context}]: ${e.message}`, 'error');
        console.error(e);
        return null;
    }
}

/* Neon Serverless Postgres Cloud Sync */
const NEON_CONN_STRING = "postgresql://neondb_owner:npg_b9yrSdxR4FlT@ep-crimson-forest-ayk2jth0.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require";
const NEON_SQL_URL = "https://ep-crimson-forest-ayk2jth0.c-5.us-east-2.aws.neon.tech/sql";

async function executeNeonQuery(sqlQuery) {
    const response = await fetch(NEON_SQL_URL, {
        method: 'POST',
        headers: {
            'Neon-Connection-String': NEON_CONN_STRING,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: sqlQuery })
    });
    if (!response.ok) {
        const errText = await response.text();
        logEvent(`Neon DB HTTP Error (${response.status}): ${errText}`, "error");
        throw new Error(`HTTP ${response.status}: ${errText}`);
    }
    const data = await response.json();
    if (data.error) {
        logEvent(`Neon DB SQL Error: ${data.error}`, "error");
        throw new Error(data.error);
    }
    return data;
}


function updateSyncIndicator(status, message = '') {
    const badgeEl = document.getElementById('db-sync-badge');
    const iconEl = document.getElementById('db-sync-icon');
    const textEl = document.getElementById('db-sync-text');
    if (!badgeEl || !iconEl || !textEl) return;

    badgeEl.className = `db-sync-badge status-${status}`;
    if (status === 'syncing') {
        iconEl.className = 'fa-solid fa-arrows-rotate fa-spin';
        textEl.textContent = 'Syncing...';
        badgeEl.title = 'Synchronizing with Neon Postgres DB...';
    } else if (status === 'synced') {
        iconEl.className = 'fa-solid fa-cloud-check';
        textEl.textContent = 'Synced';
        badgeEl.title = 'Live Neon Postgres DB Connected';
    } else if (status === 'error') {
        iconEl.className = 'fa-solid fa-triangle-exclamation';
        textEl.textContent = 'Sync Error';
        badgeEl.title = message || 'Neon Cloud DB Sync Failed (Offline/Fallback Mode)';
    }
}

const safeNum = (v, fallback = 0) => {
    const n = typeof v === 'number' ? v : parseFloat(v);
    return (isNaN(n) || !isFinite(n)) ? fallback : n;
};

const safeInt = (v, fallback = 1) => {
    const n = typeof v === 'number' ? v : parseInt(v, 10);
    return (isNaN(n) || !isFinite(n)) ? fallback : n;
};

/* Data Persistence */
function saveState() {
    safeExecute(() => {
        localStorage.setItem('air10_mocks_v2', JSON.stringify(appState.mocks));
        localStorage.setItem('air10_ibps_checked', JSON.stringify(appState.ibpsChecked));
        logEvent("State saved to LocalStorage", "success");
        saveStateToNeon();
    }, "SaveState");
}

async function saveStateToNeon() {
    updateSyncIndicator('syncing');
    try {
        if (appState.mocks.length > 0) {
            const esc = (s) => (s !== undefined && s !== null ? `'${String(s).replace(/'/g, "''")}'` : "''");
            const values = appState.mocks.map(m => `(
                ${esc(m.id)}, ${esc(m.categoryId)}, ${safeInt(m.paperNum, 1)}, ${esc(m.date)}, ${esc(m.source)},
                ${safeNum(m.duration, 0)}, ${safeNum(m.totalQs, 0)}, ${safeNum(m.totalMarks, 0)}, ${safeNum(m.attempted, 0)}, ${safeNum(m.correct, 0)}, ${safeNum(m.wrong, 0)},
                ${safeNum(m.score, 0)}, ${safeNum(m.percentile, 0)}, ${safeNum(m.cutoff, 0)}, ${esc(m.weaknesses)}, ${esc(m.topicName)}, ${safeNum(m.accuracy, 0)}, ${safeNum(m.scorePct, 0)},
                ${safeNum(m.unattempted, 0)}, ${safeNum(m.speed, 0)}
            )`).join(',\n');

            const sql = `
                INSERT INTO adda_mock_logs (
                    id, category_id, paper_num, date, source, duration, total_qs, total_marks,
                    attempted, correct, wrong, score, percentile, cutoff, weaknesses, topic_name, accuracy, score_pct, unattempted, speed
                ) VALUES ${values}
                ON CONFLICT (id) DO UPDATE SET
                    category_id = EXCLUDED.category_id,
                    paper_num = EXCLUDED.paper_num,
                    date = EXCLUDED.date,
                    source = EXCLUDED.source,
                    duration = EXCLUDED.duration,
                    total_qs = EXCLUDED.total_qs,
                    total_marks = EXCLUDED.total_marks,
                    attempted = EXCLUDED.attempted,
                    correct = EXCLUDED.correct,
                    wrong = EXCLUDED.wrong,
                    score = EXCLUDED.score,
                    percentile = EXCLUDED.percentile,
                    cutoff = EXCLUDED.cutoff,
                    weaknesses = EXCLUDED.weaknesses,
                    topic_name = EXCLUDED.topic_name,
                    accuracy = EXCLUDED.accuracy,
                    score_pct = EXCLUDED.score_pct,
                    unattempted = EXCLUDED.unattempted,
                    speed = EXCLUDED.speed;
            `;
            await executeNeonQuery(sql);
            logEvent("Synced " + appState.mocks.length + " mock records to Neon Serverless Postgres DB", "success");
        }

        const ibpsEntries = Object.entries(appState.ibpsChecked);
        if (ibpsEntries.length > 0) {
            const ibpsValues = ibpsEntries.map(([id, checked]) =>
                `('${id.replace(/'/g, "''")}', ${checked ? 'TRUE' : 'FALSE'})`
            ).join(',\n');

            const ibpsSql = `
                INSERT INTO adda_ibps_checked (id, checked)
                VALUES ${ibpsValues}
                ON CONFLICT (id) DO UPDATE SET checked = EXCLUDED.checked;
            `;
            await executeNeonQuery(ibpsSql);
        }
        updateSyncIndicator('synced');
    } catch (err) {
        logEvent("Neon Cloud Sync error: " + err.message, "error");
        updateSyncIndicator('error', err.message);
    }
}



async function deleteMockFromNeon(mockId) {
    try {
        if (!mockId) return;
        const sql = `DELETE FROM adda_mock_logs WHERE id = '${mockId.replace(/'/g, "''")}';`;
        await executeNeonQuery(sql);
        logEvent(`Deleted mock ${mockId} from Neon Cloud DB`, "info");
    } catch (err) {
        logEvent("Neon delete warning: " + err.message, "warn");
    }
}

async function clearAllFromNeon() {
    try {
        await executeNeonQuery("DELETE FROM adda_mock_logs;");
        await executeNeonQuery("DELETE FROM adda_ibps_checked;");
        logEvent("Cleared all records from Neon Cloud DB", "info");
    } catch (err) {
        logEvent("Neon clear error: " + err.message, "warn");
    }
}

function migrateMockRecords(mocksArray) {
    if (!Array.isArray(mocksArray)) return [];
    const catCounters = {};

    return mocksArray.map((m, index) => {
        let catId = m.categoryId;
        if (!catId) {
            const t = (m.type || '').toLowerCase();
            if (t.includes('mains')) catId = 'mains_full';
            else if (t.includes('it') || t.includes('so')) catId = 'mains_subject_2026';
            else catId = 'prelims_full';
        }

        if (!catCounters[catId]) catCounters[catId] = 0;
        catCounters[catId]++;

        const paperNum = parseInt(m.paperNum) || catCounters[catId];
        const totalMarks = parseFloat(m.totalMarks || m.total) || 100;
        const totalQs = parseFloat(m.totalQs) || 100;
        const attempted = parseFloat(m.attempted) || 0;
        const correct = parseFloat(m.correct) || 0;
        const score = parseFloat(m.score) || 0;
        const accuracy = parseFloat(m.accuracy) || (attempted > 0 ? parseFloat(((correct / attempted) * 100).toFixed(2)) : 0);
        const scorePct = parseFloat(m.scorePct) || (totalMarks > 0 ? parseFloat(((score / totalMarks) * 100).toFixed(2)) : 0);

        return {
            id: m.id || `mock_${Date.now()}_${index}`,
            categoryId: catId,
            paperNum: paperNum,
            date: formatDateForInput(m.date),
            source: m.source || m.series || 'Adda247',
            duration: parseFloat(m.duration) || 60,
            totalQs: totalQs,
            totalMarks: totalMarks,
            attempted: attempted,
            correct: correct,
            wrong: parseFloat(m.wrong) || 0,
            score: score,
            percentile: parseFloat(m.percentile) || 0,
            cutoff: parseFloat(m.cutoff) || 0,
            weaknesses: m.weaknesses || '',
            topicName: m.topicName || m.topic_name || '',
            accuracy: accuracy,
            scorePct: scorePct,
            unattempted: parseFloat(m.unattempted) || Math.max(0, totalQs - attempted),
            speed: parseFloat(m.speed) || 0
        };
    });
}

function loadState() {
    safeExecute(() => {
        const storedV2 = localStorage.getItem('air10_mocks_v2');
        const storedOld = localStorage.getItem('air10_mocks');
        const storedIbps = localStorage.getItem('air10_ibps_checked');

        let rawMocks = [];
        if (storedV2) {
            rawMocks = JSON.parse(storedV2);
        } else if (storedOld) {
            rawMocks = JSON.parse(storedOld);
        }

        appState.mocks = migrateMockRecords(rawMocks);

        if (storedIbps) appState.ibpsChecked = JSON.parse(storedIbps);
        logEvent("Loaded and migrated " + appState.mocks.length + " mock records from local storage", "info");

        // Asynchronously load & merge from Neon Cloud DB
        loadStateFromNeon();
    }, "LoadState");
}

async function loadStateFromNeon() {
    updateSyncIndicator('syncing');
    try {
        // First push local state to Neon to avoid losing newly entered data
        if (appState.mocks.length > 0 || Object.keys(appState.ibpsChecked).length > 0) {
            await saveStateToNeon();
        }

        const logsRes = await executeNeonQuery("SELECT * FROM adda_mock_logs ORDER BY created_at DESC;");
        let updated = false;

        if (logsRes && logsRes.rows && logsRes.rows.length > 0) {
            const dbMocks = logsRes.rows.map(item => ({
                id: item.id,
                categoryId: item.category_id,
                paperNum: parseInt(item.paper_num) || 1,
                date: item.date,
                source: item.source,
                duration: parseFloat(item.duration) || 0,
                totalQs: parseFloat(item.total_qs) || 0,
                totalMarks: parseFloat(item.total_marks) || 0,
                attempted: parseFloat(item.attempted) || 0,
                correct: parseFloat(item.correct) || 0,
                wrong: parseFloat(item.wrong) || 0,
                score: parseFloat(item.score) || 0,
                percentile: parseFloat(item.percentile) || 0,
                cutoff: parseFloat(item.cutoff) || 0,
                weaknesses: item.weaknesses || "",
                topicName: item.topic_name || "",
                accuracy: parseFloat(item.accuracy) || 0,
                scorePct: parseFloat(item.score_pct) || 0,
                unattempted: parseFloat(item.unattempted) || 0,
                speed: parseFloat(item.speed) || 0
            }));

            // Smart Non-Destructive Merge: Local records override DB records to preserve edits
            const mergedMap = new Map();
            dbMocks.forEach(m => mergedMap.set(m.id, m));
            appState.mocks.forEach(m => mergedMap.set(m.id, m));

            appState.mocks = Array.from(mergedMap.values());
            updated = true;
        }

        const ibpsRes = await executeNeonQuery("SELECT * FROM adda_ibps_checked;");
        if (ibpsRes && ibpsRes.rows && ibpsRes.rows.length > 0) {
            ibpsRes.rows.forEach(item => {
                if (appState.ibpsChecked[item.id] === undefined) {
                    appState.ibpsChecked[item.id] = Boolean(item.checked);
                }
            });
            updated = true;
        }

        if (updated) {
            localStorage.setItem('air10_mocks_v2', JSON.stringify(appState.mocks));
            localStorage.setItem('air10_ibps_checked', JSON.stringify(appState.ibpsChecked));
            logEvent("Synchronized live data with Neon Postgres Database (" + appState.mocks.length + " total records)", "success");
            renderAllViews();
        }
        updateSyncIndicator('synced');
    } catch (err) {
        logEvent("Neon cloud load fallback to LocalStorage: " + err.message, "info");
        updateSyncIndicator('error', err.message);
    }
}

/* Main UI Initialization & Event Routing */
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initTabNavigation();
    initCategoryFormOptions();
    initFormListeners();
    initMatrixFilters();
    initAnalyticsTableControls();

    window.addEventListener('beforeunload', () => {
        localStorage.setItem('air10_mocks_v2', JSON.stringify(appState.mocks));
        localStorage.setItem('air10_ibps_checked', JSON.stringify(appState.ibpsChecked));
    });

    renderAllViews();
});

function renderAllViews() {
    renderHeaderStats();
    renderDashboard();
    render399Matrix();
    renderIBPSPOTracker();
    renderAnalyticsTable();
    renderMistakeVault();
}

/* Tab Navigation Router */
function initTabNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = item.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    const quickLogBtn = document.getElementById('btn-quick-nav-log');
    if (quickLogBtn) {
        quickLogBtn.addEventListener('click', () => switchTab('log-mock'));
    }
}

function switchTab(tabId) {
    document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));

    const selectedMenu = document.querySelector(`.menu-item[data-tab="${tabId}"]`);
    const selectedTab = document.getElementById(`${tabId}-tab`);

    if (selectedMenu) selectedMenu.classList.add('active');
    if (selectedTab) selectedTab.classList.remove('hidden');

    logEvent(`Navigated to view: ${tabId}`, 'info');
}

/* Header Quick Stats */
function renderHeaderStats() {
    const totalLogged = appState.mocks.length;
    const countEl = document.getElementById('header-mocks-count');
    const avgPctEl = document.getElementById('header-avg-percentile');
    const avgAccEl = document.getElementById('header-avg-accuracy');
    const completionEl = document.getElementById('header-completion-pct');

    if (countEl) countEl.textContent = `${totalLogged} / ${TOTAL_AVAILABLE_PAPERS}`;

    if (totalLogged > 0) {
        const avgPct = (appState.mocks.reduce((acc, m) => acc + (parseFloat(m.percentile) || 0), 0) / totalLogged).toFixed(2);
        const avgAcc = (appState.mocks.reduce((acc, m) => acc + (parseFloat(m.accuracy) || 0), 0) / totalLogged).toFixed(2);
        const completion = ((totalLogged / TOTAL_AVAILABLE_PAPERS) * 100).toFixed(1);

        if (avgPctEl) avgPctEl.textContent = `${avgPct}%`;
        if (avgAccEl) avgAccEl.textContent = `${avgAcc}%`;
        if (completionEl) completionEl.textContent = `${completion}%`;
    } else {
        if (avgPctEl) avgPctEl.textContent = '0.0%';
        if (avgAccEl) avgAccEl.textContent = '0.0%';
        if (completionEl) completionEl.textContent = '0.0%';
    }
}

/* Dashboard Overview View */
function renderDashboard() {
    const totalLogged = appState.mocks.length;
    const completionPct = ((totalLogged / TOTAL_AVAILABLE_PAPERS) * 100).toFixed(1);

    const textEl = document.getElementById('dashboard-completion-text');
    const barEl = document.getElementById('dashboard-completion-bar');

    if (textEl) textEl.textContent = `${totalLogged} / ${TOTAL_AVAILABLE_PAPERS} Papers (${completionPct}%)`;
    if (barEl) barEl.style.width = `${completionPct}%`;

    const avgPctVal = document.getElementById('dashboard-avg-percentile');
    const pctStatus = document.getElementById('dashboard-percentile-status');
    const avgAccVal = document.getElementById('dashboard-avg-accuracy');
    const accStatus = document.getElementById('dashboard-accuracy-status');

    if (totalLogged > 0) {
        const avgPct = (appState.mocks.reduce((acc, m) => acc + (parseFloat(m.percentile) || 0), 0) / totalLogged).toFixed(2);
        const avgAcc = (appState.mocks.reduce((acc, m) => acc + (parseFloat(m.accuracy) || 0), 0) / totalLogged).toFixed(2);

        if (avgPctVal) avgPctVal.textContent = `${avgPct}%`;
        if (pctStatus) {
            pctStatus.textContent = avgPct >= 99.5 ? "AIR 10 Qualified" : "Needs Improvement";
            pctStatus.className = `metric-indicator ${avgPct >= 99.5 ? 'text-success' : 'text-warning'}`;
        }

        if (avgAccVal) avgAccVal.textContent = `${avgAcc}%`;
        if (accStatus) {
            accStatus.textContent = avgAcc >= 90.0 ? "High Accuracy" : "Focus on Precision";
            accStatus.className = `metric-indicator ${avgAcc >= 90.0 ? 'text-success' : 'text-warning'}`;
        }
    }

    renderCategorySummaryList();
    renderRecentMocksList();
    renderTrajectoryChart();
}

function renderCategorySummaryList() {
    const container = document.getElementById('category-summary-list');
    if (!container) return;

    const groupCounts = {
        prelims: { name: "Prelims Series (107 Papers)", total: 107, count: 0 },
        mains: { name: "Mains Series (58 Papers)", total: 58, count: 0 },
        topic: { name: "Topic & Chapter (124 Papers)", total: 124, count: 0 },
        "ca-banking": { name: "Banking & CA (70 Papers)", total: 70, count: 0 },
        special: { name: "Descriptive & Interview (10 Papers)", total: 10, count: 0 }
    };

    appState.mocks.forEach(m => {
        const catObj = MOCK_SERIES_CATALOG[m.categoryId];
        if (catObj && groupCounts[catObj.type]) {
            groupCounts[catObj.type].count++;
        }
    });

    let html = '';
    Object.values(groupCounts).forEach(g => {
        const pct = ((g.count / g.total) * 100).toFixed(0);
        html += `
            <div class="cat-stat-item">
                <div class="cat-stat-header">
                    <span>${g.name}</span>
                    <span>${g.count}/${g.total} (${pct}%)</span>
                </div>
                <div class="cat-stat-bar-bg">
                    <div class="cat-stat-bar-fill" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderRecentMocksList() {
    const listEl = document.getElementById('recent-mocks-list');
    if (!listEl) return;

    if (appState.mocks.length === 0) {
        listEl.innerHTML = '<p class="placeholder-text text-center">No tests logged yet.</p>';
        return;
    }

    const recent = appState.mocks.slice(0, 5);
    let html = '<div class="recent-logs-flex" style="display:flex; flex-direction:column; gap:10px;">';

    recent.forEach(m => {
        const cat = MOCK_SERIES_CATALOG[m.categoryId] || { name: m.categoryId };
        html += `
            <div class="recent-log-row" style="background:rgba(255,255,255,0.03); padding:10px 14px; border-radius:10px; border:1px solid var(--border-color); display:flex; justify-between; align-items:center;">
                <div>
                    <strong style="font-size:0.88rem; color:#fff;">${cat.name} #${m.paperNum}</strong>
                    <div style="font-size:0.75rem; color:var(--text-muted);">${formatDateForDisplay(m.date)} | ${m.source}</div>
                </div>
                <div style="text-align:right;">
                    <span class="badge badge-accent">${m.score}/${m.totalMarks} Marks</span>
                    <div style="font-size:0.75rem; color:#34d399; margin-top:2px;">${m.percentile}%ile | ${m.accuracy}% Acc</div>
                </div>
            </div>
        `;
    });
    html += '</div>';

    listEl.innerHTML = html;
}

function renderTrajectoryChart() {
    const container = document.getElementById('mock-chart-container');
    if (!container) return;

    if (appState.mocks.length < 2) {
        container.innerHTML = `
            <div class="no-data-render">
                <i class="fa-solid fa-chart-line-down" style="font-size: 2.5rem; opacity: 0.3; margin-bottom: 10px;"></i>
                <p>Log at least 2 mock tests to view score & percentile trend trajectory.</p>
            </div>
        `;
        return;
    }

    const sortedMocks = [...appState.mocks].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-10);

    const width = 600;
    const height = 180;
    const padding = 30;

    const maxScorePct = 100;
    const pointsPct = sortedMocks.map((m, index) => {
        const x = padding + (index * (width - 2 * padding) / (sortedMocks.length - 1));
        const pctVal = parseFloat(m.percentile) || 0;
        const y = height - padding - (pctVal / maxScorePct) * (height - 2 * padding);
        return { x, y, val: pctVal, label: `${m.paperNum}` };
    });

    let pathD = `M ${pointsPct[0].x} ${pointsPct[0].y}`;
    for (let i = 1; i < pointsPct.length; i++) {
        pathD += ` L ${pointsPct[i].x} ${pointsPct[i].y}`;
    }

    let svgHtml = `
        <svg viewBox="0 0 ${width} ${height}" style="width:100%; height:100%; overflow:visible;">
            <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#d946ef" stop-opacity="0.4"/>
                    <stop offset="100%" stop-color="#d946ef" stop-opacity="0"/>
                </linearGradient>
            </defs>

            <line x1="${padding}" y1="${height - padding - (99.5 / maxScorePct) * (height - 2 * padding)}" 
                  x2="${width - padding}" y2="${height - padding - (99.5 / maxScorePct) * (height - 2 * padding)}" 
                  stroke="#10b981" stroke-dasharray="4" stroke-width="1.5"/>
            <text x="${width - padding}" y="${height - padding - (99.5 / maxScorePct) * (height - 2 * padding) - 5}" 
                  fill="#10b981" font-size="10" text-anchor="end">AIR 10 Target (99.5%)</text>

            <path d="${pathD}" fill="none" stroke="#d946ef" stroke-width="3" />

            ${pointsPct.map(p => `
                <circle cx="${p.x}" cy="${p.y}" r="5" fill="#7c3aed" stroke="#fff" stroke-width="2"/>
                <text x="${p.x}" y="${p.y - 10}" fill="#fff" font-size="10" text-anchor="middle">${p.val}%</text>
            `).join('')}
        </svg>
    `;

    container.innerHTML = svgHtml;
}

/* TAB 2: 399-PAPER TEST MATRIX VIEW */
function initMatrixFilters() {
    const filterBtns = document.querySelectorAll('#matrix-category-filters button');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            const searchVal = document.getElementById('matrix-search').value;
            render399Matrix(filter, searchVal);
        });
    });

    const searchInput = document.getElementById('matrix-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeFilter = document.querySelector('#matrix-category-filters button.active').getAttribute('data-filter');
            render399Matrix(activeFilter, e.target.value);
        });
    }
}

function render399Matrix(filter = 'all', searchQuery = '') {
    const grid = document.getElementById('matrix-series-grid');
    if (!grid) return;

    let html = '';
    const q = searchQuery.toLowerCase().trim();

    Object.entries(MOCK_SERIES_CATALOG).forEach(([catId, cat]) => {
        if (filter !== 'all' && cat.type !== filter) return;
        if (q && !cat.name.toLowerCase().includes(q) && !cat.desc.toLowerCase().includes(q)) return;

        const loggedMocks = appState.mocks.filter(m => m.categoryId === catId);
        const attemptedCount = loggedMocks.length;
        const pct = ((attemptedCount / cat.totalPapers) * 100).toFixed(0);

        let badgesHtml = '';
        for (let i = 1; i <= cat.totalPapers; i++) {
            const mockAttempt = loggedMocks.find(m => parseInt(m.paperNum) === i);
            if (mockAttempt) {
                const badgeLabel = mockAttempt.topicName ? escapeHtml(mockAttempt.topicName) : `#${i}`;
                const topicSub = mockAttempt.topicName ? `<br><small style="color:#a7f3d0;">Topic: ${escapeHtml(mockAttempt.topicName)}</small>` : '';
                badgesHtml += `
                    <div class="paper-badge completed" onclick="editMockLog('${mockAttempt.id}')" title="${escapeHtml(mockAttempt.topicName || 'Paper #' + i)}">
                        ${badgeLabel}
                        <span class="badge-tooltip">
                            Paper #${i}${topicSub}<br>
                            Score: ${mockAttempt.score}/${mockAttempt.totalMarks}<br>
                            Acc: ${mockAttempt.accuracy}% | ${mockAttempt.percentile}%ile
                        </span>
                    </div>
                `;
            } else {
                badgesHtml += `
                    <div class="paper-badge pending" onclick="openFormForPaper('${catId}', ${i})">
                        #${i}
                        <span class="badge-tooltip">Click to Log Paper #${i}</span>
                    </div>
                `;
            }
        }

        html += `
            <div class="series-card">
                <div class="series-card-header">
                    <h3><i class="fa-solid ${cat.icon} text-accent"></i> ${cat.name}</h3>
                    <span class="series-type-tag tag-${cat.type}">${cat.type}</span>
                </div>
                <div class="series-card-meta">
                    <span><i class="fa-solid fa-file"></i> ${attemptedCount}/${cat.totalPapers} Attempted</span>
                    <span><i class="fa-solid fa-list-check"></i> ${cat.defaultQs} Qs</span>
                    <span><i class="fa-solid fa-clock"></i> ${cat.defaultTime} mins</span>
                </div>
                <div class="series-progress-bar-container">
                    <div class="series-progress-bar" style="width: ${pct}%"></div>
                </div>
                <div class="paper-badge-grid">
                    ${badgesHtml}
                </div>
            </div>
        `;
    });

    grid.innerHTML = html || '<p class="placeholder-text text-center span-2">No matching mock test series found.</p>';
}

function formatDateForInput(dateStr) {
    if (!dateStr) return new Date().toISOString().split('T')[0];
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;

    // Handle "DD:MM:YYYY", "DD/MM/YYYY", "DD-MM-YYYY" formats
    if (/^\d{2}[\:\/\-]\d{2}[\:\/\-]\d{4}$/.test(dateStr)) {
        const p = dateStr.split(/[\:\/\-]/);
        return `${p[2]}-${p[1]}-${p[0]}`;
    }

    // Handle "Aug 2", "Aug 02", "August 2", etc.
    const match = String(dateStr).match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d+)/i);
    if (match) {
        const months = { jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12' };
        const m = months[match[1].toLowerCase().substring(0, 3)];
        const day = String(match[2]).padStart(2, '0');
        return `2026-${m}-${day}`;
    }

    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
        return d.toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
}

function formatDateForDisplay(dateStr) {
    if (!dateStr) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        const parts = dateStr.split('-');
        return `${parts[2]}:${parts[1]}:${parts[0]}`;
    }
    if (/^\d{2}[\:\/\-]\d{2}[\:\/\-]\d{4}$/.test(dateStr)) {
        const parts = dateStr.split(/[\:\/\-]/);
        return `${parts[0]}:${parts[1]}:${parts[2]}`;
    }
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}:${month}:${year}`;
    }
    return dateStr;
}

function openFormForPaper(categoryId, paperNum, scheduledDate = null) {
    switchTab('log-mock');
    const catSelect = document.getElementById('mock-category-select');
    if (catSelect) {
        catSelect.value = categoryId;
        updatePaperNumOptions(categoryId);
        const paperSelect = document.getElementById('mock-paper-num');
        if (paperSelect) paperSelect.value = paperNum;
        applyCategoryDefaults(categoryId);
    }

    const dateInput = document.getElementById('mock-date');
    if (dateInput) {
        dateInput.value = formatDateForInput(scheduledDate || new Date().toISOString().split('T')[0]);
    }
}

/* TAB 3: IBPS PO PRELIMS DAILY TRACKER (Aug 2 - Aug 22 PDF Strategy) */
function renderIBPSPOTracker() {
    const container = document.getElementById('ibps-phases-grid');
    if (!container) return;

    let totalSessions = IBPS_PO_SCHEDULE.length * 3; // 21 days * 3 sessions = 63 sessions
    let completedSessions = 0;

    // Group by Phase
    const phases = {};
    IBPS_PO_SCHEDULE.forEach(item => {
        if (!phases[item.phase]) {
            phases[item.phase] = { title: item.phaseTitle, days: [] };
        }
        phases[item.phase].days.push(item);
    });

    let html = '';
    Object.entries(phases).forEach(([pNum, phase]) => {
        let daysHtml = '';
        phase.days.forEach(day => {
            const mKey = `${day.date}_m`;
            const aKey = `${day.date}_a`;
            const eKey = `${day.date}_e`;

            const mDone = appState.ibpsChecked[mKey] || false;
            const aDone = appState.ibpsChecked[aKey] || false;
            const eDone = appState.ibpsChecked[eKey] || false;

            if (mDone) completedSessions++;
            if (aDone) completedSessions++;
            if (eDone) completedSessions++;

            daysHtml += `
                <div class="ibps-day-card card glass-card" style="margin-bottom: 15px; padding: 16px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                        <strong style="color:var(--accent); font-size:1rem;">${day.date} Strategy Routine</strong>
                        <div>
                            <button class="btn btn-sm btn-outline" style="margin-right:8px;" onclick="openFormForPaper('prelims_full', 1, '${day.date}')" title="Log Test for ${day.date}">
                                <i class="fa-solid fa-plus"></i> Log Mock for ${day.date}
                            </button>
                            <span class="badge badge-primary">Phase ${pNum}</span>
                        </div>
                    </div>
                    <div class="ibps-session-row" style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
                        <label class="session-chk-box ${mDone ? 'completed' : ''}" style="background:rgba(255,255,255,0.03); padding:10px; border-radius:10px; border:1px solid var(--border-color); cursor:pointer;">
                            <input type="checkbox" onchange="toggleIBPSSession('${mKey}')" ${mDone ? 'checked' : ''}>
                            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600; margin-top:4px;">MORNING</div>
                            <div style="font-size:0.82rem; color:#fff; font-weight:500;">${day.morning}</div>
                        </label>
                        <label class="session-chk-box ${aDone ? 'completed' : ''}" style="background:rgba(255,255,255,0.03); padding:10px; border-radius:10px; border:1px solid var(--border-color); cursor:pointer;">
                            <input type="checkbox" onchange="toggleIBPSSession('${aKey}')" ${aDone ? 'checked' : ''}>
                            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600; margin-top:4px;">AFTERNOON</div>
                            <div style="font-size:0.82rem; color:#fff; font-weight:500;">${day.afternoon}</div>
                        </label>
                        <label class="session-chk-box ${eDone ? 'completed' : ''}" style="background:rgba(255,255,255,0.03); padding:10px; border-radius:10px; border:1px solid var(--border-color); cursor:pointer;">
                            <input type="checkbox" onchange="toggleIBPSSession('${eKey}')" ${eDone ? 'checked' : ''}>
                            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600; margin-top:4px;">EVENING & ANALYSIS</div>
                            <div style="font-size:0.82rem; color:#fff; font-weight:500;">${day.evening}</div>
                        </label>
                    </div>
                </div>
            `;
        });

        html += `
            <div class="phase-section" style="margin-bottom:30px;">
                <h3 style="color:#fff; margin-bottom:15px; border-bottom: 2px solid var(--primary); padding-bottom: 8px;">
                    <i class="fa-solid fa-flag-checkered text-accent"></i> ${phase.title}
                </h3>
                ${daysHtml}
            </div>
        `;
    });

    container.innerHTML = html;

    // Update overall header progress bar
    const pct = ((completedSessions / totalSessions) * 100).toFixed(0);
    const txtEl = document.getElementById('ibps-completion-text');
    const barEl = document.getElementById('ibps-completion-bar');
    if (txtEl) txtEl.textContent = `${completedSessions} / ${totalSessions} Sessions Done (${pct}%)`;
    if (barEl) barEl.style.width = `${pct}%`;
}

function toggleIBPSSession(key) {
    appState.ibpsChecked[key] = !appState.ibpsChecked[key];
    saveState();
    renderIBPSPOTracker();
}

/* TAB 4: LOG MOCK RESULT FORM */
function initCategoryFormOptions() {
    const catSelect = document.getElementById('mock-category-select');
    if (!catSelect) return;

    let html = '';
    Object.entries(MOCK_SERIES_CATALOG).forEach(([catId, cat]) => {
        html += `<option value="${catId}">${cat.name} (${cat.totalPapers} Papers)</option>`;
    });
    catSelect.innerHTML = html;

    // Auto-select first category (prelims_full) by default
    catSelect.value = 'prelims_full';
    updatePaperNumOptions('prelims_full');
    applyCategoryDefaults('prelims_full');

    catSelect.addEventListener('change', (e) => {
        const catId = e.target.value;
        updatePaperNumOptions(catId);
        applyCategoryDefaults(catId);
    });

    const dateInput = document.getElementById('mock-date');
    if (dateInput && !dateInput.value) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
}


function updatePaperNumOptions(catId) {
    const paperSelect = document.getElementById('mock-paper-num');
    if (!paperSelect || !MOCK_SERIES_CATALOG[catId]) return;

    const total = MOCK_SERIES_CATALOG[catId].totalPapers;
    let html = '';
    for (let i = 1; i <= total; i++) {
        html += `<option value="${i}">Paper #${i}</option>`;
    }
    paperSelect.innerHTML = html;
}

function applyCategoryDefaults(catId) {
    const cat = MOCK_SERIES_CATALOG[catId];
    if (!cat) return;

    const totalQsInput = document.getElementById('mock-total-qs');
    const totalMarksInput = document.getElementById('mock-total-marks');
    const durationInput = document.getElementById('mock-duration');

    if (totalQsInput) totalQsInput.value = cat.defaultQs;
    if (totalMarksInput) totalMarksInput.value = cat.defaultMarks;
    if (durationInput) durationInput.value = cat.defaultTime;

    updateRealtimeFormMetrics();
}

function initFormListeners() {
    const form = document.getElementById('mock-log-form');
    const inputs = ['mock-total-qs', 'mock-total-marks', 'mock-attempted', 'mock-correct', 'mock-wrong', 'mock-score', 'mock-duration'];

    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updateRealtimeFormMetrics);
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            saveMockLogFromForm();
        });
    }

    const cancelBtn = document.getElementById('btn-cancel-edit');
    if (cancelBtn) cancelBtn.addEventListener('click', resetForm);
}

function updateRealtimeFormMetrics() {
    const totalQs = parseFloat(document.getElementById('mock-total-qs')?.value) || 0;
    const totalMarks = parseFloat(document.getElementById('mock-total-marks')?.value) || 0;
    const attempted = parseFloat(document.getElementById('mock-attempted')?.value) || 0;
    const correct = parseFloat(document.getElementById('mock-correct')?.value) || 0;
    const score = parseFloat(document.getElementById('mock-score')?.value) || 0;
    const duration = parseFloat(document.getElementById('mock-duration')?.value) || 0;

    const accuracy = attempted > 0 ? ((correct / attempted) * 100).toFixed(1) : 0;
    const scorePct = totalMarks > 0 ? ((score / totalMarks) * 100).toFixed(1) : 0;
    const unattempted = totalQs > 0 && totalQs >= attempted ? totalQs - attempted : 0;
    const speed = attempted > 0 && duration > 0 ? Math.round((duration * 60) / attempted) : 0;

    const accEl = document.getElementById('prev-accuracy');
    const scorePctEl = document.getElementById('prev-score-pct');
    const unattEl = document.getElementById('prev-unattempted');
    const speedEl = document.getElementById('prev-speed');

    if (accEl) accEl.textContent = `${accuracy}%`;
    if (scorePctEl) scorePctEl.textContent = `${scorePct}%`;
    if (unattEl) unattEl.textContent = `${unattempted}`;
    if (speedEl) speedEl.textContent = `${speed} sec/q`;
}

function saveMockLogFromForm() {
    safeExecute(() => {
        const editId = document.getElementById('edit-mock-id')?.value || '';
        const categoryId = document.getElementById('mock-category-select')?.value || 'prelims_full';
        const paperNum = parseInt(document.getElementById('mock-paper-num')?.value) || 1;
        const topicName = document.getElementById('mock-topic-name')?.value.trim() || '';
        const rawDate = document.getElementById('mock-date')?.value || new Date().toISOString().split('T')[0];
        const date = formatDateForInput(rawDate);
        const source = document.getElementById('mock-series')?.value.trim() || 'Adda247';
        const duration = safeNum(document.getElementById('mock-duration')?.value, 60);
        const totalQs = safeNum(document.getElementById('mock-total-qs')?.value, 100);
        const totalMarks = safeNum(document.getElementById('mock-total-marks')?.value, 100);
        const attempted = safeNum(document.getElementById('mock-attempted')?.value, 0);
        const correct = safeNum(document.getElementById('mock-correct')?.value, 0);
        const wrong = safeNum(document.getElementById('mock-wrong')?.value, 0);
        const score = safeNum(document.getElementById('mock-score')?.value, 0);
        const percentile = safeNum(document.getElementById('mock-percentile')?.value, 0);
        const cutoff = safeNum(document.getElementById('mock-cutoff')?.value, 0);
        const weaknesses = document.getElementById('mock-weaknesses')?.value.trim() || '';

        const accuracy = attempted > 0 ? parseFloat(((correct / attempted) * 100).toFixed(2)) : 0;
        const scorePct = totalMarks > 0 ? parseFloat(((score / totalMarks) * 100).toFixed(2)) : 0;
        const unattempted = Math.max(0, totalQs - attempted);
        const speed = attempted > 0 ? Math.round((duration * 60) / attempted) : 0;

        const mockObj = {
            id: editId || `mock_${Date.now()}`,
            categoryId,
            paperNum,
            topicName,
            date,
            source,
            duration,
            totalQs,
            totalMarks,
            attempted,
            correct,
            wrong,
            score,
            percentile,
            cutoff,
            weaknesses,
            accuracy,
            scorePct,
            unattempted,
            speed
        };

        if (editId) {
            const index = appState.mocks.findIndex(m => m.id === editId);
            if (index !== -1) appState.mocks[index] = mockObj;
            logEvent(`Updated mock log #${paperNum} for ${categoryId} on date ${date}`, 'success');
        } else {
            appState.mocks.unshift(mockObj);
            logEvent(`Logged new score: ${score}/${totalMarks} for ${MOCK_SERIES_CATALOG[categoryId]?.name || categoryId} #${paperNum} on date ${date}`, 'success');
        }

        saveState();
        resetForm();
        renderAllViews();
        switchTab('dashboard');
    }, "SaveMockForm");
}


function editMockLog(mockId) {
    const mock = appState.mocks.find(m => m.id === mockId);
    if (!mock) return;

    switchTab('log-mock');

    document.getElementById('edit-mock-id').value = mock.id;
    document.getElementById('form-title').textContent = "Edit Mock Test Result";

    const catSelect = document.getElementById('mock-category-select');
    if (catSelect) {
        catSelect.value = mock.categoryId;
        updatePaperNumOptions(mock.categoryId);
        document.getElementById('mock-paper-num').value = mock.paperNum;
    }

    if (document.getElementById('mock-topic-name')) {
        document.getElementById('mock-topic-name').value = mock.topicName || '';
    }
    document.getElementById('mock-date').value = formatDateForInput(mock.date);
    document.getElementById('mock-series').value = mock.source;
    document.getElementById('mock-duration').value = mock.duration;
    document.getElementById('mock-total-qs').value = mock.totalQs;
    document.getElementById('mock-total-marks').value = mock.totalMarks;
    document.getElementById('mock-attempted').value = mock.attempted;
    document.getElementById('mock-correct').value = mock.correct;
    document.getElementById('mock-wrong').value = mock.wrong;
    document.getElementById('mock-score').value = mock.score;
    document.getElementById('mock-percentile').value = mock.percentile;
    document.getElementById('mock-cutoff').value = mock.cutoff;
    document.getElementById('mock-weaknesses').value = mock.weaknesses;

    document.getElementById('btn-save-mock').innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Update Mock Score';
    document.getElementById('btn-cancel-edit').classList.remove('hidden');

    updateRealtimeFormMetrics();
}

function resetForm() {
    document.getElementById('mock-log-form')?.reset();
    document.getElementById('edit-mock-id').value = '';
    if (document.getElementById('mock-topic-name')) {
        document.getElementById('mock-topic-name').value = '';
    }
    const catSelect = document.getElementById('mock-category-select');
    if (catSelect) {
        catSelect.value = 'prelims_full';
        updatePaperNumOptions('prelims_full');
        applyCategoryDefaults('prelims_full');
    }
    document.getElementById('form-title').textContent = "Log Mock Test Result";
    document.getElementById('btn-save-mock').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Mock Score';
    document.getElementById('btn-cancel-edit').classList.add('hidden');
    document.getElementById('mock-date').value = new Date().toISOString().split('T')[0];
    updateRealtimeFormMetrics();
}


/* TAB 5: ANALYTICS & HISTORY TABLE VIEW */
function initAnalyticsTableControls() {
    const searchInput = document.getElementById('history-search');
    const filterCat = document.getElementById('history-filter-category');

    if (searchInput) searchInput.addEventListener('input', () => renderAnalyticsTable());
    if (filterCat) filterCat.addEventListener('change', () => renderAnalyticsTable());

    const btnExport = document.getElementById('btn-export-data');
    if (btnExport) btnExport.addEventListener('click', exportDataJSON);

    const btnClear = document.getElementById('btn-clear-logs');
    if (btnClear) btnClear.addEventListener('click', clearAllLogs);

    const btnClearSys = document.getElementById('btn-clear-sys-logs');
    if (btnClearSys) btnClearSys.addEventListener('click', () => {
        appState.systemLogs = [];
        const consoleEl = document.getElementById('sys-log-console');
        if (consoleEl) consoleEl.innerHTML = '';
    });

    const fileInput = document.getElementById('input-import-file');
    if (fileInput) fileInput.addEventListener('change', importDataJSON);
}

function renderAnalyticsTable() {
    const tableBody = document.querySelector('#mock-history-table tbody');
    const catSelect = document.getElementById('history-filter-category');
    if (!tableBody) return;

    if (catSelect && catSelect.options.length <= 1) {
        Object.entries(MOCK_SERIES_CATALOG).forEach(([catId, cat]) => {
            const opt = document.createElement('option');
            opt.value = catId;
            opt.textContent = cat.name;
            catSelect.appendChild(opt);
        });
    }

    const searchQuery = document.getElementById('history-search')?.value.toLowerCase().trim() || '';
    const selectedCat = document.getElementById('history-filter-category')?.value || 'all';

    let filtered = appState.mocks.filter(m => {
        if (selectedCat !== 'all' && m.categoryId !== selectedCat) return false;
        if (searchQuery) {
            const text = `${MOCK_SERIES_CATALOG[m.categoryId]?.name || ''} ${m.source} ${m.topicName} ${m.weaknesses} ${m.date}`.toLowerCase();
            if (!text.includes(searchQuery)) return false;
        }
        return true;
    });

    if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="10" class="text-center placeholder-text" style="padding:20px;">No matching mock test logs recorded.</td></tr>`;
        return;
    }

    let html = '';
    filtered.forEach(m => {
        const cat = MOCK_SERIES_CATALOG[m.categoryId] || { name: m.categoryId };
        const topicTag = m.topicName ? `<br><small style="color:var(--accent); font-weight:600;">📌 ${escapeHtml(m.topicName)}</small>` : '';
        html += `
            <tr>
                <td>${formatDateForDisplay(m.date)}</td>
                <td><strong style="color:#fff;">${cat.name}</strong>${topicTag}</td>
                <td><span class="badge badge-accent">Paper #${m.paperNum}</span></td>
                <td>${escapeHtml(m.source)}</td>
                <td><strong>${m.score}</strong> / ${m.totalMarks} <small style="color:var(--text-muted);">(${m.scorePct}%)</small></td>
                <td><span class="${m.accuracy >= 90 ? 'text-success' : 'text-warning'}">${m.accuracy}%</span></td>
                <td><strong class="${m.percentile >= 99.5 ? 'text-success' : 'text-accent'}">${m.percentile}%ile</strong></td>
                <td>${m.duration} mins <small style="color:var(--text-muted);">(${m.speed}s/q)</small></td>
                <td style="max-width:200px; font-size:0.8rem; color:var(--text-muted);">${escapeHtml(m.weaknesses)}</td>
                <td>
                    <button class="btn btn-sm btn-outline" onclick="editMockLog('${m.id}')" title="Edit Log"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteMockLog('${m.id}')" title="Delete Log"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = html;
}

function deleteMockLog(mockId) {
    if (!confirm("Are you sure you want to delete this mock log?")) return;
    appState.mocks = appState.mocks.filter(m => m.id !== mockId);
    saveState();
    deleteMockFromNeon(mockId);
    renderAllViews();
    logEvent("Deleted mock log record", "warn");
}

function clearAllLogs() {
    if (!confirm("WARNING: Are you sure you want to reset and clear ALL mock test logs?")) return;
    appState.mocks = [];
    appState.ibpsChecked = {};
    saveState();
    clearAllFromNeon();
    renderAllViews();
    logEvent("All mock test logs have been cleared", "error");
}

function exportDataJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState.mocks, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `AIR10_MockTracker_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    logEvent("Exported backup JSON data file", "success");
}

function importDataJSON(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
        try {
            const imported = JSON.parse(evt.target.result);
            if (Array.isArray(imported)) {
                appState.mocks = imported;
                saveState();
                renderAllViews();
                logEvent(`Imported ${imported.length} mock logs from backup file`, "success");
                alert(`Successfully imported ${imported.length} test records!`);
            } else {
                alert("Invalid file format. Expected a JSON array of mock logs.");
            }
        } catch (err) {
            alert("Error parsing JSON file: " + err.message);
        }
    };
    reader.readAsText(file);
}

/* TAB 6: MISTAKE VAULT VIEW */
function renderMistakeVault() {
    const container = document.getElementById('aggregated-weakness-tags');
    if (!container) return;

    const allNotes = appState.mocks.map(m => m.weaknesses).filter(Boolean);
    if (allNotes.length === 0) {
        container.innerHTML = '<p class="placeholder-text-small">Weakness tags will generate automatically as you log mock tests.</p>';
        return;
    }

    const keywords = ["DI", "Puzzles", "Syllogism", "Speed Math", "Reading Comprehension", "Calculation", "Silly Error", "Grammar", "Time Management", "Inequality", "Quadratic", "Seating Arrangement", "Number Series", "Skip Strategy"];
    const counts = {};

    allNotes.forEach(note => {
        keywords.forEach(kw => {
            if (note.toLowerCase().includes(kw.toLowerCase())) {
                counts[kw] = (counts[kw] || 0) + 1;
            }
        });
    });

    let html = '';
    Object.entries(counts).forEach(([tag, count]) => {
        html += `<span class="badge badge-warning" style="margin:4px; display:inline-block;">${tag} (${count}x)</span>`;
    });

    if (!html) {
        html = '<p style="font-size:0.85rem; color:var(--text-muted);">Logged mistake notes: ' + allNotes.length + ' entries recorded. Keep reviewing!</p>';
    }

    container.innerHTML = html;
}
