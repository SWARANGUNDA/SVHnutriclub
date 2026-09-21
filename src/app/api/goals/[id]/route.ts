import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;
    const resolvedParams = await params;
    const goalId = resolvedParams.id;

    // Verify ownership
    const existing = await db.goal.findUnique({ where: { id: goalId } });
    if (!existing || existing.userId !== user.id) {
      return NextResponse.json({ error: "Not Found or Unauthorized" }, { status: 404 });
    }

    const body = await req.json();
    
    const goal = await db.goal.update({
      where: { id: goalId },
      data: {
        currentValue: body.currentValue ? parseFloat(body.currentValue) : undefined,
        status: body.status,
      }
    });

    return NextResponse.json({ success: true, goal });
  } catch (cause) {
    console.error("Error updating goal:", cause);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;
    const resolvedParams = await params;
    const goalId = resolvedParams.id;

    const existing = await db.goal.findUnique({ where: { id: goalId } });
    if (!existing || existing.userId !== user.id) {
      return NextResponse.json({ error: "Not Found or Unauthorized" }, { status: 404 });
    }

    await db.goal.delete({ where: { id: goalId } });

    return NextResponse.json({ success: true });
  } catch (cause) {
    console.error("Error deleting goal:", cause);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
