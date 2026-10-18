import { test, expect } from "@playwright/test";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve, sep } from "node:path";
import { checkPublicTree } from "../scripts/check-public.mjs";

test("publication guard rejects internal files, source maps and credentials", async () => {
  const prefix = join(tmpdir(), "portfolio-publication-");
  const directory = await mkdtemp(prefix);
  try {
    await writeFile(join(directory, "index.html"), "<h1>Portfolio</h1>");
    expect(await checkPublicTree(directory, { built: true })).toBe(1);
    for (const name of [
      ".env",
      "private.docx",
      "bundle.js.map",
      "backup.zip",
      ".gitkeep",
    ]) {
      const path = join(directory, name);
      await writeFile(path, "fixture");
      await expect(checkPublicTree(directory, { built: true })).rejects.toThrow(
        "no autorizado",
      );
      await rm(path);
    }
    await writeFile(
      join(directory, "index.html"),
      "<!-- " + "-----BEGIN PRIVATE" + " KEY----- -->",
    );
    await expect(checkPublicTree(directory, { built: true })).rejects.toThrow(
      "Posible credencial",
    );
  } finally {
    if (
      !resolve(directory).startsWith(resolve(prefix)) ||
      !resolve(directory).startsWith(resolve(tmpdir()) + sep)
    )
      throw new Error("Directorio temporal inesperado");
    await rm(directory, { recursive: true, force: true });
  }
});

test("browser blocks an unapproved inline script without blocking the portfolio", async ({
  page,
}) => {
  await page.route("https://challenges.cloudflare.com/**", (route) =>
    route.abort(),
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  const violations = [];
  await page.addInitScript(() => {
    window.__securityViolations = [];
    document.addEventListener("securitypolicyviolation", (event) =>
      window.__securityViolations.push(event.effectiveDirective),
    );
  });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.locator("[data-theme-toggle]").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  violations.push(...(await page.evaluate(() => window.__securityViolations)));
  expect(violations).toEqual([]);
  await page.evaluate(() => {
    const script = document.createElement("script");
    script.textContent = "window.__unapprovedScriptRan = true";
    document.head.append(script);
  });
  expect(
    await page.evaluate(() => window.__unapprovedScriptRan),
  ).toBeUndefined();
});
