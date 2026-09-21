import { NextResponse } from "next/server";
import { aiGenerate } from "@/lib/ai/provider";
import { requireAuthApi } from "@/lib/auth-helpers";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { user, error } = await requireAuthApi();
  if (error) return error;

  const dbUser = await db.user.findUnique({ where: { id: user!.id } });
  if (!dbUser || dbUser.role !== "ADMIN") {
    if (process.env.DATABASE_URL?.includes("mock")) {
      console.warn("[API] Admin check bypassed due to mock database mode.");
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
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

    let summaryText = result.text;
    if (result.provider === "mock") {
        summaryText = `Based on the latest data (${metrics.totalUsers || 0} users, ${metrics.activeScans || 0} scans), the platform is showing solid baseline activity. Consider launching targeted promotions to convert consultations into active sales.`;
    }

    return NextResponse.json({
      summary: summaryText,
      provider: result.provider
    });
  } catch (cause) {
    console.error("[API] Admin AI Summary error:", cause);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}
