import type { Portfolio } from "@/types/portfolio";
import { prisma } from "@/lib/db";
import { defaultSiteText, seedPortfolio } from "@/lib/seed-data";

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      return [];
    }
  }

  return [];
}

function serializeArray(value: string[]) {
  return JSON.stringify(value);
}

export async function getPortfolio(): Promise<Portfolio> {
  try {
    const [profile, siteTextRows, experiences, projects, skillGroups, education, publications] = await Promise.all([
      prisma.profile.findFirst(),
      prisma.siteText.findMany(),
      prisma.experience.findMany({ orderBy: { order: "asc" } }),
      prisma.project.findMany({ orderBy: { order: "asc" } }),
      prisma.skillGroup.findMany({ orderBy: { order: "asc" } }),
      prisma.education.findMany({ orderBy: { order: "asc" } }),
      prisma.publication.findMany({ orderBy: { order: "asc" } })
    ]);

    if (!profile) {
      return seedPortfolio;
    }

    const siteText = siteTextRows.reduce<Record<string, string>>(
      (copy, row) => ({
        ...copy,
        [row.key]: row.value
      }),
      { ...defaultSiteText }
    );

    return {
      profile,
      siteText,
      experiences: experiences.map((item) => ({ ...item, highlights: asStringArray(item.highlights) })),
      projects: projects.map((item) => ({
        ...item,
        technologies: asStringArray(item.technologies),
        metrics: asStringArray(item.metrics)
      })),
      skillGroups: skillGroups.map((item) => ({ ...item, items: asStringArray(item.items) })),
      education,
      publications: publications.length > 0 ? publications : seedPortfolio.publications
    };
  } catch {
    return seedPortfolio;
  }
}

export async function replacePortfolio(portfolio: Portfolio) {
  await prisma.$transaction(async (tx) => {
    await tx.siteText.deleteMany();
    await tx.publication.deleteMany();
    await tx.education.deleteMany();
    await tx.skillGroup.deleteMany();
    await tx.project.deleteMany();
    await tx.experience.deleteMany();
    await tx.profile.deleteMany();

    await tx.profile.create({ data: portfolio.profile });

    for (const [key, value] of Object.entries({ ...defaultSiteText, ...portfolio.siteText })) {
      await tx.siteText.create({ data: { key, value } });
    }

    for (const [order, item] of portfolio.experiences.entries()) {
      await tx.experience.create({ data: { ...item, highlights: serializeArray(item.highlights), order } });
    }

    for (const [order, item] of portfolio.projects.entries()) {
      await tx.project.create({
        data: {
          ...item,
          technologies: serializeArray(item.technologies),
          metrics: serializeArray(item.metrics),
          order
        }
      });
    }

    for (const [order, item] of portfolio.skillGroups.entries()) {
      await tx.skillGroup.create({ data: { ...item, items: serializeArray(item.items), order } });
    }

    for (const [order, item] of portfolio.education.entries()) {
      await tx.education.create({ data: { ...item, order } });
    }

    for (const [order, item] of portfolio.publications.entries()) {
      await tx.publication.create({ data: { ...item, order } });
    }
  });
}
