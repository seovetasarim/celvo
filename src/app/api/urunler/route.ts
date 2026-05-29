import { NextResponse } from "next/server";
import { fetchActiveProducts } from "@/lib/productsQuery";
import {
  loadCatalogFromJsonFile,
  loadCatalogFromPublicFolder,
  loadUrun1To12FromPublic,
} from "@/lib/catalogFallback";
import { useCatalogFallback } from "@/lib/useCatalogFallback";

export const dynamic = "force-dynamic";

/**
 * Canlı: yalnızca MySQL. Yerel: DB yoksa JSON/public yedek.
 */
export async function GET() {
  let products: Awaited<ReturnType<typeof fetchActiveProducts>> = [];
  let dbError: string | null = null;

  try {
    products = await fetchActiveProducts();
  } catch (error) {
    dbError =
      error instanceof Error ? error.message : "Veritabanı bağlantı hatası";
    console.error("[api/urunler] DB:", error);
  }

  if (products.length === 0 && useCatalogFallback()) {
    products = await loadCatalogFromJsonFile();
    if (products.length === 0) {
      products = await loadUrun1To12FromPublic();
    }
    if (products.length === 0) {
      products = await loadCatalogFromPublicFolder();
    }
  }

  if (products.length === 0 && dbError && process.env.VERCEL === "1") {
    return NextResponse.json(
      {
        products: [],
        error:
          "Veritabanına bağlanılamadı. Vercel'de DB_HOST, DB_USER, DB_PASSWORD, DB_NAME ve DB_PORT=3306 ayarlayın; cPanel Remote MySQL'de % ekleyin.",
        detail: dbError,
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ products });
}
