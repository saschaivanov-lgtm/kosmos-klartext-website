import { spawnSync } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';

const cli = path.resolve(import.meta.dirname, '..', 'node_modules', 'astro', 'bin', 'astro.mjs');
const result = spawnSync(process.execPath, [cli, ...process.argv.slice(2)], {
  cwd: path.resolve(import.meta.dirname, '..'),
  env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
  stdio: 'inherit'
});

process.exit(result.status ?? 1);
