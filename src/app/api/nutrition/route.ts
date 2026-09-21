import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";

export async function GET(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const url = new URL(req.url);
    const dateQuery = url.searchParams.get("date");
    
    // Parse date query or use today
    const targetDate = dateQuery ? new Date(dateQuery) : new Date();
    targetDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(targetDate);
    nextDay.setDate(targetDate.getDate() + 1);

    const logs = await db.nutritionLog.findMany({
      where: {
        userId: user.id,
        date: {
          gte: targetDate,
          lt: nextDay
        }
      },
      orderBy: { createdAt: 'asc' }
    });

    return NextResponse.json({ logs });
  } catch (cause) {
    console.error("Error fetching nutrition logs:", cause);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const body = await req.json();
    
    const log = await db.nutritionLog.create({
      data: {
        userId: user.id,
        mealType: body.mealType, // BREAKFAST, LUNCH, DINNER, SNACK
        foodName: body.foodName,
        calories: body.calories ? parseInt(body.calories) : null,
        protein: body.protein ? parseFloat(body.protein) : null,
        carbs: body.carbs ? parseFloat(body.carbs) : null,
        fats: body.fats ? parseFloat(body.fats) : null,
        date: body.date ? new Date(body.date) : undefined
      }
    });

    return NextResponse.json({ success: true, log });
  } catch (cause) {
    console.error("Error creating nutrition log:", cause);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
