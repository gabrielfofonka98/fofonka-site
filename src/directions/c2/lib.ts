// Helpers shared by the direction C2 sections.

/** Splits verbatim copy around one phrase so it can be highlighted without rewriting it. */
export function splitOn(text: string, phrase: string): [string, string, string] {
  const at = text.indexOf(phrase);
  if (at === -1) return [text, '', ''];
  return [text.slice(0, at), phrase, text.slice(at + phrase.length)];
}

/** Deterministic tilt per index so papers feel hand-placed but never jump between builds. */
export function tilt(index: number, amplitude = 1): string {
  const pattern = [-1, 0.7, -0.4, 1, -0.8, 0.5, -0.6, 0.9, -1, 0.3];
  const value = pattern[index % pattern.length] ?? 0;
  return `${(value * amplitude).toFixed(2)}deg`;
}

export function hostOf(href: string): string {
  return new URL(href).host;
}
