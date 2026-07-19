import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { placeholderImage } from "@/lib/placeholder-image";
import type { Project } from "@/lib/projects-data";

function shotSrc(slug: string, n: number, w = 700, h = 640) {
  return placeholderImage(`${slug}-shot-${n}`, w, h);
}

export function WorkGallery({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-2 px-6 pb-16 pt-6 md:px-[120px] md:pb-24">
      <Link
        href="/#works"
        aria-label="Back to works"
        className="mb-6 flex size-10 items-center justify-center rounded-full border border-line transition-colors hover:border-foreground"
      >
        <ArrowLeft className="size-4" />
      </Link>

      <ScrollReveal
        y={24}
        stagger={0.08}
        className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_1.9fr_1fr]"
      >
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="relative h-[260px] overflow-hidden rounded-sm md:h-[320px]"
          >
            <Image
              src={shotSrc(project.slug, n, 600, 640)}
              alt={`${project.title} photo ${n}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
      </ScrollReveal>

      <ScrollReveal
        y={24}
        stagger={0.08}
        className="relative grid grid-cols-1 gap-2 md:grid-cols-2"
      >
        <div className="relative h-[260px] overflow-hidden rounded-sm md:h-[320px]">
          <Image
            src={shotSrc(project.slug, 4)}
            alt={`${project.title} photo 4`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="relative h-[260px] overflow-hidden rounded-sm md:h-[320px]">
          <Image
            src={shotSrc(project.slug, 5)}
            alt={`${project.title} photo 5`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <h2 className="pointer-events-none relative mt-4 text-center text-[32px] font-bold uppercase leading-[1.05] text-foreground sm:text-[44px] md:absolute md:inset-0 md:mt-0 md:flex md:items-center md:justify-center md:text-[56px] md:text-white md:[text-shadow:0_2px_24px_rgba(0,0,0,0.5)]">
          {project.title}
        </h2>
      </ScrollReveal>

      <ScrollReveal
        y={24}
        stagger={0.08}
        className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_2.9fr_1fr]"
      >
        <div className="relative h-[260px] overflow-hidden rounded-sm md:h-[320px]">
          <Image
            src={shotSrc(project.slug, 6, 500, 640)}
            alt={`${project.title} photo 6`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 20vw"
          />
        </div>
        <div className="relative h-[260px] overflow-hidden rounded-sm md:h-[320px]">
          <Image
            src={shotSrc(project.slug, 7)}
            alt={`${project.title} photo 7`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>
        <div className="flex h-[260px] flex-col justify-center gap-2 bg-card p-6 text-sm uppercase leading-relaxed text-foreground/80 md:h-[320px]">
          <p>{project.quote}</p>
        </div>
      </ScrollReveal>

      <ScrollReveal
        y={24}
        stagger={0.08}
        className="grid grid-cols-1 gap-2 md:grid-cols-[1.4fr_1fr_2.4fr]"
      >
        <div className="relative h-[260px] overflow-hidden rounded-sm md:h-[320px]">
          <Image
            src={shotSrc(project.slug, 8, 640, 640)}
            alt={`${project.title} photo 8`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        </div>
        <div className="relative h-[260px] overflow-hidden rounded-sm md:h-[320px]">
          <Image
            src={shotSrc(project.slug, 9)}
            alt={`${project.title} photo 9`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </ScrollReveal>
    </div>
  );
}
