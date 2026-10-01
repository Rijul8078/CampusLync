import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/study",
  "/career",
  "/accommodation",
  "/moving-to-london",
  "/resources",
  "/about",
  "/contact",
  "/book",
  "/privacy",
  "/terms",
  "/academic-integrity",
];
test("quick enquiry carries details into the support form", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Quick enquiry" }).click();
  const dialog = page.getByRole("dialog", { name: "What can we help with?" });
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("Service").selectOption("Career Support");
  await dialog
    .getByLabel("What would you like help with?")
    .fill("I would like help reviewing my graduate career plan.");
  await dialog.getByRole("button", { name: "Continue to form" }).click();
  await expect(page).toHaveURL(/\/contact\?/);
  await expect(page.getByLabel("Service needed")).toHaveValue("Career Support");
  await expect(page.getByLabel("Message", { exact: true })).toHaveValue(
    "I would like help reviewing my graduate career plan.",
  );
});

test("consultation booking and downloadable checklists are available", async ({
  page,
  request,
}) => {
  await page.goto("/book");
  const bookingLink = page.getByRole("link", { name: "View available times" });
  const fallback = page.getByText(
    "Online calendar scheduling is not connected yet.",
  );
  await expect(bookingLink.or(fallback)).toBeVisible();
  if (await bookingLink.count()) {
    await expect(bookingLink).toHaveAttribute("href", /^https:\/\//);
    await expect(bookingLink).toHaveAttribute("target", "_blank");
  }
  await page.goto("/resources");
  await expect(
    page.getByRole("link", { name: "Download checklist" }),
  ).toHaveCount(4);
  const response = await request.get(
    "/downloads/campuslync-assignment-review-checklist.pdf",
  );
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("admin dashboard is protected and reports its configuration state", async ({
  page,
}) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login$/);
  await expect(
    page.getByRole("heading", { name: "Sign in securely." }),
  ).toBeVisible();
  const disabledAlert = page.locator(".admin-alert");
  if (await disabledAlert.count()) {
    await expect(disabledAlert).toContainText("Admin access is disabled");
    await expect(page.getByRole("button", { name: "Sign in" })).toBeDisabled();
  } else {
    await expect(page.getByRole("button", { name: "Sign in" })).toBeEnabled();
  }
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
});
test("every page renders, has metadata, valid links, no browser errors and no accessibility violations", async ({
  page,
  request,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const links = new Set<string>();
  for (const route of routes) {
    const response = await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/CampusLync/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.+/,
    );
    const violations = (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations;
    expect(violations, route).toEqual([]);
    for (const href of await page
      .locator("a[href]")
      .evaluateAll((elements) =>
        elements.map((el) => el.getAttribute("href")!),
      ))
      if (href.startsWith("/")) links.add(href);
      else if (href.startsWith("#")) links.add(`${route}${href}`);
  }
  for (const href of links) {
    const response = await request.get(href.split("#")[0] || "/");
    expect(response.status(), href).toBeLessThan(400);
    if (href.includes("#"))
      expect(await response.text(), href).toContain(
        `id="${href.split("#")[1]}"`,
      );
  }
  expect(errors).toEqual([]);
});
test("mobile, tablet and desktop layouts have no overflow and logo loads", async ({
  page,
}) => {
  for (const width of [320, 360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} at ${width}`,
      ).toBe(true);
    }
    await page.goto("/");
    await expect(page.locator(".brand img")).toBeVisible();
    expect(
      await page
        .locator(".brand img")
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: true,
    });
  }
});
test("mobile menu traps focus, closes on Escape and navigates", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(
    page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Study", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: "Close navigation" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Career", exact: true })
    .click();
  await expect(page).toHaveURL(/\/career$/);
  await expect(toggle).toBeVisible();
});
test("FAQ works with keyboard and reduced motion is respected", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#faqs");
  const summary = page
    .locator("summary")
    .filter({ hasText: "How much assignment support" });
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByText("Support can cover the full development process", {
      exact: false,
    }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});
test("WhatsApp button opens the configured support chat", async ({ page }) => {
  await page.goto("/");
  const button = page.getByRole("link", {
    name: "Chat with CampusLync on WhatsApp",
  });
  await expect(button).toBeVisible();
  await expect(button).toHaveAttribute(
    "href",
    /https:\/\/wa\.me\/919119235092\?text=/,
  );
  await expect(button).toHaveAttribute("target", "_blank");
});
async function fillForm(page: import("@playwright/test").Page) {
  await page.getByLabel("Name", { exact: true }).fill("Test Student");
  await page
    .getByRole("textbox", { name: "Email", exact: true })
    .fill("student@example.com");
  await page.getByLabel("Current country").fill("India");
  await page.getByLabel("Country of study").fill("Canada");
  await page
    .getByLabel("Message", { exact: true })
    .fill("Please help me plan my academic research.");
  await page.getByLabel("I agree to the").check();
}
test("enquiry validates, preselects service, requires phone and handles unavailable delivery", async ({
  page,
}) => {
  await page.goto("/contact?service=Academic%20Support");
  await expect(page.getByLabel("Service needed")).toHaveValue(
    "Academic Support",
  );
  await page.getByRole("button", { name: "Request Support" }).click();
  await expect(
    page.getByText("Please check the following fields:"),
  ).toBeVisible();
  await fillForm(page);
  await page.getByRole("radio", { name: "WhatsApp" }).check();
  await page.getByRole("button", { name: "Request Support" }).click();
  await expect(page.locator("#phone-error")).toBeVisible();
  await page.getByRole("radio", { name: "Email", exact: true }).check();
  await page.route("**/api/enquiries", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({
        status: "unavailable",
        message: "Your enquiry has not been sent.",
      }),
    }),
  );
  await page.getByRole("button", { name: "Request Support" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your enquiry has not been sent.",
  );
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue(
    "Test Student",
  );
});
test("network failure is honest and preserves input", async ({ page }) => {
  await page.goto("/contact?service=Academic%20Support");
  await fillForm(page);
  await page.route("**/api/enquiries", (route) => route.abort());
  await page.getByRole("button", { name: "Request Support" }).click();
  await expect(page.getByRole("status")).toContainText(
    "We could not confirm delivery.",
  );
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue(
    "Test Student",
  );
});
test("success interface appears only for confirmed response", async ({
  page,
}) => {
  await page.goto("/contact?service=Academic%20Support");
  await fillForm(page);
  await page.route("**/api/enquiries", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        status: "sent",
        message: "Your support request has been sent.",
      }),
    }),
  );
  await page.getByRole("button", { name: "Request Support" }).click();
  await expect(
    page.getByRole("heading", { name: "Thank you for reaching out." }),
  ).toBeVisible();
});
test("API rejects bad requests, oversized input and cross-origin requests", async ({
  request,
}) => {
  expect((await request.post("/api/enquiries", { data: {} })).status()).toBe(
    400,
  );
  expect(
    (
      await request.post("/api/enquiries", {
        data: { companyWebsite: "https://spam.example" },
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/enquiries", {
        headers: { "Content-Type": "application/json" },
        data: "{",
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/enquiries", {
        data: { message: "a".repeat(25000) },
      })
    ).status(),
  ).toBe(413);
  expect(
    (
      await request.post("/api/enquiries", {
        headers: { origin: "https://invalid.example" },
        data: {},
      })
    ).status(),
  ).toBe(403);
});
test("health endpoint reports database readiness without exposing details", async ({
  request,
}) => {
  const response = await request.get("/api/health");
  expect([200, 503]).toContain(response.status());
  const body = await response.json();
  expect(body.status).toMatch(/^(ok|not_ready)$/);
  expect(JSON.stringify(body)).not.toContain("DATABASE_URL");
});
test("404, sitemap, robots and social image are available", async ({
  page,
  request,
}) => {
  const response = await page.goto("/not-a-page");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Let’s get you back on track." }),
  ).toBeVisible();
  for (const route of [
    "/sitemap.xml",
    "/robots.txt",
    "/opengraph-image",
    "/icon.svg",
  ])
    expect((await request.get(route)).status()).toBe(200);
});
