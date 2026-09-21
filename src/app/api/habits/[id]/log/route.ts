import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;
    const userId = user.id;
    const resolvedParams = await params;
    const habitId = resolvedParams.id;

    // Verify ownership
    const existing = await db.habit.findUnique({ where: { id: habitId } });
    if (!existing || existing.userId !== userId) {
      return NextResponse.json({ error: "Not Found or Unauthorized" }, { status: 404 });
    }

    const body = await req.json();
    const date = body.date ? new Date(body.date) : new Date();
    // Normalize date to midnight UTC for exact matching
    date.setUTCHours(0, 0, 0, 0);

    const log = await db.habitLog.upsert({
      where: {
        habitId_date: {
          habitId,
          date
        }
      },
      update: {
        completed: body.completed
      },
      create: {
        habitId,
        date,
        completed: body.completed
      }
    });

    // Update streak logic (simplified)
    const newStreak = body.completed ? existing.streak + 1 : Math.max(0, existing.streak - 1);
    
    await db.habit.update({
      where: { id: habitId },
      data: { 
        streak: newStreak,
        longestStreak: Math.max(existing.longestStreak, newStreak)
      }
    });

    return NextResponse.json({ success: true, log });
  } catch (error) {
    console.error("Error logging habit:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
