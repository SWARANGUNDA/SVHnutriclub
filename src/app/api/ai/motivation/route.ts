import { NextResponse } from "next/server";
import { aiGenerate } from "@/lib/ai/provider";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";
import { enforceRateLimit, parseJson } from "@/lib/api-security";
import { requireAuthApi } from "@/lib/auth-helpers";
import { motivationRequestSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const rateLimitError = enforceRateLimit(req);
    if (rateLimitError) return rateLimitError;
    const { error: authError } = await requireAuthApi();
    if (authError) return authError;
    const { data, error } = await parseJson(req, motivationRequestSchema);
    if (error) return error;
    const { progress, streak, recentActivity } = data;

    const prompt = `Generate a personalized motivational message for a wellness journey member.
${progress ? `- Recent progress: ${progress}` : ""}
${streak ? `- Current streak: ${streak} days` : ""}
${recentActivity ? `- Recent activity: ${recentActivity}` : ""}

Keep it warm, specific, and 2-3 sentences.`;

    const result = await aiGenerate(prompt, {
      systemPrompt: SYSTEM_PROMPTS.motivation,
      maxTokens: 200,
      temperature: 0.8,
    });

    return NextResponse.json({
      message: result.text,
      provider: result.provider,
      latencyMs: result.latencyMs,
    });
  } catch (error) {
    console.error("[API] Motivation error:", error);
    return NextResponse.json({ error: "Failed to generate motivation" }, { status: 500 });
  }
}
