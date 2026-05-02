'use client';

import { useEffect } from 'react';

export function RevealObserver() {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>('.reveal');
    if (reveals.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    );

    reveals.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
