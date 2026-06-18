import { expect, test } from "@playwright/test";

const pages = [
  ["/download", "Download Nue."],
  ["/pricing", "Start free. Upgrade when you want Nue to run more for you."],
  ["/careers", "Help build the future of personal agents."],
  ["/resources", "Resources for building with Nue."],
  ["/product", "Nue turns chat into a private operating system for your agents."],
  ["/use-cases", "Nue is for the recurring work that quietly consumes your week."],
  ["/use-cases/individuals", "Nue is for the recurring work that quietly consumes your week."]
] as const;

test.describe("marketing subpages", () => {
  for (const [path, heading] of pages) {
    test(`${path} renders a polished landing page`, async ({ page }) => {
      await page.goto(path);

      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
      await expect(page.getByLabel("Primary navigation").getByRole("link", { name: /Download/ })).toHaveAttribute("href", /\/download(\?os=(windows|macos|linux))?/);
      await expect(page.getByRole("contentinfo").getByRole("link", { name: "Careers" })).toHaveAttribute("href", "/careers");
    });
  }
});
