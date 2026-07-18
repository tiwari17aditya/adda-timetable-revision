/* app.js: Banking Exam 2026 Revision & Mock Test Tracker */

// App State Management
const appState = {
    mocks: [],
    timetableStatus: {}, // dayIndex -> boolean (true if completed)
    dailyDrills: {
        lastCheckedDate: '',
        drills: [false, false, false, false, false] // 5 drills
    },
    systemLogs: []
};

// Default Daily Drills Definition
const DRILLS_STEPS = [
    { title: "Speed Math Exercises", meta: "15 minutes calculation drills (squares, cubes, fractions, simplification)" },
    { title: "English Wordlist & Editorial Read", meta: "15 mins reading editorial & noting 5 new vocab words" },
    { title: "General Awareness Daily Quiz", meta: "15 minutes review of daily financial & current affairs quizzes" },
    { title: "Specialist IT Officer Review", meta: "15 minutes quick card revision (DBMS, OS, Networking definitions)" },
    { title: "Log Mock Test Results", meta: "Log and critique 2 mock exams to target AIR 10 standard" }
];

// Error & Log System Console Logger
function logEvent(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const logObj = { timestamp, message, type };
    appState.systemLogs.unshift(logObj);

    // Limit log memory to 100 entries
    if (appState.systemLogs.length > 100) appState.systemLogs.pop();

    // Display in UI console
    const consoleEl = document.getElementById('sys-log-console');
    if (consoleEl) {
        const logRow = document.createElement('div');
        logRow.className = `log-row ${type}`;
        logRow.innerHTML = `<span class="log-time">[${timestamp}]</span><span class="log-msg">${escapeHtml(message)}</span>`;
        consoleEl.insertBefore(logRow, consoleEl.firstChild);

        // Keep scroll top
        consoleEl.scrollTop = 0;
    }
    console.log(`[${type.toUpperCase()}] ${message}`);
}

function escapeHtml(text) {
    if (typeof text !== 'string') return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Wrap operations in Safe Try/Catch Handler
function safeExecute(fn, errorContext) {
    try {
        return fn();
    } catch (e) {
        logEvent(`ERR [${errorContext}]: ${e.message}`, 'error');
        console.error(e);
        return null;
    }
}

/* LocalStorage Systems & File Handles */
let fileHandle = null;

function saveState() {
    safeExecute(() => {
        localStorage.setItem('air10_timetable_status', JSON.stringify(appState.timetableStatus));
        localStorage.setItem('air10_mocks', JSON.stringify(appState.mocks));
        localStorage.setItem('air10_drills', JSON.stringify(appState.dailyDrills));
        logEvent("State serialized and saved to browser database", "success");

        // Auto-sync if file linked
        if (fileHandle) {
            writeStateToLinkedFile();
        }
    }, "SaveStateToLocalStorage");
}

function loadState() {
    safeExecute(() => {
        const storedTimetable = localStorage.getItem('air10_timetable_status');
        const storedMocks = localStorage.getItem('air10_mocks');
        const storedDrills = localStorage.getItem('air10_drills');

        if (storedTimetable) appState.timetableStatus = JSON.parse(storedTimetable);
        if (storedMocks) appState.mocks = JSON.parse(storedMocks);
        if (storedDrills) appState.dailyDrills = JSON.parse(storedDrills);

        const today = new Date().toDateString();
        if (appState.dailyDrills.lastCheckedDate !== today) {
            appState.dailyDrills.lastCheckedDate = today;
            appState.dailyDrills.drills = [false, false, false, false, false];
            localStorage.setItem('air10_drills', JSON.stringify(appState.dailyDrills));
            logEvent("Drills reset for the new day: " + today, "info");
        }

        logEvent("State retrieved successfully from local storage", "info");
    }, "LoadStateFromLocalStorage");
}

/* Dynamic Schedule Timetable Maker (28 Days) */
const START_DATE = new Date(2026, 6, 18); // July 18, 2026 (index 6 = July)

const TOPICS_MATRIX = [
    // Week 1
    { quant: "Speed Math (Fraction to Decimals, Squares)", logic: "Syllogism (Only/Few concepts)", english: "Editorial Revision & Hard Words", it: "OS (Process state, Thread scheduling patterns)" },
    { quant: "Quadratic Equations (Sign shortcuts)", logic: "Inequality (Coded & Direct)", english: "Closet Test Practice", it: "OS (Semaphores, Wait/Signal systems)" },
    { quant: "Simplification & Approximation speed test", logic: "Direction Sense & Blood Relations", english: "Fillers (Single & Double)", it: "DBMS (Architecture, ACID transactions)" },
    { quant: "Number Series (Wrong & Missing pattern)", logic: "Circular Puzzles (Inside/Outside)", english: "Parajumbles sentence starters", it: "DBMS (Entity-Relationship, Keys)" },
    { quant: "Prelims Mixed Quant Drill (Speed emphasis)", logic: "Linear Seating Arrangement puzzles", english: "Spotting Errors (Subject-Verb agreement)", it: "DBMS (1NF, 2NF, 3NF Normalization rules)" },
    { quant: "Data Interpretation (Bar & Line chart basics)", logic: "Double Row Arrangement puzzles", english: "Sentence Rearrangement tactics", it: "DBMS (BCNF & 4NF corner rules)" },
    { Sunday: true }, // Rest Day

    // Week 2
    { quant: "Data Interpretation (Pie chart & Table)", logic: "Coded Inequality & Input-Output basics", english: "Reading Comprehension speed drills", it: "DBMS (SQL DDL vs DML commands, joins)" },
    { quant: "DI (Caselet DI Venn-diagram solving)", logic: "Machine Input-Output (Shift & Arr)", english: "Match the column & sentence connector", it: "DBMS (Index structures, B-Trees vs B+ Trees)" },
    { quant: "Arithmetic Case study (Percentage & Ratio)", logic: "Syllogism (Reverse Syllogism)", english: "Cloze test (Mains pattern)", it: "CN (OSI Layers, Protocol stacks & ports)" },
    { quant: "Arithmetic (Profit & Loss, Discount)", logic: "Coding-Decoding (New pattern, symbols)", english: "Paragraph Completion tests", it: "CN (TCP/IP Layers, Three-way handshake)" },
    { quant: "Arithmetic (Simple & Compound Interest)", logic: "Scheduling & Month-based Puzzles", english: "Error correction (Preposition usages)", it: "CN (Subnetting, Classless CIDR IP calculation)" },
    { quant: "Data Interpretation (Arithmetic-based DI)", logic: "Category & Box Puzzles (Multi-variable)", english: "Reading Comprehension (Economy base)", it: "CN (Routing Protocols: RIP, OSPF, BGP)" },
    { Sunday: true }, // Rest Day

    // Week 3
    { quant: "Arithmetic (Time, Speed and Distance)", logic: "Data Sufficiency (2 statements)", english: "Phrase replacement vocabulary keys", it: "DS (Array representations & LinkedList variants)" },
    { quant: "Arithmetic (Trains, Boats and Streams)", logic: "Coded Blood Relation & Directions", english: "Word Swap & Usage checks", it: "DS (Stack, Queues, Circular queues)" },
    { quant: "Arithmetic (Time and Work, Pipes)", logic: "Mains Puzzle (Linear stack with coloring)", english: "Reading Comprehension (Inference questions)", it: "DS (Binary Search Trees, Traversal codes)" },
    { quant: "Arithmetic (Partnership & Average)", logic: "Mains Input-Output (Number movements)", english: "Sentence Improvement grammar checks", it: "DSA (Bubble, Insertion, Quick, Merge Sorts)" },
    { quant: "Probability & Permutations essentials", logic: "Logical Reasoning (Statement-Assumption)", english: "Mains level error detection series", it: "SE (SDLC Models: Waterfall vs Spiral vs Agile)" },
    { quant: "Mixed Arithmetic Drills (Mains level)", logic: "Critical Reasoning (Strength of Argument)", english: "Descriptive Writing practice prep", it: "SE (Whitebox vs Blackbox testing levels)" },
    { Sunday: true }, // Rest Day

    // Week 4
    { quant: "Data Interpretation (High level Mains DI)", logic: "Mains Puzzle (Floor & Flat with age)", english: "Vocabulary recap (200 words revisions)", it: "OOPs (Inheritance, Polymorphism dynamic)" },
    { quant: "DI (Probability & Mixture based DI)", logic: "Mains Data Sufficiency (3 statements)", english: "RC (Science & Tech based topics)", it: "OOPs (Abstraction vs Encapsulation, interface)" },
    { quant: "Speed Math Retest (Equations, Sequences)", logic: "Linear Seating (Direction unknown puzzles)", english: "General English Mock Tests review", it: "Web Tech (HTML, XML markup, JS scope rules)" },
    { quant: "Mains Quant section test & analysis", logic: "Mains Logical Reasoning (Course of Action)", english: "English vocabulary revision cards", it: "Cyber Security (Asymmetric/Symmetric keys)" },
    { quant: "Prelims Speed Math Drill (Formula review)", logic: "Seating arrangement (Blood relations mixed)", english: "Mains revision paper walkthroughs", it: "Cloud Concepts & DBMS Transactions recovery" },
    { quant: "Full Quant Formula Sheet Revision", logic: "Full Logical Puzzle Revision sheet", english: "Grammar rules quick notes glance", it: "Final Professional Knowledge revision checklist" },
    { Sunday: true } // Rest Day
];

function generateDateString(dayIndex) {
    const d = new Date(START_DATE);
    d.setDate(START_DATE.getDate() + dayIndex);
    return d.toLocaleDateString("en-IN", { day: 'numeric', month: 'short' });
}

function initializeTimetable(filterType = "all") {
    const timetableContainer = document.getElementById("timetable-grid-content");
    if (!timetableContainer) return;

    timetableContainer.innerHTML = "";

    let totalCompleted = 0;

    TOPICS_MATRIX.forEach((dayData, index) => {
        const isCompleted = !!appState.timetableStatus[index];
        if (isCompleted) totalCompleted++;

        // Filter checks
        if (filterType === "pending" && isCompleted) return;
        if (filterType === "completed" && !isCompleted) return;

        const dateStr = generateDateString(index);

        const card = document.createElement("div");
        card.className = `timetable-day-card ${isCompleted ? 'completed' : ''}`;
        card.dataset.dayIndex = index;

        const isSunday = dayData.Sunday;

        let detailsHtml = "";
        if (isSunday) {
            detailsHtml = `
                <div class="subject-block span-4" style="grid-column: span 4;">
                    <span class="subject-name" style="color: var(--warning);"><i class="fa-solid fa-mug-hot"></i> SUNDAY PLAN</span>
                    <span class="subject-task" style="font-weight: 500; font-size: 0.95rem;">
                        <strong>Rest, Review & Weak Point Analysis:</strong> Take a breather. Revise current affairs of the past week, analyze mock test booklets you filed during the week, log weak areas, and plan for the next cycle. Light preparation only.
                    </span>
                </div>
            `;
        } else {
            detailsHtml = `
                <div class="subject-block">
                    <span class="subject-name">PO Quantitative</span>
                    <span class="subject-task">${dayData.quant}</span>
                </div>
                <div class="subject-block">
                    <span class="subject-name">PO Reasoning</span>
                    <span class="subject-task">${dayData.logic}</span>
                </div>
                <div class="subject-block">
                    <span class="subject-name">English Grammar</span>
                    <span class="subject-task">${dayData.english}</span>
                </div>
                <div class="subject-block">
                    <span class="subject-name">SO IT Officer</span>
                    <span class="subject-task">${dayData.it}</span>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="day-badge">
                <span class="day-number">D-${index + 1}</span>
                <span class="day-date">${dateStr}</span>
            </div>
            <div class="day-details">
                ${detailsHtml}
            </div>
            <div class="day-action-checkbox">
                <input type="checkbox" class="day-checkbox" ${isCompleted ? 'checked' : ''} data-index="${index}">
            </div>
        `;

        timetableContainer.appendChild(card);
    });

    // Update overall Timetable Completion progress
    const totalDays = TOPICS_MATRIX.length;
    const progressPercent = Math.min(100, Math.round((totalCompleted / totalDays) * 100));

    const progressText = document.getElementById("timetable-completion-percentage");
    const progressBar = document.getElementById("timetable-completion-bar");

    if (progressText) progressText.innerText = `${progressPercent}%`;
    if (progressBar) progressBar.style.width = `${progressPercent}%`;

    // Bind change checks
    document.querySelectorAll(".day-checkbox").forEach(chk => {
        chk.addEventListener("change", (e) => {
            const idx = parseInt(e.target.dataset.index);
            const checked = e.target.checked;

            appState.timetableStatus[idx] = checked;

            // Toggle completed class on card parent
            const cardEl = e.target.closest(".timetable-day-card");
            if (cardEl) {
                if (checked) {
                    cardEl.classList.add("completed");
                } else {
                    cardEl.classList.remove("completed");
                }
            }

            saveState();

            // Recompute overall progress recursively
            let newCompleted = 0;
            TOPICS_MATRIX.forEach((_, tempIdx) => {
                if (appState.timetableStatus[tempIdx]) newCompleted++;
            });
            const newPercent = Math.min(100, Math.round((newCompleted / totalDays) * 100));
            if (progressText) progressText.innerText = `${newPercent}%`;
            if (progressBar) progressBar.style.width = `${newPercent}%`;

            logEvent(`Timetable Day D-${idx + 1} marked as ${checked ? 'COMPLETED' : 'PENDING'}`, "info");
        });
    });
}

/* Dashboard & Analytics Recalculators */
function updateDashboardMetrics() {
    const mocks = appState.mocks;
    const totalMocksCount = mocks.length;

    // Set counts
    const countBadge = document.getElementById("mocks-logged-count");
    if (countBadge) countBadge.innerText = totalMocksCount;

    const dashAvgPercentile = document.getElementById("dashboard-avg-percentile");
    const dashAvgAccuracy = document.getElementById("dashboard-avg-accuracy");
    const headerAvgPercentile = document.getElementById("average-percentile-badge");
    const percentileStatus = document.getElementById("dashboard-percentile-status");
    const accuracyStatus = document.getElementById("dashboard-accuracy-status");

    // Quick summary items
    const summaryAvgTime = document.getElementById("analytics-avg-time");
    const summaryBestPrelim = document.getElementById("analytics-best-prelims");
    const summaryBestSO = document.getElementById("analytics-best-so");
    const summaryPercentileStd = document.getElementById("analytics-percentile-standard");

    if (totalMocksCount === 0) {
        if (dashAvgPercentile) dashAvgPercentile.innerText = "N/A";
        if (dashAvgAccuracy) dashAvgAccuracy.innerText = "N/A";
        if (headerAvgPercentile) headerAvgPercentile.innerText = "-- %";
        if (percentileStatus) {
            percentileStatus.innerHTML = `No exams logged`;
            percentileStatus.className = "metric-indicator";
        }
        if (accuracyStatus) {
            accuracyStatus.innerHTML = `-`;
            accuracyStatus.className = "metric-indicator";
        }

        if (summaryAvgTime) summaryAvgTime.innerText = "N/A";
        if (summaryBestPrelim) summaryBestPrelim.innerText = "N/A";
        if (summaryBestSO) summaryBestSO.innerText = "N/A";
        if (summaryPercentileStd) summaryPercentileStd.innerText = "Log mock tests";

        renderNoChartData();
        renderNoRecentMocks();
        return;
    }

    let sumPercentile = 0;
    let sumAccuracy = 0;
    let sumDuration = 0;
    let maxPrelims = 0;
    let maxSO = 0;

    mocks.forEach(m => {
        sumPercentile += parseFloat(m.percentile);
        sumAccuracy += parseFloat(m.accuracy);
        sumDuration += parseFloat(m.duration);

        if (m.type === "Prelims" || m.type === "Mains") {
            if (m.score > maxPrelims) maxPrelims = m.score;
        } else if (m.type === "IT-Officer") {
            if (m.score > maxSO) maxSO = m.score;
        }
    });

    const avgPercentile = (sumPercentile / totalMocksCount).toFixed(2);
    const avgAccuracy = (sumAccuracy / totalMocksCount).toFixed(2);
    const avgDuration = (sumDuration / totalMocksCount).toFixed(0);

    // Update labels
    if (dashAvgPercentile) dashAvgPercentile.innerText = `${avgPercentile}%`;
    if (dashAvgAccuracy) dashAvgAccuracy.innerText = `${avgAccuracy}%`;
    if (headerAvgPercentile) headerAvgPercentile.innerText = `${avgPercentile}%`;

    if (summaryAvgTime) summaryAvgTime.innerText = `${avgDuration} mins`;
    if (summaryBestPrelim) summaryBestPrelim.innerText = maxPrelims > 0 ? `${maxPrelims} marks` : "N/A";
    if (summaryBestSO) summaryBestSO.innerText = maxSO > 0 ? `${maxSO} marks` : "N/A";

    // AIR 10 standard check: Percentile >= 99.50% & Accuracy >= 90%
    const isPercentileAir10 = avgPercentile >= 99.50;
    const isAccuracyAir10 = avgAccuracy >= 90.00;

    if (percentileStatus) {
        if (isPercentileAir10) {
            percentileStatus.innerHTML = `<i class="fa-solid fa-check-circle"></i> On Track for AIR 10`;
            percentileStatus.className = "metric-indicator text-success";
        } else if (avgPercentile >= 95.0) {
            percentileStatus.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Borderline (Target: 99.5%+)`;
            percentileStatus.className = "metric-indicator text-warning";
        } else {
            percentileStatus.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Boost Percentile!`;
            percentileStatus.className = "metric-indicator text-danger";
        }
    }

    if (accuracyStatus) {
        if (isAccuracyAir10) {
            accuracyStatus.innerHTML = `<i class="fa-solid fa-check-circle"></i> Good Accuracy`;
            accuracyStatus.className = "metric-indicator text-success";
        } else {
            accuracyStatus.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Focus on Negative Marks!`;
            accuracyStatus.className = "metric-indicator text-warning";
        }
    }

    // Overall Track Indicator
    const ratingRing = document.getElementById("circle-overall-rating");
    const statusText = document.getElementById("overall-status-text");
    if (ratingRing && statusText) {
        ratingRing.className = "metric-circle";
        if (isPercentileAir10 && isAccuracyAir10) {
            ratingRing.classList.add("ring-success");
            statusText.innerText = "AIR 10 Zone";
            statusText.style.color = "var(--success)";
            if (summaryPercentileStd) summaryPercentileStd.innerText = "Excellent. Maintain speed!";
        } else if (avgPercentile >= 97.0) {
            ratingRing.classList.add("ring-warning");
            statusText.innerText = "Competitive";
            statusText.style.color = "var(--warning)";
            if (summaryPercentileStd) summaryPercentileStd.innerText = "Analyze errors daily to gain 2%.";
        } else {
            ratingRing.classList.add("ring-danger");
            statusText.innerText = "Requires Effort";
            statusText.style.color = "var(--danger)";
            if (summaryPercentileStd) summaryPercentileStd.innerText = "Accuracy too low. Slow down Qs.";
        }
    }

    renderChart(mocks);
    renderRecentMocksPanel(mocks);
    updateWeaknessTags(mocks);
}

function updateWeaknessTags(mocks) {
    const container = document.getElementById("aggregated-weakness-tags");
    if (!container) return;

    container.innerHTML = "";

    // Scrape weakness keywords
    const keywords = [];
    mocks.forEach(m => {
        if (!m.weaknesses) return;
        // split by comma or periods
        const parts = m.weaknesses.split(/[,.]/);
        parts.forEach(p => {
            const clean = p.trim().substring(0, 30);
            if (clean && clean.length > 3 && !keywords.includes(clean)) {
                keywords.push(clean);
            }
        });
    });

    if (keywords.length === 0) {
        container.innerHTML = `<p class="placeholder-text-small">No weaknesses logged yet</p>`;
        return;
    }

    // Render up to 6 unique weakness tags
    keywords.slice(0, 6).forEach(word => {
        const tag = document.createElement("span");
        tag.className = "weakness-tag";
        tag.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${escapeHtml(word)}`;
        container.appendChild(tag);
    });
}

function renderNoChartData() {
    const container = document.getElementById("mock-chart-container");
    if (!container) return;
    container.innerHTML = `
        <div class="no-data-render">
            <i class="fa-solid fa-chart-line-down" style="font-size: 2.2rem; opacity: 0.3; margin-bottom: 8px;"></i>
            <p>No data recorded yet.</p>
        </div>
    `;
}

function renderNoRecentMocks() {
    const listContainer = document.getElementById("recent-mocks-list");
    if (listContainer) {
        listContainer.innerHTML = `<p class="placeholder-text text-center" style="font-size: 0.8rem; color: var(--text-muted);">No tests logged yet.</p>`;
    }
}

function renderChart(mocks) {
    const container = document.getElementById("mock-chart-container");
    if (!container) return;

    container.innerHTML = "";

    const chartG = document.createElement("div");
    chartG.className = "chart-visual-graph";

    // Get last 7 mocks in chronologic order
    const displayed = mocks.slice(-7);

    displayed.forEach((m, idx) => {
        const col = document.createElement("div");
        col.className = "chart-bar-col";

        const pt = parseFloat(m.percentile);

        const bar = document.createElement("div");
        bar.className = "chart-bar-fill";
        bar.style.height = `${pt * 0.95}%`; // limit to fit top padding

        const tooltip = document.createElement("div");
        tooltip.className = "chart-bar-tooltip";
        tooltip.innerText = `${m.type} - P: ${m.percentile}% (S: ${m.score})`;

        bar.appendChild(tooltip);

        const label = document.createElement("div");
        label.className = "chart-bar-label";
        label.innerText = `M-${idx + 1}`;

        col.appendChild(bar);
        col.appendChild(label);
        chartG.appendChild(col);
    });

    container.appendChild(chartG);
}

function renderRecentMocksPanel(mocks) {
    const listContainer = document.getElementById("recent-mocks-list");
    if (!listContainer) return;

    listContainer.innerHTML = "";

    // Show last 3 mocks
    const recent = mocks.slice(-3).reverse();
    recent.forEach(m => {
        const item = document.createElement("div");
        item.className = "recent-mock-item";

        const ptVal = parseFloat(m.percentile);
        let ptClass = "text-danger";
        if (ptVal >= 99.5) ptClass = "text-success";
        else if (ptVal >= 95.0) ptClass = "text-warning";

        item.innerHTML = `
            <div class="mock-item-meta">
                <span class="mock-item-title">${escapeHtml(m.source)} (${escapeHtml(m.type)})</span>
                <span class="mock-item-sub">Time: ${m.duration} mins | Score: ${m.score}/${m.total}</span>
            </div>
            <div class="mock-item-grade">
                <span class="mock-item-percentile ${ptClass}">${ptVal}%</span>
                <span class="badge ${ptVal >= 99.5 ? 'badge-success' : (ptVal >= 95 ? 'badge-warning' : 'badge-danger')}">${ptVal >= 99.5 ? 'AIR 10' : 'Warning'}</span>
            </div>
        `;
        listContainer.appendChild(item);
    });
}

function populateHistoryTable() {
    const tableBody = document.querySelector("#mock-history-table tbody");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (appState.mocks.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="10" class="text-center" style="color: var(--text-muted); font-size: 0.82rem;">No mock tests logged yet. Enter your scores above.</td></tr>`;
        return;
    }

    // Display in reverse chronological order
    appState.mocks.slice().reverse().forEach((m, displayIdx) => {
        // Find true index in appState.mocks
        const originalIndex = appState.mocks.indexOf(m);
        const row = document.createElement("tr");

        const cleanDate = new Date(m.date).toLocaleDateString("en-IN", { day: '2-digit', month: '2-digit' });

        row.innerHTML = `
            <td>${cleanDate}</td>
            <td style="font-family: monospace; font-size: 0.72rem;">#${String(originalIndex + 1).padStart(3, '0')}</td>
            <td><span class="badge ${m.type === 'Prelims' ? 'badge-primary' : (m.type === 'Mains' ? 'badge-accent' : 'badge-success')}">${m.type}</span></td>
            <td>${escapeHtml(m.source)}</td>
            <td><strong>${m.score}</strong> / ${m.total}</td>
            <td class="${m.percentile >= 99.5 ? 'text-success' : (m.percentile >= 95 ? 'text-warning' : 'text-danger')}" style="font-weight:700;">${m.percentile}%</td>
            <td>${m.accuracy}%</td>
            <td>${m.duration} mins</td>
            <td style="max-width: 250px; font-size: 0.75rem; color: var(--text-muted);" title="${escapeHtml(m.weaknesses)}">${escapeHtml(m.weaknesses.substring(0, 48))}${m.weaknesses.length > 48 ? '...' : ''}</td>
            <td>
                <button class="btn-delete-row" data-id="${originalIndex}">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Bind deletes
    document.querySelectorAll(".btn-delete-row").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idx = parseInt(e.currentTarget.dataset.id);
            if (confirm(`Do you wish to delete Mock result #${idx + 1}?`)) {
                logEvent(`Deleting Mock result entry #${idx + 1} (${appState.mocks[idx].source})`, "warn");
                appState.mocks.splice(idx, 1);
                saveState();
                populateHistoryTable();
                updateDashboardMetrics();
            }
        });
    });
}

function handleMockFormSubmit(e) {
    e.preventDefault();

    const mockDate = document.getElementById("mock-date").value;
    const mockType = document.getElementById("mock-type").value;
    const mockSeries = document.getElementById("mock-series").value;
    const mockDuration = parseInt(document.getElementById("mock-duration").value);
    const mockScore = parseFloat(document.getElementById("mock-score").value);
    const mockTotal = parseInt(document.getElementById("mock-total").value);
    const mockPercentile = parseFloat(document.getElementById("mock-percentile").value);
    const mockAccuracy = parseFloat(document.getElementById("mock-accuracy").value);
    const mockWeaknesses = document.getElementById("mock-weaknesses").value;

    // Validation
    if (mockScore > mockTotal) {
        logEvent(`Error checking: Score (${mockScore}) cannot exceed Total Marks (${mockTotal})`, "error");
        alert("Input error: Score cannot exceed Total Marks.");
        return;
    }

    if (mockPercentile < 0 || mockPercentile > 100 || mockAccuracy < 0 || mockAccuracy > 100) {
        logEvent(`Error checking: Percentile/Accuracy must be in range 0 - 100`, "error");
        alert("Input error: Percentile and Accuracy must be between 0 and 100.");
        return;
    }

    const newMock = {
        date: mockDate || new Date().toISOString().split('T')[0],
        type: mockType,
        source: mockSeries,
        duration: mockDuration,
        score: mockScore,
        total: mockTotal,
        percentile: mockPercentile,
        accuracy: mockAccuracy,
        weaknesses: mockWeaknesses
    };

    appState.mocks.push(newMock);
    saveState();

    logEvent(`Mock Test logged successfully: ${mockSeries} (${mockType}) - Score: ${mockScore}/${mockTotal}, Percentile: ${mockPercentile}%`, "success");

    // Reset Form fields except date
    document.getElementById("mock-type").selectedIndex = 0;
    document.getElementById("mock-series").value = "";
    document.getElementById("mock-duration").value = "";
    document.getElementById("mock-score").value = "";
    document.getElementById("mock-total").value = "";
    document.getElementById("mock-percentile").value = "";
    document.getElementById("mock-accuracy").value = "";
    document.getElementById("mock-weaknesses").value = "";

    populateHistoryTable();
    updateDashboardMetrics();
}

/* Timed 50-Q Quiz Engine */
// To fit memory requirements, we programmatically output 50 questions from a dynamic generator function.
const SECTIONS = ['Quantitative Aptitude', 'Reasoning Ability', 'English Language', 'General Awareness', 'Specialist IT Officer'];
let activeQuizQuestions = [];
let userAnswers = {}; // questionIndex -> selectedIndex
let quizTimerId = null;
let timeRemainingSeconds = 2400; // 40 minutes default
let activeQuestionIndex = 0;

// Programmtically generated 50 item mock questions bank
function createQuizQuestionBank() {
    const list = [];

    // Let's populate 10 topics for each of the 5 sections
    for (let secIdx = 0; secIdx < 5; secIdx++) {
        const sectionName = SECTIONS[secIdx];

        for (let qIdx = 0; qIdx < 10; qIdx++) {
            const questionNumber = secIdx * 10 + qIdx + 1;
            let query = "";
            let options = [];
            let correct = 0;
            let explanation = "";

            if (sectionName === 'Quantitative Aptitude') {
                if (qIdx === 0) {
                    query = "Find the next value in the given number pattern sequence: 8, 9, 20, 63, 256, ?";
                    options = ["1285", "1280", "1290", "1295"];
                    correct = 0;
                    explanation = "The pattern is: $8 \\times 1 + 1 = 9$, $9 \\times 2 + 2 = 20$, $20 \\times 3 + 3 = 63$, $63 \\times 4 + 4 = 256$, and $256 \\times 5 + 5 = 1285$. Option A is correct.";
                } else if (qIdx === 1) {
                    query = "In a mixture of 80 liters, milk and water ratio is 5:3. How much water (in liters) must be added so the ratio becomes 5:4?";
                    options = ["8 liters", "10 liters", "12 liters", "15 liters"];
                    correct = 1;
                    explanation = "Initial milk = $80 \\times 5/8 = 50$ liters, water = 30 liters. To make milk:water = 5:4, since milk remains 50, water must become 40. Water to add = $40 - 30 = 10$ liters.";
                } else if (qIdx === 2) {
                    query = "What is the approximate answer for: $\\sqrt{1444.02} \\times 2.03 + (15.01)^2 = ?$";
                    options = ["298", "305", "301", "287"];
                    correct = 2;
                    explanation = "$\\sqrt{1444} \\approx 38$. $38 \\times 2 = 76$. $15^2 = 225$. $76 + 225 = 301$.";
                } else {
                    // Generate variable arithmetic questions
                    const numA = 10 + qIdx * 5;
                    const numB = 5 + qIdx * 3;
                    query = `If ${numA} items are bought for Rs 120 and sold at Rs 150, find the average profit percentage per item.`;
                    options = ["25.00%", "20.00%", "30.00%", "15.00%"];
                    correct = 0;
                    explanation = `Profit = 150 - 120 = 30. Profit percentage = (30 / 120) * 100 = 25%.`;
                }
            } else if (sectionName === 'Reasoning Ability') {
                if (qIdx === 0) {
                    query = "Statements: All stars are planets. Some planets are galaxies. Conclusions: I. Some stars are galaxies. II. No star is galaxy.";
                    options = ["Only I follows", "Only II follows", "Either I or II follows", "Neither I nor II follows"];
                    correct = 2;
                    explanation = "Because stars and galaxies are not directly linked but are complementary pairs ('Some' and 'No'), 'Either I or II follows' is the correct logical deduction.";
                } else if (qIdx === 1) {
                    query = "If P @ Q means P is north of Q, P # Q means P is east of Q, P $ Q means P is south of Q. Given: A @ B # C $ D. What is direction of D with respect of B?";
                    options = ["East", "West", "Southeast", "Cannot be determined"];
                    correct = 3;
                    explanation = "We do not know the exact distances between nodes; hence A @ B # C $ D can put D north, south, or inline east of B. Distance is required.";
                } else {
                    query = `Six persons (A, B, C, D, E, F) sit around a circle facing center. C sits 2nd to right of A. F sits immediate left of B. If questions target seating, who sits opposite to ${String.fromCharCode(65 + qIdx % 6)}?`;
                    options = ["B", "D", "E", "Depends on exact placement"];
                    correct = 3;
                    explanation = "Circle configuration requires full constraints list. Dynamic puzzle.";
                }
            } else if (sectionName === 'English Language') {
                if (qIdx === 0) {
                    query = "Choose the synonym for 'OBDURATE':";
                    options = ["Stubborn", "Flexible", "Clever", "Transient"];
                    correct = 0;
                    explanation = "'Obdurate' means stubbornly refusing to change one's opinion or course of action. Stubborn is correct.";
                } else if (qIdx === 1) {
                    query = "Identify correct spelling:";
                    options = ["Conscientious", "Conscientes", "Conscientous", "Consientous"];
                    correct = 0;
                    explanation = "The correct spelling is 'Conscientious' (guided by one's sense of right and wrong).";
                } else {
                    query = "Improve the underlined segment: 'No sooner did he reached the hall than the bell rang.'";
                    options = ["no sooner did he reach", "no sooner had he reach", "no sooner did he reached", "No improvement"];
                    correct = 0;
                    explanation = "'Did' takes bare infinitive form of verb ('reach'). So 'did he reach' is grammatically correct.";
                }
            } else if (sectionName === 'General Awareness') {
                if (qIdx === 0) {
                    query = "What does the abbreviation 'MSF' stand for in monetary policy terms of the RBI?";
                    options = ["Marginal Standing Facility", "Markets Stabilization Fund", "Monetary System Finance", "Mutual Secondary Funding"];
                    correct = 0;
                    explanation = "MSF stands for Marginal Standing Facility, which allows commercial banks to borrow overnight funds from RBI against Govt securities at a rate higher than repo.";
                } else if (qIdx === 1) {
                    query = "Which entity regulates the credit rating agencies operating in India?";
                    options = ["SEBI", "RBI", "IRDAI", "NABARD"];
                    correct = 0;
                    explanation = "The Securities and Exchange Board of India (SEBI) regulates credit rating agencies under SEBI Regulations 1999.";
                } else {
                    query = `Under the direct tax collection targets, what is the capital expenditure focus of the Union Budget for the fiscal year 2026?`;
                    options = ["Infrastructure & digital network growth", "Agri-business subsidies only", "Interest obligations reduction", "None of these"];
                    correct = 0;
                    explanation = "Budget 2026 places prime capital allocation emphasis on Infrastructure, green fuel initiatives, and digital networks.";
                }
            } else if (sectionName === 'Specialist IT Officer') {
                if (qIdx === 0) {
                    query = "Which transaction isolation level prevents both Dirty Reads and Non-repeatable Reads, but allows Phantom Reads?";
                    options = ["Read Committed", "Repeatable Read", "Read Uncommitted", "Serializable"];
                    correct = 1;
                    explanation = "Repeatable Read prevents Dirty and Non-repeatable Reads. Phantom Reads can only be completely fully locked out under Serializable isolation level.";
                } else if (qIdx === 1) {
                    query = "In DBMS normalization theory, a relation is in BCNF if for every non-trivial functional dependency X -> Y:";
                    options = ["X is a super key", "Y is a prime attribute", "X and Y are prime attributes", "None of the above"];
                    correct = 0;
                    explanation = "By definition, a relation is in Boyce-Codd Normal Form (BCNF) if and only if for every non-trivial functional dependency X -> Y, X is a super key of the schema.";
                } else if (qIdx === 2) {
                    query = "Which CPU scheduling algorithm scheduling policy is optimal in terms of minimizing average waiting time but suffers from process starvation?";
                    options = ["Shortest Job First (SJF)", "First Come First Served (FCFS)", "Round Robin", "Priority Scheduling"];
                    correct = 0;
                    explanation = "SJF (Shortest Job First) is optimal. Processes with long CPU bursts suffer starvation if short jobs arrive repeatedly.";
                } else if (qIdx === 3) {
                    query = "What is the network class category of the IP address 192.168.1.1?";
                    options = ["Class A", "Class B", "Class C", "Class D"];
                    correct = 2;
                    explanation = "Class C range is 192.0.0.0 to 223.255.255.255. Thus, 192.168.1.1 belongs to Class C.";
                } else if (qIdx === 4) {
                    query = "Which protocol is responsible for mapping an IP address to a physical MAC address on a local area network?";
                    options = ["ARP", "DHCP", "DNS", "ICMP"];
                    correct = 0;
                    explanation = "Address Resolution Protocol (ARP) translates logical IP addresses to MAC sub-layer hardware addresses.";
                } else if (qIdx === 5) {
                    query = "In object-oriented programming, which feature refers to the ability of different classes to respond of the same message call in unique ways?";
                    options = ["Polymorphism", "Encapsulation", "Inheritance", "Abstraction"];
                    correct = 0;
                    explanation = "Polymorphism (many forms) allows subclass custom overriding of base class method interfaces.";
                } else {
                    query = `In Data Structures, what is the average time complexity complexity for searching an item in a balanced Binary Search Tree (BST)?`;
                    options = ["O(log n)", "O(n)", "O(1)", "O(n log n)"];
                    correct = 0;
                    explanation = "Searching in a balanced BST splits search scope in half at each step, yielding average time complexity of O(log n).";
                }
            }

            list.push({
                index: questionNumber,
                section: sectionName,
                q: query || `Sample question placeholder for ${sectionName} #${qIdx + 1}`,
                options: options.length > 0 ? options : ["A", "B", "C", "D"],
                correctAnswer: correct,
                explanation: explanation || `Detailed step explanation for ${sectionName} practice item #${qIdx + 1}.`
            });
        }
    }

    return list;
}

function startQuiz() {
    activeQuizQuestions = createQuizQuestionBank();
    userAnswers = {};
    activeQuestionIndex = 0;
    timeRemainingSeconds = 2400; // 40 mins

    document.getElementById("quiz-intro-state").classList.add("hidden");
    document.getElementById("quiz-active-state").classList.remove("hidden");
    document.getElementById("quiz-result-state").classList.add("hidden");
    document.getElementById("quiz-solutions-pane").classList.add("hidden");

    initializeQuestionNavigator();
    showQuestion(0);
    startTimer();

    logEvent("Daily 50-Q Timed Quiz started by user. 40 minutes remaining limit.", "info");
}

function startTimer() {
    if (quizTimerId) clearInterval(quizTimerId);

    const displayEl = document.getElementById("timer-countdown");

    quizTimerId = setInterval(() => {
        timeRemainingSeconds--;

        let minutes = Math.floor(timeRemainingSeconds / 60);
        let seconds = timeRemainingSeconds % 60;

        if (displayEl) {
            displayEl.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }

        if (timeRemainingSeconds <= 0) {
            clearInterval(quizTimerId);
            logEvent("Time limit exceeded. Submitting quiz answers automatically.", "warn");
            submitQuiz(true);
        }
    }, 1000);
}

function stopTimer() {
    if (quizTimerId) {
        clearInterval(quizTimerId);
        quizTimerId = null;
    }
}

function initializeQuestionNavigator() {
    const gridEl = document.getElementById("question-button-grid");
    if (!gridEl) return;

    gridEl.innerHTML = "";

    for (let index = 0; index < 50; index++) {
        const marker = document.createElement("div");
        marker.className = "grid-marker";
        marker.id = `marker-btn-${index}`;
        marker.innerText = index + 1;
        marker.addEventListener("click", () => {
            showQuestion(index);
        });
        gridEl.appendChild(marker);
    }
}

function showQuestion(index) {
    if (index < 0 || index >= 50) return;

    activeQuestionIndex = index;

    // Set active status to maps
    document.querySelectorAll(".grid-marker").forEach(m => m.classList.remove("active"));
    const marker = document.getElementById(`marker-btn-${index}`);
    if (marker) marker.classList.add("active");

    // Load Question Info
    const q = activeQuizQuestions[index];

    document.getElementById("q-subject").innerText = q.section;
    document.getElementById("q-text").innerText = `${q.index}. ${q.q}`;

    // Load Options
    const optContainer = document.getElementById("q-options-list");
    optContainer.innerHTML = "";

    const savedAnswer = userAnswers[index];

    q.options.forEach((optText, optIdx) => {
        const btn = document.createElement("button");
        btn.className = `option-btn ${savedAnswer === optIdx ? 'selected' : ''}`;
        btn.innerText = optText;

        btn.addEventListener("click", () => {
            selectOption(index, optIdx);
        });

        optContainer.appendChild(btn);
    });

    // Update Question Counter Layout
    document.getElementById("quiz-question-counter").innerText = `Question ${index + 1} of 50`;

    // Progress bar marker
    const prog = document.getElementById("quiz-progress-marker");
    if (prog) prog.style.width = `${((index + 1) / 50) * 100}%`;
}

function selectOption(qIdx, optIdx) {
    userAnswers[qIdx] = optIdx;

    // Re-highlight option buttons in UI
    const btns = document.querySelectorAll("#q-options-list .option-btn");
    btns.forEach((btn, idx) => {
        if (idx === optIdx) btn.classList.add("selected");
        else btn.classList.remove("selected");
    });

    // Update navigator marker class
    const marker = document.getElementById(`marker-btn-${qIdx}`);
    if (marker) {
        marker.classList.remove("skipped");
        marker.classList.add("answered");
    }

    logEvent(`Selected Option ${String.fromCharCode(65 + optIdx)} for Question #${qIdx + 1}`, "info");
}

function navigateQuestion(direction) {
    const nextIdx = activeQuestionIndex + direction;
    if (nextIdx >= 0 && nextIdx < 50) {
        showQuestion(nextIdx);
    }
}

function skipQuestion() {
    const marker = document.getElementById(`marker-btn-${activeQuestionIndex}`);
    if (marker && !marker.classList.contains("answered")) {
        marker.classList.add("skipped");
    }
    navigateQuestion(1);
}

function submitQuiz(auto = false) {
    stopTimer();

    // Compile scorecard
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    const sectionalScores = {
        'Quantitative Aptitude': 0,
        'Reasoning Ability': 0,
        'English Language': 0,
        'General Awareness': 0,
        'Specialist IT Officer': 0
    };

    activeQuizQuestions.forEach((q, idx) => {
        const uAns = userAnswers[idx];
        if (uAns === undefined) {
            unansweredCount++;
        } else if (uAns === q.correctAnswer) {
            correctCount++;
            sectionalScores[q.section]++;
        } else {
            incorrectCount++;
        }
    });

    // Negative marks of -0.25 standard limit
    const totalScore = parseFloat((correctCount - (incorrectCount * 0.25)).toFixed(2));
    const timeSpentMins = Math.ceil((2400 - timeRemainingSeconds) / 60);

    // Save to daily state
    let streakCount = parseInt(localStorage.getItem('air10_quiz_streak') || '0');
    streakCount++;
    localStorage.setItem('air10_quiz_streak', String(streakCount));

    const streakEl = document.getElementById("quiz-streak");
    if (streakEl) streakEl.innerText = `${streakCount} days`;

    // Draw scorecard screen
    document.getElementById("quiz-active-state").classList.add("hidden");
    document.getElementById("quiz-result-state").classList.remove("hidden");

    // Adjust scoring texts
    const titleEl = document.getElementById("result-status-title");
    const summaryEl = document.getElementById("result-scoring-summary");
    const badgeIcon = document.getElementById("quiz-achievement-badge");

    if (titleEl) {
        titleEl.innerText = auto ? "Time Expired! Quiz Submitted" : "Quiz Completed!";
    }

    if (summaryEl) {
        summaryEl.innerHTML = `You scored <strong>${totalScore}</strong> out of 50. Correct: ${correctCount} | Incorrect: ${incorrectCount} | Skipped: ${unansweredCount}. Time taken: ${timeSpentMins} minutes.`;
    }

    // Achievement indicator
    if (badgeIcon) {
        if (totalScore >= 42.0) {
            badgeIcon.style.background = "linear-gradient(135deg, #10b981, #3b82f6)";
            badgeIcon.innerHTML = `<i class="fa-solid fa-crown"></i>`;
            logEvent("AIR 10 Zone Achieved in Daily Practice Test!", "success");
        } else if (totalScore >= 35.0) {
            badgeIcon.style.background = "linear-gradient(135deg, #f59e0b, #d946ef)";
            badgeIcon.innerHTML = `<i class="fa-solid fa-medal"></i>`;
        } else {
            badgeIcon.style.background = "linear-gradient(135deg, #ef4444, #7c3aed)";
            badgeIcon.innerHTML = `<i class="fa-solid fa-brain"></i>`;
        }
    }

    // Sectional markup
    const sectionContainer = document.getElementById("sectional-score-container");
    if (sectionContainer) {
        sectionContainer.innerHTML = "";
        SECTIONS.forEach(secTitle => {
            const secScore = sectionalScores[secTitle];
            const div = document.createElement("div");
            div.className = "sectional-card";
            div.innerHTML = `
                <span class="sect-label">${secTitle.substring(0, 15)}</span>
                <span class="sect-val">${secScore}/10</span>
            `;
            sectionContainer.appendChild(div);
        });
    }

    // Load Solutions List
    populateSolutionsPanel();

    logEvent(`Quiz performance evaluation: Score = ${totalScore}/50. Correct = ${correctCount}. Persistence complete.`, "success");
}

function populateSolutionsPanel() {
    const listEl = document.getElementById("solutions-list-content");
    const containerEl = document.getElementById("quiz-solutions-pane");
    if (!listEl || !containerEl) return;

    listEl.innerHTML = "";
    containerEl.classList.remove("hidden");

    activeQuizQuestions.forEach((q, idx) => {
        const item = document.createElement("div");
        item.className = "sol-item";

        const uAns = userAnswers[idx];
        const isCorrect = uAns === q.correctAnswer;

        let verdictClass = "sol-verdict-incorrect";
        let verdictText = `Incorrect (Your choice: Option ${String.fromCharCode(65 + uAns)})`;

        if (uAns === undefined) {
            verdictClass = "sol-verdict-skipped";
            verdictText = "Skipped / Unanswered";
        } else if (isCorrect) {
            verdictClass = "sol-verdict-correct";
            verdictText = "Correct Answer";
        }

        item.innerHTML = `
            <div class="sol-header">
                <span class="badge ${isCorrect ? 'badge-success' : 'badge-danger'}">Question ${q.index}</span>
                <span class="text-accent">${q.section}</span>
            </div>
            <div class="sol-question">
                <strong>Question:</strong> ${q.q}
            </div>
            <div class="sol-verdict-box ${verdictClass}">
                <i class="fa-solid ${isCorrect ? 'fa-check' : (uAns === undefined ? 'fa-forward' : 'fa-xmark')}"></i> ${verdictText}
            </div>
            <div class="sol-explanation">
                <strong>Correct: Option ${String.fromCharCode(65 + q.correctAnswer)} (${q.options[q.correctAnswer]})</strong><br>
                <div style="margin-top: 8px; color: var(--text-muted);">${q.explanation}</div>
            </div>
        `;
        listEl.appendChild(item);
    });
}

/* Daily Checklist Functions */
function initializeDailyChecklist() {
    const listContainer = document.getElementById("drill-list-content");
    if (!listContainer) return;

    listContainer.innerHTML = "";

    let checkedCount = 0;

    DRILLS_STEPS.forEach((drill, index) => {
        const isChecked = !!appState.dailyDrills.drills[index];
        if (isChecked) checkedCount++;

        const item = document.createElement("div");
        item.className = `drill-item ${isChecked ? 'checked' : ''}`;

        item.innerHTML = `
            <div class="drill-item-text">
                <div class="drill-title">${drill.title}</div>
                <div class="drill-meta">${drill.meta}</div>
            </div>
            <input type="checkbox" class="drill-checkbox" ${isChecked ? 'checked' : ''} data-index="${index}">
        `;
        listContainer.appendChild(item);
    });

    updateDrillsProgressBar(checkedCount);

    // Bind click checks
    document.querySelectorAll(".drill-checkbox").forEach(chk => {
        chk.addEventListener("change", (e) => {
            const idx = parseInt(e.target.dataset.index);
            const isChecked = e.target.checked;

            appState.dailyDrills.drills[idx] = isChecked;
            appState.dailyDrills.lastCheckedDate = new Date().toDateString();

            saveState();

            const parent = e.target.closest(".drill-item");
            if (parent) {
                if (isChecked) parent.classList.add("checked");
                else parent.classList.remove("checked");
            }

            // Recompute checked counts
            let countTotal = 0;
            appState.dailyDrills.drills.forEach(d => { if (d) countTotal++; });
            updateDrillsProgressBar(countTotal);

            logEvent(`Daily Drill: "${DRILLS_STEPS[idx].title}" marked as ${isChecked ? 'COMPLETED' : 'PENDING'}`, "info");
        });
    });
}

function updateDrillsProgressBar(checkedCount) {
    const totalDrills = DRILLS_STEPS.length;
    const ratioEl = document.getElementById("drills-ratio");
    const barEl = document.getElementById("drills-progress-bar");

    if (ratioEl) ratioEl.innerText = `${checkedCount}/${totalDrills}`;

    if (barEl) {
        const percent = Math.round((checkedCount / totalDrills) * 100);
        barEl.style.width = `${percent}%`;
    }
}

function resetDailyChecklist() {
    if (confirm("Reset current drills checklist back to zero progress?")) {
        appState.dailyDrills.drills = [false, false, false, false, false];
        appState.dailyDrills.lastCheckedDate = new Date().toDateString();
        saveState();
        initializeDailyChecklist();
        logEvent("Cleared and reset daily checklist progress to zero", "info");
    }
}

/* Nav Tab Routing System */
function setActiveTab(targetTab) {
    logEvent(`Navigating menu: switching active page view to "${targetTab}"`, "info");

    // Update Menu selection class
    document.querySelectorAll(".menu-item").forEach(item => {
        if (item.dataset.tab === targetTab) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // Toggle Content boxes
    document.querySelectorAll(".tab-content").forEach(tab => {
        if (tab.id === `${targetTab}-tab`) {
            tab.classList.remove("hidden");
        } else {
            tab.classList.add("hidden");
        }
    });

    // Context-specific loads
    if (targetTab === "mock-tracker") {
        populateHistoryTable();
    }
}

/* Data backup utilities */
/* Data backup & Sync utilities */
async function linkLocalFile() {
    try {
        const options = {
            suggestedName: 'timetable_data.json',
            types: [{
                description: 'JSON Files',
                accept: {
                    'application/json': ['.json'],
                },
            }],
        };
        fileHandle = await window.showSaveFilePicker(options);
        logEvent("Linked local file: " + fileHandle.name, "success");
        updateSyncStatus();

        // Write current state immediately
        await writeStateToLinkedFile();
    } catch (err) {
        if (err.name !== 'AbortError') {
            logEvent("Failed to link file: " + err.message, "error");
            alert("Error linking file: " + err.message);
        }
    }
}

async function writeStateToLinkedFile() {
    if (!fileHandle) return;
    try {
        const options = { mode: 'readwrite' };
        if (await fileHandle.queryPermission(options) !== 'granted') {
            if (await fileHandle.requestPermission(options) !== 'granted') {
                logEvent("Write permission denied by user", "warn");
                return;
            }
        }
        const writable = await fileHandle.createWritable();
        const cleanState = {
            mocks: appState.mocks,
            timetableStatus: appState.timetableStatus,
            dailyDrills: appState.dailyDrills
        };
        await writable.write(JSON.stringify(cleanState, null, 2));
        await writable.close();
        logEvent("Synchronized local file backup: " + fileHandle.name, "success");
        updateSyncStatus();
    } catch (err) {
        logEvent("Failed to sync file content: " + err.message, "error");
    }
}

function updateSyncStatus() {
    const el = document.getElementById("sync-file-status");
    const syncBtn = document.getElementById("btn-sync-file");
    const linkBtn = document.getElementById("btn-link-file");
    if (!el) return;

    if (fileHandle) {
        el.innerHTML = `<span style="color: #34d399;"><i class="fa-solid fa-cloud-arrow-up"></i> Linked: ${fileHandle.name}</span>`;
        if (syncBtn) syncBtn.classList.remove("hidden");
        if (linkBtn) linkBtn.innerHTML = `<i class="fa-solid fa-link-slash"></i> Unlink Git File`;
    } else {
        el.innerHTML = `<span style="color: var(--text-muted);"><i class="fa-solid fa-cloud"></i> No file linked</span>`;
        if (syncBtn) syncBtn.classList.add("hidden");
        if (linkBtn) linkBtn.innerHTML = `<i class="fa-solid fa-link"></i> Link Git File`;
    }
}

function handleLinkToggle() {
    if (fileHandle) {
        fileHandle = null;
        logEvent("Local file unlink confirmed.", "info");
        updateSyncStatus();
    } else {
        linkLocalFile();
    }
}

function importDataFromFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        safeExecute(() => {
            const rawData = JSON.parse(e.target.result);
            if (!rawData || (typeof rawData !== 'object')) {
                throw new Error("Invalid file content formatting. Check failed.");
            }

            if (rawData.timetableStatus) appState.timetableStatus = rawData.timetableStatus;
            if (rawData.mocks) appState.mocks = rawData.mocks;
            if (rawData.dailyDrills) appState.dailyDrills = rawData.dailyDrills;

            // Save state to LOCALSTORAGE
            localStorage.setItem('air10_timetable_status', JSON.stringify(appState.timetableStatus));
            localStorage.setItem('air10_mocks', JSON.stringify(appState.mocks));
            localStorage.setItem('air10_drills', JSON.stringify(appState.dailyDrills));

            logEvent("State imported and loaded successfully from " + file.name, "success");

            // Re-render components
            initializeTimetable();
            initializeDailyChecklist();
            updateDashboardMetrics();
            populateHistoryTable();

            // Clear file input value
            event.target.value = '';
        }, "ImportJSONFileContent");
    };
    reader.readAsText(file);
}

function exportData() {
    safeExecute(() => {
        const cleanState = {
            mocks: appState.mocks,
            timetableStatus: appState.timetableStatus,
            dailyDrills: appState.dailyDrills
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cleanState));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `timetable_data.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        logEvent("Successfully exported backup JSON file of test performance logs", "success");
    }, "JSONExportUtility");
}

function clearAllAppData() {
    if (confirm("WARNING: Are you sure you want to clear all mock scores, history logs, and study completion states? This cannot be undone.")) {
        localStorage.clear();
        appState.mocks = [];
        appState.timetableStatus = {};
        appState.dailyDrills = {
            lastCheckedDate: new Date().toDateString(),
            drills: [false, false, false, false, false]
        };

        logEvent("Cleared all browser local data memory registers", "warn");

        initializeTimetable();
        initializeDailyChecklist();
        updateDashboardMetrics();
        populateHistoryTable();

        // Reset streak HTML
        localStorage.setItem('air10_quiz_streak', '0');
        const streakEl = document.getElementById("quiz-streak");
        if (streakEl) streakEl.innerText = "0 days";
    }
}

/* Page Boot initialization bindings */
document.addEventListener("DOMContentLoaded", () => {
    logEvent("System booting. Booting database controllers. Target: AIR 10 PO & SO IT.", "info");

    loadState();

    // Bind Form Submit
    const logForm = document.getElementById("mock-log-form");
    if (logForm) {
        logForm.addEventListener("submit", handleMockFormSubmit);
    }

    // Pre-populate input mock date
    const dateInput = document.getElementById("mock-date");
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }

    // Bind Tab Click events
    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const tabName = item.dataset.tab;
            if (tabName) setActiveTab(tabName);
        });
    });

    // Bind Drill reset
    const resetDrillsBtn = document.getElementById("btn-reset-drills");
    if (resetDrillsBtn) {
        resetDrillsBtn.addEventListener("click", resetDailyChecklist);
    }

    // Bind Timetable filters
    document.querySelectorAll("[data-timetable-filter]").forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll("[data-timetable-filter]").forEach(el => el.classList.remove("active"));
            e.target.classList.add("active");
            const filter = e.target.dataset.timetableFilter;
            initializeTimetable(filter);
            logEvent(`Filtered active timetable: displaying "${filter}" days`, "info");
        });
    });

    // Bind Utility buttons
    const linkBtn = document.getElementById("btn-link-file");
    if (linkBtn) linkBtn.addEventListener("click", handleLinkToggle);

    const syncBtn = document.getElementById("btn-sync-file");
    if (syncBtn) syncBtn.addEventListener("click", writeStateToLinkedFile);

    const importInput = document.getElementById("input-import-file");
    if (importInput) importInput.addEventListener("change", importDataFromFile);

    const exportBtn = document.getElementById("btn-export-data");
    if (exportBtn) exportBtn.addEventListener("click", exportData);

    const clearBtn = document.getElementById("btn-clear-logs");
    if (clearBtn) clearBtn.addEventListener("click", clearAllAppData);

    const clearSysLogBtn = document.getElementById("btn-clear-sys-logs");
    if (clearSysLogBtn) {
        clearSysLogBtn.addEventListener("click", () => {
            const consoleEl = document.getElementById("sys-log-console");
            if (consoleEl) {
                consoleEl.innerHTML = "";
                appState.systemLogs = [];
                logEvent("Console logs initialized.", "info");
            }
        });
    }

    // Quiz bindings
    const startQuizBtn = document.getElementById("btn-start-quiz");
    if (startQuizBtn) startQuizBtn.addEventListener("click", startQuiz);

    const prevQBtn = document.getElementById("btn-prev-question");
    if (prevQBtn) prevQBtn.addEventListener("click", () => navigateQuestion(-1));

    const nextQBtn = document.getElementById("btn-next-question");
    if (nextQBtn) nextQBtn.addEventListener("click", () => navigateQuestion(1));

    const skipQBtn = document.getElementById("btn-skip-question");
    if (skipQBtn) skipQBtn.addEventListener("click", skipQuestion);

    const submitBtn = document.getElementById("btn-submit-quick");
    if (submitBtn) {
        submitBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to finish and submit the quiz?")) {
                submitQuiz(false);
            }
        });
    }

    const restartQuizBtn = document.getElementById("btn-restart-quiz-system");
    if (restartQuizBtn) restartQuizBtn.addEventListener("click", startQuiz);

    const viewSolutionsBtn = document.getElementById("btn-view-explanations");
    if (viewSolutionsBtn) {
        viewSolutionsBtn.addEventListener("click", () => {
            const pane = document.getElementById("quiz-solutions-pane");
            if (pane) {
                pane.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Quiz streak setup
    const streakCount = parseInt(localStorage.getItem('air10_quiz_streak') || '0');
    const streakEl = document.getElementById("quiz-streak");
    if (streakEl) streakEl.innerText = `${streakCount} days`;

    // Setup and render UI elements
    initializeTimetable();
    initializeDailyChecklist();
    updateDashboardMetrics();
    populateHistoryTable();

    // Calculate initial countdown info
    const targetExamDate = new Date(2026, 7, 15); // Aug 15, 2026 (index 7 = Aug)
    const timeDelta = targetExamDate.getTime() - new Date().getTime();
    const daysLeft = Math.max(0, Math.ceil(timeDelta / (1000 * 60 * 60 * 24)));
    const countdownEl = document.getElementById("days-remaining");
    if (countdownEl) countdownEl.innerText = daysLeft;
    logEvent(`Days remaining until Mid-August 2026 target: ${daysLeft} days. All systems GO!`, "info");
});
