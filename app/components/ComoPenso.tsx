import { comoPenso } from '@/content/copy';

export function ComoPenso() {
  return (
    <section
      id="como-penso"
      className="container-editorial section-y border-t border-[var(--color-border)]"
      aria-labelledby="como-penso-heading"
    >
      <p className="eyebrow">{comoPenso.eyebrow}</p>
      <h2
        id="como-penso-heading"
        className="mt-4 max-w-2xl font-display text-3xl md:text-4xl font-medium leading-snug -tracking-[0.01em]"
      >
        {comoPenso.heading}
      </h2>

      <ol className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl">
        {comoPenso.principles.map((principle, i) => (
          <li key={principle.title} className="flex flex-col gap-2">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-[var(--color-mark)]" aria-hidden="true">
                P{i + 1}
              </span>
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight">
                {principle.title}
              </h3>
            </div>
            <p className="font-body text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed">
              {principle.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
