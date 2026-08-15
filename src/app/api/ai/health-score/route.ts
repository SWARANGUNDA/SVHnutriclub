import { NextResponse } from "next/server";
import { aiGenerate } from "@/lib/ai/provider";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";
import { enforceRateLimit, parseJson } from "@/lib/api-security";
import { requireAuthApi } from "@/lib/auth-helpers";
import { healthScoreRequestSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const rateLimitError = enforceRateLimit(req);
    if (rateLimitError) return rateLimitError;
    const { error: authError } = await requireAuthApi();
    if (authError) return authError;
    const { data: body, error } = await parseJson(req, healthScoreRequestSchema);
    if (error) return error;
    const metrics = body.metrics;

    const prompt = `Analyze these body metrics and calculate a health score:
${Object.entries(metrics).filter(([, v]) => v != null).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

Return a health score (0-100), grade, summary, category insights, and improvement recommendations.`;

    const result = await aiGenerate(prompt, {
      systemPrompt: SYSTEM_PROMPTS.bodyAnalysis,
      json: true,
      maxTokens: 1200,
      temperature: 0.4,
    });

    const data = JSON.parse(result.text);
    return NextResponse.json({ ...data, provider: result.provider, latencyMs: result.latencyMs });
  } catch (error) {
    console.error("[API] Health score error:", error);
    return NextResponse.json({ error: "Failed to calculate health score" }, { status: 500 });
  }
}
