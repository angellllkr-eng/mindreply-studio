import type { ActionItem, LiveProofData, ShadowTwin } from "./types";
import { n8nBlockedBy } from "./workflows";

export const SHADOW_TWINS: ShadowTwin[] = [
  {
    id: "brand_twin",
    name: "BrandTwin",
    purpose: "Mirror brand fleet status without customer PII",
    status: "placeholder",
    lastSync: "never",
  },
  {
    id: "site_twin",
    name: "SiteTwin",
    purpose: "Mirror public URL health only",
    status: "placeholder",
    lastSync: "never",
  },
  {
    id: "workflow_twin",
    name: "Workflow Status",
    purpose: "Mirror workflow automation map state (paths, not secrets)",
    status: "placeholder",
    lastSync: "never",
  },
  {
    id: "model_twin",
    name: "AI Model Status",
    purpose: "Mirror provider configured yes/no",
    status: "placeholder",
    lastSync: "never",
  },
  {
    id: "decision_twin",
    name: "Decision Preview",
    purpose: "Mirror preflight decisions and autonomy level",
    status: "placeholder",
    lastSync: "never",
  },
  {
    id: "idea_twin",
    name: "IdeaTwin",
    purpose: "Mirror idea vault abstracts (stealth brands included)",
    status: "placeholder",
    lastSync: "never",
  },
];

export const ACTION_QUEUE: ActionItem[] = [
  {
    id: "aq-1",
    title: "a11-k.space mapped to a11-k-core — verified 200",
    severity: "low",
    status: "active",
    owner: "agent",
  },
  {
    id: "aq-2",
    title: "Set COMMAND_ACCESS_TOKEN or Auth.js GitHub OAuth envs",
    severity: "high",
    status: "blocked",
    owner: "Angel",
    blockedBy: "AUTH_* / COMMAND_ACCESS_TOKEN",
  },
  {
    id: "aq-3",
    title: "Wire N8N_BASE_URL + N8N_API_KEY (names only until live)",
    severity: "medium",
    status: "blocked",
    owner: "Angel",
    blockedBy: n8nBlockedBy().join(", ") || "workflow automation credentials",
  },
  {
    id: "aq-4",
    title: "Keep mind-reply.com public surface free of admin UI",
    severity: "critical",
    status: "active",
    owner: "agent",
  },
  {
    id: "aq-5",
    title: "Develop Meridian idea pack stealth-only (no public page yet)",
    severity: "low",
    status: "placeholder",
    owner: "agent",
  },
];

export function defaultLiveProof(): LiveProofData {
  const blocked = n8nBlockedBy();
  return {
    watching: ["site health", "workflow status", "support requests"],
    prediction: blocked.length
      ? "Likely next issue: missing workflow credential"
      : "Likely next issue: domain mapping for a11-k.space",
    decision: blocked.length
      ? "Prepare workflow placeholder and request N8N_API_KEY"
      : "Prepare domain attach for a11-k-core",
    workflow: {
      name: "Brand Status Check",
      status: "placeholder",
      requiredEnv: ["N8N_BASE_URL", "N8N_API_KEY"],
    },
    escalation: "Escalate only if production URL fails",
    proofLog: ["Last check pending", "No fake live facts displayed"],
  };
}
