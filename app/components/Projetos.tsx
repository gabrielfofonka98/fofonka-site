import { projects } from '@/content/projects';

export function Projetos() {
  return (
    <section
      id="projetos"
      className="container-editorial section-y border-t border-[var(--color-border)]"
      aria-labelledby="projetos-heading"
    >
      <p className="eyebrow">{projects.eyebrow}</p>
      <h2
        id="projetos-heading"
        className="mt-4 max-w-2xl font-display text-3xl md:text-4xl font-medium leading-snug -tracking-[0.01em]"
      >
        {projects.heading}
      </h2>

      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 max-w-5xl">
        {projects.items.map((project) => (
          <article
            key={project.name}
            className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-6"
          >
            <header className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight">
                {project.name}
              </h3>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-wider text-[var(--color-mark)] hover:underline underline-offset-4"
                >
                  visitar →
                </a>
              ) : null}
            </header>
            <p className="font-body text-base text-[var(--color-text)] leading-relaxed">
              {project.context}
            </p>
            <p className="font-body text-base text-[var(--color-text-muted)] leading-relaxed">
              {project.diferencial}
            </p>
            <ul className="mt-1 flex flex-wrap gap-1.5">
              {project.stack.map((tag) => (
                <li
                  key={tag}
                  className="font-mono text-2xs text-[var(--color-text-muted)] border border-[var(--color-border)] rounded-sm px-1.5 py-0.5"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <p className="font-mono text-xs text-[var(--color-text-muted)] mt-1">
              {project.status}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
