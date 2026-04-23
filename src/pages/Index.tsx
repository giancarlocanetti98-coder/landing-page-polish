import { HeroSection } from "@/components/landing/HeroSection";
import { ReputationSection } from "@/components/landing/ReputationSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ReputationSection />
      <Footer />
    </main>
  );
};

export default Index;
