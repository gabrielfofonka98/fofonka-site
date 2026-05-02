import { hero } from '@/content/copy';
import { HeroCanvas } from './wow/HeroCanvas';

function renderHeadline(text: string) {
  return text.split(/(\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <span key={i} className="mark-glow">{part.slice(1, -1)}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}

function renderSub(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold" style={{ color: 'var(--color-text)' }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const cliLines = [
  { text: '$ fofonka --whoami', cls: 'text-mono' },
  { text: ' ', cls: 'sep' },
  { text: '  Gabriel Fofonka', cls: 'mark', d: 2 },
  { text: '  Builder solo · brasileiro · IA aplicada', cls: 'muted', d: 3 },
  { text: ' ', cls: 'sep' },
  { text: '  stack atual:', cls: 'dim', d: 5 },
  { text: '    cortex      · framework multi-agente IA próprio', cls: 'muted', d: 6 },
  { text: '    lendario    · LMS em produção', cls: 'muted', d: 7 },
  { text: '    datai       · analytics multi-setor', cls: 'muted', d: 8 },
  { text: '    +2 produtos · rodando paralelo', cls: 'muted', d: 9 },
  { text: ' ', cls: 'sep' },
  { text: '  Bora trocar uma ideia.', cls: 'muted', d: 11, cursor: true },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
      aria-labelledby="hero-headline"
      style={{ backgroundColor: '#000000' }}
    >
      <HeroCanvas />

      {/* CRT scanlines + vertical streaks — apenas no hero (motion section) */}
      <div className="absolute inset-0 pointer-events-none crt-scanlines" aria-hidden="true" style={{ zIndex: 2, opacity: 0.4 }} />
      <div className="absolute inset-0 pointer-events-none vertical-streaks" aria-hidden="true" style={{ zIndex: 2 }} />

      {/* Scan line horizontal */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        <div
          className="absolute top-0 left-0 w-1/3 h-px animate-scan-line"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--color-mark-glow), transparent)',
          }}
        />
      </div>

      {/* CLI terminal lateral (desktop only) */}
      <div
        className="hidden lg:flex absolute right-6 lg:right-12 xl:right-16 top-1/2 -translate-y-1/2 w-full max-w-[520px] pointer-events-none"
        style={{ zIndex: 3 }}
        aria-hidden="true"
      >
        <div
          className="w-full overflow-hidden rounded-md backdrop-blur-md"
          style={{
            border: '1px solid var(--color-iron)',
            background: 'color-mix(in oklab, var(--color-bg-2) 90%, transparent)',
            boxShadow: '0 0 60px var(--color-mark-soft)',
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-2.5"
            style={{ borderBottom: '1px solid var(--color-iron)', background: 'color-mix(in oklab, var(--color-bg) 60%, transparent)' }}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FFBD2E' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28C840' }} />
            <span className="flex-1 text-center font-mono text-[10px] tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              fofonka — terminal
            </span>
          </div>
          {/* Body */}
          <div className="px-4 py-4 font-mono text-[12px] leading-[1.7] space-y-1">
            {cliLines.map((line, i) => {
              const color =
                line.cls === 'mark' ? 'var(--color-mark)' :
                line.cls === 'muted' ? 'var(--color-text-muted)' :
                line.cls === 'dim' ? 'var(--color-text-dim)' :
                'var(--color-text-muted)';
              return (
                <div
                  key={i}
                  className="cli-line"
                  style={{ ['--cli-d' as string]: line.d ?? i, color, whiteSpace: 'pre' }}
                >
                  {line.text === ' ' ? '\u00a0' : line.text}
                  {line.cursor && <span className="cli-cursor">▊</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative container-q4 w-full pt-32 pb-20 md:pt-40 md:pb-28" style={{ zIndex: 10 }}>
        {/* Top mark */}
        <div className="animate-hero-rise mb-6" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: 'var(--color-mark)' }}>
              {hero.eyebrow}
            </span>
            <span className="w-10 h-px" style={{ background: 'var(--color-mark-glow)' }} />
          </div>
        </div>

        {/* Headline */}
        <h1
          id="hero-headline"
          className="animate-hero-rise font-display font-semibold tracking-tight leading-[1.05] mb-5 max-w-2xl"
          style={{
            animationDelay: '250ms',
            fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            color: 'var(--color-text)',
            fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'WONK' 0",
          }}
        >
          {renderHeadline(hero.headline)}
        </h1>

        {/* Subtitle with border-left */}
        <p
          className="animate-hero-rise font-body text-sm md:text-base max-w-md mb-8 leading-relaxed pl-4"
          style={{
            animationDelay: '400ms',
            color: 'var(--color-text-muted)',
            borderLeft: '1px solid var(--color-mark-glow)',
          }}
        >
          {renderSub(hero.subheadline)}
        </p>

        {/* CTAs */}
        <div className="animate-hero-rise flex flex-wrap gap-4 mb-12" style={{ animationDelay: '550ms' }}>
          <a href={hero.ctaPrimary.href} className="cta-primary">
            {hero.ctaPrimary.label}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m5 12h14m-7-7 7 7-7 7" />
            </svg>
          </a>
          <a href={hero.ctaSecondary.href} className="cta-secondary">
            {hero.ctaSecondary.label}
          </a>
        </div>

        {/* Metrics */}
        <div className="animate-hero-rise grid grid-cols-3 gap-3 max-w-md" style={{ animationDelay: '700ms' }}>
          {[
            { v: '5', l: 'SaaS rodando' },
            { v: '6+', l: 'terminais paralelos' },
            { v: '1', l: 'framework próprio' },
          ].map((m) => (
            <div
              key={m.l}
              className="p-3 text-center rounded-sm backdrop-blur-sm"
              style={{
                border: '1px solid var(--color-iron)',
                background: 'color-mix(in oklab, var(--color-bg) 40%, transparent)',
              }}
            >
              <div className="font-mono text-lg md:text-xl font-bold" style={{ color: 'var(--color-mark)' }}>
                {m.v}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest mt-1" style={{ color: 'var(--color-text-muted)' }}>
                {m.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-mark-glow), transparent)' }}
      />
    </section>
  );
}
