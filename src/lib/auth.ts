import crypto from "node:crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const adminCookieName = "vatsal_admin_session";

function getSecret() {
  return process.env.SESSION_SECRET ?? "";
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function createAdminSessionToken() {
  return crypto.createHmac("sha256", getSecret()).update(`admin:${getAdminPassword()}`).digest("hex");
}

export function isValidAdminToken(token?: string) {
  if (!token) {
    return false;
  }

  const expected = createAdminSessionToken();
  const tokenBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expected);

  return tokenBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(tokenBuffer, expectedBuffer);
}

export async function isAdminSession() {
  const cookieStore = await cookies();
  return isValidAdminToken(cookieStore.get(adminCookieName)?.value);
}

export function isAdminRequest(request: NextRequest) {
  return isValidAdminToken(request.cookies.get(adminCookieName)?.value);
}

export function isCorrectAdminPassword(password: string) {
  return password === getAdminPassword();
}
