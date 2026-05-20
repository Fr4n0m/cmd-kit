-- cmd-kit subscriptions schema (production)
-- Run in Supabase SQL Editor or via migration tooling.

create extension if not exists pgcrypto;

create table if not exists public.subscriptions (
  email text primary key,
  status text not null check (status in ('pending', 'active', 'unsubscribed', 'bounced')),
  locale text not null check (locale in ('es', 'en')),
  source text not null check (source in ('hero', 'footer', 'banner', 'modal', 'other')),
  verify_token_hash text not null,
  unsubscribe_token_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  verified_at timestamptz,
  unsubscribed_at timestamptz,
  accepted_at timestamptz not null,
  accepted_ip text not null,
  accepted_user_agent text not null,
  consent_version text not null,
  last_notified_resource_id text
);

create index if not exists subscriptions_status_idx
  on public.subscriptions (status);

create index if not exists subscriptions_updated_at_idx
  on public.subscriptions (updated_at desc);

create index if not exists subscriptions_verify_token_hash_idx
  on public.subscriptions (verify_token_hash);

create index if not exists subscriptions_unsubscribe_token_hash_idx
  on public.subscriptions (unsubscribe_token_hash);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists subscriptions_touch_updated_at on public.subscriptions;
create trigger subscriptions_touch_updated_at
before update on public.subscriptions
for each row
execute function public.touch_updated_at();

alter table public.subscriptions enable row level security;

-- No anon/authenticated policies on this table.
-- Access is server-side through service role key only.
