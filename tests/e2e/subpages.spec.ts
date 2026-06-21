import { expect, test } from "@playwright/test";

const pages = [
  ["/download", "Download Nue."],
  ["/pricing", "Start free. Upgrade when you want Nue to run more for you."],
  ["/careers", "Help build the future of personal agents."],
  ["/resources", "Resources for building with Nue."],
  ["/product", "Nue turns chat into a private operating system for your agents."],
  ["/use-cases", "Nue is for the recurring work that quietly consumes your week."],
  ["/use-cases/individuals", "Turn personal admin into private routines you can trust."],
  ["/use-cases/families", "Coordinate household work without adding another dashboard."],
  ["/use-cases/businesses", "Standardize repeatable work while keeping humans in control."],
  ["/security", "Security"],
  ["/developers", "Build with Nue and inspect the agent OS core."],
  ["/login", "Welcome to Nue."],
  ["/privacy", "Privacy Policy"],
  ["/terms", "Terms of Use"],
  ["/data-use", "Data Use Policy"]
] as const;

test.describe("marketing subpages", () => {
  for (const [path, heading] of pages) {
    test(`${path} renders a polished landing page`, async ({ page }) => {
      await page.goto(path);

      await expect(page.getByRole("heading", { exact: true, name: heading })).toBeVisible();
      if ((page.viewportSize()?.width ?? 0) < 640) {
        await page.getByRole("button", { name: "Open navigation menu" }).click();
        const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });
        await expect(mobileNavigation.getByRole("link", { name: /Download/ })).toHaveAttribute("href", /\/download(\?os=(windows|macos|linux))?/);
        await page.getByRole("button", { name: "Close navigation menu" }).click();
      } else {
        await expect(page.getByLabel("Primary navigation").getByRole("link", { name: /Download/ })).toHaveAttribute("href", /\/download(\?os=(windows|macos|linux))?/);
      }
      await expect(page.getByRole("contentinfo").getByRole("link", { name: "Careers" })).toHaveAttribute("href", "/careers");
    });
  }

  test("/download opens a platform waitlist lightbox", async ({ page }) => {
    await page.goto("/download");

    await page.getByRole("button", { name: "Join macOS waitlist" }).click();

    const dialog = page.getByRole("dialog", { name: "Get notified for macOS." });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByLabel("Email address")).toBeVisible();
    await expect(dialog.getByRole("button", { name: "macOS" })).toHaveAttribute("aria-pressed", "true");

    await dialog.getByRole("button", { name: "Windows" }).click();
    const updatedDialog = page.getByRole("dialog", { name: "Get notified for Windows." });
    await expect(updatedDialog).toBeVisible();
    await expect(updatedDialog.getByRole("button", { name: "Windows" })).toHaveAttribute("aria-pressed", "true");

    await updatedDialog.getByRole("button", { name: "Close waitlist form" }).click();
    await expect(updatedDialog).toBeHidden();
  });

  test("/download#waitlist opens the waitlist lightbox", async ({ page }) => {
    await page.goto("/download#waitlist");

    await expect(page.getByRole("dialog", { name: /Get notified for/ })).toBeVisible();
  });
});
