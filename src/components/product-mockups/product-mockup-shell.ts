export const productMockupFrameHeightClassName = "h-[var(--nous-home-chat-frame-height)]";

export const productMockupLazyShellClassNameByMode = {
    static: "max-md:h-[var(--nous-product-mockup-mobile-shell-height,270px)] max-md:min-h-0 md:min-h-[var(--nous-home-chat-frame-height)]",
    storyboard: "max-md:h-[var(--nous-product-mockup-mobile-shell-height,312px)] max-md:min-h-0 md:min-h-[calc(var(--nous-home-chat-frame-height)+2.5rem)]"
} as const;

export type ProductMockupShellMode = keyof typeof productMockupLazyShellClassNameByMode;
