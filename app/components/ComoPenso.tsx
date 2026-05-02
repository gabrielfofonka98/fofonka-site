import { comoPenso } from '@/content/copy';

function renderHeading(text: string) {
  return text.split(/(\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i} className="font-italic">{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function ComoPenso() {
  return (
    <section
      id="como-penso"
      className="grid-bg container-editorial section-y"
      aria-labelledby="como-penso-heading"
    >
      <p className="reveal eyebrow-pill">{comoPenso.eyebrow}</p>
      <h2
        id="como-penso-heading"
        className="reveal mt-4 max-w-2xl font-display text-3xl md:text-4xl font-medium leading-snug -tracking-[0.01em]"
        style={{ ['--reveal-delay' as string]: '120ms' }}
      >
        {renderHeading(comoPenso.heading)}
      </h2>

      <ol className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl">
        {comoPenso.principles.map((principle, i) => (
          <li
            key={principle.title}
            className="reveal flex flex-col gap-2"
            style={{ ['--reveal-delay' as string]: `${(i + 2) * 100}ms` }}
          >
            <div className="flex items-baseline gap-3">
              <span
                className="font-mono text-xs"
                style={{ color: 'var(--color-mark)' }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight">
                {principle.title}
              </h3>
            </div>
            <p
              className="font-body text-base md:text-lg leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {principle.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
