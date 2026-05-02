import { comoTrabalho } from '@/content/copy';

function renderHeading(text: string) {
  return text.split(/(\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i} className="font-italic">{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

const cliProcess = [
  { text: '$ fofonka new-project --discovery', cls: 'mark', d: 0 },
  { text: '  → entendendo o problema...', cls: 'muted', d: 1 },
  { text: '  ✓ pergunta inicial confirmada', cls: 'success', d: 2 },
  { text: ' ', cls: 'sep', d: 3 },
  { text: '$ fofonka spec', cls: 'mark', d: 4 },
  { text: '  → escrevendo PRD → ADR → SPEC...', cls: 'muted', d: 5 },
  { text: '  ✓ 3 documentos curtos prontos', cls: 'success', d: 6 },
  { text: ' ', cls: 'sep', d: 7 },
  { text: '$ fofonka build --parallel', cls: 'mark', d: 8 },
  { text: '  → 6 terminais ativos', cls: 'muted', d: 9 },
  { text: '  → frontend · backend · IA · infra', cls: 'muted', d: 10 },
  { text: '  ✓ camadas em paralelo', cls: 'success', d: 11 },
  { text: ' ', cls: 'sep', d: 12 },
  { text: '$ fofonka deploy --staging', cls: 'mark', d: 13 },
  { text: '  → testando com dados reais...', cls: 'muted', d: 14 },
  { text: '  ✓ staging validado', cls: 'success', d: 15 },
  { text: ' ', cls: 'sep', d: 16 },
  { text: '$ fofonka review && merge', cls: 'mark', d: 17 },
  { text: '  → escopo fechado · testes ok', cls: 'muted', d: 18 },
  { text: '  ✓ pronto pra produção', cls: 'success', d: 19, cursor: true },
];

export function ComoTrabalho() {
  return (
    <section
      id="como-trabalho"
      className="relative overflow-hidden grid-bg section-paper"
      style={{ borderTop: '1px solid rgba(24,24,24,0.10)', borderBottom: '1px solid rgba(24,24,24,0.10)' }}
      aria-labelledby="como-trabalho-heading"
    >
      <div className="container-q4 section-y">
        <p className="reveal eyebrow-pill">{comoTrabalho.eyebrow}</p>
        <h2
          id="como-trabalho-heading"
          className="reveal mt-4 max-w-2xl font-display font-medium leading-snug -tracking-[0.01em]"
          style={{ ['--reveal-delay' as string]: '120ms', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
        >
          {renderHeading(comoTrabalho.heading)}
        </h2>
        <p className="reveal mt-4 max-w-xl font-body text-base md:text-lg leading-relaxed" style={{ ['--reveal-delay' as string]: '240ms', color: 'var(--color-text-muted)' }}>
          Discovery, spec, build, staging, review. Sem pular etapa.
        </p>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,520px)] gap-10 items-start">
          {/* Etapas */}
          <ol className="space-y-8 md:space-y-10 max-w-xl">
            {comoTrabalho.steps.map((step, i) => (
              <li
                key={step.title}
                className="reveal grid grid-cols-[3rem_1fr] gap-x-4 md:gap-x-6"
                style={{ ['--reveal-delay' as string]: `${(i + 2) * 100}ms` }}
              >
                <span aria-hidden="true" className="font-mono text-sm pt-1" style={{ color: 'var(--color-mark)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight">{step.title}</h3>
                  <p className="mt-2 font-body text-base md:text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Terminal CLI animado */}
          <div
            className="reveal sticky top-24 rounded-md overflow-hidden backdrop-blur-md"
            style={{
              ['--reveal-delay' as string]: '300ms',
              border: '1px solid var(--color-iron)',
              background: 'color-mix(in oklab, var(--color-bg) 92%, transparent)',
              boxShadow: '0 0 60px var(--color-mark-soft)',
            }}
          >
            <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: '1px solid var(--color-iron)', background: 'color-mix(in oklab, var(--color-bg-2) 80%, transparent)' }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FFBD2E' }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28C840' }} />
              <span className="flex-1 text-center font-mono text-[10px] tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                fofonka — workflow.sh
              </span>
            </div>
            <div className="px-4 py-4 font-mono text-[12px] leading-[1.7] space-y-1 max-h-[480px] overflow-hidden">
              {cliProcess.map((line, i) => {
                const color =
                  line.cls === 'mark' ? 'var(--color-mark)' :
                  line.cls === 'success' ? 'var(--color-success)' :
                  line.cls === 'muted' ? 'var(--color-text-muted)' :
                  line.cls === 'dim' ? 'var(--color-text-dim)' :
                  'var(--color-text-muted)';
                return (
                  <div
                    key={i}
                    className="cli-line"
                    style={{ ['--cli-d' as string]: line.d, color, whiteSpace: 'pre' }}
                  >
                    {line.text === ' ' ? '\u00a0' : line.text}
                    {line.cursor && <span className="cli-cursor"> ▊</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
