import { DataSource } from "typeorm";
import { BusinessPlanInfo } from "./entity";

export const MySqlDataSource = new DataSource({
  type: process.env.DATASOURCE_TYPE as "mysql",
  host: process.env.DATASOURCE_HOST,
  port: parseInt(process.env.DATASOURCE_PORT || "3306"),
  username: process.env.DATASOURCE_USERNAME,
  password: process.env.DATASOURCE_PASSWORD,
  database: process.env.DATASOURCE_DATABASE_NAME,
  logging: true,
  synchronize: process.env.NODE_ENV === "development",
  entities: [BusinessPlanInfo],
  subscribers: [],
  migrations: [],
});
