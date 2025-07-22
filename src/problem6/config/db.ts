import { DataSource } from "typeorm";
import { keys } from "./const";

const dbConnection = {
  type: "mysql" as const,
  host: keys.DB_HOST,
  port: Number(keys.DB_PORT),
  username: keys.DB_USERNAME,
  password: keys.DB_PASSWORD,
  database: keys.DB_DATABASE,
  entities: [__dirname + "/../app/modules/**/*.model{.ts,.js}"],
  migrations: [__dirname + "/../migrations/**/*{.ts,.js}"],

  synchronize: false,
  logging: keys.NODE_ENV === "development" ? true : false,
};

export const AppDataSource = new DataSource(dbConnection);
