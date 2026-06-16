import { WorkspaceMockup } from "@/components/design-system/mockup/components";

export function HeroModeTabs() {
  return (
    <section className="reading-container relative mt-12 overflow-visible lg:mt-16">
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-[42rem] w-[72rem] -translate-x-1/2 -translate-y-1/2 bg-[image:var(--nous-page-hero-source-light-bg)] opacity-15"
        data-bg-layer="hero-top-center-source-light"
      /> */}
      <div className="relative z-10">
        <div aria-hidden="true" className="pointer-events-none absolute bottom-4 left-1/2 z-0 h-5 w-[120%] -translate-x-1/2 rounded-full bg-black/25 blur-[40px]" />
        <div className="relative z-10 w-full overflow-hidden pb-6">
          <WorkspaceMockup height={700} />
        </div>
      </div>
    </section>
  );
}
