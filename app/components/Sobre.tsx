import { sobre } from '@/content/copy';

export function Sobre() {
  return (
    <section
      id="sobre"
      className="grid-bg section-darker container-editorial section-y"
      aria-labelledby="sobre-heading"
    >
      <p className="reveal eyebrow-pill">{sobre.eyebrow}</p>
      <h2 id="sobre-heading" className="sr-only">Sobre</h2>
      <div className="glass-card reveal mt-8 md:mt-10 max-w-[44rem]" style={{ ['--reveal-delay' as string]: '120ms' }}>
        <div className="space-y-5 md:space-y-6 font-body text-lg md:text-xl leading-relaxed">
          {sobre.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
