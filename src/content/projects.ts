// Copy v3 from docs/copy/site-v2-copy.md section 7 (CTS-004)
export type Project = {
  name: string;
  context: string;
  stack: string[];
  diferencial: string;
  status: string;
  live: boolean;
  href?: string;
};

export type MoreProject = {
  name: string;
  body: string;
  href?: string;
};

export const projects = {
  eyebrow: 'Projetos',
  heading: 'O que eu construí.',
  highlight: 'construí',
  items: [
    {
      name: 'Cortex',
      context:
        'Uma empresa de agentes de IA que eu uso pra trabalhar. São 78 agentes organizados em hierarquia, cada um com cargo e limite. Tem também um app de desktop, o Cortex Cockpit, pra acompanhar o que está rodando.',
      stack: ['Claude Code', 'Codex', 'Python', 'Tauri'],
      diferencial:
        'A lógica é a de um time de gente: cada tarefa tem um dono, e quem executa não aprova o próprio trabalho.',
      status: 'Privado · uso diário',
      live: false,
    },
    {
      name: 'Da compra ao acesso',
      context:
        'Fluxo da Academia Lendár[IA] que leva o aluno da compra ao contrato e ao acesso liberado, e revoga o acesso sozinho quando tem reembolso.',
      stack: ['n8n', 'Webhooks', 'Panda Video'],
      diferencial:
        'Ninguém copia dado de um sistema pro outro. Webhooks da Panda sobem aulas no sistema sem humano no loop.',
      status: 'Academia Lendár[IA]',
      live: false,
    },
    {
      name: 'Páginas de venda da Academia Lendár[IA]',
      context:
        'Páginas dos produtos da Academia, cada uma com identidade própria dentro da mesma marca, em versão clara e escura.',
      stack: ['HTML', 'CSS', 'JavaScript', 'Vercel', 'Cloudflare'],
      diferencial:
        'Cada produto tem cara própria pra falar com o seu público. Toda página sobe com LGPD e headers de segurança, conferidos pelo Aurum, um agente meu que já passou 93 domínios pela mesma régua.',
      status: 'No ar',
      live: true,
      href: 'https://www.academialendaria.ai/segundo-cerebro',
    },
    {
      name: 'Ata',
      context:
        'App de Mac que transcreve reunião em português no próprio computador. Sem nuvem e sem bot entrando na call.',
      stack: ['Swift', 'SwiftUI', 'Apple Speech'],
      diferencial:
        'Fiz porque a transcrição em português das ferramentas que eu usava era ruim, e o motor de voz da Apple é bem melhor em pt-BR. Minha voz e a dos outros vêm de canais separados, então o texto já sai dizendo quem falou.',
      status: 'Projeto pessoal · só para Mac',
      live: false,
    },
  ] as Project[],
  more: [
    {
      name: 'Livrar[IA]',
      body: 'Sistema da Academia Lendár[IA] que escolhe os ebooks de cada cliente sem repetir título, inclusive pra quem paga parcelado. Em uso.',
    },
    {
      name: 'Filosofia do Corte',
      body: 'Site da barbearia da qual sou sócio. Quem chega pelo celular já agenda o horário.',
      href: 'https://filosofiadocorte-gamma.vercel.app',
    },
  ] as MoreProject[],
};
