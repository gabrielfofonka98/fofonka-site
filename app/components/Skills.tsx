import { skills } from '@/content/skills';

function renderHeading(text: string) {
  return text.split(/(\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i} className="font-italic">{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function Skills() {
  return (
    <section
      id="skills"
      className="grid-bg container-editorial section-y"
      aria-labelledby="skills-heading"
    >
      <p className="reveal eyebrow-pill">{skills.eyebrow}</p>
      <h2
        id="skills-heading"
        className="reveal mt-4 max-w-2xl font-display text-3xl md:text-4xl font-medium leading-snug -tracking-[0.01em]"
        style={{ ['--reveal-delay' as string]: '120ms' }}
      >
        {renderHeading(skills.heading)}
      </h2>

      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 max-w-5xl">
        {skills.groups.map((group, i) => (
          <div
            key={group.title}
            className="reveal"
            style={{ ['--reveal-delay' as string]: `${(i + 2) * 80}ms` }}
          >
            <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight">
              {group.title}
            </h3>
            <p
              className="mt-2 font-body text-base leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {group.body}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
              {group.tags.map((tag) => (
                <li key={tag} className="tag-mono">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
