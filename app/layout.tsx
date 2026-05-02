import type { Metadata } from 'next';
import { Fraunces, Bricolage_Grotesque } from 'next/font/google';
import { ScrollProgress } from './components/ScrollProgress';
import { RevealObserver } from './components/RevealObserver';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const THEME = (process.env.NEXT_PUBLIC_THEME ?? 'dark') as 'dark' | 'light';

export const metadata: Metadata = {
  metadataBase: new URL('https://gabrielfofonka.com.br'),
  title: 'Gabriel Fofonka',
  description:
    'Builder solo brasileiro. SaaS, IA aplicada e automação. Cinco produtos em produção e um framework próprio de orquestração de agentes (Cortex).',
  openGraph: {
    title: 'Gabriel Fofonka',
    description:
      'Builder solo brasileiro. SaaS, IA aplicada e automação. Cinco produtos em produção e um framework próprio de orquestração de agentes (Cortex).',
    url: 'https://gabrielfofonka.com.br',
    siteName: 'Gabriel Fofonka',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Gabriel Fofonka — Builder solo brasileiro.' }],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gabriel Fofonka',
    description:
      'Builder solo brasileiro. SaaS, IA aplicada e automação. Cinco produtos em produção e um framework próprio de orquestração de agentes (Cortex).',
    images: ['/og.png'],
  },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme={THEME} className={`${fraunces.variable} ${bricolage.variable}`}>
      <body>
        <ScrollProgress />
        {children}
        <RevealObserver />
        {/* Full-bleed overlays — fixed scanlines + vertical streaks */}
        <div className="fixed inset-0 pointer-events-none crt-scanlines" aria-hidden="true" style={{ zIndex: 60, opacity: 0.5 }} />
        <div className="fixed inset-0 pointer-events-none vertical-streaks" aria-hidden="true" style={{ zIndex: 59 }} />
      </body>
    </html>
  );
}
