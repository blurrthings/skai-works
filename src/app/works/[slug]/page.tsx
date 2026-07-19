import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WorkGallery } from "@/components/work-gallery";
import { getProject, projects } from "@/lib/projects-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.title} — Portfolio of Work`,
    description: project.quote,
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col">
      <section className="relative border-b border-line pt-[100px]">
        <SiteHeader />

        <div className="section-label">
          <span>Portfolio of Work</span>
          <span className="hidden sm:inline">{project.category}</span>
        </div>

        <WorkGallery project={project} />
      </section>
      <SiteFooter />
    </main>
  );
}
