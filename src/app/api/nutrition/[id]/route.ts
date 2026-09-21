import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const resolvedParams = await params;
    const logId = resolvedParams.id;
    const existing = await db.nutritionLog.findUnique({ where: { id: logId } });
    
    if (!existing || existing.userId !== user.id) {
      return NextResponse.json({ error: "Not Found or Unauthorized" }, { status: 404 });
    }

    await db.nutritionLog.delete({ where: { id: logId } });

    return NextResponse.json({ success: true });
  } catch (cause) {
    console.error("Error deleting nutrition log:", cause);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
