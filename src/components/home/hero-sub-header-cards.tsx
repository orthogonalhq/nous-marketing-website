import { homeCopy } from "@/content/home-copy";

import styles from "./hero-sub-header-cards.module.css";

export function HeroSubHeaderCards() {
    return (
        <ul className={`${styles.list} nous-mono`} aria-label={homeCopy.hero.principlesAriaLabel}>
            {homeCopy.hero.subHeaderCards.map(({ label, variant }) => (
                <li className={`${styles.wrap} ${variant === "highlight" ? styles.highlight : ""}`} key={label}>
                    <span className={styles.card}>
                        <span className={styles.label}>{label}</span>
                    </span>
                    <span aria-hidden="true" className={styles.edgeShine}>
                        <span className={`${styles.edgeChannel} ${styles.edgeChannelRed}`} />
                        <span className={`${styles.edgeChannel} ${styles.edgeChannelGreen}`} />
                        <span className={`${styles.edgeChannel} ${styles.edgeChannelBlue}`} />
                    </span>
                    <span aria-hidden="true" className={styles.edgePrism} />
                    <span aria-hidden="true" className={styles.prism} />
                    <span aria-hidden="true" className={styles.shadow} />
                </li>
            ))}
        </ul>
    );
}
