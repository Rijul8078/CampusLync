import "server-only";
import { randomUUID } from "node:crypto";
import type { Enquiry } from "./enquiries";
import { databaseConfigured, getDatabase } from "./database";

export const enquiryStatuses = [
  "new",
  "contacted",
  "in_progress",
  "completed",
  "closed",
] as const;
export type EnquiryStatus = (typeof enquiryStatuses)[number];

export type StoredEnquiry = Enquiry & {
  id: string;
  status: EnquiryStatus;
  createdAt: Date;
  updatedAt: Date;
  notificationStatus: "not_configured" | "pending" | "sent" | "failed";
};

export const rateLimitConfigured =
  (process.env.RATE_LIMIT_SECRET || "").length >= 32;

export async function enquiryStorageReady() {
  if (!databaseConfigured || !rateLimitConfigured) return false;
  try {
    const rows = await getDatabase()<[{ ready: boolean }]>`
      select to_regclass('public.enquiries') is not null
        and to_regclass('public.enquiry_rate_limits') is not null as ready
    `;
    return Boolean(rows[0]?.ready);
  } catch {
    return false;
  }
}

export async function createEnquiry(enquiry: Enquiry) {
  const sql = getDatabase();
  const id = randomUUID();
  const rows = await sql<{ id: string; created_at: Date }[]>`
    insert into enquiries (
      id, name, email, phone, university, country, study_country,
      service, message, contact_method, consent_at, notification_status
    ) values (
      ${id}, ${enquiry.name}, ${enquiry.email}, ${enquiry.phone || null},
      ${enquiry.university || null}, ${enquiry.country}, ${enquiry.studyCountry},
      ${enquiry.service}, ${enquiry.message}, ${enquiry.contactMethod}, now(),
      ${emailNotificationConfigured() ? "pending" : "not_configured"}
    ) returning id, created_at
  `;
  return rows[0];
}

export async function setNotificationStatus(
  id: string,
  status: "sent" | "failed",
) {
  const sql = getDatabase();
  await sql`
    update enquiries
    set notification_status = ${status}, updated_at = now()
    where id = ${id}
  `;
}

export async function listEnquiries(limit = 100): Promise<StoredEnquiry[]> {
  if (!databaseConfigured) return [];
  const sql = getDatabase();
  const rows = await sql`
    select id, name, email, phone, university, country, study_country,
      service, message, contact_method, status, consent_at,
      notification_status, created_at, updated_at
    from enquiries
    order by created_at desc
    limit ${Math.min(Math.max(limit, 1), 250)}
  `;
  return rows.map((row) => ({
    id: String(row.id),
    name: String(row.name),
    email: String(row.email),
    phone: row.phone ? String(row.phone) : "",
    university: row.university ? String(row.university) : "",
    country: String(row.country),
    studyCountry: String(row.study_country),
    service: row.service as Enquiry["service"],
    message: String(row.message),
    contactMethod: row.contact_method as Enquiry["contactMethod"],
    consent: Boolean(row.consent_at),
    status: row.status as EnquiryStatus,
    notificationStatus:
      row.notification_status as StoredEnquiry["notificationStatus"],
    createdAt: new Date(row.created_at as string),
    updatedAt: new Date(row.updated_at as string),
  }));
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  const sql = getDatabase();
  const result = await sql`
    update enquiries set status = ${status}, updated_at = now()
    where id = ${id}
    returning id
  `;
  return result.length === 1;
}

export async function checkRateLimit(key: string) {
  const sql = getDatabase();
  const rows = await sql<{ attempts: number }[]>`
    insert into enquiry_rate_limits (key, window_started_at, attempts)
    values (${key}, now(), 1)
    on conflict (key) do update set
      attempts = case
        when enquiry_rate_limits.window_started_at < now() - interval '15 minutes'
          then 1
        else enquiry_rate_limits.attempts + 1
      end,
      window_started_at = case
        when enquiry_rate_limits.window_started_at < now() - interval '15 minutes'
          then now()
        else enquiry_rate_limits.window_started_at
      end
    returning attempts
  `;
  return Number(rows[0]?.attempts ?? 1) <= 5;
}

export function emailNotificationConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY &&
    process.env.ENQUIRY_NOTIFICATION_TO &&
    process.env.ENQUIRY_FROM_EMAIL,
  );
}
