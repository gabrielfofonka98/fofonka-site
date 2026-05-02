import { platforms } from '@/content/platforms';

function renderHeading(text: string) {
  return text.split(/(\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i} className="font-italic" style={{ color: 'var(--color-mark)' }}>{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function Plataformas() {
  return (
    <section
      id="plataformas"
      className="relative overflow-hidden section-paper"
      style={{ borderTop: '1px solid rgba(24,24,24,0.10)', borderBottom: '1px solid rgba(24,24,24,0.10)' }}
      aria-labelledby="plataformas-heading"
    >
      <div className="container-q4 section-y">
        <div className="max-w-3xl">
          <p className="reveal eyebrow-pill">{platforms.eyebrow}</p>
          <h2 id="plataformas-heading" className="reveal mt-4 font-display font-medium leading-snug -tracking-[0.01em]" style={{ ['--reveal-delay' as string]: '120ms', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
            {renderHeading(platforms.heading)}
          </h2>
        </div>

        <ul className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-px reveal" style={{ ['--reveal-delay' as string]: '240ms' }}>
          {platforms.items.map((item) => (
            <li
              key={item.name}
              className="grid grid-cols-[10rem_1fr] gap-x-6 py-4 items-baseline"
              style={{ borderBottom: '1px solid var(--color-iron)' }}
            >
              <span className="font-display text-base md:text-lg font-medium tracking-tight">{item.name}</span>
              <span className="font-body text-sm md:text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {item.body}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
