// Helpers shared by the direction D sections.
import logoRaw from '../../brand/logo.svg?raw';

/** Splits verbatim copy around one phrase so it can be emphasised without rewriting it. */
export function splitOn(text: string, phrase: string): [string, string, string] {
  const at = text.indexOf(phrase);
  if (at === -1) return [text, '', ''];
  return [text.slice(0, at), phrase, text.slice(at + phrase.length)];
}

export function hostOf(href: string): string {
  return new URL(href).host;
}

/** Brand mark geometry read from the shared logo file, so the CTS-002 swap redraws the constellation. */
export function logoGeometry(): { viewBox: [number, number, number, number]; paths: string[]; dot: { cx: number; cy: number } | null } {
  const vb = /viewBox="([^"]+)"/.exec(logoRaw)?.[1]?.split(/\s+/).map(Number) ?? [0, 0, 120, 120];
  const paths = [...logoRaw.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1] ?? '').filter(Boolean);
  const circle = /<circle[^>]*>/.exec(logoRaw)?.[0] ?? '';
  const cx = /\scx="([\d.]+)"/.exec(circle)?.[1];
  const cy = /\scy="([\d.]+)"/.exec(circle)?.[1];
  return {
    viewBox: [vb[0] ?? 0, vb[1] ?? 0, vb[2] ?? 120, vb[3] ?? 120],
    paths,
    dot: cx && cy ? { cx: Number(cx), cy: Number(cy) } : null,
  };
}
