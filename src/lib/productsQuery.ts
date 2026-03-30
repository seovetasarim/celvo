import pool from "@/lib/db";
import type { RowDataPacket } from "mysql2/promise";

export type CatalogProduct = {
  id: number;
  image: string;
  name: string;
  category: string;
};

/** Admin ve anasayfa ile aynı kaynak: `products` tablosu */
export async function fetchActiveProducts(): Promise<CatalogProduct[]> {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT id, image_path, name, category FROM products WHERE is_active = 1 ORDER BY sort_order ASC, id ASC"
    );
    const list = rows as RowDataPacket[];
    return list.map((p) => ({
      id: p.id as number,
      image: String(p.image_path ?? ""),
      name: String(p.name ?? "Ürün"),
      category: String(p.category ?? "Tekstil"),
    }));
  } finally {
    connection.release();
  }
}
