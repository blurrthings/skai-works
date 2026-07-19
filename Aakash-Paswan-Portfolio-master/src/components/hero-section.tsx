"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { heroSlides, heroImage } from "@/lib/hero-data";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const router = useRouter();
  const introRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        introRef.current?.querySelectorAll("[data-hero-fade]") ?? [],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }
      ).fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2 },
        "-=0.6"
      );
    });
    return () => ctx.revert();
  }, []);

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  function handleSeeAll() {
    const barUp = document.querySelector<HTMLElement>('[data-page-transition="up"]');
    const barDown = document.querySelector<HTMLElement>('[data-page-transition="down"]');

    if (!barUp && !barDown) {
      router.push("/videography-footages");
      return;
    }

    if (barUp) {
      gsap.to(barUp, { yPercent: -100, opacity: 0, duration: 0.5, ease: "power3.inOut" });
    }
    if (barDown) {
      gsap.to(barDown, {
        yPercent: 100,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => router.push("/videography-footages"),
      });
    } else {
      router.push("/videography-footages");
    }
  }

  const slide = heroSlides[0];

  return (
    <section className="relative flex flex-col items-center overflow-hidden border-b border-line">
      <div
        ref={introRef}
        className="flex w-full max-w-[1440px] flex-col items-start gap-6 px-6 py-16 md:px-[120px] md:py-16"
      >
        <div ref={textRef} data-hero-fade className="flex flex-col gap-1">
          <h1 className="text-[40px] font-bold leading-[1.05] text-foreground/90 sm:text-[56px] md:text-[72px]">
            {slide.title}
          </h1>
        </div>

        {"video" in slide && slide.video ? (
          <div data-hero-fade className="flex w-full flex-col items-center gap-4">
            <div
              ref={imageRef}
              className="group relative aspect-[5/3] w-full overflow-hidden rounded-md"
            >
              <video
                ref={videoRef}
                src={slide.video}
                className="size-full cursor-pointer object-cover"
                playsInline
                onClick={toggleVideo}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              <button
                aria-label={isPlaying ? "Pause video" : "Play video"}
                onClick={toggleVideo}
                className={`absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-sm transition-all hover:scale-105 sm:size-14 ${
                  isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
              >
                {isPlaying ? (
                  <Pause className="size-4" fill="currentColor" />
                ) : (
                  <Play className="size-4" fill="currentColor" />
                )}
              </button>
            </div>
            <Button
              variant="white"
              onClick={handleSeeAll}
              className="h-auto rounded-full px-6 py-2 text-xs font-semibold uppercase tracking-widest md:text-sm"
            >
              See all
            </Button>
          </div>
        ) : (
          <div
            ref={imageRef}
            data-hero-fade
            className="relative aspect-[5/3] w-full overflow-hidden rounded-md"
          >
            <Image
              src={heroImage(slide.seed)}
              alt={slide.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <a
              href="#works"
              className="absolute left-1/2 top-1/2 flex size-[140px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/40 bg-black/30 text-center text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition-transform hover:scale-105 sm:size-[180px] md:size-[240px] md:text-sm"
            >
              View
              <br />
              Collection
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
