import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";
import { updateProfileSchema } from "@/lib/validations";

/**
 * GET /api/user/profile — Get current user's profile
 */
export async function GET() {
  const { user, error } = await requireAuthApi();
  if (error) return error;

  try {
    const profile = await db.user.findUnique({
      where: { id: user!.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        phone: true,
        role: true,
        language: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: profile });
  } catch (err) {
    console.error("[API] Profile fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/user/profile — Update current user's profile
 */
export async function PATCH(req: Request) {
  const { user, error } = await requireAuthApi();
  if (error) return error;

  try {
    const body = await req.json();
    const parsed = updateProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const updated = await db.user.update({
      where: { id: user!.id },
      data: parsed.data,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        phone: true,
        role: true,
        language: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ user: updated });
  } catch (err) {
    console.error("[API] Profile update error:", err);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
