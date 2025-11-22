# Deployment Guide for AAAGym

## ⚠️ Important Note

**NestJS backend is not ideal for Vercel serverless functions.** Vercel works best for:
- Frontend static files ✅
- Simple serverless functions ✅
- Long-running Node.js apps (like NestJS) ❌

## Recommended Approach: Separate Deployments

### Option 1: Frontend on Vercel + Backend on Railway/Render (RECOMMENDED)

This is the **best approach** for your NestJS application.

#### Step 1: Deploy Backend on Railway or Render

**Railway (Recommended):**
1. Go to [railway.app](https://railway.app)
2. Sign up/login
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Set root directory to `bacend`
6. Add environment variables:
   - `DATABASE_HOST`
   - `DATABASE_PORT`
   - `DATABASE_USER`
   - `DATABASE_PASSWORD`
   - `DATABASE_NAME`
   - `JWT_SECRET`
   - `NODE_ENV=production`
7. Railway will auto-detect NestJS and deploy
8. Note your backend URL (e.g., `https://your-app.railway.app`)

**Render:**
1. Go to [render.com](https://render.com)
2. Sign up/login
3. Click "New" → "Web Service"
4. Connect your GitHub repo
5. Configure:
   - **Root Directory**: `bacend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
6. Add environment variables (same as above)
7. Deploy

#### Step 2: Deploy Frontend on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `frontend`
   - **Build Command**: (leave empty - static files)
   - **Output Directory**: `.` (current directory)
6. Click "Deploy"

#### Step 3: Update Frontend API URLs

After getting your backend URL, run:

```bash
node update-api-urls.js https://your-backend-url.railway.app
```

Or manually update all `http://localhost:3000` to your backend URL in:
- `frontend/common/registration_page.html`
- `frontend/common/login.html`
- `frontend/common/gym_reg.html`
- `frontend/owner/add.html`
- `frontend/user/gym_lst.html`
- `frontend/user/about_gym.html`
- `frontend/user/go_checkout.html`
- `frontend/user/log_out.html`
- `frontend/owner/logOut.html`
- `frontend/javasc/add.js`

#### Step 4: Update CORS in Backend

In `bacend/src/main.ts`, update CORS to allow your Vercel domain:

```typescript
app.enableCors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:8080'],
  credentials: true,
});
```

---

### Option 2: Everything on Vercel (Not Recommended)

If you still want to try Vercel for everything:

1. **Set up Cloud Database**: Use PlanetScale, Railway, or Aiven for MySQL
2. **Deploy Backend**:
   - Vercel may have issues with NestJS
   - Consider using Vercel's serverless functions (requires refactoring)
3. **Deploy Frontend**: Same as Option 1, Step 2

**Limitations:**
- File uploads limited to 4.5MB
- Cold starts for serverless functions
- Complex setup for NestJS

---

## Environment Variables Needed

Set these in your deployment platform:

```
DATABASE_HOST=your-database-host
DATABASE_PORT=3306
DATABASE_USER=your-username
DATABASE_PASSWORD=your-password
DATABASE_NAME=your-database-name
JWT_SECRET=your-random-secret-string
NODE_ENV=production
PORT=3000 (or let platform set it)
```

## Database Setup

### Recommended: PlanetScale (Free tier available)

1. Sign up at [planetscale.com](https://planetscale.com)
2. Create a new database
3. Get connection details
4. Use the connection string in your environment variables

### Alternative: Railway/Render Database

Both Railway and Render offer managed MySQL databases:
- Railway: Add MySQL service to your project
- Render: Create a PostgreSQL or MySQL database

## Production Checklist

- [ ] Set `synchronize: false` in `app.module.ts` (already done)
- [ ] Update all frontend API URLs
- [ ] Set up cloud database
- [ ] Configure CORS for production domains
- [ ] Set environment variables
- [ ] Test registration/login
- [ ] Test gym creation
- [ ] Test image uploads
- [ ] Set up image storage (Cloudinary, AWS S3, or Vercel Blob)

## Image Storage for Production

For production, consider cloud storage instead of local files:

1. **Cloudinary** (Recommended - free tier)
2. **AWS S3**
3. **Vercel Blob Storage**
4. **ImageKit**

Update the image upload logic to use cloud storage APIs.

## Troubleshooting

- **Build fails**: Check Node.js version (need 18+)
- **Database connection**: Verify environment variables
- **CORS errors**: Update CORS settings in `main.ts`
- **Images not loading**: Check image paths and storage solution
- **API not working**: Verify backend URL and routes

## Quick Start Commands

```bash
# Update API URLs
node update-api-urls.js https://your-backend-url.com

# Test locally before deploying
cd bacend && npm run build && npm run start:prod
```
