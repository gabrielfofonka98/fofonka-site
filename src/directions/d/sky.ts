// Direction D sky: one fixed canvas behind the whole page (from direction A).
// Stars sit on a planisphere that turns slowly with time and with page progress;
// on fine pointers the field shifts with depth. The hero constellation lives in
// crisp SVG, not here. Budget: <= 1600 stars desktop, <= 460 mobile, DPR capped
// at 1.75 (1.5 mobile), loop only while the tab is visible. Reduced motion: no
// intro, twinkle, rotation or parallax; repaint only when the page moved.

interface Star {
  a: number;
  d: number;
  z: number;
  r: number;
  tw: number;
  gold: boolean;
}

export function initSky(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  let W = 0;
  let H = 0;
  let mobile = false;
  const stars: Star[] = [];
  const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  let start = performance.now();
  let raf = 0;
  let lastScroll = -1;
  let dirty = true;

  function build(): void {
    W = innerWidth;
    H = innerHeight;
    mobile = W < 860;
    const dpr = Math.min(devicePixelRatio || 1, mobile ? 1.5 : 1.75);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars.length = 0;
    const count = Math.round(Math.min(mobile ? 460 : 1600, (W * H) / (mobile ? 720 : 660)));
    const reach = Math.hypot(W, H) * 1.25;
    for (let i = 0; i < count; i++) {
      stars.push({
        a: Math.random() * Math.PI * 2,
        d: Math.sqrt(Math.random()) * reach,
        z: Math.random() * 0.9 + 0.1,
        r: Math.random() ** 3 * 1.5 + 0.3,
        tw: Math.random() * Math.PI * 2,
        gold: Math.random() < 0.09,
      });
    }
    dirty = true;
  }

  function frame(now: number): void {
    raf = 0;
    const t = reduce ? 1e7 : now - start;
    const scroll = window.scrollY;
    if (reduce && !dirty && scroll === lastScroll) return;
    lastScroll = scroll;
    dirty = false;

    const docH = Math.max(1, document.documentElement.scrollHeight - H);
    const progress = Math.min(1, scroll / docH);
    if (fine && !reduce) {
      mouse.sx += (mouse.x - mouse.sx) * 0.06;
      mouse.sy += (mouse.y - mouse.sy) * 0.06;
    }

    const c = ctx!;
    c.globalAlpha = 1;
    const gy = H * (0.35 - progress * 0.2);
    const g = c.createRadialGradient(W * 0.72, gy, 0, W * 0.72, gy, Math.max(W, H) * 1.05);
    g.addColorStop(0, '#0e1a3d');
    g.addColorStop(0.55, '#070c1f');
    g.addColorStop(1, '#04060e');
    c.fillStyle = g;
    c.fillRect(0, 0, W, H);

    const intro = reduce ? 1 : Math.min(1, t / 2200);
    const ease = 1 - Math.pow(1 - intro, 4);
    const turn = reduce ? 0 : progress * 0.9 + t * 0.0000045;
    const poleX = W * 0.86;
    const poleY = -H * 0.35;
    for (const s of stars) {
      const ang = s.a + turn * (0.6 + s.z * 0.4);
      const zoom = 1 + (1 - ease) * 1.8 * s.z;
      const px = poleX + Math.cos(ang) * s.d * zoom - mouse.sx * 26 * s.z;
      const py = poleY + Math.sin(ang) * s.d * zoom - mouse.sy * 20 * s.z;
      if (px < -4 || py < -4 || px > W + 4 || py > H + 4) continue;
      const tw = reduce ? 0.8 : 0.55 + 0.45 * Math.sin(s.tw + t * 0.0016 * (1 + s.z));
      const r = s.r * (0.6 + s.z);
      c.globalAlpha = tw * (0.35 + s.z * 0.65) * ease;
      c.fillStyle = s.gold ? '#f7d27a' : '#dfe7ff';
      if (r < 0.9) {
        c.fillRect(px - r, py - r, r * 2, r * 2);
      } else {
        c.beginPath();
        c.arc(px, py, r, 0, Math.PI * 2);
        c.fill();
      }
    }
    if (!reduce && !document.hidden) raf = requestAnimationFrame(frame);
  }

  function kick(): void {
    if (!raf && !document.hidden) raf = requestAnimationFrame(frame);
  }

  if (fine && !reduce) {
    addEventListener('pointermove', (e) => {
      mouse.x = e.clientX / W - 0.5;
      mouse.y = e.clientY / H - 0.5;
    }, { passive: true });
  }
  new ResizeObserver(() => {
    if (innerWidth === W && Math.abs(innerHeight - H) < 120) return;
    build();
    kick();
  }).observe(document.documentElement);
  document.addEventListener('visibilitychange', kick);

  if (reduce) {
    // No loop: repaint only when sections move through the viewport.
    const io = new IntersectionObserver(() => {
      dirty = true;
      kick();
    }, { threshold: Array.from({ length: 11 }, (_, i) => i / 10) });
    document.querySelectorAll('main section').forEach((s) => io.observe(s));
  }

  build();
  start = performance.now();
  kick();
}
