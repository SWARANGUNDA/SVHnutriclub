import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { enforceRateLimit, parseJson } from "@/lib/api-security";
import { consultationSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const rateLimitError = enforceRateLimit(request);
  if (rateLimitError) return rateLimitError;

  const { data, error } = await parseJson(request, consultationSchema);
  if (error) return error;

  const date = new Date(data.date);
  if (Number.isNaN(date.getTime())) {
    return NextResponse.json({ error: "Date must be valid" }, { status: 400 });
  }

  try {
    const session = await auth();
    const consultation = await db.consultation.create({
      data: {
        ...data,
        date,
        userId: session?.user?.id,
      },
      select: { id: true, status: true, date: true, time: true },
    });
    return NextResponse.json({ consultation }, { status: 201 });
  } catch (cause) {
    console.error("[API] Consultation create error:", cause);
    return NextResponse.json({ error: "Unable to save consultation request" }, { status: 503 });
  }
}
