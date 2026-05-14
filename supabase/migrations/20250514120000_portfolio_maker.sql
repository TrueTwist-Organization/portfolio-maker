-- PortfolioMaker: users + portfolios (run in Supabase SQL editor or via `supabase db push`)

create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password text not null,
  credits integer not null default 3,
  referral_code text not null unique,
  referred_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_users_email_lower on public.users (lower(email));

create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users (id) on delete cascade,
  guest_id text,
  title text not null default 'My Portfolio',
  template text not null default 'modern',
  resume_file text,
  status text not null default 'draft' check (status in ('draft', 'published', 'processing')),
  slug text unique,
  is_live boolean not null default false,
  views integer not null default 0,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint portfolio_owner_xor check (
    (user_id is not null and guest_id is null)
    or (user_id is null and guest_id is not null)
  )
);

create index if not exists idx_portfolios_user on public.portfolios (user_id, created_at desc);
create index if not exists idx_portfolios_guest on public.portfolios (guest_id, created_at desc);
create index if not exists idx_portfolios_public_slug on public.portfolios (slug) where is_live = true;

create or replace function public.portfolio_maker_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists portfolio_maker_users_updated_at on public.users;
create trigger portfolio_maker_users_updated_at
  before update on public.users
  for each row execute procedure public.portfolio_maker_set_updated_at();

drop trigger if exists portfolio_maker_portfolios_updated_at on public.portfolios;
create trigger portfolio_maker_portfolios_updated_at
  before update on public.portfolios
  for each row execute procedure public.portfolio_maker_set_updated_at();

alter table public.users enable row level security;
alter table public.portfolios enable row level security;

-- PostgREST: anon/authenticated cannot access these tables. The Node API uses the
-- service role key, which bypasses RLS. Do not expose the service role key in the browser.
