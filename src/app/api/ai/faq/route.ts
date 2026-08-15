import { NextResponse } from "next/server";
import { aiGenerate } from "@/lib/ai/provider";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";
import { enforceRateLimit, parseJson } from "@/lib/api-security";
import { faqRequestSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const rateLimitError = enforceRateLimit(req);
    if (rateLimitError) return rateLimitError;
    const { data, error } = await parseJson(req, faqRequestSchema);
    if (error) return error;

    const result = await aiGenerate(data.question, {
      systemPrompt: SYSTEM_PROMPTS.faq,
      maxTokens: 800,
      temperature: 0.5,
    });

    return NextResponse.json({
      answer: result.text,
      provider: result.provider,
      latencyMs: result.latencyMs,
    });
  } catch (error) {
    console.error("[API] FAQ error:", error);
    return NextResponse.json({ error: "Failed to answer question" }, { status: 500 });
  }
}
