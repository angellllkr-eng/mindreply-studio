export type OperationalStatus =
  | "verified_live"
  | "local"
  | "route_api"
  | "route_only"
  | "blocked"
  | "needs_owner"
  | "missing_env";

export type AurelSurface = {
  id: string;
  title: string;
  route: string;
  domain: string;
  visibility: "public" | "private" | "ops";
  level: 0 | 1 | 2 | 3 | 4;
  status: OperationalStatus;
  purpose: string;
  works: string;
  blocked: string;
  nextAction: string;
  approvals: string[];
  rollback: string;
};

export const aurelSurfaces: AurelSurface[] = [
  {
    id: "command",
    title: "AUREL Command",
    route: "/command",
    domain: "command.a11-k.space",
    visibility: "private",
    level: 2,
    status: "route_api",
    purpose: "Private command cockpit for decisions, models, workflows, action queue, approval, cost guard and rollback.",
    works: "Route and command APIs are created by this correction script.",
    blocked: "Auth/provider/n8n/Vercel/GitHub env may still be missing.",
    nextAction: "Verify /command locally, then protect route before exposing.",
    approvals: ["auth", "dns", "secrets", "destructive actions"],
    rollback: "Restore App.tsx and server/index.js from backup."
  },
  {
    id: "shell",
    title: "Existing Shell",
    route: "/shell",
    domain: "shell.mind-reply.com",
    visibility: "private",
    level: 3,
    status: "local",
    purpose: "Existing Shell path and backend integration pattern.",
    works: "Existing project documentation says Shell uses model-router, audit-log, Express server and AUREL design.",
    blocked: "Production URL must be verified.",
    nextAction: "Keep /shell working while /command is upgraded.",
    approvals: [],
    rollback: "Use /shell directly."
  },
  {
    id: "mindreply",
    title: "MindReply",
    route: "/s/mindreply",
    domain: "mind-reply.com",
    visibility: "public",
    level: 2,
    status: "route_api",
    purpose: "Public customer-facing brand.",
    works: "Registry state is available.",
    blocked: "Live domain must be verified outside code.",
    nextAction: "Keep public site separate from private command UI.",
    approvals: ["public deploy"],
    rollback: "Do not route public domain to private UI."
  },
  {
    id: "a11k",
    title: "A11-K Engine",
    route: "/s/a11k",
    domain: "a11-k.space",
    visibility: "public",
    level: 2,
    status: "route_api",
    purpose: "Engine core and operating-layer stamp.",
    works: "Registry state is available.",
    blocked: "Vercel/DNS mapping must be verified.",
    nextAction: "Attach only after project and domain check.",
    approvals: ["dns"],
    rollback: "Remove alias or revert domain mapping."
  },
  {
    id: "aurel",
    title: "AUREL",
    route: "/s/aurel",
    domain: "aurel.a11-k.space",
    visibility: "private",
    level: 2,
    status: "route_api",
    purpose: "Private execution layer.",
    works: "Registry state is available.",
    blocked: "Auth gate required before sensitive data.",
    nextAction: "Protect private route.",
    approvals: ["auth"],
    rollback: "Disable in registry."
  },
  {
    id: "brushworks",
    title: "Brushworks",
    route: "/s/brushworks",
    domain: "brushworks.a11-k.space",
    visibility: "public",
    level: 2,
    status: "route_api",
    purpose: "Creative/visual build layer.",
    works: "Registry state is available.",
    blocked: "Creative workflow not wired.",
    nextAction: "Connect workflow status when n8n is configured.",
    approvals: [],
    rollback: "Hide from public navigation."
  },
  {
    id: "tools",
    title: "Tools",
    route: "/s/tools",
    domain: "tools.mind-reply.com",
    visibility: "public",
    level: 2,
    status: "route_api",
    purpose: "Tool directory.",
    works: "Registry state is available.",
    blocked: "Individual tool checks required.",
    nextAction: "Verify SQL, Lens, Regex, Tutor routes.",
    approvals: [],
    rollback: "Unlist unavailable tools."
  },
  {
    id: "sql",
    title: "SQL Studio",
    route: "/s/sql",
    domain: "sql.mind-reply.com",
    visibility: "public",
    level: 2,
    status: "route_api",
    purpose: "SQL helper surface.",
    works: "Registry state is available.",
    blocked: "Provider/tool backend must be verified.",
    nextAction: "Run live check.",
    approvals: [],
    rollback: "Display safe placeholder."
  },
  {
    id: "models",
    title: "Model Status",
    route: "/s/models",
    domain: "models.a11-k.space",
    visibility: "ops",
    level: 2,
    status: "missing_env",
    purpose: "Provider status, missing env names, fallback state and cost risk.",
    works: "/api/command/models reports env names only.",
    blocked: "Provider keys may be missing.",
    nextAction: "Add AI_GATEWAY_API_KEY or provider key in environment.",
    approvals: ["secrets"],
    rollback: "Fallback Safe Mode."
  },
  {
    id: "workflows",
    title: "Workflow Hub",
    route: "/s/workflows",
    domain: "workflows.a11-k.space",
    visibility: "ops",
    level: 2,
    status: "missing_env",
    purpose: "Workflow automation status without exposing webhooks.",
    works: "/api/command/workflows reports missing n8n env honestly.",
    blocked: "N8N_BASE_URL and N8N_API_KEY may be missing.",
    nextAction: "Connect n8n credentials and test health only.",
    approvals: ["secrets", "workflow triggers"],
    rollback: "Disable workflow triggers."
  },
  {
    id: "github-security",
    title: "GitHub Security",
    route: "/s/github-security",
    domain: "security.a11-k.space",
    visibility: "ops",
    level: 2,
    status: "missing_env",
    purpose: "Dependabot/code scanning/secret scanning issue awareness.",
    works: "/api/command/security reports blocker safely.",
    blocked: "GITHUB_TOKEN or gh auth may be missing.",
    nextAction: "Run security audit; do not auto-dismiss.",
    approvals: ["secret rotation"],
    rollback: "Report only."
  },
  {
    id: "deployments",
    title: "Deployments",
    route: "/s/deployments",
    domain: "deployments.a11-k.space",
    visibility: "ops",
    level: 2,
    status: "missing_env",
    purpose: "Build, deploy, URL verification and rollback awareness.",
    works: "Build gate exists.",
    blocked: "VERCEL_TOKEN/vercel auth may be missing.",
    nextAction: "Deploy once only after build passes.",
    approvals: ["production deploy"],
    rollback: "Use previous deployment."
  },
  {
    id: "unapolagetic",
    title: "UNAPOLAGETIC",
    route: "/s/unapolagetic",
    domain: "unapolagetic.mind-reply.com",
    visibility: "public",
    level: 2,
    status: "route_api",
    purpose: "Fashion/accessory brand surface.",
    works: "Registry and command card exist.",
    blocked: "Commerce backend and compliance gates not connected.",
    nextAction: "Fashion/accessories first; keep cosmetics blocked.",
    approvals: ["product publishing", "paid apps", "ads"],
    rollback: "Disable shop/actions."
  },
  {
    id: "rollback",
    title: "Rollback",
    route: "/s/rollback",
    domain: "rollback.a11-k.space",
    visibility: "ops",
    level: 2,
    status: "route_api",
    purpose: "Undo plan for risky changes.",
    works: "Backup/restore exists in this script.",
    blocked: "Deployment metadata still needs attachment.",
    nextAction: "Record last known good deployment.",
    approvals: [],
    rollback: "Restore backups or revert commit."
  }
];

export const commandSummary = {
  total: aurelSurfaces.length,
  level4: aurelSurfaces.filter((s) => s.level === 4).length,
  level3: aurelSurfaces.filter((s) => s.level === 3).length,
  level2: aurelSurfaces.filter((s) => s.level === 2).length,
  level1: aurelSurfaces.filter((s) => s.level === 1).length,
  level0: aurelSurfaces.filter((s) => s.level === 0).length,
  blocked: aurelSurfaces.filter((s) =>
    ["blocked", "needs_owner", "missing_env"].includes(s.status)
  ).length
};
