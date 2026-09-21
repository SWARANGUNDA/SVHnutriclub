import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthApi } from "@/lib/auth-helpers";

export async function GET(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    // Fetch active challenges
    const challenges = await db.challenge.findMany({
      where: { isActive: true },
      include: {
        participants: {
          where: { userId: user.id }
        },
        _count: {
          select: { participants: true }
        }
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ challenges });
  } catch (cause) {
    console.error("[API] Challenges error:", cause);
    return NextResponse.json({ error: "Failed to fetch challenges" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user, error } = await requireAuthApi();
    if (error) return error;

    const { challengeId } = await req.json();

    if (!challengeId) {
      return NextResponse.json({ error: "Challenge ID required" }, { status: 400 });
    }

    // Check if challenge exists
    const challenge = await db.challenge.findUnique({
      where: { id: challengeId }
    });

    if (!challenge || !challenge.isActive) {
      return NextResponse.json({ error: "Challenge not available" }, { status: 404 });
    }

    // Create participation
    const participation = await db.challengeParticipation.create({
      data: {
        userId: user.id,
        challengeId,
        progress: 0,
        completed: false,
      }
    });

    return NextResponse.json({ success: true, participation });
  } catch (cause) {
    console.error("[API] Join challenge error:", cause);
    return NextResponse.json({ error: "Failed to join challenge" }, { status: 500 });
  }
}
