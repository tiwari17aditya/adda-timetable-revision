-- Supabase Schema for Adda Timetable Revision Mock Tracker

-- 1. Mock Test Logs Table
CREATE TABLE IF NOT EXISTS adda_mock_logs (
    id TEXT PRIMARY KEY,
    category_id TEXT NOT NULL,
    paper_num INTEGER NOT NULL,
    date TEXT NOT NULL,
    source TEXT NOT NULL,
    duration NUMERIC,
    total_qs NUMERIC,
    total_marks NUMERIC,
    attempted NUMERIC,
    correct NUMERIC,
    wrong NUMERIC,
    score NUMERIC,
    percentile NUMERIC,
    cutoff NUMERIC,
    weaknesses TEXT,
    topic_name TEXT,
    accuracy NUMERIC,
    score_pct NUMERIC,
    unattempted NUMERIC,
    speed NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE adda_mock_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read adda_mock_logs" ON adda_mock_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert adda_mock_logs" ON adda_mock_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update adda_mock_logs" ON adda_mock_logs FOR UPDATE USING (true);
CREATE POLICY "Allow public delete adda_mock_logs" ON adda_mock_logs FOR DELETE USING (true);

-- 2. IBPS PO Daily Schedule Checklist Table
CREATE TABLE IF NOT EXISTS adda_ibps_checked (
    id TEXT PRIMARY KEY,
    checked BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE adda_ibps_checked ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read adda_ibps_checked" ON adda_ibps_checked FOR SELECT USING (true);
CREATE POLICY "Allow public insert adda_ibps_checked" ON adda_ibps_checked FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update adda_ibps_checked" ON adda_ibps_checked FOR UPDATE USING (true);
CREATE POLICY "Allow public delete adda_ibps_checked" ON adda_ibps_checked FOR DELETE USING (true);
