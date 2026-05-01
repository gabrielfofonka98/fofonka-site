import { platforms } from '@/content/platforms';

export function Plataformas() {
  return (
    <section
      id="plataformas"
      className="container-editorial section-y border-t border-[var(--color-border)]"
      aria-labelledby="plataformas-heading"
    >
      <p className="eyebrow">{platforms.eyebrow}</p>
      <h2
        id="plataformas-heading"
        className="mt-4 max-w-2xl font-display text-3xl md:text-4xl font-medium leading-snug -tracking-[0.01em]"
      >
        {platforms.heading}
      </h2>

      <ul className="mt-12 md:mt-16 max-w-3xl divide-y divide-[var(--color-border)]">
        {platforms.items.map((item) => (
          <li
            key={item.name}
            className="grid grid-cols-[10rem_1fr] gap-x-6 py-4 md:py-5 items-baseline"
          >
            <span className="font-display text-base md:text-lg font-medium">
              {item.name}
            </span>
            <span className="font-body text-base text-[var(--color-text-muted)] leading-relaxed">
              {item.body}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
