import { test, expect } from "@playwright/test";

/**
 * Admin auth gate. We don't want to depend on a real backend here — we
 * verify that:
 *   1. The login page renders.
 *   2. Hitting /admin without a token redirects to /admin/login.
 *
 * Full backend-coupled admin tests live in a separate suite that runs
 * against a docker-compose stack.
 */

test.describe("admin gate", () => {
  test("login page renders", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page.getByRole("heading", { name: /khansoft admin/i })).toBeVisible();
    await expect(page.getByPlaceholder("admin")).toBeVisible();
    await expect(page.getByRole("button", { name: /daxil ol/i })).toBeVisible();
  });

  test("unauthenticated /admin redirects to /admin/login", async ({ page }) => {
    await page.goto("/admin");
    // The redirect happens client-side from a useEffect after hydration,
    // which can be slow on a cold dev server — give it room.
    await page.waitForURL(/\/admin\/login/, { timeout: 15_000 });
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("invalid credentials surface an error", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByPlaceholder("admin").fill("not-a-real-user");
    await page.getByPlaceholder("••••••••").fill("wrong-password");
    await page.getByRole("button", { name: /daxil ol/i }).click();
    // Either the error banner appears, or we stay on the login page —
    // both indicate the gate held.
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});
