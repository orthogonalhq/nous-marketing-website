import { NextResponse } from "next/server";
import { addWaitlistSubscriber } from "@/lib/waitlist-db";

const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const allowedPlatforms = new Set(["macos", "windows", "linux", "unknown"]);

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body === "object" && body !== null && "email" in body ? String((body as { email: unknown }).email).trim().toLowerCase() : "";
  const platformInput = typeof body === "object" && body !== null && "platform" in body ? String((body as { platform: unknown }).platform).trim().toLowerCase() : "unknown";
  const source = typeof body === "object" && body !== null && "source" in body ? String((body as { source: unknown }).source).trim().slice(0, 80) : "website";
  const platform = allowedPlatforms.has(platformInput) ? platformInput : "unknown";

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const result = await addWaitlistSubscriber({ email, platform, source });

    if (!result.ok && result.error === "already_subscribed") {
      return NextResponse.json({ error: "You're already on the list." }, { status: 409 });
    }

    return NextResponse.json({ message: "You're on the list. We'll send one email when your early access path is ready." });
  } catch (error) {
    if (error instanceof Error && error.message.includes("TURSO_DATABASE_URL")) {
      return NextResponse.json({ error: "The waitlist is not configured yet. Email hello@nue.orthg.nl and we will add you manually." }, { status: 503 });
    }

    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
