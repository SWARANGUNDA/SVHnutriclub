import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";
import { getCustomerWellnessContext } from "@/lib/services/wellness-context";
import { aiGenerate } from "@/lib/ai/provider";

export async function GET(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const plan = await db.wellnessPlan.findFirst({
      where: { userId: user.id, isActive: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ plan });
  } catch (cause) {
    console.error("Error fetching wellness plan:", cause);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    // 1. Get the full wellness context for the user
    const context = await getCustomerWellnessContext(user.id);
    if (!context) {
      return NextResponse.json({ error: "Unable to retrieve wellness context" }, { status: 400 });
    }

    // 2. Generate a deterministic plan based on the context
    if (!process.env.GEMINI_API_KEY && !process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "AI_NOT_CONFIGURED" }, { status: 501 });
    }

    const systemPrompt = `You are the SVH Nutrition Club AI Plan Generator.
You must generate a personalized 7-day wellness plan based on the user's profile and latest metrics.
Here is the user context:
${JSON.stringify(context, null, 2)}

Return ONLY a valid JSON object matching this structure exactly:
{
  "summary": "2-sentence summary of the plan strategy",
  "focusAreas": ["area 1", "area 2", "area 3"],
  "dailySchedule": [
    { "time": "08:00 AM", "activity": "breakfast description" },
    { "time": "10:00 AM", "activity": "snack or hydration" },
    { "time": "12:30 PM", "activity": "lunch description" },
    { "time": "04:00 PM", "activity": "afternoon activity/snack" },
    { "time": "07:00 PM", "activity": "dinner description" },
    { "time": "09:30 PM", "activity": "wind down" }
  ]
}`;

    const result = await aiGenerate(systemPrompt, {
      systemPrompt: "You are a JSON-only API. Do not output markdown.",
      json: true,
      temperature: 0.5,
      maxTokens: 1000,
    });

    if (result.provider === "mock") {
      return NextResponse.json({ error: "AI_NOT_CONFIGURED" }, { status: 501 });
    }

    let generatedPlanData;
    try {
      generatedPlanData = JSON.parse(result.text);
    } catch (parseError) {
      console.error("AI returned invalid JSON for plan:", result.text);
      return NextResponse.json({ error: "AI produced invalid format" }, { status: 500 });
    }

    // 3. Deactivate old plans
    await db.wellnessPlan.updateMany({
      where: { userId: user.id, isActive: true },
      data: { isActive: false }
    });

    // 4. Save new plan
    const plan = await db.wellnessPlan.create({
      data: {
        userId: user.id,
        title: "Personalized 7-Day Wellness Plan",
        duration: 7,
        planData: generatedPlanData,
        isActive: true
      }
    });

    return NextResponse.json({ success: true, plan });
  } catch (cause) {
    console.error("Error generating wellness plan:", cause);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
