// Copy v3 (Faísca pós-pivot sóbrio) — extraído de docs/design/personal-page-copy.md

export const hero = {
  eyebrow: '[ BUILDER · 2026 ]',
  headline: 'E aí! Gabriel Fofonka aqui.',
  subheadline:
    'Construo SaaS, ferramentas de IA aplicada e automações. Tenho cinco produtos em produção e um framework próprio de orquestração de agentes IA.',
  ctaPrimary: { label: 'Bora trocar uma ideia', href: 'mailto:gabrielfofonka98@gmail.com' },
  ctaSecondary: { label: 'Newsletter', href: '#contato' },
  wordmark: 'Gabriel Fofonka',
};

export const sobre = {
  eyebrow: 'Sobre',
  paragraphs: [
    'Trabalho com software faz uns anos, hoje com foco em SaaS, IA aplicada e automação. Rodo cinco produtos em paralelo e mantenho um framework próprio de orquestração de agentes — o Cortex — que uso todo dia.',
    'Opero como builder solo: cuido de produto, código e infraestrutura. Quando alguma camada precisa de mais cabeça do que mão, encosto num squad de agentes IA com escopos definidos — PM, arquitetura, dev, QA, DevOps. Cada um cuida de uma camada.',
    'Só recomendo o que já rodou em produção. Toda recomendação tem print, log ou repositório por trás. Sem isso, é só especulação.',
  ],
};

export const comoPenso = {
  eyebrow: 'Como penso',
  heading: 'Princípios que guiam minhas decisões técnicas.',
  principles: [
    {
      title: 'Pragmatismo antes de moda',
      body: 'Antes de adotar qualquer ferramenta nova, testo no contexto real do projeto. Se não resolve um problema concreto, descarto sem cerimônia.',
    },
    {
      title: 'Funcional antes de bonito',
      body: 'Prefiro código que roda hoje a código bonito que talvez funcione amanhã. Refino depois, quando o que importa já está em pé.',
    },
    {
      title: 'Reuso antes de criar',
      body: 'Antes de escrever algo novo, verifico se já existe solução pronta no projeto ou no ecossistema. Reuso resolve boa parte dos problemas.',
    },
    {
      title: 'Produção antes de teoria',
      body: 'Só recomendo o que já rodou em produção. Sem isso, é especulação — e especulação não tem espaço em documentação técnica.',
    },
    {
      title: 'Simples antes de complexo',
      body: 'Resolvo o problema da frente antes de inventar abstração pra problemas hipotéticos. Otimização prematura quase sempre vira dívida técnica.',
    },
  ],
};

export const comoTrabalho = {
  eyebrow: 'Como trabalho',
  heading: 'Processo em cinco etapas.',
  steps: [
    {
      title: 'Discovery primeiro',
      body: 'Antes de propor solução, paro pra entender o problema com quem está envolvido. Uma pergunta inicial bem feita evita dezenas de retrabalhos depois.',
    },
    {
      title: 'Documentação antes do código',
      body: 'Escrevo a justificativa, a decisão técnica e a especificação em três documentos curtos antes de codar. Suficiente pra alinhar com stakeholders e referenciar depois.',
    },
    {
      title: 'Construção em paralelo',
      body: 'Trabalho com múltiplos terminais abertos, cada um focado numa camada do produto — frontend, backend, IA, infraestrutura — com um agente IA especializado em cada.',
    },
    {
      title: 'Validação em staging',
      body: 'Toda mudança passa por staging antes de produção. Verifico com dados e dependências reais — sem ambiente local servindo de proxy pro que está no ar.',
    },
    {
      title: 'Review antes de mergear',
      body: 'Antes do merge: testes passando, documentação atualizada, escopo fechado. Trabalho parcial não vai pro main.',
    },
  ],
};

export const contato = {
  eyebrow: 'Contato',
  heading: 'Bora trocar uma ideia?',
  channels: [
    { label: 'Email', value: 'gabrielfofonka98@gmail.com', href: 'mailto:gabrielfofonka98@gmail.com', primary: true },
    { label: 'WhatsApp', value: 'Conversar no WhatsApp', href: 'https://wa.me/5551995763576', primary: true },
    { label: 'LinkedIn', value: 'LinkedIn', href: 'https://www.linkedin.com/in/ofofonka/' },
    { label: 'Instagram', value: 'Instagram', href: 'https://www.instagram.com/ofofonka/' },
    { label: 'GitHub', value: 'GitHub', href: 'https://github.com/gabrielfofonka98' },
  ],
  copyright: '© 2026 Gabriel Fofonka',
};
