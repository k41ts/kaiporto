# Portofolio Zaidan

Satu halaman bergaya poster cyber-oni: poster merah dengan topeng Hannya yang "dikunci",
lembar putih yang naik menutupinya (perkenalan dan status), loadout alat, satu proyek
unggulan, lalu halaman `/work` berisi semua proyek.

```bash
npm run dev     # http://localhost:3000
npm run build   # semua halaman jadi HTML statis
```

## Halaman

- `/`: poster, perkenalan (bento), loadout, proyek unggulan (HakaiKOL), kontak
- `/work`: indeks proyek, HakaiKOL, showcase KaiCash, proyek berikutnya
- URL lama (`/about`, `/contact`, `/work/[slug]`, `/studio`) diarahkan ulang di `next.config.ts`

## Ganti isi konten

Semua ada di [`content/site.ts`](content/site.ts). Nggak ada database: edit, deploy, selesai.

- `profile`: nama, peran, email, LinkedIn, kapan bisa ambil proyek
- `hakaikol`, `kaicash`: proyek beserta screenshot di `public/work/`
- `loadout`: lapisan produk dan alat yang dipakai di tiap lapisan

Kanji pakai Dela Gothic One yang diunduh sebagai subset. Kalau nambah kanji baru di
konten, tambahkan juga karakternya ke `KANJI` di `app/(site)/layout.tsx`.

## Gambar

- Topeng Hannya dan oni di `public/img/g-*`: dibuat dengan AI untuk situs ini
- Foto oni di `public/img/p-*`: dari Pexels (lisensi Pexels, bebas dipakai)
- Screenshot proyek: produk sendiri
