import { projects } from '@/data/mock';

export function ProjectsSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Projects</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.id} className="executive-card">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="mt-2 text-zinc-300">{project.summary}</p>
            <p className="mt-4 text-sm text-zinc-400">{project.caseStudy}</p>
            <p className="mt-3 text-sm text-emerald-200">{project.impact}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
