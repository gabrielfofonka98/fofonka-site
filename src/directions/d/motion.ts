// Direction D runtime: reveals, crisp draw-on strokes, the hero squad's live
// logs, the process constellation path, active nav window and the mobile menu.
// IntersectionObserver and ResizeObserver only (no scroll listeners); transform,
// opacity and stroke-dashoffset only. Without JS every piece of content is
// already visible; with reduced motion everything is drawn and nothing types.
const NS = 'http://www.w3.org/2000/svg';
const root = document.documentElement;
const animated = root.classList.contains('d-motion');

function revealAll(): void {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!animated || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      io.unobserve(entry.target);
      entry.target.classList.add('is-in');
      if (entry.target instanceof HTMLElement && entry.target.hasAttribute('data-step')) revealStep(Number(entry.target.dataset.step));
    }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.18 });
  targets.forEach((el) => io.observe(el));
}

/** Star points sampled along the brand mark, so the logo reads as a constellation. */
function logoStars(chart: HTMLElement): void {
  const group = chart.querySelector<SVGGElement>('[data-logo-constellation]');
  if (!group) return;
  group.querySelectorAll<SVGPathElement>('path').forEach((path, p) => {
    const len = path.getTotalLength();
    const n = len > 60 ? 7 : 3;
    for (let i = 0; i < n; i++) {
      const pt = path.getPointAtLength((i / (n - 1)) * len);
      const star = document.createElementNS(NS, 'circle');
      star.setAttribute('cx', pt.x.toFixed(2));
      star.setAttribute('cy', pt.y.toFixed(2));
      star.setAttribute('r', '2.6');
      star.setAttribute('class', 'chart__pt');
      star.setAttribute('fill', '#fff1c9');
      group.appendChild(star);
      if (animated) {
        star.style.opacity = '0';
        star.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: 350 + p * 300 + i * 150, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'forwards' });
      }
    }
  });
}

function heroChart(): void {
  const chart = document.querySelector<HTMLElement>('[data-chart]');
  if (!chart) return;
  logoStars(chart);
  chart.classList.add('is-in');
  if (!animated) return;

  const nodes = [...chart.querySelectorAll<HTMLElement>('[data-agent]')];
  const state = nodes.map((node) => ({
    node,
    id: node.dataset.agent ?? '',
    line: node.querySelector<HTMLElement>('.node__line'),
    lines: JSON.parse(node.dataset.lines ?? '[]') as string[],
    cursor: 1,
  }));
  let active = 0;
  let visible = true;
  let timer: number | undefined;

  const type = (el: HTMLElement, text: string): void => {
    let i = 0;
    const next = (): void => {
      i += 1;
      el.textContent = text.slice(0, i);
      if (i < text.length) window.setTimeout(next, 16 + Math.random() * 22);
    };
    next();
  };

  const step = (): void => {
    if (!visible || document.hidden) return;
    const current = state[active];
    if (!current?.line) return;
    state.forEach((s, n) => {
      const live = n === active;
      s.node.classList.toggle('is-live', live);
      chart.querySelector(`[data-star="${s.id}"]`)?.classList.toggle('is-live', live);
      chart.querySelector(`[data-link="${s.id}"]`)?.classList.toggle('is-live', live);
    });
    const index = current.cursor % current.lines.length;
    current.cursor += 1;
    type(current.line, `$ ${current.lines[index] ?? ''}`);
    if (index === current.lines.length - 1) active = (active + 1) % state.length;
  };

  const start = (): void => { if (timer === undefined) timer = window.setInterval(step, 1300); };
  const stop = (): void => { if (timer !== undefined) { window.clearInterval(timer); timer = undefined; } };
  new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting);
    if (visible) start(); else stop();
  }).observe(chart);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else if (visible) start(); });
  window.setTimeout(start, 2400);
}

// ---- process flow: a constellation path from each step into the next ----------

const revealed = new Set<number>();

function buildFlow(): void {
  const svg = document.querySelector<SVGSVGElement>('[data-flow-svg]');
  const host = svg?.parentElement;
  if (!svg || !host) return;
  while (svg.firstChild) svg.firstChild.remove();
  const origin = svg.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${Math.max(1, Math.round(origin.width))} ${Math.max(1, Math.round(origin.height))}`);
  const steps = [...host.querySelectorAll<HTMLElement>('[data-step]')];
  const stacked = getComputedStyle(host).getPropertyValue('--flow-stacked').trim() === '1';
  steps.forEach((stepEl, i) => {
    const next = steps[i + 1];
    if (!next) return;
    const a = stepEl.getBoundingClientRect();
    const b = next.getBoundingClientRect();
    let sx: number, sy: number, ex: number, ey: number, mx: number, my: number;
    if (stacked) {
      sx = a.left - origin.left + 34; sy = a.bottom - origin.top + 6;
      ex = b.left - origin.left + 34; ey = b.top - origin.top - 6;
      mx = sx + 26; my = (sy + ey) / 2;
    } else {
      const right = b.left > a.left;
      sx = (right ? a.right - 48 : a.left + 48) - origin.left; sy = a.bottom - origin.top + 6;
      ex = (right ? b.left + 56 : b.right - 56) - origin.left; ey = b.top - origin.top - 6;
      const dx = ex - sx, dy = ey - sy;
      const bend = right ? -0.2 : 0.2;
      mx = (sx + ex) / 2 - dy * bend; my = (sy + ey) / 2 + dx * bend;
    }
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('data-for', String(i + 1));
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('d', `M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`);
    path.setAttribute('pathLength', '1');
    path.setAttribute('class', 'draw');
    path.style.setProperty('--dur', '1000ms');
    g.appendChild(path);
    for (const [x, y] of [[sx, sy], [ex, ey]] as const) {
      const dot = document.createElementNS(NS, 'circle');
      dot.setAttribute('cx', x.toFixed(1));
      dot.setAttribute('cy', y.toFixed(1));
      dot.setAttribute('r', '3');
      g.appendChild(dot);
    }
    if (!animated || revealed.has(i + 1)) g.classList.add('is-in');
    svg.appendChild(g);
  });
}

function revealStep(index: number): void {
  if (index === 0 || revealed.has(index)) return;
  revealed.add(index);
  document.querySelector(`[data-flow-svg] g[data-for="${index}"]`)?.classList.add('is-in');
}

// ---- nav: the tmux window follows the section in view --------------------------

function activeWindow(): void {
  const links = new Map<string, HTMLAnchorElement>();
  document.querySelectorAll<HTMLAnchorElement>('[data-nav]').forEach((a) => links.set(a.dataset.nav ?? '', a));
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach((a, id) => {
        if (id === entry.target.id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach((s) => io.observe(s));
}

function mobileMenu(): void {
  document.querySelectorAll<HTMLDetailsElement>('.nav__menu').forEach((menu) => {
    menu.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) menu.open = false;
    });
    menu.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.open) {
        menu.open = false;
        menu.querySelector('summary')?.focus();
      }
    });
  });
}

function boot(): void {
  heroChart();
  buildFlow();
  revealAll();
  activeWindow();
  mobileMenu();

  const flow = document.querySelector<HTMLElement>('[data-flow]');
  if (flow) {
    let width = flow.clientWidth;
    let pending = 0;
    new ResizeObserver(() => {
      if (flow.clientWidth === width) return;
      width = flow.clientWidth;
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(buildFlow);
    }).observe(flow);
  }
  root.setAttribute('data-motion-ready', '');
}

document.fonts.ready.then(boot, boot);
