import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectFile = (...parts) => resolve(process.cwd(), ...parts);

async function source(...parts) {
  return readFile(projectFile(...parts), "utf8");
}

test("admin layout requires the ADMIN role on the server", async () => {
  const adminLayout = await source("src", "app", "admin", "layout.tsx");
  assert.match(adminLayout, /await requireAdmin\(\)/);
});

test("health-data AI routes require authentication and validate their request", async () => {
  const protectedRoutes = ["body-analysis", "health-score", "meal-plan", "motivation", "recommendations", "report"];

  for (const route of protectedRoutes) {
    const content = await source("src", "app", "api", "ai", route, "route.ts");
    assert.match(content, /requireAuthApi/);
    assert.match(content, /parseJson/);
    assert.match(content, /enforceRateLimit/);
  }
});

test("public AI routes remain rate-limited and validated", async () => {
  const publicRoutes = ["faq", "search", "translate"];

  for (const route of publicRoutes) {
    const content = await source("src", "app", "api", "ai", route, "route.ts");
    assert.match(content, /parseJson/);
    assert.match(content, /enforceRateLimit/);
  }
});
