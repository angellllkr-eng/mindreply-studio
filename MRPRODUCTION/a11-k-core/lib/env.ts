/** Detect env presence only. Never return secret values. */
export function hasEnv(name: string): boolean {
  const v = process.env[name];
  return typeof v === "string" && v.trim().length > 0;
}

export function missingEnv(names: string[]): string[] {
  return names.filter((n) => !hasEnv(n));
}

/** True if ANY listed env is present (multi-key providers like GitHub). */
export function providerConfigured(envs: string[]): boolean {
  return envs.some((n) => hasEnv(n));
}

/** Production command access is ready only when both gate inputs exist. */
export function commandGateConfigured(): boolean {
  return hasEnv("COMMAND_ACCESS_TOKEN") && hasEnv("AUTH_SECRET");
}

export function commandTokenValid(token: string | null | undefined): boolean {
  if (!token) return false;
  const expected = process.env.COMMAND_ACCESS_TOKEN;
  if (!expected) return false;
  return token === expected;
}
