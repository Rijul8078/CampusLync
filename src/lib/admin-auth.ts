import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "campuslync_admin";
const SESSION_SECONDS = 8 * 60 * 60;

export const adminAuthConfigured = Boolean(
  process.env.ADMIN_USERNAME &&
  process.env.ADMIN_PASSWORD &&
  process.env.ADMIN_SESSION_SECRET &&
  process.env.ADMIN_SESSION_SECRET.length >= 32,
);

function sameValue(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function signature(expires: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return "";
  return createHmac("sha256", secret)
    .update(`campuslync-admin:${expires}`)
    .digest("base64url");
}

export function credentialsAreValid(username: string, password: string) {
  if (!adminAuthConfigured) return false;
  return (
    sameValue(username, process.env.ADMIN_USERNAME ?? "") &&
    sameValue(password, process.env.ADMIN_PASSWORD ?? "")
  );
}

export function createAdminSession() {
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  return {
    value: `${expires}.${signature(expires)}`,
    maxAge: SESSION_SECONDS,
  };
}

export async function hasAdminSession() {
  if (!adminAuthConfigured) return false;
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return false;
  const [expires, suppliedSignature, extra] = value.split(".");
  if (extra || !expires || !suppliedSignature) return false;
  if (!/^\d+$/.test(expires) || Number(expires) <= Date.now() / 1000)
    return false;
  return sameValue(suppliedSignature, signature(expires));
}

export const adminCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    priority: "high" as const,
  },
};
