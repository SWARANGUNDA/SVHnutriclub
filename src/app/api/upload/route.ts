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
    // e.g. const url = await uploadToCloudinary(file);
    
    // For mock mode, we simulate a delay and return a dummy URL
    await new Promise(r => setTimeout(r, 1000));
    
    const mockUrl = "https://mock.cloudinary.com/image/upload/v1/simulated_upload.png";

    // If the client requested OCR extraction (e.g. from the body scan page)
    const performOCR = formData.get("performOCR") === "true";
    let extractedData = null;

    if (performOCR) {
      // Simulate OCR extraction from a smart scale screenshot
      await new Promise(r => setTimeout(r, 1500));
      extractedData = {
        weight: 76.2,
        bodyFat: 21.5,
        muscleMass: 43.1,
        waterPercent: 54.2,
        boneMass: 3.2,
      };
    }

    return NextResponse.json({
      success: true,
      url: mockUrl,
      extractedData
    });

  } catch (cause) {
    console.error("[API] Upload error:", cause);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
