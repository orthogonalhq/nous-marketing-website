import { expect, test } from "@playwright/test";

test("home page presents the Nue homepage narrative", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Your personal agent, from chat to operating system."
    })
  ).toBeVisible();
  await expect(page.getByText("AI should give you time back.").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /Built for the work that keeps coming back/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "As simple as a conversation." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Powerful agents should still feel personal, private, and yours." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Download early access release" })).toHaveAttribute("href", "/download");
  await expect(page.getByLabel("Primary navigation").getByRole("link", { name: "Get started" })).toBeVisible();
  await expect(page.getByRole("link", { name: "View Nue on GitHub" })).toBeVisible();

  const footer = page.getByRole("contentinfo");
  await expect(footer.getByText("AI should give you time back.")).toBeVisible();
  await expect(footer.getByRole("navigation", { name: "Footer navigation" })).toBeVisible();
  await expect(footer.getByRole("link", { name: "Privacy" })).toBeVisible();
  await footer.getByRole("button", { name: "Use Light theme" }).click();
  await expect(page.locator(".nous-design-system")).toHaveAttribute("data-nous-theme", "light");
});
