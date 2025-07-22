import dotenv from "dotenv";
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";

const PORT = process.env.PORT || "8321";

const MONGO_URI = process.env.MONGO_URI as string;
const MONGO_HOST = process.env.MONGO_HOST as string;
const MONGO_PORT = process.env.MONGO_PORT || "27017";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "code-challenges-5";

export const keys = {
  NODE_ENV,
  PORT: parseInt(PORT, 10),
  MONGO_URI,
  MONGO_HOST,
  MONGO_PORT: parseInt(MONGO_PORT, 10),
  MONGO_DB_NAME,
};
