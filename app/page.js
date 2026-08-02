import Hero from '@/components/Hero';
import TrustPoints from '@/components/TrustPoints';
import Services from '@/components/Services';
import Industries from '@/components/Industries';
import WhyUs from '@/components/WhyUs';
import Reviews from '@/components/Reviews';
import PortfolioPreview from '@/components/PortfolioPreview';
import BlogPreview from '@/components/BlogPreview';
import AuditCTA from '@/components/AuditCTA';
import TrustStats from '@/components/TrustStats';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStats/>
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