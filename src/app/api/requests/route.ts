import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newRequestSchema } from "@/lib/validation";
import { RequestStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await db.taxReclaimRequest.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const p = newRequestSchema.safeParse(body);
  if (!p.success) return NextResponse.json({ error: p.error.flatten() }, { status: 400 });
  const created = await db.taxReclaimRequest.create({ data: { ...p.data, status: RequestStatus.SUBMITTED } });
  await db.auditLog.create({
    data: { requestId: created.id, action: "REQUEST_CREATED", actor: "portal-user", toStatus: RequestStatus.SUBMITTED }
  });
  return NextResponse.json(created, { status: 201 });
}
