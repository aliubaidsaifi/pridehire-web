import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Reviews from "@/components/Reviews";
import PortfolioPreview from "@/components/PortfolioPreview";
import BlogPreview from "@/components/BlogPreview";
import AuditCTA from "@/components/AuditCTA";
import TrustStats from "@/components/TrustStats";
import ClientMarquee from "@/components/ClientMarquee";
import { WebPageSchema } from "@/components/Schema";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

const TITLE = "Pride Hire | Websites, SEO, Google Ads & Automation Agency";
export const metadata = buildMetadata({ title: TITLE, description: SITE.description, path: "/", absoluteTitle: true });

export default function HomePage() {
  return (
    <>
      <WebPageSchema path="/" name={TITLE} description={SITE.description} />
      <Hero />
       <TrustStats />
      <Services />
      <WhyUs />
      <ClientMarquee />
      <Reviews />
      <PortfolioPreview />
      <BlogPreview />
      <AuditCTA showPhones />
    </>
  );
}
