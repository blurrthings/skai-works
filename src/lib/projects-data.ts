export type Project = {
  slug: string;
  category: string;
  title: string;
  quote: string;
};

export const projects: Project[] = [
  {
    slug: "wedding-photography",
    category: "Wedding Photography",
    title: "Manish & Anjali",
    quote:
      "Manish and Anjali's wedding was more than an event; it was a love story that spanned cultures and generations, beautifully etched in photographs that would stand the test of time.",
  },
  {
    slug: "live-stage-photography",
    category: "Live Stage Photography",
    title: "yeshu janmoutsav 2024",
    quote:
      "A 2 day event to celebrate Christmas eve and Christmas.",
  },
  {
    slug: "anniversary-shoot",
    category: "Anniversary Shoot",
    title: "Sofia & Daniel",
    quote:
      "Ten years in and still stealing glances across the room — we followed Sofia and Daniel for an evening to capture a decade of quiet devotion.",
  },
  {
    slug: "outdoor-photography",
    category: "Outdoor Photography",
    title: "Wild & Free",
    quote:
      "Golden light, open fields and no agenda but to wander — this shoot was a reminder that the best portraits happen when everyone forgets the camera is there.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
