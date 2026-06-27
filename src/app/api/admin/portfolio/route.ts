import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest } from "@/lib/auth";
import { getPortfolio, replacePortfolio } from "@/lib/portfolio";

const stringArraySchema = z.array(z.string().min(1));

const portfolioSchema = z.object({
  profile: z.object({
    slug: z.string().min(1),
    name: z.string().min(1),
    headline: z.string().min(1),
    location: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional().nullable(),
    summary: z.string().min(1),
    resumeUrl: z.string().optional().nullable(),
    githubUrl: z.string().optional().nullable(),
    linkedinUrl: z.string().optional().nullable()
  }),
  siteText: z.record(z.string().min(1)),
  experiences: z.array(
    z.object({
      role: z.string().min(1),
      company: z.string().min(1),
      location: z.string().min(1),
      startDate: z.string().min(1),
      endDate: z.string().min(1),
      highlights: stringArraySchema
    })
  ),
  projects: z.array(
    z.object({
      title: z.string().min(1),
      subtitle: z.string().optional().nullable(),
      description: z.string().min(1),
      technologies: stringArraySchema,
      metrics: stringArraySchema,
      featured: z.boolean()
    })
  ),
  skillGroups: z.array(z.object({ name: z.string().min(1), items: stringArraySchema })),
  education: z.array(
    z.object({
      institution: z.string().min(1),
      credential: z.string().min(1),
      location: z.string().min(1),
      startDate: z.string().min(1),
      endDate: z.string().min(1),
      gpa: z.string().optional().nullable()
    })
  ),
  publications: z.array(
    z.object({
      title: z.string().min(1),
      identifier: z.string().optional().nullable(),
      publishedAt: z.string().min(1),
      summary: z.string().min(1)
    })
  )
});

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(await getPortfolio());
}

export async function PUT(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = portfolioSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid portfolio payload", issues: parsed.error.flatten() }, { status: 400 });
  }

  await replacePortfolio(parsed.data);
  return NextResponse.json({ ok: true });
}
