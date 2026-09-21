import { db } from "@/lib/db";
import { headers } from "next/headers";

export async function logAudit(data: {
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  metadata?: any;
}) {
  try {
    const headersList = await headers();
    const ipAddress = headersList.get("x-forwarded-for") || "unknown";

    await db.auditLog.create({
      data: {
        userId: data.userId,
        action: data.action,
        entity: data.entity,
        entityId: data.entityId,
        metadata: data.metadata || {},
        ipAddress,
      },
    });
  } catch (error) {
    console.error("[Audit Log Failed]", error);
  }
}
