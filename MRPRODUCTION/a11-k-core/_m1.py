from pathlib import Path
p = Path(r"C:\Users\ANGEL\MRPRODUCTION\a11-k-core\app\command\chat\page.tsx")
p.write_text(r'''"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type ChatMessage = {
  id: string;
  role: "user" | "system" | "assistant";
  content: string;
  meta?: string;
};

const ENGINES = [
  { id: "r1", label: "DeepSeek R1", short: "R1", detail: "Reasoning" },
  { id: "gpt-4.1", label: "GPT-4.1", short: "4.1", detail: "Strongest" },
  { id: "llama-4", label: "Llama 4", short: "L4", detail: "Open" },
  { id: "gpt-4o", label: "GPT-4o", short: "4o", detail: "Fast" },
  { id: "qwen-3", label: "Qwen 3", short: "Q3", detail: "Alt" },
  { id: "mistral", label: "Mistral", short: "MI", detail: "EU" },
] as const;

const MODES = [
  ["chief_orchestrator", "Orchestrator"],
  ["shipping_engineer", "Ship"],
  ["brand_architect", "Brand"],
  ["devops_dns", "Sites"],
  ["cost_limits", "Cost"],
] as const;

const CONTEXTS = [
  ["estate", "Estate"],
  ["a11k", "A11-K"],
  ["brands", "Brands"],
  ["deployments", "Deploy"],
] as const;

const BRANDS = [
  ["a11-k", "A11-K"],
  ["mindreply", "MindReply"],
  ["aurel", "AUREL"],
  ["brixo", "BRIXO"],
] as const;

const QUICK = [
  "Biggest blocker right now?",
  "3 high-impact moves, no new budget",
  "AUREL vs MindReply for London agencies",
  "What decision is waiting on me?",
  "Fastest unblock path",
  "7-day plan with working models only",
];

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "system",
  content: "Ready. Pick a model. Ask anything. Sharp answers only.",
};
''', encoding="utf-8")
print("p1", p.stat().st_size)
