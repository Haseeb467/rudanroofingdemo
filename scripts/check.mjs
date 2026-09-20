import { chromium } from "@playwright/test";
import fs from "node:fs";
import assert from "node:assert/strict";
const pages = JSON.parse(fs.readFileSync("src/content.json", "utf8"));
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto("http://localhost:5173/");
await page.evaluate(() => document.fonts.ready);
for (let y = 0; y < 5500; y += 700) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(80);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: "source/desktop.png", fullPage: true });
await page.getByLabel("Full name", { exact: true }).fill("Website Test");
await page
  .getByLabel("Email address", { exact: true })
  .fill("test@example.com");
await page.getByLabel("Phone number", { exact: true }).fill("4165550100");
await page.getByLabel("City", { exact: true }).fill("Toronto");
await page
  .getByLabel("Project type", { exact: true })
  .selectOption("Materials only / DIY");
await page.getByRole("button", { name: "Request My Estimate" }).click();
assert.match(
  await page
    .getByRole("link", { name: "Open email draft" })
    .getAttribute("href"),
  /^mailto:info@rudanroofing.com/,
);
await page.locator(".faq summary").first().click();
assert.equal(await page.locator(".faq").first().getAttribute("open"), "");
await page.goto("http://localhost:5173/shop");
await page.getByLabel("Search products").fill("stellar");
assert.equal(await page.locator(".product-card").count(), 1);
await page.getByLabel("Search products").fill("no-such-product");
assert.equal(await page.getByText("No products found.").count(), 1);
await page.getByRole("button", { name: "Show all products" }).click();
assert.equal(await page.locator(".product-card").count(), 29);
await page.getByRole("button", { name: "Panels", exact: true }).click();
assert.ok((await page.locator(".product-card").count()) > 0);
await page.setViewportSize({ width: 375, height: 812 });
await page.goto("http://localhost:5173/product/stellar---modular-panel");
await page.locator(".product-options").waitFor();
assert.equal(await page.locator(".product-options").count(), 1);
assert.equal(await page.locator(".option-chips span").count(), 12);
await page.locator(".gallery-thumbs button").nth(1).click();
assert.equal(
  await page
    .locator(".gallery-thumbs button")
    .nth(1)
    .getAttribute("aria-pressed"),
  "true",
);
await page.goto("http://localhost:5173/do-it-yourself");
await page.locator(".video-link").first().waitFor();
assert.match(
  await page.locator(".video-link").first().getAttribute("href"),
  /^https:\/\/www.youtube.com\//,
);
await page.goto("http://localhost:5173/");
await page.getByRole("button", { name: "Open menu" }).click();
assert.equal(
  await page
    .getByRole("button", { name: "Close menu" })
    .getAttribute("aria-expanded"),
  "true",
);
await page.keyboard.press("Escape");
assert.equal(
  await page
    .getByRole("button", { name: "Open menu" })
    .getAttribute("aria-expanded"),
  "false",
);
for (let y = 0; y < 8500; y += 600) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(60);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: "source/mobile.png", fullPage: true });
const failures = [];
for (const p of [
  ...pages,
  { path: "/areas" },
  { path: "/site-map" },
  { path: "/roofing-guide" },
]) {
  await page.goto("http://localhost:5173" + p.path);
  await page.locator("h1").first().waitFor();
  await page.waitForFunction(
    () => !document.body.textContent.includes("Loading page details..."),
  );
  const size = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    width: innerWidth,
  }));
  if (size.scroll > size.width + 1)
    failures.push(`${p.path}: overflow ${size.scroll}`);
  if ((await page.locator("h1").count()) !== 1)
    failures.push(`${p.path}: heading count`);
  const broken = await page
    .locator("img")
    .evaluateAll((imgs) =>
      imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
    );
  if (broken.length) failures.push(`${p.path}: broken images ${broken}`);
}
await page.setViewportSize({ width: 812, height: 375 });
await page.goto("http://localhost:5173/");
assert.ok(
  await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
);
await page.emulateMedia({ reducedMotion: "reduce" });
assert.equal(
  await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  ),
  "auto",
);
await browser.close();
assert.deepEqual(errors, []);
assert.deepEqual(failures, []);
console.log(
  `PASS: ${pages.length + 3} routes, mobile overflow, images, estimate draft, product search/filter, variants, gallery, video resources, mobile menu, FAQ, landscape, reduced motion. No browser errors.`,
);
