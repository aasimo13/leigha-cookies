# Leigha's Cookie HQ 🍪

Enterprise-grade Girl Scout cookie storefront for Leigha.

## Quick Start

This site is hosted on GitHub Pages and uses a custom domain: **leighagrace.com**

## Admin Dashboard 🔒

**No more editing code!** Update everything through the admin dashboard.

### How to Access Admin Panel

1. Go to **leighagrace.com**
2. Scroll to the bottom footer
3. Click the green heart (💚) **5 times** quickly
4. You'll be redirected to the login page
5. Enter credentials:
   - **Username:** `aaron`
   - **Password:** `PASSWORD_REMOVED_SET_A_NEW_ONE`

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

## Features

- ✅ **Secret admin dashboard** - Update sales and leaderboard without code
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
