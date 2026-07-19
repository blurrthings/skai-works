"use client";

import Image, { type StaticImageData } from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { FocusText } from "@/components/focus-text";
import { cn } from "@/lib/utils";

type PanelFeatureSectionProps = {
  id: string;
  image: StaticImageData;
  imageAlt: string;
  heading: string;
  paragraphs: string[];
  imagePosition?: "left" | "right";
  priority?: boolean;
  header?: React.ReactNode;
};

export function PanelFeatureSection({
  id,
  image,
  imageAlt,
  heading,
  paragraphs,
  imagePosition = "left",
  priority = false,
  header,
}: PanelFeatureSectionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isImageRight = imagePosition === "right";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        imageWrapRef.current,
        { clipPath: isImageRight ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" },
        0
      )
        .fromTo(
          panelRef.current,
          { xPercent: isImageRight ? -40 : 40, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 1, ease: "power3.out" },
          0.4
        )
        .fromTo(
          rootRef.current?.querySelectorAll("[data-intro-fade]") ?? [],
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power4.out" },
          0.7
        );
    }, rootRef);

    return () => ctx.revert();
  }, [isImageRight]);

  return (
    <section
      id={id}
      className="relative flex flex-col overflow-hidden border-b border-line"
    >
      {header}

      <div
        ref={rootRef}
        className={cn(
          "relative grid w-full grid-cols-1 pt-[100px] lg:min-h-[920px]",
          isImageRight ? "md:grid-cols-[0.95fr_1.05fr]" : "md:grid-cols-[1.05fr_0.95fr]"
        )}
      >
        <div
          ref={imageWrapRef}
          className={cn(
            "relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] md:aspect-auto md:h-full",
            isImageRight ? "md:order-2" : "md:order-1"
          )}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority={priority}
            className="object-cover saturate-[0.85]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div
          ref={panelRef}
          className={cn(
            "paper-texture flex flex-col items-start justify-center gap-6 bg-foreground px-6 py-16 text-background sm:gap-8 md:px-14",
            isImageRight ? "md:order-1" : "md:order-2"
          )}
        >
          <h1 className="overflow-hidden">
            <span
              data-intro-fade
              className="block whitespace-nowrap text-[11vw] font-bold uppercase leading-[0.95] sm:text-[54px] md:text-[48px] lg:text-[64px]"
            >
              {heading}
            </span>
          </h1>

          <div className="flex w-full max-w-[560px] flex-col gap-9 lg:max-w-[640px]">
            {paragraphs.map((paragraph, i) => (
              <div key={i} className="overflow-hidden">
                <div data-intro-fade>
                  <FocusText
                    text={paragraph}
                    minWeight={500}
                    maxWeight={700}
                    className="text-justify text-xl leading-[1.7] text-background/90 sm:text-2xl lg:text-[26px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
