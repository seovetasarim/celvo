import { NextResponse } from "next/server";
import { fetchActiveProducts } from "@/lib/productsQuery";
import {
  loadCatalogFromJsonFile,
  loadCatalogFromPublicFolder,
  loadUrun1To12FromPublic,
} from "@/lib/catalogFallback";

export const dynamic = "force-dynamic";

/**
 * Öncelik: MySQL → data/products.json → public/urun1…urun12 → diğer public görseller
 */
export async function GET() {
  let products: Awaited<ReturnType<typeof fetchActiveProducts>> = [];

  try {
    products = await fetchActiveProducts();
  } catch (error) {
    console.error("[api/urunler] DB:", error);
  }

  if (products.length === 0) {
    products = await loadCatalogFromJsonFile();
  }
  if (products.length === 0) {
    products = await loadUrun1To12FromPublic();
  }
  if (products.length === 0) {
    products = await loadCatalogFromPublicFolder();
  }

  return NextResponse.json({ products });
}
