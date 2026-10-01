import postgres from "postgres";
import { readFile } from "node:fs/promises";
import path from "node:path";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is required");
const sql = postgres(url, {
  max: 1,
  prepare: false,
  connect_timeout: 10,
  onnotice: false,
  connection: { application_name: "campuslync-migration" },
});
try {
  const migration = await readFile(
    path.resolve("database/001_initial.sql"),
    "utf8",
  );
  await sql.unsafe(migration);
  console.log("Applied database/001_initial.sql");
} finally {
  await sql.end();
}
