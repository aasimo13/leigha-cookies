# Leigha's Cookie HQ 🍪

Enterprise-grade Girl Scout cookie storefront for Leigha.

## Quick Start

This site is hosted on GitHub Pages and uses a custom domain: **leighagrace.com**

## Updating Cookie Sales

To update Leigha's cookie count:

1. Open `index.html`
2. Find this section near line 518:

```javascript
const CONFIG = {
    cookiesSold: 0,      // ← UPDATE THIS NUMBER!
    cookiesGoal: 300     // ← UPDATE IF GOAL CHANGES
};
```

3. Change `cookiesSold` to the current number
4. Commit and push to GitHub
5. Site updates automatically within 1-2 minutes

## Updating the Leaderboard

Find the `leaderboard-section` in `index.html` (around line 430) and edit the names and box counts:

```html
<div class="leader-item">
    <span class="leader-rank">🥇</span>
    <span class="leader-name">The Smith Family</span>
    <span class="leader-boxes">12 boxes</span>
</div>
```

## Features

- ✅ Animated hero section with floating cookies
- ✅ Live goal tracker with progress bar
- ✅ Cookie lineup with descriptions
- ✅ Top supporters leaderboard
- ✅ Confetti celebrations
- ✅ Mobile responsive
- ✅ Links directly to Digital Cookie store

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
