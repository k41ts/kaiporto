-- Tempat naruh cover dan galeri screenshot.
-- Publik buat dibaca (situsnya statis, gambar harus bisa diambil siapa saja),
-- tapi cuma pemilik yang login yang boleh unggah, ganti, atau hapus.

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media bisa dilihat siapa saja"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

create policy "pemilik unggah media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

create policy "pemilik ganti media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media') with check (bucket_id = 'media');

create policy "pemilik hapus media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');
