import { contato } from '@/content/copy';

export function Contato() {
  const primary = contato.channels.filter((c) => c.primary);
  const secondary = contato.channels.filter((c) => !c.primary);

  return (
    <footer
      id="contato"
      className="container-editorial section-y border-t border-[var(--color-border)]"
      aria-labelledby="contato-heading"
    >
      <p className="eyebrow">{contato.eyebrow}</p>
      <h2
        id="contato-heading"
        className="mt-4 font-display text-4xl md:text-5xl font-semibold leading-snug -tracking-[0.02em]"
      >
        {contato.heading}
      </h2>

      <div className="mt-10 md:mt-12 max-w-3xl flex flex-col gap-4">
        {primary.map((c) => (
          <a
            key={c.label}
            href={c.href}
            {...(c.href.startsWith('http')
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className="inline-flex items-baseline gap-3 font-body text-lg md:text-xl text-[var(--color-text)] underline decoration-[var(--color-mark)] decoration-2 underline-offset-[6px] hover:decoration-[3px] focus-visible:decoration-[3px] transition-[text-decoration-thickness] duration-150 w-fit"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] no-underline">
              {c.label}
            </span>
            <span>{c.value}</span>
          </a>
        ))}
      </div>

      <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-[var(--color-text-muted)]">
        {secondary.map((c) => (
          <li key={c.label}>
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-text)] transition-colors duration-150"
            >
              {c.label} →
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-16 md:mt-24 font-mono text-xs text-[var(--color-text-muted)] tracking-wider">
        {contato.copyright}
      </p>
    </footer>
  );
}
