#!/usr/bin/env node

/**
 * Digital Cookie Sales Scraper
 *
 * This script fetches Leigha's current cookie sales from the Digital Cookie website
 * and can optionally update the admin dashboard data.
 *
 * Usage:
 *   node scraper.js                    - Just fetch and display the sales data
 *   node scraper.js --update           - Fetch data and update admin-data.json
 *
 * Requirements:
 *   npm install axios cheerio
 */

const https = require('https');

const DIGITAL_COOKIE_URL = 'https://digitalcookie.girlscouts.org/scout/leigha765749';

// Fetch the page content
function fetchPage(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Parse the HTML to extract sales data
function parseSalesData(html) {
    try {
        // Look for the goal tracker section
        // Pattern: "300 Packages Left To Go!"
        const leftToGoMatch = html.match(/(\d+)\s+Packages\s+Left\s+To\s+Go!/i);

        // Pattern: goal="300" or similar
        const goalMatch = html.match(/goal["\s:=]+(\d+)/i);

        // Pattern: current sales (might be in JSON or data attributes)
        const currentMatch = html.match(/packages["\s:=]+(\d+)/i) ||
                           html.match(/"sold"["\s:]+(\d+)/i) ||
                           html.match(/current["\s:=]+(\d+)/i);

        let packagesLeft = leftToGoMatch ? parseInt(leftToGoMatch[1]) : null;
        let goal = goalMatch ? parseInt(goalMatch[1]) : 300;
        let sold = currentMatch ? parseInt(currentMatch[1]) : null;

        // If we have packages left and goal, calculate sold
        if (packagesLeft !== null && sold === null) {
            sold = goal - packagesLeft;
        }

        // If sold is still null, assume 0
        if (sold === null) {
            sold = 0;
        }

        return {
            sold: sold,
            goal: goal,
            packagesLeft: packagesLeft || (goal - sold),
            lastUpdated: new Date().toISOString()
        };
    } catch (error) {
        console.error('Error parsing sales data:', error.message);
        return null;
    }
}

// Main function
async function main() {
    try {
        console.log('🍪 Fetching cookie sales data from Digital Cookie website...\n');

        const html = await fetchPage(DIGITAL_COOKIE_URL);
        const salesData = parseSalesData(html);

        if (!salesData) {
            console.error('❌ Failed to parse sales data');
            process.exit(1);
        }

        console.log('📊 Sales Data Retrieved:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`   Boxes Sold:      ${salesData.sold}`);
        console.log(`   Goal:            ${salesData.goal}`);
        console.log(`   Remaining:       ${salesData.packagesLeft}`);
        console.log(`   Progress:        ${Math.round((salesData.sold / salesData.goal) * 100)}%`);
        console.log(`   Last Updated:    ${new Date(salesData.lastUpdated).toLocaleString()}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Check for update flags
        const shouldUpdate = process.argv.includes('--update');
        const shouldUpdateWeb = process.argv.includes('--update-web');

        if (shouldUpdate || shouldUpdateWeb) {
            const fs = require('fs');
            const path = require('path');

            if (shouldUpdateWeb) {
                // Save to sales-data.json for the website to fetch
                const webDataFile = path.join(__dirname, 'sales-data.json');
                const webData = {
                    sold: salesData.sold,
                    goal: salesData.goal,
                    lastUpdated: salesData.lastUpdated
                };

                fs.writeFileSync(webDataFile, JSON.stringify(webData, null, 2));
                console.log('✅ Updated sales-data.json');
                console.log('   The website will automatically fetch this data!\n');
            }

            if (shouldUpdate) {
                // Save to admin-data.json for manual reference
                const dataFile = path.join(__dirname, 'admin-data.json');
                const data = {
                    cookieSales: {
                        sold: salesData.sold,
                        goal: salesData.goal
                    },
                    lastScraped: salesData.lastUpdated
                };

                fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
                console.log('✅ Updated admin-data.json');
                console.log('\n📝 Next Steps:');
                console.log('   1. Open https://leighagrace.com');
                console.log('   2. Click the green heart 5 times');
                console.log('   3. Login to admin dashboard');
                console.log('   4. Update the sales count to: ' + salesData.sold);
                console.log('   5. Click "Save Changes"\n');
            }
        } else {
            console.log('💡 Tips:');
            console.log('   --update      Save to admin-data.json for manual reference');
            console.log('   --update-web  Save to sales-data.json for automatic website updates\n');
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Run the scraper
main();
