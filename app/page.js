import Hero from '@/components/Hero';
import TrustPoints from '@/components/TrustPoints';
import Services from '@/components/Services';
import Industries from '@/components/Industries';
import WhyUs from '@/components/WhyUs';
import Reviews from '@/components/Reviews';
import PortfolioPreview from '@/components/PortfolioPreview';
import BlogPreview from '@/components/BlogPreview';
import AuditCTA from '@/components/AuditCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustPoints />
      <Services />
      {/* <Industries /> */}
      <WhyUs />
      <Reviews />
      <PortfolioPreview />
      <BlogPreview />
      <AuditCTA />
    </>
  );
}