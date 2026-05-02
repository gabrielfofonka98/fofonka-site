// Copy v4 — voltagem profissional/sóbrio (sem brand-flavored)
// Pivot: página profissional pra recrutador/founder/cliente. Sem "Bora?", "builder", "brasileiro" como rótulo.

export const hero = {
  eyebrow: 'PORTFÓLIO · 2026',
  headline: 'Engenharia de *software* com IA aplicada.',
  subheadline:
    'Atuo de ponta a ponta — produto, código e infraestrutura. Construo **SaaS, automações e ferramentas internas** com um time virtual de agentes IA (Cortex, framework próprio).',
  ctaPrimary: { label: 'Conversar', href: 'mailto:gabrielfofonka98@gmail.com' },
  ctaSecondary: { label: 'Como posso ajudar', href: '#ajuda' },
  wordmark: 'Gabriel Fofonka',
};

export const sobre = {
  eyebrow: 'SOBRE',
  paragraphs: [
    'Trabalho com software há alguns anos. Hoje atuo principalmente em SaaS, IA aplicada e automação operacional — frente, fundo, infraestrutura.',
    'Quando alguma camada exige profundidade adicional, recorro a um time de agentes IA com escopos definidos: PM, arquitetura, dev, QA, DevOps. Cada um responsável por uma camada. A orquestração é feita por um framework próprio — o Cortex — que mantenho em uso diário.',
    'Recomendo apenas o que já validei em produção. Toda recomendação tem print, log ou repositório por trás. Sem isso, é especulação.',
  ],
};

export const comoPenso = {
  eyebrow: 'PRINCÍPIOS',
  heading: '*Princípios* que guiam minhas decisões técnicas.',
  principles: [
    {
      title: 'Pragmatismo antes de moda',
      body: 'Antes de adotar qualquer ferramenta nova, testo no contexto real do projeto. Se não resolve um problema concreto, descarto.',
    },
    {
      title: 'Funcional antes de bonito',
      body: 'Prefiro código que roda hoje a código bonito que talvez funcione amanhã. Refino depois, quando o que importa já está em pé.',
    },
    {
      title: 'Reuso antes de criar',
      body: 'Antes de escrever algo novo, verifico se já existe solução pronta no projeto ou no ecossistema. Reuso resolve a maior parte dos problemas.',
    },
    {
      title: 'Produção antes de teoria',
      body: 'Recomendo apenas o que já rodou em produção. Sem isso, é especulação — e especulação não tem espaço em documentação técnica.',
    },
    {
      title: 'Simples antes de complexo',
      body: 'Resolvo o problema da frente antes de inventar abstração para problemas hipotéticos. Otimização prematura quase sempre vira dívida técnica.',
    },
  ],
};

export const comoTrabalho = {
  eyebrow: 'PROCESSO',
  heading: '*Processo* em cinco etapas.',
  steps: [
    {
      title: 'Discovery primeiro',
      body: 'Antes de propor solução, paro para entender o problema com quem está envolvido. Uma pergunta inicial bem feita evita dezenas de retrabalhos depois.',
    },
    {
      title: 'Documentação antes do código',
      body: 'Escrevo justificativa, decisão técnica e especificação em três documentos curtos antes de codar. Suficiente para alinhar stakeholders e referenciar depois.',
    },
    {
      title: 'Construção em paralelo',
      body: 'Múltiplos terminais abertos, cada um focado em uma camada do produto — frontend, backend, IA, infraestrutura — com um agente IA especializado em cada.',
    },
    {
      title: 'Validação em staging',
      body: 'Toda mudança passa por staging antes de produção. Validação com dados e dependências reais — sem ambiente local servindo de proxy.',
    },
    {
      title: 'Review antes de mergear',
      body: 'Antes do merge: testes passando, documentação atualizada, escopo fechado. Trabalho parcial não vai para main.',
    },
  ],
};

export const contato = {
  eyebrow: 'CONTATO',
  heading: 'Vamos *conversar*?',
  channels: [
    { label: 'Email', value: 'gabrielfofonka98@gmail.com', href: 'mailto:gabrielfofonka98@gmail.com', primary: true },
    { label: 'WhatsApp', value: 'Conversar no WhatsApp', href: 'https://wa.me/5551995763576', primary: true },
    { label: 'LinkedIn', value: 'LinkedIn', href: 'https://www.linkedin.com/in/ofofonka/' },
    { label: 'Instagram', value: 'Instagram', href: 'https://www.instagram.com/ofofonka/' },
    { label: 'GitHub', value: 'GitHub', href: 'https://github.com/gabrielfofonka98' },
  ],
  copyright: '© 2026 Gabriel Fofonka',
};
