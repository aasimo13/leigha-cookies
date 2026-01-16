# GitHub Token Setup Guide 🔑

This guide will help you set up a GitHub Personal Access Token so you can publish leaderboard and sales updates directly from the admin dashboard to the website!

## What Does This Do?

With a GitHub token configured:
- ✅ Edit leaderboard in admin dashboard
- ✅ Click "🌐 Publish to Website"
- ✅ Changes commit directly to GitHub
- ✅ **Everyone** sees your updates within 1-2 minutes!

No more manual file editing or git commands needed!

---

## Step-by-Step Setup

### 1. Create a GitHub Personal Access Token

1. Go to **GitHub** → Click your profile picture (top right) → **Settings**

2. Scroll down in the left sidebar and click **Developer settings**

3. Click **Personal access tokens** → **Tokens (classic)**

4. Click **Generate new token** → **Generate new token (classic)**

5. Fill out the form:
   - **Note:** `Leigha Cookie Site Admin`
   - **Expiration:** `90 days` (or longer if you prefer)
   - **Select scopes:**
     - ✅ Check **`repo`** (Full control of private repositories)
     - This gives access to commit to the leighagrace.com repository
     - ⚠️ Don't check any other boxes - only `repo` is needed!

6. Scroll to the bottom and click **Generate token**

7. **IMPORTANT:** Copy the token immediately!
   - It starts with `ghp_`
   - Example: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - You won't be able to see it again!
   - Save it somewhere secure (password manager, secure note, etc.)

---

### 2. Add Token to Admin Dashboard

1. Go to **https://leighagrace.com**

2. Click the green heart 💚 **5 times** in the footer

3. Login to admin dashboard:
   - Username: `aaron`
   - Password: `Leigha10!`

4. Find the **"⚙️ GitHub Settings"** section at the top

5. Paste your token (starts with `ghp_`) into the **GitHub Personal Access Token** field

6. Click **"💾 Save Token"**

7. Click **"🔍 Test Connection"** to verify it works

8. You should see: **"✅ Connected! You can now publish changes to the website."**

---

## How to Use

### Publishing Leaderboard Updates:

1. Edit the leaderboard in the admin dashboard
2. Click **"🌐 Publish to Website"** (not just "Save Locally")
3. Wait 1-2 minutes for GitHub Pages to rebuild
4. Everyone visiting the site will see your updated leaderboard!

### Publishing Sales Updates:

1. Update the cookie sales count
2. Click **"🌐 Publish to Website"**
3. Wait 1-2 minutes
4. Everyone sees the new sales count!

---

## Security Notes

### Is This Safe?

✅ **YES!** Here's why:

- **Token is stored only in YOUR browser** - Not in the website code
- **Token has minimal permissions** - Can only write to the cookie site repo
- **Admin dashboard is password protected** - Only you can access it
- **Token never gets shared** - It only goes from your browser → GitHub API
- **You can revoke it anytime** - Delete the token from GitHub settings

### Token Expiration

- Tokens expire after 90 days (or whatever you set)
- You'll get an email from GitHub before it expires
- Just create a new token and update it in the admin dashboard

### If Your Token Is Compromised

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Find the token and click **Delete**
3. Create a new token
4. Update it in the admin dashboard

---

## Troubleshooting

### "❌ Invalid token" Error

- Make sure you copied the entire token (starts with `ghp_`)
- Check that you selected `repo` permissions when creating the token
- Try creating a new token

### "❌ Repository not found" Error

- Make sure the token was created for the account that owns the `aasimo13/leigha-cookies` repo
- Make sure you checked the `repo` permission

### "❌ Publish failed" Error

- Check your internet connection
- Make sure the token hasn't expired
- Try testing the connection first
- Check the browser console (F12) for more details

### Changes Don't Appear on the Website

- Wait 2-3 minutes for GitHub Pages to rebuild
- Do a hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Clear your browser cache
- Try opening the site in an incognito/private window

---

## Data Priority

The website loads data in this order:

### For Leaderboard:
1. **`leaderboard-data.json`** (published via admin) ← **HIGHEST PRIORITY**
2. **localStorage** (saved locally in your browser)
3. **Default values** (hardcoded fallback)

### For Sales Count:
1. **`sales-data.json`** (auto-updated hourly by GitHub Actions) ← **HIGHEST PRIORITY**
2. **localStorage** (manual admin updates)
3. **Default values** (0 sold, 300 goal)

This means:
- Published updates override local-only saves
- If GitHub is down, it falls back to localStorage
- If both fail, default values are shown

---

## Advanced: Manual Updates

Don't want to use the admin dashboard? You can still manually edit the JSON files:

### Edit Leaderboard Manually:

1. Edit `leaderboard-data.json` in the repo
2. Commit and push to GitHub
3. Changes appear in 1-2 minutes

### Edit Sales Manually:

1. Edit `sales-data.json` in the repo
2. Commit and push to GitHub
3. Changes appear in 1-2 minutes

But the admin dashboard is much easier! 😊

---

## Questions?

- Check the [GitHub Personal Access Tokens Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- Ask Aaron for help
- Check the browser console (F12) for error messages

---

**Happy cookie selling! 🍪**
