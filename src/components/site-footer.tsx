"use client";

import { useLayoutEffect, useRef } from "react";
import { Aperture, MapPin, Phone } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { navLinks } from "@/lib/site-data";
import { InstagramIcon} from "@/components/social-icons";

const MARQUEE_REPEAT = 4;

type SiteFooterProps = {
  variant?: "default" | "minimal";
};

export function SiteFooter({ variant = "default" }: SiteFooterProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const showMarquee = variant !== "minimal";
  const showContactCta = variant !== "minimal";

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 14,
        ease: "linear",
        repeat: -1,
      });

      return () => tween.kill();
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" className="relative overflow-hidden">
      <div className="section-label">
        <span>Contact</span>
        <span className="hidden sm:inline">
          I make it easy for you to get in touch look for my email or phone no.
        </span>
      </div>

      {showMarquee && (
        <div className="overflow-hidden py-16 md:py-20">
          <div ref={trackRef} className="flex w-max items-center gap-16 md:gap-24">
            {Array.from({ length: MARQUEE_REPEAT * 2 }).map((_, i) => (
              <span
                key={i}
                className="text-outline whitespace-nowrap font-display text-[9vw] uppercase leading-none sm:text-[56px] md:text-[80px] lg:text-[96px]"
              >
                Let&rsquo;s work together
              </span>
            ))}
          </div>
        </div>
      )}

      {showContactCta && (
        <div className="flex flex-col items-center gap-8 px-6 pb-16 md:flex-row md:items-center md:justify-between md:px-[120px]">
          <a
            href="mailto:blurrthings@gmail.com"
            className="bg-foreground px-10 py-4 text-lg font-semibold uppercase text-background transition-opacity hover:opacity-90"
          >
            blurrthings@gmail.com
          </a>

          <div className="flex items-center gap-3">
            {[InstagramIcon].map((Icon, i) => (
              <a
                key={i}
                href="https://www.instagram.com/blurrthingss"
                target="_blank"
                aria-label="social link"
                className="flex size-10 items-center justify-center rounded-full border border-line transition-colors hover:border-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-12 border-t border-line px-6 py-12 md:flex-row md:items-start md:justify-between md:px-[120px]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Aperture className="size-6" strokeWidth={1.5} />
            <span className="text-2xl font-semibold">AP Works</span>
          </div>
          <p className="flex items-center gap-2 text-base text-foreground/80">
            <MapPin className="size-4 shrink-0" strokeWidth={1.5} />
            Mumbai, India
          </p>
          <p className="flex items-center gap-2 text-base text-foreground/80">
            <Phone className="size-4 shrink-0" strokeWidth={1.5} />
            +91755869363
          </p>
        </div>

        <nav className="flex flex-col items-start gap-4 text-base uppercase md:items-end">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-muted-text"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
