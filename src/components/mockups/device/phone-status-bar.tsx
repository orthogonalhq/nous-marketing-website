"use client";

import { useEffect, useState } from "react";

export function formatCompanionStatusTime(date: Date) {
    const parts = new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit"
    }).formatToParts(date);
    const hour = parts.find((part) => part.type === "hour")?.value ?? String(date.getHours());
    const minute = parts.find((part) => part.type === "minute")?.value ?? String(date.getMinutes()).padStart(2, "0");
    const separator = parts.find((part) => part.type === "literal")?.value.trim() || ":";

    return `${hour}${separator}${minute}`;
}

export function CompanionIphoneStatusBar() {
    const [statusTime, setStatusTime] = useState("");

    useEffect(() => {
        const updateStatusTime = () => {
            setStatusTime(formatCompanionStatusTime(new Date()));
        };

        updateStatusTime();

        const now = new Date();
        const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
        let minuteInterval: number | undefined;
        const nextMinuteTimeout = window.setTimeout(() => {
            updateStatusTime();
            minuteInterval = window.setInterval(updateStatusTime, 60_000);
        }, msUntilNextMinute);

        return () => {
            window.clearTimeout(nextMinuteTimeout);
            if (minuteInterval !== undefined) {
                window.clearInterval(minuteInterval);
            }
        };
    }, []);

    return (
        <div aria-hidden="true" className="absolute inset-x-[var(--nous-device-status-inset-x)] top-[var(--nous-device-status-top)] z-30 flex h-[var(--nous-device-status-height)] items-center justify-between text-[length:var(--nous-device-status-font-size)] font-semibold tabular-nums text-[var(--nous-fg-title)]" data-companion-iphone-status-bar="true">
            <span className="pl-1">{statusTime || "—:—"}</span>
            <div className="flex h-4 items-center gap-[5px] pr-0.5" data-companion-iphone-status-icons="true">
                <StatusCellularIcon />
                <StatusWifiIcon />
                <StatusBatteryIcon />
            </div>
        </div>
    );
}

function StatusCellularIcon() {
    return (
        <svg aria-hidden="true" className="block h-[10.5px] w-[16.227px] shrink-0" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 17 11" xmlns="http://www.w3.org/2000/svg">
            <rect fill="currentColor" height="4" rx="1" width="3" y="7" />
            <rect fill="currentColor" height="6" rx="1" width="3" x="4.65" y="5" />
            <rect fill="currentColor" height="8" rx="1" width="3" x="9.3" y="3" />
            <rect fill="currentColor" height="10" rx="1" width="3" x="14" y="1" />
        </svg>
    );
}

function StatusWifiIcon() {
    return (
        <svg aria-hidden="true" className="block h-[10.5px] w-[14.318px] shrink-0" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 15 11" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.35 3.92C4.96 1.05 10.04 1.05 13.65 3.92" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
            <path d="M4.02 6.58C6 5.14 9 5.14 10.98 6.58" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
            <path d="M7.03 9.05C7.32 8.85 7.68 8.85 7.97 9.05" stroke="currentColor" strokeLinecap="round" strokeWidth="1.85" />
        </svg>
    );
}

function StatusBatteryIcon() {
    return (
        <svg aria-hidden="true" className="block h-[10.75px] w-[23.455px] shrink-0" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 11" xmlns="http://www.w3.org/2000/svg">
            <rect height="9" rx="2.6" stroke="currentColor" strokeWidth="1" width="20.8" x="0.7" y="1" />
            <rect fill="currentColor" height="5" rx="1.25" width="15.5" x="3" y="3" />
            <rect fill="currentColor" height="3.8" rx="0.8" width="1.6" x="22" y="3.6" />
        </svg>
    );
}
