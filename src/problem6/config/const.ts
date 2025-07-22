import dotenv from "dotenv";
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "MY_SECRET_KEY";

// Database Configuration
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = parseInt(process.env.DB_PORT || "3306");
const DB_USERNAME = process.env.DB_USERNAME || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "your_mysql_password";
const DB_DATABASE = process.env.DB_DATABASE || "leaderboard";

// Redis Configuration (for future caching)
const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = parseInt(process.env.REDIS_PORT || "6379");
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || undefined;

export const keys = {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
};
