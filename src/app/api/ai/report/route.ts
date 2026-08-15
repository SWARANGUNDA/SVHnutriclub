import { NextResponse } from "next/server";
import { aiGenerate } from "@/lib/ai/provider";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";
import { enforceRateLimit, parseJson } from "@/lib/api-security";
import { requireAuthApi } from "@/lib/auth-helpers";
import { reportRequestSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const rateLimitError = enforceRateLimit(req);
    if (rateLimitError) return rateLimitError;
    const { error: authError } = await requireAuthApi();
    if (authError) return authError;
    const { data, error } = await parseJson(req, reportRequestSchema);
    if (error) return error;
    const { metrics, healthScore, grade, name } = data;

    const prompt = `Generate a personalized wellness report summary for ${name || "the user"}.
Metrics: ${JSON.stringify(metrics)}
Current Health Score: ${healthScore} (${grade})

Please provide a professional, structured report including:
1. Executive Summary
2. Key Metrics Analysis
3. Recommended Action Plan
4. Nutritional Guidance`;

    const result = await aiGenerate(prompt, {
      systemPrompt: SYSTEM_PROMPTS.reportSummary,
      maxTokens: 1500,
      temperature: 0.5,
    });

    return NextResponse.json({
      report: result.text,
      provider: result.provider,
    });
  } catch (error) {
    console.error("[API] Report generator error:", error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
