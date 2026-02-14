# Smart Bookmark App

A production-ready bookmark manager with **Google OAuth**, **private per-user bookmarks**, and **real-time sync** across tabs. Built with Next.js 14 (App Router), Supabase, and Tailwind CSS.

## Features

- **Google OAuth only** — sign up and log in with Google; no email/password.
- **Add bookmarks** — URL and title; titles are optional (URL is used as fallback).
- **Private bookmarks** — each user sees only their own (enforced by Supabase RLS).
- **Real-time updates** — add or delete in one tab; changes appear instantly in other tabs without refresh.
- **Delete bookmarks** — remove your own bookmarks.
- **Deployable on Vercel** — uses environment variables; no hardcoded secrets.

## Tech Stack

- **Next.js 14** (App Router only)
- **Supabase** (Auth, Database, Realtime)
- **Tailwind CSS**
- **TypeScript**

## Folder Structure

```
├── app/
│   ├── auth/callback/route.ts   # OAuth callback handler
│   ├── bookmarks/page.tsx       # Bookmark dashboard (protected)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # Login/landing
├── components/
│   ├── AddBookmarkForm.tsx
│   ├── BookmarkDashboard.tsx    # Realtime subscription here
│   ├── BookmarkList.tsx
│   ├── LoginForm.tsx
│   └── LogoutButton.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts            # Browser Supabase client
│   │   ├── middleware.ts       # Session refresh + route protection
│   │   └── server.ts           # Server Supabase client
│   └── types/database.ts
├── supabase/migrations/
│   └── 001_bookmarks.sql       # Table + RLS + Realtime
├── .env.example
├── middleware.ts               # Auth middleware
├── package.json
└── README.md
```

## Setup

### 1. Clone and install

```bash
git clone <your-repo-url>
cd smart-bookmark-app
npm install
```

### 2. Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. In **Project Settings → API** copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Database and RLS

In Supabase **SQL Editor**, run the contents of `supabase/migrations/001_bookmarks.sql`:

- Creates `bookmarks` table: `id`, `user_id`, `title`, `url`, `created_at`.
- Enables RLS and policies: users can only SELECT/INSERT/DELETE their own rows.
- Adds `bookmarks` to the Realtime publication so `postgres_changes` work.

If `alter publication supabase_realtime add table public.bookmarks` fails (e.g. already added), enable Realtime in **Database → Replication**: find `bookmarks` and turn on.

### 4. Google OAuth (Supabase)

1. **Authentication → Providers** → enable **Google**.
2. In [Google Cloud Console](https://console.cloud.google.com/):
   - Create or select a project → **APIs & Services → Credentials**.
   - Create **OAuth 2.0 Client ID** (Web application).
   - **Authorized redirect URIs** add:
     - `https://<your-project-ref>.supabase.co/auth/v1/callback`
   - Copy **Client ID** and **Client Secret** into Supabase Google provider.

### 5. Environment variables

Copy `.env.example` to `.env.local` and set:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 6. Run locally

```bash
npm run dev
```

- **/** — login with Google.
- **/bookmarks** — add, view, delete bookmarks (protected; redirects to `/` if not logged in).

### 7. Deploy on Vercel

1. Push to GitHub and import the repo in Vercel.
2. In Vercel project **Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. In Google Cloud Console, add your Vercel URL to **Authorized JavaScript origins** and add `https://your-app.vercel.app/auth/callback` (and any preview URLs if needed) to **Authorized redirect URIs** as required for OAuth. Supabase callback URL stays as above; the app’s callback is `https://your-app.vercel.app/auth/callback`.

Build and deploy. Use the live URL to sign in with Google and test.

## Realtime explanation

- The app uses **Supabase Realtime** with **postgres_changes** on the `bookmarks` table.
- In `BookmarkDashboard`, a client subscribes with a filter `user_id=eq.<current user id>`.
- Any INSERT/DELETE (or UPDATE) on a row with that `user_id` triggers an event; the client then refetches the list, so the UI updates without a full page reload.
- So: open two tabs on `/bookmarks`, add or delete in one tab → the other tab updates instantly.

## Problems faced and solutions

1. **Session not persisting after OAuth redirect**  
   Cookies must be written on the response in middleware. The Supabase server client in `lib/supabase/middleware.ts` uses `setAll` to set cookies on `NextResponse.next()` (the response), not on the request. Without this, the session was lost after the redirect from Google.

2. **Protected routes accessible when logged out**  
   Middleware runs on every request; we call `supabase.auth.getUser()` and redirect to `/` if the path starts with `/bookmarks` and there is no user. Logged-in users hitting `/` are redirected to `/bookmarks`.

3. **Realtime not firing**  
   The `bookmarks` table must be in the `supabase_realtime` publication. We added `alter publication supabase_realtime add table public.bookmarks` in the migration. If that’s already done via the Dashboard, the migration line can be skipped or the error ignored.

4. **RLS blocking inserts**  
   Policies must allow INSERT with `with check (auth.uid() = user_id)`. We use the same for SELECT and DELETE. Without a correct INSERT policy, “new row violates row-level security” appeared when adding bookmarks.

5. **Duplicate or missing Realtime updates**  
   The client subscribes with a filter on `user_id` so only that user’s changes are received. We use a single channel and refresh the list on any event (insert/delete/update) to keep the list in sync and avoid duplicate logic.

## License

MIT.
