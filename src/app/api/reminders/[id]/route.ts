import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const { id } = await params;
    const { isActive } = await req.json();

    const reminder = await db.reminder.update({
      where: {
        id,
        userId: user.id, // Ensure user owns the reminder
      },
      data: { isActive },
    });

    return NextResponse.json({ success: true, reminder });
  } catch (cause) {
    console.error("[API] Update reminder error:", cause);
    return NextResponse.json({ error: "Failed to update reminder" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const { id } = await params;

    await db.reminder.delete({
      where: {
        id,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (cause) {
    console.error("[API] Delete reminder error:", cause);
    return NextResponse.json({ error: "Failed to delete reminder" }, { status: 500 });
  }
}
