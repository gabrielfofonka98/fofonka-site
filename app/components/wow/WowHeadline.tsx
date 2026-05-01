'use client';

import { useEffect, useRef } from 'react';

type Props = {
  wordmark: string;
  ariaLabel: string;
};

export function WowHeadline({ wordmark, ariaLabel }: Props) {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Breathing animation já roda via CSS @keyframes wow-breathe-sober.
    // Cursor-blink também via CSS. Motion One não é necessário pra V1.
  }, []);

  return (
    <h1
      ref={headlineRef}
      className="wow-headline font-display text-5xl md:text-6xl font-semibold leading-[0.95] -tracking-[0.02em]"
      aria-label={ariaLabel}
    >
      <span className="block">
        {wordmark}
        <span
          className="wow-cursor inline-block ml-1 font-mono text-[var(--color-mark)]"
          aria-hidden="true"
        >
          ▮
        </span>
      </span>
    </h1>
  );
}
