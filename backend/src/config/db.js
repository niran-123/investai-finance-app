import pg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config();

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === "production";
const isCloudDb =
  process.env.DATABASE_URL &&
  (process.env.DATABASE_URL.includes("rds.amazonaws.com") ||
    process.env.DATABASE_URL.includes("sslmode=require") ||
    process.env.DATABASE_URL.includes("neon.tech") ||
    process.env.DATABASE_URL.includes("supabase"));

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: isProduction || isCloudDb ? { rejectUnauthorized: false } : undefined,
    }
  : {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      database: process.env.DB_NAME || "finance_app",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "",
      ssl: isProduction ? { rejectUnauthorized: false } : undefined,
    };

const pool = new Pool(poolConfig);

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL error:", error);
});

export default pool;