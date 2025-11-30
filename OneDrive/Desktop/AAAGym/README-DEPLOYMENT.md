# Quick Deployment Guide

## 🚀 Recommended: Frontend on Vercel + Backend on Railway

### 1. Deploy Backend (Railway - 5 minutes)

1. Go to https://railway.app and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect it's a Node.js app
5. Set **Root Directory** to `backend`
6. Add these environment variables:
   ```
   DATABASE_HOST=your-db-host
   DATABASE_PORT=3306
   DATABASE_USER=your-username
   DATABASE_PASSWORD=your-password
   DATABASE_NAME=your-db-name
   JWT_SECRET=generate-a-random-string-here
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
7. Railway will auto-deploy. Copy your backend URL (e.g., `https://your-app.railway.app`)

### 2. Deploy Frontend (Vercel - 3 minutes)

1. Go to https://vercel.com and sign up
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `frontend`
   - **Build Command**: (leave empty)
   - **Output Directory**: `.`
5. Click "Deploy"
6. Copy your frontend URL (e.g., `https://your-app.vercel.app`)

### 3. Update API URLs

Run this command (replace with your backend URL):

```bash
node update-api-urls.js https://your-backend.railway.app
```

Then commit and push:
```bash
git add .
git commit -m "Update API URLs for production"
git push
```

Vercel will auto-redeploy with the new URLs.

### 4. Update Backend CORS

In Railway, add this environment variable:
```
FRONTEND_URL=https://your-frontend.vercel.app
```

The backend is already configured to use this.

### 5. Set Up Database

**Option A: Railway MySQL (Easiest)**
- In Railway, click "New" → "Database" → "MySQL"
- Railway will auto-create connection variables
- Copy them to your backend service

**Option B: PlanetScale (Free)**
- Sign up at https://planetscale.com
- Create database
- Get connection details
- Add to Railway environment variables

## ✅ Done!

Your app should now be live:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.railway.app`

## 🔧 Troubleshooting

- **CORS errors**: Make sure `FRONTEND_URL` is set in backend
- **Database errors**: Check environment variables match your database
- **Images not loading**: Images are stored locally - consider cloud storage for production

## 📝 Next Steps

1. Test registration/login
2. Test gym creation
3. Set up cloud image storage (Cloudinary recommended)
4. Add custom domain (optional)

