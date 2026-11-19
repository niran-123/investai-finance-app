import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import marketRoutes from "./routes/marketRoutes.js";
import investmentRoutes from "./routes/investmentRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import explanationRoutes from "./routes/explanationRoutes.js";
import brokerRoutes from "./routes/brokerRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import mlRoutes from "./routes/mlRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./config/db.js";
import { initDb } from "./config/initDb.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.resolve(__dirname, "../public");

dotenv.config();

// Initialize tables if not already present
initDb();

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || process.env.FRONTEND_URL)
  ? (process.env.CLIENT_URL || process.env.FRONTEND_URL).split(",").map((s) => s.trim())
  : [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:4173",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:3000",
    ];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes("*") ||
        allowedOrigins.includes(origin) ||
        process.env.NODE_ENV !== "production"
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/recommendations/explain", explanationRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/brokers", brokerRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/ml", mlRoutes);
app.use("/api/market/ml-prediction", mlRoutes);

// Serve static frontend files if built into public directory
if (fs.existsSync(publicPath) && fs.existsSync(path.join(publicPath, "index.html"))) {
  app.use(express.static(publicPath));
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      return res.sendFile(path.join(publicPath, "index.html"));
    }
    next();
  });
} else {
  app.get("/", (req, res) => {
    res.json({
      success: true,
      message: "InvestAI backend is running",
    });
  });
}

// Database test
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      message: "Database connection successful",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`InvestAI backend running on port ${PORT}`);
});