import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import YAML from 'yaml';

const root = path.resolve(import.meta.dirname, '..');
const errors = [];
const records = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function readRecord(file) {
  const raw = fs.readFileSync(file, 'utf8');
  if (file.endsWith('.md')) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) throw new Error('Frontmatter fehlt');
    return YAML.parse(match[1]);
  }
  return YAML.parse(raw);
}

const dataFiles = [
  ...walk(path.join(root, 'src', 'content')),
  ...walk(path.join(root, 'src', 'data'))
].filter((file) => /\.(md|ya?ml)$/.test(file));

for (const file of dataFiles) {
  try {
    const data = readRecord(file);
    if (!data || Array.isArray(data)) errors.push(`${file}: genau ein Objekt pro Datei erwartet`);
    else records.push({ file, data });
  } catch (error) {
    errors.push(`${file}: ${error.message}`);
  }
}

const byUid = new Map();
for (const record of records) {
  const { data, file } = record;
  if (!data.uid) errors.push(`${file}: uid fehlt`);
  else if (byUid.has(data.uid)) errors.push(`Doppelte uid ${data.uid}`);
  else byUid.set(data.uid, record);

  const releasePageTypes = new Set(['theme_world', 'topic', 'knowledge', 'video', 'source_canonical']);
  if (releasePageTypes.has(data.type) && (data.visibility !== 'public' || data.workflowState !== 'approved')) {
    errors.push(`${data.uid}: veröffentlichte Seite ist nicht freigegeben`);
  }
  if (releasePageTypes.has(data.type) && (data.review?.scientific?.status !== 'passed' || data.review?.editorial?.status !== 'passed')) {
    errors.push(`${data.uid}: wissenschaftliche oder redaktionelle Seitenfreigabe fehlt`);
  }
}

const has = (uid) => byUid.has(uid);
for (const { data } of records) {
  for (const uid of data.worldIds ?? []) if (!has(uid)) errors.push(`${data.uid}: unbekannte Themenwelt ${uid}`);
  for (const uid of data.topicIds ?? []) if (!has(uid)) errors.push(`${data.uid}: unbekanntes Thema ${uid}`);
  for (const uid of data.knowledgeIds ?? []) if (!has(uid)) errors.push(`${data.uid}: unbekannter Wissenseintrag ${uid}`);
  for (const uid of data.claimIds ?? []) if (!has(uid)) errors.push(`${data.uid}: unbekannter Claim ${uid}`);
  if (data.type === 'content_link') {
    if (!has(data.fromUid) || !has(data.toUid)) errors.push(`${data.uid}: Linkziel fehlt`);
  }
  if (data.type === 'content_source') {
    if (!has(data.contentUid) || !has(data.sourceUid)) errors.push(`${data.uid}: Inhalt oder Quelle fehlt`);
    for (const uid of data.claimUids ?? []) if (!has(uid)) errors.push(`${data.uid}: unbekannter Claim ${uid}`);
  }
}

const countType = (type) => records.filter(({ data }) => data.type === type).length;
const expected = {
  theme_world: 4,
  topic: 4,
  knowledge: 3,
  video: 4,
  source_canonical: 13,
  claim: 15,
  learning_path: 0,
  research_project: 0,
  cooperation: 0,
  magazine_article: 0
};
for (const [type, count] of Object.entries(expected)) {
  if (countType(type) !== count) errors.push(`Release-Gate: ${type} erwartet ${count}, gefunden ${countType(type)}`);
}

const supportedClaims = new Set(records.filter(({ data }) => data.type === 'content_source').flatMap(({ data }) => data.claimUids ?? []));
for (const { data } of records.filter(({ data }) => data.type === 'claim' && data.scientificCore)) {
  if (!supportedClaims.has(data.uid)) errors.push(`${data.uid}: wissenschaftliche Kernaussage ohne Quellenbeziehung`);
}
if (supportedClaims.size !== 15) errors.push(`Release-Gate: 15 belegte Claims erwartet, gefunden ${supportedClaims.size}`);

const policy = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'release-policy.json'), 'utf8'));
if (policy.globalRobotsLock !== 'noindex, nofollow') errors.push('Globale Robots-Sperre ist nicht noindex, nofollow');
for (const [collection, uids] of Object.entries(policy.content)) {
  for (const uid of uids) if (!has(uid)) errors.push(`Release-Policy ${collection}: ${uid} fehlt`);
}

for (const file of walk(path.join(root, 'public'))) {
  const relative = path.relative(path.join(root, 'public'), file).replaceAll('\\', '/');
  if (/\.(md|ya?ml|json)$/i.test(file) || /(^|\/)(raw|internal|private|draft)(\/|$)/i.test(relative)) {
    errors.push(`Interne Daten im public-Bereich: ${relative}`);
  }
}

if (errors.length) {
  console.error(`Öffentliche Release-Validierung fehlgeschlagen (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Öffentliche Release-Validierung erfolgreich: ${records.length} Objekte, ${byUid.size} eindeutige IDs, ${supportedClaims.size} belegte Claims, ${countType('video')} Videos, ${countType('source_canonical')} Quellen.`);
