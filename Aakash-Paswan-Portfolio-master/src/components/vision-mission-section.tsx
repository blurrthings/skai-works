import { PanelFeatureSection } from "@/components/panel-feature-section";
import VISION_IMAGE from "@/assets/IMG_0088.webp";
import MISSION_IMAGE from "@/assets/IMG_0035.webp";

const visionParagraphs = [
  "To capture the essence of life's moments, turning them into timeless visual stories that inspire, connect, and preserve memories for generations.",
];

const missionParagraphs = [
  "To deliver exceptional videography that fuses cinematic creativity, genuine emotion, and authentic storytelling.",
  "To collaborate closely with clients to transform their vision into compelling visual narratives.",
  "To create meaningful, impactful films that capture moments, evoke emotion, and leave a lasting impression.",
];

export function VisionMissionSection() {
  return (
    <>
      <PanelFeatureSection
        id="vision"
        image={VISION_IMAGE}
        imageAlt="Aakash Paswan holding camera equipment"
        heading="Vision"
        paragraphs={visionParagraphs}
        imagePosition="right"
      />

      <PanelFeatureSection
        id="mission"
        image={MISSION_IMAGE}
        imageAlt="Camera resting in hand"
        heading="Mission"
        paragraphs={missionParagraphs}
        imagePosition="left"
      />
    </>
  );
}
