"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Aperture, Menu } from "lucide-react";
import { navLinks } from "@/lib/site-data";
import { gsap } from "@/lib/gsap";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) {
      requestAnimationFrame(() => {
        const links = navRef.current?.querySelectorAll("[data-menu-link]");
        if (!links?.length) return;
        gsap.fromTo(
          links,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power4.out",
          }
        );
      });
    }
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50 flex h-[100px] items-center justify-between px-6 md:px-[120px]">
      <Link href="/" className="flex items-center gap-2">
        <Aperture className="size-6 text-foreground" strokeWidth={1.5} />
        <span className="font-semibold text-2xl">AP Works</span>
      </Link>

      <nav className="hidden items-center gap-10 text-sm font-medium uppercase tracking-wide text-foreground/80 lg:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
        <ThemeToggle />
      </nav>

      <span className="hidden font-semibold text-2xl md:block lg:hidden">
        Aakash Paswan
      </span>

      <div className="flex items-center gap-4 lg:hidden">
        <ThemeToggle />
        <Sheet open={open} onOpenChange={handleOpenChange}>
          <SheetTrigger asChild>
            <button aria-label="Open menu" className="flex items-center">
              <Menu className="size-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="top" className="bg-background text-foreground">
            <SheetHeader>
              <SheetTitle className="text-foreground">Menu</SheetTitle>
            </SheetHeader>
            <nav
              ref={navRef}
              className="flex flex-col gap-6 px-6 pb-8 pt-4 text-lg font-medium uppercase"
            >
              {navLinks.map((link) => (
                <span key={link.href} data-menu-link className="overflow-hidden">
                  <a
                    href={link.href}
                    className="block transition-colors hover:text-muted-text"
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
