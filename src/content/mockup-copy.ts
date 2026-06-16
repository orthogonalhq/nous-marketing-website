export const mockupCopy = {
    cards: {
        reviewAction: "Review"
    },
    agentDrawer: {
        ariaLabel: "Client onboarding review drawer",
        changesTitle: "Changes made",
        closeLabel: "Close drawer",
        commandText: "This direction looks good. Show me the revised plan first, then move to the next intake.",
        collapsedOpenLabel: "Open client onboarding review drawer",
        intro: "Tonya asked whether to use your standard 4-week onboarding plan or a lighter first two weeks based on her stated capacity.",
        message: "Why lighter? She seems like a good fit for the standard plan.",
        result: {
            changeRows: [
                ["Created", "Tonya Silverman · 4-week onboarding plan"],
                ["Updated", "Weeks 1–2 to lighter setup and cadence-building"],
                ["Updated", "Welcome email draft with lighter-start language"]
            ],
            details: "I kept weekly accountability check-ins, changed weeks 1–2 to a lighter setup cadence, and left weeks 3–4 on your standard execution rhythm.",
            nothingSent: "Nothing has been sent yet.",
            ready: "The revised plan is ready."
        },
        status: "Worked for 18s",
        suggestedActions: ["Review revised plan", "Approve intake summary", "Open welcome draft", "Ask for changes"],
        suggestedActionsTitle: "Suggested actions",
        tabs: [
            ["nous", "Nue", false],
            ["databaseZap", "Coaching", false],
            ["agent", "Client Onboarding", true]
        ],
        topics: ["Review client intakes", "Approved email drafts", "Clients keep asking", "Follow-ups Paused", "Clients"],
        viewHistoryLabel: "View review history"
    },
    contextPanel: {
        dashboardColumns: {
            attention: "Needs attention",
            insights: "Pulse insights"
        },
        headerTitle: "Client onboarding",
        heroSubtitle: "Automated client intake",
        heroTitle: "Client onboarding",
        settingsLabel: "Settings",
        status: {
            agentCount: "10 Agents",
            running: "Running",
            separator: "·",
            uptime: "73 days of uptime"
        },
        tabs: [
            ["pulse", "Pulse", false],
            ["workflow", "Workflow Editor", true],
            ["history", "History", false]
        ]
    },
    sidebar: {
        collapseLabel: "Collapse asset sidebar",
        editLabel: "Edit coaching workspace",
        footerSettingsLabel: "Workspace settings",
        navAriaLabel: "Workspace navigation",
        primaryItems: [
            ["inbox", "Inbox"],
            ["pulse", "Pulse"]
        ],
        sections: [
            {
                title: "Workflows",
                items: [
                    ["agent", "Client onboarding", true],
                    ["phone", "Cold calling", false],
                    ["paperclip", "Invoicing", false],
                    ["captions", "Content creation", false],
                    ["mobile", "Social media", false]
                ]
            },
            {
                title: "Tasks",
                items: [
                    ["agent", "Morning emails", false],
                    ["phone", "Schedule review", false]
                ]
            },
            {
                title: "Chats",
                items: [
                    ["user", "Tonya Silverman", false],
                    ["user", "Johnathon Richmond", false],
                    ["user", "Alena Maripova", false]
                ]
            }
        ],
        title: "Coaching",
        user: {
            avatarLabel: "Nue",
            name: "Andrew"
        }
    },
    topBar: {
        brand: "Nue",
        createProjectLabel: "Create project",
        projectLabels: {
            coaching: "Coaching",
            home: "Home",
            messages: "Messages"
        },
        searchPlaceholder: "Search...",
        searchShortcut: "⌘ K",
        tabs: {
            chat: "Chat",
            developer: "Developer",
            workspace: "Workspaces"
        }
    },
    updates: {
        closeLabel: "Close workspace updates",
        filterLabel: "Filter",
        title: "Workspace updates",
        tuneLabel: "Tune"
    }
} as const;

export const sidebarSections = mockupCopy.sidebar.sections;

export const attentionCards = [
    ["Review client intakes", "Completed intakes are ready for review.", "1"],
    ["Approve email drafts", "Welcome emails are ready to send. Personalized from goals.", "5"],
    ["Follow-ups paused", "Follow-ups are waiting on your scheduling rules.", "3"]
] as const;

export const insightCards = [
    ["Scheduling is slowing onboarding", "8 clients are waiting on kickoff booking.", "Move calendar selection before the welcome packet."],
    ["Clients keep asking this", "4 recent clients asked whether sessions are recorded.", "Add recording policy to the welcome packet FAQ."],
    ["Higher-touch plans convert faster", "Midweek accountability checks book kickoff calls sooner.", "Make them the default for urgent goals."]
] as const;

export const updateCards = [
    ["Morning emails finished", "Nue replied to 6 routine messages and left 2 client replies for review.", "2 min ago"],
    ["Invoice draft created", "The March coaching invoice is ready for Alena Maripova.", "8 min ago"],
    ["Content idea saved", "Nue pulled a recurring client question into this week's LinkedIn draft queue.", "16 min ago"],
    ["Schedule conflict spotted", "Johnathon Richmond's preferred kickoff time overlaps your blocked writing window.", "21 min ago"],
    ["Cold calling list updated", "12 leads were enriched; 3 look like a strong fit for the executive coaching offer.", "34 min ago"],
    ["Tonya Silverman moved forward", "Her intake summary is complete and waiting in Client onboarding.", "48 min ago"],
    ["Weekly review prepared", "Nue summarized wins, stalled clients, and suggested follow-ups for your Friday review.", "2 hr ago"],
    ["Cold calling list updated", "Removed stale leads and queued 9 new prospects for review.", "3 hr ago"],
    ["Welcome packet revised", "Recording policy language was added to the onboarding FAQ.", "Yesterday"],
    ["Kickoff prep attached", "Prep notes and goals were attached to 2 upcoming kickoff calls.", "2 days ago"]
] as const;
