import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const html = await readFile(path.join(root, "index.html"), "utf8");
const css = await readFile(path.join(root, "assets/css/site.css"), "utf8");
const js = await readFile(path.join(root, "assets/js/site.js"), "utf8");
const notFound = await readFile(path.join(root, "404.html"), "utf8");

test("homepage has essential document metadata", () => {
  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /<html lang="en">/i);
  assert.match(html, /<title>\s*[^<]+\s*<\/title>/i);
  assert.ok(html.includes('name="description"'));
  assert.ok(html.includes('content="Learn German in Swat'));
  assert.ok(html.includes('rel="canonical"'));
  assert.ok(html.includes('href="https://muneebinu.github.io/jan-law-german-language-center/"'));
});

test("styles and application JavaScript are kept outside the HTML", () => {
  assert.match(html, /href="assets\/css\/site\.css"/);
  assert.match(html, /src="assets\/js\/site\.js" defer/);
  assert.doesNotMatch(html, /<style\b/i);
  assert.doesNotMatch(html, /\sstyle=/i);
  const scriptTags = [...html.matchAll(/<script\b([^>]*)>/gi)];
  const applicationScripts = scriptTags.filter(
    (match) => !match[1].includes("application/ld+json")
  );
  assert.equal(applicationScripts.length, 1, "Expected one external application script");
  assert.ok(applicationScripts[0][1].includes('src="assets/js/site.js"'));
  assert.ok(applicationScripts[0][1].includes("defer"));
});

test("all local HTML assets resolve to files in the repository", () => {
  const references = [html, notFound]
    .flatMap((document) => [...document.matchAll(/(?:src|href)="([^"]+)"/gi)])
    .map((match) => match[1])
    .filter((value) => !/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value));

  for (const reference of references) {
    const cleanPath = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
    const resolved = path.resolve(root, cleanPath || ".");
    assert.ok(
      resolved === root || resolved.startsWith(root + path.sep),
      `Asset path escapes project root: ${reference}`
    );
    assert.ok(existsSync(resolved), `Missing local asset: ${reference}`);
  }
});

test("custom not-found page uses the shared design stylesheet", () => {
  assert.match(notFound, /<meta name="robots" content="noindex">/);
  assert.match(notFound, /href="assets\/css\/site\.css"/);
  assert.match(notFound, /class="not-found-page"/);
  assert.match(css, /\.not-found-page/);
  assert.doesNotMatch(notFound, /\sstyle=/i);
});

test("embedded JSON-LD is valid JSON", () => {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  assert.ok(blocks.length >= 1, "Expected structured data blocks");

  const data = blocks.map((match) => JSON.parse(match[1]));
  assert.ok(data.some((item) => item["@type"] === "EducationalOrganization"));
  assert.ok(data.some((item) => item["@type"] === "FAQPage"));
});

test("published course prices are consistent", () => {
  for (const [level, fee] of [["A1", "35,000"], ["A2", "40,000"], ["B1", "50,000"]]) {
    assert.ok(html.includes(`German ${level}`), `Missing ${level} course content`);
    assert.ok(html.includes(`PKR ${fee}`), `Missing visible ${level} fee`);
  }
  const organization = JSON.parse(
    [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)][0][1]
  );
  const offers = organization.hasOfferCatalog.itemListElement;
  assert.deepEqual(
    offers.map((offer) => offer.price),
    ["35000", "40000", "50000"]
  );
});

test("contact links include the confirmed office and instructor WhatsApp numbers", () => {
  assert.match(html, /wa\.me\/923466996640/);
  assert.match(html, /wa\.me\/923189150911/);
  assert.match(js, /wa\.me\/923189150911/);
});

test("responsive and reduced-motion styling is present", () => {
  assert.match(css, /@media/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(js, /IntersectionObserver/);
});

test("main source files do not contain em dashes or en dashes", () => {
  assert.doesNotMatch(html + css + js, /[—–]/);
});


test("homepage uses a locally hosted instructor photo and a factual course preview", () => {
  assert.match(html, /src="assets\/muneeb\.jpg"/);
  assert.doesNotMatch(html, /Fluentio-Academia\/assets\/muneeb\.jpg/);
  for (const [level, fee] of [["A1", "35,000"], ["A2", "40,000"], ["B1", "50,000"]]) {
    assert.match(html, new RegExp(`preview-level">\\s*${level}`));
    assert.ok(html.includes(fee), `Missing ${level} preview fee`);
  }
});

test("homepage has no dead in-page navigation targets or removed filler sections", () => {
  const ids = new Set([...html.matchAll(/\\bid="([^"]+)"/g)].map((match) => match[1]));
  const targets = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  for (const target of targets) assert.ok(ids.has(target), `Missing in-page target: ${target}`);
  assert.doesNotMatch(html, /id="why"|id="pathway"|class="section experiences"/);
  assert.doesNotMatch(html, /is presented as|Certificate arrangements have not been confirmed|German proficiency is stated as/);
});
