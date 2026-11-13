import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const beforeRoot = "/tmp/jan-law-before";
const output = path.join(root, "review-screenshots");
await mkdir(output, { recursive: true });

const sections = ["home", "courses", "curriculum", "admissions", "instructors", "faq"];
const browser = await chromium.launch({ headless: true });

async function inspectSite(label, siteRoot) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(path.join(siteRoot, "index.html")).href);
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  await page.locator(".teacher-photo").scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  await page.evaluate(() => window.scrollTo(0, 0));

  for (const width of [320, 360, 390, 430, 620, 700, 768, 800, 900, 1024, 1280, 1440, 1600]) {
    await page.setViewportSize({ width, height: width <= 620 ? 844 : 960 });
    const overflow = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth
    }));
    if (overflow.document > width || overflow.body > width) {
      throw new Error(`${label}: horizontal overflow at ${width}px: ${JSON.stringify(overflow)}`);
    }
  }

  const closedAccordions = await page.locator("#curriculum details.curriculum-card:not([open])").count();
  if (label === "after" && closedAccordions !== 3) {
    throw new Error(`Expected three closed curriculum accordions, found ${closedAccordions}`);
  }

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    for (const section of sections) {
      const locator = page.locator(`#${section}`);
      await locator.scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      await locator.screenshot({
        path: path.join(output, `${label}-${width}-${section}.png`),
        animations: "disabled"
      });
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: path.join(output, `${label}-${width}-full-page.png`),
      fullPage: true,
      animations: "disabled"
    });
  }

  if (label === "after") {
    await page.setViewportSize({ width: 390, height: 844 });
    const menu = page.locator("#menu-toggle");
    await menu.click();
    if (await menu.getAttribute("aria-expanded") !== "true") throw new Error("Mobile menu did not open");
    await menu.click();
    if (await menu.getAttribute("aria-expanded") !== "false") throw new Error("Mobile menu did not close");
    const courseCards = await page.locator("#courses .course-card").count();
    if (courseCards !== 3) throw new Error(`Expected three course cards, found ${courseCards}`);
    const courseButtons = await page.locator("#courses .course-card .course-actions a").count();
    if (courseButtons !== 3) throw new Error(`Expected one enquiry button per course, found ${courseButtons}`);
  }
  await page.close();
}

try {
  await inspectSite("before", beforeRoot);
  await inspectSite("after", root);
  console.log("Responsive review passed at 320–1600px, including requested 390px and 1440px screenshots.");
} finally {
  await browser.close();
}
