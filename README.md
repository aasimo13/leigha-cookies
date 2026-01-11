# Leigha's Cookie HQ 🍪

Enterprise-grade Girl Scout cookie storefront for Leigha.

## Quick Start

This site is hosted on GitHub Pages and uses a custom domain: **leighagrace.com**

## 🤖 Automated Updates (NEW!)

**The site now updates automatically every hour!**

GitHub Actions runs a scraper every hour that:
- ✅ Fetches current sales from Digital Cookie website
- ✅ Updates `sales-data.json` in the repo
- ✅ Automatically commits changes
- ✅ Website loads the new data instantly

**You don't need to do anything!** Just watch the sales count update automatically.

📖 **[Read full documentation](AUTOMATED-UPDATES.md)** for details, manual triggering, and troubleshooting.

## Admin Dashboard 🔒

**No more editing code!** Update everything through the admin dashboard.

### How to Access Admin Panel

1. Go to **leighagrace.com**
2. Scroll to the bottom footer
3. Click the green heart (💚) **5 times** quickly
4. You'll be redirected to the login page
5. Enter credentials:
   - **Username:** `aaron`
   - **Password:** `Leigha10!`

### What You Can Do in Admin

- ✅ Update cookie sales count
- ✅ Change cookie goal
- ✅ Add/remove/edit leaderboard supporters
- ✅ Changes save instantly to localStorage
- ✅ Main site updates automatically (no git push needed!)

### How It Works

The admin dashboard uses **localStorage** to store data in the browser. When you update the sales or leaderboard in the admin panel, the main site reads from localStorage and displays the updated information immediately.

**Note:** Data is stored per-browser. If you clear your browser data or switch browsers, you'll see the default values again.

### Manual Updates (Old Method)

If you prefer to edit code directly, you can still update `index.html` and push to GitHub, but the admin dashboard is much easier!

## Auto-Update Tools 🤖

Want to automatically sync sales from the Digital Cookie website? We've got you covered!

### Option 1: One-Click Bookmarklet (Easiest!)

Open `auto-update-bookmarklet.html` in your browser for detailed instructions. Quick version:

1. Open the `auto-update-bookmarklet.html` page
2. Drag the "Update Cookie Count" button to your bookmarks bar
3. Visit the Digital Cookie page
4. Click the bookmarklet - it automatically reads the sales and updates localStorage!

### Option 2: Node.js Scraper Script

For command-line enthusiasts:

```bash
# Run the scraper (just displays data)
node scraper.js

# Run and save to admin-data.json
node scraper.js --update
```

The scraper fetches the current sales from the Digital Cookie website and displays it in your terminal. With `--update`, it saves the data to a JSON file that you can reference.

### Option 3: Browser Console (Manual but Quick)

1. Visit `digitalcookie.girlscouts.org/scout/leigha765749`
2. Press F12 (open DevTools)
3. Go to Console tab
4. Run the script provided in `auto-update-bookmarklet.html`

See `auto-update-bookmarklet.html` for full details and code snippets!

## Features

- 🤖 **AUTOMATED HOURLY UPDATES** - Sales count auto-syncs via GitHub Actions!
- ✅ **Secret admin dashboard** - Update sales and leaderboard without code
- ✅ **Multiple update methods** - Auto-scraper, bookmarklet, or manual
- ✅ **Weekly leaderboard** - Top supporters updated weekly
- ✅ Animated hero section with floating cookies
- ✅ Live goal tracker with progress bar
- ✅ Cookie lineup with descriptions
- ✅ Dynamic top supporters leaderboard
- ✅ Confetti celebrations
- ✅ Mobile responsive
- ✅ Links directly to Digital Cookie store
- ✅ Leigha's actual Girl Scout photo

## Tech Stack

- Pure HTML/CSS/JavaScript (no build tools required)
- GitHub Pages for hosting
- Cloudflare for DNS and custom domain

## Custom Domain Setup

The site uses `leighagrace.com` via Cloudflare DNS with these settings:

**DNS Records:**
- Type: `CNAME`
- Name: `@`
- Target: `yourusername.github.io`
- Proxy: ON (orange cloud)

**CNAME File:**
The `CNAME` file in this repo contains: `leighagrace.com`

## License

Built with 💚 and 🍪 for Leigha's Girl Scout journey.
