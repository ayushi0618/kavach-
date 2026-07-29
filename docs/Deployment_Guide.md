# Comprehensive Deployment Guide for Smart Workshop

This guide explains how to deploy both the **Frontend** (`smart-workshop`) and **Backend** (`backend`) to various hosting platforms.

---

## 🚀 Option 1: Render (Recommended - Free & Automated)

Render supports deploying both services automatically using the included `render.yaml` Blueprint file.

### Steps:
1. Push all code to your GitHub repository: `https://github.com/ayushi0618/kavach-.git`.
2. Go to [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** -> **Blueprint**.
4. Select your GitHub repository (`kavach-`).
5. Render will read `render.yaml` and create two services:
   - **`smart-workshop-backend`** (Node.js Web Service)
   - **`smart-workshop-frontend`** (Static Site with SPA fallback)
6. Click **Apply**. Render will build and deploy both services!

---

## ⚡ Option 2: Vercel (Frontend) + Render (Backend)

For optimal frontend performance, you can deploy the React frontend on Vercel and the Node.js backend on Render.

### A. Deploy Backend to Render:
1. Log in to [Render](https://dashboard.render.com/).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Set the following settings:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variable:
   - `PORT`: `5000`
6. Click **Create Web Service**. Copy the backend URL (e.g., `https://smart-workshop-backend.onrender.com`).

### B. Deploy Frontend to Vercel:
1. Log in to [Vercel](https://vercel.com/dashboard).
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository (`kavach-`).
4. Configure Project Settings:
   - **Root Directory**: `smart-workshop`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_BASE_URL`: `https://smart-workshop-backend.onrender.com`
6. Click **Deploy**. Vercel will build and deploy your frontend!

---

## 🐳 Option 3: Self-Hosted Docker Deployment (VPS / EC2)

Deploy the entire stack with Docker Compose on any Ubuntu / Linux VPS or AWS EC2 instance.

### Steps:
1. SSH into your VPS/Server.
2. Clone your repository:
   ```bash
   git clone https://github.com/ayushi0618/kavach-.git
   cd kavach-
   ```
3. Run Docker Compose:
   ```bash
   docker-compose up -d --build
   ```
4. Verify running containers:
   ```bash
   docker-compose ps
   ```
5. Your application will be live at:
   - **Frontend**: `http://<your-server-ip>:80`
   - **Backend API**: `http://<your-server-ip>:5000`

---

## 🌐 Verifying Local Build Before Deploying

To ensure the production build completes without errors on your machine:

```bash
# Test Frontend Build
cd smart-workshop
npm run build

# Test Backend Server
cd ../backend
npm start
```
