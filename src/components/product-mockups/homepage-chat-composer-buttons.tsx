import type { KeyboardEvent, MouseEvent } from "react";

import { Glyph } from "@/components/design-system/mockup/components";
import { cn } from "@/lib/cn";

type HomepageChatComposerTrailingActionsProps = {
    isSendReady: boolean;
    onSend?: (event: MouseEvent<HTMLButtonElement>) => void;
    onSendKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
    sendLabel?: string;
};

export function HomepageChatComposerLeadingActions() {
    return (
        <>
            <Glyph
                className={cn(
                    "h-[var(--nous-home-chat-command-add-icon-height)]",
                    "w-[var(--nous-home-chat-command-add-icon-width)]"
                )}
                name="add"
                strokeWidth="var(--nous-home-chat-icon-stroke-command)"
            />
            <Glyph
                className={cn(
                    "h-[var(--nous-home-chat-command-square-icon-height)]",
                    "w-[var(--nous-home-chat-command-square-icon-width)]"
                )}
                name="squareSlash"
                strokeWidth="var(--nous-home-chat-icon-stroke-command)"
            />
        </>
    );
}

export function HomepageChatComposerTrailingActions({
    isSendReady,
    onSend,
    onSendKeyDown,
    sendLabel = "Send storyboard message"
}: HomepageChatComposerTrailingActionsProps) {
    return (
        <>
            <Glyph
                className={cn(
                    "h-[var(--nous-home-chat-command-mic-icon-height)]",
                    "w-[var(--nous-home-chat-command-mic-icon-width)]"
                )}
                name="mic"
                strokeWidth="var(--nous-home-chat-icon-stroke-command)"
            />
            <button
                aria-disabled={!isSendReady}
                aria-label={sendLabel}
                className={cn(
                    "grid size-[var(--nous-composer-send-button-size)] place-items-center",
                    "rounded-[var(--nous-control-radius-md)] border transition-[background,border-color,color,box-shadow,transform] duration-200",
                    isSendReady
                        ? "nous-home-chat-send-button-ready border-transparent bg-[var(--nous-composer-send-ready-bg)] text-[var(--nous-composer-send-ready-fg)] shadow-[var(--nous-composer-send-ready-shadow)]"
                        : "border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-control-bg-soft)] text-[var(--nous-fg-primary)]"
                )}
                data-homepage-chat-send-ready={isSendReady}
                onClick={onSend}
                onKeyDown={onSendKeyDown}
                type="button"
            >
                <Glyph
                    className={cn(
                        "h-[var(--nous-home-chat-command-send-icon-height)]",
                        "w-[var(--nous-home-chat-command-send-icon-width)]"
                    )}
                    name="send"
                    strokeWidth="var(--nous-home-chat-icon-stroke-send)"
                />
            </button>
        </>
    );
}
