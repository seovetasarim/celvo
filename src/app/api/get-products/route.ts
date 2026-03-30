import { NextResponse } from "next/server";
import { fetchActiveProducts } from "@/lib/productsQuery";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await fetchActiveProducts();
    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}
