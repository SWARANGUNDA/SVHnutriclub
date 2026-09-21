/**
 * Google Gemini API Client
 */
import { GoogleGenerativeAI, Schema, Type } from "@google/generative-ai";
import type { AIGenerateOptions } from "./provider";

export async function generateWithGemini(
  prompt: string,
  options: AIGenerateOptions = {}
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  const genAI = new GoogleGenerativeAI(apiKey);
  // We use gemini-1.5-flash as the fast, default model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const fullPrompt = options.systemPrompt
    ? `${options.systemPrompt}\n\nUser Input:\n${prompt}`
    : prompt;

  const generationConfig: any = {
    maxOutputTokens: options.maxTokens ?? 1024,
    temperature: options.temperature ?? 0.7,
  };

  if (options.json) {
    generationConfig.responseMimeType = "application/json";
  }

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
    generationConfig,
  });

  return result.response.text();
}
