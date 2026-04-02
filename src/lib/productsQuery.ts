import pool from "@/lib/db";
import type { RowDataPacket } from "mysql2/promise";

export type CatalogProduct = {
  id: number | string;
  image: string;
  images?: string[];
  name: string;
  category: string;
  description?: string;
};

/** Admin ve anasayfa ile aynı kaynak: `products` tablosu */
export async function fetchActiveProducts(): Promise<CatalogProduct[]> {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT id, image_path, name, category, description FROM products WHERE COALESCE(is_active, 1) = 1 ORDER BY sort_order ASC, id ASC"
    );
    const list = rows as RowDataPacket[];
    if (list.length === 0) return [];

    const productIds = list.map((p) => Number(p.id)).filter((id) => Number.isFinite(id));
    const galleryMap = new Map<number, string[]>();

    if (productIds.length > 0) {
      try {
        const placeholders = productIds.map(() => "?").join(", ");
        const [imageRows] = await connection.query(
          `SELECT product_id, image_path FROM product_images WHERE product_id IN (${placeholders}) ORDER BY sort_order ASC, id ASC`,
          productIds,
        );
        const gallery = imageRows as RowDataPacket[];
        gallery.forEach((row) => {
          const pid = Number(row.product_id);
          const current = galleryMap.get(pid) ?? [];
          current.push(String(row.image_path ?? ""));
          galleryMap.set(pid, current);
        });
      } catch {
        // product_images tablosu olmayan ortamlarda tek görselle devam eder
      }
    }

    return list.map((p) => {
      const primaryImage = String(p.image_path ?? "");
      const imagesFromDb = galleryMap.get(Number(p.id)) ?? [];
      const images = imagesFromDb.length > 0 ? imagesFromDb : [primaryImage].filter(Boolean);
      return {
      id: p.id as number,
      image: primaryImage || images[0] || "",
      images,
      name: String(p.name ?? "Ürün"),
      category: String(p.category ?? "Tekstil"),
      description: String(p.description ?? ""),
      };
    });
  } finally {
    connection.release();
  }
}
