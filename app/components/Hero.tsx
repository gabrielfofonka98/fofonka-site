import { hero } from '@/content/copy';
import { WowHeadline } from './wow/WowHeadline';

export function Hero() {
  return (
    <section
      id="hero"
      className="container-editorial pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-44 lg:pb-32"
      aria-labelledby="hero-headline"
    >
      <div className="max-w-3xl">
        <p className="eyebrow">{hero.eyebrow}</p>

        <div className="mt-8 md:mt-10">
          <WowHeadline wordmark={hero.wordmark} ariaLabel={hero.headline} />
        </div>

        <p className="mt-6 md:mt-8 max-w-2xl font-body text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed">
          {hero.subheadline}
        </p>

        <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={hero.ctaPrimary.href}
            className="inline-flex items-center gap-2 font-body text-base md:text-lg text-[var(--color-text)] underline decoration-[var(--color-mark)] decoration-2 underline-offset-[6px] hover:decoration-[3px] focus-visible:decoration-[3px] transition-[text-decoration-thickness] duration-150"
          >
            {hero.ctaPrimary.label}
            <span aria-hidden="true">→</span>
          </a>
          <a
            href={hero.ctaSecondary.href}
            className="font-mono text-sm uppercase tracking-wider text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-150"
          >
            {hero.ctaSecondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
