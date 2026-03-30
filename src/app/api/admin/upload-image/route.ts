import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Dosya seçilmedi" }, { status: 400 });
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "Geçersiz dosya tipi" }, { status: 400 });
    }

    // Max 5MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "Dosya çok büyük (max 5MB)" }, { status: 400 });
    }

    // Convert to base64 data URL
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const mimeType = file.type;
    const dataUrl = `data:${mimeType};base64,${base64}`;

    // Save to database
    const connection = await pool.getConnection();

    // Get max sort_order
    const [maxResult] = await connection.query(
      "SELECT MAX(sort_order) as max_order FROM products"
    );
    const maxOrder = (maxResult as any[])[0]?.max_order || 0;

    // Insert into products table
    const [result] = await connection.query(
      `INSERT INTO products (image_path, name, category, sort_order, is_active) VALUES (?, ?, ?, ?, 1)`,
      [dataUrl, 'Yeni Ürün', 'Tekstil', maxOrder + 1]
    );

    connection.release();

    return NextResponse.json({
      success: true,
      imagePath: dataUrl,
      productId: (result as any).insertId,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Yükleme hatası: " + (error as Error).message },
      { status: 500 }
    );
  }
}
