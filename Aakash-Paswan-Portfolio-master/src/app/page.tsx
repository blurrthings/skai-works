import { ProfileIntroSection } from "@/components/profile-intro-section";
import { HeroSection } from "@/components/hero-section";
import { CompaniesSection } from "@/components/companies-section";
import { WorksSection } from "@/components/works-section";
import { ServicesSection } from "@/components/services-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <main className="paper-texture flex flex-1 flex-col">
      <ProfileIntroSection />
      <CompaniesSection />
      <HeroSection />
      <WorksSection />
      <ServicesSection />
      <SiteFooter />
    </main>
  );
}
