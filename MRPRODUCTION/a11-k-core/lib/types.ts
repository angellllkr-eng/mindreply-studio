export type FeatureStatus = "active" | "placeholder" | "blocked" | "unknown";
export type Visibility = "public" | "private" | "stealth";

export type BrandRecord = {
  name: string;
  slug: string;
  domain: string;
  visibility: Visibility;
  source: string;
  vercelProject: string;
  githubRepo: string;
  status: FeatureStatus;
  seoStatus: FeatureStatus;
  workflowStatus: FeatureStatus;
  supportPath: string;
  nextAction: string;
};

export type ProviderStatus = {
  id: string;
  label: string;
  env: string[];
  configured: boolean;
  purpose: string;
  status: FeatureStatus;
};

export type WorkflowRecord = {
  id: string;
  name: string;
  purpose: string;
  trigger: string;
  inputFields: string[];
  connectionPath: string;
  webhookStatus: FeatureStatus;
  requiredEnv: string[];
  dashboardAction: string;
  status: FeatureStatus;
};

export type LiveProofData = {
  watching: string[];
  prediction: string;
  decision: string;
  workflow: {
    name: string;
    status: FeatureStatus;
    requiredEnv: string[];
  };
  escalation: string;
  proofLog: string[];
};

export type ActionItem = {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  status: FeatureStatus;
  owner: string;
  blockedBy?: string;
};

export type ShadowTwin = {
  id: string;
  name: string;
  purpose: string;
  status: FeatureStatus;
  lastSync: string;
};
