import mysql from "mysql2/promise";

const port = parseInt(process.env.DB_PORT || "3306", 10);
const isVercel = process.env.VERCEL === "1";
const host = process.env.DB_HOST || "localhost";

const useSsl =
  process.env.DB_SSL === "true" || process.env.DB_SSL === "1";

if (isVercel) {
  const missing = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"].filter(
    (key) => !process.env[key],
  );
  if (missing.length > 0) {
    console.error("[db] Vercel ortamında eksik:", missing.join(", "));
  }
  if (port === 2083 || port === 2082) {
    console.warn(
      "[db] DB_PORT=" +
        port +
        " — bu genelde cPanel HTTPS portudur, MySQL için 3306 kullanın.",
    );
  }
}

const pool = mysql.createPool({
  host,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port,
  waitForConnections: true,
  connectionLimit: isVercel ? 1 : 10,
  queueLimit: 0,
  enableKeepAlive: !isVercel,
  keepAliveInitialDelay: 0,
  connectTimeout: 20_000,
  ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
});

export default pool;
