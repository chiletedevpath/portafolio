import { test, expect } from "@playwright/test";
const routes = [
  "/",
  "/proyectos/chiletedevpath-web/",
  "/proyectos/chisabes/",
  "/proyectos/reminexa/",
];
const screens = [
  { width: 320, height: 568 },
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 600, height: 900 },
  { width: 768, height: 1024 },
  { width: 820, height: 1180 },
  { width: 896, height: 900 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
  { width: 2560, height: 1440 },
  { width: 844, height: 390 },
];
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("https://challenges.cloudflare.com/**", (route) =>
    route.abort(),
  );
});
for (const language of ["es", "en"])
  test(`${language}: responsive pages across phones, tablets, desktop and landscape`, async ({
    page,
  }) => {
    test.setTimeout(120000);
    for (const viewport of screens) {
      await page.setViewportSize(viewport);
      for (const route of routes) {
        const url = (language === "en" ? "/en" : "") + route;
        await page.goto(url);
        await page.evaluate(() => document.fonts.ready);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          `${url} at ${viewport.width}`,
        ).toBe(true);
        const headings = await page
          .locator("main h1, main h2, main h3")
          .evaluateAll((nodes) =>
            nodes
              .filter(
                (node) =>
                  node.getBoundingClientRect().width > 0 &&
                  node.scrollWidth > node.clientWidth + 1,
              )
              .map((node) => node.textContent),
          );
        expect(
          headings,
          `unclipped headings ${url} at ${viewport.width}`,
        ).toEqual([]);
        await expect(page.locator("[data-theme-toggle]")).toHaveCSS(
          "min-height",
          "44px",
        );
        if (route === "/") {
          const form = page.locator(".pf-form");
          await form.scrollIntoViewIfNeeded();
          await expect(form.locator("input[name=correo]")).toHaveCSS(
            "font-size",
            "16px",
          );
          // Compact Turnstile is 150px wide; assert room without loading a challenge.
          expect(
            await form
              .locator("[data-turnstile-container]")
              .evaluate((e) => e.clientWidth),
          ).toBeGreaterThanOrEqual(150);
        } else {
          await page.locator("[data-album-thumb]").last().click();
          await expect(page.locator("[data-album-count]")).toHaveText(
            "03 / 03",
          );
          await expect(page.locator("[data-album-prev]")).toHaveCSS(
            "min-width",
            "44px",
          );
        }
      }
    }
  });

test("light theme, CV expansion and tablet layout remain usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/");
  await page.locator("[data-theme-toggle]").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  const heading = await page.locator(".pf-hero-copy").boundingBox(),
    portrait = await page.locator(".pf-portrait").boundingBox();
  expect(portrait.y).toBeGreaterThanOrEqual(heading.y + heading.height);
  await page.locator(".pf-cv-preview summary").click();
  await expect(page.locator(".pf-cv-preview object")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.locator(".pf-form input[name=correo]").focus();
  await expect(page.locator(".pf-form input[name=correo]")).toBeFocused();
});

test("welcome can be skipped on small and landscape screens", async ({
  page,
}) => {
  await page.addInitScript(() =>
    sessionStorage.setItem("portfolio-welcome", "seen-v2"),
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.locator("[data-replay-intro]").click();
    const dialog = page.locator("[data-welcome-route]");
    await expect(dialog).toBeVisible();
    expect(
      await dialog.evaluate((e) => e.scrollWidth <= e.clientWidth + 1),
    ).toBe(true);
    await page.locator("[data-skip-intro]").click();
    await expect(dialog).not.toBeVisible();
  }
});
