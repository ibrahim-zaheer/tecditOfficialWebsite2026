import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto("http://localhost:3000/#book-a-call", { waitUntil: "networkidle" });
await page.waitForTimeout(500);

await page.fill('input[name="name"]', "Test Submission (TecDit QA)");
await page.fill('input[name="business"]', "TecDit Internal Test");
await page.fill('input[name="email"]', "qa-test@tecdit.com");
await page.fill('input[name="phone"]', "555-000-0000");
await page.fill('textarea[name="message"]', "This is an automated test submission verifying the Web3Forms integration works end-to-end.");

const [response] = await Promise.all([
  page.waitForResponse((res) => res.url().includes("web3forms.com"), { timeout: 15000 }),
  page.click('button[type="submit"]'),
]);

const status = response.status();
const body = await response.json();
console.log("HTTP status:", status);
console.log("Response body:", JSON.stringify(body));

await page.waitForTimeout(500);
await page.screenshot({ path: ".scratch/form-result.png" });

console.log(errors.length ? "CONSOLE ERRORS:\n" + errors.join("\n") : "No console errors.");
await browser.close();
