import { databaseConfigured } from "@/lib/database";
import { enquiryStorageReady } from "@/lib/enquiry-repository";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!databaseConfigured)
    return Response.json(
      { status: "not_ready", database: "not_configured" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  try {
    if (!(await enquiryStorageReady())) throw new Error("Storage not ready");
    return Response.json(
      { status: "ok", database: "connected" },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { status: "not_ready", database: "unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
