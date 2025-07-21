import { DataSource } from "typeorm";
import { keys } from "./const";
import { User } from "../app/modules/user/user.model";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: keys.DB_HOST,
  port: keys.DB_PORT,
  username: keys.DB_USERNAME,
  password: keys.DB_PASSWORD,
  database: keys.DB_DATABASE,
  synchronize: keys.NODE_ENV === "development",
  logging: keys.NODE_ENV === "development",
  entities: [User],
  migrations: ["src/migrations/*.ts"],
  subscribers: ["src/subscribers/*.ts"],
});
