import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";

export async function GET(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const transformations = await db.transformation.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ transformations });
  } catch (cause) {
    console.error("Error fetching transformations:", cause);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const body = await req.json();

    const transformation = await db.transformation.create({
      data: {
        userId: user.id,
        name: body.name || user.name || "Customer",
        age: body.age ? parseInt(body.age) : 30, // Default or require
        location: body.location || "",
        beforeWeight: parseFloat(body.beforeWeight),
        afterWeight: parseFloat(body.afterWeight),
        duration: body.duration,
        story: body.story,
        achievements: body.achievements || [],
        beforeImage: body.beforeImage,
        afterImage: body.afterImage,
        isPublished: body.isPublished || false
      }
    });

    return NextResponse.json({ success: true, transformation });
  } catch (cause) {
    console.error("Error creating transformation:", cause);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
