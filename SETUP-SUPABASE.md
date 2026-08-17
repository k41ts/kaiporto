# Status: udah nyambung

Project **Porto Zaidan** (`donlnxtgrrhbqdsdaivi`). Yang udah kelar:

- ✅ Tabel `entries` + `profile`, RLS nyala
- ✅ Bucket `media` buat cover & galeri
- ✅ Profil awal keisi — foto, headline, bio, tiga kartu peran
- ✅ `.env.local` keisi URL + publishable key
- ✅ `/studio` kekunci, redirect ke login

---

## Sisa satu langkah: bikin akun Studio

Dashboard → **Authentication** → **Users** → **Add user** → **Create new user**.

Isi email dan password bebas. Itu yang dipakai buat masuk ke `/studio`. Password lu urusan lu
sendiri — nggak perlu dikasih ke siapa pun.

Halaman login sengaja nggak punya tombol daftar, jadi cuma akun yang lu bikin di sini
yang bisa masuk.

---

## Habis itu

Buka `/studio` → masuk → **Profil & peran**.

Yang masih karangan dan perlu diganti: **email** dan **tautan sosial**. Di database sengaja
gw tandai `GANTI-EMAIL-LU@contoh.com` biar kelihatan kalau kelewat. Foto lu udah asli.

Terus ke **Work** buat nambah proyek pertama.

---

## Kalau ada yang error

Halaman publik nggak bakal ikut mati — kalau database nggak kebaca, dia jatuh balik ke
`content/site.ts`. Kirim aja pesan errornya.
