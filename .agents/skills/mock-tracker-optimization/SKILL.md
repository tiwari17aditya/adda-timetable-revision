---
name: mock-tracker-optimization
description: Guidelines for optimizing banking exam mock test tracking, calculations, token efficiency, and 399-paper category catalogs.
---

# Mock Tracker Optimization Skill

## Key Capabilities & Procedures

### 1. 20-Category Mock Catalog (399 Total Papers)
Maintain exact catalog mappings across:
1. Prelims Full Mock Test (20)
2. MBT Prelims (37)
3. Prelims Section Tests (30)
4. Reasoning Chapter Test (10)
5. Quants Chapter Test (20)
6. English Chapter Test (5)
7. Reasoning Topic Test (21)
8. Quants Topic Test (43)
9. English Topic Tests (25)
10. Full Length mock test (20)
11. 2025 Section Test (30)
12. 2025 Subject Test (30)
13. Full Length Mock Mains (10)
14. Mains Section Test 2026 (20)
15. Mains Subject Test 2026 (20)
16. MBT Mains (8)
17. Static Banking Topic Test (22)
18. Weekly Current Affairs (48)
19. Descriptive Test (5)
20. Personality Test (5)

### 2. Metric Calculations
- **Accuracy Rate (%)**: `(Correct / Attempted) * 100`
- **Score Percentage (%)**: `(Score / Total Marks) * 100`
- **Unattempted Questions**: `Total Questions - Attempted`
- **Speed (sec / Q)**: `(Duration * 60) / Attempted`
- **Percentile Status**: High-precision AIR 10 standard &ge; 99.50%

### 3. LocalStorage & Backup Sync
- Automatically serialize `appState` to LocalStorage key `air10_mocks_v2`.
- Provide seamless JSON export/import handlers for backup portability.
