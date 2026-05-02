import { projects } from '@/content/projects';
import { CornerAccents } from './CornerAccents';

function renderHeading(text: string) {
  return text.split(/(\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i} className="font-italic">{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function Projetos() {
  return (
    <section
      id="projetos"
      className="grid-bg container-editorial section-y"
      aria-labelledby="projetos-heading"
    >
      <p className="reveal eyebrow-pill">{projects.eyebrow}</p>
      <h2
        id="projetos-heading"
        className="reveal mt-4 max-w-2xl font-display text-3xl md:text-4xl font-medium leading-snug -tracking-[0.01em]"
        style={{ ['--reveal-delay' as string]: '120ms' }}
      >
        {renderHeading(projects.heading)}
      </h2>

      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 max-w-5xl">
        {projects.items.map((project, i) => (
          <article
            key={project.name}
            className="card-hover reveal flex flex-col gap-3 pt-6 pb-6 px-4"
            style={{
              ['--reveal-delay' as string]: `${(i + 2) * 100}ms`,
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <CornerAccents />
            <header className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight">
                {project.name}
              </h3>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-wider hover:underline underline-offset-4"
                  style={{ color: 'var(--color-mark)' }}
                >
                  visitar →
                </a>
              ) : null}
            </header>
            <p className="font-body text-base leading-relaxed">
              {project.context}
            </p>
            <p
              className="font-body text-base leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {project.diferencial}
            </p>
            <ul className="mt-1 flex flex-wrap gap-1.5">
              {project.stack.map((tag) => (
                <li key={tag} className="tag-mono">
                  {tag}
                </li>
              ))}
            </ul>
            <p
              className="font-mono text-xs mt-1"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {project.status}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
