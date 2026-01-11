# Automated Cookie Sales Updates 🤖🍪

The site now automatically updates cookie sales every hour using GitHub Actions!

## How It Works

1. **GitHub Actions runs every hour** (scheduled via cron)
2. **Scraper fetches** the latest sales from `digitalcookie.girlscouts.org`
3. **Updates `sales-data.json`** with current sold/goal numbers
4. **Commits changes** back to the repo
5. **GitHub Pages deploys** the updated data
6. **Website automatically loads** the new numbers on page load

## Status

- ✅ **Automated scraping**: Every hour at :00
- ✅ **Auto-commit**: Only when data changes
- ✅ **Auto-deploy**: GitHub Pages handles deployment
- ✅ **Fallback system**: Manual admin updates still work

## Data Priority

The website loads data in this order:

1. **`sales-data.json`** (auto-updated by GitHub Actions) - **HIGHEST PRIORITY**
2. **localStorage** (manual admin dashboard updates)
3. **Default values** (0 sold, 300 goal)

This means:
- Automated updates take precedence over manual updates
- If auto-updates fail, manual admin updates work as backup
- If both fail, default values are shown

## Manual Triggering

You can manually trigger the scraper from GitHub:

1. Go to https://github.com/aasimo13/leigha-cookies/actions
2. Click "Auto-Update Cookie Sales" workflow
3. Click "Run workflow" button
4. Wait 30-60 seconds for it to complete

## Local Testing

Test the scraper locally:

```bash
# Fetch and display current sales
node scraper.js

# Update sales-data.json (for website)
node scraper.js --update-web

# Or use npm shortcut
npm run update-web
```

## Schedule Configuration

The workflow runs on this schedule:

```yaml
schedule:
  - cron: '0 * * * *'  # Every hour at :00
```

To change the schedule, edit `.github/workflows/update-sales.yml`:

- `0 * * * *` - Every hour
- `0 */2 * * *` - Every 2 hours
- `*/30 * * * *` - Every 30 minutes
- `0 */6 * * *` - Every 6 hours
- `0 9,12,15,18,21 * * *` - At 9am, 12pm, 3pm, 6pm, 9pm

[Cron schedule syntax](https://crontab.guru/) can help build custom schedules.

## Monitoring

Check the status of automated updates:

1. **GitHub Actions Tab**: https://github.com/aasimo13/leigha-cookies/actions
   - Shows run history
   - Success/failure status
   - Logs for debugging

2. **Commit History**: Look for commits from `github-actions[bot]`
   - Message format: `🤖 Auto-update: Cookie sales data (timestamp)`

3. **Browser Console**: Open DevTools on leighagrace.com
   - Look for: `✅ Loaded sales data from auto-scraper`
   - Shows last update timestamp

## Troubleshooting

### Workflow Not Running

- Check `.github/workflows/update-sales.yml` exists
- Verify GitHub Actions is enabled in repo settings
- Check for any GitHub Actions billing issues

### No Data Updates

- Check workflow logs in Actions tab
- Verify `sales-data.json` has recent timestamp
- Try manual trigger from GitHub Actions tab

### Website Shows Old Data

- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for which data source loaded
- Verify `sales-data.json` timestamp is recent

### Scraper Errors

- Digital Cookie website structure may have changed
- Check scraper.js parsing logic
- View workflow logs for specific error messages

## Disabling Auto-Updates

To disable automated updates:

1. Delete or rename `.github/workflows/update-sales.yml`
2. Or comment out the `schedule:` section in the workflow file

Manual admin dashboard updates will still work.

## Security Notes

- ✅ Scraper only **reads** public data from Digital Cookie
- ✅ No credentials or authentication required
- ✅ All updates go through GitHub's security
- ✅ Only repo collaborators can modify workflow
- ✅ Workflow runs in GitHub's secure environment

## Cost

- **GitHub Actions**: Free tier includes 2,000 minutes/month
- **This workflow uses**: ~1 minute per run = ~720 minutes/month (hourly)
- **Status**: Well within free tier limits

## Future Enhancements

Possible improvements:

- [ ] Send notification when sales milestones reached
- [ ] Generate weekly sales reports
- [ ] Auto-update leaderboard from external data source
- [ ] Add sales trend charts and analytics
- [ ] Email digest of daily/weekly progress

---

**Questions?** Check the [GitHub Actions documentation](https://docs.github.com/en/actions) or workflow logs for details.
