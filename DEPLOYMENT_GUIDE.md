# 🚀 Furnicraft Full-Stack Deployment Guide (Vercel & Render)

This guide walks you through deploying the **Furnicraft Manufacturing (Pvt) Ltd** website to **Vercel** (Frontend) and **Render** (Backend API + MongoDB Atlas).

---

## 🛠️ Project Configurations Prepared

- ✅ `vercel.json` — Configures Vercel SPA rewrites so pages like `/gallery`, `/about`, `/contact` never return 404.
- ✅ `render.yaml` — Configures Render Node.js Web Service for Express backend API.
- ✅ `package.json` — Includes `npm start` script for Render backend service.
- ✅ `logo.png` — Bundled statically so logos and favicons never break on hosting.

---

## 1. 🌐 Option A: Deploying Backend to Render & Frontend to Vercel (Recommended)

### Step 1: Push Code to GitHub
1. Create a repository on GitHub (e.g. `furnicraft-interior-design`).
2. Run these commands in your project folder:
   ```bash
   git init
   git add .
   git commit -m "Complete Furnicraft Web App"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/furnicraft-interior-design.git
   git push -u origin main
   ```

---

### Step 2: Deploy Backend API to Render (Render.com)
1. Go to [https://dashboard.render.com](https://dashboard.render.com) and Log In.
2. Click **New +** → Select **Web Service**.
3. Connect your GitHub repository `furnicraft-interior-design`.
4. Configure these settings:
   - **Name**: `furnicraft-backend-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:
   - `PORT` = `5000`
   - `MONGODB_URI` = `mongodb+srv://raxwotechnology_db_user:U8RdQQyqCpAyTzgd@cluster0.ih2hzvg.mongodb.net/furnicraft_db?retryWrites=true&w=majority`
6. Click **Create Web Service**.
7. Copy your backend URL (e.g., `https://furnicraft-backend-api.onrender.com`).

---

### Step 3: Deploy Frontend to Vercel (Vercel.com)
1. Go to [https://vercel.com](https://vercel.com) and Log In with GitHub.
2. Click **Add New...** → **Project**.
3. Import your `furnicraft-interior-design` GitHub repository.
4. Framework Preset: **Vite**
5. Root Directory: `./`
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Click **Deploy**.
9. Your website is LIVE! 🎉

---

## 2. ⚡ Option B: Full-Stack Single Host on Vercel
Simply import the repo into Vercel and it will automatically read `vercel.json` and deploy instantly!
