import { NextResponse } from "next/server";
import { requireAuthApi } from "@/lib/auth-helpers";

export async function POST(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    // The client should ideally send the file to /api/upload with performOCR=true
    // If it's hitting this endpoint directly, we check for an OCR provider.
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "OCR_NOT_CONFIGURED" }, { status: 501 });
    }

    // In a full implementation, we'd process the formData file here.
    // For now, we return 501 until file parsing is passed properly or redirect to /api/upload.
    return NextResponse.json({ error: "NOT_IMPLEMENTED" }, { status: 501 });
  } catch (cause) {
    console.error("Error processing scan upload:", cause);
    return NextResponse.json({ error: "Failed to process document" }, { status: 500 });
  }
}
