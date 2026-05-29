/** Canlıda (Vercel) DB yokken GitHub'daki örnek görselleri gösterme — sadece gerçek veritabanı. */
export function useCatalogFallback(): boolean {
  return process.env.VERCEL !== "1";
}
