# FlowTrack

Beautiful, intuitive time tracking built by perfectionists.

---

## Tech stack

- **Next.js (App Router)** + **TypeScript**
- **Prisma** + **PostgreSQL (Neon)**
- **NextAuth** (Credentials, JWT sessions)
- **Tailwind CSS** + **shadcn/ui**
- **TanStack Query**
- CI hooks via **Lefthook**

---

## Prerequisites

- Node.js ≥ 20, pnpm ≥ 9
- A Neon Postgres database (or any PostgreSQL URL)

---

## Quick start

```bash
pnpm install
pnpm dlx lefthook install

# copy envs and fill values
cp .env.example .env

# generate client & apply migrations
pnpm prisma generate
pnpm prisma migrate dev

# run dev server
pnpm dev
# http://localhost:3000
```

---

## Environment variables

Create `.env` (or use Vercel Project → Settings → Environment Variables):

```env
# --- Database (Neon / Postgres) ---
DATABASE_URL=
DATABASE_URL_UNPOOLED=

PGHOST=
PGHOST_UNPOOLED=
PGUSER=
PGDATABASE=
PGPASSWORD=

POSTGRES_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
POSTGRES_URL_NO_SSL=
POSTGRES_PRISMA_URL=

# --- Auth (NextAuth) ---
NEXTAUTH_URL=http://localhost:3000
# Generate once and keep stable across restarts/environments:
# node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
NEXTAUTH_SECRET=

# --- Neon Auth (optional public SDK keys) ---
NEXT_PUBLIC_STACK_PROJECT_ID=
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=
STACK_SECRET_SERVER_KEY=
```

> **Tip:** In Vercel, mark secrets as **Sensitive** and re-deploy after changes.

---

## Scripts

```bash
pnpm dev            # start dev server
pnpm build          # build
pnpm start          # start production build
pnpm prisma generate
pnpm prisma migrate dev
pnpm lint           # eslint
pnpm lint:fix
pnpm format         # prettier --write
pnpm type-check     # tsc --noEmit
```

---

## Project structure (MVP)

```
src/
  app/
    (public)/{page.tsx,login/page.tsx,register/page.tsx,pricing/page.tsx}
    (dashboard)/{layout.tsx,workspaces,page.tsx,projects,page.tsx,timer,page.tsx,analytics,page.tsx}
    api/
      auth/[...nextauth]/route.ts
      auth/register/route.ts
      # health (optional): api/health/route.ts
  components/{layout,ui}
  modules/{auth,landing,...}
  shared/{api,lib,query-keys}
prisma/{schema.prisma,migrations}
```

---

## Health check (optional)

Create `src/app/api/health/route.ts`:

```ts
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
}
```

---

## Development notes

- After changing Prisma schema, run `pnpm prisma generate` and a migration.
- If you see migration errors on dev DB, you can reset:

  ```bash
  pnpm prisma migrate reset --force --skip-seed
  ```

- JWT/session errors usually mean `NEXTAUTH_SECRET` is missing or changed. Set it once and clear cookies.

---

## Deployment (Vercel)

1. Connect the repository to Vercel.
2. Set all environment variables for **Development**, **Preview**, and **Production**.
3. Trigger a new deployment (push to main or “Deploy”).
4. Set `NEXTAUTH_URL` to your Vercel domain in each environment.
