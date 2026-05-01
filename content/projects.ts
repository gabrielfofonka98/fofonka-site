export type Project = {
  name: string;
  context: string;
  stack: string[];
  diferencial: string;
  status: string;
  href?: string;
};

export const projects = {
  eyebrow: 'Projetos',
  heading: 'Sistemas em produção e cases relevantes.',
  items: [
    {
      name: 'Cortex Framework',
      context:
        'Framework de orquestração multi-agente IA com processo PRD → ADR → Spec → Dev → QA → DevOps forçado.',
      stack: ['Claude Code SDK', 'Python', 'hooks', 'shell scripts'],
      diferencial:
        'Squad completo com persona, escopo e hierarquia por agente. Cada um com prompt, voz e regras comportamentais próprias.',
      status: 'Privado · em uso pessoal',
    },
    {
      name: 'Lendário LMS',
      context:
        'LMS de produto principal — vendas de cursos, alunos, gamificação, certificados.',
      stack: [
        'Next.js',
        'Supabase (Edge Functions · RLS · Storage)',
        'Vercel',
        'n8n',
        'Panda Video',
      ],
      diferencial:
        'Multi-produto rodando paralelo. Webhooks da Panda sobem aulas no sistema sem humano no loop.',
      status: 'Em produção',
      href: 'https://app.vidalendaria.com.br',
    },
    {
      name: 'DatAI',
      context:
        'Plataforma de analytics multi-setor — campanhas, attribution, performance de ads.',
      stack: ['Next.js', 'Supabase', 'BigQuery', 'prompts configuráveis por setor'],
      diferencial:
        'Analytics multi-setor com prompts granulares por análise. Cada setor tem prompt específico.',
      status: 'Em produção · caso privado',
    },
    {
      name: 'Guilda HR',
      context:
        'Plataforma RH interna — pesquisa de clima, 1:1, OKR, DISC, gamificação.',
      stack: ['Next.js', 'Supabase'],
      diferencial:
        'Construído como referência a Feedz/Sólides, com foco em times PJ. Pivot consciente: cortei o módulo de contratação por estar fora do escopo de uso real.',
      status: 'Caso privado',
    },
    {
      name: 'Academia Lendária',
      context:
        'Site institucional + templates de email com design system consistente.',
      stack: ['Next.js', 'Resend', 'Design System próprio'],
      diferencial:
        'Templates com identidade visual consistente, calibrados como referência interna de email transacional.',
      status: 'Em produção',
      href: 'https://academialendaria.ai',
    },
  ] as Project[],
};
