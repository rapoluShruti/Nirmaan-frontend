# NIRMAAN Frontend

React + Vite frontend for NIRMAAN construction operations.

## Local development

1. Install dependencies: `npm install`
2. Start the backend on port `5000` (see the backend repository's README and `.env.example`).
3. Start the frontend: `npm run dev`

The Vite development server proxies `/api` and `/uploads` to `http://localhost:5000`. The shared Axios client uses the relative `/api` path when `VITE_BACKEND_URL` is not set.

To use an explicit backend origin locally, copy `.env.example` to `.env` and set `VITE_BACKEND_URL=http://localhost:5000`.

## Production deployment

Set the Vite environment variable `VITE_BACKEND_URL` in your frontend hosting provider to the **backend origin only**, without a trailing slash or `/api` suffix. Example:

```text
VITE_BACKEND_URL=https://your-nirmaan-backend.example.com
```

Trigger a fresh frontend deployment after changing this variable; Vite embeds it at build time.

Configure `FRONTEND_URL` in the backend environment to the exact deployed frontend origin (for example, `https://your-nirmaan-frontend.vercel.app`). For multiple allowed origins, separate them with commas.

Never commit `.env` files or production secrets.
