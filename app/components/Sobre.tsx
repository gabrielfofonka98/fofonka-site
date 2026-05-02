import { sobre } from '@/content/copy';

export function Sobre() {
  return (
    <section
      id="sobre"
      className="grid-bg container-editorial section-y"
      aria-labelledby="sobre-heading"
    >
      <p className="reveal eyebrow">[ {sobre.eyebrow.toUpperCase()} ]</p>
      <h2 id="sobre-heading" className="sr-only">Sobre</h2>
      <div className="mt-8 md:mt-10 max-w-[40rem] space-y-5 md:space-y-6 font-body text-lg md:text-xl leading-relaxed">
        {sobre.paragraphs.map((p, i) => (
          <p
            key={i}
            className="reveal"
            style={{ ['--reveal-delay' as string]: `${i * 120}ms` }}
          >
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
