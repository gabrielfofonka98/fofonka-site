import { comoTrabalho } from '@/content/copy';

export function ComoTrabalho() {
  return (
    <section
      id="como-trabalho"
      className="container-editorial section-y border-t border-[var(--color-border)]"
      aria-labelledby="como-trabalho-heading"
    >
      <p className="eyebrow">{comoTrabalho.eyebrow}</p>
      <h2
        id="como-trabalho-heading"
        className="mt-4 max-w-2xl font-display text-3xl md:text-4xl font-medium leading-snug -tracking-[0.01em]"
      >
        {comoTrabalho.heading}
      </h2>

      <ol className="mt-12 md:mt-16 max-w-3xl space-y-10 md:space-y-12">
        {comoTrabalho.steps.map((step, i) => (
          <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-x-4 md:gap-x-6">
            <span
              aria-hidden="true"
              className="font-mono text-sm text-[var(--color-mark)] pt-1"
            >
              0{i + 1}
            </span>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 font-body text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
