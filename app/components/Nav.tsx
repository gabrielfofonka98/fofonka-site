const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#como-penso', label: 'Como penso' },
  { href: '#como-trabalho', label: 'Como trabalho' },
  { href: '#skills', label: 'Skills' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
];

export function Nav() {
  return (
    <nav
      aria-label="Navegação principal"
      className="sticky top-0 z-40 backdrop-blur-sm bg-[color:var(--color-bg)]/85 border-b border-[var(--color-border)]"
    >
      <div className="container-editorial flex items-center justify-between py-4 md:py-5">
        <a
          href="#hero"
          className="font-display text-xl md:text-2xl font-semibold tracking-tight text-[var(--color-text)]"
        >
          fofonka
          <span className="text-[var(--color-mark)]">.</span>
        </a>
        <ul className="hidden md:flex items-center gap-7 lg:gap-9 font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-[var(--color-text)] transition-colors duration-150"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
