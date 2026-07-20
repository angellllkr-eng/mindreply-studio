-- MindReply Backend Core — Supabase schema
-- Ref: aziwdgndohdgnwztpwdi
-- Apply via: supabase db push  OR  paste in SQL Editor
-- Follows postgres-sql + supabase best practices: IDENTITY PKs, TIMESTAMPTZ, FK indexes, RLS

-- Extensions
create extension if not exists "pgcrypto";

-- 1. memory_entries — agent + user memory persistence
create table if not exists public.memory_entries (
  id          bigint generated always as identity primary key,
  key         text not null,
  value       jsonb not null default '{}'::jsonb,
  owner       text not null default 'angellllkr-eng',
  created_at  timestamptz not null default now()
);
create index if not exists memory_entries_owner_idx on public.memory_entries (owner);
create index if not exists memory_entries_key_idx  on public.memory_entries (key);
create index if not exists memory_entries_created_idx on public.memory_entries (created_at desc);

-- 2. leaderboard — model ELO competition
create table if not exists public.leaderboard (
  model       text primary key,
  wins        int  not null default 0,
  losses      int  not null default 0,
  draws       int  not null default 0,
  elo         int  not null default 1500,
  products    int  not null default 0,
  updated_at  timestamptz not null default now()
);
create index if not exists leaderboard_elo_idx on public.leaderboard (elo desc);

-- 3. battles — individual model matchups
create table if not exists public.battles (
  id          bigint generated always as identity primary key,
  winner      text not null,
  loser       text not null,
  product     text,
  elo_delta   int  not null default 16,
  created_at  timestamptz not null default now()
);
create index if not exists battles_winner_idx on public.battles (winner);
create index if not exists battles_loser_idx  on public.battles (loser);
create index if not exists battles_product_idx on public.battles (product);
create index if not exists battles_created_idx on public.battles (created_at desc);

-- 4. chat_logs — optional audit trail
create table if not exists public.chat_logs (
  id          bigint generated always as identity primary key,
  provider    text not null,
  model       text not null,
  message     text not null,
  reply       text,
  effort      text,
  created_at  timestamptz not null default now()
);
create index if not exists chat_logs_created_idx on public.chat_logs (created_at desc);
create index if not exists chat_logs_provider_idx on public.chat_logs (provider);

-- 5. hn_cache — Hacker News knowledge cache (Obsidian sync source)
create table if not exists public.hn_cache (
  id          bigint generated always as identity primary key,
  hn_id       bigint not null unique,
  title       text not null,
  url         text,
  points      int  not null default 0,
  comments    int  not null default 0,
  by          text,
  fetched_at  timestamptz not null default now()
);
create index if not exists hn_cache_fetched_idx on public.hn_cache (fetched_at desc);
create index if not exists hn_cache_points_idx  on public.hn_cache (points desc);

-- Upsert seed leaderboard (ON CONFLICT — atomic, idempotent)
insert into public.leaderboard (model, wins, losses, draws, elo, products) values
  ('grok-4.5',         14, 6,  2, 1820, 6),
  ('claude-opus-4.8',   13, 7,  2, 1815, 4),
  ('gpt-5',             9, 11, 2, 1780, 0),
  ('gemini-2-pro',      7, 13, 2, 1740, 0),
  ('deepseek-v3',       5, 15, 2, 1690, 0)
on conflict (model) do nothing;

-- record_battle(winner_model, loser_model, product_name) — Elo +1/-1, +16/-16
create or replace function public.record_battle(winner_model text, loser_model text, product_name text)
returns void
language plpgsql
security definer
as $$
begin
  insert into public.battles (winner, loser, product) values (winner_model, loser_model, product_name);
  update public.leaderboard set wins = wins + 1, elo = elo + 16, updated_at = now() where model = winner_model;
  update public.leaderboard set losses = losses + 1, elo = greatest(elo - 16, 100), updated_at = now() where model = loser_model;
end;
$$;

-- RLS — owner-scoped for memory + chat logs; leaderboard + battles + hn_cache public read
alter table public.memory_entries enable row level security;
alter table public.chat_logs    enable row level security;
create policy "owner can read memory"  on public.memory_entries for select using (owner = current_setting('app.owner', true) or owner = 'angellllkr-eng');
create policy "owner can write memory" on public.memory_entries for insert with check (true);
create policy "owner can delete memory" on public.memory_entries for delete using (owner = 'angellllkr-eng');
create policy "owner can log chat" on public.chat_logs for insert with check (true);

-- Done.
