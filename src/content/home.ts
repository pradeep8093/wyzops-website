/**
 * Homepage copy. Kept separate from components so wording can be edited
 * without touching layout code.
 */

export const hero = {
  eyebrow: "Technology consultancy & product studio",
  eyebrowDetail: "Integration · AI · Product",
  headline: ["Build.", "Integrate.", "Automate."],
  subheadline:
    "WyzOps is a technology consultancy with senior-led engineering teams. We design, build, and integrate the systems businesses run on — Boomi and API integrations, practical AI, SaaS, web, and mobile.",
  primaryCta: { label: "Start a Conversation", href: "/contact" },
  secondaryCta: { label: "Explore Our Services", href: "/#services" },
};

export const capabilities = [
  "Product Engineering",
  "SaaS",
  "AI",
  "Integrations",
  "Web",
  "Mobile",
  "Automation",
];

export const businessAreas = {
  eyebrow: "About WyzOps",
  title: "A consultancy that ships its own software.",
  description:
    "Our engineering teams deliver client work across integration, AI, and product engineering — and build focused SaaS products of our own. Each side sharpens the other: building products keeps our consulting practical, and client work keeps our products grounded in real problems.",
  products: {
    label: "WyzOps Products",
    title: "We build products, not just projects.",
    body: "We create focused micro-SaaS products that solve real problems with simple, scalable software.",
    points: [
      "One clear job, done well",
      "Simple to adopt, built to scale",
      "Shipped, measured, and improved",
    ],
    cta: { label: "Explore Products", href: "/#products" },
    /** Shown instead of the CTA while content/products.ts is empty. */
    pendingLabel: "First products in development",
  },
  engineering: {
    label: "WyzOps Engineering",
    title: "Technology built around your business.",
    body: "From integrations and SaaS platforms to AI-powered applications, we help businesses design, build, and evolve modern technology systems.",
    points: [
      "SaaS, web, and mobile platforms",
      "Boomi, API, and MCP integrations",
      "AI, automation, and architecture",
    ],
    cta: { label: "Work With Us", href: "/contact" },
    pendingLabel: "",
  },
};

export const servicesIntro = {
  eyebrow: "Services",
  title: "What We Build",
  description:
    "Three engineering practices and a senior advisory bench, each with its own specialists. One partner for the systems you connect, the AI you add, and the software you build.",
};

export const aiSection = {
  eyebrow: "AI",
  title: "Make your software",
  titleAccent: "AI-native.",
  body: "We help businesses move beyond simply adding a chatbot. We integrate AI into products, workflows, and systems to create genuinely useful automation and intelligent experiences.",
  stance:
    "Practical by default: start from the workflow, measure what matters, and keep people in control where it counts.",
  capabilities: [
    { title: "AI Chatbots", body: "Assistants grounded in your content and data.", icon: "messages" },
    { title: "AI Agents", body: "Multi-step agents that use tools to get work done.", icon: "bot" },
    { title: "LLM Integration", body: "Model APIs wired into your product, with guardrails.", icon: "cpu" },
    { title: "RAG", body: "Retrieval over your documents, tickets, and knowledge.", icon: "search" },
    { title: "MCP", body: "Standard, permissioned access from AI to your systems.", icon: "plug" },
    { title: "AI Automation", body: "Classify, extract, summarize, and route automatically.", icon: "zap" },
    { title: "Intelligent Workflows", body: "Human-in-the-loop flows where AI does the heavy lifting.", icon: "route" },
    { title: "AI-powered SaaS", body: "Products designed around AI from the first commit.", icon: "layers" },
  ],
} as const;

export const processIntro = {
  eyebrow: "Process",
  title: "How we work",
  description:
    "Important decisions early, short feedback loops, and software that keeps working after launch.",
};

export const process = [
  {
    step: "01",
    title: "Understand",
    body: "We understand your business, users, systems, and goals.",
  },
  {
    step: "02",
    title: "Architect",
    body: "We design the right technical solution before writing unnecessary code.",
  },
  {
    step: "03",
    title: "Build",
    body: "We develop, integrate, test, and iterate quickly.",
  },
  {
    step: "04",
    title: "Evolve",
    body: "We help you improve, scale, automate, and maintain the system.",
  },
];

export const whyIntro = {
  eyebrow: "Why WyzOps",
  title: "Product thinking. Engineering discipline.",
  description:
    "The care of a product company and the range of an engineering studio, in one team.",
};

export const principles = [
  {
    title: "Senior-led Teams",
    body: "Every engagement is led by experienced engineers who stay accountable from kickoff to handover.",
    icon: "users",
  },
  {
    title: "Product Mindset",
    body: "We think about outcomes, users, and business value — not just features.",
    icon: "target",
  },
  {
    title: "Engineering First",
    body: "We care about architecture, maintainability, scalability, and reliability.",
    icon: "braces",
  },
  {
    title: "Flexible Engagement",
    body: "Work with us on a specific project, an MVP, ongoing engineering, or technical consulting.",
    icon: "split",
  },
  {
    title: "Build + Integrate",
    body: "We build new systems and connect existing ones — so nothing ends up an island.",
    icon: "combine",
  },
  {
    title: "Practical AI",
    body: "We focus on useful AI implementations, not AI for the sake of it.",
    icon: "sparkles",
  },
] as const;

export const teamIntro = {
  eyebrow: "Team",
  title: "Senior engineers, assembled around your project.",
  description:
    "Every engagement gets a dedicated team drawn from our practices — with one accountable lead from kickoff to handover.",
};

export const teamRoles = [
  {
    title: "Engagement Lead",
    body: "Your single point of contact. Owns scope, timeline, and communication.",
    icon: "user-check",
  },
  {
    title: "Solution Architect",
    body: "Designs the system before it's built and reviews every critical decision.",
    icon: "compass",
  },
  {
    title: "Specialist Engineers",
    body: "Senior engineers from the practice your project needs — integration, AI, product, or cloud.",
    icon: "braces",
  },
  {
    title: "QA & DevOps",
    body: "Testing, CI/CD, environments, and releases — so shipping is routine, not risky.",
    icon: "shield-check",
  },
] as const;

export const teamCommitments = [
  "One accountable lead for the life of your engagement",
  "Architects involved from the first workshop",
  "Specialists from every practice, pulled in as needed",
  "A stable team — no silent swaps mid-project",
];

/** Disciplines across the bench. */
export const teamDisciplines = [
  "Boomi",
  "APIs & events",
  "LLMs & RAG",
  "MCP",
  "Web",
  "Mobile",
  "Cloud",
  "Data",
  "QA",
  "DevOps",
];

export const deliveryIntro = {
  eyebrow: "Working with us",
  title: "Engineering in India. Working on your clock.",
  description:
    "Our teams are based in India and work with clients worldwide — with real overlap in your business day and the communication habits of a local partner.",
};

/**
 * ⚠️ Confirm these hours match how your team schedules client time.
 * Times assume US Eastern Daylight Time (IST = ET + 9h30).
 */
export const overlap = {
  headline: "3 hours of live overlap with US Eastern, every working day",
  etWindow: "9:00 AM – 12:00 PM ET",
  istWindow: "6:30 PM – 9:30 PM IST",
  /** Bands for the timeline visual, in US Eastern hours (0–24). */
  bands: {
    teamStart: 0.5, // 10:00 AM IST
    overlapStart: 9, // 6:30 PM IST
    overlapEnd: 12, // 9:30 PM IST
    clientStart: 9,
    clientEnd: 18,
  },
};

export const deliveryPoints = [
  {
    title: "Overlap with your day",
    body: "Standups, reviews, and working sessions happen in your morning — not at midnight.",
    icon: "clock",
  },
  {
    title: "Progress while you sleep",
    body: "Feedback you give today becomes working software by your next morning.",
    icon: "moon",
  },
  {
    title: "Local-partner communication",
    body: "Shared Slack or Teams, weekly demos, and written status updates from one accountable lead.",
    icon: "messages",
  },
  {
    title: "You own everything",
    body: "All code, IP, and documentation are yours — in your repositories and your cloud accounts.",
    icon: "key",
  },
  {
    title: "Contracts that fit your process",
    body: "NDAs and MSAs, milestone or monthly billing, invoicing in USD.",
    icon: "file-check",
  },
  {
    title: "Security by default",
    body: "Least-privilege access, managed secrets, and clean offboarding at handover.",
    icon: "shield-check",
  },
] as const;

export const productsIntro = {
  eyebrow: "Products",
  title: "Our Products",
  description: "Small products. Real problems. Useful software.",
  emptyState: {
    status: "In development",
    title: "Something useful is being built.",
    body: "Our first micro-SaaS products are in the works — each one built to solve a single, specific business problem well.",
    cta: { label: "Suggest a problem worth solving", href: "/contact?type=other" },
  },
};

export const workIntro = {
  eyebrow: "Work",
  title: "Selected Work",
  description: "Case studies will be published here as projects ship.",
  emptyState: {
    title: "We're building the next generation of software with ambitious teams.",
    body: "If you're planning a product, an integration, or an AI initiative, we'd like to hear about it.",
    cta: { label: "Discuss Your Project", href: "/contact" },
  },
};

export const finalCta = {
  title: "Have a problem worth solving?",
  body: "Tell us what you're trying to build, integrate, automate, or improve. We'll help you figure out the technology.",
  primaryCta: { label: "Start a Conversation", href: "/contact" },
  secondaryLabel: "Email Us",
  bookingLabel: "Book a 30-min call",
};
