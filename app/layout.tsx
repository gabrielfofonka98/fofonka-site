import type { Metadata } from 'next';
import { Fraunces, Bricolage_Grotesque } from 'next/font/google';
import { ScrollProgress } from './components/ScrollProgress';
import { RevealObserver } from './components/RevealObserver';
import './globals.css';

const siteUrl = 'https://gabrielfofonka.com.br';
const siteTitle = 'Gabriel Fofonka';
const siteDescription =
  'Engenharia de software com IA aplicada — SaaS, automações e ferramentas internas. Atuação de ponta a ponta com um framework próprio de orquestração de agentes (Cortex).';

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

const THEME = (process.env.NEXT_PUBLIC_THEME ?? 'dark') as 'dark' | 'light' | 'moss';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'technology',
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Gabriel Fofonka — Engenheiro de software, IA aplicada e automação.' }],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og.png'],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Gabriel Fofonka',
      url: siteUrl,
      image: `${siteUrl}/og.png`,
      jobTitle: 'Software Engineer',
      knowsAbout: [
        'Software engineering',
        'Applied AI',
        'SaaS',
        'Automation',
        'Cloudflare',
        'Next.js',
        'Supabase',
      ],
      sameAs: [
        'https://www.linkedin.com/in/ofofonka/',
        'https://www.instagram.com/ofofonka/',
        'https://github.com/gabrielfofonka98',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteTitle,
      description: siteDescription,
      inLanguage: 'pt-BR',
      publisher: { '@id': `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme={THEME} className={`${fraunces.variable} ${bricolage.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <ScrollProgress />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
