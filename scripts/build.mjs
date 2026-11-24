// Builds dist/index.html with a salted PBKDF2 hash of ADMIN_PIN.
// The PIN itself never enters the repo or the website.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { pbkdf2Sync, randomBytes } from 'node:crypto';

const pin = process.env.ADMIN_PIN;
if (!pin || pin.length < 8) {
  console.error('ADMIN_PIN is missing or shorter than 8 characters. Add it as a secret (GitHub) or environment variable (Netlify).');
  process.exit(1);
}
const iterations = 310000;
const salt = randomBytes(16);
const hash = pbkdf2Sync(pin, salt, iterations, 32, 'sha256').toString('hex');
const value = `pbkdf2$${iterations}$${salt.toString('hex')}$${hash}`;

const html = readFileSync('index.html', 'utf8');
if (!html.includes('__ADMIN_PIN_HASH__')) { console.error('Placeholder __ADMIN_PIN_HASH__ not found in index.html'); process.exit(1); }
mkdirSync('dist', { recursive: true });
writeFileSync('dist/index.html', html.replace('__ADMIN_PIN_HASH__', () => value));
console.log('Built dist/index.html with hashed admin PIN');
