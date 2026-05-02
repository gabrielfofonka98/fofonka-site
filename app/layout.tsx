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
    'Builder solo. SaaS, IA aplicada e automação. Atualmente cinco produtos em produção e um framework próprio de orquestração de agentes (Cortex).',
  openGraph: {
    title: 'Gabriel Fofonka',
    description:
      'Builder solo. SaaS, IA aplicada e automação. Atualmente cinco produtos em produção e um framework próprio de orquestração de agentes (Cortex).',
    url: 'https://gabrielfofonka.com.br',
    siteName: 'Gabriel Fofonka',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Gabriel Fofonka — Construo SaaS, ferramentas de IA aplicada e automações.',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gabriel Fofonka',
    description:
      'Builder solo. SaaS, IA aplicada e automação. Atualmente cinco produtos em produção e um framework próprio de orquestração de agentes (Cortex).',
    images: ['/og.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-theme={THEME} className={`${fraunces.variable} ${bricolage.variable}`}>
      <body className={`font-body antialiased`}>
        <ScrollProgress />
        {children}
        <RevealObserver />
        <div className="scanlines" aria-hidden="true" />
      </body>
    </html>
  );
}
