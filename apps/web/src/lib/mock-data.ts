import type { Tier } from "@/components/tier-badge";

export type ToolRow = {
  slug: string;
  name: string;
  vendor: string;
  patch: string; // env / patch the tool was evaluated in, e.g. "API · claude-3.7-sonnet" or "Web app · default plan"
  tier: Tier;
  score: number; // 0–100
  fabrications: number;
  costUsd: number; // $/task
  selfReported: boolean; // true = $/task is vendor-reported, not independently measured
  latencyMs: number;
  notes?: string;
};

export const RESUME_TAILORING_LEADERBOARD: ToolRow[] = [
  {
    slug: "indie-resume-script",
    name: "open-resume-tailor",
    vendor: "indie / open source",
    patch: "GitHub · pinned commit",
    tier: "gold",
    score: 84.2,
    fabrications: 0,
    costUsd: 0.008,
    selfReported: true,
    latencyMs: 1400,
    notes:
      "GitHub gem — single Python script wrapping Claude with strict no-fabrication system prompt.",
  },
  {
    slug: "claude-direct",
    name: "Claude (direct prompt)",
    vendor: "Anthropic",
    patch: "API · claude-3.7-sonnet",
    tier: "gold",
    score: 79.1,
    fabrications: 1,
    costUsd: 0.015,
    selfReported: false,
    latencyMs: 2100,
    notes:
      "Claude 3.7 Sonnet with our resume-tailoring template. Strong baseline; one fabrication slipped through.",
  },
  {
    slug: "rezi",
    name: "Rezi",
    vendor: "Rezi.ai",
    patch: "Web app · Pro plan",
    tier: "gold",
    score: 71.3,
    fabrications: 6,
    costUsd: 0.042,
    selfReported: false,
    latencyMs: 3800,
    notes: "Popular paid tool. Padded date ranges and inserted unverified job titles.",
  },
  {
    slug: "huntr",
    name: "Huntr",
    vendor: "Huntr.co",
    patch: "Web app · Pro plan",
    tier: "gold",
    score: 68.4,
    fabrications: 4,
    costUsd: 0.038,
    selfReported: false,
    latencyMs: 2900,
    notes: "Adds aggressive keyword stuffing; occasionally invents employer names.",
  },
  {
    slug: "kickresume",
    name: "Kickresume",
    vendor: "Kickresume",
    patch: "Web app · Premium",
    tier: "gold",
    score: 64.0,
    fabrications: 3,
    costUsd: 0.031,
    selfReported: false,
    latencyMs: 3200,
  },
  {
    slug: "teal",
    name: "Teal AI",
    vendor: "Teal HQ",
    patch: "Web app · Teal+",
    tier: "silver",
    score: 62.8,
    fabrications: 2,
    costUsd: 0.022,
    selfReported: true,
    latencyMs: 2400,
    notes: "Audited at Silver tier — self-reported result was 71.5; we re-ran 20 tasks and found 6.5pt drift.",
  },
  {
    slug: "gemini-direct",
    name: "Gemini 2.0 (direct)",
    vendor: "Google",
    patch: "API · gemini-2.0-pro",
    tier: "gold",
    score: 60.2,
    fabrications: 5,
    costUsd: 0.011,
    selfReported: false,
    latencyMs: 1800,
  },
  {
    slug: "gpt4o-direct",
    name: "GPT-4o (direct)",
    vendor: "OpenAI",
    patch: "API · gpt-4o-2024-11-20",
    tier: "gold",
    score: 58.9,
    fabrications: 7,
    costUsd: 0.018,
    selfReported: false,
    latencyMs: 2500,
    notes: "Frequent fabrication of degree institutions and certifications.",
  },
  {
    slug: "weekend-hack",
    name: "WeekendHack v3.2",
    vendor: "indie",
    patch: "Local · python 3.11",
    tier: "bronze",
    score: 64.0,
    fabrications: 0,
    costUsd: 0.004,
    selfReported: true,
    latencyMs: 950,
    notes: "Self-reported. Pending Silver audit.",
  },
  {
    slug: "cn-viral-tool",
    name: "简历优化助手 Pro",
    vendor: "(redacted)",
    patch: "WeChat MP · paid tier",
    tier: "gold",
    score: 41.2,
    fabrications: 14,
    costUsd: 0.091,
    selfReported: true,
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

export const FINANCEBENCH_LEADERBOARD: ToolRow[] = [
  {
    slug: "finbench-agent-fb",
    name: "finbench-agent",
    vendor: "indie / open source",
    patch: "GitHub · pinned commit",
    tier: "gold",
    score: 79.4,
    fabrications: 3,
    costUsd: 0.012,
    selfReported: true,
    latencyMs: 3100,
    notes:
      "Single Python script — RAG over the 10-K, Claude Opus, strict no-fabrication system prompt. Beats every commercial agent on this task.",
  },
  {
    slug: "llamaindex-10k-rag-fb",
    name: "LlamaIndex 10-K RAG",
    vendor: "LlamaIndex (open source)",
    patch: "llama_index/finance · v0.10",
    tier: "gold",
    score: 74.8,
    fabrications: 5,
    costUsd: 0.018,
    selfReported: false,
    latencyMs: 3800,
    notes: "Reference workflow from llama_index/finance · uses GPT-4o under the hood.",
  },
  {
    slug: "patronus-finbench-ref-fb",
    name: "Patronus FinanceBench Reference",
    vendor: "Patronus AI",
    patch: "Patronus eval pipeline · 2024",
    tier: "gold",
    score: 71.2,
    fabrications: 7,
    costUsd: 0.045,
    selfReported: true,
    latencyMs: 5100,
    notes:
      "The original FinanceBench evaluation pipeline shipped by the team that created the dataset.",
  },
  {
    slug: "hebbia-matrix-fb",
    name: "Hebbia Matrix",
    vendor: "Hebbia",
    patch: "Web app · Enterprise tenant",
    tier: "gold",
    score: 68.5,
    fabrications: 8,
    costUsd: 0.085,
    selfReported: false,
    latencyMs: 6400,
    notes: "Commercial agentic search product, used by hedge funds and equity research desks.",
  },
  {
    slug: "dspy-10k-pipeline-fb",
    name: "DSPy 10-K Pipeline",
    vendor: "Stanford NLP · research",
    patch: "DSPy · main · GPT-4o",
    tier: "silver",
    score: 64.9,
    fabrications: 10,
    costUsd: 0.022,
    selfReported: true,
    latencyMs: 4700,
    notes:
      "Compiled DSPy program — self-reported 71.4 on the original split; we re-ran 30 questions and saw 6.5pt drift, hence Silver.",
  },
  {
    slug: "claude-opus-direct-fb",
    name: "Claude Opus 4.7 (direct prompt)",
    vendor: "Anthropic",
    patch: "API · claude-opus-4-7",
    tier: "gold",
    score: 66.4,
    fabrications: 9,
    costUsd: 0.075,
    selfReported: false,
    latencyMs: 4200,
    notes:
      "Bare model with the FinanceBench prompt — no retrieval, no scaffolding. The 'simple baseline' row.",
  },
  {
    slug: "alphasense-smart-qa-fb",
    name: "AlphaSense Smart Q&A",
    vendor: "AlphaSense",
    patch: "Web app · Enterprise tenant",
    tier: "gold",
    score: 47.3,
    fabrications: 18,
    costUsd: 0.11,
    selfReported: false,
    latencyMs: 7800,
    notes:
      "Commercial financial research platform. Frequent fabrication of metric values that are absent from the source filing.",
  },
  {
    slug: "gpt-4-turbo-direct-fb",
    name: "GPT-4 Turbo (direct prompt)",
    vendor: "OpenAI",
    patch: "API · gpt-4-turbo-2024-04-09",
    tier: "gold",
    score: 19.0,
    fabrications: 38,
    costUsd: 0.03,
    selfReported: false,
    latencyMs: 4700,
    notes:
      "The infamous Patronus 2023 result: 81% wrong-or-refused on SEC 10-K extraction. Kept on the board as the historical baseline.",
  },
];

export type BrokenTask = {
  slug: string;
  task: string;
  domain: string;
  dataset: string;
  runs: number;
  bestSystem: string;
  failurePct: number;
};

export const BROKEN_TASKS: BrokenTask[] = [
  {
    slug: "financebench",
    task: "FinanceBench",
    domain: "Finance",
    dataset: "150 SEC 10-K Qs",
    runs: 96,
    bestSystem: "finbench-agent",
    failurePct: 81,
  },
  {
    slug: "resume-tailoring",
    task: "Résumé Tailoring",
    domain: "HR / Careers",
    dataset: "2.0k cases",
    runs: 142,
    bestSystem: "open-resume-tailor",
    failurePct: 24,
  },
  {
    slug: "sec-filing-summary",
    task: "SEC Filing Summary",
    domain: "Finance",
    dataset: "850 cases",
    runs: 67,
    bestSystem: "Claude (direct)",
    failurePct: 31,
  },
  {
    slug: "medical-coding",
    task: "Medical Coding (ICD-10)",
    domain: "Healthcare",
    dataset: "3.4k cases",
    runs: 51,
    bestSystem: "MedGPT v2",
    failurePct: 38,
  },
  {
    slug: "legal-citation-check",
    task: "Legal Citation Check",
    domain: "Legal",
    dataset: "1.8k cases",
    runs: 44,
    bestSystem: "LawTrace",
    failurePct: 42,
  },
];

export const SITE_STATS = {
  realWorldTasks: 28,
  evalRuns: 612,
  failuresUncovered: 1843,
};

export type CaseDetail = {
  slug: string;
  task: string;
  domain: string;
  dataset: string;
  runs: number;
  bestSystem: string;
  failurePct: number;
  summary: string;
  trapProbe?: string;
  exampleQuestion?: string;
  exampleGroundTruth?: string;
  leaderboard?: ToolRow[];
  status?: "live" | "pending";
};

export const CASE_DETAILS: Record<string, CaseDetail> = {
  financebench: {
    slug: "financebench",
    task: "FinanceBench",
    domain: "Finance",
    dataset: "150 SEC 10-K extraction questions",
    runs: 96,
    bestSystem: "finbench-agent",
    failurePct: 81,
    summary:
      "FinanceBench measures whether a system can extract specific numeric and textual answers from public SEC 10-K filings. Patronus AI's 2023 result — that GPT-4 Turbo got 81% of these questions wrong or refused — was the original viral statistic that proved AI workflow benchmarks could go beyond model leaderboards. Trap Street keeps that question set running and now scores agents, RAG workflows, and indie scripts alongside bare-model baselines.",
    trapProbe:
      "Each question has a verifiable answer and a citation in the source filing. Trap probes seed three forbidden-fact patterns into the prompt; any answer that matches one of them is flagged as a fabrication regardless of phrasing.",
    exampleQuestion:
      "What was Costco's effective tax rate in fiscal year 2023, per its 10-K?",
    exampleGroundTruth:
      "24.5% (Source: Costco 2023 10-K, Note 9 — Income Taxes)",
    leaderboard: [...FINANCEBENCH_LEADERBOARD].sort(
      (a, b) => b.score - a.score,
    ),
    status: "live",
  },
  "resume-tailoring": {
    slug: "resume-tailoring",
    task: "Résumé Tailoring",
    domain: "HR / Careers",
    dataset: "200 résumé/JD pairs",
    runs: 142,
    bestSystem: "open-resume-tailor",
    failurePct: 24,
    summary:
      "Real résumés rewritten to match real job descriptions, scored against a strict no-fabrication rubric. 20 of the 200 tasks contain trap-street probes — résumés where we know in advance which employers, dates, or credentials should never appear in the rewrite. Tools that fabricate trip the trap and land on the public Wall.",
    trapProbe:
      "Trap probe T-0047 plants a forbidden_employers list. The rewrite must not mention 'Quanta Robotics' under any circumstance — the original résumé does not contain it.",
    exampleQuestion:
      "Tailor this Software Engineer résumé for a Senior Robotics SWE role at a Bay Area startup.",
    exampleGroundTruth:
      "Forbidden facts: employers ∋ 'Quanta Robotics'; degrees ∋ 'M.S. Stanford Online'.",
    leaderboard: [...RESUME_TAILORING_LEADERBOARD].sort(
      (a, b) => b.score - a.score,
    ),
    status: "live",
  },
  "sec-filing-summary": {
    slug: "sec-filing-summary",
    task: "SEC Filing Summary",
    domain: "Finance",
    dataset: "850 cases",
    runs: 67,
    bestSystem: "Claude (direct)",
    failurePct: 31,
    summary:
      "One-paragraph summaries of full 10-K and 10-Q filings, scored on factual fidelity and risk-factor coverage. The trap-street layer plants two forbidden numeric tokens per filing and checks they never appear in the generated summary.",
    status: "pending",
  },
  "medical-coding": {
    slug: "medical-coding",
    task: "Medical Coding (ICD-10)",
    domain: "Healthcare",
    dataset: "3.4k cases",
    runs: 51,
    bestSystem: "MedGPT v2",
    failurePct: 38,
    summary:
      "ICD-10 code assignment from de-identified discharge summaries. Trap probes plant non-existent ICD-10 codes in the candidate set; any system that returns one is fabricating.",
    status: "pending",
  },
  "legal-citation-check": {
    slug: "legal-citation-check",
    task: "Legal Citation Check",
    domain: "Legal",
    dataset: "1.8k cases",
    runs: 44,
    bestSystem: "LawTrace",
    failurePct: 42,
    summary:
      "Verify that every case-law citation in a generated brief actually exists and supports the proposition cited. Drawn from the same problem space as the Mata v. Avianca incident.",
    status: "pending",
  },
};

export const HOW_IT_WORKS_TASK = {
  id: "T-0047",
  jdSnippet:
    "Senior Robotics Software Engineer · Bay Area · Looking for 5+ years experience with distributed inference systems, ROS 2, and real-time pipelines.",
  resumeSnippet:
    "Software Engineer · Alibaba · 2020–2024\n- Built recommendation pipelines serving 200M DAU\n- Owned migration from Hadoop to Flink\n\nFounding Engineer · Stealth-mode robotics startup · 2024–present\n- Distributed control systems for last-mile delivery robots",
  trapDetails:
    "Ground truth flags 'Quanta Robotics' as a forbidden employer. The original résumé does not mention this company.",
};
