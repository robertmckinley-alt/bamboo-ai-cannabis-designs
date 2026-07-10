import { chromium } from "playwright";

const routes = ["/", "/free-agent-builder", "/pricing", "/industries/medical", "/book-demo", "/thank-you", "/agent-created"];
const widths = [360, 390, 768, 1024, 1280, 1440];

const browser = await chromium.launch({ channel: "chrome" });
let failures = 0;

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const route of routes) {
    await page.goto(`http://localhost:3199${route}`, { waitUntil: "networkidle" });
    const result = await page.evaluate(() => {
      const doc = document.documentElement;
      const overflow = doc.scrollWidth - doc.clientWidth;
      if (overflow <= 1) return { overflow, offenders: [] };
      const offenders = [];
      for (const el of document.querySelectorAll("*")) {
        const rect = el.getBoundingClientRect();
        if (rect.right > doc.clientWidth + 1 && rect.width < doc.scrollWidth) {
          offenders.push(
            `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 80)} right=${Math.round(rect.right)} w=${Math.round(rect.width)}`
          );
        }
      }
      return { overflow, offenders: offenders.slice(0, 8) };
    });
    if (result.overflow > 1) {
      failures += 1;
      console.log(`FAIL ${width}px ${route} overflow=${result.overflow}px`);
      result.offenders.forEach((o) => console.log(`   ${o}`));
    }
  }
  await page.close();
}

await browser.close();
console.log(failures === 0 ? "OK: no horizontal overflow on any route/width" : `${failures} failing combos`);
process.exit(failures === 0 ? 0 : 1);
