import Hero from '@/components/Hero';
import TrustPoints from '@/components/TrustPoints';
import Services from '@/components/Services';
import Industries from '@/components/Industries';
import WhyUs from '@/components/WhyUs';
import PortfolioPreview from '@/components/PortfolioPreview';
import AuditCTA from '@/components/AuditCTA';
import Reviews from '@/components/Reviews';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustPoints />
      <Services />
      <PortfolioPreview />
      {/* <Industries /> */}
      <WhyUs />
      <Reviews />
      <AuditCTA />
    </>
  );
}