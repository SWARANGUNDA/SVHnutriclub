import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";

export async function GET(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const reports = await db.aIReport.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    // If no reports exist yet, we can return an empty array.
    // The UI will handle the empty state.
    return NextResponse.json({ reports });
  } catch (cause) {
    console.error("Error fetching reports:", cause);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
