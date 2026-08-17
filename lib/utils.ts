import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Penggabung className standar yang dipakai hampir semua komponen salin-tempel
 * dari Aceternity, Magic UI, dan sejenisnya. Ditaruh di sini supaya waktu nyalin
 * komponen dari sana, import `@/lib/utils` langsung ketemu.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
