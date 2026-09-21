import { NextResponse } from "next/server";
import { requireAuthApi } from "@/lib/auth-helpers";
import { enforceRateLimit, parseJson } from "@/lib/api-security";
import { z } from "zod";

const chatSchema = z.object({
  message: z.string().min(1).max(500),
  history: z.array(z.object({
    role: z.enum(["user", "model"]),
    parts: z.array(z.object({ text: z.string() }))
  })).optional().default([]),
});

export async function POST(req: Request) {
  try {
    const rateLimitError = enforceRateLimit(req);
    if (rateLimitError) return rateLimitError;

    const { error: authError, user } = await requireAuthApi();
    if (authError) return authError;

    const { data, error } = await parseJson(req, chatSchema);
    if (error) return error;

    if (!process.env.GEMINI_API_KEY) {
      // Mock mode
      await new Promise(r => setTimeout(r, 1000));
      return NextResponse.json({
        response: "Hello! I am your AI Wellness Assistant. Since the API key is not set, I am currently in mock mode. How can I help you on your wellness journey today?"
      });
    }

    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: data.history,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const systemPrompt = `You are SVH Nutrition Club's AI Wellness Assistant. You are currently talking to ${user?.name || "a valued member"}. Be supportive, polite, and use emojis occasionally. Answer questions about nutrition, wellness, and Herbalife products accurately. Keep your answers brief and readable (under 100 words where possible). If you don't know something, recommend they book a consultation with our experts. DO NOT give medical advice; state clearly that you are a wellness assistant if asked about diseases.`;

    const result = await chat.sendMessage(`SYSTEM NOTE: ${systemPrompt}\n\nUSER MESSAGE: ${data.message}`);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });

  } catch (cause) {
    console.error("[API] AI Chat error:", cause);
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 });
  }
}
