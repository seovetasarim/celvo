import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT 1+1 AS result");
    connection.release();
    return NextResponse.json({
      ok: true,
      message: "DB bağlantısı başarılı",
      test: rows,
      env: {
        host: process.env.DB_HOST ? process.env.DB_HOST.slice(0, 6) + "***" : "YOK",
        user: process.env.DB_USER ? process.env.DB_USER.slice(0, 3) + "***" : "YOK",
        database: process.env.DB_NAME || "YOK",
        port: process.env.DB_PORT || "3306",
        ssl: process.env.DB_SSL || "not set",
        vercel: process.env.VERCEL || "0",
      },
    });
  } catch (err) {
    const error = err as Error & { code?: string; errno?: number };
    return NextResponse.json(
      {
        ok: false,
        message: "DB bağlantısı BAŞARISIZ",
        error: error.message,
        code: error.code,
        errno: error.errno,
        env: {
          host: process.env.DB_HOST ? process.env.DB_HOST.slice(0, 6) + "***" : "YOK",
          user: process.env.DB_USER ? process.env.DB_USER.slice(0, 3) + "***" : "YOK",
          database: process.env.DB_NAME || "YOK",
          port: process.env.DB_PORT || "3306",
          ssl: process.env.DB_SSL || "not set",
          vercel: process.env.VERCEL || "0",
        },
      },
      { status: 500 }
    );
  }
}
