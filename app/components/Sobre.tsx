import { sobre } from '@/content/copy';

export function Sobre() {
  return (
    <section
      id="sobre"
      className="container-editorial section-y border-t border-[var(--color-border)]"
      aria-labelledby="sobre-heading"
    >
      <p className="eyebrow">{sobre.eyebrow}</p>
      <h2 id="sobre-heading" className="sr-only">
        Sobre
      </h2>
      <div className="mt-8 md:mt-10 max-w-editorial space-y-5 md:space-y-6 font-body text-lg md:text-xl text-[var(--color-text)] leading-relaxed">
        {sobre.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
