# 📘 Complete Portfolio Setup Guide — Sourav KP
## Modern Web Dev Workflow: Local Git → GitHub → CI/CD → Hosting → Browser

---

## 📁 YOUR FOLDER STRUCTURE

```
my-portfolio/
├── index.html              ← Your website homepage
├── style.css               ← All styles
├── script.js               ← JavaScript (matrix rain, form, etc.)
├── .gitignore              ← Files to NOT upload to GitHub
├── .github/
│   └── workflows/
│       └── deploy.yml      ← GitHub Actions CI/CD pipeline
└── backend/
    ├── server.js           ← Node.js + Express API
    ├── package.json        ← Backend dependencies
    └── .env.example        ← Template for your secrets
```

---

## STEP 1 — Install Git on Windows

1. Go to: https://git-scm.com/download/windows
2. Download and run the installer
3. Keep clicking **Next** (default settings are fine)
4. After install, open **Git Bash** (search it in Start Menu)
5. Type this to verify:
   ```
   git --version
   ```
   You should see something like: `git version 2.44.0`

6. Set your identity (do this once):
   ```
   git config --global user.name "Sourav KP"
   git config --global user.email "your@email.com"
   ```

---

## STEP 2 — Create Your Project Folder

Open **Git Bash** or **VS Code Terminal** and type:

```bash
cd Desktop
mkdir my-portfolio
cd my-portfolio
```

Now copy all the files (index.html, style.css, script.js, .gitignore) into this folder.
Also copy the backend/ folder and the .github/ folder.

---

## STEP 3 — Initialize Git Repository

Inside your `my-portfolio` folder in terminal:

```bash
git init
git add .
git commit -m "🚀 Initial commit: Portfolio website"
```

You should see a list of files being committed. 

---

## STEP 4 — Create GitHub Account & Repository

1. Go to https://github.com and sign up (free)
2. Click the **+** button → **New repository**
3. Name it: `my-portfolio` (or `username.github.io` for auto-deploy)
4. Make it **Public**
5. Do NOT check "Add README" (we already have files)
6. Click **Create repository**

---

## STEP 5 — Push Code to GitHub

GitHub will show you commands. Use these (replace YOUR_USERNAME):

```bash
git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
git branch -M main
git push -u origin main
```

It will ask for your GitHub username and password.
⚠️  For password, use a **Personal Access Token** (not your real password):
- Go to GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
- Generate new token, select "repo" scope, copy and paste it as the password

---

## STEP 6 — Enable GitHub Actions (CI/CD)

The `.github/workflows/deploy.yml` file you have already sets this up!

After pushing, go to your repo on GitHub:
- Click the **Actions** tab
- You'll see your pipeline running automatically! 🎉
- Green checkmark = success, Red X = something failed (click to see logs)

---

## STEP 7 — Enable GitHub Pages (Free Frontend Hosting)

1. On your GitHub repo, go to **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Branch: select **gh-pages** → folder: **/ (root)**
4. Click **Save**
5. Wait 2-3 minutes, then visit:
   `https://YOUR_USERNAME.github.io/my-portfolio`

Your website is LIVE! 🌍

---

## STEP 8 — Install Node.js (for backend)

1. Go to https://nodejs.org
2. Download the **LTS** version (Long Term Support)
3. Run the installer (keep defaults)
4. Verify in terminal:
   ```
   node --version
   npm --version
   ```

---

## STEP 9 — Set Up the Backend Locally

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

For local testing, you can use a test PostgreSQL connection or a free cloud DB.

To run locally:
```bash
node server.js
```

You'll see: `🚀 Server running on http://localhost:3000`

Test it: Open browser → go to `http://localhost:3000`
You should see: `{"status":"ok","message":"Sourav KP Portfolio Backend is running 🚀"}`

---

## STEP 10 — Set Up PostgreSQL Database (Free on Render)

1. Go to https://render.com → Sign up with GitHub (free)
2. Click **New** → **PostgreSQL**
3. Name: `portfolio-db`
4. Region: Singapore (closest to India)
5. Plan: **Free**
6. Click **Create Database**
7. After it creates, copy the **External Database URL** — it looks like:
   `postgresql://user:password@host/dbname`

---

## STEP 11 — Deploy Backend to Render.com

1. On Render, click **New** → **Web Service**
2. Connect your GitHub repository
3. Settings:
   - **Name**: `souravkp-portfolio-backend`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free
4. Add Environment Variables (click "Add Environment Variable"):
   - `DATABASE_URL` = paste the PostgreSQL URL from Step 10
   - `FRONTEND_URL` = `https://YOUR_USERNAME.github.io`
   - `NODE_ENV` = `production`
5. Click **Create Web Service**
6. Wait ~3 minutes. You'll get a URL like:
   `https://souravkp-portfolio-backend.onrender.com`

Test it: Visit that URL in browser — you should see the status message!

---

## STEP 12 — Connect Frontend to Backend

1. Open `script.js` in VS Code
2. Find this line near the bottom:
   ```javascript
   const BACKEND_URL = 'https://your-backend.onrender.com/api/contact';
   ```
3. Replace `your-backend.onrender.com` with your actual Render URL:
   ```javascript
   const BACKEND_URL = 'https://souravkp-portfolio-backend.onrender.com/api/contact';
   ```
4. Save the file

5. Push the update to GitHub:
   ```bash
   git add script.js
   git commit -m "✅ Connect contact form to backend"
   git push
   ```

6. GitHub Actions will automatically redeploy your site!

---

## STEP 13 — Test the Complete Workflow

1. Open your live website: `https://YOUR_USERNAME.github.io/my-portfolio`
2. Fill in the Contact form and submit
3. Check your Render backend logs — you should see:
   `📬 New contact from: [name] <[email]>`
4. Visit `https://your-backend.onrender.com/api/contacts` to see all submissions!

---

## 🔄 Your Daily Workflow Going Forward

Every time you make changes:

```bash
# 1. Make your code changes in VS Code
# 2. In terminal:
git add .
git commit -m "✏️ Describe what you changed"
git push
# 3. GitHub Actions runs automatically
# 4. Site updates in 2-3 minutes!
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| `git push` asks for password repeatedly | Use SSH keys or credential manager |
| GitHub Actions fails | Click the red X in Actions tab to read error logs |
| Render backend sleeps (free tier) | It wakes up on first request (takes ~30 seconds) |
| Contact form shows error | Check browser Console (F12) and Render logs |
| GitHub Pages not updating | Wait 5 min, hard refresh (Ctrl+Shift+R) |

---

## 📚 Resources to Learn More

- Git: https://learngitbranching.js.org (free, interactive)
- Node.js: https://nodejs.org/en/learn
- Express.js: https://expressjs.com/en/guide
- PostgreSQL: https://www.postgresql.org/docs/
- GitHub Actions: https://docs.github.com/en/actions

---

**You've built a full-stack portfolio with CI/CD! 🎉**
*Sourav KP — BCA Student turning HOD's workflow chart into reality*
