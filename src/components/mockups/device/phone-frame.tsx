import type { ReactNode } from "react";

import { AmbientLayer } from "@/components/mockups/surface";
import { cn } from "@/lib/cn";

export function PhoneFrame({ children, className, id, labelledBy, role }: {
    children: ReactNode;
    className?: string;
    id?: string;
    labelledBy?: string;
    role?: string;
}) {
    return (
        <div
            aria-labelledby={labelledBy}
            className={cn(
                "relative overflow-hidden rounded-[var(--nous-device-phone-frame-radius)] border border-[color:var(--nous-device-phone-frame-border)] bg-[var(--nous-device-phone-bezel-bg)] p-[var(--nous-device-phone-frame-padding)] shadow-[var(--nous-device-phone-shadow)]",
                className
            )}
            data-companion-iphone-frame="true"
            id={id}
            role={role}
        >
            <AmbientLayer className="bg-[image:var(--nous-home-chat-sidebar-radial-bg)]" />
            <PhoneHardwareButton className="left-[-3px] top-28 h-12 w-1 rounded-l-full" />
            <PhoneHardwareButton className="left-[-3px] top-44 h-16 w-1 rounded-l-full" />
            <PhoneHardwareButton className="right-[-3px] top-36 h-20 w-1 rounded-r-full" />
            <PhoneNotch />
            <PhoneCameraDot />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

export function PhoneScreen({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div
            className={cn(
                "relative flex min-h-[var(--nous-device-phone-screen-min-height)] w-full flex-col overflow-hidden rounded-[var(--nous-device-phone-screen-radius)] border border-[color:var(--nous-device-phone-screen-border)] [background:var(--nous-chat-canvas-bg)] shadow-[inset_0_1px_0_var(--nous-stroke-ghost)]",
                className
            )}
        >
            <AmbientLayer className="bg-[var(--nous-chat-canvas-radial-bg)]" insetClassName="inset-x-0 top-0 h-40" />
            {children}
        </div>
    );
}

function PhoneHardwareButton({ className }: { className: string }) {
    return <span aria-hidden="true" className={cn("absolute bg-[var(--nous-device-phone-bezel-bg)]", className)} />;
}

function PhoneNotch() {
    return (
        <span
            aria-hidden="true"
            className="absolute left-1/2 top-4 z-20 h-[var(--nous-device-phone-notch-height)] w-[var(--nous-device-phone-notch-width)] -translate-x-1/2 rounded-full bg-[var(--nous-device-phone-bezel-bg)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]"
        />
    );
}

function PhoneCameraDot() {
    return (
        <span
            aria-hidden="true"
            className="absolute left-[calc(50%+2.35rem)] top-[1.45rem] z-30 size-[var(--nous-device-phone-camera-size)] rounded-full bg-zinc-800"
        />
    );
}
