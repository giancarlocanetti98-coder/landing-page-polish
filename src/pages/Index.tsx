import { HeroSection } from "@/components/landing/HeroSection";
import { ReputationSection } from "@/components/landing/ReputationSection";
import { StakesSection } from "@/components/landing/StakesSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ReputationSection />
      <StakesSection />
      <ProcessSection />
      <Footer />
    </main>
  );
};

export default Index;
