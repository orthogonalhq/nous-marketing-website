import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("validate-env", () => {
  it("fails Vercel builds when waitlist env vars are missing", () => {
    const result = spawnSync(process.execPath, ["scripts/validate-env.mjs"], {
      env: {
        ...process.env,
        TURSO_AUTH_TOKEN: "",
        TURSO_DATABASE_URL: "",
        VERCEL: "1"
      },
      encoding: "utf8"
    });

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("TURSO_DATABASE_URL");
    expect(result.stderr).toContain("TURSO_AUTH_TOKEN");
  });

  it("passes non-Vercel local builds without waitlist env vars", () => {
    const result = spawnSync(process.execPath, ["scripts/validate-env.mjs"], {
      env: {
        ...process.env,
        TURSO_AUTH_TOKEN: "",
        TURSO_DATABASE_URL: "",
        VERCEL: ""
      },
      encoding: "utf8"
    });

    expect(result.status).toBe(0);
  });
});
