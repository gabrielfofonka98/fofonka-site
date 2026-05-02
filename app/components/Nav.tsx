'use client';

import { useEffect, useState } from 'react';

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#como-penso', label: 'Como penso' },
  { href: '#como-trabalho', label: 'Como trabalho' },
  { href: '#skills', label: 'Skills' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      aria-label="Navegação principal"
      className={`nav-fofonka ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="container-editorial flex items-center justify-between py-4 md:py-5">
        <a
          href="#hero"
          className="font-display text-xl md:text-2xl font-semibold tracking-tight"
          style={{ color: 'var(--color-text)' }}
        >
          fofonka
          <span style={{ color: 'var(--color-mark)' }}>.</span>
        </a>
        <ul
          className="hidden md:flex items-center gap-7 lg:gap-9 font-mono text-xs uppercase tracking-wider"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors duration-150 hover:text-[var(--color-text)]"
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
