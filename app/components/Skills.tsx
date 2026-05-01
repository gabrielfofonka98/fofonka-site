import { skills } from '@/content/skills';

export function Skills() {
  return (
    <section
      id="skills"
      className="container-editorial section-y border-t border-[var(--color-border)]"
      aria-labelledby="skills-heading"
    >
      <p className="eyebrow">{skills.eyebrow}</p>
      <h2
        id="skills-heading"
        className="mt-4 max-w-2xl font-display text-3xl md:text-4xl font-medium leading-snug -tracking-[0.01em]"
      >
        {skills.heading}
      </h2>

      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 max-w-5xl">
        {skills.groups.map((group) => (
          <div key={group.title}>
            <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight">
              {group.title}
            </h3>
            <p className="mt-2 font-body text-base text-[var(--color-text-muted)] leading-relaxed">
              {group.body}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
              {group.tags.map((tag) => (
                <li
                  key={tag}
                  className="font-mono text-xs text-[var(--color-text)] border border-[var(--color-border)] rounded-sm px-2 py-1"
                >
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
