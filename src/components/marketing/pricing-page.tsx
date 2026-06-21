import { DownloadCtaLink } from "@/components/marketing/download-cta-link";
import { cn } from "@/lib/cn";

const plans = [
  {
    cta: { href: "/download", label: "Download Nue" },
    description: "For running Nue locally with your own model keys and full control.",
    features: ["Open-source local app", "Bring your own model keys", "Local workflows and memory", "No Nue cloud bill"],
    name: "Free",
    price: "$0"
  },
  {
    badge: "For everyday use",
    cta: { href: "/download#waitlist", label: "Join waitlist" },
    description: "For people who want Nue to handle cloud execution and managed model access.",
    features: ["Managed cloud compute", "Managed model access", "Background agent runs", "Usage controls"],
    name: "Pro",
    price: "$20/mo"
  },
  {
    cta: { href: "/download#waitlist", label: "Join waitlist" },
    description: "For heavier workflows, more background runs, and higher managed usage.",
    features: ["More cloud compute", "Higher model usage limits", "Priority routing", "Advanced workflow history"],
    name: "Max",
    price: "$100/mo"
  },
  {
    cta: { href: "mailto:hello@nue.orthg.nl?subject=Nue%20team%20pricing", label: "Contact us" },
    description: "For teams that need shared agents, support, governance, or custom deployment paths.",
    features: ["Shared workspaces", "Admin and support", "Security review", "Custom deployment options"],
    name: "Team / Enterprise",
    price: "Custom"
  }
] as const;

const faqs = [
  ["Can I use Nue for free?", "Yes. Download Nue and run it locally for free. Bring your own model keys or local models, and Nue does not charge you."],
  ["What do paid plans cover?", "Paid plans are for Nue-managed convenience: cloud compute, background agent runs, managed model access, usage controls, support, and team features."],
  ["Can I bring my own model keys?", "Yes. BYOK remains part of the product direction. If you bring your own keys, your provider bills you directly."],
  ["Where did the VPS-style options go?", "Those are advanced deployment paths. We will introduce dedicated compute, SSH, and custom infrastructure later in the funnel for users who need them."],
  ["Are Pro and Max available now?", "They are early-access cloud tiers. You can download Nue now and join the waitlist for managed cloud plans."],
  ["Do you support teams?", "Yes. Team and enterprise needs are handled directly so we can understand security, admin, deployment, and support requirements." ]
] as const;

const eyebrowClass = "nous-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--nous-page-preheader-fg)]";
const sectionTitleClass = "text-balance text-[1.85rem] font-normal leading-[1.05] tracking-[-0.04em] text-[var(--nous-page-title-fg)] sm:text-[2.45rem]";

export function PricingPage() {
  return (
    <>
      <Hero />
      <PlanTiers />
      <CloudExplainer />
      <Faq />
      <PricingCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-14 sm:pb-20 sm:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[image:var(--nous-page-hero-bottom-light-bg)]" />
      <div className="reading-container relative z-10 [--reading-container-max:1180px]">
        <p className={eyebrowClass}>PLANS</p>
        <h1 className="mt-4 max-w-5xl text-balance text-[2.7rem] font-normal leading-[0.98] tracking-[-0.055em] text-[var(--nous-page-hero-title-fg)] sm:text-[3.6rem] lg:text-[4.6rem]">
          Pricing
        </h1>
        <p className="mt-6 max-w-3xl text-balance text-[1.0625rem] leading-7 text-[var(--nous-page-body-fg)] sm:text-lg sm:leading-8">
          Free to run locally. Affordable cloud packages for more complex usage.
        </p>
      </div>
    </section>
  );
}

function PlanTiers() {
  return (
    <section className="border-t border-[color:var(--nous-stroke-subtle)] py-20 sm:py-24" id="plans">
      <div className="reading-container [--reading-container-max:1180px]">
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.slice(0, 3).map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
        <div className="mt-4">
          <EnterprisePlanCard plan={plans[3]} />
        </div>
      </div>
    </section>
  );
}

function PricingCta() {
  return (
    <section className="border-t border-[color:var(--nous-stroke-subtle)] py-20 sm:py-24">
      <div className="reading-container reading-container-narrow rounded-[calc(var(--nous-radius-xl)+8px)] border border-[color:var(--nous-stroke-default)] [background:var(--nous-page-cta-panel-bg)] p-8 text-center shadow-[var(--nous-shadow-drawer)] sm:p-12">
        <p className={eyebrowClass}>START LOCAL</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-balance text-[2.2rem] font-normal leading-[1] tracking-[-0.055em] text-[var(--nous-page-title-fg)] sm:text-[3rem]">
          Download Nue now. Join cloud when you want managed runs.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--nous-page-body-fg)] sm:text-lg sm:leading-8">
          Nue starts open-source and local-first. Cloud tiers add managed compute, model access, and background execution when you are ready.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <DownloadCtaLink />
          <a className="inline-flex h-10 items-center rounded-full border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-soft-control-bg)] px-4 text-sm font-medium text-[var(--nous-fg-title)] transition hover:border-white/[0.08] hover:bg-white/[0.06]" href="/download#waitlist">
            Join cloud waitlist
          </a>
        </div>
      </div>
    </section>
  );
}

function PlanCard({ isWide = false, plan }: { isWide?: boolean; plan: (typeof plans)[number] }) {
  return (
    <article className={cn("relative flex min-h-[380px] flex-col rounded-[var(--nous-radius-xl)] border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-card-bg)] p-5 shadow-[var(--nous-shadow-card)]", isWide && "min-h-0 lg:grid lg:grid-cols-[0.9fr_1.4fr_0.7fr] lg:items-center lg:gap-8", "badge" in plan && "border-[color:var(--nous-stroke-default)] bg-white/[0.035]")}>
      {"badge" in plan ? <span className="absolute right-5 top-5 rounded-full bg-[var(--nous-accent-info-bg)] px-2.5 py-1 text-xs font-medium text-[var(--nous-accent-info-fg)]">{plan.badge}</span> : null}
      <div>
        <h3 className="text-xl font-normal tracking-[-0.035em] text-[var(--nous-page-title-fg)]">{plan.name}</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--nous-fg-muted)]">{plan.description}</p>
        <p className="mt-6 text-[2rem] font-normal leading-tight tracking-[-0.05em] text-[var(--nous-page-title-fg)]">{plan.price}</p>
      </div>
      <ul className={cn("mb-8 mt-6 grid gap-3 text-sm leading-5 text-[var(--nous-page-body-fg)]", isWide && "lg:mb-0 lg:mt-0 lg:grid-cols-2")}>
        {plan.features.map((feature) => (
          <li className="flex gap-2" key={feature}>
            <span aria-hidden="true" className="mt-2 size-1 rounded-full bg-[var(--nous-accent-info)]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {plan.name === "Free" ? (
        <DownloadCtaLink className={cn("mt-auto inline-flex h-10 w-full items-center justify-center rounded-full border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-soft-control-bg)] px-3 text-sm font-medium text-[var(--nous-fg-title)] transition hover:border-white/[0.08] hover:bg-white/[0.06]", isWide && "lg:mt-0")} variant="link" />
      ) : (
        <a className={cn("mt-auto inline-flex h-10 w-full items-center justify-center rounded-full border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-soft-control-bg)] px-3 text-sm font-medium text-[var(--nous-fg-title)] transition hover:border-white/[0.08] hover:bg-white/[0.06]", isWide && "lg:mt-0")} href={plan.cta.href}>
          {plan.cta.label}
        </a>
      )}
    </article>
  );
}

function EnterprisePlanCard({ plan }: { plan: (typeof plans)[number] }) {
  return (
    <article className="rounded-[var(--nous-radius-xl)] border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-card-bg)] p-5 shadow-[var(--nous-shadow-card)] sm:p-6 lg:grid lg:min-h-[248px] lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch lg:gap-8">
      <div className="flex flex-col lg:justify-between">
        <div>
        <p className={eyebrowClass}>CUSTOM SUPPORT</p>
        <h3 className="mt-3 text-2xl font-normal tracking-[-0.04em] text-[var(--nous-page-title-fg)]">{plan.name}</h3>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--nous-fg-muted)]">{plan.description}</p>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="text-[2rem] font-normal leading-tight tracking-[-0.05em] text-[var(--nous-page-title-fg)]">{plan.price} pricing</p>
          <a className="inline-flex h-10 items-center justify-center rounded-full border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-soft-control-bg)] px-5 text-sm font-medium text-[var(--nous-fg-title)] transition hover:border-white/[0.08] hover:bg-white/[0.06]" href={plan.cta.href}>
            {plan.cta.label}
          </a>
        </div>
      </div>

      <div className="mt-8 flex rounded-[var(--nous-radius-lg)] border border-[color:var(--nous-stroke-subtle)] bg-white/[0.02] p-5 lg:mt-0 lg:h-full lg:items-center">
        <div className="w-full">
        <h4 className="text-sm font-medium text-[var(--nous-page-title-fg)]">Built for organizations that need</h4>
        <ul className="mt-4 grid gap-3 text-sm leading-5 text-[var(--nous-page-body-fg)] sm:grid-cols-2">
          {plan.features.map((feature) => (
            <li className="flex gap-2" key={feature}>
              <span aria-hidden="true" className="mt-2 size-1 rounded-full bg-[var(--nous-accent-info)]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </article>
  );
}

function CloudExplainer() {
  return (
    <section className="border-t border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-page-section-band-bg)] py-20 sm:py-24">
      <div className="reading-container grid gap-10 [--reading-container-max:1180px] lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className={eyebrowClass}>CLOUD TIERS</p>
          <h2 className={cn(sectionTitleClass, "mt-3")}>Managed compute should feel like a product tier, not a server order form.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <ExplainerCard title="Free local" body="Use Nue yourself. Keep control of your setup, keys, and local workflows." />
          <ExplainerCard title="Pro cloud" body="Let Nue run everyday agents in the background with managed compute and model access." />
          <ExplainerCard title="Max cloud" body="Step up when you need more agent runs, more managed usage, and more headroom." />
        </div>
      </div>
    </section>
  );
}

function ExplainerCard({ body, title }: { body: string; title: string }) {
  return (
    <article className="rounded-[var(--nous-radius-xl)] border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-card-bg)] p-5">
      <h3 className="text-lg font-normal tracking-[-0.03em] text-[var(--nous-page-title-fg)]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--nous-fg-muted)]">{body}</p>
    </article>
  );
}

function Faq() {
  return (
    <section className="border-t border-[color:var(--nous-stroke-subtle)] py-20 sm:py-24">
      <div className="reading-container [--reading-container-max:980px]">
        <p className={eyebrowClass}>FAQ</p>
        <h2 className={cn(sectionTitleClass, "mt-3")}>Pricing questions, answered plainly.</h2>
        <div className="mt-8 divide-y divide-[color:var(--nous-stroke-subtle)] rounded-[var(--nous-radius-xl)] border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-page-card-bg)]">
          {faqs.map(([question, answer]) => (
            <div className="p-5" key={question}>
              <h3 className="font-medium text-[var(--nous-page-title-fg)]">{question}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--nous-page-body-fg)]">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
