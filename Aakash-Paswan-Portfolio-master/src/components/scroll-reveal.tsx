"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  scale?: number;
  delay?: number;
  stagger?: number;
  start?: string;
};

export function ScrollReveal({
  children,
  className,
  y = 40,
  scale = 1,
  delay = 0,
  stagger = 0.08,
  start = "top 85%",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.children.length > 0 ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y, scale },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, scale, delay, stagger, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
