import type { Metadata } from "next";
import { DesignSystemDoc } from "@/components/design-system/nous-design-system";

export const metadata: Metadata = {
  title: "Design System",
  description: "Nue app design system tokens, workspace recreation, and component sets."
};

export default function DesignSystemPage() {
  return <DesignSystemDoc />;
}
