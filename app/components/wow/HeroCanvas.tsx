'use client';

import { useEffect, useRef } from 'react';

// Particle rain (Q4-style) — vertical drift downward, terracota in dark / mata in light
type Drop = { x: number; y: number; speed: number; size: number; alpha: number; color: string };

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const isLight = document.documentElement.dataset.theme === 'light';

    // Palette: 60% terracota signature + 30% mata + 10% marker
    const COLORS = isLight
      ? ['#C84B3D', '#C84B3D', '#C84B3D', '#2D5A3D', '#2D5A3D', '#E6B845']
      : ['#E36558', '#E36558', '#E36558', '#4F8A66', '#4F8A66', '#F0C757'];

    const count = isMobile ? 60 : 140;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const drops: Drop[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      speed: 0.15 + Math.random() * 0.45,
      size: 0.6 + Math.random() * 1.6,
      alpha: 0.35 + Math.random() * 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    let rafId = 0;

    const tick = () => {
      // Trail effect — fade clear instead of full clear
      ctx.fillStyle = isLight ? 'rgba(244,236,221,0.10)' : 'rgba(14,19,16,0.12)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = isLight ? 'multiply' : 'screen';

      for (const d of drops) {
        d.y += d.speed;
        if (d.y > h + 4) {
          d.y = -4;
          d.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.globalAlpha = d.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      if (!reduced) rafId = requestAnimationFrame(tick);
    };

    tick();

    const onResize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.85, mixBlendMode: 'screen', zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
