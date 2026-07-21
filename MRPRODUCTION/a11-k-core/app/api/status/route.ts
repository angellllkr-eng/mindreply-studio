import { NextResponse } from "next/server";
import { commandGateConfigured, hasEnv } from "@/lib/env";
import { getProviders } from "@/lib/models";

export const dynamic = "force-dynamic";

export async function GET() {
  const providers = getProviders();
  return NextResponse.json({
    status: "ok",
    activeProviders: providers.filter(p => p.configured).map(p => p.id),
    command: {
      authConfigured: commandGateConfigured(),
      persistence: hasEnv("DATABASE_URL")
    }
  }, {
    headers: { "Cache-Control": "private, no-store" }
  });
}