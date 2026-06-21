import type { CSSProperties, ReactNode } from "react";

import styles from "./primary-cta-link.module.css";

type PrimaryCtaLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
};

type PrimaryCtaButtonProps = {
  "aria-label": string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
};

export function PrimaryCtaLink({ children, className = "", href }: PrimaryCtaLinkProps) {
  return (
    <PrimaryCtaChrome className={className}>
      <a className={styles.button} href={href}>
        <span>{children}</span>
      </a>
    </PrimaryCtaChrome>
  );
}

export function PrimaryCtaButton({ "aria-label": ariaLabel, children, className = "", disabled = false, onClick, style, type = "button" }: PrimaryCtaButtonProps) {
  return (
    <PrimaryCtaChrome className={className} style={style}>
      <button aria-label={ariaLabel} className={styles.button} disabled={disabled} onClick={onClick} type={type}>
        <span>{children}</span>
      </button>
    </PrimaryCtaChrome>
  );
}

function PrimaryCtaChrome({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <span className={[styles.wrap, className].filter(Boolean).join(" ")} style={style}>
      {children}
      <svg aria-hidden="true" className={styles.prismFilters} focusable="false">
        <filter id="nous-cta-edge-displace-red">
          <feTurbulence baseFrequency="0.58 0.92" numOctaves="1" result="noise" seed="7" type="fractalNoise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.55" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="nous-cta-edge-displace-green">
          <feTurbulence baseFrequency="0.44 0.8" numOctaves="1" result="noise" seed="13" type="fractalNoise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.45" xChannelSelector="G" yChannelSelector="B" />
        </filter>
        <filter id="nous-cta-edge-displace-blue">
          <feTurbulence baseFrequency="0.62 0.74" numOctaves="1" result="noise" seed="23" type="fractalNoise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.55" xChannelSelector="B" yChannelSelector="R" />
        </filter>
      </svg>
      <span aria-hidden="true" className={styles.edgeShine}>
        <span className={`${styles.edgeChannel} ${styles.edgeChannelRed}`} />
        <span className={`${styles.edgeChannel} ${styles.edgeChannelGreen}`} />
        <span className={`${styles.edgeChannel} ${styles.edgeChannelBlue}`} />
      </span>
      <span aria-hidden="true" className={styles.edgePrism} />
      <span aria-hidden="true" className={styles.prism} />
      <span aria-hidden="true" className={styles.shadow} />
    </span>
  );
}
