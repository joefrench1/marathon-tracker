# Hosting Guide — Namecheap Domain + Netlify

This guide connects your Namecheap domain to a free Netlify hosting account so your Marathon tracker is live at a proper URL like `https://marathontracker.gg`.

---

## Step 1 — Deploy to Netlify (takes 2 minutes)

Netlify hosts static HTML files for free with no server required.

1. Go to **[app.netlify.com](https://app.netlify.com)** and create a free account
2. From your dashboard, click **"Add new site" → "Deploy manually"**
3. Drag and drop your `index.html` file onto the upload zone
4. Netlify instantly assigns you a URL like `https://amazing-name-123456.netlify.app`
5. Test it — your tracker should be fully working at that URL

---

## Step 2 — Add a Custom Domain to Netlify

1. In your Netlify site dashboard, go to **Domain management → Add a domain**
2. Enter your domain (e.g. `marathontracker.gg`) and click **Verify**
3. Netlify will show you its **nameservers** — they look like:
   ```
   dns1.p04.nsone.net
   dns2.p04.nsone.net
   dns3.p04.nsone.net
   dns4.p04.nsone.net
   ```
   Copy these — you need them for Step 3.

---

## Step 3 — Point Your Namecheap Domain to Netlify

1. Log in to **[namecheap.com](https://namecheap.com)**
2. Go to **Domain List → Manage** (next to your domain)
3. Click the **Nameservers** tab
4. Change from "Namecheap BasicDNS" to **"Custom DNS"**
5. Enter Netlify's nameservers (the ones from Step 2), one per line
6. Click the green ✓ to save

DNS propagation takes **15 minutes to 48 hours** — usually under an hour.

---

## Step 4 — Enable HTTPS (Free SSL)

Once DNS propagates:

1. Back in Netlify → **Domain management → HTTPS**
2. Click **"Verify DNS configuration"**
3. Then **"Provision certificate"**
4. Netlify automatically issues a free Let's Encrypt SSL certificate

Your site will be live at `https://yourdomain.com` with HTTPS — squad invite links will work properly.

---

## Step 5 — Keep it Updated

When you update `index.html`:

**Option A — Drag and drop again:**
- Go to Netlify dashboard → Deploys → drag new `index.html`

**Option B — GitHub + auto-deploy (recommended):**
1. Push your repo to GitHub
2. In Netlify: **Site settings → Build & Deploy → Connect to Git**
3. Select your repo — every `git push` to `main` auto-deploys

---

## Squad Invite Links

Once hosted, squad invite links look like:
```
https://yourdomain.com/?session=ABC123
```

Anyone opening that link automatically joins the session — no manual code entry needed.

Make sure your Supabase `SB_KEY` is set in `index.html` before deploying, and that you've run the SQL from `README.md` to create the `profiles` and `squad_sessions` tables.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Site loads but squad doesn't work | Check `SB_KEY` is a real JWT (starts with `eyJ`), not the placeholder |
| Domain not resolving | DNS can take up to 48h — check progress at [dnschecker.org](https://dnschecker.org) |
| HTTPS certificate pending | Wait for DNS to propagate first, then re-verify in Netlify |
| Login/signup fails | Check Supabase → Authentication → Email Auth is enabled |
| Squad sessions not saving | Run the SQL from README.md to create the `squad_sessions` table |
