import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";

export async function GET(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const habits = await db.habit.findMany({
      where: { userId: user.id, isActive: true },
      include: {
        logs: {
          orderBy: { date: 'desc' },
          take: 14 // Last 14 days
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ habits });
  } catch (cause) {
    console.error("Error fetching habits:", cause);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const body = await req.json();
    
    const habit = await db.habit.create({
      data: {
        title: body.title,
        userId: user.id,
      }
    });

    return NextResponse.json({ success: true, habit });
  } catch (cause) {
    console.error("Error creating habit:", cause);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
