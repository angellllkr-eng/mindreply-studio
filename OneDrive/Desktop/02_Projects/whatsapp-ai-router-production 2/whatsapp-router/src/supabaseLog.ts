import type { ParsedMessage, ProviderResult } from "./types.js";

// Writes into the EXISTING proof_receipts table in your MindR Supabase
// project (public schema, RLS enabled) rather than inventing a parallel
// table - this is your product's actual "source transparency" record.
// Requires the service_role key (RLS is on; anon key would be rejected
// unless you add an insert policy for it - service_role is the right
// choice for a trusted backend writer).
export async function logToSupabase(
  fetchFn: typeof fetch,
  supabaseUrl: string,
  serviceRoleKey: string,
  msg: ParsedMessage,
  result: ProviderResult,
): Promise<void> {
  const res = await fetchFn(`${supabaseUrl}/rest/v1/proof_receipts`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "content-type": "application/json",
      prefer: "return=minimal",
    },
    body: JSON.stringify({
      source: result.label,
      route: `whatsapp:${msg.waId}`,
      action_kind: "whatsapp_ai_reply",
      safe_summary: result.replyText.slice(0, 280),
      raw_content_redacted: true,
    }),
  });
  if (!res.ok) {
    throw new Error(`Supabase proof_receipts insert failed: ${res.status} ${await res.text().catch(() => "")}`);
  }
}
