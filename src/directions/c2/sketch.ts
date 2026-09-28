// Direction C2 motion: technical-pen rough.js marks that draw on as they enter
// the viewport, highlighter swipes and papers settling in. IntersectionObserver
// only, no scroll listeners; transform, opacity and stroke-dashoffset only.
// Without JS every piece of content is already visible; with reduced motion
// the sketches render fully drawn and nothing moves.
import rough from 'roughjs';
import logoRaw from '../../brand/logo.svg?raw';

type RoughSVG = ReturnType<typeof rough.svg>;
type Options = Parameters<RoughSVG['path']>[1];

const root = document.documentElement;
const animated = root.classList.contains('c-motion');
const NS = 'http://www.w3.org/2000/svg';
const COLORS = {
  ink: '#15171c',
  anno: '#2346c8',
  graphite: '#6b707a',
  hl: '#f3cb55',
} as const;
const HAND = "'Shantell Sans Variable', 'Segoe Print', cursive";
const DISPLAY = "'Onest Variable', system-ui, sans-serif";
const EASE_DRAW = 'cubic-bezier(0.77, 0, 0.175, 1)';
const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';

type ColorName = keyof typeof COLORS;
const isColorName = (value: string): value is ColorName => value in COLORS;

function color(el: Element, fallback: ColorName = 'ink'): string {
  const name = el.getAttribute('data-color') ?? fallback;
  return isColorName(name) ? COLORS[name] : COLORS.ink;
}

function seed(el: Element): number {
  return Number(el.getAttribute('data-seed') ?? 7);
}

function clear(svg: SVGSVGElement): void {
  while (svg.firstChild) svg.firstChild.remove();
}

/** Stroke paths draw along their length; filled shapes fade in. */
function drawIn(nodes: Element[], delay = 0, duration = 700): void {
  if (!animated) return;
  let order = 0;
  for (const node of nodes) {
    const paths = node.tagName === 'path' ? [node as SVGPathElement] : [...node.querySelectorAll('path')];
    for (const path of paths) {
      const stroke = path.getAttribute('stroke');
      const at = delay + order * 60;
      if (stroke && stroke !== 'none') {
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
        path.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
          duration,
          delay: at,
          easing: EASE_DRAW,
          fill: 'forwards',
        });
      } else {
        path.style.opacity = '0';
        path.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: at, easing: EASE_OUT, fill: 'forwards' });
      }
    }
    order++;
  }
}

function size(svg: SVGSVGElement): { w: number; h: number } {
  const box = svg.getBoundingClientRect();
  const w = Math.max(1, Math.round(box.width));
  const h = Math.max(1, Math.round(box.height));
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  return { w, h };
}

function arrowHead(rc: RoughSVG, ex: number, ey: number, fromX: number, fromY: number, opts: Options): SVGGElement {
  const ang = Math.atan2(ey - fromY, ex - fromX);
  const a1 = [ex - 14 * Math.cos(ang - 0.45), ey - 14 * Math.sin(ang - 0.45)];
  const a2 = [ex - 14 * Math.cos(ang + 0.45), ey - 14 * Math.sin(ang + 0.45)];
  return rc.path(`M ${a1[0]} ${a1[1]} L ${ex} ${ey} L ${a2[0]} ${a2[1]}`, opts);
}

/** Simple sketches sized to their container: underline, box, ellipse, arrow, circle. */
function renderShape(svg: SVGSVGElement, animate: boolean): void {
  clear(svg);
  const rc = rough.svg(svg);
  const { w, h } = size(svg);
  const kind = svg.getAttribute('data-rough');
  const stroke = color(svg);
  const base: Options = { stroke, strokeWidth: Number(svg.getAttribute('data-width') ?? 1.8), roughness: 1, seed: seed(svg) };
  const nodes: Element[] = [];
  if (kind === 'underline') {
    const y = h - 5;
    nodes.push(rc.path(`M 2 ${y} C ${w * 0.3} ${y - 2}, ${w * 0.62} ${y + 2}, ${w - 2} ${y - 1}`, { ...base, roughness: 1.1 }));
  } else if (kind === 'box') {
    const fill = svg.getAttribute('data-fill');
    nodes.push(rc.rectangle(3, 3, w - 6, h - 6, fill ? { ...base, fill, fillStyle: 'solid' } : base));
  } else if (kind === 'ellipse') {
    nodes.push(rc.ellipse(w / 2, h / 2, w - 4, h - 4, { ...base, roughness: 1.2 }));
  } else if (kind === 'bracket') {
    // A tall left bracket plus a short tick at each end: an annotation grouping mark.
    nodes.push(rc.path(`M 16 3 L 3 3 L 3 ${h - 3} L 16 ${h - 3}`, { ...base, roughness: 0.9 }));
  } else if (kind === 'arrow') {
    const [fx, fy] = (svg.getAttribute('data-from') ?? '0,0').split(',').map(Number) as [number, number];
    const [tx, ty] = (svg.getAttribute('data-to') ?? '1,1').split(',').map(Number) as [number, number];
    const bend = Number(svg.getAttribute('data-bend') ?? 0.2);
    const sx = fx * w, sy = fy * h, ex = tx * w, ey = ty * h;
    const dx = ex - sx, dy = ey - sy;
    const mx = (sx + ex) / 2 - dy * bend, my = (sy + ey) / 2 + dx * bend;
    nodes.push(rc.path(`M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`, base));
    nodes.push(arrowHead(rc, ex, ey, mx, my, base));
  }
  nodes.forEach((n) => svg.appendChild(n));
  if (animate) drawIn(nodes, Number(svg.getAttribute('data-delay') ?? 0));
}

/** Process flow: an arrow from each step into the next, grouped per target step. */
function renderFlow(svg: SVGSVGElement, revealed: Set<number>, animateStep: number | null): void {
  clear(svg);
  const rc = rough.svg(svg);
  size(svg);
  const host = svg.parentElement;
  if (!host) return;
  const origin = svg.getBoundingClientRect();
  const steps = [...host.querySelectorAll<HTMLElement>('[data-step]')];
  const stacked = getComputedStyle(host).getPropertyValue('--flow-stacked').trim() === '1';
  steps.forEach((step, i) => {
    const next = steps[i + 1];
    if (!next) return;
    const a = step.getBoundingClientRect();
    const b = next.getBoundingClientRect();
    let sx: number, sy: number, ex: number, ey: number;
    if (stacked) {
      sx = a.left - origin.left + 26; sy = a.bottom - origin.top + 4;
      ex = b.left - origin.left + 26; ey = b.top - origin.top - 6;
    } else {
      const goingRight = b.left > a.left;
      sx = (goingRight ? a.right - 40 : a.left + 40) - origin.left; sy = a.bottom - origin.top + 6;
      ex = (goingRight ? b.left + 50 : b.right - 50) - origin.left; ey = b.top - origin.top + 26;
    }
    const dx = ex - sx, dy = ey - sy;
    const bend = stacked ? 0.28 : (b.left > a.left ? -0.22 : 0.22);
    const mx = (sx + ex) / 2 - dy * bend, my = (sy + ey) / 2 + dx * bend;
    const opts: Options = { stroke: COLORS.ink, strokeWidth: 1.8, roughness: 1, seed: 11 + i };
    const g = document.createElementNS(NS, 'g');
    const target = i + 1;
    g.setAttribute('data-for', String(target));
    const line = rc.path(`M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`, opts);
    const head = arrowHead(rc, ex, ey, mx, my, opts);
    g.append(line, head);
    if (!revealed.has(target)) g.style.opacity = '0';
    svg.appendChild(g);
    if (animateStep === target) drawIn([line, head], 0, 800);
  });
}

/** Reads the brand mark (paths + accent dot) from the shared logo SVG, so the CTS-002 swap redraws the node. */
function logoParts(): { paths: string[]; dot: { cx: number; cy: number; r: number } | null } {
  const doc = new DOMParser().parseFromString(logoRaw, 'image/svg+xml');
  const paths = [...doc.querySelectorAll('path')].map((p) => p.getAttribute('d') ?? '').filter(Boolean);
  const circle = doc.querySelector('circle');
  const dot = circle
    ? { cx: Number(circle.getAttribute('cx')), cy: Number(circle.getAttribute('cy')), r: Number(circle.getAttribute('r')) }
    : null;
  return { paths, dot };
}

/** Hero: a technical working sketch of Gabriel wired to the squad. Fixed 700x620 viewBox. */
function renderHero(svg: SVGSVGElement, animate: boolean): void {
  clear(svg);
  const rc = rough.svg(svg);
  let order = 0;
  const add = (node: SVGElement, delay = order++ * 150, duration = 750): void => {
    svg.appendChild(node);
    if (animate) drawIn([node], 300 + delay, duration);
  };
  type LabelOptions = { size?: number; weight?: number; fill?: string; family?: string; delay?: number };
  const label = (x: number, y: number, text: string, o: LabelOptions = {}): void => {
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('x', String(x));
    t.setAttribute('y', String(y));
    t.setAttribute('fill', o.fill ?? COLORS.ink);
    t.setAttribute('font-size', String(o.size ?? 19));
    t.setAttribute('font-weight', String(o.weight ?? 700));
    t.setAttribute('font-family', o.family ?? DISPLAY);
    t.setAttribute('text-anchor', 'middle');
    t.textContent = text;
    svg.appendChild(t);
    if (animate) {
      t.style.opacity = '0';
      t.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: 600 + (o.delay ?? order * 150), easing: EASE_OUT, fill: 'forwards' });
    }
  };
  const ink = COLORS.ink;
  const cx = 350, cy = 300, radius = 78;

  // Construction orbit (dashed, graphite), then the node itself.
  const orbit = document.createElementNS(NS, 'circle');
  orbit.setAttribute('cx', String(cx));
  orbit.setAttribute('cy', String(cy));
  orbit.setAttribute('r', '128');
  orbit.setAttribute('fill', 'none');
  orbit.setAttribute('stroke', COLORS.graphite);
  orbit.setAttribute('stroke-width', '1');
  orbit.setAttribute('stroke-dasharray', '3 7');
  orbit.setAttribute('opacity', '0.55');
  svg.appendChild(orbit);
  if (animate) orbit.animate([{ opacity: 0 }, { opacity: 0.55 }], { duration: 900, delay: 200, easing: EASE_OUT, fill: 'backwards' });

  add(rc.circle(cx, cy, radius * 2, { stroke: ink, strokeWidth: 1.8, roughness: 0.9, fill: '#ffffff', fillStyle: 'solid', seed: 3 }), 0, 900);
  // Centre ticks: the node is placed like a point on a drawing.
  add(rc.path(`M ${cx - radius - 14} ${cy} L ${cx - radius - 4} ${cy} M ${cx + radius + 4} ${cy} L ${cx + radius + 14} ${cy} M ${cx} ${cy - radius - 14} L ${cx} ${cy - radius - 4} M ${cx} ${cy + radius + 4} L ${cx} ${cy + radius + 14}`, { stroke: COLORS.graphite, strokeWidth: 1.2, roughness: 0.4, seed: 5 }), 120, 400);

  const { paths, dot } = logoParts();
  const scale = 0.72;
  const mark = document.createElementNS(NS, 'g');
  mark.setAttribute('transform', `translate(${cx - 60 * scale} ${cy - 60 * scale}) scale(${scale})`);
  svg.appendChild(mark);
  paths.forEach((d, i) => {
    const node = rc.path(d, { stroke: ink, strokeWidth: 13, roughness: 0.6, seed: 6 + i });
    mark.appendChild(node);
    if (animate) drawIn([node], 500 + i * 220, 700);
  });
  if (dot) {
    const node = rc.circle(dot.cx, dot.cy, dot.r * 2, { stroke: COLORS.anno, strokeWidth: 2, roughness: 0.6, fill: COLORS.anno, fillStyle: 'solid', seed: 9 });
    mark.appendChild(node);
    if (animate) drawIn([node], 1000, 400);
  }
  label(cx, cy + radius + 40, 'Gabriel', { size: 20, delay: 700 });

  const squad = [
    { id: '@pm', note: 'entender onde trava', x: 110, y: 120 },
    { id: '@architect', note: 'o combinado vai pro papel', x: 578, y: 116 },
    { id: '@dev', note: 'pedaço por pedaço', x: 616, y: 330 },
    { id: '@qa', note: 'revisão de outro agente', x: 486, y: 520 },
    { id: '@devops', note: 'o que está fechado', x: 124, y: 470 },
  ];
  order = 6;
  squad.forEach((s, i) => {
    const w = s.id.length * 12.5 + 40, h = 46;
    const dx = s.x - cx, dy = s.y - cy, d = Math.hypot(dx, dy);
    const sx = cx + (dx / d) * (radius + 8), sy = cy + (dy / d) * (radius + 8);
    const ex = s.x - (dx / d) * (w * 0.5 + 6), ey = s.y - (dy / d) * (h * 0.5 + 8);
    const bend = (i % 2 ? 1 : -1) * 22;
    const mx = (sx + ex) / 2 - (dy / d) * bend, my = (sy + ey) / 2 + (dx / d) * bend;
    const opts: Options = { stroke: ink, strokeWidth: 1.5, roughness: 0.8, seed: 20 + i };
    add(rc.path(`M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`, opts), order++ * 160, 650);
    add(arrowHead(rc, ex, ey, mx, my, opts), order * 160, 250);
    add(rc.rectangle(s.x - w / 2, s.y - h / 2, w, h, { stroke: ink, strokeWidth: 1.6, roughness: 0.7, fill: '#ffffff', fillStyle: 'solid', seed: 30 + i }), order * 160 + 100, 550);
    label(s.x, s.y + 7, s.id, { size: 19, delay: order * 160 + 200 });
    // Notes sit on the side away from Gabriel so the connector never crosses them.
    const noteY = s.y < cy ? s.y - h / 2 - 12 : s.y + h / 2 + 26;
    label(s.x, noteY, s.note, { size: 16, weight: 500, fill: COLORS.anno, family: HAND, delay: order * 160 + 260 });
  });

  // Annotation on top and a dimension line under the whole squad.
  order += 2;
  add(rc.path('M 228 52 C 300 48, 400 50, 472 52', { stroke: COLORS.anno, strokeWidth: 1.8, roughness: 0.9, seed: 40 }), order * 160, 500);
  label(350, 38, 'cada um com cargo e limite', { size: 18, weight: 500, fill: COLORS.anno, family: HAND, delay: order * 160 });
  add(rc.path('M 70 598 L 290 598 M 410 598 L 630 598 M 70 588 L 70 608 M 630 588 L 630 608', { stroke: COLORS.graphite, strokeWidth: 1.2, roughness: 0.4, seed: 41 }), order * 160 + 200, 700);
  label(350, 604, 'Cortex', { size: 16, weight: 500, fill: COLORS.graphite, family: HAND, delay: order * 160 + 300 });
}

// ---- wiring -------------------------------------------------------------

const drawn = new WeakSet<Element>();
const flowRevealed = new Map<SVGSVGElement, Set<number>>();

function render(svg: SVGSVGElement, animate: boolean): void {
  const kind = svg.getAttribute('data-rough');
  if (kind === 'hero') renderHero(svg, animate);
  else if (kind === 'flow') renderFlow(svg, flowRevealed.get(svg) ?? new Set(), null);
  else renderShape(svg, animate);
}

function revealStep(step: HTMLElement): void {
  const flow = step.closest('[data-flow]')?.querySelector<SVGSVGElement>('svg[data-rough="flow"]');
  const index = Number(step.getAttribute('data-step'));
  if (!flow || index === 0) return;
  const set = flowRevealed.get(flow) ?? new Set<number>();
  if (set.has(index)) return;
  set.add(index);
  flowRevealed.set(flow, set);
  const group = flow.querySelector<SVGGElement>(`g[data-for="${index}"]`);
  if (!group) return;
  group.style.opacity = '1';
  drawIn([...group.children], 0, 800);
}

function reveal(el: Element): void {
  el.classList.add('is-in');
  if (el instanceof SVGSVGElement && el.hasAttribute('data-rough')) {
    if (drawn.has(el)) return;
    drawn.add(el);
    render(el, animated);
    return;
  }
  if (el instanceof HTMLElement && el.hasAttribute('data-step')) revealStep(el);
  el.querySelectorAll<SVGSVGElement>(':scope svg[data-rough][data-with-parent]').forEach((svg) => {
    if (drawn.has(svg)) return;
    drawn.add(svg);
    render(svg, animated);
  });
}

function boot(): void {
  const targets = [...document.querySelectorAll('[data-reveal], svg[data-rough]:not([data-with-parent])')];
  // Flow arrows exist before their steps are reached so they can draw one by one.
  document.querySelectorAll<SVGSVGElement>('svg[data-rough="flow"]').forEach((svg) => {
    flowRevealed.set(svg, new Set());
    drawn.add(svg);
    renderFlow(svg, animated ? new Set() : new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]), null);
  });

  if (!animated || !('IntersectionObserver' in window)) {
    targets.forEach((el) => {
      el.classList.add('is-in');
      if (el instanceof SVGSVGElement && !drawn.has(el)) { drawn.add(el); render(el, false); }
      el.querySelectorAll<SVGSVGElement>('svg[data-rough][data-with-parent]').forEach((svg) => render(svg, false));
    });
  } else {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        reveal(entry.target);
      }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.2 });
    targets.forEach((el) => io.observe(el));
  }

  // Re-measure on resize without replaying the animation.
  let pending = 0;
  let lastWidth = document.body.clientWidth;
  const ro = new ResizeObserver(() => {
    const width = document.body.clientWidth;
    if (width === lastWidth) return;
    lastWidth = width;
    cancelAnimationFrame(pending);
    pending = requestAnimationFrame(() => {
      document.querySelectorAll<SVGSVGElement>('svg[data-rough]').forEach((svg) => {
        if (!drawn.has(svg) || svg.getAttribute('data-rough') === 'hero') return;
        render(svg, false);
      });
    });
  });
  ro.observe(document.body);
  root.setAttribute('data-motion-ready', '');
}

document.fonts.ready.then(boot, boot);
