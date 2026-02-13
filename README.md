# Chef Abdulrazzaq — Premium Web Application

High-end Next.js App Router experience for an executive culinary brand with smart restaurant systems positioning.

## Tech Stack
- Next.js (App Router + TypeScript)
- Tailwind CSS
- Framer Motion
- Firebase (Auth + Firestore + Storage)
- PWA (manifest + next-pwa)

## Project Structure

```text
src/
  app/
    (public)/
      dashboard about services projects media contact
    admin/
  components/
    layout/
    sections/
    admin/
  lib/
    firebase.ts
    types.ts
  data/
    mock.ts
firestore.rules
storage.rules
.env.example
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env.local
```

3. Fill Firebase client keys in `.env.local`.

4. Run development server:
```bash
npm run dev
```

## Firebase Setup Instructions

### 1) Authentication
- Enable **Email/Password** provider.
- Create admin user manually in Firebase Console:
  - Email: `abdehanine@icloud.com`
  - Password: create it only in Firebase Console (never hardcode).

### 2) Firestore
Create collections:
- `profile`
- `services`
- `projects`
- `social_links`
- `settings`

Deploy rules:
```bash
firebase deploy --only firestore:rules
```

### 3) Storage
Deploy rules:
```bash
firebase deploy --only storage
```

## Admin Route Protection
- Admin UI is served at `/admin`.
- Middleware checks for `chef_admin_session` cookie before access.
- In production, replace this temporary cookie check with Firebase ID token verification (recommended via server-side session or middleware integration).

## Deployment

### GitHub
```bash
git init
git add .
git commit -m "feat: premium nextjs chef platform"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### Vercel
1. Import GitHub repo in Vercel.
2. Add environment variables from `.env.local`.
3. Deploy.

### Firebase Hosting (Alternative)
```bash
npm run build
firebase init hosting
firebase deploy
```

## Performance & SEO Checklist
- Metadata configured in `src/app/layout.tsx`.
- Responsive and optimized UI structure.
- Use `next/image` for future uploaded images.
- Run Lighthouse in production preview; target 95+ by optimizing media, caching headers, and eliminating unused JS.
