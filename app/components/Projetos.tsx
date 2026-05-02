import { projects } from '@/content/projects';

function renderHeading(text: string) {
  return text.split(/(\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i} className="font-italic" style={{ color: 'var(--color-mark)' }}>{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function Projetos() {
  return (
    <section
      id="ajuda"
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-iron)', borderBottom: '1px solid var(--color-iron)' }}
      aria-labelledby="ajuda-heading"
    >
      <div className="container-q4 section-y">
        <div className="max-w-3xl">
          <p className="reveal eyebrow-pill">{projects.eyebrow}</p>
          <h2 id="ajuda-heading" className="reveal mt-4 font-display font-medium leading-snug -tracking-[0.01em]" style={{ ['--reveal-delay' as string]: '120ms', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
            {renderHeading(projects.heading)}
          </h2>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {projects.items.map((area, i) => (
            <article
              key={area.title}
              className="spot-card reveal flex flex-col"
              style={{ ['--reveal-delay' as string]: `${(i + 2) * 80}ms` }}
            >
              <span aria-hidden="true" className="corner corner-tl" />
              <span aria-hidden="true" className="corner corner-tr" />
              <span aria-hidden="true" className="corner corner-bl" />
              <span aria-hidden="true" className="corner corner-br" />

              <header className="mb-3">
                <h3 className="font-display text-lg md:text-xl font-medium tracking-tight">
                  {area.title}
                </h3>
              </header>
              <p className="font-body text-sm md:text-base leading-relaxed">
                {area.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {area.stack.map((tag) => (
                  <li key={tag} className="tag-mono">{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
