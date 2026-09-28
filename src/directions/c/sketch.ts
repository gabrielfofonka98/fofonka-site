// Direction C motion: hand-drawn rough.js marks that draw on as they enter the
// viewport, highlighter swipes and note drops. IntersectionObserver only, no
// scroll listeners; transform, opacity and stroke-dashoffset only.
// Without JS every piece of content is already visible; with reduced motion
// the sketches render fully drawn and nothing moves.
import rough from 'roughjs';

type RoughSVG = ReturnType<typeof rough.svg>;
type Options = Parameters<RoughSVG['path']>[1];

const root = document.documentElement;
const animated = root.classList.contains('c-motion');
const NS = 'http://www.w3.org/2000/svg';
const COLORS = {
  ink: '#16171b',
  pink: '#ff6fae',
  teal: '#10a99c',
  hl: '#ffd84a',
} as const;
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
  const base: Options = { stroke, strokeWidth: Number(svg.getAttribute('data-width') ?? 2.2), roughness: 1.4, seed: seed(svg) };
  const nodes: Element[] = [];
  if (kind === 'underline') {
    const y = h - 5;
    nodes.push(rc.path(`M 2 ${y} C ${w * 0.3} ${y - 5}, ${w * 0.62} ${y + 4}, ${w - 2} ${y - 3}`, { ...base, roughness: 2 }));
  } else if (kind === 'box') {
    nodes.push(rc.rectangle(3, 3, w - 6, h - 6, base));
  } else if (kind === 'ellipse') {
    nodes.push(rc.ellipse(w / 2, h / 2, w - 4, h - 4, { ...base, roughness: 1.8 }));
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
    const opts: Options = { stroke: COLORS.ink, strokeWidth: 2.2, roughness: 1.3, seed: 11 + i };
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

/** Hero: the napkin sketch of Gabriel wired to the squad. Fixed 700x620 viewBox. */
function renderHero(svg: SVGSVGElement, animate: boolean): void {
  clear(svg);
  const rc = rough.svg(svg);
  let order = 0;
  const add = (node: SVGGElement, delay = order++ * 160, duration = 700): void => {
    svg.appendChild(node);
    if (animate) drawIn([node], 300 + delay, duration);
  };
  const label = (x: number, y: number, text: string, o: { size?: number; weight?: number; fill?: string; rot?: number; delay?: number } = {}): void => {
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('x', String(x));
    t.setAttribute('y', String(y));
    t.setAttribute('fill', o.fill ?? COLORS.ink);
    t.setAttribute('font-size', String(o.size ?? 22));
    t.setAttribute('font-weight', String(o.weight ?? 700));
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('transform', `rotate(${o.rot ?? 0} ${x} ${y})`);
    t.textContent = text;
    svg.appendChild(t);
    if (animate) {
      t.style.opacity = '0';
      t.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: 600 + (o.delay ?? order * 160), easing: EASE_OUT, fill: 'forwards' });
    }
  };
  const ink = COLORS.ink;
  const cx = 350, cy = 300;
  add(rc.circle(cx, cy, 128, { stroke: ink, strokeWidth: 2.6, roughness: 1.6, fill: COLORS.hl, fillStyle: 'hachure', hachureGap: 7, fillWeight: 2, seed: 3 }), 0, 900);
  add(rc.circle(cx - 22, cy - 10, 22, { stroke: ink, strokeWidth: 2.4, fill: '#fff', fillStyle: 'solid', seed: 4 }), 200);
  add(rc.circle(cx + 22, cy - 10, 22, { stroke: ink, strokeWidth: 2.4, fill: '#fff', fillStyle: 'solid', seed: 5 }), 260);
  add(rc.circle(cx - 20, cy - 8, 6, { stroke: ink, fill: ink, fillStyle: 'solid', seed: 6 }), 300);
  add(rc.circle(cx + 24, cy - 8, 6, { stroke: ink, fill: ink, fillStyle: 'solid', seed: 7 }), 320);
  add(rc.path(`M ${cx - 22} ${cy + 20} Q ${cx} ${cy + 42} ${cx + 24} ${cy + 18}`, { stroke: ink, strokeWidth: 2.6, seed: 8 }), 380);
  add(rc.path(`M ${cx - 14} ${cy - 66} L ${cx - 20} ${cy - 92} M ${cx} ${cy - 66} L ${cx + 2} ${cy - 96} M ${cx + 16} ${cy - 64} L ${cx + 26} ${cy - 90}`, { stroke: ink, strokeWidth: 2.4, seed: 9 }), 420);
  label(cx, cy + 102, 'eu', { size: 26, rot: -4, delay: 500 });

  const squad = [
    { id: '@pm', note: 'entender onde trava', x: 108, y: 110, c: COLORS.pink, r: -5 },
    { id: '@architect', note: 'o combinado vai pro papel', x: 575, y: 106, c: COLORS.teal, r: 4 },
    { id: '@dev', note: 'pedaço por pedaço', x: 624, y: 330, c: COLORS.pink, r: -3 },
    { id: '@qa', note: 'revisão de outro agente', x: 480, y: 530, c: COLORS.teal, r: 3 },
    { id: '@devops', note: 'o que está fechado', x: 128, y: 470, c: COLORS.pink, r: -4 },
  ];
  order = 6;
  squad.forEach((s, i) => {
    const w = s.id.length * 15 + 34, h = 54;
    const dx = s.x - cx, dy = s.y - cy, d = Math.hypot(dx, dy);
    const sx = cx + (dx / d) * 80, sy = cy + (dy / d) * 80;
    const ex = s.x - (dx / d) * (w * 0.5 + 8), ey = s.y - (dy / d) * (h * 0.5 + 10);
    const bend = (i % 2 ? 1 : -1) * 40;
    const mx = (sx + ex) / 2 - (dy / d) * bend, my = (sy + ey) / 2 + (dx / d) * bend;
    const opts: Options = { stroke: ink, strokeWidth: 2, roughness: 1.2, seed: 20 + i };
    add(rc.path(`M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`, opts), order++ * 170, 600);
    add(arrowHead(rc, ex, ey, mx, my, { ...opts, strokeWidth: 2.2 }), order * 170, 250);
    add(rc.rectangle(s.x - w / 2, s.y - h / 2, w, h, { stroke: ink, strokeWidth: 2.4, roughness: 1.4, fill: s.c, fillStyle: 'solid', seed: 30 + i }), order * 170 + 120, 500);
    label(s.x, s.y + 8, s.id, { size: 24, rot: s.r, delay: order * 170 + 200 });
    // Notes sit on the side away from Gabriel so the connector never crosses them.
    const noteY = s.y < cy ? s.y - h / 2 - 14 : s.y + h / 2 + 30;
    label(s.x, noteY, s.note, { size: 17, weight: 500, fill: '#4a4d57', rot: s.r * 0.6, delay: order * 170 + 260 });
  });
  order += 2;
  add(rc.path('M 238 48 C 300 34, 390 38, 470 48', { stroke: COLORS.pink, strokeWidth: 3, roughness: 2, seed: 40 }), order * 170, 500);
  label(352, 34, 'cada um com cargo e limite', { size: 19, weight: 600, rot: -1.5, delay: order * 170 });
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
