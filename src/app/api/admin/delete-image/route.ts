import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { productId, imagePath } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Ürün ID gerekli" },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    try {
      if (imagePath) {
        await connection.query(
          "DELETE FROM product_images WHERE product_id = ? AND image_path = ?",
          [productId, imagePath]
        );

        const [remainingRows] = await connection.query(
          "SELECT image_path FROM product_images WHERE product_id = ? ORDER BY sort_order ASC, id ASC LIMIT 1",
          [productId]
        );
        const nextCover = (remainingRows as any[])[0]?.image_path;
        await connection.query("UPDATE products SET image_path = ? WHERE id = ?", [nextCover || "", productId]);

        return NextResponse.json({ success: true, message: "Ürün görseli silindi" });
      }

      // Delete product (and gallery images)
      try {
        await connection.query("DELETE FROM product_images WHERE product_id = ?", [productId]);
      } catch {
        // product_images tablosu olmayabilir
      }
      await connection.query("DELETE FROM products WHERE id = ?", [productId]);

      return NextResponse.json({ success: true, message: "Ürün silindi" });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Silme hatası: " + (error as Error).message },
      { status: 500 }
    );
  }
}
