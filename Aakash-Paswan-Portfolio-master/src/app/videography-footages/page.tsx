import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VideographyGallery } from "@/components/videography-gallery";

export const metadata: Metadata = {
  title: "Videography Footages — Portfolio of Work",
  description: "A horizontal reel of videography footages shot by Aakash Paswan.",
};

export default function VideographyFootagesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative border-b border-line pt-[100px]">
        <SiteHeader />

        <div className="section-label">
          <span>Videography Footages</span>
          <span className="hidden sm:inline">Our finest works on display for your perusal</span>
        </div>
      </section>

      <VideographyGallery />

      <SiteFooter variant="minimal" />
    </main>
  );
}
