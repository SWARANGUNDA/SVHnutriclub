import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const products = await db.product.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json({ products });
  } catch (error) {
    console.error("[API] Products fetch error:", error);
    return NextResponse.json({ error: "Unable to load products" }, { status: 503 });
  }
}
