import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";
import { parseJson } from "@/lib/api-security";
import { bodyMetricCreateSchema } from "@/lib/validations";
import { calculateHealthScoreDetailed, calculateBMI } from "@/lib/calculators";

export async function GET(request: Request) {
  const { user, error } = await requireAuthApi();
  if (error) return error;

  const url = new URL(request.url);
  const history = url.searchParams.get("history");

  try {
    if (history === "true") {
      const metrics = await db.bodyMetric.findMany({
        where: { userId: user!.id },
        orderBy: { measuredAt: "desc" },
        take: 30, // Last 30 measurements
      });
      return NextResponse.json({ metrics, metric: metrics[0] || null });
    }

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
    
    // Auto-calculate BMI if not provided
    if (!metricData.bmi && metricData.weight && metricData.height) {
      metricData.bmi = calculateBMI(metricData.weight, metricData.height);
    }
    
    // Auto-calculate deterministic Health Score if not provided
    if (!metricData.healthScore) {
      const scoreResult = calculateHealthScoreDetailed({
        weight: metricData.weight,
        height: metricData.height,
        bodyFat: metricData.bodyFat,
        visceralFat: metricData.visceralFat,
        muscleMass: metricData.muscleMass,
        gender: "MALE", // Defaulting for calculation if unknown
      });
      metricData.healthScore = scoreResult.score;
    }

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
