"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollReveal } from "@/components/scroll-reveal";
import { services } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import SERVICE_IMAGE from "@/assets/IMG_0087.webp";
import BOOK_SERVICE_IMAGE from "@/assets/IMG_7621.webp";

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const imageRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (!imageRef.current) return;
    gsap.fromTo(
      imageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  }, [activeIndex]);

  const active = services[activeIndex];

  useEffect(() => {
    if (!isPreviewOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPreviewOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPreviewOpen]);

  return (
    <section id="services" className="relative border-b border-line bg-card">
      <div className="section-label" data-page-transition="down">
        <span>Services</span>
        <span className="hidden sm:inline">What we can offer you</span>
      </div>

      <ScrollReveal
        y={30}
        className="grid grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[0.9fr_1fr_0.9fr] md:gap-10 md:px-[120px] md:py-20"
      >
        <div className="flex flex-col gap-8">
          <h2 className="text-[28px] font-semibold uppercase leading-tight sm:text-[32px]">
            Services I
            <br />
            offer
          </h2>

          <div className="relative size-[110px] overflow-hidden rounded-full sm:size-[140px]">
            <Image
              src={BOOK_SERVICE_IMAGE}
              alt="Book a service"
              fill
              className="object-cover"
              sizes="140px"
            />
          </div>

          <ul className="flex flex-col gap-4 text-base font-light uppercase">
            {services.map((service, i) => (
              <li
                key={service.label}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "cursor-pointer border-b border-line/60 pb-4 transition-colors",
                  i === activeIndex
                    ? "text-foreground"
                    : "text-foreground/50 hover:text-foreground/80"
                )}
              >
                {service.label}
              </li>
            ))}
          </ul>
        </div>

        <button
          key={activeIndex}
          ref={imageRef}
          type="button"
          aria-label={`View full preview of ${active.label}`}
          onClick={() => setIsPreviewOpen(true)}
          className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-sm md:aspect-auto md:h-full md:min-h-[320px]"
        >
          <Image
            src={SERVICE_IMAGE}
            alt={active.label}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </button>

        <div className="flex flex-col gap-3 self-center">
          <h3 className="text-xl font-bold uppercase leading-tight sm:text-2xl">
            {active.label}
          </h3>
          <p className="text-base font-light leading-[1.5] text-foreground/80">
            {active.description}
          </p>
        </div>
      </ScrollReveal>

      {isPreviewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsPreviewOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6"
        >
          <button
            type="button"
            aria-label="Close preview"
            onClick={() => setIsPreviewOpen(false)}
            className="absolute right-6 top-6 flex size-10 items-center justify-center rounded-full border border-line/60 text-white transition-colors hover:border-white"
          >
            <X className="size-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-[85vh] w-full max-w-4xl"
          >
            <Image
              src={SERVICE_IMAGE}
              alt={active.label}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}
