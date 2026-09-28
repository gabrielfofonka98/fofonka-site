export {};

const root = document.documentElement;
const controls = [...document.querySelectorAll<HTMLButtonElement>('[data-d-theme-choice]')];
const switcher = document.querySelector<HTMLElement>('[data-d-theme-switch]');
const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

function setTheme(theme: 'dark' | 'light', persist: boolean): void {
  root.dataset.dTheme = theme;
  meta?.setAttribute('content', theme === 'light' ? '#e9e5dc' : '#11130f');
  controls.forEach((control) => {
    control.setAttribute('aria-pressed', String(control.dataset.dThemeChoice === theme));
  });
  if (persist) {
    try { localStorage.setItem('fofonka-d-theme', theme); } catch (_) { /* Storage is optional. */ }
  }
}

if (switcher && controls.length === 2) {
  setTheme(root.dataset.dTheme === 'light' ? 'light' : 'dark', false);
  switcher.hidden = false;
  controls.forEach((control) => {
    control.addEventListener('click', () => {
      setTheme(control.dataset.dThemeChoice === 'light' ? 'light' : 'dark', true);
    });
  });
}
