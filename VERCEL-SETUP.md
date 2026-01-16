# Vercel Deployment Setup Guide 🚀

This guide will help you deploy the serverless backend to Vercel so you can publish leaderboard and sales updates from **ANY browser, ANY device** - no token setup needed!

## Why Vercel?

With Vercel:
- ✅ GitHub token stored **securely on the server** (not in your browser)
- ✅ Works from **any browser** (Chrome, Safari, Firefox, etc.)
- ✅ Works from **any device** (computer, phone, tablet)
- ✅ **No setup per-browser** - just works everywhere!
- ✅ **Free tier** is more than enough for this use case

---

## Prerequisites

1. GitHub account (you already have this!)
2. Vercel account (free - we'll create this)
3. GitHub Personal Access Token (we'll create this)

---

## Step 1: Create GitHub Personal Access Token

1. Go to **https://github.com/settings/tokens/new**

2. Click **"Generate new token"** → **"Generate new token (classic)"**

3. Fill out the form:
   - **Note:** `Leigha Cookie Site - Vercel Backend`
   - **Expiration:** `No expiration` (recommended) or `90 days`
   - **Permissions:** Check ONLY **`repo`** ✅

4. Click **"Generate token"**

5. **COPY THE TOKEN** (starts with `ghp_`)
   - ⚠️ You won't see it again!
   - Save it temporarily - you'll paste it into Vercel in a moment

---

## Step 2: Create Vercel Account

1. Go to **https://vercel.com/signup**

2. Click **"Continue with GitHub"**

3. Authorize Vercel to access your GitHub account

4. You'll be redirected to the Vercel dashboard

---

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Easiest!)

1. Go to https://vercel.com/new

2. Click **"Import Git Repository"**

3. Find **`aasimo13/leigha-cookies`** and click **"Import"**
   - If you don't see it, click "Adjust GitHub App Permissions" and give Vercel access

4. **Configure Project:**
   - **Project Name:** `leigha-cookies` (or whatever you prefer)
   - **Framework Preset:** Leave as "Other"
   - **Root Directory:** Leave as `./`
   - **Build Command:** Leave empty
   - **Output Directory:** Leave empty

5. **Add Environment Variable:**
   - Click **"Environment Variables"** dropdown
   - Add a new variable:
     - **Name:** `GITHUB_TOKEN`
     - **Value:** Paste your GitHub token (starts with `ghp_`)
   - Click **"Add"**

6. Click **"Deploy"**

7. Wait 1-2 minutes for deployment to complete

8. You'll see **"Congratulations! Your project has been deployed!"**

9. Your site will be at: `https://leigha-cookies.vercel.app`
   - But we'll use the custom domain `leighagrace.com`

---

### Option B: Deploy via Vercel CLI (For Advanced Users)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd /path/to/GirlScoutCookieSite
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - What's your project's name? leigha-cookies
# - In which directory is your code located? ./
# - Auto-detected settings - override? N

# Add environment variable
vercel env add GITHUB_TOKEN production

# Paste your GitHub token when prompted

# Deploy to production
vercel --prod
```

---

## Step 4: Configure Custom Domain

1. In Vercel dashboard, go to your project

2. Click **"Settings"** tab

3. Click **"Domains"** in the sidebar

4. Add your domain: `leighagrace.com`

5. Vercel will give you DNS instructions

6. **In Cloudflare** (your DNS provider):
   - Update the CNAME record to point to Vercel instead of GitHub Pages
   - **OR** keep GitHub Pages for the main site and just use Vercel for the API

### Recommended: Use Both GitHub Pages + Vercel

**Best setup:**
- Main site: `leighagrace.com` → GitHub Pages (current setup)
- API: `leighagrace.com/api/*` → Vercel (serverless functions)

**In Cloudflare:**
- Keep existing setup (GitHub Pages)
- Cloudflare will automatically proxy `/api/*` requests to Vercel

**In Vercel:**
- Add domain: `leighagrace.com`
- Vercel will handle just the `/api/` routes

This works because the `vercel.json` file configures the routes correctly!

---

## Step 5: Test the Setup

1. Wait 2-3 minutes for deployment to complete

2. Go to `https://leighagrace.com` (wait for GitHub Pages to rebuild first)

3. Click green heart 💚 **5 times**

4. Login to admin dashboard

5. Edit the leaderboard

6. Click **"🌐 Publish to Website"**

7. You should see: **"✅ Leaderboard published to website!"**

8. Wait 1-2 minutes

9. Refresh the main site - everyone should see your changes!

---

## Troubleshooting

### "Publish failed" Error

**Check the browser console** (F12 → Console tab) for specific error messages.

Common issues:

1. **"Failed to fetch"**
   - Vercel deployment not complete yet - wait a few minutes
   - Check Vercel dashboard for deployment status

2. **"Server configuration error"**
   - GitHub token not set in Vercel environment variables
   - Go to Vercel dashboard → Project Settings → Environment Variables
   - Add `GITHUB_TOKEN` with your token

3. **"Invalid filename"**
   - You're trying to publish something other than leaderboard or sales
   - This is a security feature - only those files can be modified

4. **"GitHub API error"**
   - Token might be expired or invalid
   - Create a new token and update it in Vercel

### Vercel Deployment Failed

1. Check the **"Deployments"** tab in Vercel dashboard
2. Click on the failed deployment
3. View the build logs for errors
4. Common issues:
   - Syntax error in `api/publish.js`
   - Missing dependencies
   - Environment variable not set

### Domain Not Working

1. Make sure DNS is pointing correctly
2. Try accessing via Vercel URL first: `https://leigha-cookies.vercel.app/api/publish`
3. If that works but custom domain doesn't, check Cloudflare settings

---

## Updating the Code

When you push changes to GitHub:

1. Vercel automatically detects the push
2. Rebuilds and redeploys within 1-2 minutes
3. No manual action needed!

To redeploy manually:
1. Go to Vercel dashboard
2. Click **"Deployments"** tab
3. Click **"Redeploy"** on the latest deployment

---

## Security Notes

### Is This Secure?

✅ **YES!** Here's why:

- **Token is stored in Vercel environment variables** - Never exposed to browsers
- **API validates filenames** - Can only modify leaderboard-data.json and sales-data.json
- **Admin dashboard is still password protected** - Only you can trigger publishes
- **Vercel runs in a secure, isolated environment**
- **All communication is over HTTPS**

### Token Permissions

The GitHub token only has `repo` permission, which means it can:
- ✅ Read and write to the leigha-cookies repository
- ❌ Cannot access other repositories
- ❌ Cannot modify GitHub account settings
- ❌ Cannot access private data

### Revoking Access

If you need to revoke access:

1. **Revoke the GitHub token:**
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Delete the token

2. **Remove from Vercel:**
   - Go to Vercel dashboard → Project Settings → Environment Variables
   - Delete `GITHUB_TOKEN`

3. **Delete the Vercel project (optional):**
   - Vercel dashboard → Project Settings → General
   - Scroll to bottom → Delete Project

---

## Cost

### Vercel Free Tier Includes:

- ✅ Unlimited deployments
- ✅ 100 GB bandwidth per month
- ✅ Serverless function executions

**Your usage:**
- Each publish = 1 function execution (takes ~500ms)
- Even if you publish 100 times per day = 3,000 per month
- Well within free tier limits!

**Bottom line: FREE!** 🎉

---

## Advanced: Testing Locally

Want to test the serverless function locally before deploying?

```bash
# Install Vercel CLI
npm install -g vercel

# Run local development server
vercel dev

# Add environment variable for local testing
# Create a .env file:
echo "GITHUB_TOKEN=ghp_your_token_here" > .env

# Test the API
curl -X POST http://localhost:3000/api/publish \
  -H "Content-Type: application/json" \
  -d '{
    "filename": "leaderboard-data.json",
    "data": [{"name": "Test", "boxes": 10}],
    "commitMessage": "Test commit"
  }'
```

---

## Summary

Once deployed:

1. ✅ **No per-browser setup needed**
2. ✅ **Works from any device**
3. ✅ **Token stored securely on server**
4. ✅ **Automatic deployments on git push**
5. ✅ **Completely free**

**You only need to do this setup once!**

---

## Questions?

- Check Vercel documentation: https://vercel.com/docs
- Check Vercel dashboard logs for errors
- View browser console (F12) for client-side errors
- Contact Aaron for help

---

**Happy cookie selling! 🍪🚀**
