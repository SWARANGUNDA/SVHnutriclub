import { HeroSection } from "@/components/home/HeroSection";
import { AIFeaturesStrip } from "@/components/home/AIFeaturesStrip";
import { StatsSection } from "@/components/home/StatsSection";
import {
  TransformationsSection,
  TestimonialsSection,
  ConsultationCTA,
  DashboardPreview,
  WellnessCards,
} from "@/components/home/Sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AIFeaturesStrip />
      <StatsSection />
      <WellnessCards />
      <DashboardPreview />
      <TransformationsSection />
      <TestimonialsSection />
      <ConsultationCTA />
    </>
  );
}
