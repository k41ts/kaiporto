import { entries as localEntries, profile as localProfile, SITE_URL } from "@/content/site";
import { toEntry, toProfile } from "@/lib/mappers";
import { supabaseReady } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";
import type { Entry, Profile } from "@/lib/types";

/**
 * Satu-satunya pintu ke data.
 *
 * Kalau variabel Supabase belum diisi, semuanya jatuh balik ke content/site.ts
 * supaya situsnya tetap hidup. Begitu diisi, sumbernya pindah ke database tanpa
 * satu pun halaman perlu diubah.
 *
 * Query publik selalu memfilter status secara eksplisit — bukan cuma ngandelin
 * RLS — supaya draft nggak ikut kelihatan waktu pemiliknya lagi login.
 */

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL;
}

function sortEntries(list: Entry[]): Entry[] {
  return [...list].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.order - b.order;
  });
}

const localPublished = () => sortEntries(localEntries.filter((e) => e.status === "published"));

export async function getProfile(): Promise<Profile> {
  if (!supabaseReady) return localProfile;

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase.from("profile").select("*").eq("id", 1).maybeSingle();
    if (error || !data) return localProfile;
    return toProfile(data, localProfile);
  } catch {
    return localProfile;
  }
}

export async function getPublishedEntries(): Promise<Entry[]> {
  if (!supabaseReady) return localPublished();

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .eq("status", "published")
      .order("featured", { ascending: false })
      .order("order", { ascending: true });

    if (error || !data) return localPublished();
    return data.map(toEntry);
  } catch {
    return localPublished();
  }
}

export async function getEntry(slug: string): Promise<Entry | undefined> {
  const list = await getPublishedEntries();
  return list.find((e) => e.slug === slug);
}

export async function getAllSlugs(): Promise<string[]> {
  const list = await getPublishedEntries();
  return list.map((e) => e.slug);
}

export async function getNeighbours(slug: string): Promise<{ prev?: Entry; next?: Entry }> {
  const list = await getPublishedEntries();
  const i = list.findIndex((e) => e.slug === slug);
  if (i === -1) return {};
  return { prev: list[i - 1], next: list[i + 1] };
}

/** Studio butuh semuanya, termasuk draft dan arsip. Hanya untuk sesi yang login. */
export async function getAllEntriesForStudio(): Promise<Entry[]> {
  if (!supabaseReady) return sortEntries(localEntries);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .order("featured", { ascending: false })
    .order("order", { ascending: true });

  if (error || !data) return [];
  return data.map(toEntry);
}

export async function getEntryForStudio(slug: string): Promise<Entry | undefined> {
  if (!supabaseReady) return localEntries.find((e) => e.slug === slug);

  const supabase = await createClient();
  const { data, error } = await supabase.from("entries").select("*").eq("slug", slug).maybeSingle();
  if (error || !data) return undefined;
  return toEntry(data);
}
