import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";
import { z } from "zod";

const reminderSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(["WATER", "MEAL", "HABIT", "CONSULTATION", "OTHER"]),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/), // HH:MM
  days: z.array(z.number().min(0).max(6)),
  isActive: z.boolean().default(true),
});

export async function GET(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const reminders = await db.reminder.findMany({
      where: { userId: user.id },
      orderBy: { time: "asc" },
    });

    return NextResponse.json({ reminders });
  } catch (cause) {
    console.error("[API] Get reminders error:", cause);
    return NextResponse.json({ error: "Failed to fetch reminders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const body = await req.json();
    const result = reminderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid reminder data" }, { status: 400 });
    }

    const reminder = await db.reminder.create({
      data: {
        ...result.data,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, reminder });
  } catch (cause) {
    console.error("[API] Create reminder error:", cause);
    return NextResponse.json({ error: "Failed to create reminder" }, { status: 500 });
  }
}
