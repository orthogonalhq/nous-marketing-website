import { createClient, type Client } from "@libsql/client";

let client: Client | null = null;
let initialized = false;

type AddWaitlistSubscriberInput = {
  email: string;
  platform?: string;
  source?: string;
};

function getClient() {
  const url = process.env.TURSO_DATABASE_URL;

  if (!url) {
    throw new Error("TURSO_DATABASE_URL is not configured");
  }

  client ??= createClient({
    authToken: process.env.TURSO_AUTH_TOKEN,
    url
  });

  return client;
}

async function init() {
  if (initialized) {
    return;
  }

  await getClient().execute(`
    CREATE TABLE IF NOT EXISTS nue_waitlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      source TEXT,
      platform TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
  initialized = true;
}

export async function addWaitlistSubscriber({ email, platform, source }: AddWaitlistSubscriberInput): Promise<{ error?: "already_subscribed"; ok: boolean }> {
  await init();

  try {
    await getClient().execute({
      args: [email, source ?? null, platform ?? null],
      sql: "INSERT INTO nue_waitlist (email, source, platform) VALUES (?, ?, ?)"
    });

    return { ok: true };
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes("UNIQUE constraint failed")) {
      return { error: "already_subscribed", ok: false };
    }

    throw error;
  }
}
