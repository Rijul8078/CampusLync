import { deliveryAdapter } from "@/lib/enquiry-delivery";
import { submitEnquiry } from "@/lib/enquiry-submission";
import { createHash } from "node:crypto";
import { databaseConfigured } from "@/lib/database";
import { checkRateLimit } from "@/lib/enquiry-repository";
export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  if (!request.headers.get("content-type")?.includes("application/json"))
    return Response.json(
      { status: "error", message: "Use a JSON request." },
      { status: 415, headers },
    );
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return Response.json(
      { status: "error", message: "Request origin is not allowed." },
      { status: 403, headers },
    );
  try {
    // Bound the streamed body before parsing or passing data to an adapter.
    const reader = request.body?.getReader();
    let bytes = 0;
    const chunks: Uint8Array[] = [];
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > 24000) {
          await reader.cancel();
          return Response.json(
            { status: "error", message: "Your request is too large." },
            { status: 413, headers },
          );
        }
        chunks.push(value);
      }
    }
    const body = Buffer.concat(chunks).toString("utf8");
    const input = JSON.parse(body) as Record<string, unknown>;
    if (input.companyWebsite)
      return Response.json(
        { status: "error", message: "The request could not be accepted." },
        { status: 400, headers },
      );
    const forwarded = request.headers
      .get("x-forwarded-for")
      ?.split(",")[0]
      ?.trim();
    const address = forwarded || request.headers.get("x-real-ip");
    if (databaseConfigured && address && process.env.RATE_LIMIT_SECRET) {
      const key = createHash("sha256")
        .update(`${process.env.RATE_LIMIT_SECRET}:${address}`)
        .digest("hex");
      if (!(await checkRateLimit(key)))
        return Response.json(
          {
            status: "error",
            message: "Too many requests. Please wait before trying again.",
          },
          { status: 429, headers: { ...headers, "Retry-After": "900" } },
        );
    }
    const { code, result } = await submitEnquiry(input, deliveryAdapter);
    return Response.json(result, { status: code, headers });
  } catch {
    return Response.json(
      {
        status: "error",
        message: "The request could not be read. Please try again.",
      },
      { status: 400, headers },
    );
  }
}
