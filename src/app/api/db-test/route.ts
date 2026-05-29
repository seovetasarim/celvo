import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export const dynamic = "force-dynamic";

export async function GET() {
  const host = process.env.DB_HOST || "";
  const port = parseInt(process.env.DB_PORT || "3306", 10);
  const database = process.env.DB_NAME || "";
  const useSsl = process.env.DB_SSL === "true" || process.env.DB_SSL === "1";

  const env = {
    DB_HOST_set: Boolean(process.env.DB_HOST),
    DB_USER_set: Boolean(process.env.DB_USER),
    DB_PASSWORD_set: Boolean(process.env.DB_PASSWORD),
    DB_NAME_set: Boolean(process.env.DB_NAME),
    DB_PORT: port,
    DB_SSL: process.env.DB_SSL ?? "(unset)",
    host_preview: host ? `${host.slice(0, 3)}***${host.slice(-6)}` : "(unset)",
    database,
    on_vercel: process.env.VERCEL === "1",
  };

  const start = Date.now();
  let connection: mysql.Connection | null = null;
  try {
    connection = await mysql.createConnection({
      host,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database,
      port,
      connectTimeout: 15_000,
      ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
    });
    const [rows] = await connection.query("SELECT 1 AS ok");
    await connection.end();
    return NextResponse.json({
      success: true,
      ms: Date.now() - start,
      result: rows,
      env,
    });
  } catch (error) {
    if (connection) {
      try {
        await connection.end();
      } catch {
        // ignore
      }
    }
    const e = error as { code?: string; errno?: number; message?: string };
    return NextResponse.json(
      {
        success: false,
        ms: Date.now() - start,
        error: {
          code: e.code,
          errno: e.errno,
          message: e.message,
        },
        env,
      },
      { status: 500 }
    );
  }
}
