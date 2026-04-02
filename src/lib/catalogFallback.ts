import { promises as fs } from "fs";
import path from "path";
import type { CatalogProduct } from "@/lib/productsQuery";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".JPG", ".JPEG", ".PNG", ".WEBP"];

/**
 * public/urun1 … public/urun12 — sırayla (1→12), uzantı otomatik tespit.
 * Gerçek ürün görselleri bu isimle konduğunda vitrin doğru sırada görünür.
 */
export async function loadUrun1To12FromPublic(): Promise<CatalogProduct[]> {
  const publicDir = path.join(process.cwd(), "public");
  const products: CatalogProduct[] = [];

  for (let n = 1; n <= 12; n++) {
    let found: string | null = null;
    for (const ext of IMAGE_EXTENSIONS) {
      const base = `urun${n}${ext}`;
      const full = path.join(publicDir, base);
      try {
        await fs.access(full);
        found = base;
        break;
      } catch {
        // try next extension
      }
    }
    if (found) {
      products.push({
        id: `urun-${n}`,
        image: `/${encodeURIComponent(found)}`,
        images: [`/${encodeURIComponent(found)}`],
        name: `Koleksiyon ${n}`,
        category: "CELVO Woman",
      });
    }
  }

  return products;
}

/** DB boş veya erişilemezse: public/urun ve kökteki urun*.jpg dosyaları */
export async function loadCatalogFromPublicFolder(): Promise<CatalogProduct[]> {
  const publicDir = path.join(process.cwd(), "public");
  const productFiles: { file: string; imagePath: string }[] = [];

  try {
    const urunDir = path.join(publicDir, "urun");
    const urunFiles = await fs.readdir(urunDir);
    urunFiles
      .filter((file) =>
        IMAGE_EXTENSIONS.some((ext) => file.toLowerCase().endsWith(ext.toLowerCase())),
      )
      .forEach((file) => {
        productFiles.push({ file, imagePath: `/urun/${encodeURIComponent(file)}` });
      });
  } catch {
    // klasör yok
  }

  if (productFiles.length === 0) {
    try {
      const rootFiles = await fs.readdir(publicDir);
      const urunFiles = rootFiles
        .filter((file) => IMAGE_EXTENSIONS.some((ext) => file.toLowerCase().endsWith(ext.toLowerCase())))
        .filter((file) => /^urun\d+/i.test(file))
        .sort((a, b) => {
          const na = parseInt(/^urun(\d+)/i.exec(a)?.[1] ?? "0", 10);
          const nb = parseInt(/^urun(\d+)/i.exec(b)?.[1] ?? "0", 10);
          return na - nb;
        });
      urunFiles.forEach((file) => {
        productFiles.push({ file, imagePath: `/${encodeURIComponent(file)}` });
      });
    } catch {
      return [];
    }
  }

  return productFiles.map((item, index) => ({
    id: `dosya-${index + 1}`,
    image: item.imagePath,
    images: [item.imagePath],
    name: `Ürün ${index + 1}`,
    category: "Koleksiyon",
  }));
}

/** data/products.json — DB yokken yedek */
export async function loadCatalogFromJsonFile(): Promise<CatalogProduct[]> {
  try {
    const filePath = path.join(process.cwd(), "data", "products.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(raw) as { products?: CatalogProduct[] };
    const list = data?.products;
    if (!Array.isArray(list) || list.length === 0) return [];
    return list.map((p, i) => ({
      id: p.id != null ? p.id : i + 1,
      image: String(p.image ?? ""),
      images: Array.isArray((p as CatalogProduct).images)
        ? (p as CatalogProduct).images?.map((img) => String(img ?? "")).filter(Boolean)
        : [String(p.image ?? "")].filter(Boolean),
      name: String(p.name ?? `Ürün ${i + 1}`),
      category: String(p.category ?? "Tekstil"),
      description: String((p as CatalogProduct).description ?? ""),
    }));
  } catch {
    return [];
  }
}
