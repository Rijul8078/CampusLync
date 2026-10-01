import { NextResponse } from "next/server";
import { adminCookie } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return new Response("Forbidden", { status: 403 });
  const response = NextResponse.redirect(
    new URL("/admin/login", request.url),
    303,
  );
  response.cookies.set(adminCookie.name, "", {
    ...adminCookie.options,
    maxAge: 0,
  });
  return response;
}
