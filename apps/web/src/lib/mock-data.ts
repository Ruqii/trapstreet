import type { Tier } from "@/components/tier-badge";

export type ToolRow = {
  slug: string;
  name: string;
  vendor: string;
  pricing: string; // e.g. "$29/mo" or "Free" or "API"
  tier: Tier;
  score: number; // 0–100
  fabrications: number;
  costUsd: number; // $/task
  latencyMs: number;
  notes?: string;
};

export const RESUME_TAILORING_LEADERBOARD: ToolRow[] = [
  {
    slug: "indie-resume-script",
    name: "open-resume-tailor",
    vendor: "indie / open source",
    pricing: "Free",
    tier: "gold",
    score: 84.2,
    fabrications: 0,
    costUsd: 0.008,
    latencyMs: 1400,
    notes:
      "GitHub gem — single Python script wrapping Claude with strict no-fabrication system prompt.",
  },
  {
    slug: "claude-direct",
    name: "Claude (direct prompt)",
    vendor: "Anthropic",
    pricing: "API",
    tier: "gold",
    score: 79.1,
    fabrications: 1,
    costUsd: 0.015,
    latencyMs: 2100,
    notes:
      "Claude 3.7 Sonnet with our resume-tailoring template. Strong baseline; one fabrication slipped through.",
  },
  {
    slug: "rezi",
    name: "Rezi",
    vendor: "Rezi.ai",
    pricing: "$29/mo",
    tier: "gold",
    score: 71.3,
    fabrications: 6,
    costUsd: 0.042,
    latencyMs: 3800,
    notes: "Popular paid tool. Padded date ranges and inserted unverified job titles.",
  },
  {
    slug: "huntr",
    name: "Huntr",
    vendor: "Huntr.co",
    pricing: "$39/mo",
    tier: "gold",
    score: 68.4,
    fabrications: 4,
    costUsd: 0.038,
    latencyMs: 2900,
    notes: "Adds aggressive keyword stuffing; occasionally invents employer names.",
  },
  {
    slug: "kickresume",
    name: "Kickresume",
    vendor: "Kickresume",
    pricing: "$19/mo",
    tier: "gold",
    score: 64.0,
    fabrications: 3,
    costUsd: 0.031,
    latencyMs: 3200,
  },
  {
    slug: "teal",
    name: "Teal AI",
    vendor: "Teal HQ",
    pricing: "$9/mo",
    tier: "silver",
    score: 62.8,
    fabrications: 2,
    costUsd: 0.022,
    latencyMs: 2400,
    notes: "Audited at Silver tier — self-reported result was 71.5; we re-ran 20 tasks and found 6.5pt drift.",
  },
  {
    slug: "gemini-direct",
    name: "Gemini 2.0 (direct)",
    vendor: "Google",
    pricing: "API",
    tier: "gold",
    score: 60.2,
    fabrications: 5,
    costUsd: 0.011,
    latencyMs: 1800,
  },
  {
    slug: "gpt4o-direct",
    name: "GPT-4o (direct)",
    vendor: "OpenAI",
    pricing: "API",
    tier: "gold",
    score: 58.9,
    fabrications: 7,
    costUsd: 0.018,
    latencyMs: 2500,
    notes: "Frequent fabrication of degree institutions and certifications.",
  },
  {
    slug: "weekend-hack",
    name: "WeekendHack v3.2",
    vendor: "indie",
    pricing: "Free",
    tier: "bronze",
    score: 64.0,
    fabrications: 0,
    costUsd: 0.004,
    latencyMs: 950,
    notes: "Self-reported. Pending Silver audit.",
  },
  {
    slug: "cn-viral-tool",
    name: "简历优化助手 Pro",
    vendor: "(redacted)",
    pricing: "¥199/mo",
    tier: "gold",
    score: 41.2,
    fabrications: 14,
    costUsd: 0.091,
    latencyMs: 5200,
    notes:
      "Highest fabrication rate in the cohort. Routinely added fictitious company names and unverifiable awards.",
  },
];

export type WallEntry = {
  id: string;
  toolSlug: string;
  toolName: string;
  caughtAt: string;
  taskId: string;
  trap: string;
  whatItClaimed: string;
  whatTheTruthIs: string;
  evidence: string;
};

export const WALL_ENTRIES: WallEntry[] = [
  {
    id: "W-0001",
    toolSlug: "rezi",
    toolName: "Rezi",
    caughtAt: "2026-04-22",
    taskId: "T-0047",
    trap: "Fabricated employer",
    whatItClaimed:
      'Added bullet point: "Improved real-time inference latency at Quanta Robotics by 38% across distributed pipelines."',
    whatTheTruthIs:
      'The original résumé contains no employer named "Quanta Robotics." The candidate has worked at Alibaba and a stealth-mode startup.',
    evidence:
      "Trap probe T-0047 ground truth: forbidden_employers includes 'Quanta Robotics'. Tool output triggered the trap.",
  },
  {
    id: "W-0002",
    toolSlug: "cn-viral-tool",
    toolName: "简历优化助手 Pro",
    caughtAt: "2026-04-23",
    taskId: "T-0089",
    trap: "Padded role tenure",
    whatItClaimed:
      'Rewrote a 1-year internship as "Senior Backend Engineer · Tencent · 2022–2025 (3 years)".',
    whatTheTruthIs:
      "Original résumé clearly states: Backend Engineer Intern at Tencent, June 2024 – March 2025 (10 months).",
    evidence:
      "Hallucination judge flagged date manipulation; cross-checked against ground truth résumé (canonical version).",
  },
  {
    id: "W-0003",
    toolSlug: "gpt4o-direct",
    toolName: "GPT-4o (direct)",
    caughtAt: "2026-04-24",
    taskId: "T-0112",
    trap: "Phantom credential",
    whatItClaimed:
      'Inserted Education line: "M.S. in Applied Machine Learning, Stanford Online (2023)".',
    whatTheTruthIs:
      "Original résumé lists a B.Eng. in Software Engineering only. There is no graduate degree, and 'Stanford Online' is not a Stanford-branded credential.",
    evidence:
      "Trap probe T-0112 includes a verifier on declared credentials. Output failed credential audit.",
  },
];

export const HOW_IT_WORKS_TASK = {
  id: "T-0047",
  jdSnippet:
    "Senior Robotics Software Engineer · Bay Area · Looking for 5+ years experience with distributed inference systems, ROS 2, and real-time pipelines.",
  resumeSnippet:
    "Software Engineer · Alibaba · 2020–2024\n- Built recommendation pipelines serving 200M DAU\n- Owned migration from Hadoop to Flink\n\nFounding Engineer · Stealth-mode robotics startup · 2024–present\n- Distributed control systems for last-mile delivery robots",
  trapDetails:
    "Ground truth flags 'Quanta Robotics' as a forbidden employer. The original résumé does not mention this company.",
};
