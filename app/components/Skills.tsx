import { skills } from '@/content/skills';

function renderHeading(text: string) {
  return text.split(/(\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i} className="font-italic" style={{ color: 'var(--color-mark)' }}>{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden grid-bg"
      style={{ backgroundColor: 'var(--color-bg)' }}
      aria-labelledby="skills-heading"
    >
      <div className="container-q4 section-y">
        <div className="max-w-3xl">
          <p className="reveal eyebrow-pill">{skills.eyebrow}</p>
          <h2 id="skills-heading" className="reveal mt-4 font-display font-medium leading-snug -tracking-[0.01em]" style={{ ['--reveal-delay' as string]: '120ms', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
            {renderHeading(skills.heading)}
          </h2>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {skills.groups.map((group, i) => (
            <div
              key={group.title}
              className="spot-card reveal"
              style={{ ['--reveal-delay' as string]: `${(i + 2) * 80}ms` }}
            >
              <span aria-hidden="true" className="corner corner-tl" />
              <span aria-hidden="true" className="corner corner-tr" />
              <span aria-hidden="true" className="corner corner-bl" />
              <span aria-hidden="true" className="corner corner-br" />
              <h3 className="font-display text-lg md:text-xl font-medium tracking-tight">{group.title}</h3>
              <p className="mt-2 font-body text-sm md:text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {group.body}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.tags.map((tag) => (
                  <li key={tag} className="tag-mono">{tag}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
