import { MySqlDataSource } from "./data-source";

/** initialize database only when it is not initialized */
export async function initializeDatabase() {
  if (MySqlDataSource.isInitialized) {
    console.log("Database connection already initialized");
    return MySqlDataSource;
  }

  try {
    await MySqlDataSource.initialize();
    return MySqlDataSource;
  } catch (error) {
    throw error;
  }
}
