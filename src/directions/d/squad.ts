// The squad under the sky. Log lines are fragments of the approved copy in
// src/content/copy.ts (comoTrabalho, comoPenso) and docs/copy/site-v2-copy.md;
// nothing here is a claim the content modules do not already make. Positions are
// in the hero chart's 700x620 space; `step` maps each agent to the process step
// it owns (the last step has one owner, so @devops closes the chain after @qa).
export type Agent = { id: string; tag: string; x: number; y: number; step: number; lines: string[] };

export const squad: Agent[] = [
  { id: 'pm', tag: '@pm', x: 118, y: 108, step: 0, lines: ['entender onde trava', 'quem faz o quê', '→ @architect'] },
  { id: 'architect', tag: '@architect', x: 572, y: 96, step: 1, lines: ['o combinado vai pro papel', 'o que fica de fora', '→ @dev'] },
  { id: 'dev', tag: '@dev', x: 632, y: 330, step: 2, lines: ['pedaço por pedaço', 'código que roda hoje', '→ @qa'] },
  { id: 'qa', tag: '@qa', x: 482, y: 548, step: 3, lines: ['revisão de outro agente', 'quem executa não aprova', '→ @devops'] },
  { id: 'devops', tag: '@devops', x: 104, y: 486, step: 4, lines: ['só vai pro ar o que está fechado', 'trabalho parcial não vai pro main', '→ main'] },
];
