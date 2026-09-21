import { db } from "@/lib/db";

export interface WellnessContext {
  userId: string;
  profile: any;
  latestMetrics: any;
  metricsHistory: any[];
  activeGoals: any[];
  activeHabits: any[];
  nutritionHistory: any[];
}

export async function getCustomerWellnessContext(userId: string): Promise<WellnessContext | null> {
  if (!userId) return null;

  try {
    const [
      profile, 
      latestMetrics, 
      metricsHistory, 
      activeGoals, 
      activeHabits, 
      nutritionHistory
    ] = await Promise.all([
      prisma.wellnessProfile.findUnique({ where: { userId } }),
      getLatestBodyMetric(userId),
      getBodyMetricHistory(userId, 30),
      getCustomerGoals(userId),
      prisma.habit.findMany({
        where: { userId, isActive: true },
        include: {
          logs: { orderBy: { date: 'desc' }, take: 7 }
        }
      }),
      getCustomerNutritionHistory(userId, 7)
    ]);

    return {
      userId,
      profile,
      latestMetrics,
      metricsHistory,
      activeGoals,
      activeHabits,
      nutritionHistory
    };
  } catch (error) {
    console.error("Error gathering wellness context:", error);
    return null;
  }
}

export async function getLatestBodyMetric(userId: string) {
  if (!userId) return null;
  return prisma.bodyMetric.findFirst({
    where: { userId },
    orderBy: { measuredAt: 'desc' },
  });
}

export async function getBodyMetricHistory(userId: string, days: number = 30) {
  if (!userId) return [];
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return prisma.bodyMetric.findMany({
    where: { 
      userId,
      measuredAt: { gte: cutoffDate }
    },
    orderBy: { measuredAt: 'asc' },
  });
}

export async function getCustomerGoals(userId: string) {
  if (!userId) return [];
  return prisma.goal.findMany({
    where: { userId, status: 'ACTIVE' },
  });
}

export async function getCustomerNutritionHistory(userId: string, days: number = 7) {
  if (!userId) return [];
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return prisma.nutritionLog.findMany({
    where: { 
      userId,
      date: { gte: cutoffDate }
    },
    orderBy: { date: 'desc' },
  });
}
