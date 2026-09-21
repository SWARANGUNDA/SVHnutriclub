import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";

export async function GET(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    // Get the user's primary wellness goal to filter products
    const profile = await db.wellnessProfile.findUnique({
      where: { userId: user.id }
    });
    const goalCategory = profile?.wellnessGoal || "GENERAL";

    // In a real app, map goal to tags. Mock mapping for now:
    let recommendedTags = ["wellness"];
    if (goalCategory.includes("WEIGHT_LOSS")) recommendedTags.push("weight-loss", "meal-replacement");
    if (goalCategory.includes("MUSCLE")) recommendedTags.push("protein", "recovery");
    if (goalCategory.includes("ENERGY")) recommendedTags.push("energy", "focus");

    // Fetch products that match the tags, or just popular ones if no tags match
    let products = await db.product.findMany({
      where: {
        isActive: true,
        tags: { hasSome: recommendedTags }
      },
      take: 6
    });

    // Fallback if no matching tags
    if (products.length === 0) {
      products = await db.product.findMany({
        where: { isActive: true },
        take: 6
      });
    }

    // Since the database might be empty initially, if we get 0 products, 
    // we return an empty array instead of a mock array.
    if (products.length === 0) {
      return NextResponse.json({ products: [] });
    }

    return NextResponse.json({ products });
  } catch (cause) {
    console.error("Error fetching product recommendations:", cause);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
