import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";

export async function GET() {
  const { user, error } = await requireAuthApi();
  if (error) return error;

  // Ideally, requireAuthApi would check this or return the full user
  // Let's ensure the user is an ADMIN from DB to be safe.
  const dbUser = await db.user.findUnique({ where: { id: user!.id } });
  if (!dbUser || dbUser.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 });
  }

  try {
    const totalUsers = await db.user.count();
    const activeScans = await db.bodyMetric.count();
    const consultations = await db.consultation.count();
    
    // Calculate total sales from PAID orders
    const salesAggregate = await db.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: "PAID" }
    });
    const totalSales = salesAggregate._sum.totalAmount || 0;

    return NextResponse.json({
      totalUsers,
      activeScans,
      consultations,
      totalSales
    });
  } catch (cause) {
    console.error("[API] Admin analytics fetch error:", cause);
    return NextResponse.json({ error: "Unable to load analytics" }, { status: 503 });
  }
}
