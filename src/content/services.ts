import type { IconName } from "@/components/ui/icon";

export type Service = {
  /** Stable id — also used for anchors. */
  slug: string;
  title: string;
  description: string;
  icon: IconName;
  /** Short capability tags shown on the card. */
  tags: string[];
  /** Matching value in contact project types (see content/contact.ts) — pre-selects the form. */
  projectType: string;
};

export type Practice = {
  slug: string;
  name: string;
  summary: string;
  services: Service[];
};

const boomi: Service = {
  slug: "boomi-integration",
  title: "Boomi Integration",
  description: "Design, build, and maintain reliable application and data integrations using Boomi.",
  icon: "workflow",
  tags: ["Integration processes", "API management", "EDI / B2B", "Monitoring"],
  projectType: "boomi-integration",
};

const automation: Service = {
  slug: "automation-apis",
  title: "Automation & APIs",
  description: "Connect systems, eliminate repetitive work, and create automated business workflows.",
  icon: "zap",
  tags: ["REST & webhooks", "Event-driven flows", "Scheduled jobs"],
  projectType: "automation",
};

const mcp: Service = {
  slug: "mcp-integrations",
  title: "MCP Integrations",
  description:
    "Connect AI systems and agents with tools, services, APIs, and business systems using Model Context Protocol.",
  icon: "plug",
  tags: ["MCP servers", "Tool design", "Auth & permissions"],
  projectType: "mcp",
};

const aiIntegration: Service = {
  slug: "ai-integration",
  title: "AI Integration",
  description: "Bring AI into existing products and business workflows.",
  icon: "sparkles",
  tags: ["LLM features", "RAG", "Workflow AI"],
  projectType: "ai-integration",
};

const aiChatbots: Service = {
  slug: "ai-chatbots",
  title: "AI Chatbots",
  description: "Intelligent conversational experiences powered by modern LLMs and business data.",
  icon: "messages",
  tags: ["Support assistants", "Knowledge bases", "Human handoff"],
  projectType: "ai-chatbot",
};

const aiAgents: Service = {
  slug: "ai-agents",
  title: "AI Agents",
  description: "Agents that plan and use your tools to complete multi-step work — with guardrails and human review.",
  icon: "bot",
  tags: ["Tool use", "Guardrails", "Evaluation"],
  projectType: "ai-integration",
};

const saas: Service = {
  slug: "saas-development",
  title: "SaaS Development",
  description:
    "From MVP to production-ready SaaS platforms, including architecture, APIs, multi-tenancy, authentication, billing, and deployment.",
  icon: "layers",
  tags: ["MVPs", "Multi-tenancy", "Auth & billing", "Deployment"],
  projectType: "saas-development",
};

const web: Service = {
  slug: "web-development",
  title: "Web Development",
  description: "Modern websites, web applications, dashboards, portals, and custom business platforms.",
  icon: "globe",
  tags: ["Web apps", "Dashboards", "Portals", "Business platforms"],
  projectType: "web-development",
};

const mobile: Service = {
  slug: "mobile-development",
  title: "Mobile Development",
  description: "Modern mobile applications with robust backend integrations and scalable architecture.",
  icon: "smartphone",
  tags: ["iOS & Android", "Cross-platform", "Backend integration"],
  projectType: "mobile-development",
};

/** Services grouped by practice — each practice has its own specialist engineers. */
export const practices: Practice[] = [
  {
    slug: "integration",
    name: "Integration & Automation",
    summary: "Connect the systems you already run and take the manual work out of them.",
    services: [boomi, automation, mcp],
  },
  {
    slug: "ai",
    name: "AI Engineering",
    summary: "Put useful AI inside your products, workflows, and support channels.",
    services: [aiIntegration, aiChatbots, aiAgents],
  },
  {
    slug: "product",
    name: "Product Engineering",
    summary: "Design and build SaaS, web, and mobile software — from MVP to scale.",
    services: [saas, web, mobile],
  },
];

/** Senior advisory, shown as a wide card under the practices. */
export const advisory: Service & { includes: string[] } = {
  slug: "technical-consulting",
  title: "Technical Consulting & Architecture",
  description:
    "Architecture, technology strategy, modernization, cloud, APIs, engineering practices, and technical problem solving — from engineers who build.",
  icon: "compass",
  tags: [],
  includes: [
    "Solution architecture",
    "Cloud & backend engineering",
    "System modernization",
    "Architecture & code reviews",
    "Boomi health checks",
    "AI strategy & roadmaps",
  ],
  projectType: "technical-consulting",
};

/** Flat list of every service (used for structured data). */
export const services: Service[] = [...practices.flatMap((p) => p.services), advisory];
