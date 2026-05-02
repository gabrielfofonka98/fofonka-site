'use client';

import { useEffect, useRef } from 'react';

// Neural connections — constellation field (papel-suave nodes + connecting lines)
type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
};

const CONNECT_DISTANCE = 160;

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 35 : 75;

    // Cor dos nodes: papel-suave creme com glow sutil
    const NODE_RGB = '240, 234, 216';

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const nodes: Node[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      size: 0.6 + Math.random() * 1.6,
      phase: Math.random() * Math.PI * 2,
    }));

    let rafId = 0;
    let t = 0;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // Linhas conectando nodes próximos
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DISTANCE) {
            const opacity = (1 - dist / CONNECT_DISTANCE) * 0.18;
            ctx.strokeStyle = `rgba(${NODE_RGB}, ${opacity.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes com twinkle e glow
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        const twinkle = 0.55 + 0.35 * Math.sin(n.phase + t * 0.0008);

        // Halo glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 4);
        grad.addColorStop(0, `rgba(${NODE_RGB}, ${(twinkle * 0.5).toFixed(3)})`);
        grad.addColorStop(1, `rgba(${NODE_RGB}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core point
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${NODE_RGB}, ${twinkle.toFixed(3)})`;
        ctx.fill();
      }

      t += 16;
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
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
