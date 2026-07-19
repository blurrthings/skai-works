"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { SiteHeader } from "@/components/site-header";
import { ContactFormDialog } from "@/components/contact-form-dialog";
// import PROFILE_IMAGE from "@/assets/IMG_0081-bg-removed.webp";
import PROFILE_IMAGE from "@/assets/IMG_7512.webp";

export function ProfileIntroSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const sideLineRef = useRef<HTMLDivElement>(null);
  const arrowRightRef = useRef<HTMLDivElement>(null);
  const arrowDownRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.3, ease: "power2.inOut" },
        0
      )
        .fromTo(
          sideLineRef.current,
          { scaleY: 0 },
          { scaleY: 1, duration: 1.3, ease: "power2.inOut" },
          0.5
        )
        .fromTo(
          rootRef.current?.querySelectorAll("[data-intro-fade]") ?? [],
          { yPercent: 100 },
          { yPercent: 0, duration: 1, stagger: 0.16, ease: "power4.out" },
          1
        )
        .fromTo(
          imageWrapRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" },
          1.1
        )
        .fromTo(
          parallaxRef.current,
          { scale: 1.25, yPercent: -8 },
          { scale: 1, duration: 1.6, ease: "power3.out" },
          1.1
        );

      gsap.fromTo(
        parallaxRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    let ctx: gsap.Context | undefined;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.to([arrowRightRef.current, arrowDownRef.current], {
          opacity: 1,
          duration: 0.6,
          ease: "power1.out",
        });
        gsap.to(arrowRightRef.current, {
          x: 14,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
        gsap.to(arrowDownRef.current, {
          y: 14,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }, rootRef);
    }, 18000);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col overflow-hidden border-b border-line"
    >
      <SiteHeader />

      <div
        ref={dividerRef}
        className="absolute inset-x-0 top-[100px] h-px origin-right scale-x-0 bg-line"
      />

      <div
        ref={sideLineRef}
        className="absolute inset-y-0 left-6 hidden w-px origin-top scale-y-0 bg-line sm:block md:left-[120px]"
      />

      <div
        ref={rootRef}
        className="grid w-full flex-1 grid-cols-1 items-center gap-10 px-6 pb-16 pt-[140px] md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:px-[120px] md:pb-0 md:pt-[100px] lg:min-h-[860px]"
      >
        <div className="flex flex-col items-end gap-2 text-right">
          <div className="overflow-hidden">
            <p
              data-intro-fade
              className="block text-[1.4rem] font-light uppercase tracking-[0.5em] text-foreground/80 sm:text-[2rem]"
            >
              Hello, I&apos;m
            </p>
          </div>
          <h1 className="flex flex-col text-right text-[55px] font-bold uppercase leading-[0.98] sm:text-[83px] md:text-[99px] lg:text-[115px]">
            <span className="overflow-hidden">
              <span data-intro-fade className="block">
                Aakash
              </span>
            </span>
            <span className="overflow-hidden">
              <span data-intro-fade className="block">
                Paswan
              </span>
            </span>
          </h1>
          <div className="overflow-hidden">
            <p
              data-intro-fade
              className="block whitespace-nowrap text-[clamp(0.85rem,3.2vw,1.25rem)] font-light uppercase tracking-[0.09em] text-foreground/80"
            >
              Videographer and photographer
            </p>
          </div>
          <div className="overflow-hidden pt-4">
            <div data-intro-fade className="flex items-center gap-4">
              <a
                href="#works"
                className="bg-foreground px-10 py-4 text-lg font-semibold uppercase text-background transition-opacity hover:opacity-90"
              >
                See Work
              </a>
              <ContactFormDialog>
                <button
                  type="button"
                  className="rounded-full border border-line px-6 py-3 text-sm font-medium uppercase tracking-wide transition-colors hover:border-foreground"
                >
                  Contact Me
                </button>
              </ContactFormDialog>
              <div
                ref={arrowRightRef}
                aria-hidden="true"
                className="hidden opacity-0 md:block"
              >
                <ArrowRight className="size-6" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div
            ref={arrowDownRef}
            aria-hidden="true"
            className="flex w-full justify-center pt-2 opacity-0 md:hidden"
          >
            <ArrowDown className="size-6" strokeWidth={1.5} />
          </div>
        </div>

        <div className="relative aspect-[7/10] w-full max-w-[480px] justify-self-center self-center overflow-hidden md:aspect-auto md:h-full md:w-full md:max-w-none md:justify-self-end md:self-stretch">
          <div className="pointer-events-none absolute inset-x-[10%] bottom-[6%] h-[16%] rounded-[50%] bg-black/20 blur-2xl dark:bg-black/60 dark:blur-3xl" />

          <div ref={imageWrapRef} className="absolute inset-0 overflow-hidden">
            <div
              ref={parallaxRef}
              className="absolute inset-x-0 -top-[10%] h-[120%]"
            >
              <Image
                src={PROFILE_IMAGE}
                alt="Aakash Paswan standing confidently"
                fill
                priority
                className="object-cover drop-shadow-[0_30px_35px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_30px_45px_rgba(0,0,0,0.7)]"
                sizes="(max-width: 768px) 90vw, 480px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
