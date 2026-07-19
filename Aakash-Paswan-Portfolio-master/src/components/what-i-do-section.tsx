import { ScrollReveal } from "@/components/scroll-reveal";

const facts = [
  { label: "01", title: "Photography", detail: "Portraits, events, and lifestyle sessions shot with an editorial eye." },
  { label: "02", title: "Videography", detail: "Story-first edits built from real, unscripted moments." },
  { label: "03", title: "Live Shows", detail: "Media and stage crew experience across fast-paced live productions." },
];

export function WhatIDoSection() {
  return (
    <section className="relative border-b border-line">
      <div className="section-label">
        <span>What I do</span>
        <span className="hidden sm:inline">Where my work is rooted</span>
      </div>

      <ScrollReveal
        y={30}
        className="grid grid-cols-1 gap-10 px-6 py-16 md:px-[120px] lg:grid-cols-3 lg:gap-8"
      >
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-4 border-t border-line pt-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-text">
              {fact.label}
            </span>
            <h3 className="text-2xl font-bold uppercase leading-tight sm:text-[28px]">
              {fact.title}
            </h3>
            <p className="text-sm font-light leading-[1.5] text-foreground/80 uppercase">
              {fact.detail}
            </p>
          </div>
        ))}
      </ScrollReveal>
    </section>
  );
}
