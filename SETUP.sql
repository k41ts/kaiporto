-- ============================================================================
--  PortOS — jalanin SEKALI di Supabase SQL Editor. Itu doang.
--  Isinya: skema + bucket media + isian profil awal (foto & peran udah keisi).
--  Aman diulang: kalau dijalanin dua kali, nggak error dan nggak digandain.
-- ============================================================================

-- ---------------------------------------------------------------- tipe
do $$ begin
  create type entry_type as enum ('build', 'note');
exception when duplicate_object then null; end $$;

do $$ begin
  create type device_kind as enum ('desktop', 'mobile', 'both', 'none');
exception when duplicate_object then null; end $$;

do $$ begin
  create type entry_status as enum ('draft', 'published', 'archived');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------- profile
create table if not exists public.profile (
  id              smallint primary key default 1 check (id = 1),
  name            text        not null,
  full_name       text        not null,
  headline        text        not null,
  bio             text[]      not null default '{}',
  photo           text        not null,
  photo_alt       text        not null,
  location        text        not null default '',
  available       boolean     not null default true,
  available_label text        not null default '',
  roles           jsonb       not null default '[]'::jsonb,
  skills          text[]      not null default '{}',
  socials         jsonb       not null default '[]'::jsonb,
  email           text        not null,
  ghosts          jsonb       not null default '[]'::jsonb,
  updated_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------- entries
create table if not exists public.entries (
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

  -- Teks alt wajib ada kalau gambarnya ada. Aturan SEO ditegakkan di database,
  -- bukan cuma di form — biar nggak bisa dilewatin.
  constraint cover_alt_required check (cover_src is null or coalesce(cover_alt, '') <> ''),
  -- Cuma entri terbit yang boleh (dan harus) punya tanggal terbit.
  constraint published_needs_date check (status <> 'published' or published_at is not null)
);

create index if not exists entries_listing_idx on public.entries (status, featured desc, "order");
create index if not exists entries_slug_idx    on public.entries (slug);

-- ---------------------------------------------------------------- updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists entries_touch_updated_at on public.entries;
create trigger entries_touch_updated_at
  before update on public.entries
  for each row execute function public.touch_updated_at();

drop trigger if exists profile_touch_updated_at on public.profile;
create trigger profile_touch_updated_at
  before update on public.profile
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------- RLS
-- Situsnya baca pakai kunci publik, jadi anon HARUS dibatasi ke entri terbit.
-- Draft nggak boleh bocor lewat API walaupun ada yang nebak URL-nya.
alter table public.entries enable row level security;
alter table public.profile enable row level security;

drop policy if exists "entri terbit bisa dibaca siapa saja" on public.entries;
create policy "entri terbit bisa dibaca siapa saja"
  on public.entries for select to anon, authenticated using (status = 'published');

drop policy if exists "pemilik lihat semua entri" on public.entries;
create policy "pemilik lihat semua entri"
  on public.entries for select to authenticated using (true);

drop policy if exists "pemilik tulis entri" on public.entries;
create policy "pemilik tulis entri"
  on public.entries for insert to authenticated with check (true);

drop policy if exists "pemilik ubah entri" on public.entries;
create policy "pemilik ubah entri"
  on public.entries for update to authenticated using (true) with check (true);

drop policy if exists "pemilik hapus entri" on public.entries;
create policy "pemilik hapus entri"
  on public.entries for delete to authenticated using (true);

drop policy if exists "profil bisa dibaca siapa saja" on public.profile;
create policy "profil bisa dibaca siapa saja"
  on public.profile for select to anon, authenticated using (true);

drop policy if exists "pemilik ubah profil" on public.profile;
create policy "pemilik ubah profil"
  on public.profile for update to authenticated using (true) with check (true);

drop policy if exists "pemilik isi profil" on public.profile;
create policy "pemilik isi profil"
  on public.profile for insert to authenticated with check (true);

-- ---------------------------------------------------------------- storage
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media bisa dilihat siapa saja" on storage.objects;
create policy "media bisa dilihat siapa saja"
  on storage.objects for select to anon, authenticated using (bucket_id = 'media');

drop policy if exists "pemilik unggah media" on storage.objects;
create policy "pemilik unggah media"
  on storage.objects for insert to authenticated with check (bucket_id = 'media');

drop policy if exists "pemilik ganti media" on storage.objects;
create policy "pemilik ganti media"
  on storage.objects for update to authenticated
  using (bucket_id = 'media') with check (bucket_id = 'media');

drop policy if exists "pemilik hapus media" on storage.objects;
create policy "pemilik hapus media"
  on storage.objects for delete to authenticated using (bucket_id = 'media');

-- ---------------------------------------------------------------- isian awal
-- Foto, headline, bio, dan tiga kartu peran langsung keisi.
-- Email & sosial sengaja ditandai — itu yang masih karangan dan harus lu ganti.
-- Dijalanin ulang nggak nimpa apa pun yang udah lu edit.
insert into public.profile (
  id, name, full_name, headline, bio, photo, photo_alt, location,
  available, available_label, roles, skills, socials, email, ghosts
) values (
  1,
  'Zaidan',
  'Zaidan',
  'Bangun produk digital dari nol sampai jalan di produksi.',
  array[
    'Full-stack engineer yang kerja bareng founder sebagai partner teknis: ikut mikirin keputusan produknya, bukan cuma nunggu spek turun terus ngoding.',
    'Paling sering dipanggil waktu sebuah produk perlu dibangun dari kosong, atau waktu yang lama udah nggak sanggup nampung penggunanya.'
  ],
  '/zaidan.jpg',
  'Zaidan, duduk di meja kafe dengan dinding poster Jepang di belakangnya',
  'Indonesia',
  true,
  'Lagi terima proyek buat kuartal ini',
  '[
    {"key":"Peran 01","title":"Software Engineer","description":"Nulis kode yang dipakai orang beneran dan bisa dirawat setelah gw pergi."},
    {"key":"Peran 02","title":"Tech Partner","description":"Bantu founder milih stack, ngitung biaya, dan nentuin apa yang nggak usah dibangun."},
    {"key":"Peran 03","title":"Full-Stack Developer","description":"Dari skema database, API, antarmuka, sampai deploy dan monitoring."}
  ]'::jsonb,
  array['TypeScript','Next.js','React','Node.js','PostgreSQL','React Native','AWS','Docker'],
  '[{"label":"GANTI — GitHub","href":"https://github.com/"}]'::jsonb,
  'GANTI-EMAIL-LU@contoh.com',
  '[{"title":"Lagi dikerjain","eta":"Q4 2026"}]'::jsonb
)
on conflict (id) do nothing;
