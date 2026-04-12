import { test, expect } from "@playwright/test";

/**
 * Smoke tests — the cheap-but-essential safety net.
 * If any of these break, the site is broken in a user-visible way.
 */

const PUBLIC_PAGES = [
  { path: "/", heading: /dərdiniz deyil/i },
  { path: "/services", heading: /uyğun mütəxəssis/i },
  { path: "/projects", heading: /real iş/i },
  { path: "/about", heading: /bir niyyət/i },
  { path: "/blog", heading: /praktik təcrübə/i },
  { path: "/contact", heading: /layihənizi müzakirə/i },
];

test.describe("public pages render", () => {
  for (const page of PUBLIC_PAGES) {
    test(`${page.path} loads with hero heading`, async ({ page: pw }) => {
      const res = await pw.goto(page.path);
      expect(res?.status(), `HTTP status for ${page.path}`).toBeLessThan(400);
      await expect(pw.locator("h1").first()).toContainText(page.heading);
    });
  }
});

test.describe("global navigation", () => {
  test("navbar links resolve to correct pages", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /xidmət/i }).first().click();
    await expect(page).toHaveURL(/\/services/);
    await page.getByRole("link", { name: /əlaqə/i }).first().click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test("404 page renders for unknown route", async ({ page }) => {
    // Don't assert HTTP status — Next dev compiles not-found.tsx on demand and
    // can return 200 the first time. The visible "404" headline is the real signal.
    await page.goto("/this-route-does-not-exist", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /tapılmadı/i })).toBeVisible();
  });
});

test.describe("contact page", () => {
  test("form renders all required fields", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByPlaceholder(/Ad Soyad/i)).toBeVisible();
    await expect(page.getByPlaceholder(/email@example/i)).toBeVisible();
    await expect(page.getByPlaceholder(/Web layihə/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /konsultasiya üçün göndər/i })
    ).toBeVisible();
  });

  test("real contact info is in the DOM", async ({ page }) => {
    await page.goto("/contact");
    // AnimatedSection wraps each card in framer-motion's whileInView, so the
    // node may sit at opacity:0 + transform until scrolled. Assert presence
    // (locator.count) instead of strict visibility — the DOM is the contract.
    // Each contact item is rendered as <a><div>{value}</div></a>, so a text
    // locator matches both the anchor and its child div. Use .first() and
    // assert attachment instead of an exact count.
    await expect(page.getByText("sarxanbabayevcontact@gmail.com").first()).toBeAttached();
    await expect(page.getByText("+994 50 201 71 64").first()).toBeAttached();
    // Also confirm the mailto link is wired up — that's the actual user contract.
    await expect(
      page.locator('a[href="mailto:sarxanbabayevcontact@gmail.com"]')
    ).toHaveCount(1);
  });
});

test.describe("SEO surface", () => {
  test("home page has og:image and Organization JSON-LD", async ({ page }) => {
    await page.goto("/");
    const ogImage = await page.locator('meta[property="og:image"]').first().getAttribute("content");
    expect(ogImage).toBeTruthy();
    expect(ogImage).toMatch(/opengraph-image|og/i);

    const ldJson = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(ldJson).toBeTruthy();
    const data = JSON.parse(ldJson!);
    expect(data["@type"]).toBe("Organization");
    expect(data.name).toBe("StarSoft");
  });

  test("/robots.txt is served and disallows admin", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toContain("Disallow: /admin");
  });

  test("/sitemap.xml lists public routes", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    for (const path of ["/services", "/contact", "/about"]) {
      expect(body).toContain(`https://starsoft.az${path}`);
    }
  });
});
