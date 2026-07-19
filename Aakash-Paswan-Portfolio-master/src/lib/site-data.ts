import { projects } from "@/lib/projects-data";

export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Me", href: "/about-me" },
  { label: "Portfolio of Work", href: "/#works" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

export const works = projects.map((project, i) => ({
  id: String(i + 1).padStart(2, "0"),
  title: project.category,
  seed: project.slug,
  slug: project.slug,
}));

export const services = [
  {
    label: "01 Live Show concert",
    description:
      "This service is for artists, performers, event organizers, and brands looking to professionally capture live shows and concerts.",
  },
  {
    label: "02 Street/ Portrait sessions",
    description: "Perfect for individuals, families, or professional headshots.",
  },
  {
    label: "03 Birthday/Wedding Shoot",
    description: "Let's collaborate to create a tailored photography experience.",
  },
  {
    label: "04 Custom Packages",
    description: "Let's collaborate to create a tailored photography experience.",
  },
];
