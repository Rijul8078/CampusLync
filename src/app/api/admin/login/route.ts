import { NextResponse } from "next/server";
import {
  adminAuthConfigured,
  adminCookie,
  createAdminSession,
  credentialsAreValid,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const login = new URL("/admin/login", request.url);
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return new Response("Forbidden", { status: 403 });
  if (!adminAuthConfigured) {
    login.searchParams.set("error", "unconfigured");
    return NextResponse.redirect(login, 303);
  }
  if (Number(request.headers.get("content-length") || 0) > 4096)
    return new Response("Request too large", { status: 413 });
  const data = await request.formData();
  const username = String(data.get("username") || "").slice(0, 200);
  const password = String(data.get("password") || "").slice(0, 500);
  if (!credentialsAreValid(username, password)) {
    login.searchParams.set("error", "invalid");
    return NextResponse.redirect(login, 303);
  }
  const session = createAdminSession();
  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set(adminCookie.name, session.value, {
    ...adminCookie.options,
    maxAge: session.maxAge,
  });
  return response;
}
