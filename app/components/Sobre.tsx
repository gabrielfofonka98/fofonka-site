import { sobre } from '@/content/copy';

export function Sobre() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)' }}
      aria-labelledby="sobre-heading"
    >
      <div className="container-q4 section-y">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-12 lg:gap-20 items-start">
          <div>
            <p className="reveal eyebrow-pill">{sobre.eyebrow}</p>
            <h2 id="sobre-heading" className="reveal mt-6 font-display font-medium leading-tight -tracking-[0.02em]" style={{ ['--reveal-delay' as string]: '120ms', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Builder solo<br/>
              <em className="font-italic" style={{ color: 'var(--color-mark)' }}>brasileiro.</em>
            </h2>
          </div>

          <div className="reveal space-y-6 font-body text-lg md:text-xl leading-relaxed" style={{ ['--reveal-delay' as string]: '240ms' }}>
            {sobre.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-mark-glow), transparent)' }} />
    </section>
  );
}
