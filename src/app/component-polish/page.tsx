import type { Metadata } from "next";

import { ComponentPolishPage } from "@/components/component-polish/component-polish-page";

export const metadata: Metadata = {
    title: "Component Polish",
    description: "A Nue design-system staging page for polishing visual components before they ship to marketing pages."
};

export default function ComponentPolishRoute() {
    return <ComponentPolishPage />;
}
