import { NextResponse } from "next/server";
import { requireAuthApi } from "@/lib/auth-helpers";
import { getCustomerWellnessContext } from "@/lib/services/wellness-context";
import { aiGenerate } from "@/lib/ai/provider";

export async function POST(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const body = await req.json();
    const message = body.message;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // 1. Retrieve the entire customer wellness context from the single source of truth
    const context = await getCustomerWellnessContext(user.id);
    
    // 2. Here we would integrate with Groq or Gemini SDK.
    if (!process.env.GEMINI_API_KEY && !process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "AI_NOT_CONFIGURED" }, { status: 501 });
    }

    const systemPrompt = `You are the SVH Nutrition Club AI Assistant.
You are helping a user achieve their wellness goals.
Here is their profile and latest metrics context:
${JSON.stringify(context, null, 2)}
Respond concisely, warmly, and helpfully to their message based on this context.`;

    const result = await aiGenerate(message, {
      systemPrompt,
      temperature: 0.7,
      maxTokens: 500,
    });

    if (result.provider === "mock") {
      return NextResponse.json({ error: "AI_NOT_CONFIGURED" }, { status: 501 });
    }

    return NextResponse.json({ 
      success: true, 
      reply: result.text,
      provider: result.provider
    });
  } catch (cause) {
    console.error("Error with AI voice assistant:", cause);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
