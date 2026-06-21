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
      "Nue desktop installers are not published yet. Join early access, inspect the source, or follow the setup docs while signed builds are prepared.",
    primaryCta: { href: "#platforms", label: "Choose your platform" },
    secondaryCta: { href: "https://github.com/orthogonalhq/nous-core", label: "View source" },
    heroStats: [
      { label: "License", value: "Open source" },
      { label: "Installers", value: "Coming soon" },
      { label: "Principle", value: "Privacy first" }
    ],
    sections: [
      {
        id: "platforms",
        eyebrow: "DOWNLOADS",
        title: "Installers are coming soon.",
        body: "We will publish signed macOS, Windows, and Linux builds with release notes and checksums. Until then, use the waitlist, source, and docs paths below.",
        cards: [
          { eyebrow: "macOS", title: "Apple Silicon and Intel", body: "Signed macOS builds are planned for the early access channel.", items: ["Native desktop shell", "Local memory directory", "Release checksums"] },
          { eyebrow: "Windows", title: "Windows desktop", body: "Windows packages will be published once binary releases are ready.", items: ["Installer target", "Approval-first actions", "Workspace integrations"] },
          { eyebrow: "Linux", title: "Linux packages", body: "Linux packages remain a planned path for developer workstations and self-managed environments.", items: ["AppImage target", "CLI-friendly setup", "Source build path"] }
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
    primaryCta: { href: "/download#waitlist", label: "Join early access" },
    secondaryCta: { href: "mailto:hello@nue.orthg.nl", label: "Talk to us" },
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
    primaryCta: { href: "mailto:careers@nue.orthg.nl", label: "Introduce yourself" },
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
      cta: { href: "mailto:careers@nue.orthg.nl", label: "Start the conversation" }
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
  security: {
    badge: "TRUST & SECURITY",
    title: "Privacy-first agents need clear boundaries.",
    description: "Nue is designed around local-first control, inspectable routines, scoped tool access, and explicit approval before important actions.",
    primaryCta: { href: "/product#ownership", label: "See ownership model" },
    secondaryCta: { href: "/privacy", label: "Read privacy" },
    heroStats: [
      { label: "Principle", value: "Privacy first" },
      { label: "Actions", value: "Approval gated" },
      { label: "Project", value: "Open source" }
    ],
    sections: [
      {
        eyebrow: "SECURITY MODEL",
        title: "The agent that knows you should be constrained by you.",
        body: "Nue treats memory, tools, keys, workflows, and external actions as sensitive surfaces that deserve visible control.",
        cards: [
          { title: "Local-first direction", body: "Nue prioritizes keeping personal context and workflow state close to the user-controlled environment where possible." },
          { title: "Approval boundaries", body: "Routines should stop before purchases, messages, bookings, data sharing, or other important actions." },
          { title: "Scoped tools", body: "Connected services should be granted only the access needed for a routine and remain understandable to the user." },
          { title: "Inspectable source", body: "The public core project lets early users and maintainers inspect how Nue is built as it matures." }
        ]
      },
      {
        eyebrow: "EARLY ACCESS NOTE",
        title: "Security documentation will deepen with each release.",
        body: "As installers, cloud tiers, and team features become available, this page will expand with architecture notes, data handling details, and responsible disclosure guidance.",
        cards: [
          { title: "No silent autonomy", body: "The product direction favors visible plans, reviewable changes, and explicit consent for consequential actions." },
          { title: "User-owned context", body: "Memory and routines are treated as personal infrastructure, not generic platform data." },
          { title: "Transparent maturity", body: "Early-access surfaces should be labeled honestly so users understand what is ready and what is coming." },
          { title: "Contact", body: "For security questions, email hello@nue.orthg.nl while a dedicated disclosure channel is prepared." }
        ]
      }
    ]
  },
  developers: {
    badge: "DEVELOPERS",
    title: "Build with Nue and inspect the agent OS core.",
    description: "Nue is in early access. Developers can follow the docs, inspect the source, and help shape the local-first runtime, workflow model, and integrations.",
    primaryCta: { href: "https://docs.nue.orthg.nl", label: "Open docs" },
    secondaryCta: { href: "https://github.com/orthogonalhq/nous-core", label: "View GitHub" },
    heroStats: [
      { label: "Stage", value: "Early access" },
      { label: "Core", value: "Open source" },
      { label: "Installers", value: "Coming soon" }
    ],
    sections: [
      {
        eyebrow: "DEVELOPER PATHS",
        title: "Start from source, docs, or a workflow idea.",
        cards: [
          { title: "Read the docs", body: "Follow concepts, local setup notes, configuration guidance, and product model updates." },
          { title: "Inspect source", body: "Review the core project while the public rename from Nous to Nue is completed." },
          { title: "Shape integrations", body: "Help define safe tool use, approval boundaries, and reusable workflow patterns." },
          { title: "Track releases", body: "Signed binary releases are not available yet; release notes and checksums will accompany installers." }
        ]
      }
    ],
    closing: { eyebrow: "TRANSITION NOTE", title: "The public repo is still completing the Nue rename.", body: "Some GitHub and documentation surfaces may still mention Nous during migration. The product brand is Nue, and migration notes should remain explicit until the transition is finished.", cta: { href: "https://github.com/orthogonalhq/nous-core", label: "View source" } }
  },
  login: {
    badge: "ACCOUNT ACCESS",
    title: "Nue accounts are not open yet.",
    description: "Local-first early access does not require a Nue cloud account. Managed cloud tiers and team workspaces will add sign-in when they are ready.",
    primaryCta: { href: "/download#waitlist", label: "Join early access" },
    secondaryCta: { href: "/pricing", label: "View pricing" },
    heroStats: [
      { label: "Status", value: "Coming soon" },
      { label: "Today", value: "Local access" },
      { label: "Cloud", value: "Waitlist" }
    ],
    sections: [
      {
        eyebrow: "COMING SOON",
        title: "Sign-in will arrive with managed cloud features.",
        cards: [
          { title: "Local first", body: "The early product direction starts with local control and source/docs access rather than a hosted account gate." },
          { title: "Cloud waitlist", body: "Join from pricing if you want managed model access, background runs, or team features." },
          { title: "Team access", body: "Organizations can contact us to discuss shared workspaces, governance, and deployment needs." },
          { title: "No dead end", body: "This page exists so global navigation is honest while accounts are still being prepared." }
        ]
      }
    ]
  },
  useCases: {
    badge: "USE CASES",
    title: "Nue is for the recurring work that quietly consumes your week.",
    description:
      "Explore practical ways a private personal agent OS can help individuals, families, and teams turn repeated requests into reusable routines with memory, tools, and approval points.",
    primaryCta: { href: "/download#waitlist", label: "Join early access" },
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
      eyebrow: "NEXT STEP",
      title: "Find the pattern that matches your recurring work.",
      body: "Start from the use case closest to your week, then adapt the routine with your tools, memory boundaries, and approval points.",
      cta: { href: "/resources", label: "Browse resources" }
    }
  },
  useCasesIndividuals: {
    badge: "USE CASES · INDIVIDUALS",
    title: "Turn personal admin into private routines you can trust.",
    description: "Nue helps with the repeated planning, follow-ups, research, and life logistics that consume focus without needing to leave your control.",
    primaryCta: { href: "/download#waitlist", label: "Join early access" },
    secondaryCta: { href: "/product", label: "Explore product" },
    heroStats: [
      { label: "Best for", value: "Personal work" },
      { label: "Pattern", value: "Recurring routines" },
      { label: "Boundary", value: "Ask first" }
    ],
    sections: [
      {
        eyebrow: "PERSONAL ROUTINES",
        title: "Delegate the tasks you keep explaining.",
        body: "Start with natural requests, let Nue draft the repeatable steps, and keep approvals on sensitive actions.",
        cards: [
          { title: "Planning", body: "Prepare travel options, weekly plans, project next steps, and reminders from your preferences and constraints.", items: ["Travel planning", "Weekly reviews", "Project checklists"] },
          { title: "Follow-ups", body: "Track loose ends across notes, email drafts, and conversations so important threads do not disappear.", items: ["People to reply to", "Open decisions", "Draft responses"] },
          { title: "Research", body: "Compare options, summarize findings, and preserve the reasoning behind recommendations for later review.", items: ["Product comparisons", "Decision briefs", "Saved sources"] },
          { title: "Life admin", body: "Review subscriptions, bills, appointments, forms, and recurring personal maintenance with clear approval gates.", items: ["Bill review", "Appointments", "Subscription checks"] }
        ]
      }
    ],
    closing: { eyebrow: "PRIVATE BY DEFAULT", title: "Your personal context should remain yours.", body: "Nue is designed around local-first memory, inspectable routines, and explicit approval before important actions.", cta: { href: "/security", label: "Review security" } }
  },
  useCasesFamilies: {
    badge: "USE CASES · FAMILIES",
    title: "Coordinate household work without adding another dashboard.",
    description: "Nue helps families turn meal planning, errands, calendars, trips, and school logistics into calm routines with visible decisions.",
    primaryCta: { href: "/download#waitlist", label: "Join early access" },
    secondaryCta: { href: "/product", label: "Explore product" },
    heroStats: [
      { label: "Best for", value: "Households" },
      { label: "Pattern", value: "Shared logistics" },
      { label: "Boundary", value: "Approval gates" }
    ],
    sections: [
      {
        eyebrow: "HOUSEHOLD ROUTINES",
        title: "Make recurring coordination easier to repeat.",
        body: "Nue can remember preferences you allow, prepare plans, and stop before orders, messages, or calendar changes.",
        cards: [
          { title: "Meal planning", body: "Build realistic meal plans from schedules, preferences, budget, and pantry notes before preparing a grocery cart.", items: ["Weekly menus", "Grocery drafts", "Diet preferences"] },
          { title: "Calendar coordination", body: "Summarize the week, spot conflicts, and prepare reminders or drafts for family handoffs.", items: ["Schedule checks", "Conflict flags", "Reminder drafts"] },
          { title: "Errands", body: "Keep recurring errands visible and prepare routes, lists, or ordering steps for approval.", items: ["Shopping lists", "Pickup plans", "Recurring tasks"] },
          { title: "Travel and events", body: "Coordinate packing lists, bookings to review, itineraries, and shared notes for trips or family events.", items: ["Packing lists", "Itineraries", "Booking review"] }
        ]
      }
    ],
    closing: { eyebrow: "CONTROLLED AUTOMATION", title: "Helpful routines should not act behind your back.", body: "Nue is built to ask before important actions like purchases, messages, bookings, and external changes.", cta: { href: "/product#tools", label: "See tools and approvals" } }
  },
  useCasesBusinesses: {
    badge: "USE CASES · BUSINESSES",
    title: "Standardize repeatable work while keeping humans in control.",
    description: "Nue helps teams shape client follow-ups, intake, reporting, research, and operational handoffs into inspectable routines.",
    primaryCta: { href: "mailto:hello@nue.orthg.nl?subject=Nue%20team%20use%20cases", label: "Talk to us" },
    secondaryCta: { href: "/pricing", label: "View pricing" },
    heroStats: [
      { label: "Best for", value: "Teams" },
      { label: "Pattern", value: "Operations" },
      { label: "Boundary", value: "Review first" }
    ],
    sections: [
      {
        eyebrow: "TEAM ROUTINES",
        title: "Capture the process, not just the prompt.",
        body: "Nue turns repeated operational intent into routines with steps, permissions, run history, and human review points.",
        cards: [
          { title: "Client follow-ups", body: "Prepare status updates, next-step reminders, and context summaries without losing the account history.", items: ["Draft updates", "Open blockers", "Next steps"] },
          { title: "Intake", body: "Turn incoming requests into structured briefs, routed tasks, and review queues.", items: ["Request summaries", "Routing rules", "Approval queues"] },
          { title: "Reports", body: "Compile recurring metrics, notes, and narrative updates for weekly or monthly review.", items: ["Weekly reports", "Research briefs", "Decision logs"] },
          { title: "Operations", body: "Coordinate repeatable handoffs across docs, calendars, tickets, and team knowledge with auditable runs.", items: ["Handoffs", "Run history", "Governance"] }
        ]
      }
    ],
    closing: { eyebrow: "EARLY TEAM SUPPORT", title: "Bring us the workflow you repeat every week.", body: "We are working with early teams to shape shared workspace, governance, support, and deployment needs.", cta: { href: "mailto:hello@nue.orthg.nl?subject=Nue%20team%20workflow", label: "Contact us" } }
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
        id: "conversation",
        eyebrow: "CONVERSATION",
        title: "Start with the natural request.",
        body: "Nue keeps the chat surface familiar while adding durable context, preferences, and a path from one-off help to reusable work.",
        cards: [
          { title: "Familiar input", body: "Ask in plain language instead of configuring a workflow from scratch." },
          { title: "Persistent context", body: "Use memory you allow so repeated requests start with the right background." },
          { title: "Inspectable response", body: "See what Nue understood, what it plans to do, and where it needs permission." },
          { title: "Routine candidate", body: "Promote repeated work into a saved routine when the same request keeps coming back." }
        ]
      },
      {
        id: "delegation",
        eyebrow: "DELEGATION",
        title: "Turn intent into a reusable routine.",
        body: "Delegation in Nue means visible steps, editable boundaries, schedules, and explicit approvals — not hidden automation.",
        cards: [
          { title: "Drafted steps", body: "Nue proposes the sequence before anything runs." },
          { title: "Editable workflow", body: "Adjust triggers, tools, data access, and stop points." },
          { title: "Scheduled runs", body: "Let recurring work return at the right time with current context." },
          { title: "Human checkpoints", body: "Require review before money, messages, bookings, or external changes." }
        ]
      },
      {
        id: "agent-os",
        eyebrow: "AGENT OS",
        title: "One private home for memory, tools, and runs.",
        body: "The operating-system layer keeps agent work understandable: what it knows, what it can touch, what ran, and what needs you.",
        cards: [
          { title: "Memory", body: "Keep useful context organized around your control." },
          { title: "Tools", body: "Connect services with scoped permissions and clear boundaries." },
          { title: "Run history", body: "Review outcomes, decisions, and artifacts after each routine." },
          { title: "Control surface", body: "Manage agents, schedules, approvals, and connected capabilities in one workspace." }
        ]
      },
      {
        id: "ownership",
        eyebrow: "OWNERSHIP",
        title: "Your agent should not become another locked platform.",
        body: "Nue is open-source and local-first so personal memory, workflows, and model choices can stay portable and inspectable.",
        cards: [
          { title: "Open source", body: "Inspect the core project and follow development in public." },
          { title: "Local-first direction", body: "Keep sensitive personal context close to your own environment where possible." },
          { title: "Bring your own keys", body: "Use model access patterns that preserve your control over providers and billing." },
          { title: "Portable routines", body: "Avoid burying your recurring work inside an opaque assistant account." }
        ]
      },
      {
        id: "tools",
        eyebrow: "TOOLS & APPROVALS",
        title: "Connect services without surrendering judgment.",
        body: "Nue is designed to use tools for real work while stopping before sensitive, irreversible, or expensive actions.",
        cards: [
          { title: "Scoped access", body: "Grant only the capabilities a routine needs." },
          { title: "Approval rules", body: "Set the actions that must wait for you." },
          { title: "Action previews", body: "Review drafts, carts, messages, bookings, or changes before execution." },
          { title: "Audit trail", body: "Keep a clear record of what happened and why." }
        ]
      },
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
