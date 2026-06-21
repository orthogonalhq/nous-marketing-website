import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeThemeShell } from "@/components/home/home-theme-shell";
import { SubpageLanding } from "@/components/marketing/subpage-landing";
import { subpageCopy, type SubpageCopy } from "@/content/subpage-copy";

const useCasePages = {
  businesses: {
    copy: subpageCopy.useCasesBusinesses,
    description: "Nue use cases for teams and businesses standardizing repeatable work with approvals and run history.",
    title: "Business Use Cases"
  },
  families: {
    copy: subpageCopy.useCasesFamilies,
    description: "Nue use cases for families coordinating meal planning, errands, calendars, and household routines.",
    title: "Family Use Cases"
  },
  individuals: {
    copy: subpageCopy.useCasesIndividuals,
    description: "Nue use cases for individuals turning personal admin, planning, research, and follow-ups into private routines.",
    title: "Individual Use Cases"
  }
} satisfies Record<string, { copy: SubpageCopy; description: string; title: string }>;

const fallbackMetadata: Metadata = {
  title: "Use Cases",
  description: "Explore Nue use cases for recurring work that benefits from memory, tools, approvals, and reusable routines."
};

type UseCaseRouteProps = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: UseCaseRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getUseCasePage(slug);

  if (!page) {
    return fallbackMetadata;
  }

  return {
    title: page.title,
    description: page.description
  };
}

export default async function UseCasesCatchAllPage({ params }: UseCaseRouteProps) {
  const { slug } = await params;
  const page = getUseCasePage(slug);

  if (!page) {
    notFound();
  }

  return (
    <HomeThemeShell>
      <SubpageLanding copy={page.copy} />
    </HomeThemeShell>
  );
}

function getUseCasePage(slug: string[]) {
  if (slug.length !== 1) {
    return null;
  }

  return useCasePages[slug[0] as keyof typeof useCasePages] ?? null;
}
