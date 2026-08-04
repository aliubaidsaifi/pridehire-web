import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Reviews from "@/components/Reviews";
import PortfolioPreview from "@/components/PortfolioPreview";
import BlogPreview from "@/components/BlogPreview";
import AuditCTA from "@/components/AuditCTA";
import TrustStats from "@/components/TrustStats";
import ClientMarquee from "@/components/ClientMarquee";

export default function HomePage() {
  return (
    <>
      <Hero />
       <TrustStats />
      <Services />
      <WhyUs />
      <ClientMarquee />
      <Reviews />
      <PortfolioPreview />
      <BlogPreview />
      <AuditCTA />
    </>
  );
}
