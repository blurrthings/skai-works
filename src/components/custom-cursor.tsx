"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine || !dotRef.current || !ringRef.current) return;

    document.documentElement.classList.add("custom-cursor-active");

    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "power3.out" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "power3.out" });
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.45, ease: "power3.out" });

    const handleMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea");
      gsap.to(ringRef.current, {
        scale: interactive ? 1.8 : 1,
        opacity: interactive ? 0.5 : 1,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleLeaveWindow = () => {
      gsap.to([dotRef.current, ringRef.current], { opacity: 0, duration: 0.2 });
    };
    const handleEnterWindow = () => {
      gsap.to([dotRef.current, ringRef.current], { opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleLeaveWindow);
    document.addEventListener("mouseenter", handleEnterWindow);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeaveWindow);
      document.removeEventListener("mouseenter", handleEnterWindow);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground will-change-transform hidden [.custom-cursor-active_&]:block"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground will-change-transform hidden [.custom-cursor-active_&]:block"
      />
    </>
  );
}
