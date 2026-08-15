import { NextResponse } from "next/server";
import { aiGenerate } from "@/lib/ai/provider";
import { enforceRateLimit, parseJson } from "@/lib/api-security";
import { translateRequestSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const rateLimitError = enforceRateLimit(req);
    if (rateLimitError) return rateLimitError;
    const { data, error } = await parseJson(req, translateRequestSchema);
    if (error) return error;

    const langNames: Record<string, string> = {
      en: "English",
      te: "Telugu",
      hi: "Hindi",
    };

    const prompt = `Translate the following text to ${langNames[data.targetLang]}. Return ONLY the translated text, nothing else.\n\nText: "${data.text}"`;

    const result = await aiGenerate(prompt, {
      systemPrompt: "You are a professional translator. Translate accurately and naturally. Return only the translated text.",
      maxTokens: 500,
      temperature: 0.3,
    });

    return NextResponse.json({
      translation: result.text.replace(/^["']|["']$/g, "").trim(),
      provider: result.provider,
    });
  } catch (error) {
    console.error("[API] Translate error:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
