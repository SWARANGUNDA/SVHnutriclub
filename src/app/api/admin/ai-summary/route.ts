import { NextResponse } from "next/server";
import { aiGenerate } from "@/lib/ai/provider";
import { requireAuthApi } from "@/lib/auth-helpers";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { user, error } = await requireAuthApi();
  if (error) return error;

  const dbUser = await db.user.findUnique({ where: { id: user!.id } });
  if (!dbUser || dbUser.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { metrics } = await req.json();

    const prompt = `You are a business intelligence analyst for the SVH Nutrition Club platform.
Review the following high-level metrics and provide a 2-3 sentence executive summary.
Metrics: ${JSON.stringify(metrics, null, 2)}`;

    const result = await aiGenerate(prompt, {
      systemPrompt: "You are an expert analyst. Provide brief, concise executive summaries.",
      json: false,
      maxTokens: 200,
      temperature: 0.5,
    });

    if (result.provider === "mock") {
        return NextResponse.json({ error: "AI_NOT_CONFIGURED" }, { status: 501 });
    }

    return NextResponse.json({
      summary: result.text,
      provider: result.provider
    });
  } catch (cause) {
    console.error("[API] Admin AI Summary error:", cause);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}
