import { HeroSection } from "@/components/landing/HeroSection";
import { LeadershipSection } from "@/components/landing/LeadershipSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <LeadershipSection />
      <ProblemSection />
      <SolutionSection />
      <Footer />
    </main>
  );
};

export default Index;
