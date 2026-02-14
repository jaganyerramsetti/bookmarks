-- Smart Bookmark App: bookmarks table and RLS
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)

-- Table: bookmarks
create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  url text not null,
  created_at timestamptz not null default now()
);

-- Index for faster lookups by user_id
create index if not exists bookmarks_user_id_idx on public.bookmarks (user_id);

-- Enable Row Level Security (RLS)
alter table public.bookmarks enable row level security;

-- Policy: User can SELECT only their own bookmarks
create policy "Users can select own bookmarks"
  on public.bookmarks
  for select
  using (auth.uid() = user_id);

-- Policy: User can INSERT only their own bookmarks
create policy "Users can insert own bookmarks"
  on public.bookmarks
  for insert
  with check (auth.uid() = user_id);

-- Policy: User can DELETE only their own bookmarks
create policy "Users can delete own bookmarks"
  on public.bookmarks
  for delete
  using (auth.uid() = user_id);

-- Enable Realtime for postgres_changes (required for live updates across tabs)
alter publication supabase_realtime add table public.bookmarks;
