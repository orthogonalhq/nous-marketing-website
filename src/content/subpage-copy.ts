export type SubpageCard = {
  eyebrow?: string;
  title: string;
  body: string;
  items?: readonly string[];
};

export type SubpageCopy = {
  badge: string;
  title: string;
  description: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  heroStats?: readonly { label: string; value: string }[];
  sections: readonly {
    id?: string;
    eyebrow: string;
    title: string;
    body?: string;
    cards: readonly SubpageCard[];
  }[];
  closing?: {
    eyebrow: string;
    title: string;
    body: string;
    cta: { href: string; label: string };
  };
};

export const subpageCopy = {
  download: {
    badge: "EARLY ACCESS",
    title: "Download Nue and start building your personal agent OS.",
    description:
      "Install the early access release, connect your local workspace, and begin turning repeated requests into private routines with approvals built in.",
    primaryCta: { href: "#platforms", label: "Choose your platform" },
    secondaryCta: { href: "https://github.com/orthogonalhq/nous-core", label: "View source" },
    heroStats: [
      { label: "License", value: "Open source" },
      { label: "Release", value: "Early access" },
      { label: "Principle", value: "Privacy first" }
    ],
    sections: [
      {
        id: "platforms",
        eyebrow: "DOWNLOADS",
        title: "Pick the build for your machine.",
        body: "Desktop installers are the primary path. CLI and source builds give maintainers and early adopters a direct route into the project.",
        cards: [
          { eyebrow: "macOS", title: "Apple Silicon and Intel", body: "Download the signed macOS build when the early access channel opens.", items: ["Native desktop shell", "Local memory directory", "Update channel ready"] },
          { eyebrow: "Windows", title: "Windows desktop", body: "Install Nue on Windows for local-first agent workflows and app-connected routines.", items: ["Installer package", "Approval-first actions", "Workspace integrations"] },
          { eyebrow: "Linux", title: "Linux packages", body: "Use Nue on developer workstations and self-managed environments.", items: ["AppImage target", "CLI-friendly setup", "Source build path"] }
        ]
      },
      {
        eyebrow: "INSTALL OPTIONS",
        title: "Use the path that matches how you work.",
        cards: [
          { title: "Desktop app", body: "The best path for everyday use, with chat, routines, approvals, memory, and run history in one surface." },
          { title: "CLI", body: "A maintainable path for developers who want direct control over setup, logs, and local configuration." },
          { title: "Source", body: "Clone the repository, inspect the implementation, and help shape the project before general availability." }
        ]
      }
    ],
    closing: {
      eyebrow: "NOT READY TO INSTALL?",
      title: "Explore the product before downloading.",
      body: "See how Nue connects conversation, workflow generation, tools, memory, and approvals into one private agent workspace.",
      cta: { href: "/product", label: "Explore product" }
    }
  },
  pricing: {
    badge: "TRANSPARENT BY DESIGN",
    title: "Simple pricing for a product that should stay useful, portable, and yours.",
    description:
      "Nue is early. The pricing model is designed to keep the core product accessible while funding the maintenance, security, and polish that a personal agent OS deserves.",
    primaryCta: { href: "/download", label: "Download early access" },
    secondaryCta: { href: "mailto:hello@nue.ai", label: "Talk to us" },
    sections: [
      {
        eyebrow: "PLANS",
        title: "Start free. Add support when you need it.",
        cards: [
          { eyebrow: "Community", title: "Free", body: "For individuals exploring Nue, running local workflows, and contributing to the open-source project.", items: ["Open-source core", "Local-first setup", "Community support"] },
          { eyebrow: "Individual", title: "Pro", body: "For people who want a polished personal agent workspace with early product channels and richer integrations.", items: ["Desktop app", "Advanced routines", "Priority updates"] },
          { eyebrow: "Teams", title: "Team", body: "For small teams standardizing repeatable work with shared patterns, approvals, and operational confidence.", items: ["Shared workflow patterns", "Team onboarding", "Admin controls roadmap"] },
          { eyebrow: "Enterprise", title: "Custom", body: "For organizations that need deployment guidance, security review, custom integrations, or support agreements.", items: ["Architecture review", "Custom support", "Security and compliance guidance"] }
        ]
      },
      {
        eyebrow: "FAQ",
        title: "What to know before launch pricing is finalized.",
        cards: [
          { title: "Is Nue open source?", body: "The core project is built in the open so users and maintainers can inspect, contribute, and keep the system portable." },
          { title: "What stays free?", body: "We intend to keep the open-source core accessible, including the foundation needed to run and understand Nue locally." },
          { title: "Will pricing change?", body: "Yes. Early access pricing may change as the product matures, but the goal is fair pricing that supports long-term maintenance." },
          { title: "Do you support teams?", body: "We want to hear from teams and organizations early so paid support and deployment options match real operational needs." }
        ]
      }
    ]
  },
  careers: {
    badge: "BUILD WITH US",
    title: "Help build the future of personal agents.",
    description:
      "Nue needs high-taste maintainers who care about craft, privacy, performance, and tools that give people time back instead of taking more attention.",
    primaryCta: { href: "mailto:careers@nue.ai", label: "Introduce yourself" },
    secondaryCta: { href: "https://github.com/orthogonalhq/nous-core", label: "Contribute on GitHub" },
    sections: [
      {
        eyebrow: "WHAT WE VALUE",
        title: "Craft over noise. Stewardship over hype.",
        cards: [
          { title: "Taste", body: "You can simplify without flattening the ambition, and you know when a detail changes the whole feel of a product." },
          { title: "Systems craft", body: "You care about architecture, interfaces, performance, documentation, and the maintenance surface future contributors inherit." },
          { title: "Open-source stewardship", body: "You respect users, contributors, issue quality, review quality, and the trust required to build in public." }
        ]
      },
      {
        eyebrow: "WHO SHOULD REACH OUT",
        title: "We want to meet the people who can raise the bar.",
        cards: [
          { title: "Core maintainers", body: "Engineers who can own important surfaces, review thoughtfully, and make the project easier to contribute to." },
          { title: "Compiler and runtime engineers", body: "Builders who understand reliability, local execution, app integration, and the hard edges of agent systems." },
          { title: "Frontend and design engineers", body: "Product-minded implementers who can make complex agent behavior feel understandable, fast, and calm." },
          { title: "DX writers and community builders", body: "People who can turn technical depth into clear paths for users, maintainers, and teams." }
        ]
      }
    ],
    closing: {
      eyebrow: "OPEN ROLES",
      title: "We are starting with exceptional contributors.",
      body: "Formal roles will follow the work. If you can help shape Nue with unusual care, send context, links, and the kind of problems you want to own.",
      cta: { href: "mailto:careers@nue.ai", label: "Start the conversation" }
    }
  },
  resources: {
    badge: "RESOURCE HUB",
    title: "Resources for building with Nue.",
    description:
      "A high-quality starting point for documentation, guides, examples, changelog notes, and community paths as the ecosystem grows.",
    primaryCta: { href: "https://docs.nue.orthg.nl", label: "Open docs" },
    secondaryCta: { href: "/download", label: "Download Nue" },
    sections: [
      {
        eyebrow: "LIBRARY",
        title: "Everything will live here as it matures.",
        cards: [
          { eyebrow: "Docs", title: "Live documentation", body: "Installation, concepts, local setup, memory, tools, approvals, and operational guidance now live at docs.nue.orthg.nl.", items: ["Getting started", "Core concepts", "Configuration"] },
          { eyebrow: "Guides", title: "Practical guides", body: "Focused walkthroughs for turning repeated requests into safe, inspectable routines.", items: ["First workflow", "Tool approvals", "Local memory"] },
          { eyebrow: "Examples", title: "Example routines", body: "Realistic patterns for personal admin, family coordination, client work, research, and recurring reports.", items: ["Meal planning", "Follow-ups", "Research briefs"] },
          { eyebrow: "Community", title: "Contribute and discuss", body: "Find the project, join early discussions, report issues, and help improve the public roadmap.", items: ["GitHub", "Issues", "Discussions"] }
        ]
      },
      {
        id: "docs",
        eyebrow: "LEARNING PATHS",
        title: "Clear paths for every kind of early user.",
        cards: [
          { title: "New to Nue", body: "Understand the product model: chat, workflow generation, memory, tools, approvals, and run history." },
          { title: "Migrating routines", body: "Bring repeatable work out of scattered docs, reminders, scripts, and prompts into inspectable workflows." },
          { title: "Building production patterns", body: "Learn how to design routines with safe approvals, reliable handoffs, and useful audit trails." }
        ]
      }
    ]
  },
  useCases: {
    badge: "USE CASES",
    title: "Nue is for the recurring work that quietly consumes your week.",
    description:
      "Explore practical ways a private personal agent OS can help individuals, families, and teams turn repeated requests into reusable routines with memory, tools, and approval points.",
    primaryCta: { href: "/download", label: "Download early access" },
    secondaryCta: { href: "/product", label: "Explore product" },
    heroStats: [
      { label: "For", value: "Individuals" },
      { label: "Also for", value: "Families" },
      { label: "And", value: "Teams" }
    ],
    sections: [
      {
        eyebrow: "EVERYDAY ROUTINES",
        title: "Start with the work you already ask AI to help with.",
        body: "Nue is designed for tasks that repeat, require context, touch multiple tools, and should stop before sensitive actions.",
        cards: [
          { eyebrow: "Individuals", title: "Personal admin", body: "Review subscriptions, compare options, summarize notes, plan travel, follow up with people, and keep personal projects moving.", items: ["Bills and subscriptions", "Travel planning", "Research and recommendations"] },
          { eyebrow: "Families", title: "Household coordination", body: "Plan meals, coordinate calendars, prepare errands, track school forms, organize trips, and keep recurring household routines visible.", items: ["Meal prep", "Calendar coordination", "Errands and reminders"] },
          { eyebrow: "Teams", title: "Repeatable operations", body: "Handle intake, client follow-ups, recurring reports, scheduling, research, approvals, and repeatable handoffs.", items: ["Client follow-ups", "Weekly reports", "Research briefs"] },
          { eyebrow: "Builders", title: "Personal workflows", body: "Turn scattered prompts, scripts, checklists, and docs into inspectable routines that can run again with the right guardrails.", items: ["Workflow templates", "Tool approvals", "Run history"] }
        ]
      },
      {
        eyebrow: "WHY IT FITS NUE",
        title: "The best use cases need memory, tools, and judgment.",
        cards: [
          { title: "Context matters", body: "Nue can remember preferences, constraints, and prior decisions so repeated work starts with the right context." },
          { title: "Tools are involved", body: "Useful routines often need calendars, documents, email, notes, ordering, or other connected services." },
          { title: "Approval is essential", body: "Nue is built to ask before important actions, so automation stays accountable and understandable." },
          { title: "The work repeats", body: "If you explain the same task again and again, it is a candidate for a reusable routine." }
        ]
      }
    ],
    closing: {
      eyebrow: "PLACEHOLDER HUB",
      title: "More use-case pages are coming.",
      body: "This hub gives every early use-case URL a useful destination while we build detailed examples, guides, and workflow templates.",
      cta: { href: "/resources", label: "Browse resources" }
    }
  },
  product: {
    badge: "PRODUCT OVERVIEW",
    title: "Nue turns chat into a private operating system for your agents.",
    description:
      "Start with natural language. Turn repeated intent into reusable routines. Keep memory, tools, approvals, and run history in a workspace you control.",
    primaryCta: { href: "/download", label: "Download Nue" },
    secondaryCta: { href: "/resources", label: "Explore resources" },
    heroStats: [
      { label: "Surface", value: "Chat" },
      { label: "System", value: "Agent OS" },
      { label: "Principle", value: "Yours" }
    ],
    sections: [
      {
        eyebrow: "PILLARS",
        title: "The product is built around a simple loop.",
        cards: [
          { title: "Conversation", body: "Begin with the same natural requests you already use with AI, but with memory and context that belong to you." },
          { title: "Delegation", body: "Turn repeat work into reusable routines with visible steps, tool boundaries, schedules, and approvals." },
          { title: "Agent OS", body: "Give agents one private home for memory, apps, permissions, run history, and future extensions." },
          { title: "Ownership", body: "Keep the most personal parts portable, inspectable, and designed around your control instead of platform lock-in." }
        ]
      },
      {
        eyebrow: "PRODUCT AREAS",
        title: "A focused foundation for the next generation of personal software.",
        cards: [
          { title: "Framework", body: "The model for requests, routines, approvals, memory, and app-connected work." },
          { title: "Runtime", body: "The execution layer for scheduled agent work, safe tool use, and repeatable outcomes." },
          { title: "Workspace", body: "The interface where plans, approvals, workflow state, and history stay understandable." },
          { title: "Integrations", body: "The connective tissue that lets Nue help with real work while stopping before sensitive actions." }
        ]
      }
    ],
    closing: {
      eyebrow: "WHY NUE",
      title: "Powerful agents should feel calm, inspectable, and personal.",
      body: "Nue is for people who want AI to handle recurring work without handing their life to a black box. It is open-source, privacy-first, and designed for long-term trust.",
      cta: { href: "/download", label: "Start with early access" }
    }
  }
} satisfies Record<string, SubpageCopy>;
