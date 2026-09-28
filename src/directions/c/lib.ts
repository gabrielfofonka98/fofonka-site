// Helpers shared by the direction C sections.

/** Splits verbatim copy around one phrase so it can be highlighted without rewriting it. */
export function splitOn(text: string, phrase: string): [string, string, string] {
  const at = text.indexOf(phrase);
  if (at === -1) return [text, '', ''];
  return [text.slice(0, at), phrase, text.slice(at + phrase.length)];
}

/** Deterministic tilt per index so the notebook feels hand-placed but never jumps between builds. */
export function tilt(index: number, amplitude = 2): string {
  const pattern = [-1, 0.7, -0.4, 1, -0.8, 0.5, -0.6, 0.9, -1, 0.3];
  const value = pattern[index % pattern.length] ?? 0;
  return `${(value * amplitude).toFixed(2)}deg`;
}

const TINTS = ['yellow', 'pink', 'teal'] as const;
export type Tint = (typeof TINTS)[number];

export function tint(index: number): Tint {
  return TINTS[index % TINTS.length] ?? 'yellow';
}

export function hostOf(href: string): string {
  return new URL(href).host;
}
