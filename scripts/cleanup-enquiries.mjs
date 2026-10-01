import postgres from "postgres";

const url = process.env.DATABASE_URL;
const days = Number(process.env.DATA_RETENTION_DAYS);
if (!url) throw new Error("DATABASE_URL is required");
if (!Number.isInteger(days) || days < 1 || days > 3650)
  throw new Error("DATA_RETENTION_DAYS must be between 1 and 3650");
const sql = postgres(url, {
  max: 1,
  prepare: false,
  connect_timeout: 10,
  onnotice: false,
  connection: { application_name: "campuslync-retention" },
});
try {
  const removed = await sql`
    delete from enquiries
    where created_at < now() - (${days} * interval '1 day')
    returning id
  `;
  await sql`
    delete from enquiry_rate_limits
    where window_started_at < now() - interval '1 day'
  `;
  console.log(`Removed ${removed.length} expired enquiries.`);
} finally {
  await sql.end();
}
