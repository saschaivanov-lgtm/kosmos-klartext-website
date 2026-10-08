import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const errors = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function count(html, pattern) {
  return [...html.matchAll(pattern)].length;
}

for (const file of walk(dist).filter((item) => item.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  const name = path.relative(dist, file);
  if (!/<html\s+lang="de"/.test(html)) errors.push(`${name}: Seitensprache fehlt`);
  if (count(html, /<h1(?:\s|>)/g) !== 1) errors.push(`${name}: genau eine H1 erwartet`);
  if (!/<a[^>]+class="skip-link"[^>]+href="#main-content"/.test(html)) errors.push(`${name}: Sprunglink fehlt`);
  if (!/<main[^>]+id="main-content"/.test(html)) errors.push(`${name}: Hauptbereich fehlt`);
  if (/tabindex="[1-9]/.test(html)) errors.push(`${name}: positiver tabindex ist unzulässig`);
  const headingLevels = [...html.matchAll(/<h([1-6])(?:\s|>)/g)].map((match) => Number(match[1]));
  for (let index = 1; index < headingLevels.length; index += 1) {
    if (headingLevels[index] > headingLevels[index - 1] + 1) {
      errors.push(`${name}: Überschriftenebene springt von H${headingLevels[index - 1]} zu H${headingLevels[index]}`);
    }
  }
  for (const image of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]*"/.test(image[0])) errors.push(`${name}: Bild ohne alt-Attribut`);
  }
  if (!/<img[^>]+class="brand-logo"[^>]+alt=""/.test(html)) errors.push(`${name}: Header-Markenbild ist nicht dekorativ stumm`);
  if (!/<img[^>]+class="footer-brand-asset"[^>]+alt=""/.test(html)) errors.push(`${name}: Footer-Markenbild ist nicht dekorativ stumm`);
}

function luminance(hex) {
  const values = hex.match(/[0-9a-f]{2}/gi).map((value) => Number.parseInt(value, 16) / 255);
  const linear = values.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function ratio(a, b) {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}

const colorPairs = [
  ['Lesetext', '102237', 'f7f4ed'],
  ['Sekundärtext', '4a5a6a', 'f7f4ed'],
  ['Dunkelmodus', 'ffffff', '07121f'],
  ['Akzentlink', '176f68', 'f7f4ed'],
  ['Fokus dunkel', 'ffcf57', '07121f']
];

for (const [label, foreground, background] of colorPairs) {
  const value = ratio(foreground, background);
  if (value < 4.5) errors.push(`${label}: Kontrast ${value.toFixed(2)}:1 liegt unter 4.5:1`);
}

if (errors.length) {
  console.error(`Statische A11y-Prüfung fehlgeschlagen (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Statische A11y-Prüfung erfolgreich: Sprache, Landmarken, H1, Überschriftenfolge, Sprunglinks, Alt-Texte/dekorative Markenbilder und ${colorPairs.length} zentrale Farbpaare.`);
