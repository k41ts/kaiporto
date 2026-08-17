# PortOS — portofolio Zaidan

Portofolio yang tampil sebagai jendela aplikasi di atas desktop. Rancangan visual
lengkapnya ada di [`design/design-plan.html`](design/design-plan.html) — buka di browser.

```bash
npm run dev     # http://localhost:3000
npm run build   # semua halaman jadi HTML statis
```

## Yang sudah jalan

- Shell OS: jendela kaca, lampu merah/kuning/hijau yang berfungsi, tab, dock, mode terang/gelap
- Latar: hitam pekat + semburat ungu + titik + butiran film, semua CSS (nol byte gambar)
- Grid showcase adaptif — lihat di bawah
- Halaman: Home, Work, detail `/work/[slug]`, About, Contact, 404
- SEO: HTML dirender di server, metadata per halaman, JSON-LD, sitemap, robots, gambar OG

## Ganti isi konten

Semua ada di [`content/site.ts`](content/site.ts). Belum ada database — cukup edit file itu.

**Wajib diganti sebelum deploy** (sekarang masih data contoh):

- `profile.email` dan `profile.socials` — isinya alamat karangan
- Seluruh isi `entries` — nama proyek, klien, dan angkanya karangan
- `SITE_URL` di `content/site.ts`, atau set `NEXT_PUBLIC_SITE_URL`

Foto (`public/zaidan.jpg`) sudah asli.

Screenshot proyek taruh di `public/shots/`, lalu isi `cover: { src: "/shots/nama.png", alt: "..." }`.
Selama `src` kosong, kartunya nampilin placeholder — bukan error.

## Grid adaptif

`lib/layout.ts` nyusun grid 12 kolom dari jumlah entri yang terbit. Tiga ukuran petak:
sorotan (12), lebar (6), tinggi (3). Karena 3 + 3 = 6, dua kartu HP persis selebar satu
kartu desktop — jadi campuran berapa pun nggak nyisain lubang. Sisa baris diisi kartu
bergaris putus-putus dari `profile.ghosts`.

| Entri | Susunan |
|---|---|
| 0 | satu kartu hantu penuh |
| 1 | sorotan penuh |
| 2 | sorotan + lebar + hantu (sengaja timpang; 6+6 bikin halaman kelihatan sepi) |
| 3 | sorotan + 2 lebar |
| 4 | 2×2 rata, tanpa sorotan |
| 5+ | satu sorotan tiap 5 kartu |

Entri `type: "note"` dan `device: "mobile"` nggak pernah dipromosikan jadi sorotan —
banner 16:6 dari screenshot HP kelihatan salah.

## Studio

Panel input ada di `/studio` — daftar entri, form editor lengkap, unggah gambar,
editor profil. Dikunci login, `noindex`, dan diblokir di `robots.txt`.

Cara nyalain: [SETUP-SUPABASE.md](SETUP-SUPABASE.md). Semuanya lewat dashboard,
nggak butuh terminal.

**Selama `.env.local` belum diisi, situsnya tetap jalan** — `lib/content.ts` baca dari
`content/site.ts`, dan `/studio` nampilin panduan setup, bukan error. Begitu diisi,
sumber datanya pindah ke database tanpa satu pun halaman perlu diubah.

Halaman publik pakai ISR 60 detik, plus `revalidatePath` tiap kali Studio nyimpen —
jadi perubahan langsung kelihatan, tapi halamannya tetap statis buat pengunjung.
