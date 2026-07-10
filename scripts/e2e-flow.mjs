import { chromium } from "playwright";

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text().slice(0, 200)); });
page.on("pageerror", (err) => errors.push(String(err).slice(0, 200)));

const step = (name) => console.log("OK:", name);

// 1. Builder with URL preselection
await page.goto("http://localhost:3199/free-agent-builder?industry=Sales&goal=Capture%20and%20qualify%20leads", { waitUntil: "networkidle" });
await page.waitForTimeout(400);
// Industry preselected → should still be on step 1 with Sales selected
const salesSelected = await page.getByRole("radio", { name: "Sales", exact: true }).getAttribute("aria-checked");
if (salesSelected !== "true") throw new Error("URL preselection failed");
step("URL preselection (industry=Sales)");

// advance: click Sales triggers auto-advance to outcomes
await page.getByRole("radio", { name: "Sales", exact: true }).click();
await page.waitForTimeout(500);
if (!(await page.getByText("What should it accomplish?").isVisible())) throw new Error("no auto-advance to step 2");
step("auto-advance to outcomes");

// goal preselected via URL; add a secondary + test replacement feedback
await page.getByRole("radio", { name: /Book appointments/ }).click();
await page.getByRole("radio", { name: /Answer customer questions/ }).click();
const feedback = await page.getByText(/Replaced/).textContent();
if (!feedback?.includes("Book appointments")) throw new Error("secondary replacement feedback missing");
step("secondary outcome replacement feedback");
await page.getByRole("button", { name: "Continue" }).click();
await page.waitForTimeout(400);

// channel
await page.getByRole("radio", { name: /Website chat/ }).click();
await page.waitForTimeout(500);
// voice
await page.getByRole("radio", { name: /Warm concierge/ }).click();
await page.waitForTimeout(500);
if (!(await page.getByText("Tell it about the business.").isVisible())) throw new Error("not on context step");
step("channel + voice auto-advance");

// context: submit empty to test validation
await page.getByRole("button", { name: "Continue" }).click();
if (!(await page.getByText(/Add the business name/).isVisible())) throw new Error("validation missing");
step("context validation errors");
await page.fill("#business-name", "Ridgeline Roofing");
await page.fill("#offering", "Commercial roofing installation and repair across the Portland metro.");
await page.fill("#next-action", "Book an estimate call");
await page.getByRole("button", { name: "Continue" }).click();
await page.waitForTimeout(400);

// knowledge: bad URL then fix
await page.fill("#website", "not a url at all %%%");
await page.getByRole("button", { name: "Continue" }).click();
await page.waitForTimeout(200);
if (!(await page.getByText(/doesn't look like a URL/).isVisible())) throw new Error("URL validation missing");
step("knowledge URL validation");
await page.fill("#website", "https://ridgelineroofing.com");
await page.fill("#excluded-topics", "Pricing negotiations");
await page.fill("#handoff-condition", "Any frustrated caller");
await page.getByRole("checkbox").check();
await page.getByRole("button", { name: "Continue" }).click();
await page.waitForTimeout(400);

// preview
if (!(await page.getByText("Review the blueprint.").isVisible())) throw new Error("not on preview");
const readinessText = await page.getByText(/^Readiness — \d+%$/).textContent();
step(`preview visible (${readinessText})`);
await page.getByRole("button", { name: "Save this blueprint" }).click();
await page.waitForTimeout(400);

// save with validation
await page.getByRole("button", { name: "Save My Agent Blueprint" }).click();
if (!(await page.getByText(/Your name is required/).isVisible())) throw new Error("save validation missing");
step("save validation");
await page.fill("#lead-name", "Rob McKinley");
await page.fill("#lead-email", "rob@ridgelineroofing.com");
await page.getByRole("button", { name: "Save My Agent Blueprint" }).click();
await page.waitForURL("**/agent-created", { timeout: 5000 });
await page.waitForTimeout(600);
if (!(await page.getByText("Your Bamboo agent blueprint is ready.").isVisible())) throw new Error("agent-created not delivered");
if (!(await page.getByText(/Ridgeline Roofing Capture Agent/).isVisible())) throw new Error("blueprint name missing");
step("agent-created shows real saved blueprint");

// resume banner on returning to builder
await page.goto("http://localhost:3199/free-agent-builder", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
if (!(await page.getByText(/Resume your blueprint/).isVisible())) throw new Error("resume banner missing");
step("resume banner on return");

// book-demo → thank-you
await page.goto("http://localhost:3199/book-demo", { waitUntil: "networkidle" });
await page.fill("#call-name", "Rob McKinley");
await page.fill("#call-email", "rob@ridgelineroofing.com");
await page.fill("#call-company", "Ridgeline Roofing");
await page.getByRole("button", { name: "Request the Strategy Call" }).click();
await page.waitForURL("**/thank-you", { timeout: 5000 });
if (!(await page.getByText("Your strategy call request is in.").isVisible())) throw new Error("thank-you missing");
step("book-demo → thank-you");

// empty state honesty: clear storage, agent-created should show empty state
await page.evaluate(() => localStorage.clear());
await page.goto("http://localhost:3199/agent-created", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
if (!(await page.getByText("No saved blueprint yet.").isVisible())) throw new Error("empty state missing");
step("agent-created honest empty state");

// keyboard: FAQ accordion on homepage
await page.goto("http://localhost:3199/", { waitUntil: "networkidle" });
const faq = page.getByRole("button", { name: /Can I build an agent without code/ });
await faq.focus();
await page.keyboard.press("Enter");
await page.waitForTimeout(400);
if (!(await page.getByText(/turns the answers into a structured agent blueprint/).isVisible())) throw new Error("FAQ keyboard toggle failed");
step("FAQ keyboard operation");

console.log(errors.length ? `CONSOLE ERRORS:\n${errors.join("\n")}` : "OK: no console errors");
await browser.close();
process.exit(errors.length ? 1 : 0);
