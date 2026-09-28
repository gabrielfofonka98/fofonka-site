// Copy v3 (personal brand), applied verbatim from docs/copy/site-v2-copy.md (CTS-004, approved 2026-09-26)

// Headline test from the copy doc: A = demonstration, B = promise. Each headline has its own subheadline.
const headlineVariants = {
  a: {
    headline: 'A reunião termina e as tarefas já estão distribuídas.',
    highlight: 'já estão distribuídas',
    subheadline:
      'É o que eu faço com IA: tirar a operação do manual. Hoje faço isso como Head de Operações da Academia Lendár[IA].',
  },
  b: {
    headline: 'Uso IA pra tirar a operação do manual.',
    highlight: 'tirar a operação do manual',
    subheadline:
      'A reunião termina e as tarefas já estão distribuídas, com responsável e prazo. Hoje faço isso como Head de Operações da Academia Lendár[IA].',
  },
} as const;

const activeHeadline = headlineVariants.a;

export const hero = {
  greeting: 'E aí! Gabriel Fofonka aqui.',
  headline: activeHeadline.headline,
  highlight: activeHeadline.highlight,
  subheadline: activeHeadline.subheadline,
  proofLine: '78 agentes de IA no Cortex · mais de 2 mil tarefas varridas ao assumir Operações',
  ctaPrimary: { label: 'Bora trocar uma ideia', href: 'mailto:gabrielfofonka98@gmail.com' },
  ctaSecondary: { label: 'Me acompanha no LinkedIn', href: 'https://www.linkedin.com/in/ofofonka/' },
  wordmark: 'Gabriel Fofonka',
};

export const sobre = {
  eyebrow: 'Sobre',
  highlight: 'Sou mais de fazer do que de falar.',
  paragraphs: [
    'Comecei a trabalhar aos 15 anos, fazendo sites. Nunca fiz faculdade e nunca fui programador de verdade. Tudo que sei de tecnologia aprendi fazendo, e boa parte só fui entender a fundo depois da IA.',
    'Entrei no suporte do Grupo Neolife e cheguei a gerente de atendimento. Em paralelo, cofundei o Tchê Encontrei, um portal de anúncios para pequenos negócios do Rio Grande do Sul, onde fiquei de 2019 a 2025.',
    'Na Academia Lendár[IA], passei pelo back office e pelo time de automação e dados até chegar a Head de Operações. Hoje lidero os líderes das áreas que fazem a empresa rodar.',
    'Sou mais de fazer do que de falar. Gaúcho de Gravataí, morando em Floripa e sócio de uma barbearia em Esteio. Pode me chamar de Fofonka.',
  ],
};

export const comoPenso = {
  eyebrow: 'Como penso',
  heading: 'O que aprendi fazendo.',
  highlight: 'fazendo',
  principles: [
    {
      title: 'Cada coisa tem um dono',
      body: 'Quando todo mundo pode fazer tudo, ninguém é responsável por nada. Vale pra time de gente e vale pro Cortex, onde cada agente tem um cargo e um limite, e o trabalho de um passa pela revisão de outro.',
    },
    {
      title: 'Se repete, vira automação',
      body: 'Se alguém faz a mesma tarefa na mão toda semana, ela é trabalho pra máquina. A pessoa volta pro que precisa de julgamento.',
    },
    {
      title: 'Decisão fica por escrito',
      body: 'Quem decide o quê e como se cobra não pode depender da memória de ninguém. Na Academia Lendár[IA], isso virou um Guia de Operações escrito pro time inteiro.',
    },
    {
      title: 'Código que roda hoje',
      body: 'Prefiro código que roda hoje a código bonito que talvez funcione amanhã. Refino depois, com o que importa já de pé.',
    },
    {
      title: 'Número só com fonte',
      body: 'Se eu não consigo mostrar de onde veio um número, ele não entra. Neste site também vale: nada aqui é meta apresentada como resultado.',
    },
  ],
};

export const comoTrabalho = {
  eyebrow: 'Como trabalho',
  heading: 'Como eu toco um projeto.',
  highlight: 'toco um projeto',
  steps: [
    {
      title: 'Primeiro, entender onde trava',
      body: 'Começo olhando a operação do jeito que ela está hoje: quem faz o quê e onde as coisas param. Quando assumi Operações, varri mais de 2 mil tarefas abertas pra decidir o que realmente importava.',
    },
    {
      title: 'O combinado vai pro papel',
      body: 'Com o problema claro, escrevo o que vai ser feito e o que fica de fora. Quem vai usar lê e aprova, e só depois eu construo.',
    },
    {
      title: 'Entrega em pedaços que funcionam',
      body: 'Construo com os agentes do Cortex e vou mostrando o que já funciona, pedaço por pedaço. Ninguém precisa esperar o fim pra ver a coisa andando.',
    },
    {
      title: 'Só vai pro ar o que está fechado',
      body: 'Cada entrega passa pela revisão de outro agente e pela minha. Trabalho parcial não vai pro main.',
    },
  ],
};

export const contato = {
  eyebrow: 'Contato',
  heading: 'Bora trocar uma ideia?',
  highlight: 'ideia',
  intro:
    'Se você está tentando tirar alguma coisa do manual e travou no meio do caminho, me chama. Gosto de trocar ideia sobre operação e IA.',
  channels: [
    { label: 'Email', value: 'gabrielfofonka98@gmail.com', href: 'mailto:gabrielfofonka98@gmail.com', primary: true },
    { label: 'LinkedIn', value: 'LinkedIn', href: 'https://www.linkedin.com/in/ofofonka/', primary: true },
    { label: 'WhatsApp', value: 'WhatsApp', href: 'https://wa.me/5551995763576' },
    { label: 'Instagram', value: 'Instagram', href: 'https://www.instagram.com/ofofonka/' },
    { label: 'GitHub', value: 'GitHub', href: 'https://github.com/gabrielfofonka98' },
  ],
  copyright: '© 2026 Gabriel Fofonka',
};
