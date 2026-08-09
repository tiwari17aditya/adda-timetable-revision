// Vercel serverless function: /api/neon.js
// Acts as a CORS-safe proxy for Neon HTTP SQL API
// Browser sends simple JSON POST here, this function adds Neon-Connection-String header

module.exports = async function handler(req, res) {
    // Allow CORS from any origin (GitHub Pages, local dev, etc.)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { query, connStr } = req.body || {};

    if (!query || !connStr) {
        return res.status(400).json({ error: 'Missing query or connStr in request body' });
    }

    // Validate it looks like a Neon connection string
    if (!connStr.includes('neon.tech') || !connStr.startsWith('postgresql://')) {
        return res.status(400).json({ error: 'Invalid connection string format' });
    }

    // Derive Neon HTTP SQL API URL from the connection string
    const match = connStr.match(/@([^:\/\?]+)/);
    if (!match) {
        return res.status(400).json({ error: 'Could not parse host from connection string' });
    }
    const host = match[1].replace('-pooler', '');
    const sqlUrl = `https://${host}/sql`;

    try {
        const neonResponse = await fetch(sqlUrl, {
            method: 'POST',
            headers: {
                'Neon-Connection-String': connStr,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });

        const data = await neonResponse.json();
        return res.status(neonResponse.status).json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
