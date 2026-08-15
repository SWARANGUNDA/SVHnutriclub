import { NextResponse } from "next/server";
import { aiGenerate } from "@/lib/ai/provider";
import { SYSTEM_PROMPTS, buildMealPlanPrompt } from "@/lib/ai/prompts";
import { enforceRateLimit, parseJson } from "@/lib/api-security";
import { requireAuthApi } from "@/lib/auth-helpers";
import { mealPlanRequestSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const rateLimitError = enforceRateLimit(req);
    if (rateLimitError) return rateLimitError;
    const { error: authError } = await requireAuthApi();
    if (authError) return authError;
    const { data: body, error } = await parseJson(req, mealPlanRequestSchema);
    if (error) return error;
    const prompt = buildMealPlanPrompt({
      goal: body.goal || "general wellness",
      calories: body.calories,
      bmi: body.bmi,
      bodyFat: body.bodyFat,
      activityLevel: body.activityLevel,
      allergies: body.allergies,
      preferences: body.preferences,
    });

    const result = await aiGenerate(prompt, {
      systemPrompt: SYSTEM_PROMPTS.mealPlan,
      json: true,
      maxTokens: 2000,
      temperature: 0.6,
    });

    const plan = JSON.parse(result.text);
    return NextResponse.json({
      ...plan,
      provider: result.provider,
      latencyMs: result.latencyMs,
    });
  } catch (error) {
    console.error("[API] Meal plan error:", error);
    return NextResponse.json({ error: "Failed to generate meal plan" }, { status: 500 });
  }
}
