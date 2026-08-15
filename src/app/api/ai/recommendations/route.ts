import { NextResponse } from "next/server";
import { aiGenerate } from "@/lib/ai/provider";
import { SYSTEM_PROMPTS, buildProductRecommendationPrompt } from "@/lib/ai/prompts";
import { enforceRateLimit, parseJson } from "@/lib/api-security";
import { requireAuthApi } from "@/lib/auth-helpers";
import { recommendationRequestSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const rateLimitError = enforceRateLimit(req);
    if (rateLimitError) return rateLimitError;
    const { error: authError } = await requireAuthApi();
    if (authError) return authError;
    const { data: body, error } = await parseJson(req, recommendationRequestSchema);
    if (error) return error;
    const prompt = buildProductRecommendationPrompt({
      goals: body.goals || ["general wellness"],
      bmi: body.bmi,
      bodyFat: body.bodyFat,
      concerns: body.concerns,
    });

    const result = await aiGenerate(prompt, {
      systemPrompt: SYSTEM_PROMPTS.productRecommendation,
      json: true,
      maxTokens: 1200,
      temperature: 0.5,
    });

    const responseData = JSON.parse(result.text);
    return NextResponse.json({ ...responseData, provider: result.provider, latencyMs: result.latencyMs });
  } catch (error) {
    console.error("[API] Recommendations error:", error);
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 });
  }
}
