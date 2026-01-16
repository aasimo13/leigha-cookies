/**
 * Vercel Serverless Function
 * Securely publishes leaderboard and sales data to GitHub
 *
 * The GitHub token is stored in Vercel environment variables (secure!)
 * Admin dashboard calls this function to publish updates
 */

export default async function handler(req, res) {
    // Handle CORS preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get GitHub token from environment variable (set in Vercel dashboard)
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    if (!GITHUB_TOKEN) {
        console.error('GITHUB_TOKEN not set in environment variables');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    // Get data from request
    const { filename, data, commitMessage } = req.body;

    // Validate input
    if (!filename || !data || !commitMessage) {
        return res.status(400).json({
            error: 'Missing required fields: filename, data, commitMessage'
        });
    }

    // Validate filename (security: only allow specific files)
    const allowedFiles = ['leaderboard-data.json', 'sales-data.json'];
    if (!allowedFiles.includes(filename)) {
        return res.status(400).json({
            error: `Invalid filename. Allowed: ${allowedFiles.join(', ')}`
        });
    }

    try {
        const owner = 'aasimo13';
        const repo = 'leigha-cookies';

        // Step 1: Get current file SHA (needed for updates)
        console.log(`Fetching current ${filename}...`);
        const getResponse = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/${filename}`,
            {
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Leigha-Cookie-Site'
                }
            }
        );

        let sha = null;
        if (getResponse.ok) {
            const fileData = await getResponse.json();
            sha = fileData.sha;
            console.log(`Found existing file with SHA: ${sha.substring(0, 7)}...`);
        } else {
            console.log('File does not exist yet, will create new file');
        }

        // Step 2: Encode content to base64
        const jsonString = JSON.stringify(data, null, 2);
        const content = Buffer.from(jsonString).toString('base64');

        // Step 3: Create or update the file
        console.log(`Publishing ${filename} to GitHub...`);
        const putResponse = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/${filename}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Leigha-Cookie-Site'
                },
                body: JSON.stringify({
                    message: commitMessage,
                    content: content,
                    sha: sha // Include SHA if updating existing file
                })
            }
        );

        if (!putResponse.ok) {
            const error = await putResponse.json();
            console.error('GitHub API error:', error);
            return res.status(putResponse.status).json({
                error: `GitHub API error: ${error.message}`
            });
        }

        const result = await putResponse.json();
        console.log(`✅ Successfully published ${filename}`);

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Published successfully!',
            commit: result.commit.sha,
            filename: filename
        });

    } catch (error) {
        console.error('Error publishing to GitHub:', error);
        return res.status(500).json({
            error: 'Failed to publish to GitHub',
            details: error.message
        });
    }
}
