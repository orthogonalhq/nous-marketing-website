type PrincipleIllustration = "simple" | "capable" | "yours";

export function PrincipleCardIllustration({ type }: { type: PrincipleIllustration }) {
    if (type === "simple") {
        return (
            <svg aria-hidden="true" className="h-40 w-full text-[var(--nous-fg-quieter)]" fill="none" viewBox="0 0 640 360">
                <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="simple-panel-fade" x1="214" x2="514" y1="62" y2="302">
                        <stop stopColor="currentColor" stopOpacity="0.2" />
                        <stop offset="0.55" stopColor="currentColor" stopOpacity="0.08" />
                        <stop offset="1" stopColor="currentColor" stopOpacity="0.02" />
                    </linearGradient>
                    <linearGradient gradientUnits="userSpaceOnUse" id="simple-line-fade" x1="94" x2="548" y1="180" y2="180">
                        <stop stopColor="currentColor" stopOpacity="0" />
                        <stop offset="0.22" stopColor="currentColor" stopOpacity="0.32" />
                        <stop offset="0.48" stopColor="currentColor" stopOpacity="0.72" />
                        <stop offset="0.72" stopColor="currentColor" stopOpacity="0.34" />
                        <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                    <radialGradient cx="0" cy="0" gradientTransform="translate(286 180) rotate(90) scale(128 116)" gradientUnits="userSpaceOnUse" id="simple-aperture-glow" r="1">
                        <stop stopColor="currentColor" stopOpacity="0.22" />
                        <stop offset="0.45" stopColor="currentColor" stopOpacity="0.08" />
                        <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                    </radialGradient>
                    <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="276" id="simple-soft-blur" width="568" x="36" y="42">
                        <feGaussianBlur stdDeviation="18" />
                    </filter>
                    <clipPath id="simple-aperture-clip">
                        <path d="M286 70C331.287 70 368 119.249 368 180C368 240.751 331.287 290 286 290C240.713 290 204 240.751 204 180C204 119.249 240.713 70 286 70Z" />
                    </clipPath>
                </defs>

                <rect fill="currentColor" fillOpacity="0.025" height="204" rx="34" width="488" x="76" y="78" />
                <rect height="203" rx="33.5" stroke="currentColor" strokeOpacity="0.08" width="487" x="76.5" y="78.5" />

                <g filter="url(#simple-soft-blur)">
                    <ellipse cx="286" cy="180" fill="url(#simple-aperture-glow)" rx="88" ry="116" />
                    <rect fill="currentColor" fillOpacity="0.08" height="168" rx="26" width="142" x="372" y="96" />
                </g>

                <path d="M96 181C126 157 151 154 174 171C196 188 217 189 242 169C268 148 293 148 319 170C345 192 370 192 396 171C421 151 447 151 472 171C495 190 519 190 548 169" stroke="url(#simple-line-fade)" strokeLinecap="round" strokeWidth="12" />
                <path d="M96 181C126 157 151 154 174 171C196 188 217 189 242 169C268 148 293 148 319 170C345 192 370 192 396 171C421 151 447 151 472 171C495 190 519 190 548 169" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.12" strokeWidth="1.5" />

                <g clipPath="url(#simple-aperture-clip)">
                    <path d="M196 180H374" stroke="currentColor" strokeOpacity="0.18" strokeWidth="72" />
                    <path d="M196 180H374" stroke="currentColor" strokeOpacity="0.34" strokeWidth="32" />
                    <path d="M196 180H374" stroke="currentColor" strokeOpacity="0.74" strokeWidth="4" />
                </g>

                <path d="M286 70C331.287 70 368 119.249 368 180C368 240.751 331.287 290 286 290C240.713 290 204 240.751 204 180C204 119.249 240.713 70 286 70Z" fill="url(#simple-aperture-glow)" />
                <path d="M286 70C331.287 70 368 119.249 368 180C368 240.751 331.287 290 286 290C240.713 290 204 240.751 204 180C204 119.249 240.713 70 286 70Z" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
                <path d="M286 102C318.033 102 344 136.922 344 180C344 223.078 318.033 258 286 258C253.967 258 228 223.078 228 180C228 136.922 253.967 102 286 102Z" stroke="currentColor" strokeOpacity="0.12" />
                <path d="M286 132C305.882 132 322 153.49 322 180C322 206.51 305.882 228 286 228C266.118 228 250 206.51 250 180C250 153.49 266.118 132 286 132Z" stroke="currentColor" strokeOpacity="0.1" />

                <rect fill="url(#simple-panel-fade)" height="172" rx="24" width="136" x="392" y="94" />
                <rect height="171" rx="23.5" stroke="currentColor" strokeOpacity="0.16" width="135" x="392.5" y="94.5" />
                <rect fill="currentColor" fillOpacity="0.22" height="12" rx="6" width="88" x="416" y="120" />
                <rect fill="currentColor" fillOpacity="0.1" height="8" rx="4" width="62" x="416" y="148" />
                <rect fill="currentColor" fillOpacity="0.12" height="8" rx="4" width="80" x="416" y="166" />
                <rect fill="currentColor" fillOpacity="0.08" height="34" rx="9" width="34" x="416" y="196" />
                <rect fill="currentColor" fillOpacity="0.12" height="34" rx="9" width="42" x="462" y="196" />
                <path d="M416 246H504" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.12" strokeWidth="8" />

                <g opacity="0.72">
                    <rect height="108" rx="17" stroke="currentColor" strokeOpacity="0.12" width="34" x="338" y="126" />
                    <rect fill="currentColor" fillOpacity="0.2" height="68" rx="3" width="6" x="352" y="146" />
                </g>
                <path d="M124 114H168" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.12" strokeWidth="8" />
                <path d="M126 246H184" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.08" strokeWidth="8" />
                <path d="M548 126H516" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.1" strokeWidth="8" />
            </svg>
        );
    }

    if (type === "capable") {
        return (
            <svg aria-hidden="true" className="h-40 w-full text-[var(--nous-fg-quieter)]" fill="none" viewBox="0 0 640 360">
                <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="capable-rail-fade" x1="88" x2="552" y1="0" y2="0">
                        <stop stopColor="currentColor" stopOpacity="0" />
                        <stop offset="0.16" stopColor="currentColor" stopOpacity="0.26" />
                        <stop offset="0.5" stopColor="currentColor" stopOpacity="0.5" />
                        <stop offset="0.84" stopColor="currentColor" stopOpacity="0.26" />
                        <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient gradientUnits="userSpaceOnUse" id="capable-path-glow" x1="104" x2="532" y1="204" y2="116">
                        <stop stopColor="currentColor" stopOpacity="0.08" />
                        <stop offset="0.48" stopColor="currentColor" stopOpacity="0.72" />
                        <stop offset="1" stopColor="currentColor" stopOpacity="0.16" />
                    </linearGradient>
                    <linearGradient gradientUnits="userSpaceOnUse" id="capable-mask-fade" x1="70" x2="570" y1="0" y2="0">
                        <stop stopColor="black" />
                        <stop offset="0.12" stopColor="white" />
                        <stop offset="0.88" stopColor="white" />
                        <stop offset="1" stopColor="black" />
                    </linearGradient>
                    <radialGradient cx="0" cy="0" gradientTransform="translate(332 170) rotate(90) scale(122 214)" gradientUnits="userSpaceOnUse" id="capable-core-glow" r="1">
                        <stop stopColor="currentColor" stopOpacity="0.2" />
                        <stop offset="0.55" stopColor="currentColor" stopOpacity="0.06" />
                        <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                    </radialGradient>
                    <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="292" id="capable-soft-blur" width="544" x="48" y="34">
                        <feGaussianBlur stdDeviation="18" />
                    </filter>
                    <mask id="capable-edge-mask">
                        <rect fill="url(#capable-mask-fade)" height="360" width="640" />
                    </mask>
                </defs>

                <g mask="url(#capable-edge-mask)">
                    <ellipse cx="332" cy="170" fill="url(#capable-core-glow)" filter="url(#capable-soft-blur)" rx="214" ry="122" />
                    <path d="M92 106H548" stroke="url(#capable-rail-fade)" strokeWidth="1.4" />
                    <path d="M92 146H548" stroke="url(#capable-rail-fade)" strokeWidth="1.4" />
                    <path d="M92 186H548" stroke="url(#capable-rail-fade)" strokeWidth="1.4" />
                    <path d="M92 226H548" stroke="url(#capable-rail-fade)" strokeWidth="1.4" />
                    <path d="M132 78V270" stroke="currentColor" strokeOpacity="0.08" />
                    <path d="M212 78V270" stroke="currentColor" strokeOpacity="0.1" />
                    <path d="M292 78V270" stroke="currentColor" strokeOpacity="0.12" />
                    <path d="M372 78V270" stroke="currentColor" strokeOpacity="0.12" />
                    <path d="M452 78V270" stroke="currentColor" strokeOpacity="0.1" />
                    <path d="M532 78V270" stroke="currentColor" strokeOpacity="0.08" />

                    <rect fill="currentColor" fillOpacity="0.035" height="176" rx="17" width="34" x="182" y="82" />
                    <rect fill="currentColor" fillOpacity="0.055" height="208" rx="23" width="46" x="282" y="66" />
                    <rect fill="currentColor" fillOpacity="0.04" height="160" rx="19" width="38" x="424" y="90" />

                    <rect height="50" rx="11" stroke="currentColor" strokeOpacity="0.24" strokeWidth="1.5" width="22" x="188" y="96" />
                    <rect height="70" rx="11" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.5" width="22" x="188" y="166" />
                    <rect height="54" rx="11" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5" width="22" x="294" y="82" />
                    <rect height="82" rx="11" stroke="currentColor" strokeOpacity="0.34" strokeWidth="1.5" width="22" x="294" y="154" />
                    <rect height="64" rx="11" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" width="22" x="432" y="104" />
                    <rect height="46" rx="11" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" width="22" x="432" y="190" />

                    <path d="M104 204C146 204 154 186 190 186H260C286 186 290 214 316 214H374C410 214 406 126 444 126H532" stroke="url(#capable-path-glow)" strokeLinecap="round" strokeWidth="7" />
                    <path d="M104 204C146 204 154 186 190 186H260C286 186 290 214 316 214H374C410 214 406 126 444 126H532" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.42" strokeWidth="1.5" />

                    <rect fill="currentColor" fillOpacity="0.34" height="14" rx="7" width="34" x="116" y="197" />
                    <rect fill="currentColor" fillOpacity="0.26" height="14" rx="7" width="42" x="236" y="179" />
                    <rect fill="currentColor" fillOpacity="0.38" height="14" rx="7" width="50" x="328" y="207" />
                    <rect fill="currentColor" fillOpacity="0.3" height="14" rx="7" width="38" x="470" y="119" />

                    <circle cx="190" cy="186" fill="currentColor" fillOpacity="0.42" r="4" />
                    <circle cx="316" cy="214" fill="currentColor" fillOpacity="0.5" r="4" />
                    <circle cx="444" cy="126" fill="currentColor" fillOpacity="0.46" r="4" />
                    <path d="M156 286H484" stroke="currentColor" strokeOpacity="0.09" />
                    <path d="M214 300H426" stroke="currentColor" strokeOpacity="0.06" />
                </g>
            </svg>
        );
    }

    return (
        <svg aria-hidden="true" className="h-40 w-full text-[var(--nous-fg-quieter)]" fill="none" viewBox="0 0 640 360">
            <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="yours-fade-x" x1="92" x2="548" y1="0" y2="0">
                    <stop stopColor="currentColor" stopOpacity="0" />
                    <stop offset="0.18" stopColor="currentColor" stopOpacity="0.34" />
                    <stop offset="0.82" stopColor="currentColor" stopOpacity="0.34" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="yours-panel-sheen" x1="154" x2="486" y1="58" y2="304">
                    <stop stopColor="currentColor" stopOpacity="0.18" />
                    <stop offset="0.48" stopColor="currentColor" stopOpacity="0.06" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0.14" />
                </linearGradient>
                <radialGradient cx="0" cy="0" gradientTransform="translate(320 180) rotate(90) scale(150 230)" gradientUnits="userSpaceOnUse" id="yours-center-glow" r="1">
                    <stop stopColor="currentColor" stopOpacity="0.16" />
                    <stop offset="0.58" stopColor="currentColor" stopOpacity="0.05" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </radialGradient>
                <pattern height="32" id="yours-grid" patternUnits="userSpaceOnUse" width="32">
                    <path d="M32 0H0V32" stroke="currentColor" strokeOpacity="0.055" />
                </pattern>
                <radialGradient cx="0" cy="0" gradientTransform="translate(320 180) rotate(90) scale(176 282)" gradientUnits="userSpaceOnUse" id="yours-mask-gradient" r="1">
                    <stop stopColor="white" />
                    <stop offset="0.72" stopColor="white" />
                    <stop offset="1" stopColor="black" />
                </radialGradient>
                <mask id="yours-soft-mask">
                    <rect fill="url(#yours-mask-gradient)" height="360" width="640" />
                </mask>
            </defs>

            <g mask="url(#yours-soft-mask)">
                <rect fill="url(#yours-center-glow)" height="288" rx="36" width="480" x="80" y="36" />
                <rect fill="url(#yours-grid)" height="256" rx="32" width="416" x="112" y="52" />
                <rect fill="currentColor" fillOpacity="0.035" height="244" rx="36" stroke="currentColor" strokeOpacity="0.24" width="388" x="126" y="58" />
                <rect fill="url(#yours-panel-sheen)" height="204" rx="28" stroke="currentColor" strokeOpacity="0.18" width="348" x="146" y="78" />

                <path d="M170 126H470" stroke="url(#yours-fade-x)" strokeWidth="1.5" />
                <path d="M170 234H470" stroke="url(#yours-fade-x)" strokeWidth="1.5" />
                <path d="M230 92V268" stroke="currentColor" strokeOpacity="0.08" />
                <path d="M410 92V268" stroke="currentColor" strokeOpacity="0.08" />

                <rect fill="currentColor" fillOpacity="0.08" height="64" rx="14" stroke="currentColor" strokeOpacity="0.2" width="104" x="178" y="108" />
                <rect fill="currentColor" fillOpacity="0.24" height="5" rx="2.5" width="46" x="196" y="126" />
                <rect fill="currentColor" fillOpacity="0.13" height="4" rx="2" width="68" x="196" y="140" />
                <rect fill="currentColor" fillOpacity="0.1" height="4" rx="2" width="38" x="196" y="152" />
                <rect fill="currentColor" fillOpacity="0.065" height="64" rx="14" stroke="currentColor" strokeOpacity="0.18" width="104" x="358" y="108" />
                <rect fill="currentColor" fillOpacity="0.22" height="5" rx="2.5" width="52" x="376" y="126" />
                <rect fill="currentColor" fillOpacity="0.12" height="4" rx="2" width="66" x="376" y="140" />
                <rect fill="currentColor" fillOpacity="0.1" height="4" rx="2" width="34" x="376" y="152" />
                <rect fill="currentColor" fillOpacity="0.055" height="54" rx="14" stroke="currentColor" strokeOpacity="0.16" width="88" x="196" y="206" />
                <rect fill="currentColor" fillOpacity="0.2" height="5" rx="2.5" width="40" x="214" y="224" />
                <rect fill="currentColor" fillOpacity="0.1" height="4" rx="2" width="52" x="214" y="238" />
                <rect fill="currentColor" fillOpacity="0.055" height="54" rx="14" stroke="currentColor" strokeOpacity="0.16" width="88" x="356" y="206" />
                <rect fill="currentColor" fillOpacity="0.2" height="5" rx="2.5" width="40" x="374" y="224" />
                <rect fill="currentColor" fillOpacity="0.1" height="4" rx="2" width="52" x="374" y="238" />

                <rect fill="currentColor" fillOpacity="0.09" height="92" rx="24" stroke="currentColor" strokeOpacity="0.28" width="92" x="274" y="134" />
                <rect fill="currentColor" fillOpacity="0.06" height="56" rx="16" stroke="currentColor" strokeOpacity="0.2" width="56" x="292" y="152" />
                <path d="M306 180H334M320 166V194" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.34" strokeWidth="2" />

                <path d="M282 140C304 140 304 158 320 158" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.28" strokeWidth="2" />
                <path d="M358 140C336 140 336 158 320 158" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.22" strokeWidth="2" />
                <path d="M284 232C306 232 306 202 320 202" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.18" strokeWidth="2" />
                <path d="M356 232C334 232 334 202 320 202" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.18" strokeWidth="2" />

                <rect fill="currentColor" fillOpacity="0.18" height="10" rx="5" width="32" x="304" y="118" />
                <rect fill="currentColor" fillOpacity="0.14" height="10" rx="5" width="32" x="304" y="232" />
                <rect fill="currentColor" fillOpacity="0.14" height="32" rx="5" width="10" x="244" y="176" />
                <rect fill="currentColor" fillOpacity="0.14" height="32" rx="5" width="10" x="386" y="176" />

                <path d="M146 150V114C146 94.1177 162.118 78 182 78H218" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.28" strokeWidth="2" />
                <path d="M494 210V246C494 265.882 477.882 282 458 282H422" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.24" strokeWidth="2" />
                <path d="M146 210V246C146 265.882 162.118 282 182 282H218" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.14" strokeWidth="2" />
                <path d="M494 150V114C494 94.1177 477.882 78 458 78H422" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.14" strokeWidth="2" />

                <rect fill="currentColor" fillOpacity="0.035" height="70" rx="16" stroke="currentColor" strokeOpacity="0.11" width="42" x="72" y="145" />
                <rect fill="currentColor" fillOpacity="0.035" height="70" rx="16" stroke="currentColor" strokeOpacity="0.11" width="42" x="526" y="145" />
                <path d="M114 180H146" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.14" strokeWidth="2" />
                <path d="M494 180H526" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.14" strokeWidth="2" />
            </g>
        </svg>
    );
}
