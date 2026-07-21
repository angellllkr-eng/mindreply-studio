/** Detect env presence only. Never return secret values. */
export function hasEnv(name: string): boolean {
  const v = process.env[name];
  return typeof v === "string" && v.trim().length > 0;
}

export function missingEnv(names: string[]): string[] {
  return names.filter((n) => !hasEnv(n));
}

export function providerConfigured(envs: string[]): boolean {
  return envs.every((n) => hasEnv(n));
}

/** Stealth gate: command is locked unless token/auth is configured. */
export function commandGateConfigured(): boolean {
  return hasEnv("COMMAND_ACCESS_TOKEN") || (hasEnv("AUTH_SECRET") && hasEnv("AUTH_GITHUB_ID"));
}

export function commandTokenValid(token: string | null | undefined): boolean {
  if (!token) return false;
  const expected = process.env.COMMAND_ACCESS_TOKEN;
  if (!expected) return false;
  return token === expected;
}
