import "server-only";
import postgres, { type Sql } from "postgres";

export const databaseConfigured = Boolean(process.env.DATABASE_URL);

const globalDatabase = globalThis as typeof globalThis & {
  campusLyncSql?: Sql;
};

export function getDatabase() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured");
  if (!/^postgres(ql)?:\/\//.test(url))
    throw new Error("DATABASE_URL must be a PostgreSQL connection URL");
  if (!globalDatabase.campusLyncSql)
    globalDatabase.campusLyncSql = postgres(url, {
      max: 5,
      idle_timeout: 20,
      connect_timeout: 10,
      prepare: false,
      onnotice: () => undefined,
      connection: { application_name: "campuslync-web" },
    });
  return globalDatabase.campusLyncSql;
}
