// Áreas / Serviços v5 — foco em capacidades vendíveis (não em produtos da empresa)

export type Area = {
  title: string;
  description: string;
  stack: string[];
};

export const projects = {
  eyebrow: 'COMO POSSO AJUDAR',
  heading: 'Áreas em que *atuo* e onde posso entregar valor.',
  items: [
    {
      title: 'SaaS de ponta a ponta',
      description:
        'Produto, frontend, backend e infraestrutura. Stack moderna pronta para produção, com staging-first e revisão antes de merge. Entrega de MVP a sistemas em produção com usuários reais.',
      stack: [
        'Next.js',
        'React',
        'TypeScript',
        'Supabase (RLS · Edge Functions · Storage)',
        'Vercel',
        'Cloudflare',
      ],
    },
    {
      title: 'IA aplicada e multi-agente',
      description:
        'Integração com LLMs (Claude, GPT) e arquitetura multi-agente para casos onde uma chamada simples não resolve. Framework próprio de orquestração disponível: o Cortex.',
      stack: [
        'Claude Code SDK',
        'OpenAI API',
        'Multi-agent orchestration',
        'Cortex (framework próprio)',
        'Prompt engineering por contexto',
      ],
    },
    {
      title: 'Automação operacional',
      description:
        'Workflows que removem dependência humana de tarefas operacionais — webhooks, integrações entre serviços, processos repetitivos. Reduzo tarefas manuais a zero.',
      stack: [
        'n8n',
        'Webhook integration',
        'ClickUp API',
        'Resend',
        'Supabase Edge Functions',
      ],
    },
    {
      title: 'Auditoria de segurança',
      description:
        'Revisão pré-produção: RLS Supabase, CORS, headers, OWASP Top 10, exposição de credenciais. Validação com requests reais — não só leitura de código.',
      stack: [
        'RLS audit',
        'OWASP Top 10',
        'Security headers',
        'Supply chain',
        'PoC ativo de findings',
      ],
    },
    {
      title: 'Arquitetura e processo de produto',
      description:
        'PRD → ADR → Spec → Dev → QA → DevOps. Forço documentação curta antes de código para alinhar stakeholders e economizar retrabalho. Útil para times pequenos que querem operar com rigor sem virar burocracia.',
      stack: [
        'PRD writing',
        'ADR drafting',
        'Spec for autonomous development',
        'CTS (cortex task system)',
      ],
    },
  ] as Area[],
};
