import { contato } from '@/content/copy';

function renderHeading(text: string) {
  return text.split(/(\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i} className="font-italic" style={{ color: 'var(--color-mark)' }}>{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function Contato() {
  const primary = contato.channels.filter((c) => c.primary);
  const secondary = contato.channels.filter((c) => !c.primary);

  return (
    <footer
      id="contato"
      className="relative overflow-hidden grid-bg"
      style={{ backgroundColor: 'var(--color-bg-2)', borderTop: '1px solid var(--color-iron)' }}
      aria-labelledby="contato-heading"
    >
      <div className="container-q4 section-y">
        <div className="max-w-3xl">
          <p className="reveal eyebrow-pill">{contato.eyebrow}</p>
          <h2 id="contato-heading" className="reveal mt-4 font-display font-semibold leading-tight -tracking-[0.02em]" style={{ ['--reveal-delay' as string]: '120ms', fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}>
            {renderHeading(contato.heading)}
          </h2>
          <p className="reveal mt-6 max-w-xl font-body text-base md:text-lg leading-relaxed" style={{ ['--reveal-delay' as string]: '240ms', color: 'var(--color-text-muted)' }}>
            Email funciona. WhatsApp também. Sem formulário, sem auto-resposta.
          </p>
        </div>

        {/* CTAs primários — botões grandes no estilo Q4 */}
        <div className="reveal mt-10 md:mt-12 flex flex-wrap gap-4" style={{ ['--reveal-delay' as string]: '360ms' }}>
          {primary.map((c) => (
            <a
              key={c.label}
              href={c.href}
              {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={c.label === 'Email' ? 'cta-primary' : 'cta-secondary'}
            >
              {c.value}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m5 12h14m-7-7 7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>

        {/* Secondary social row */}
        <ul className="reveal mt-12 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm uppercase tracking-wider" style={{ ['--reveal-delay' as string]: '480ms', color: 'var(--color-text-muted)' }}>
          {secondary.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-150 hover:text-[var(--color-mark)]"
              >
                {c.label} →
              </a>
            </li>
          ))}
        </ul>

        {/* Footer baixo */}
        <div className="mt-16 md:mt-24 pt-6 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-3" style={{ borderColor: 'var(--color-iron)' }}>
          <p className="font-mono text-[11px] tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
            {contato.copyright}
          </p>
          <p className="font-mono text-[11px] tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
            5 SaaS rodando · 6+ terminais paralelos · 1 framework próprio
          </p>
        </div>
      </div>
    </footer>
  );
}
