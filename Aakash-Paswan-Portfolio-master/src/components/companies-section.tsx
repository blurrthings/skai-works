import Image from "next/image";
import { ScrollReveal } from "@/components/scroll-reveal";
import { companies } from "@/lib/companies-data";

export function CompaniesSection() {
  return (
    <section className="relative">
      <ScrollReveal y={30} scale={0.9} className="px-6 pt-16 text-center md:px-[120px]">
        <h2 className="text-[32px] font-bold uppercase leading-[1.1] sm:text-[44px] md:text-[56px]">
          Brands I&rsquo;ve worked with
        </h2>
      </ScrollReveal>

      <ScrollReveal
        y={20}
        scale={0.85}
        className="grid grid-cols-2 place-items-center gap-6 px-6 pb-16 pt-16 sm:flex sm:flex-wrap sm:justify-center sm:gap-10 md:pb-[108px]"
      >
        {companies.map((company) => (
          <div
            key={company.id}
            className={`relative size-[100px] shrink-0 overflow-hidden rounded-sm p-4 sm:size-[130px] md:size-[150px] ${
              company.name === "True Elements" ? "bg-white" : ""
            }`}
          >
            <Image
              src={company.src}
              alt={company.name}
              fill
              className="object-contain"
              sizes="150px"
            />
          </div>
        ))}
      </ScrollReveal>

      <div id="works" className="section-label" data-page-transition="up">
        <span>Works</span>
        <span className="hidden sm:inline">
          Our finest works on display for your perusal
        </span>
      </div>
    </section>
  );
}
