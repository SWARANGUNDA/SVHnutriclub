/**
 * SVH AI Service — Modular AI Provider with Fallback Architecture
 *
 * Flow: Request → Groq (primary) → Gemini (fallback) → Mock (development)
 *
 * Usage:
 *   const result = await aiService.generate(prompt, options);
 */

import { generateWithGroq } from "./groq";
import { generateWithGemini } from "./gemini";

export type AIProvider = "groq" | "gemini" | "mock";

export interface AIGenerateOptions {
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
  json?: boolean; // If true, expect JSON output
}

export interface AIResult {
  text: string;
  provider: AIProvider;
  tokensUsed?: number;
  latencyMs: number;
}

/**
 * Generate AI response with automatic fallback chain:
 * Groq → Gemini → Mock
 */
export async function aiGenerate(
  prompt: string,
  options: AIGenerateOptions = {}
): Promise<AIResult> {
  const start = Date.now();

  // 1. Try Groq (primary)
  if (process.env.GROQ_API_KEY && !process.env.GROQ_API_KEY.includes("mock")) {
    try {
      const text = await generateWithGroq(prompt, options);
      return {
        text,
        provider: "groq",
        latencyMs: Date.now() - start,
      };
    } catch (error) {
      console.warn("[AI] Groq failed, falling back to Gemini:", error);
    }
  }

  // 2. Try Gemini (fallback)
  if (process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY.includes("mock")) {
    try {
      const text = await generateWithGemini(prompt, options);
      return {
        text,
        provider: "gemini",
        latencyMs: Date.now() - start,
      };
    } catch (error) {
      console.warn("[AI] Gemini failed, using mock response:", error);
    }
  }

  // 3. Mock response (development)
  console.info("[AI] Using mock response — set GROQ_API_KEY or GEMINI_API_KEY for real AI");
  return {
    text: getMockResponse(prompt, options),
    provider: "mock",
    latencyMs: Date.now() - start,
  };
}

/**
 * Generate mock responses for development without API keys
 */
function getMockResponse(prompt: string, options: AIGenerateOptions): string {
  const lowerPrompt = prompt.toLowerCase();

  if (options.json) {
    if (lowerPrompt.includes("meal") || lowerPrompt.includes("nutrition")) {
      return JSON.stringify({
        title: "Balanced Wellness Plan (7-Day)",
        averageDailyCalories: 1800,
        averageDailyProtein: 75,
        hydration: 3.0,
        days: Array.from({ length: 7 }).map((_, i) => ({
          dayNumber: i + 1,
          totalCalories: 1800,
          meals: {
            breakfast: { name: "Herbalife Formula 1 Shake", calories: 220, protein: 18, description: "Blend with milk, banana, and ice for a nutritious start" },
            midMorning: { name: "Herbal Tea + Almonds", calories: 150, protein: 5, description: "Green tea concentrate with 10 almonds for sustained energy" },
            lunch: { name: "Grilled Paneer Salad Bowl", calories: 450, protein: 22, description: "Mixed greens, paneer, chickpeas, quinoa with olive oil dressing" },
            evening: { name: "Protein Smoothie", calories: 200, protein: 15, description: "Protein drink mix with berries and yogurt" },
            dinner: { name: "Vegetable Dal with Brown Rice", calories: 500, protein: 18, description: "Moong dal with seasonal vegetables and brown rice" },
            bedtime: { name: "Warm Turmeric Milk", calories: 120, protein: 4, description: "Golden milk with turmeric and cinnamon for recovery" },
          }
        })),
        tips: [
          "Drink water 30 minutes before each meal",
          "Include a protein source in every meal",
          "Eat dinner at least 2 hours before bedtime",
        ],
      });
    }

    if (lowerPrompt.includes("body") || lowerPrompt.includes("health") || lowerPrompt.includes("score")) {
      return JSON.stringify({
        healthScore: 78,
        grade: "B+",
        summary: "Good overall health with room for improvement in body fat percentage and hydration levels.",
        insights: [
          { category: "Weight", status: "good", message: "Your BMI is within the healthy range" },
          { category: "Body Fat", status: "warning", message: "Body fat is slightly above optimal — consider increasing protein intake" },
          { category: "Hydration", status: "warning", message: "Hydration levels are below recommended — aim for 3L daily" },
          { category: "Muscle Mass", status: "good", message: "Muscle percentage is healthy for your age group" },
          { category: "Metabolic Age", status: "excellent", message: "Your metabolic age is 3 years younger than your actual age" },
        ],
        recommendations: [
          "Increase daily water intake to 3 liters",
          "Add 2 strength training sessions per week",
          "Consider Formula 1 shake as a meal replacement for better nutrition balance",
        ],
      });
    }

    if (lowerPrompt.includes("recommend") || lowerPrompt.includes("product")) {
      return JSON.stringify({
        recommendations: [
          { slug: "formula-1-shake", reason: "Ideal for your weight management goals — provides balanced nutrition with 18g protein per serving", match: 95 },
          { slug: "herbal-tea-concentrate", reason: "Boosts metabolism and supports your energy needs throughout the day", match: 88 },
          { slug: "personalized-protein", reason: "Extra protein support for muscle building based on your current body composition", match: 82 },
          { slug: "aloe-vera-concentrate", reason: "Supports digestive health which is key for nutrient absorption", match: 75 },
        ],
      });
    }

    if (lowerPrompt.includes("search")) {
      return JSON.stringify({
        results: [
          { type: "product", title: "Formula 1 Shake", description: "Complete meal replacement", relevance: 95 },
          { type: "blog", title: "Understanding Protein", description: "Your complete guide to protein intake", relevance: 85 },
          { type: "service", title: "AI Meal Generator", description: "Personalized meal planning", relevance: 80 },
        ],
        suggestion: "Based on your query, you might also be interested in our AI Body Dashboard for tracking your progress.",
      });
    }

    // Generic JSON mock
    return JSON.stringify({
      response: "This is a mock AI response. Connect a real AI provider (Groq or Gemini) for personalized results.",
      provider: "mock",
    });
  }

  // Text responses
  if (lowerPrompt.includes("motivation") || lowerPrompt.includes("encourage")) {
    return "You're doing amazing! 💪 Every healthy choice you make is a step towards the best version of yourself. Your consistency is your superpower — keep going, and remember that progress, not perfection, is what matters.";
  }

  if (lowerPrompt.includes("faq") || lowerPrompt.includes("question")) {
    return "Great question! Our nutrition products are designed to complement a balanced diet. For personalized guidance, I'd recommend booking a free consultation with our wellness experts who can analyze your specific needs and goals.";
  }

  return "Thank you for your question! I'm your SVH Wellness AI assistant. I can help with body analytics, meal planning, product recommendations, and wellness guidance. For the best experience, please connect your body metrics through our dashboard.";
}
