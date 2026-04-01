import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { fetchActiveProducts } from "@/lib/productsQuery";
import {
  loadCatalogFromJsonFile,
  loadCatalogFromPublicFolder,
  loadUrun1To12FromPublic,
} from "@/lib/catalogFallback";
import { promises as fs } from "fs";
import path from "path";

// Fallback to JSON files when database is not available
async function getFromJsonFile(type: string) {
  try {
    const filePath = path.join(process.cwd(), "data", `${type}.json`);
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  if (!type) {
    return NextResponse.json({ error: "Type is required" }, { status: 400 });
  }

  if (type === "products") {
    let products: Awaited<ReturnType<typeof fetchActiveProducts>> = [];
    try {
      products = await fetchActiveProducts();
    } catch (error) {
      console.error("DB Error (products):", error);
    }

    if (products.length === 0) {
      products = await loadCatalogFromJsonFile();
    }
    if (products.length === 0) {
      products = await loadUrun1To12FromPublic();
    }
    if (products.length === 0) {
      products = await loadCatalogFromPublicFolder();
    }

    return NextResponse.json({ products });
  }

  try {
    const connection = await pool.getConnection();

    let data: any = {};

    if (type === "hero") {
      const [rows] = await connection.query("SELECT * FROM hero_content LIMIT 1");
      const hero: any = (rows as any[])[0];
      if (!hero) {
        connection.release();
        const jsonData = await getFromJsonFile("hero");
        return NextResponse.json(jsonData || {});
      }
      data = {
        badge: hero.badge,
        title: hero.title,
        description: hero.description,
        trustIndicators: {
          customers: hero.trust_customers,
          customersLabel: hero.trust_customers_label,
          quality: hero.trust_quality,
          qualityLabel: hero.trust_quality_label,
        },
      };
    } else if (type === "about") {
      const [aboutRows] = await connection.query("SELECT * FROM about_content LIMIT 1");
      const about: any = (aboutRows as any[])[0];
      if (!about) {
        connection.release();
        const jsonData = await getFromJsonFile("about");
        return NextResponse.json(jsonData || {});
      }
      const [valuesRows] = await connection.query("SELECT * FROM core_values ORDER BY sort_order");
      
      data = {
        title: about.title,
        slogan: about.slogan,
        brandName: about.brand_name,
        origin: {
          title: about.origin_title,
          content: about.origin_content,
        },
        philosophy: {
          title: about.philosophy_title,
          paragraphs: [about.philosophy_paragraph1, about.philosophy_paragraph2],
        },
        target: {
          title: about.target_title,
          content: about.target_content,
          subtitle: about.target_subtitle,
        },
        values: (valuesRows as any[]).map((v) => ({
          icon: v.icon,
          title: v.title,
          description: v.description,
        })),
      };
    } else if (type === "contact") {
      const [rows] = await connection.query("SELECT * FROM contact_info LIMIT 1");
      const contact: any = (rows as any[])[0];
      if (!contact) {
        connection.release();
        const jsonData = await getFromJsonFile("contact");
        return NextResponse.json(jsonData || {});
      }
      data = {
        title: contact.page_title,
        subtitle: contact.page_subtitle,
        owner: contact.owner_name,
        phone: contact.phone_display,
        phoneLink: contact.phone_link,
        email: contact.email,
        address: contact.address,
        formTitle: contact.form_title,
        formSubtitle: contact.form_subtitle,
      };
    } else if (type === "settings") {
      const [siteRows] = await connection.query("SELECT * FROM site_settings LIMIT 1");
      const [adminRows] = await connection.query("SELECT * FROM admin_users WHERE username = 'admin' LIMIT 1");
      const site: any = (siteRows as any[])[0];
      const admin: any = (adminRows as any[])[0];
      if (!site) {
        connection.release();
        const jsonData = await getFromJsonFile("settings");
        return NextResponse.json(jsonData || {});
      }
      
      data = {
        site: {
          name: site.site_name,
          tagline: site.tagline,
          slogan: site.slogan,
          description: site.description,
        },
        admin: {
          username: admin?.username,
          password: admin?.password_hash,
        },
      };
    }

    connection.release();
    return NextResponse.json(data);
  } catch (error) {
    console.error("DB Error, falling back to JSON files:", error);
    // Fallback to JSON files
    const jsonData = await getFromJsonFile(type);
    if (jsonData) {
      return NextResponse.json(jsonData);
    }
    return NextResponse.json(
      { error: "Failed to read content" },
      { status: 500 }
    );
  }
}

