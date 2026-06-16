export const productMockupFrameHeightClassName = "h-[var(--nous-home-chat-frame-height)]";

export const productMockupLazyShellClassNameByMode = {
    static: "min-h-[var(--nous-home-chat-frame-height)]",
    storyboard: "min-h-[calc(var(--nous-home-chat-frame-height)+2.5rem)]"
} as const;

export type ProductMockupShellMode = keyof typeof productMockupLazyShellClassNameByMode;
