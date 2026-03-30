import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { type, data } = await request.json();

    if (!type || !data) {
      return NextResponse.json(
        { error: "Type and data are required" },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();

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

      // Update core values
      for (let i = 0; i < data.values.length; i++) {
        await connection.query(
          `UPDATE core_values SET icon = ?, title = ?, description = ? WHERE sort_order = ?`,
          [data.values[i].icon, data.values[i].title, data.values[i].description, i + 1]
        );
      }
    } else if (type === "products") {
      // Delete all products first
      await connection.query("DELETE FROM products");
      
      // Insert new products
      for (let i = 0; i < data.products.length; i++) {
        await connection.query(
          `INSERT INTO products (image_path, name, category, sort_order, is_active) VALUES (?, ?, ?, ?, 1)`,
          [data.products[i].image, data.products[i].name, data.products[i].category, i + 1]
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

    connection.release();
    return NextResponse.json({ success: true, message: "Content updated" });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Kaydetme hatası: " + (error as Error).message },
      { status: 500 }
    );
  }
}
