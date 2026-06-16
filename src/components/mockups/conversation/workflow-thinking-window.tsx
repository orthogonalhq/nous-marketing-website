"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

type WorkflowThinkingWindowProps = {
    className?: string;
    contentClassName?: string;
    stream?: boolean;
    streamKey?: string;
    text: string;
    thinkingFor?: string;
};

export function WorkflowThinkingWindow({ className, contentClassName, stream = true, streamKey = "workflow-thinking", text, thinkingFor }: WorkflowThinkingWindowProps) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const shouldStickToBottomRef = useRef(true);
    const [streamState, setStreamState] = useState(() => ({
        length: stream ? 0 : text.length,
        streamKey,
        text
    }));
    const visibleLength = stream
        ? streamState.streamKey === streamKey && streamState.text === text
            ? streamState.length
            : 0
        : text.length;
    const visibleText = text.slice(0, visibleLength);

    useEffect(() => {
        if (!stream || text.length === 0) {
            return undefined;
        }

        const interval = window.setInterval(() => {
            setStreamState((currentState) => {
                const currentLength = currentState.streamKey === streamKey && currentState.text === text ? currentState.length : 0;
                const nextLength = Math.min(text.length, currentLength + 3);

                if (nextLength >= text.length) {
                    window.clearInterval(interval);
                }

                return { length: nextLength, streamKey, text };
            });
        }, 24);

        return () => window.clearInterval(interval);
    }, [stream, streamKey, text]);

    useEffect(() => {
        shouldStickToBottomRef.current = true;

        const animationFrame = window.requestAnimationFrame(() => {
            const viewport = viewportRef.current;

            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        });

        return () => window.cancelAnimationFrame(animationFrame);
    }, [streamKey]);

    useEffect(() => {
        if (!shouldStickToBottomRef.current) {
            return undefined;
        }

        const animationFrame = window.requestAnimationFrame(() => {
            const viewport = viewportRef.current;

            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        });

        return () => window.cancelAnimationFrame(animationFrame);
    }, [visibleText]);

    return (
        <div
            aria-label="Current workflow thinking"
            className={cn("overflow-y-auto overscroll-contain pr-1 [scrollbar-gutter:stable]", className)}
            data-running-workflow-thinking-window="true"
            onScroll={() => {
                const viewport = viewportRef.current;

                if (!viewport) {
                    return;
                }

                shouldStickToBottomRef.current = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight <= 4;
            }}
            ref={viewportRef}
            style={{ height: "calc(0.625rem * 1.35 * 3)" }}
            tabIndex={0}
        >
            <p
                className={cn("whitespace-normal text-[0.625rem] font-normal leading-[1.35] text-[var(--nous-drawer-meta-fg)]", contentClassName)}
                data-running-workflow-thinking="true"
                data-running-workflow-thinking-for={thinkingFor}
            >
                {visibleText}
            </p>
        </div>
    );
}
