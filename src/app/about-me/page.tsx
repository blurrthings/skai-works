import type { Metadata } from "next";
import { AboutMeSection } from "@/components/about-me-section";
import { VisionMissionSection } from "@/components/vision-mission-section";
import { WorkExperienceSection } from "@/components/work-experience-section";
import { WhatIDoSection } from "@/components/what-i-do-section";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "About Me — Aakash Paswan's Portfolio",
  description:
    "Aakash Paswan is a lifestyle photographer and visual storyteller working across photography, videography, and live show production.",
};

export default function AboutMePage() {
  return (
    <main className="paper-texture flex flex-1 flex-col">
      <AboutMeSection />
      <VisionMissionSection />
      <WorkExperienceSection />
      <WhatIDoSection />
      <SiteFooter />
    </main>
  );
}
