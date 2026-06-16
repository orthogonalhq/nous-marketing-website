import {
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    BotMessageSquare,
    Box,
    Captions,
    ChevronDown,
    Database,
    DatabaseZap,
    Flag,
    Funnel,
    History,
    House,
    Inbox,
    Menu,
    MessagesSquare,
    Mic,
    Minus,
    MoveLeft,
    MoveRight,
    Network,
    PanelLeftClose,
    PanelRight,
    PanelRightClose,
    Paperclip,
    PhoneForwarded,
    Play,
    Podcast,
    Plus,
    Search,
    Settings,
    Smartphone,
    Sparkle,
    Sparkles,
    Square,
    SquareCode,
    SquarePen,
    SquarePlus,
    SquareSlash,
    Terminal,
    Timeline,
    UserRound,
    UserRoundPen,
    Workflow,
    X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "./utils";

const glyphs = {
    add: Plus,
    agent: UserRoundPen,
    arrow: ArrowRight,
    back: ArrowLeft,
    bolt: Sparkles,
    box: Box,
    captions: Captions,
    chat: MessagesSquare,
    assetChat: BotMessageSquare,
    chevronDown: ChevronDown,
    close: X,
    cli: Terminal,
    database: Database,
    databaseZap: DatabaseZap,
    developer: SquareCode,
    edit: SquarePen,
    filter: Funnel,
    flag: Flag,
    historyClock: History,
    home: House,
    inbox: Inbox,
    menu: Menu,
    mic: Mic,
    minimize: Minus,
    mobile: Smartphone,
    moveLeft: MoveLeft,
    moveRight: MoveRight,
    network: Network,
    nous: Podcast,
    panelClose: PanelLeftClose,
    paperclip: Paperclip,
    phone: PhoneForwarded,
    play: Play,
    pulse: Sparkle,
    search: Search,
    send: ArrowUp,
    settings: Settings,
    square: Square,
    squarePlus: SquarePlus,
    squareSlash: SquareSlash,
    user: UserRound,
    workflow: Workflow,
    history: Timeline,
    timeline: Timeline,
    panel: PanelRight,
    panelRightClose: PanelRightClose
} satisfies Record<string, LucideIcon>;

export type GlyphName = keyof typeof glyphs;

export function Glyph({ className, name, strokeWidth = 1.9 }: { className?: string; name: GlyphName; strokeWidth?: number | string }) {
    const Icon = glyphs[name];
    const strokeStyle = typeof strokeWidth === "string" ? { strokeWidth } : undefined;
    const strokeWidthAttribute = typeof strokeWidth === "number" ? strokeWidth : undefined;

    return (
        <span aria-hidden="true" className={cn("inline-flex size-4 items-center justify-center", className)}>
            <Icon className="size-full" strokeWidth={strokeWidthAttribute} style={strokeStyle} />
        </span>
    );
}

export function DisclosureTriangle({ className }: { className?: string }) {
    return (
        <span aria-hidden="true" className={cn("inline-flex h-2 w-2.5 items-center justify-center", className)}>
            <svg className="size-full" fill="none" viewBox="0 0 10 8" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 8L0.669873 0.5L9.33013 0.500001L5 8Z" fill="currentColor" />
            </svg>
        </span>
    );
}
