import { NextResponse } from "next/server";
import { aiGenerate } from "@/lib/ai/provider";
import { SYSTEM_PROMPTS, buildBodyAnalysisPrompt } from "@/lib/ai/prompts";
import { enforceRateLimit, parseJson } from "@/lib/api-security";
import { requireAuthApi } from "@/lib/auth-helpers";
import { bodyAnalysisRequestSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const rateLimitError = enforceRateLimit(req);
    if (rateLimitError) return rateLimitError;
    const { error: authError } = await requireAuthApi();
    if (authError) return authError;
    const { data, error } = await parseJson(req, bodyAnalysisRequestSchema);
    if (error) return error;
    const prompt = buildBodyAnalysisPrompt(data.metrics);

    const result = await aiGenerate(prompt, {
      systemPrompt: SYSTEM_PROMPTS.bodyAnalysis,
      json: true,
      maxTokens: 1500,
      temperature: 0.4,
    });

    const analysis = JSON.parse(result.text);
    return NextResponse.json({
      ...analysis,
      provider: result.provider,
      latencyMs: result.latencyMs,
    });
  } catch (error) {
    console.error("[API] Body analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze body metrics" },
      { status: 500 }
    );
  }
}
