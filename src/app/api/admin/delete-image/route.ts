import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Ürün ID gerekli" },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();

    // Delete product from database
    await connection.query("DELETE FROM products WHERE id = ?", [productId]);

    connection.release();
    
    return NextResponse.json({ success: true, message: "Ürün silindi" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Silme hatası: " + (error as Error).message },
      { status: 500 }
    );
  }
}
