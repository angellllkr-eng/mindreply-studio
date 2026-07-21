export type IdeaSource = {
  file: string;
  linkedIdea: string;
  summary: string;
  nextAction: string;
  status: "confirmed" | "abstract" | "missing";
};

export const ONEDRIVE_SOURCES: IdeaSource[] = [
  {
    file: "OneDrive/copilot-activity-history.csv",
    linkedIdea: "MindReply SEO, agents, agency ops, response overload",
    summary:
      "Confirmed large activity history present. Use as SEO/agency direction signal only — no private chat dumps in UI.",
    nextAction: "Mine themes abstractly into Brand Idea Pack (no raw export to public pages)",
    status: "confirmed",
  },
  {
    file: "luxury_hospitality_brand_guidelines (clue)",
    linkedIdea: "Meridian luxury hospitality",
    summary:
      "Closest confirmed luxury concept is Meridian hospitality. Keep stealth until brand boundary is clear.",
    nextAction: "Keep Meridian in idea vault + shadow IdeaTwin only",
    status: "abstract",
  },
  {
    file: "yacht / marina / boats",
    linkedIdea: "Yacht/marina luxury",
    summary:
      "No explicit yacht source found. Closest confirmed source is Meridian luxury hospitality.",
    nextAction: "Do not invent a public yacht brand; abstract placeholder only",
    status: "missing",
  },
  {
    file: "BRIXO",
    linkedIdea: "BRIXO brand",
    summary: "No BRIXO source located in estate. Abstract stub only.",
    nextAction: "Leave blocked until source appears",
    status: "missing",
  },
  {
    file: "AUREL estate folders",
    linkedIdea: "AUREL brand",
    summary: "AUREL present as live brand module in MRPRODUCTION.",
    nextAction: "Sync BrandTwin status only",
    status: "confirmed",
  },
];

export const IDEA_PACK = [
  {
    id: "meridian",
    title: "Meridian — luxury hospitality",
    visibility: "stealth",
    status: "placeholder",
    notes: "Abstract brand pack. No public domain. No fake claims.",
  },
  {
    id: "yacht-luxury",
    title: "Yacht / marina luxury (unconfirmed)",
    visibility: "stealth",
    status: "blocked",
    notes:
      "No explicit yacht source found. Closest confirmed source is Meridian luxury hospitality.",
  },
  {
    id: "response-overload",
    title: "Response Overload Rescue",
    visibility: "public",
    status: "active",
    notes: "Public MindReply positioning lane — keep on mind-reply.com only.",
  },
  {
    id: "website-completion",
    title: "Website Completion Package",
    visibility: "public",
    status: "active",
    notes: "Public MindReply product lane.",
  },
  {
    id: "brixo",
    title: "BRIXO",
    visibility: "stealth",
    status: "blocked",
    notes: "No source found.",
  },
];
