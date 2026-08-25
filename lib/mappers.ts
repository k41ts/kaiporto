import type { Entry, Ghost, Link, Profile, Shot } from "@/lib/types";

/**
 * Baris database → bentuk yang dipakai halaman. Kolom jsonb datang sebagai
 * `unknown`, jadi semuanya dijaga: satu baris rusak nggak boleh ngerobohin
 * seluruh halaman.
 */

type Row = Record<string, unknown>;

const str = (v: unknown, fallback = ""): string => (typeof v === "string" ? v : fallback);
const num = (v: unknown, fallback = 0): number => (typeof v === "number" ? v : fallback);
const bool = (v: unknown, fallback = false): boolean => (typeof v === "boolean" ? v : fallback);
const strArray = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);

function jsonArray(v: unknown): Row[] {
  if (Array.isArray(v)) return v.filter((x): x is Row => typeof x === "object" && x !== null);
  return [];
}

const toLinks = (v: unknown): Link[] =>
  jsonArray(v)
    .map((r) => ({ label: str(r.label), href: str(r.href) }))
    .filter((l) => l.label && l.href);

const toShots = (v: unknown): Shot[] =>
  jsonArray(v)
    .map((r) => ({ src: str(r.src) || undefined, alt: str(r.alt) }))
    .filter((s) => Boolean(s.src));

export const toGhosts = (v: unknown): Ghost[] =>
  jsonArray(v)
    .map((r) => ({ title: str(r.title), eta: str(r.eta) }))
    .filter((g) => g.title);

export function toEntry(row: Row): Entry {
  const type = row.type === "note" ? "note" : "build";
  const device =
    row.device === "mobile" || row.device === "both" || row.device === "none" ? row.device : "desktop";
  const status =
    row.status === "draft" || row.status === "archived" ? row.status : "published";
  const coverSrc = str(row.cover_src);

  return {
    slug: str(row.slug),
    title: str(row.title),
    type,
    summary: str(row.summary),
    body: strArray(row.body),
    pullquote: str(row.pullquote) || undefined,
    device,
    featured: bool(row.featured),
    year: num(row.year, new Date().getFullYear()),
    client: str(row.client) || undefined,
    role: str(row.role) || undefined,
    duration: str(row.duration) || undefined,
    stack: strArray(row.stack),
    cover: coverSrc ? { src: coverSrc, alt: str(row.cover_alt) } : undefined,
    gallery: toShots(row.gallery),
    links: toLinks(row.links),
    seoTitle: str(row.seo_title) || undefined,
    seoDescription: str(row.seo_description) || undefined,
    status,
    order: num(row.order),
    publishedAt: str(row.published_at),
    updatedAt: str(row.updated_at) || str(row.published_at),
  };
}

export function toProfile(row: Row, fallback: Profile): Profile {
  const roles = jsonArray(row.roles)
    .map((r) => ({ key: str(r.key), title: str(r.title), description: str(r.description) }))
    .filter((r) => r.title);

  return {
    name: str(row.name, fallback.name),
    fullName: str(row.full_name, fallback.fullName),
    headline: str(row.headline, fallback.headline),
    bio: strArray(row.bio).length ? strArray(row.bio) : fallback.bio,
    photo: str(row.photo, fallback.photo),
    photoAlt: str(row.photo_alt, fallback.photoAlt),
    location: str(row.location, fallback.location),
    available: bool(row.available, fallback.available),
    availableLabel: str(row.available_label, fallback.availableLabel),
    roles: roles.length ? roles : fallback.roles,
    skills: strArray(row.skills).length ? strArray(row.skills) : fallback.skills,
    socials: toLinks(row.socials).length ? toLinks(row.socials) : fallback.socials,
    email: str(row.email, fallback.email),
    ghosts: toGhosts(row.ghosts).length ? toGhosts(row.ghosts) : fallback.ghosts,
  };
}
