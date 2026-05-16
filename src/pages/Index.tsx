import { LangProvider } from "@/i18n/LangProvider";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { WhyUs } from "@/components/site/WhyUs";
import { CoverageMap } from "@/components/site/CoverageMap";
import { Partners } from "@/components/site/Partners";
import { CTASection } from "@/components/site/CTASection";
import { StatsMarquee } from "@/components/site/StatsMarquee";
import { Footer } from "@/components/site/Footer";
import { ChatWidget } from "@/components/site/ChatWidget";

const Index = () => {
  return (
    <LangProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <WhyUs />
          <CoverageMap />
          <Partners />
          <CTASection />
        </main>
        <StatsMarquee />
        <Footer />
        <ChatWidget />
      </div>
    </LangProvider>
  );
};

export default Index;
