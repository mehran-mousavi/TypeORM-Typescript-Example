import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";


export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: process.env.DB_SYNCHRONIZE === 'true' || process.env.NODE_ENV !== 'production',
  logging: true,
  entities: [User],
  migrations: ["src/migrations/*.ts"],
});
