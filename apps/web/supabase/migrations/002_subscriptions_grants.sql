-- cmd-kit subscriptions privileges fix
-- Run in Supabase SQL Editor or via migration tooling.

grant usage on schema public to service_role;

grant select, insert, update, delete
  on table public.subscriptions
  to service_role;

grant select
  on table public.subscriptions
  to authenticated;

revoke all
  on table public.subscriptions
  from anon;
