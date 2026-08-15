import { NextResponse } from "next/server";
import { ZodError, type ZodType } from "zod";

const MAX_BODY_BYTES = 24_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const requests = new Map<string, { count: number; resetAt: number }>();

export function rejectLargeRequest(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request body is too large" }, { status: 413 });
  }
  return null;
}

export function enforceRateLimit(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const key = forwardedFor?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const current = requests.get(key);

  if (!current || current.resetAt <= now) {
    requests.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return null;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((current.resetAt - now) / 1000)) } }
    );
  }

  current.count += 1;
  return null;
}

export async function parseJson<T>(request: Request, schema: ZodType<T>) {
  const bodyTooLarge = rejectLargeRequest(request);
  if (bodyTooLarge) return { data: null, error: bodyTooLarge };

  try {
    const data = schema.parse(await request.json());
    return { data, error: null };
  } catch (error) {
    const message = error instanceof ZodError ? error.issues[0]?.message : "Invalid JSON body";
    return { data: null, error: NextResponse.json({ error: message }, { status: 400 }) };
  }
}
