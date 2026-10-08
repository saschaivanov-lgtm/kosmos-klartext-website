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

const htmlFiles = walk(dist).filter((file) => file.endsWith('.html'));

function targetFor(urlPath) {
  const clean = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  if (clean === '/') return path.join(dist, 'index.html');
  const relative = clean.replace(/^\//, '');
  if (path.extname(relative)) return path.join(dist, relative);
  return path.join(dist, relative, 'index.html');
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    const target = targetFor(url);
    if (!fs.existsSync(target)) errors.push(`${path.relative(dist, file)} → ${url}`);
  }
}

if (errors.length) {
  console.error(`Interne Linkprüfung fehlgeschlagen (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Interne Linkprüfung erfolgreich: ${htmlFiles.length} HTML-Seiten.`);
