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
  { text: '$ fofonka --capabilities', cls: 'mono' },
  { text: ' ', cls: 'sep' },
  { text: '  Gabriel Fofonka', cls: 'mark', d: 2 },
  { text: '  Engenharia de software · IA aplicada · automação', cls: 'muted', d: 3 },
  { text: ' ', cls: 'sep' },
  { text: '  áreas de atuação:', cls: 'dim', d: 5 },
  { text: '    saas         · ponta a ponta com staging-first', cls: 'muted', d: 6 },
  { text: '    ia aplicada  · multi-agente, llms, automação', cls: 'muted', d: 7 },
  { text: '    auditoria    · rls · cors · owasp top 10', cls: 'muted', d: 8 },
  { text: '    arquitetura  · prd → adr → spec → dev', cls: 'muted', d: 9 },
  { text: ' ', cls: 'sep' },
  { text: '  Disponível para conversar.', cls: 'muted', d: 11, cursor: true },
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
      <div className="absolute inset-0 pointer-events-none crt-scanlines" aria-hidden="true" style={{ zIndex: 2, opacity: 0.22 }} />
      <div className="absolute inset-0 pointer-events-none vertical-streaks" aria-hidden="true" style={{ zIndex: 2, opacity: 0.45 }} />

      {/* Scan line horizontal */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        <div
          className="absolute top-0 left-0 w-1/3 h-px animate-scan-line"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--color-mark-soft), transparent)',
            opacity: 0.65,
          }}
        />
      </div>

      {/* Hero content */}
      <div className="relative container-q4 w-full pt-32 pb-20 md:pt-40 md:pb-28" style={{ zIndex: 10 }}>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(340px,440px)] xl:grid-cols-[minmax(0,1fr)_minmax(380px,480px)]">
          <div className="min-w-0">
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
            <div className="animate-hero-rise grid grid-cols-3 gap-2 max-w-md sm:gap-3" style={{ animationDelay: '700ms' }}>
              {[
                { v: 'Full', l: 'stack end-to-end' },
                { v: 'IA', l: 'aplicada · multi-agente' },
                { v: 'BR', l: 'PT-BR · português nativo' },
              ].map((m) => (
                <div
                  key={m.l}
                  className="min-h-[104px] p-2 text-center rounded-sm backdrop-blur-sm sm:min-h-[90px] sm:p-3"
                  style={{
                    border: '1px solid var(--color-iron)',
                    background: 'color-mix(in oklab, var(--color-bg) 40%, transparent)',
                  }}
                >
                  <div className="font-mono text-base font-bold sm:text-lg md:text-xl" style={{ color: 'var(--color-mark)' }}>
                    {m.v}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest mt-1 leading-relaxed sm:text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
                    {m.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CLI terminal lateral (desktop only) */}
          <div className="hidden min-w-0 pointer-events-none lg:block" aria-hidden="true">
            <div
              className="animate-hero-rise w-full max-w-full overflow-hidden rounded-md backdrop-blur-md"
              style={{
                animationDelay: '500ms',
                opacity: 0.86,
                border: '1px solid var(--color-iron)',
                background: 'color-mix(in oklab, var(--color-bg-2) 84%, transparent)',
                boxShadow: '0 18px 48px rgba(0, 0, 0, 0.28), 0 0 30px var(--color-mark-soft)',
              }}
            >
              {/* Title bar */}
              <div
                className="flex min-w-0 items-center gap-2 px-4 py-2.5"
                style={{ borderBottom: '1px solid var(--color-iron)', background: 'color-mix(in oklab, var(--color-bg) 60%, transparent)' }}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: '#FF5F57' }} />
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: '#FFBD2E' }} />
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: '#28C840' }} />
                <span className="min-w-0 flex-1 truncate text-center font-mono text-[10px] tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                  fofonka — terminal
                </span>
              </div>
              {/* Body */}
              <div className="min-w-0 px-4 py-4 font-mono text-[10.5px] leading-[1.75] space-y-1 xl:text-[11.5px]">
                {cliLines.map((line, i) => {
                  const color =
                    line.cls === 'mark' ? 'var(--color-mark)' :
                    line.cls === 'muted' ? 'var(--color-text-muted)' :
                    line.cls === 'dim' ? 'var(--color-text-dim)' :
                    'var(--color-text-muted)';
                  return (
                    <div
                      key={i}
                      className="cli-line max-w-full"
                      style={{ ['--cli-d' as string]: line.d ?? i, color, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}
                    >
                      {line.text === ' ' ? '\u00a0' : line.text}
                      {line.cursor && <span className="cli-cursor">▊</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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
