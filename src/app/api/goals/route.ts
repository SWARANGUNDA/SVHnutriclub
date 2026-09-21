import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";

export async function GET(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const goals = await db.goal.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ goals });
  } catch (cause) {
    console.error("Error fetching goals:", cause);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const body = await req.json();
    
    const goal = await db.goal.create({
      data: {
        title: body.title,
        type: body.type || "GENERAL",
        startingValue: body.startingValue ? parseFloat(body.startingValue) : null,
        targetValue: body.targetValue ? parseFloat(body.targetValue) : null,
        unit: body.unit,
        userId: user.id,
      }
    });

    return NextResponse.json({ success: true, goal });
  } catch (cause) {
    console.error("Error creating goal:", cause);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
