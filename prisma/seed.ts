import { PrismaClient } from "@prisma/client";
import { seedPortfolio } from "../src/lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.contactMessage.deleteMany(),
    prisma.siteText.deleteMany(),
    prisma.publication.deleteMany(),
    prisma.education.deleteMany(),
    prisma.skillGroup.deleteMany(),
    prisma.project.deleteMany(),
    prisma.experience.deleteMany(),
    prisma.profile.deleteMany()
  ]);

  await prisma.profile.create({ data: seedPortfolio.profile });

  for (const [key, value] of Object.entries(seedPortfolio.siteText)) {
    await prisma.siteText.create({ data: { key, value } });
  }

  for (const [order, experience] of seedPortfolio.experiences.entries()) {
    await prisma.experience.create({ data: { ...experience, highlights: JSON.stringify(experience.highlights), order } });
  }

  for (const [order, project] of seedPortfolio.projects.entries()) {
    await prisma.project.create({
      data: {
        ...project,
        technologies: JSON.stringify(project.technologies),
        metrics: JSON.stringify(project.metrics),
        order
      }
    });
  }

  for (const [order, skillGroup] of seedPortfolio.skillGroups.entries()) {
    await prisma.skillGroup.create({ data: { ...skillGroup, items: JSON.stringify(skillGroup.items), order } });
  }

  for (const [order, education] of seedPortfolio.education.entries()) {
    await prisma.education.create({ data: { ...education, order } });
  }

  for (const [order, publication] of seedPortfolio.publications.entries()) {
    await prisma.publication.create({ data: { ...publication, order } });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
