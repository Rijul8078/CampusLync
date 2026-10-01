"use server";

import { revalidatePath } from "next/cache";
import { hasAdminSession } from "@/lib/admin-auth";
import { databaseConfigured } from "@/lib/database";
import {
  enquiryStatuses,
  updateEnquiryStatus,
  type EnquiryStatus,
} from "@/lib/enquiry-repository";

export async function updateEnquiryStatusAction(formData: FormData) {
  if (!(await hasAdminSession())) throw new Error("Unauthorised");
  if (!databaseConfigured) throw new Error("Database is not configured");
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "") as EnquiryStatus;
  if (!/^[0-9a-f-]{36}$/i.test(id) || !enquiryStatuses.includes(status))
    throw new Error("Invalid enquiry update");
  await updateEnquiryStatus(id, status);
  revalidatePath("/admin");
}
