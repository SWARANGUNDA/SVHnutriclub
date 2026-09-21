import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";
import { z } from "zod";
import { parseJson } from "@/lib/api-security";

const createJournalSchema = z.object({
  title: z.string().min(1, "Title is required").max(200).optional(),
  content: z.string().min(1, "Content is required").max(10_000),
  mood: z.string().max(50).optional(),
});

export async function GET(request: Request) {
  const { user, error } = await requireAuthApi();
  if (error) return error;

  try {
    const entries = await db.journalEntry.findMany({
      where: { userId: user!.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    
    return NextResponse.json({ entries });
  } catch (cause) {
    console.error("[API] Journal fetch error:", cause);
    return NextResponse.json({ error: "Unable to load journal entries" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const { user, error: authError } = await requireAuthApi();
  if (authError) return authError;
  
  const { data, error } = await parseJson(request, createJournalSchema);
  if (error) return error;

  try {
    const entry = await db.journalEntry.create({
      data: {
        title: data.title || new Date().toLocaleDateString(),
        content: data.content,
        mood: data.mood,
        userId: user!.id,
      },
    });
    return NextResponse.json({ entry }, { status: 201 });
  } catch (cause) {
    console.error("[API] Journal create error:", cause);
    return NextResponse.json({ error: "Unable to create journal entry" }, { status: 503 });
  }
}
