"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { videographySlides } from "@/lib/hero-data";

function VideoPlayer({ video }: { video: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function toggleVideo() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
    } else {
      el.pause();
    }
  }

  return (
    <div className="group relative aspect-[5/3] w-full overflow-hidden rounded-md">
      <video
        ref={videoRef}
        src={video}
        className="size-full cursor-pointer object-cover"
        loop
        playsInline
        onClick={toggleVideo}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        aria-label={isPlaying ? "Pause video" : "Play video"}
        onClick={toggleVideo}
        className={`absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-sm transition-all hover:scale-105 ${
          isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      >
        {isPlaying ? (
          <Pause className="size-5" fill="currentColor" />
        ) : (
          <Play className="size-5" fill="currentColor" />
        )}
      </button>
    </div>
  );
}

export function VideographyGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const slideCount = videographySlides.length;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const distance = () => window.innerWidth * (slideCount - 1);

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(track, { x: -distance() * self.progress });
        },
      });

      return () => trigger.kill();
    });

    return () => mm.revert();
  }, []);

  function goTo(index: number) {
    setActiveIndex((index + videographySlides.length) % videographySlides.length);
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="relative hidden md:block"
        style={{ height: `${videographySlides.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden border-b border-line">
          <div ref={trackRef} className="flex h-full w-max">
            {videographySlides.map((slide, i) => (
              <div
                key={slide.id}
                className="flex h-full w-screen shrink-0 flex-col items-center justify-center gap-4 px-2 md:px-4"
              >
                <div className="relative w-full max-w-[1200px]">
                  <VideoPlayer video={slide.video} />
                  <span className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-widest text-white/70">
                    {String(i + 1).padStart(2, "0")} / {String(videographySlides.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-line px-6 py-10 md:hidden">
        <div key={activeIndex} className="relative w-full">
          <VideoPlayer video={videographySlides[activeIndex].video} />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button
            aria-label="Previous video"
            onClick={() => goTo(activeIndex - 1)}
            className="flex size-10 items-center justify-center rounded-full border border-line transition-colors hover:border-foreground"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-text">
            {String(activeIndex + 1).padStart(2, "0")} / {String(videographySlides.length).padStart(2, "0")}
          </span>
          <button
            aria-label="Next video"
            onClick={() => goTo(activeIndex + 1)}
            className="flex size-10 items-center justify-center rounded-full border border-line transition-colors hover:border-foreground"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </section>
    </>
  );
}
