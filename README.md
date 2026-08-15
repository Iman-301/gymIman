# AAAGym

A public register of independent gyms. Members browse floors, pin visits, and write the desk. Owners publish a living page: facilities, services, prices, FAQs, and a cover photo.

This is not a franchise website. It is a catalog with two doors — member and owner — sharing one NestJS API.

## Product

- **Members** sign up, search gyms, open a gym page, and keep a visit list on their device.
- **Owners** publish or edit one gym, upload a cover image, and manage their account.
- **Front desk** collects contact messages through the API.

## Stack

| Layer | Choice |
| --- | --- |
| Frontend | Static HTML, CSS, and JavaScript (`frontend/`) |
| API | NestJS 10 (`backend/`) |
| Auth | JWT, bcrypt, role guards (`gym_user`, `gym_owner`) |
| Database | MySQL via TypeORM |
| Hosting | Frontend on Vercel, API on Render / Railway / a VPS |

## Repository layout

```
frontend/          public site and member/owner apps
  index.html       landing
  css/app.css      design system
  js/              API client, auth, UI chrome
  user/            explore, gym page, visits, desk, account
  owner/           studio and account
backend/           NestJS API
uploads/           gym images written at runtime (not committed)
```

## Local setup

### 1. Database

Create a MySQL database named `aaagym`.

### 2. API environment

Copy `.env.example` to `backend/.env` and fill in real values:

```
JWT_SECRET=a-long-random-string
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=your-password
DATABASE_NAME=aaagym
FRONTEND_URL=http://localhost:5500
```

### 3. Run the API

```bash
cd backend
npm install
npm run start:dev
```

API: `http://localhost:3000`  
Health: `http://localhost:3000/health`

### 4. Run the site

Serve the `frontend` folder (Live Server, `npx serve frontend`, or open through Vercel). On localhost the site talks to `http://localhost:3000` automatically.

## Deploy

1. **API** — deploy `backend/` with the Dockerfile, or Node 18+ and `npm run start:prod`. Set `NODE_ENV=production`, `JWT_SECRET`, MySQL credentials, `PORT`, and `FRONTEND_URL` to your Vercel origin.
2. **Frontend** — deploy the repo to Vercel. Root directory can stay the repository root; `vercel.json` already rewrites `/` to `frontend/index.html`.
3. **Point the site at the API** — in `frontend/js/config.js` set `productionApi` to your live API URL, or add this tag in each page head:

```html
<meta name="api-base" content="https://your-api.example.com">
```

You can also set it once in the browser:

```js
localStorage.setItem('aaagym_api', 'https://your-api.example.com')
```

4. **Uploads** — keep a persistent disk for `backend/uploads`. Images are stored there and served from `/images/gymImages/`.

In production TypeORM `synchronize` is off. Add new columns with a migration or a one-time SQL `ALTER TABLE` if you promote a schema change.

## API map

| Method | Path | Auth |
| --- | --- | --- |
| GET | `/health` | public |
| POST | `/contact` | public |
| POST | `/auth/register` | public |
| POST | `/auth/login` | public |
| GET | `/auth/me` | JWT |
| PATCH | `/auth/change-email` | JWT |
| PATCH | `/auth/change-username` | JWT |
| PATCH | `/auth/change-password` | JWT |
| DELETE | `/auth/delete-account` | JWT |
| GET | `/gym` | public (`?q=` search) |
| GET | `/gym/:id` | public |
| GET | `/gym/my-gym` | JWT owner |
| POST | `/gym/create` | JWT owner |
| PATCH | `/gym/update/:id` | JWT owner |
| POST | `/gym/upload-image` | JWT owner |
| DELETE | `/gym/:id` | JWT owner |

## License

Private project.
