import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";

async function saveProductsToJson(products: any[]) {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const normalized = products.map((p, index) => ({
    id: p.id ?? index + 1,
    image: String(p.image ?? ""),
    images: Array.isArray(p.images)
      ? p.images.map((img: unknown) => String(img ?? "")).filter(Boolean)
      : [String(p.image ?? "")].filter(Boolean),
    name: String(p.name ?? `Ürün ${index + 1}`),
    category: String(p.category ?? "Tekstil"),
    description: String(p.description ?? ""),
  }));
  await fs.writeFile(filePath, JSON.stringify({ products: normalized }, null, 2), "utf-8");
}

async function saveHeroToJson(hero: any) {
  const filePath = path.join(process.cwd(), "data", "hero.json");
  const normalized = {
    badge: String(hero?.badge ?? "CELVO Woman"),
    title: String(hero?.title ?? "Sessizliğin Gücü, Tasarımın Zarafeti."),
    description: String(hero?.description ?? ""),
    trustIndicators: {
      customers: String(hero?.trustIndicators?.customers ?? ""),
      customersLabel: String(hero?.trustIndicators?.customersLabel ?? ""),
      quality: String(hero?.trustIndicators?.quality ?? ""),
      qualityLabel: String(hero?.trustIndicators?.qualityLabel ?? ""),
    },
  };
  await fs.writeFile(filePath, JSON.stringify(normalized, null, 2), "utf-8");
}

export async function POST(request: Request) {
  let type = "";
  let data: any = null;
  try {
    const payload = await request.json();
    type = payload?.type;
    data = payload?.data;

    if (!type || !data) {
      return NextResponse.json(
        { error: "Type and data are required" },
        { status: 400 }
      );
    }

    if (type === "products") {
      try {
        const connection = await pool.getConnection();
        try {
          const products = Array.isArray(data.products) ? data.products : [];

          // Large base64 payloads cause HTTP 413 in production. For admin edits we
          // update only textual product metadata and keep images as-is.
          for (let i = 0; i < products.length; i++) {
            const product = products[i] ?? {};
            const id = Number(product.id);
            const sortOrder = Number(product.sortOrder ?? i + 1);

            if (!Number.isFinite(id)) continue;

            await connection.query(
              `UPDATE products
               SET name = ?, category = ?, description = ?, sort_order = ?
               WHERE id = ?`,
              [
                String(product.name ?? `Ürün ${i + 1}`),
                String(product.category ?? "Tekstil"),
                String(product.description ?? ""),
                Number.isFinite(sortOrder) ? sortOrder : i + 1,
                id,
              ]
            );
          }

          return NextResponse.json({ success: true, message: "Ürünler veritabanına kaydedildi" });
        } finally {
          connection.release();
        }
      } catch (dbError) {
        const dbMessage =
          dbError instanceof Error ? dbError.message : "Unknown database error";
        console.error("Products DB save failed, using JSON fallback:", dbError);

        if (process.env.VERCEL === "1") {
          return NextResponse.json(
            {
              error:
                "Canli ortamda veritabanina baglanilamadigi icin kayit yapilamadi. Vercel DB_ degiskenleri, DB_SSL ve MySQL Remote Access izinlerini kontrol edin. Teknik detay: " +
                dbMessage,
            },
            { status: 500 }
          );
        }

        await saveProductsToJson(Array.isArray(data.products) ? data.products : []);
        return NextResponse.json({
          success: true,
          message: "Ürünler yerel dosyaya kaydedildi (DB bağlantısı yok)",
        });
      }
    }

    const connection = await pool.getConnection();
    try {
      if (type === "hero") {
        await connection.query(
          `UPDATE hero_content SET 
            badge = ?, 
            title = ?, 
            description = ?,
            trust_customers = ?,
            trust_customers_label = ?,
            trust_quality = ?,
            trust_quality_label = ?
          WHERE id = 1`,
          [
            data.badge,
            data.title,
            data.description,
            data.trustIndicators.customers,
            data.trustIndicators.customersLabel,
            data.trustIndicators.quality,
            data.trustIndicators.qualityLabel,
          ]
        );
      } else if (type === "about") {
        await connection.query(
          `UPDATE about_content SET
            title = ?,
            slogan = ?,
            brand_name = ?,
            origin_title = ?,
            origin_content = ?,
            philosophy_title = ?,
            philosophy_paragraph1 = ?,
            philosophy_paragraph2 = ?,
            target_title = ?,
            target_content = ?,
            target_subtitle = ?
          WHERE id = 1`,
          [
            data.title,
            data.slogan,
            data.brandName,
            data.origin.title,
            data.origin.content,
            data.philosophy.title,
            data.philosophy.paragraphs[0],
            data.philosophy.paragraphs[1],
            data.target.title,
            data.target.content,
            data.target.subtitle,
          ]
        );

        for (let i = 0; i < data.values.length; i++) {
          await connection.query(
            `UPDATE core_values SET icon = ?, title = ?, description = ? WHERE sort_order = ?`,
            [data.values[i].icon, data.values[i].title, data.values[i].description, i + 1]
          );
        }
      } else if (type === "contact") {
        await connection.query(
          `UPDATE contact_info SET
            owner_name = ?,
            phone_display = ?,
            phone_link = ?,
            email = ?,
            address = ?,
            page_title = ?,
            page_subtitle = ?,
            form_title = ?,
            form_subtitle = ?
          WHERE id = 1`,
          [
            data.owner,
            data.phone,
            data.phoneLink,
            data.email,
            data.address,
            data.title,
            data.subtitle,
            data.formTitle,
            data.formSubtitle,
          ]
        );
      } else if (type === "settings") {
        await connection.query(
          `UPDATE site_settings SET site_name = ?, tagline = ?, slogan = ?, description = ? WHERE id = 1`,
          [data.site.name, data.site.tagline, data.site.slogan, data.site.description]
        );

        if (data.admin?.password) {
          await connection.query(
            `UPDATE admin_users SET password_hash = ? WHERE username = 'admin'`,
            [data.admin.password]
          );
        }
      }
    } finally {
      connection.release();
    }
    return NextResponse.json({ success: true, message: "Content updated" });
  } catch (error) {
    if (type === "hero" && data) {
      try {
        await saveHeroToJson(data);
        return NextResponse.json({
          success: true,
          message: "Ana sayfa içeriği yerel dosyaya kaydedildi (DB bağlantısı yok)",
        });
      } catch (jsonError) {
        console.error("Hero JSON save fallback failed:", jsonError);
      }
    }

    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Kaydetme hatası: " + (error as Error).message },
      { status: 500 }
    );
  }
}
