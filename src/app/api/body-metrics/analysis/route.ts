import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";

export async function GET(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    // Fetch the latest metric
    const metric = await db.bodyMetric.findFirst({
      where: { userId: user.id },
      orderBy: { measuredAt: 'desc' }
    });

    if (!metric) {
      return NextResponse.json({ error: "No metrics found to analyze." }, { status: 404 });
    }

    // Deterministic Analysis logic based on values
    const metricsAnalysis = [];
    
    // Body Fat Analysis
    if (metric.bodyFat) {
      const bf = metric.bodyFat;
      let status = "good";
      let exp = "Your body fat percentage is in a healthy range.";
      if (bf > 25) { status = "warning"; exp = "Slightly elevated. Focus on cardiovascular exercise and caloric deficit."; }
      if (bf > 32) { status = "critical"; exp = "Significantly elevated. A structured weight loss program is recommended."; }
      if (bf < 10) { status = "warning"; exp = "Very low body fat. Ensure you are maintaining healthy energy levels."; }
      
      metricsAnalysis.push({
        name: "Body Fat",
        value: `${bf}%`,
        range: "12% - 24%",
        status,
        explanation: exp
      });
    }

    // Visceral Fat Analysis
    if (metric.visceralFat) {
      const vf = metric.visceralFat;
      let status = "good";
      let exp = "Excellent! Your internal fat levels are very healthy.";
      if (vf > 9) { status = "warning"; exp = "Borderline high. Monitor your diet and exercise to prevent increases."; }
      if (vf > 14) { status = "critical"; exp = "High visceral fat increases metabolic risk. Focus on nutrition and fitness immediately."; }
      
      metricsAnalysis.push({
        name: "Visceral Fat",
        value: vf.toString(),
        range: "1 - 9",
        status,
        explanation: exp
      });
    }

    // Muscle Mass Analysis
    if (metric.muscleMass) {
      const mm = metric.muscleMass;
      let status = "good";
      let exp = "Great muscle mass! Keep up the resistance training.";
      if (mm < 35) { status = "warning"; exp = "Muscle mass is slightly low. Consider adding strength training."; }
      
      metricsAnalysis.push({
        name: "Muscle Mass",
        value: `${mm}%`,
        range: "35% - 45%",
        status,
        explanation: exp
      });
    }

    // BMI Analysis
    if (metric.bmi) {
      const bmi = metric.bmi;
      let status = "good";
      let exp = "Your BMI is in the normal, healthy range.";
      if (bmi < 18.5) { status = "warning"; exp = "Underweight range. Consider a nutrient-dense diet to build mass."; }
      if (bmi > 25) { status = "warning"; exp = "Overweight range. Focus on body recomposition."; }
      if (bmi > 30) { status = "critical"; exp = "Obesity range. Prioritize a structured wellness plan."; }
      
      metricsAnalysis.push({
        name: "BMI",
        value: bmi.toFixed(1),
        range: "18.5 - 24.9",
        status,
        explanation: exp
      });
    }

    // Generate deterministic summary
    const warningCount = metricsAnalysis.filter(m => m.status === 'warning' || m.status === 'critical').length;
    let summary = "Your overall body composition is in a very healthy range. Keep up the excellent work!";
    if (warningCount > 0) summary = "Your overall body composition is stable, but there is room for improvement in some areas.";
    if (warningCount > 2) summary = "Several key metrics are outside the optimal range. It's recommended to follow a structured wellness plan.";

    // Health Score calculation (if not stored, calculate it deterministically)
    const healthScore = metric.healthScore || Math.max(10, 100 - (warningCount * 15));

    return NextResponse.json({
      success: true,
      analysis: {
        summary,
        healthScore,
        metrics: metricsAnalysis
      }
    });
  } catch (cause) {
    console.error("Error analyzing metrics:", cause);
    return NextResponse.json({ error: "Failed to analyze metrics" }, { status: 500 });
  }
}
