import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";

export async function GET() {
  const { user, error } = await requireAuthApi();
  if (error) return error;

  try {
    const notifications = await db.notification.findMany({
      where: { userId: user!.id },
      orderBy: { createdAt: "desc" },
      take: 20
    });
    return NextResponse.json(notifications);
  } catch (cause) {
    console.error("[API] Notifications fetch error:", cause);
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const { user, error } = await requireAuthApi();
  if (error) return error;

  try {
    const { id } = await req.json();
    
    if (id) {
       await db.notification.update({
         where: { id },
         data: { isRead: true }
       });
    } else {
       // Mark all as read if no ID provided
       await db.notification.updateMany({
         where: { userId: user!.id, isRead: false },
         data: { isRead: true }
       });
    }
    return NextResponse.json({ success: true });
  } catch (cause) {
    console.error("[API] Notifications update error:", cause);
    return NextResponse.json({ error: "Failed to update notifications" }, { status: 500 });
  }
}
