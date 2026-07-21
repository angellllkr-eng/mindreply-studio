import { NextResponse } from "next/server";
import { signCommandCookie } from "@/lib/gate";

export async function POST(req: Request) {
  const expected = process.env.COMMAND_ACCESS_TOKEN?.trim();
  const authSecret = process.env.AUTH_SECRET?.trim();

  if (!expected || !authSecret) {
    return NextResponse.json(
      { ok: false, status: "blocked", reason: "command_gate_not_configured" },
      {
        status: 503,
        headers: {
          "Cache-Control": "private, no-store",
          "X-Robots-Tag": "noindex, nofollow",
        },
      },
    );
  }

  let body: { token?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!body.token || body.token !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const signedCookie = await signCommandCookie(expected, authSecret);
  const res = NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" } },
  );
  res.cookies.set("a11k_command_gate", signedCookie, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return res;
}
