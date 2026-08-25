"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { pingIndexNow } from "@/lib/indexnow";
import { createClient } from "@/lib/supabase/server";

export type ActionState = { error?: string; ok?: string };

/** "a, b , c" → ["a","b","c"] */
function csv(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Paragraf dipisah baris kosong — sama seperti nulis di editor teks biasa. */
function paragraphs(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Tiap baris "Label | https://..." jadi satu tautan. */
function links(value: FormDataEntryValue | null): { label: string; href: string }[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => {
      const [label, href] = line.split("|").map((s) => s.trim());
      return { label: label ?? "", href: href ?? "" };
    })
    .filter((l) => l.label && l.href);
}

/**
 * Versi lama diam-diam balikin array kosong waktu JSON-nya rusak — artinya satu
 * salah ketik bisa ngapus seluruh isi kolom tanpa pesan apa pun. Sekarang
 * kegagalan dilaporkan, biar bisa dijadiin error yang kebaca.
 */
function jsonList(value: FormDataEntryValue | null): unknown[] | null {
  const raw = String(value ?? "").trim();
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function text(form: FormData, key: string): string {
  return String(form.get(key) ?? "").trim();
}

function nullable(form: FormData, key: string): string | null {
  const v = text(form, key);
  return v.length ? v : null;
}

function refreshPublicPages(slug: string) {
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/sitemap.xml");
  revalidatePath(`/work/${slug}`);
}

export async function saveEntry(_prev: ActionState, form: FormData): Promise<ActionState> {
  const supabase = await createClient();

  const slug = text(form, "slug");
  const title = text(form, "title");
  if (!slug || !title) return { error: "Judul dan slug wajib diisi." };
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { error: "Slug cuma boleh huruf kecil, angka, dan tanda hubung." };
  }

  const status = text(form, "status") || "draft";
  const coverSrc = nullable(form, "cover_src");
  const coverAlt = nullable(form, "cover_alt");

  // Teks alt cuma diwajibkan waktu terbit. Draft harus selalu bisa disimpen —
  // kerjaan yang belum kelar nggak boleh ilang gara-gara satu kolom kosong.
  if (status === "published" && coverSrc && !coverAlt) {
    return {
      error:
        "Cover-nya belum ada teks alt. Isi kolom di bawah gambarnya, atau simpan sebagai draft dulu.",
    };
  }

  const publishedAt = nullable(form, "published_at");
  if (status === "published" && !publishedAt) {
    return { error: "Entri terbit harus punya tanggal terbit — isi kolom Tanggal terbit." };
  }

  const gallery = jsonList(form.get("gallery"));
  if (gallery === null) {
    return { error: "Data galeri rusak. Muat ulang halamannya dan unggah lagi gambarnya." };
  }

  const payload = {
    slug,
    title,
    type: text(form, "type") || "build",
    summary: text(form, "summary"),
    body: paragraphs(form.get("body")),
    pullquote: nullable(form, "pullquote"),
    device: text(form, "device") || "desktop",
    featured: form.get("featured") === "on",
    year: Number(text(form, "year")) || new Date().getFullYear(),
    client: nullable(form, "client"),
    role: nullable(form, "role"),
    duration: nullable(form, "duration"),
    stack: csv(form.get("stack")),
    tags: csv(form.get("tags")),
    cover_src: coverSrc,
    cover_alt: coverAlt,
    gallery: gallery,
    links: links(form.get("links")),
    seo_title: nullable(form, "seo_title"),
    seo_description: nullable(form, "seo_description"),
    status,
    order: Number(text(form, "order")) || 0,
    published_at: publishedAt,
  };

  const { error } = await supabase.from("entries").upsert(payload, { onConflict: "slug" });
  if (error) return { error: error.message };

  // Entri yang udah terbit dikabarin ke mesin pencari yang ikut IndexNow.
  // `after` bikin ini jalan setelah responsnya kelar, jadi tombol Simpan
  // nggak nungguin jaringan orang lain. Draft nggak dikirim — halamannya
  // belum ada buat publik.
  if (status === "published") {
    after(() => pingIndexNow([`/work/${slug}`, "/work", "/", "/sitemap.xml"]));
  }

  refreshPublicPages(slug);
  revalidatePath("/studio");
  redirect("/studio");
}

export async function deleteEntry(form: FormData): Promise<void> {
  const supabase = await createClient();
  const slug = String(form.get("slug") ?? "");
  if (!slug) return;

  await supabase.from("entries").delete().eq("slug", slug);
  refreshPublicPages(slug);
  revalidatePath("/studio");
  redirect("/studio");
}

export async function saveProfile(_prev: ActionState, form: FormData): Promise<ActionState> {
  const supabase = await createClient();

  const roles = jsonList(form.get("roles"));
  const ghosts = jsonList(form.get("ghosts"));
  if (roles === null || ghosts === null) {
    return { error: "Data kartu peran atau kartu hantu rusak. Muat ulang halamannya, lalu isi lagi." };
  }

  const payload = {
    id: 1,
    name: text(form, "name"),
    full_name: text(form, "full_name"),
    headline: text(form, "headline"),
    bio: paragraphs(form.get("bio")),
    photo: text(form, "photo"),
    photo_alt: text(form, "photo_alt"),
    location: text(form, "location"),
    available: form.get("available") === "on",
    available_label: text(form, "available_label"),
    roles,
    skills: csv(form.get("skills")),
    socials: links(form.get("socials")),
    email: text(form, "email"),
    ghosts,
  };

  if (!payload.name || !payload.email) return { error: "Nama dan email wajib diisi." };
  if (payload.photo && !payload.photo_alt) return { error: "Foto ada tapi teks alt-nya kosong." };

  const { error } = await supabase.from("profile").upsert(payload, { onConflict: "id" });
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  return { ok: "Profil kesimpan." };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/studio/login");
}
