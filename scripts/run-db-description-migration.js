const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

function readEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  const raw = fs.readFileSync(envPath, "utf8");
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    env[key] = value;
  }
  return env;
}

async function run() {
  const env = readEnvLocal();
  const sqlPath = path.join(process.cwd(), "scripts", "add-product-description-column.sql");
  const sql = fs.readFileSync(sqlPath, "utf8");

  const conn = await mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    port: Number(env.DB_PORT || 3306),
    multipleStatements: true,
  });

  try {
    await conn.query(sql);
    const [rows] = await conn.query(
      "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'products' AND COLUMN_NAME = 'description'",
      [env.DB_NAME],
    );
    console.log("description_column_exists=", Array.isArray(rows) && rows.length > 0);
  } finally {
    await conn.end();
  }
}

run().catch((err) => {
  console.error("DB_MIGRATION_ERROR:", err.message);
  process.exit(1);
});
