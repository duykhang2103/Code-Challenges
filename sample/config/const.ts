import dotenv from "dotenv";
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";

const PORT = process.env.PORT || "8321";

const MONGO_URI = process.env.MONGO_URI as string;
const MONGO_HOST = process.env.MONGO_HOST as string;
const MONGO_PORT = process.env.MONGO_PORT || "27017";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "url-shortener";

const SALT_ROUNDS = process.env.SALT_ROUNDS as string;

const REDIS_PORT = process.env.REDIS_PORT || "6379";
const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_USERNAME = process.env.REDIS_USERNAME || undefined;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || undefined;

const RABBITMQ_HOST = process.env.RABBITMQ_HOST || "localhost";
const RABBITMQ_PORT = process.env.RABBITMQ_PORT || "5672";
const RABBITMQ_USERNAME = process.env.RABBITMQ_USERNAME || undefined;
const RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD || undefined;

export const keys = {
  NODE_ENV,
  PORT: parseInt(PORT, 10),
  MONGO_URI,
  MONGO_HOST,
  MONGO_PORT: parseInt(MONGO_PORT, 10),
  MONGO_DB_NAME,
  SALT_ROUNDS,
  REDIS_PORT: parseInt(REDIS_PORT, 10),
  REDIS_HOST,
  REDIS_USERNAME: REDIS_USERNAME || undefined,
  REDIS_PASSWORD: REDIS_PASSWORD || undefined,
  RABBITMQ_HOST,
  RABBITMQ_PORT: parseInt(RABBITMQ_PORT, 10),
  RABBITMQ_USERNAME: RABBITMQ_USERNAME || undefined,
  RABBITMQ_PASSWORD: RABBITMQ_PASSWORD || undefined,
};
