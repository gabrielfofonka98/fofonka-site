import { platforms } from '@/content/platforms';

export function Plataformas() {
  return (
    <section
      id="plataformas"
      className="grid-bg container-editorial section-y"
      aria-labelledby="plataformas-heading"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <p className="reveal eyebrow">[ {platforms.eyebrow.toUpperCase()} ]</p>
      <h2
        id="plataformas-heading"
        className="reveal mt-4 max-w-2xl font-display text-3xl md:text-4xl font-medium leading-snug -tracking-[0.01em]"
        style={{ ['--reveal-delay' as string]: '120ms' }}
      >
        {platforms.heading}
      </h2>

      <ul
        className="mt-12 md:mt-16 max-w-3xl reveal"
        style={{
          ['--reveal-delay' as string]: '240ms',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        {platforms.items.map((item) => (
          <li
            key={item.name}
            className="grid grid-cols-[10rem_1fr] gap-x-6 py-4 md:py-5 items-baseline"
            style={{ borderBottom: '1px solid var(--color-border)' }}
          >
            <span className="font-display text-base md:text-lg font-medium">
              {item.name}
            </span>
            <span
              className="font-body text-base leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {item.body}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
