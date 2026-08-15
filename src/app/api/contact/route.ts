import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { enforceRateLimit, parseJson } from "@/lib/api-security";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const rateLimitError = enforceRateLimit(request);
  if (rateLimitError) return rateLimitError;

  const { data, error } = await parseJson(request, contactSchema);
  if (error) return error;

  try {
    const session = await auth();
    const inquiry = await db.contactInquiry.create({
      data: { ...data, userId: session?.user?.id },
      select: { id: true, status: true, createdAt: true },
    });
    return NextResponse.json({ inquiry }, { status: 201 });
  } catch (cause) {
    console.error("[API] Contact create error:", cause);
    return NextResponse.json({ error: "Unable to save contact request" }, { status: 503 });
  }
}
