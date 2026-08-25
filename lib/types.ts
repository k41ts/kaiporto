export type EntryType = "build" | "note";
export type Device = "desktop" | "mobile" | "both" | "none";
export type Status = "published" | "draft" | "archived";

export type Shot = {
  /** Path di /public, mis. "/shots/kasa-pos.png". Kosongkan kalau screenshot belum ada. */
  src?: string;
  /** Wajib diisi kalau src ada — form Studio nanti nolak simpan kalau kosong. */
  alt: string;
};

export type Link = { label: string; href: string };

export type Entry = {
  slug: string;
  title: string;
  type: EntryType;
  summary: string;
  /** Paragraf badan artikel. String biasa; "## " di awal baris jadi subjudul. */
  body: string[];
  /** Satu kalimat yang ditarik keluar sebagai kutipan besar. */
  pullquote?: string;
  device: Device;
  featured: boolean;
  year: number;
  client?: string;
  role?: string;
  duration?: string;
  stack: string[];
  cover?: Shot;
  gallery: Shot[];
  links: Link[];
  seoTitle?: string;
  seoDescription?: string;
  status: Status;
  order: number;
  publishedAt: string;
  /**
   * Kapan terakhir diubah, dipakai sitemap sebagai `lastmod`. Opsional karena
   * isi cadangan di content/site.ts nggak punya riwayat perubahan — di sana
   * tanggal terbitnya yang dipakai.
   */
  updatedAt?: string;
};

export type Ghost = { title: string; eta: string };

export type Profile = {
  name: string;
  fullName: string;
  headline: string;
  bio: string[];
  photo: string;
  photoAlt: string;
  location: string;
  available: boolean;
  availableLabel: string;
  roles: { key: string; title: string; description: string }[];
  skills: string[];
  socials: Link[];
  email: string;
  /** Kartu bergaris putus-putus yang ngisi sisa baris di grid. */
  ghosts: Ghost[];
};
