import { hero } from '@/content/copy';
import { HeroCanvas } from './wow/HeroCanvas';

function renderHeadline(text: string) {
  return text.split(/(\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={i} className="font-italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function renderSubheadline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong
          key={i}
          className="font-semibold"
          style={{ color: 'var(--color-text)' }}
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function Hero() {
  return (
    <section
      id="hero"
      className="hero-section relative min-h-[88vh] flex items-center container-editorial pt-32 pb-24 md:pt-40"
      aria-labelledby="hero-headline"
    >
      <HeroCanvas />

      <div className="relative z-10 max-w-3xl">
        <p className="reveal eyebrow-pill">{hero.eyebrow}</p>

        <h1
          id="hero-headline"
          className="reveal font-display text-5xl md:text-6xl font-semibold leading-[0.95] -tracking-[0.02em] mt-8 md:mt-10"
          style={{ ['--reveal-delay' as string]: '120ms', fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'WONK' 0" }}
        >
          {renderHeadline(hero.headline)}
          <span
            className="cursor-blink ml-1 font-mono"
            style={{ color: 'var(--color-mark)' }}
            aria-hidden="true"
          >
            ▮
          </span>
        </h1>

        <p
          className="reveal mt-6 md:mt-8 max-w-2xl font-body text-lg md:text-xl leading-relaxed"
          style={{ ['--reveal-delay' as string]: '240ms', color: 'var(--color-text-muted)' }}
        >
          {renderSubheadline(hero.subheadline)}
        </p>

        <div
          className="reveal mt-10 md:mt-12 flex flex-wrap items-center gap-x-6 gap-y-3"
          style={{ ['--reveal-delay' as string]: '360ms' }}
        >
          <a href={hero.ctaPrimary.href} className="cta-primary text-base md:text-lg">
            {hero.ctaPrimary.label}
            <span aria-hidden="true">→</span>
          </a>
          <a href={hero.ctaSecondary.href} className="cta-secondary">
            {hero.ctaSecondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
