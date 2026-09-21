import { NextResponse } from "next/server";
import { requireAuthApi } from "@/lib/auth-helpers";

export async function POST(req: Request) {
  const { user, error } = await requireAuthApi();
  if (error) return error;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // In a real application, upload this file to Supabase Storage or Cloudinary
    // For now, return a placeholder URL for testing without OCR
    const uploadUrl = "https://example.com/placeholder.png";

    const performOCR = formData.get("performOCR") === "true";

    if (performOCR) {
      if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json({ error: "OCR_NOT_CONFIGURED" }, { status: 501 });
      }

      try {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const arrayBuffer = await file.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString("base64");
        const mimeType = file.type || "image/jpeg";

        const prompt = `You are an OCR and data extraction system for a smart body scale. Extract the following body metrics from the image: weight, height, bmi, bmr, bodyFat, muscleMass, visceralFat, waterPercent, boneMass, metabolicAge. Return ONLY a valid JSON object with the numeric values found (no markdown formatting, no code blocks, just raw JSON). Use null for any metric not found.`;

        const result = await model.generateContent({
          contents: [{ 
            role: "user", 
            parts: [
              { text: prompt },
              { inlineData: { data: base64Data, mimeType } }
            ] 
          }],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: "application/json",
          }
        });

        const extractedData = JSON.parse(result.response.text());

        return NextResponse.json({
          success: true,
          url: uploadUrl,
          extractedData
        });
      } catch (ocrError) {
        console.error("[API] Gemini OCR error:", ocrError);
        return NextResponse.json({ error: "OCR extraction failed" }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      url: uploadUrl,
    });

  } catch (cause) {
    console.error("[API] Upload error:", cause);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
