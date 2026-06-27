import { PortfolioExperience } from "@/components/portfolio-experience";
import { getPortfolio } from "@/lib/portfolio";

export const dynamic = "force-dynamic";

export default async function Home() {
  const portfolio = await getPortfolio();
  return <PortfolioExperience portfolio={portfolio} />;
}
