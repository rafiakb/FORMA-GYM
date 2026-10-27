-- FORMA Gym Cloud · PostgreSQL / Supabase
-- Jalankan di Supabase Dashboard -> SQL Editor -> New query -> Run.
-- Aman dijalankan ulang; tidak menghapus akun maupun catatan.
-- Login dikelola oleh Supabase Auth (auth.users), bukan tabel password sendiri.

create table if not exists public.forma_user_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text not null default 'Atlet' check (char_length(name) between 2 and 100),
  goal text not null default 'Menjaga kebugaran'
    check (goal in ('Membangun otot','Menurunkan berat','Menjaga kebugaran','Meningkatkan kekuatan')),
  height_cm numeric(5,1) null check (height_cm is null or height_cm between 100 and 250),
  target_per_week smallint not null default 4 check (target_per_week between 1 and 7),
  custom_programs jsonb not null default '[]'::jsonb check (jsonb_typeof(custom_programs) = 'array'),
  schedule jsonb not null default '[]'::jsonb check (jsonb_typeof(schedule) = 'array'),
  history jsonb not null default '[]'::jsonb check (jsonb_typeof(history) = 'array'),
  metrics jsonb not null default '[]'::jsonb check (jsonb_typeof(metrics) = 'array'),
  created_at timestamptz not null default now()
);

create index if not exists forma_user_data_created_idx on public.forma_user_data (created_at);
alter table public.forma_user_data enable row level security;
-- Hanya user terautentikasi yang mendapat izin operasi tabel ini.
revoke all on public.forma_user_data from anon;
revoke all on public.forma_user_data from authenticated;
grant select, insert, update, delete on public.forma_user_data to authenticated;

drop policy if exists "forma_read_own" on public.forma_user_data;
drop policy if exists "forma_create_own" on public.forma_user_data;
drop policy if exists "forma_update_own" on public.forma_user_data;
drop policy if exists "forma_delete_own" on public.forma_user_data;
create policy "forma_read_own" on public.forma_user_data
for select to authenticated using ((select auth.uid()) = user_id);
create policy "forma_create_own" on public.forma_user_data
for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "forma_update_own" on public.forma_user_data
for update to authenticated using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
create policy "forma_delete_own" on public.forma_user_data
for delete to authenticated using ((select auth.uid()) = user_id);
