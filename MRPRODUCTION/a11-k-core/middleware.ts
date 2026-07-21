import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Stealth protection for private command surfaces.
 * - Always noindex private paths
 * - If COMMAND_ACCESS_TOKEN is set, require cookie/header match
 * - If no gate env is configured, allow local scaffold but stamp X-A11K-Gate: open-scaffold
 *   (document as blocked for production until auth env present)
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isGate = pathname === "/command/gate" || pathname.startsWith("/api/command/gate");
  const isPrivate =
    pathname.startsWith("/command") ||
    pathname.startsWith("/api/command") ||
    pathname.startsWith("/api/chat");

  if (!isPrivate) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  res.headers.set("Cache-Control", "private, no-store");
  res.headers.set("Referrer-Policy", "no-referrer");

  // Gate page + gate API must remain reachable when locked.
  if (isGate) {
    res.headers.set("X-A11K-Gate", "gate-surface");
    return res;
  }

  const token = process.env.COMMAND_ACCESS_TOKEN;
  if (!token || token.length === 0) {
    // Production-safe default: never expose /command or private APIs without an access gate.
    const isProd = process.env.NODE_ENV === "production";
    if (isProd) {
      if (pathname.startsWith("/api/")) {
        return new NextResponse(JSON.stringify({ error: "blocked", status: "no-command-access-configured" }), {
          status: 503,
          headers: {
            "content-type": "application/json",
            "X-Robots-Tag": "noindex, nofollow",
          },
        });
      }
      return new NextResponse("Forbidden", {
        status: 403,
        headers: {
          "X-Robots-Tag": "noindex, nofollow",
          "Cache-Control": "no-store",
        },
      });
    }

    // Non-production (local/dev): allow scaffold but still noindex.
    res.headers.set("X-A11K-Gate", "open-scaffold");
    return res;
  }

  const cookie = req.cookies.get("a11k_command_gate")?.value;
  const header = req.headers.get("x-a11k-command-token");
  const q = req.nextUrl.searchParams.get("gate");
  const provided = cookie || header || q || "";

  if (provided !== token) {
    if (pathname.startsWith("/api/")) {
      return new NextResponse(JSON.stringify({ error: "unauthorized", status: "blocked" }), {
        status: 401,
        headers: {
          "content-type": "application/json",
          "X-Robots-Tag": "noindex, nofollow",
        },
      });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/command/gate";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  res.headers.set("X-A11K-Gate", "locked");
  return res;
}

export const config = {
  matcher: ["/command/:path*", "/api/command/:path*", "/api/chat/:path*"],
};
