import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const expected = process.env.COMMAND_ACCESS_TOKEN;
  if (!expected) {
    return NextResponse.json(
      { ok: false, status: "blocked", reason: "COMMAND_ACCESS_TOKEN not configured" },
      { status: 503 },
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

  const res = NextResponse.json({ ok: true });
  res.cookies.set("a11k_command_gate", expected, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}
