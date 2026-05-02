import { comoTrabalho } from '@/content/copy';

function renderHeading(text: string) {
  return text.split(/(\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i} className="font-italic">{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function ComoTrabalho() {
  return (
    <section
      id="como-trabalho"
      className="grid-bg section-darker container-editorial section-y"
      aria-labelledby="como-trabalho-heading"
    >
      <p className="reveal eyebrow-pill">{comoTrabalho.eyebrow}</p>
      <h2
        id="como-trabalho-heading"
        className="reveal mt-4 max-w-2xl font-display text-3xl md:text-4xl font-medium leading-snug -tracking-[0.01em]"
        style={{ ['--reveal-delay' as string]: '120ms' }}
      >
        {renderHeading(comoTrabalho.heading)}
      </h2>

      <ol className="mt-12 md:mt-16 max-w-3xl space-y-10 md:space-y-12">
        {comoTrabalho.steps.map((step, i) => (
          <li
            key={step.title}
            className="reveal grid grid-cols-[3rem_1fr] gap-x-4 md:gap-x-6"
            style={{ ['--reveal-delay' as string]: `${(i + 2) * 100}ms` }}
          >
            <span
              aria-hidden="true"
              className="font-mono text-sm pt-1"
              style={{ color: 'var(--color-mark)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight">
                {step.title}
              </h3>
              <p
                className="mt-2 font-body text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
