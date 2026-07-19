"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const experiences = [
  {
    role: "Freelance Photographer",
    points: [
      "Covered pre-wedding photo shoots, focusing on candid and cinematic storytelling",
      "Shot live shows and events, capturing performances, crowd energy, and key moments",
      "Skilled in composition, lighting, and post-processing",
    ],
  },
  {
    role: "Freelance Videographer",
    points: [
      "Covered music concerts and large live events",
      "Captured stage performances, crowd engagement, and behind-the-scenes moments",
      "Skilled in handheld and gimbal shots, low-light shooting, and live-event coverage",
      "Experienced in video editing and highlight reels",
    ],
  },
  {
    role: "Music Video Production",
    points: [
      "Experienced in capturing cinematic shots using creative camera angles and smooth motion to enhance visual storytelling.",
      "Skilled in composing visually striking frames with attention to lighting, depth, and mood for a cinematic look.",
      "Proven ability to plan and execute cinematic sequences that elevate music videos and video productions.",
    ],
  },
];

export function WorkExperienceSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemRefs.current.filter(
        (item): item is HTMLDivElement => item !== null
      );
      const total = items.length;
      const segments = total + 1;

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          const master = gsap.timeline({
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top top",
              end: () => `+=${segments * window.innerHeight}`,
              scrub: true,
              pin: true,
              invalidateOnRefresh: true,
            },
          });

          items.forEach((itemEl, i) => {
            const dot = itemEl.querySelector("[data-dot]");
            const heading = itemEl.querySelector("[data-heading]");
            const line = itemEl.querySelector("[data-line]");
            const points = itemEl.querySelectorAll("[data-point]");

            gsap.set(itemEl, { opacity: i === 0 ? 1 : 0 });
            gsap.set(dot, { scale: 0, opacity: 0 });
            gsap.set(heading, { opacity: 0, y: 10 });
            gsap.set(line, { scaleY: 0 });
            gsap.set(points, { opacity: 0, x: -8 });

            if (i > 0) {
              master.to(itemEl, { opacity: 1, duration: 0.06 }, i);
            }

            master
              .to(dot, { scale: 1, opacity: 1, duration: 0.05 }, i + 0.02)
              .to(heading, { opacity: 1, y: 0, duration: 0.05 }, i + 0.02)
              .to(line, { scaleY: 1, duration: 0.35, ease: "none" }, i + 0.1)
              .to(
                points,
                { opacity: 1, x: 0, duration: 0.2, stagger: 0.08 },
                i + 0.15
              );

            if (i < total - 1) {
              master.to(itemEl, { opacity: 0, duration: 0.06 }, i + 0.94);
            }
          });

          master.set({}, {}, segments);
        },
        "(max-width: 767px)": () => {
          items.forEach((itemEl) => {
            const dot = itemEl.querySelector("[data-dot]");
            const heading = itemEl.querySelector("[data-heading]");
            const line = itemEl.querySelector("[data-line]");
            const points = itemEl.querySelectorAll("[data-point]");

            gsap.set(itemEl, { opacity: 1 });

            const tl = gsap.timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: {
                trigger: itemEl,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            });

            tl.fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 })
              .fromTo(
                heading,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.4 },
                "<"
              )
              .fromTo(
                line,
                { scaleY: 0 },
                { scaleY: 1, duration: 0.8, ease: "power2.out" },
                0.1
              )
              .fromTo(
                points,
                { opacity: 0, x: -8 },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.15 },
                0.2
              );
          });
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work-experience"
      ref={rootRef}
      className="relative border-b border-line"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr]">
        <div className="flex items-center px-6 py-16 md:sticky md:top-0 md:h-screen md:px-14 md:py-0">
          <h2 className="flex flex-col text-[13vw] font-bold uppercase leading-[0.95] sm:text-[70px] md:text-[52px] lg:text-[68px]">
            <span>Work</span>
            <span>Experience</span>
          </h2>
        </div>

        <div
          ref={trackRef}
          className="flex flex-col gap-16 px-6 py-16 md:h-screen md:justify-center md:gap-0 md:overflow-hidden md:px-14 md:py-0"
        >
          {experiences.map((exp, i) => (
            <div
              key={exp.role}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="relative flex flex-col gap-6 md:absolute md:inset-0 md:justify-center"
            >
              <div className="flex gap-4">
                <div className="flex w-3 flex-none flex-col items-center pt-2">
                  <span
                    data-dot
                    className="size-3 shrink-0 rounded-full bg-foreground"
                  />
                  <div className="relative mt-1 w-px flex-1 bg-line">
                    <div
                      data-line
                      className="absolute inset-x-0 top-0 w-px origin-top bg-foreground"
                      style={{ height: "100%" }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 pb-2">
                  <h3
                    data-heading
                    className="text-2xl font-bold uppercase leading-tight sm:text-[28px]"
                  >
                    {exp.role}
                  </h3>

                  <ul className="flex flex-col gap-3">
                    {exp.points.map((point) => (
                      <li
                        key={point}
                        data-point
                        className="text-sm font-light leading-[1.6] text-foreground/80 sm:text-base md:text-justify"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
