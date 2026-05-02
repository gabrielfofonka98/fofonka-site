import { comoPenso } from '@/content/copy';

function renderHeading(text: string) {
  return text.split(/(\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i} className="font-italic" style={{ color: 'var(--color-mark)' }}>{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function ComoPenso() {
  return (
    <section
      id="como-penso"
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-iron)', borderBottom: '1px solid var(--color-iron)' }}
      aria-labelledby="como-penso-heading"
    >
      <div className="container-q4 section-y">
        <div className="max-w-3xl">
          <p className="reveal eyebrow-pill">{comoPenso.eyebrow}</p>
          <h2 id="como-penso-heading" className="reveal mt-4 font-display font-medium leading-snug -tracking-[0.01em]" style={{ ['--reveal-delay' as string]: '120ms', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
            {renderHeading(comoPenso.heading)}
          </h2>
        </div>

        <ol className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {comoPenso.principles.map((principle, i) => (
            <li
              key={principle.title}
              className="spot-card reveal"
              style={{ ['--reveal-delay' as string]: `${(i + 2) * 80}ms` }}
            >
              <span aria-hidden="true" className="corner corner-tl" />
              <span aria-hidden="true" className="corner corner-tr" />
              <span aria-hidden="true" className="corner corner-bl" />
              <span aria-hidden="true" className="corner corner-br" />
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-mono text-xs" style={{ color: 'var(--color-mark)' }} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg md:text-xl font-medium tracking-tight">{principle.title}</h3>
              </div>
              <p className="font-body text-sm md:text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {principle.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
