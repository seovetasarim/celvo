/** Üretim: Vercel’de `NEXT_PUBLIC_SITE_URL` tanımlayın (örn. https://celvo.com.tr) */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://celvo.com.tr";
  return raw.replace(/\/$/, "");
}
