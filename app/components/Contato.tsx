import { contato } from '@/content/copy';

export function Contato() {
  const primary = contato.channels.filter((c) => c.primary);
  const secondary = contato.channels.filter((c) => !c.primary);

  return (
    <footer
      id="contato"
      className="grid-bg container-editorial section-y"
      aria-labelledby="contato-heading"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <p className="reveal eyebrow">[ {contato.eyebrow.toUpperCase()} ]</p>
      <h2
        id="contato-heading"
        className="reveal mt-4 font-display text-4xl md:text-5xl font-semibold leading-snug -tracking-[0.02em]"
        style={{ ['--reveal-delay' as string]: '120ms' }}
      >
        {contato.heading}
      </h2>

      <div
        className="reveal mt-10 md:mt-12 max-w-3xl flex flex-col gap-4"
        style={{ ['--reveal-delay' as string]: '240ms' }}
      >
        {primary.map((c) => (
          <a
            key={c.label}
            href={c.href}
            {...(c.href.startsWith('http')
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className="cta-primary text-lg md:text-xl w-fit"
          >
            <span
              className="font-mono text-xs uppercase tracking-wider no-underline"
              style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}
            >
              {c.label}
            </span>
            <span>{c.value}</span>
          </a>
        ))}
      </div>

      <ul
        className="reveal mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm"
        style={{ ['--reveal-delay' as string]: '360ms', color: 'var(--color-text-muted)' }}
      >
        {secondary.map((c) => (
          <li key={c.label}>
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-[var(--color-text)]"
            >
              {c.label} →
            </a>
          </li>
        ))}
      </ul>

      <p
        className="reveal mt-16 md:mt-24 font-mono text-xs tracking-wider"
        style={{ ['--reveal-delay' as string]: '480ms', color: 'var(--color-text-muted)' }}
      >
        {contato.copyright}
      </p>
    </footer>
  );
}
