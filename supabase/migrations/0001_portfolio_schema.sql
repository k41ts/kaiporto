-- Skema portofolio PortOS.
-- Bentuknya sengaja sama persis dengan lib/types.ts, jadi lib/content.ts cukup
-- ganti sumber data tanpa halaman ikut berubah.

create type entry_type   as enum ('build', 'note');
create type device_kind  as enum ('desktop', 'mobile', 'both', 'none');
create type entry_status as enum ('draft', 'published', 'archived');

-- ---------------------------------------------------------------- profile
-- Satu baris saja. Check constraint di bawah yang memaksanya.
create table public.profile (
  id                smallint primary key default 1 check (id = 1),
  name              text        not null,
  full_name         text        not null,
  headline          text        not null,
  bio               text[]      not null default '{}',
  photo             text        not null,
  photo_alt         text        not null,
  location          text        not null default '',
  available         boolean     not null default true,
  available_label   text        not null default '',
  roles             jsonb       not null default '[]'::jsonb,
  skills            text[]      not null default '{}',
  socials           jsonb       not null default '[]'::jsonb,
  email             text        not null,
  ghosts            jsonb       not null default '[]'::jsonb,
  updated_at        timestamptz not null default now()
);

-- ---------------------------------------------------------------- entries
create table public.entries (
  id              uuid         primary key default gen_random_uuid(),
  slug            text         not null unique,
  title           text         not null,
  type            entry_type   not null default 'build',
  summary         text         not null default '',
  body            text[]       not null default '{}',
  pullquote       text,
  device          device_kind  not null default 'desktop',
  featured        boolean      not null default false,
  year            smallint     not null,
  client          text,
  role            text,
  duration        text,
  stack           text[]       not null default '{}',
  tags            text[]       not null default '{}',
  cover_src       text,
  cover_alt       text,
  gallery         jsonb        not null default '[]'::jsonb,
  links           jsonb        not null default '[]'::jsonb,
  seo_title       text,
  seo_description text,
  status          entry_status not null default 'draft',
  "order"         integer      not null default 0,
  published_at    date,
  created_at      timestamptz  not null default now(),
  updated_at      timestamptz  not null default now(),

  -- Teks alt wajib ada kalau gambarnya ada. Aturan SEO §06 ditegakkan di
  -- database, bukan cuma di form — biar nggak bisa dilewatin.
  constraint cover_alt_required check (cover_src is null or coalesce(cover_alt, '') <> ''),
  -- Cuma entri terbit yang boleh (dan harus) punya tanggal terbit.
  constraint published_needs_date check (status <> 'published' or published_at is not null)
);

create index entries_listing_idx on public.entries (status, featured desc, "order");
create index entries_slug_idx    on public.entries (slug);

-- ---------------------------------------------------------------- updated_at
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger entries_touch_updated_at
  before update on public.entries
  for each row execute function public.touch_updated_at();

create trigger profile_touch_updated_at
  before update on public.profile
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------- RLS
-- Situsnya baca dengan kunci publik, jadi anon HARUS dibatasi ke entri terbit.
-- Draft tidak boleh bocor lewat API.
alter table public.entries enable row level security;
alter table public.profile enable row level security;

create policy "entri terbit bisa dibaca siapa saja"
  on public.entries for select
  to anon, authenticated
  using (status = 'published');

create policy "pemilik lihat semua entri"
  on public.entries for select
  to authenticated
  using (true);

create policy "pemilik tulis entri"
  on public.entries for insert
  to authenticated
  with check (true);

create policy "pemilik ubah entri"
  on public.entries for update
  to authenticated
  using (true) with check (true);

create policy "pemilik hapus entri"
  on public.entries for delete
  to authenticated
  using (true);

create policy "profil bisa dibaca siapa saja"
  on public.profile for select
  to anon, authenticated
  using (true);

create policy "pemilik ubah profil"
  on public.profile for update
  to authenticated
  using (true) with check (true);

create policy "pemilik isi profil"
  on public.profile for insert
  to authenticated
  with check (true);
