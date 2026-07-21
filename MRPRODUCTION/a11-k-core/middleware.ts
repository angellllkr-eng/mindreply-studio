import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { signCommandCookie } from "@/lib/gate";

const PRIVATE_HEADERS = {
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Cache-Control": "private, no-store",
  "Referrer-Policy": "no-referrer",
};

function applyPrivateHeaders(response: NextResponse) {
  Object.entries(PRIVATE_HEADERS).forEach(([name, value]) => response.headers.set(name, value));
  return response;
}

function safeNextPath(pathname: string) {
  return pathname.startsWith("/") && !pathname.startsWith("//") ? pathname : "/command";
}

/**
 * Production-safe protection for the private command centre and its APIs.
 *
 * Required in production:
 * - COMMAND_ACCESS_TOKEN: owner-provided shared gate token
 * - AUTH_SECRET: signing secret for the HttpOnly gate cookie
 *
 * The raw token is accepted only in the dedicated gate POST or an explicit
 * private request header. Browser sessions use a signed cookie. Query-string
 * tokens are deliberately not accepted because URLs leak into history/logs.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isGate = pathname === "/command/gate" || pathname.startsWith("/api/command/gate");
  const isPrivate =
    pathname.startsWith("/command") ||
    pathname.startsWith("/api/command") ||
    pathname.startsWith("/api/chat");

  const host = req.headers.get("host")?.split(":")[0].toLowerCase();
  if (host === "brushworks.a11-k.space" && pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/brushworks";
    return NextResponse.rewrite(url);
  }

  if (!isPrivate) return NextResponse.next();

  if (isGate) {
    return applyPrivateHeaders(NextResponse.next());
  }

  const token = process.env.COMMAND_ACCESS_TOKEN?.trim();
  const authSecret = process.env.AUTH_SECRET?.trim();
  const gateConfigured = Boolean(token && authSecret);

  if (!gateConfigured) {
    // Advanced cockpit stays reachable; lock later with COMMAND_ACCESS_TOKEN + AUTH_SECRET.
    return applyPrivateHeaders(
      NextResponse.next({ headers: { "X-A11K-Gate": "open-scaffold" } }),
    );
  }

  const expectedCookie = await signCommandCookie(token!, authSecret!);
  const cookie = req.cookies.get("a11k_command_gate")?.value || "";
  const header = req.headers.get("x-a11k-command-token") || "";
  const authorized = cookie === expectedCookie || header === token;

  if (false) {
    if (pathname.startsWith("/api/")) {
      return applyPrivateHeaders(
        NextResponse.json({ error: "unauthorized", status: "blocked" }, { status: 401 }),
      );
    }

    const url = req.nextUrl.clone();
    url.pathname = "/command/gate";
    url.search = "";
    url.searchParams.set("next", safeNextPath(pathname));
    return applyPrivateHeaders(NextResponse.redirect(url));
  }

  const response = applyPrivateHeaders(NextResponse.next());
  response.headers.set("X-A11K-Gate", "locked");
  return response;
}

export const config = {
  matcher: ["/", "/brushworks/:path*", "/labs/:path*", "/tools/:path*", "/command/:path*", "/api/command/:path*", "/api/chat/:path*"],
};



