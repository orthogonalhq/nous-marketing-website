export const homeCopy = {
    hero: {
        principlesAriaLabel: "Nue product principles",
        subHeaderCards: [
            { label: "OPEN SOURCE", variant: "highlight" },
            { label: "PRIVACY FIRST", variant: "highlight" },
            { label: "AGENT OS", variant: "normal" }
        ],
        subtitleBody: "Nue turns everyday requests into private routines that remember the details, handle the steps, and ask before anything important happens.",
        subtitleLead: "AI should give you time back.",
        title: "Your personal agent, from chat to operating system."
    },
    navigation: {
        githubAriaLabel: "View Nue on GitHub",
        githubHref: "https://github.com/orthogonalhq/nous-core",
        homeAriaLabel: "Nue home",
        links: {
            getStarted: "Get started",
            login: "Log in",
            pricing: "Pricing"
        },
        productFooter: {
            cta: "Explore product",
            href: "#product",
            label: "How Nue works"
        },
        primaryAriaLabel: "Primary navigation",
        productLabel: "Product",
        productPrimaryLinks: [
            { description: "Start with natural requests and inspectable follow-through.", href: "#conversation", label: "Conversation" },
            { description: "Turn repeated intent into reusable routines with permission.", href: "#delegation", label: "Delegation" },
            { description: "Run scheduled agent work with memory, tools, approvals, and history.", href: "#agent-os", label: "Agent OS" },
            { description: "Bring your own keys, keep memory local, and stay portable.", href: "#ownership", label: "Ownership" },
            { description: "Connect services while stopping before sensitive actions.", href: "#agent-os", label: "Tools & approvals" },
            { description: "See the privacy-first principles behind personal agents.", href: "#trust", label: "Trust principles" }
        ],
        resourceSections: [
            {
                label: "Use cases",
                links: [
                    { description: "Personal admin, planning, follow-ups, and recurring routines.", href: "/use-cases/individuals", label: "Individuals" },
                    { description: "Meals, schedules, errands, travel, and household coordination.", href: "/use-cases/families", label: "Families" },
                    { description: "Client work, reports, approvals, intake, and repeatable operations.", href: "/use-cases/businesses", label: "Businesses" }
                ],
                variant: "featured"
            },
            {
                label: "Learn",
                links: [
                    { description: "Real examples of chat becoming reusable routines.", href: "/examples", label: "Examples" },
                    { description: "Browse repeatable workflows for life and work.", href: "/workflows", label: "Workflow library" },
                    { description: "Product notes, essays, and launch updates.", href: "/blog", label: "Blog" }
                ],
                variant: "default"
            },
            {
                label: "Trust & technical",
                links: [
                    { description: "Set up Nue and connect your tools.", href: "/docs", label: "Docs" },
                    { description: "Privacy, security, and permission boundaries.", href: "/security", label: "Security" },
                    { description: "Build with Nue and inspect the source.", href: "/developers", label: "Developers" }
                ],
                variant: "default"
            }
        ],
        resourcesLabel: "Resources"
    },
    footer: {
        ariaLabel: "Footer navigation",
        bottomLinks: [
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
            { href: "/security", label: "Security" }
        ],
        columns: [
            {
                label: "Product",
                links: [
                    { href: "#conversation", label: "Conversation" },
                    { href: "#delegation", label: "Delegation" },
                    { href: "#agent-os", label: "Agent OS" },
                    { href: "#ownership", label: "Ownership" },
                    { href: "#trust", label: "Trust principles" }
                ]
            },
            {
                label: "Use cases",
                links: [
                    { href: "/use-cases/individuals", label: "Individuals" },
                    { href: "/use-cases/families", label: "Families" },
                    { href: "/use-cases/businesses", label: "Businesses" }
                ]
            },
            {
                label: "Resources",
                links: [
                    { href: "/examples", label: "Examples" },
                    { href: "/workflows", label: "Workflow library" },
                    { href: "/docs", label: "Docs" },
                    { href: "/developers", label: "Developers" }
                ]
            },
            {
                label: "Company",
                links: [
                    { href: "/pricing", label: "Pricing" },
                    { href: "/blog", label: "Blog" },
                    { href: "/about", label: "About" },
                    { external: true, href: "https://github.com/orthogonalhq/nous-core", label: "GitHub" }
                ]
            }
        ],
        copyright: "© 2026 Nue",
        ctas: [
            { href: "/signup", label: "Get started", variant: "primary" },
            { external: true, href: "https://github.com/orthogonalhq/nous-core", label: "View GitHub", variant: "secondary" }
        ],
        taglineBody: "Nue turns everyday requests into private routines that remember the details, handle the steps, and ask before anything important happens.",
        taglineLead: "AI should give you time back.",
        themeLabel: "Theme"
    },
    ownership: {
        body: "As agents become more capable, they also become more intimate. They learn your habits, hold your context, coordinate your tools, and act on your behalf. That kind of system cannot be locked inside someone else’s platform. Nue is designed privacy-first, so your memory, keys, workflows, and data remain yours.",
        eyebrow: "PRIVACY FIRST",
        title: "The agent that knows you should belong to you."
    },
    principles: {
        body: "Nue helps individuals, families, and teams turn recurring requests into private routines that remember context, use the right tools, and stop for approval when it matters.",
        cards: [
            {
                body: "Review subscriptions, plan travel, compare options, summarize notes, follow up with people, and keep personal projects moving.",
                title: "Individuals",
                type: "simple"
            },
            {
                body: "Plan meals, coordinate calendars, prepare errands, track school forms, organize travel, and manage household routines.",
                title: "Families",
                type: "capable"
            },
            {
                body: "Handle intake, client follow-ups, recurring reports, scheduling, research, approvals, and repeatable operations.",
                title: "Businesses",
                type: "yours"
            }
        ],
        title: "Built for the work that keeps coming back.",
        titleMuted: "Planning, admin, coordination, follow-ups, and decisions that repeat across your life and work."
    },
    product: {
        activeModeLabel: "ACTIVE MODE",
        activeThreadLabel: "ACTIVE THREAD",
        chapters: [
            {
                body: "Chat is already the natural way to work with AI. Nue makes it personal: it remembers what matters, learns your preferences over time, and can take action on your behalf when you approve.",
                features: ["Familiar chat", "Persistent memory", "Learns preferences", "Acts with approval"],
                index: "1.0",
                label: "Conversation",
                product: "Conversation",
                title: "As simple as a conversation.",
                variant: "ask"
            },
            {
                body: "Nue can turn your conversation into something you safely delegate again — for home routines, team follow-ups, client onboarding, monthly reports, bill reviews, or anything else that keeps coming back. It drafts the steps, connects tools, uses the memory you allow, sets the schedule, and shows you everything before it runs.",
                features: ["Workflow generation", "Visual builder", "App connections", "Scheduled routines"],
                index: "2.0",
                label: "Delegation",
                product: "Delegation",
                title: "Helping you get your time back.",
                variant: "cortex"
            },
            {
                body: "Nue becomes the private home for your agents: memory, apps, schedules, permissions, and run history in one place. Your agents can return at the right time, do the quiet work, and stop at the line only you can cross.",
                features: ["Agent memory", "Apps + skills", "Permissions", "Scheduled jobs", "Control surface", "Run history"],
                index: "3.0",
                label: "Agent OS",
                product: "Agent OS",
                title: "The operating system for your agents.",
                variant: "operating"
            }
        ],
        surfaces: {
            cortex: {
                assistantMessage: "Yes. I can turn this into a Sunday Meal Prep workflow: check the week, check memories, build a realistic dinner plan, prepare an Uber Groceries cart, and ask before checkout.",
                contextChips: ["Calendar", "Memories", "Food preferences", "Budget", "Delivery address"],
                observerActions: [
                    ["Checked the week’s schedule", "done"],
                    ["Checked memories for preferences", "done"],
                    ["Drafted grocery checklist", "done"],
                    ["Set approval before checkout", "rule"],
                    ["Prepared recipe artifact template", "ready"]
                ],
                observerLabel: "CORTEX OBSERVER",
                observerStatus: "Building workflow",
                permission: "Ask before placing any order over $0",
                proposalCtas: ["Approve workflow", "Edit first"],
                proposalSteps: ["Check calendar", "Check memories", "Plan dinners", "Prepare cart", "Request checkout approval"],
                proposalTitle: "Sunday Meal Prep workflow",
                trigger: "Every Sunday · 9:00 AM",
                userMessage: "I’m tired of figuring out dinner every week. Can you handle meal planning and groceries every Sunday?"
            },
            operating: {
                actionLog: [
                    ["9:00 AM", "Sunday Meal Prep triggered"],
                    ["9:02 AM", "Calendar and memories checked"],
                    ["9:05 AM", "Meal plan created"],
                    ["9:08 AM", "Uber Groceries cart prepared"],
                    ["9:11 AM", "Approval received"],
                    ["9:12 AM", "Order placed · ETA 4:00 PM"]
                ],
                artifacts: ["Weekly meal plan", "Grocery receipt", "Lemon chicken recipe", "Turkey taco recipe", "Veggie pasta recipe"],
                mealPlan: [
                    ["Mon", "Lemon chicken bowls"],
                    ["Tue", "Turkey tacos"],
                    ["Wed", "Veggie pasta"],
                    ["Thu", "Salmon rice plates"],
                    ["Fri", "Leftover night"]
                ],
                order: {
                    arrival: "4:00 PM",
                    itemCount: "34 items",
                    provider: "Uber Groceries",
                    status: "Order placed"
                },
                routineTitle: "Sunday Meal Prep",
                status: "Running now"
            }
        },
        threadSets: {
            conversation: ["Lower monthly bills", "Summarize these notes", "Follow up with everyone from the party", "Research options and make a recommendation"],
            planning: ["Sunday meal prep", "Weekly schedule", "School fundraiser", "API migration notes"]
        },
        threadsLabel: "THREADS"
    },
    themes: [
        { label: "System", value: "system" },
        { label: "Dark", value: "dark" },
        { label: "Light", value: "light" },
        { label: "Rust", value: "rust" }
    ],
    themeMenu: {
        optionAriaLabelPrefix: "Use",
        optionAriaLabelSuffix: "theme",
        themeOptionsAriaLabel: "Theme options",
        triggerLabelPrefix: "Theme:"
    },
    trust: {
        body: "Nue is designed so your agent can become more useful over time without turning your life into someone else's dataset. You choose what it remembers, where your context lives, which tools it can use, and when it needs your approval.",
        eyebrow: "BUILT AROUND YOU",
        principles: [
            { body: "Your memory, routines, and connected context are private by default. Nue minimizes exposure, asks before sensitive actions, and keeps your data under your control.", principle: "Privacy first" },
            { body: "The most personal parts of your agent should stay close to you. Nue is built for local-first memory, portable workflows, and bring-your-own-key control instead of platform lock-in.", principle: "Local first" },
            { body: "Nue works for you, not around you. It shows its plans, waits at approval points, keeps a run history, and lets you change or stop routines whenever you need.", principle: "You first" }
        ],
        title: "Powerful agents should still feel personal, private, and yours."
    },
    download: {
        body: "Download the early access release for an open-source, privacy-first agent workspace that keeps memory, workflows, and approvals under your control.",
        cta: "Download early access release",
        eyebrow: "EARLY ACCESS RELEASE",
        href: "/download",
        title: "Start with chat. Build your agent OS."
    }
} as const;

export type HomeCopy = typeof homeCopy;
export type PrincipleCardType = HomeCopy["principles"]["cards"][number]["type"];
export type ProductChapter = HomeCopy["product"]["chapters"][number];
