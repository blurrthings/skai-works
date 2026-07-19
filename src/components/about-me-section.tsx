import { SiteHeader } from "@/components/site-header";
import { PanelFeatureSection } from "@/components/panel-feature-section";
import ABOUT_IMAGE from "@/assets/IMG_0034.webp";

const bioParagraphs = [
  "I am Aakash Paswan, a lifestyle photographer and visual storyteller with experience across photography, videography, and live show production.",
  "I have worked in live shows as part of media and stage crews, gaining practical insight into fast-paced environments that demand precision, teamwork, and adaptability.",
  "Alongside this, I create photographs and videos that focus on authentic moments, natural emotion, and thoughtful storytelling.",
  "My work reflects a strong commitment to professionalism, creativity, and delivering visuals that connect with people.",
];

export function AboutMeSection() {
  return (
    <PanelFeatureSection
      id="about-me"
      image={ABOUT_IMAGE}
      imageAlt="Aakash Paswan behind the camera"
      heading="About Me"
      paragraphs={bioParagraphs}
      imagePosition="left"
      priority
      header={<SiteHeader />}
    />
  );
}
