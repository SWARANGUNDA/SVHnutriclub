import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";
import { parseJson } from "@/lib/api-security";
import { bodyMetricCreateSchema } from "@/lib/validations";

export async function GET() {
  const { user, error } = await requireAuthApi();
  if (error) return error;

  try {
    const metric = await db.bodyMetric.findFirst({
      where: { userId: user!.id },
      orderBy: { measuredAt: "desc" },
    });
    return NextResponse.json({ metric });
  } catch (cause) {
    console.error("[API] Body metrics fetch error:", cause);
    return NextResponse.json({ error: "Unable to load body metrics" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const { user, error: authError } = await requireAuthApi();
  if (authError) return authError;
  const { data, error } = await parseJson(request, bodyMetricCreateSchema);
  if (error) return error;

  try {
    const { measuredAt, ...metricData } = data;
    const metric = await db.bodyMetric.create({
      data: {
        ...metricData,
        userId: user!.id,
        measuredAt: measuredAt ? new Date(measuredAt) : undefined,
      },
    });
    return NextResponse.json({ metric }, { status: 201 });
  } catch (cause) {
    console.error("[API] Body metrics create error:", cause);
    return NextResponse.json({ error: "Unable to save body metrics" }, { status: 503 });
  }
}
