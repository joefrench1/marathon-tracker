# Hosting Guide — marathon-tracker

## Option A: Netlify Drop (5 minutes, free)

1. Go to https://app.netlify.com/drop
2. Drag the `marathon-tracker/` folder onto the page
3. Netlify gives you a URL like `https://amazing-einstein-abc123.netlify.app`

### Connecting your Namecheap domain to Netlify

1. In Netlify: **Site settings → Domain management → Add custom domain**
   - Enter your domain e.g. `marathon-tracker.com`
   - Click **Verify** then **Add domain**

2. Netlify shows you **nameservers** (e.g. `dns1.p01.nsone.net`)

3. In Namecheap: 
   - Go to **Domain List → Manage → Nameservers**
   - Switch to **Custom DNS**
   - Paste all 4 Netlify nameservers
   - Save

4. Wait 10–60 minutes for DNS to propagate. SSL is automatic.

---

## Option B: GitHub Pages (free, version controlled)

### Step 1 — Create GitHub repo

1. Go to https://github.com/new
2. Name: `marathon-tracker` (or whatever you like)
3. Set to **Public**
4. Click **Create repository**

### Step 2 — Push your files

```bash
cd path/to/marathon-tracker

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/marathon-tracker.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo → **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / `/ (root)`
4. Click **Save**
5. Your site is live at: `https://YOURUSERNAME.github.io/marathon-tracker/`

### Step 4 — Connect Namecheap domain to GitHub Pages

1. In GitHub Pages settings, add your custom domain e.g. `marathon-tracker.gg`

2. Create a file called `CNAME` in your repo root containing just your domain:
   ```
   marathon-tracker.gg
   ```

3. In Namecheap → **Advanced DNS** for your domain, add these records:

   | Type  | Host | Value                        | TTL  |
   |-------|------|------------------------------|------|
   | A     | @    | 185.199.108.153               | Auto |
   | A     | @    | 185.199.109.153               | Auto |
   | A     | @    | 185.199.110.153               | Auto |
   | A     | @    | 185.199.111.153               | Auto |
   | CNAME | www  | YOURUSERNAME.github.io.       | Auto |

4. Back in GitHub Pages settings, check **Enforce HTTPS**

5. Wait up to 30 minutes. Done ✓

---

## Option C: Cloudflare Pages (free, very fast CDN)

1. Push to GitHub as above
2. Go to https://pages.cloudflare.com
3. **Create a project → Connect to Git → Select your repo**
4. Build settings: Framework = **None**, Build command = (blank), Output = `/`
5. Deploy

Cloudflare Pages + Namecheap domain: add your domain to Cloudflare first (free plan), then in Namecheap switch nameservers to Cloudflare's provided ones.

---

## Updating the site

After making changes locally:

```bash
git add .
git commit -m "Update upgrade data"
git push
```

GitHub Pages and Netlify both auto-deploy on push (within ~1 minute).

---

## Squad sessions and Supabase

For squad features to work, you need to:
1. Replace `PASTE_YOUR_ANON_JWT_HERE` in `js/auth.js` with your real Supabase anon key
2. Deploy to a public URL (localhost won't work for squad invites)
3. In Supabase: **Authentication → URL Configuration** → add your domain to allowed origins
