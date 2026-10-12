export type Option = { value: string; label: string };

/** "What can we help with?" — single choice. */
export const helpOptions: Option[] = [
  { value: "build", label: "Build something new" },
  { value: "integrate", label: "Integrate systems" },
  { value: "automate", label: "Automate a workflow" },
  { value: "ai", label: "Add AI to a product" },
  { value: "improve", label: "Improve an existing system" },
  { value: "advice", label: "Get technical advice" },
];

export const projectTypes: Option[] = [
  { value: "saas-development", label: "SaaS Development" },
  { value: "web-development", label: "Web Development" },
  { value: "mobile-development", label: "Mobile Development" },
  { value: "boomi-integration", label: "Boomi Integration" },
  { value: "ai-integration", label: "AI Integration" },
  { value: "ai-chatbot", label: "AI Chatbot" },
  { value: "mcp", label: "MCP" },
  { value: "automation", label: "Automation" },
  { value: "technical-consulting", label: "Technical Consulting" },
  { value: "other", label: "Other" },
];

/** Optional. Ranges line up with content/pricing.ts — edit both together. */
export const budgetOptions: Option[] = [
  { value: "", label: "Prefer not to say" },
  { value: "discovery", label: "Discovery first ($5k – $15k)" },
  { value: "15k-50k", label: "$15k – $50k" },
  { value: "50k-100k", label: "$50k – $100k" },
  { value: "100k-250k", label: "$100k – $250k" },
  { value: "250k-plus", label: "$250k+" },
  { value: "monthly", label: "Monthly team / retainer" },
  { value: "not-sure", label: "Not sure yet" },
];

export const nextSteps = [
  {
    title: "We read every message",
    body: "A person reviews your inquiry — not an autoresponder.",
  },
  {
    title: "A short conversation",
    body: "We ask questions to understand the problem, constraints, and goals.",
  },
  {
    title: "A clear recommendation",
    body: "Scope, approach, and next steps — or an honest note if we're not the right fit.",
  },
];
