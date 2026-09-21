import { NextResponse } from "next/server";
import { z } from "zod";

const profileSchema = z.object({
  age: z.number().min(18).max(120).optional().nullable(),
  gender: z.string().optional().nullable(),
  foodDislikes: z.string().optional().nullable(),
  wellnessGoal: z.string().optional().nullable(),
  activityLevel: z.string().optional().nullable(),
  preferredLanguage: z.string().default("en-US"),
  climate: z.string().optional().nullable(),
  sleepTarget: z.number().min(4).max(12).optional().nullable(),
  waterTarget: z.number().min(1).max(8).optional().nullable(),
  dailyStepsTarget: z.number().min(1000).max(50000).optional().nullable(),
});

import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";

export async function GET(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const profile = await db.wellnessProfile.findUnique({
      where: { userId: user.id },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const body = await req.json();
    
    const profile = await db.wellnessProfile.upsert({
      where: { userId: user.id },
      update: {
        age: body.age ? parseInt(body.age) : undefined,
        gender: body.gender,
        dietaryPreference: body.dietaryPreference,
        foodAllergies: body.foodAllergies,
        foodDislikes: body.foodDislikes,
        wellnessGoal: body.wellnessGoal,
        activityLevel: body.activityLevel,
        preferredLanguage: body.preferredLanguage,
        climate: body.climate,
        sleepTarget: body.sleepTarget ? parseFloat(body.sleepTarget) : undefined,
        waterTarget: body.waterTarget ? parseFloat(body.waterTarget) : undefined,
        dailyStepsTarget: body.dailyStepsTarget ? parseInt(body.dailyStepsTarget) : undefined,
      },
      create: {
        userId: user.id,
        age: body.age ? parseInt(body.age) : undefined,
        gender: body.gender,
        dietaryPreference: body.dietaryPreference,
        foodAllergies: body.foodAllergies,
        foodDislikes: body.foodDislikes,
        wellnessGoal: body.wellnessGoal,
        activityLevel: body.activityLevel,
        preferredLanguage: body.preferredLanguage || "en-US",
        climate: body.climate,
        sleepTarget: body.sleepTarget ? parseFloat(body.sleepTarget) : undefined,
        waterTarget: body.waterTarget ? parseFloat(body.waterTarget) : undefined,
        dailyStepsTarget: body.dailyStepsTarget ? parseInt(body.dailyStepsTarget) : undefined,
      }
    });

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
