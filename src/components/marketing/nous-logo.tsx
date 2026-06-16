import { cn } from "@/lib/cn";
import styles from "./nous-logo.module.css";

const markPathLeft = "M8.5,76.1h0v-42.7c0-11.4,0-17.4,6.3-23.6s8.9-4.7,23.1-4.7v23.6c0,1.7,0,3.5,0,5.1,0,31.4-14.8,42.3-29.4,42.2Z";
const markStar = "39.3 61 41.2 66.8 47.3 66.8 42.4 70.4 44.2 76.1 39.3 72.6 34.4 76.1 36.3 70.4 31.3 66.8 37.4 66.8 39.3 61";
const markPathRight = "M70.3,76.1h0v-42.7c0-11.4,0-17.4-6.3-23.6s-8.9-4.7-23.1-4.7v23.6c0,1.7,0,3.5,0,5.1,0,31.4,14.8,42.3,29.4,42.2Z";

function LogoShape({ className }: { className?: string }) {
    return (
        <g className={className}>
            <path d={markPathLeft} />
            <polygon points={markStar} />
            <path d={markPathRight} />
        </g>
    );
}

export function NueLogoMark({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            className={cn(styles.mark, className)}
            viewBox="0 0 78.8 81.3"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <mask id="nous-logo-mark-mask">
                    <rect fill="black" height="81.3" width="78.8" />
                    <LogoShape className="fill-white" />
                </mask>
                <linearGradient id="nous-logo-sheen" x1="-8" x2="86" y1="72" y2="8" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="transparent" />
                    <stop offset="0.42" stopColor="var(--nous-primary-cta-prism-red)" stopOpacity="0.14" />
                    <stop offset="0.48" stopColor="var(--nous-primary-cta-prism-green)" stopOpacity="0.2" />
                    <stop offset="0.54" stopColor="var(--nous-primary-cta-prism-blue)" stopOpacity="0.18" />
                    <stop offset="0.59" stopColor="var(--nous-primary-cta-prism-white)" stopOpacity="0.5" />
                    <stop offset="1" stopColor="transparent" />
                </linearGradient>
            </defs>
            <LogoShape className={styles.prismRed} />
            <LogoShape className={styles.prismGreen} />
            <LogoShape className={styles.prismBlue} />
            <LogoShape className={styles.edgeRed} />
            <LogoShape className={styles.edgeGreen} />
            <LogoShape className={styles.edgeBlue} />
            <LogoShape className={styles.base} />
            <rect className={styles.sheen} fill="url(#nous-logo-sheen)" height="81.3" mask="url(#nous-logo-mark-mask)" width="78.8" />
        </svg>
    );
}

export function NueWordmark({ className }: { className?: string }) {
    return (
        <span className={cn("text-xl font-semibold leading-none tracking-[-0.045em]", className)}>
            Nue
        </span>
    );
}
