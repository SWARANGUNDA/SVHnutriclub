# SVH Nutrition Club

An AI-assisted wellness platform built with Next.js, Auth.js, Prisma, PostgreSQL/Supabase, and optional Groq or Gemini AI providers.

## Included capabilities

- Public marketing, services, blog, product, contact, and consultation pages.
- Credentials and Google sign-in, protected member dashboard, and server-enforced admin access.
- Body-metric storage, consultation requests, contact enquiries, and user profile API.
- AI wellness tools for body analysis, meal planning, reports, recommendations, search, FAQ, motivation, and translation.
- Input validation, request body limits, and in-memory AI rate limiting.
- Theme switching, English/Telugu/Hindi interface text, and PWA manifest/service worker support.

## Local setup

1. Install Node.js 20 or later and PostgreSQL/Supabase.
2. Copy `.env.example` to `.env.local` and provide the required values.
3. Install dependencies with `npm install`.
4. Generate Prisma Client with `npm run db:generate`.
5. For a development database, apply the schema with `npm run db:push`, then optionally run `npm run db:seed`.
6. Start the application with `npm run dev`.

The app intentionally supports a mock database URL for visual development. Mock mode does not persist data; it must never be used for production.

## Required production environment variables

`DATABASE_URL`, `AUTH_SECRET`, and `NEXT_PUBLIC_APP_URL` are required. Configure at least one AI provider (`GROQ_API_KEY` or `GEMINI_API_KEY`) for real AI output. Google login also requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

Supabase storage, Cloudinary, and Resend credentials are optional until file storage and transactional email delivery are configured. The contact and consultation APIs persist requests but do not send email automatically.

## Quality checks

```bash
npm run lint
npm test
npm run build
```

## Deployment checklist

- Use a real, private PostgreSQL/Supabase connection string and run `npm run db:push` once against the intended database.
- Set a strong, unique `AUTH_SECRET`; never commit `.env.local`.
- Configure a shared rate-limit store (such as Redis) before horizontally scaling—the built-in limiter is process-local.
- Replace the simulated OCR flow with an approved OCR provider before promising document extraction to users.
- Add payment, order, inventory, email confirmation, and real admin analytics before launching commercial workflows.
- Review privacy, consent, retention, and medical-disclaimer requirements for body and health data.
