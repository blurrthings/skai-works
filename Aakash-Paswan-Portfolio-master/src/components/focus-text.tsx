"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";

type FocusTextProps = {
  text: string;
  className?: string;
  lineClassName?: string;
  minWeight?: number;
  maxWeight?: number;
};

export function FocusText({
  text,
  className,
  lineClassName,
  minWeight = 400,
  maxWeight = 800,
}: FocusTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let split: SplitText | undefined;

    const ctx = gsap.context(() => {
      split = SplitText.create(el, {
        type: "lines",
        linesClass: lineClassName ?? "focus-line",
      });

      gsap.set(split.lines, {
        opacity: 0.3,
        fontWeight: minWeight,
        filter: "blur(4px)",
        yPercent: 20,
      });

      gsap.to(split.lines, {
        opacity: 1,
        fontWeight: maxWeight,
        filter: "blur(0px)",
        yPercent: 0,
        ease: "none",
        stagger: 0.18,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 35%",
          scrub: true,
        },
      });
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [text, lineClassName, minWeight, maxWeight]);

  return (
    <p ref={containerRef} className={className}>
      {text}
    </p>
  );
}
