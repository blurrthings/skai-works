"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollReveal } from "@/components/scroll-reveal";
import { works } from "@/lib/site-data";
import { placeholderImage } from "@/lib/placeholder-image";

export function WorksSection() {
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);

  function reveal(i: number, show: boolean) {
    const el = imageRefs.current[i];
    if (!el) return;
    gsap.to(el, {
      opacity: show ? 1 : 0,
      scale: show ? 1 : 1.08,
      duration: 0.5,
      ease: "power3.out",
    });
  }

  return (
    <section className="border-b border-line">
      <ScrollReveal
        y={20}
        stagger={0.06}
        className="flex flex-col px-6 py-10 md:px-[120px]"
      >
        {works.map((work, i) => (
          <Link
            key={work.id}
            href={`/works/${work.slug}`}
            onMouseEnter={() => reveal(i, true)}
            onMouseLeave={() => reveal(i, false)}
            className="group relative flex h-[86px] items-center overflow-hidden border border-line px-4 md:h-[114px] md:px-4"
          >
            <div className="relative z-10 flex items-center gap-4 text-lg font-semibold uppercase transition-colors md:text-2xl">
              <span>{work.id}</span>
              <span>{work.title}</span>
            </div>

            <div
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-0 md:w-1/2"
            >
              <Image
                src={placeholderImage(work.seed, 900, 300)}
                alt={work.title}
                fill
                className="object-cover"
                sizes="600px"
              />
            </div>
          </Link>
        ))}
      </ScrollReveal>
    </section>
  );
}
