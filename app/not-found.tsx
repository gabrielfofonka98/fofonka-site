import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container-editorial min-h-screen flex flex-col justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 font-display text-5xl md:text-6xl font-semibold leading-[0.95] -tracking-[0.02em]">
        Pera aí.
      </h1>
      <p className="mt-6 max-w-2xl font-body text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed">
        Esse endereço não existe (ou existia e saiu do ar). Volta pra home — tudo
        que importa está lá.
      </p>
      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-body text-base md:text-lg text-[var(--color-text)] underline decoration-[var(--color-mark)] decoration-2 underline-offset-[6px] hover:decoration-[3px]"
        >
          Voltar pra home <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
