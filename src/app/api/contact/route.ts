import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  message: z.string().min(10).max(2000)
});

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  await prisma.contactMessage.create({ data: parsed.data });
  return NextResponse.json({ ok: true });
}
