'use client';

import { useEffect, useState } from 'react';

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#como-penso', label: 'Princípios' },
  { href: '#como-trabalho', label: 'Processo' },
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
    <nav aria-label="Navegação principal" className={`nav-fofonka ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-q4 flex items-center justify-between h-16">
        <a href="#hero" aria-label="Gabriel Fofonka — home" className="inline-flex items-center">
          <img src="/svg/logo.svg" alt="" width={128} height={40} className="h-7 md:h-8 w-auto" />
        </a>
        <ul className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors duration-150 hover:text-[var(--color-text)]">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="mailto:gabrielfofonka98@gmail.com"
              className="cta-primary py-2 px-4 text-[11px]"
            >
              Bora trocar uma ideia
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
