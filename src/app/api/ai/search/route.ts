import { NextResponse } from "next/server";
import { aiGenerate } from "@/lib/ai/provider";
import { SYSTEM_PROMPTS, buildSearchPrompt } from "@/lib/ai/prompts";
import { enforceRateLimit, parseJson } from "@/lib/api-security";
import { searchRequestSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const rateLimitError = enforceRateLimit(req);
    if (rateLimitError) return rateLimitError;
    const { data, error } = await parseJson(req, searchRequestSchema);
    if (error) return error;

    const prompt = buildSearchPrompt(data.query);
    const result = await aiGenerate(prompt, {
      systemPrompt: SYSTEM_PROMPTS.smartSearch,
      json: true,
      maxTokens: 1000,
      temperature: 0.3,
    });

    const responseData = JSON.parse(result.text);
    return NextResponse.json({ ...responseData, provider: result.provider, latencyMs: result.latencyMs });
  } catch (error) {
    console.error("[API] Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
