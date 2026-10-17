import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RequestStatus } from "@prisma/client";

export const dynamic = "force-dynamic";
const allowed = new Set<string>(Object.values(RequestStatus));

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const nextStatus = body?.status as RequestStatus;
  const actor = (body?.actor as string) || "reviewer";
  if (!allowed.has(nextStatus)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  const existing = await db.taxReclaimRequest.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = await db.taxReclaimRequest.update({ where: { id: params.id }, data: { status: nextStatus } });
  await db.auditLog.create({
    data: { requestId: params.id, action: "STATUS_CHANGED", actor, fromStatus: existing.status, toStatus: nextStatus }
  });
  return NextResponse.json(updated);
}
