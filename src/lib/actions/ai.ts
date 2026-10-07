"use server";

import { auth } from "@/lib/auth";
import { aiGenerate } from "@/lib/ai/provider";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function generateFoodScanAction(imageUrl: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // In a real implementation, you would pass the image URL to a multimodal AI (like Gemini Pro Vision)
    // For now, we simulate the AI prompt that would extract macros from the image
    const prompt = `Analyze this food image: ${imageUrl}. What is the food, and what are the estimated calories, protein, carbs, and fats?`;
    
    // We append 'search' or similar keywords to trigger our mock logic in provider.ts if no API key is set
    // But ideally we'd have a specific mock for food scanning. Let's just use the provider.
    const result = await aiGenerate(prompt, { json: true });
    
    // Mock parsing the result (since our provider.ts currently returns generic search/meal JSONs for json:true)
    // In production, the AI returns a strict schema.
    const foodData = {
      name: "Grilled Chicken Salad",
      calories: 320,
      protein: 42,
      carbs: 12,
      fats: 14,
    };

    // Save the scan to the database
    await db.nutritionScan.create({
      data: {
        userId: session.user.id,
        imageUrl: imageUrl,
        foodIdentified: foodData.name,
        calories: foodData.calories,
        protein: foodData.protein,
        carbs: foodData.carbs,
        fats: foodData.fats,
        confidence: 0.95,
      }
    });

    return { success: true, data: foodData };
  } catch (error: any) {
    console.error("AI Scan Error:", error);
    return { success: false, error: error.message };
  }
}

export async function generateMealPlanAction() {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // 1. Fetch user's wellness profile and latest metrics to feed into the prompt
    const metric = await db.bodyMetric.findFirst({
      where: { userId: session.user.id },
      orderBy: { measuredAt: 'desc' }
    });

    const prompt = `Generate a 7-day meal plan for a user with ${metric?.bodyFat || 20}% body fat, targeting 15%. Include Herbalife products.`;
    
    // 2. Call the AI Engine
    const result = await aiGenerate(prompt, { json: true });
    const planData = JSON.parse(result.text);

    // 3. Save to database
    await db.mealPlan.create({
      data: {
        userId: session.user.id,
        title: "AI Optimized 7-Day Shred",
        meals: planData,
        calories: planData.averageDailyCalories,
        protein: planData.averageDailyProtein,
        aiProvider: result.provider,
      }
    });

    revalidatePath("/dashboard/nutrition");
    return { success: true, data: planData };
  } catch (error: any) {
    console.error("AI Meal Gen Error:", error);
    return { success: false, error: error.message };
  }
}
