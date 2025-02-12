import { DataSource } from "typeorm";
import { BusinessPlanInfo } from "./entity";

export const MySqlDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: parseInt(process.env.DATABASE_PORT || "3306"),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: true,
  synchronize: process.env.NODE_ENV === "development",
  entities: [BusinessPlanInfo],
  subscribers: [],
  migrations: [],
});
