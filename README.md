# Leigha's Cookie HQ 🍪

A small static website tracking Leigha's Girl Scout cookie fundraiser — a live
sales goal tracker, a supporter leaderboard, and a link straight to her Digital
Cookie store. Live at **[leighagrace.com](https://leighagrace.com)**.

## What it does

- 🎯 **Goal tracker** — shows cookies sold vs. the goal with an animated progress bar
- 🏆 **Supporter leaderboard** — highlights top supporters, updated weekly
- 🍪 **Cookie lineup** — the current Girl Scout cookie varieties with descriptions
- 🤖 **Automatic hourly updates** — a GitHub Actions job scrapes the latest sales
  count and commits it to `sales-data.json`
- 🔒 **Hidden admin dashboard** — lets the owner edit the sales count and
  leaderboard from the browser without touching code
- 📱 Mobile responsive, with confetti celebrations and a floating-cookie hero

## Tech stack

- Pure HTML / CSS / JavaScript — no build tools required
- **GitHub Pages** for hosting
- **Cloudflare** for DNS and the `leighagrace.com` custom domain
- A **Vercel** serverless function (`api/publish.js`) for publishing admin edits
- **GitHub Actions** (`.github/workflows/update-sales.yml`) for the hourly scraper

## How it updates

1. **Automatic:** GitHub Actions runs `scraper.js` every hour, pulls the current
   sales total from the Digital Cookie site, and commits it to `sales-data.json`.
   The site reads that file on load. See [AUTOMATED-UPDATES.md](AUTOMATED-UPDATES.md).
2. **Manual (admin dashboard):** open the site, click the green heart 💚 in the
   footer 5 times, and log in. From there you can update the sales count and the
   leaderboard. Edits can be saved to the browser's `localStorage` or published
   back to the repo. See [GITHUB-TOKEN-SETUP.md](GITHUB-TOKEN-SETUP.md) and
   [VERCEL-SETUP.md](VERCEL-SETUP.md).
3. **Manual (files):** edit `sales-data.json` or `leaderboard-data.json` directly
   and push.

The site loads data with this priority: published JSON files → `localStorage` →
hardcoded defaults.

> ⚠️ **Admin login is cosmetic only.** The login check in `admin.html` runs
> entirely in the browser, so it offers no real security — the underlying data is
> public regardless. A previously hardcoded password was removed from the repo and
> its git history; the file now ships with the placeholder
> `PASSWORD_REMOVED_SET_A_NEW_ONE`, which the owner should replace. Do not store a
> real or reused personal password in this file.

## Run locally

```bash
# View the site — just open the file (no server needed)
open index.html

# Run the sales scraper (prints current data)
node scraper.js

# Run the scraper and save the result to a JSON file
node scraper.js --update
```

The bookmarklet helper for syncing sales from the Digital Cookie page lives in
`auto-update-bookmarklet.html`.

## Custom domain

The site uses `leighagrace.com` via Cloudflare DNS pointing at GitHub Pages:

- **Type:** `CNAME`  **Name:** `@`  **Target:** `aasimo13.github.io`  **Proxy:** ON
- The `CNAME` file in this repo contains `leighagrace.com`.

## Status

Live and in active use at [leighagrace.com](https://leighagrace.com).

## License

[MIT](LICENSE) — built with 💚 and 🍪 for Leigha's Girl Scout journey.
