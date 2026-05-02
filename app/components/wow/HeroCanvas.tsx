'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
};

const COLORS_DARK = ['#E36558', '#4F8A66', '#F0C757'];
const COLORS_LIGHT = ['#C84B3D', '#2D5A3D', '#E6B845'];

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
    const palette = isLight ? COLORS_LIGHT : COLORS_DARK;
    const count = isMobile ? 30 : 70;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      size: Math.random() * 2 + 1,
      color: palette[Math.floor(Math.random() * palette.length)],
      alpha: Math.random() * 0.4 + 0.3,
    }));

    ctx.globalCompositeOperation = isLight ? 'multiply' : 'screen';

    let rafId = 0;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
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
      ctx.globalCompositeOperation = isLight ? 'multiply' : 'screen';
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
      style={{ zIndex: 2 }}
      aria-hidden="true"
    />
  );
}
