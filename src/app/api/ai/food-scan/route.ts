import { NextResponse } from "next/server";
import { requireAuthApi } from "@/lib/auth-helpers";
import { enforceRateLimit } from "@/lib/api-security";

export async function POST(req: Request) {
  try {
    const rateLimitError = enforceRateLimit(req);
    if (rateLimitError) return rateLimitError;

    const { error: authError } = await requireAuthApi();
    if (authError) return authError;

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "AI_NOT_CONFIGURED" }, { status: 501 });
    }

    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const arrayBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");
    const mimeType = file.type || "image/jpeg";

    const prompt = `You are a nutrition expert AI. Analyze this image of a food/meal and estimate its nutritional content. Return ONLY a valid JSON object with: 
      foodName (string), 
      calories (number), 
      protein (number), 
      carbs (number), 
      fats (number), 
      description (string, brief summary of the food), 
      confidence (number, 0-100 indicating how confident you are in the estimation). 
      IMPORTANT: This is an estimation, so provide your best educated guess based on standard portion sizes. Return raw JSON with no markdown formatting.`;

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          { text: prompt },
          { inlineData: { data: base64Data, mimeType } }
        ]
      }],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
      }
    });

    const data = JSON.parse(result.response.text());
    return NextResponse.json(data);

  } catch (cause) {
    console.error("[API] Food scan error:", cause);
    return NextResponse.json({ error: "Failed to analyze food image" }, { status: 500 });
  }
}
