import { NextResponse } from "next/server";
import { fetchActiveProducts } from "@/lib/productsQuery";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await fetchActiveProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("[api/urunler] DB:", error);
    return NextResponse.json({ products: [] });
  }
}
