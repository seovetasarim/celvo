import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const urunDir = path.join(publicDir, "urun");
    const productFiles: { file: string; imagePath: string }[] = [];

    try {
      const urunFiles = await fs.readdir(urunDir);
      urunFiles
        .filter((file) => IMAGE_EXTENSIONS.some((ext) => file.toLowerCase().endsWith(ext)))
        .forEach((file) => {
          productFiles.push({ file, imagePath: `/urun/${encodeURIComponent(file)}` });
        });
    } catch {
      // public/urun may not exist yet.
    }

    if (productFiles.length === 0) {
      const rootFiles = await fs.readdir(publicDir);
      rootFiles
        .filter((file) => IMAGE_EXTENSIONS.some((ext) => file.toLowerCase().endsWith(ext)))
        .filter((file) => /^urun\d+/i.test(file))
        .forEach((file) => {
          productFiles.push({ file, imagePath: `/${encodeURIComponent(file)}` });
        });
    }

    const products = productFiles.map((item, index) => ({
      id: `urun-${index + 1}`,
      image: item.imagePath,
      name: `Ürün ${index + 1}`,
      category: "Yeni Koleksiyon",
    }));

    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ products: [] });
  }
}
