# Jyotish Kundli & Consultation

A single-page app: free sidereal Kundli for visitors, paid questions by UPI with a WhatsApp handoff, and a private report studio at `#admin`.

## 1. Edit your details
In `index.html`, find `const CONFIG` and set `UPI_ID`, `PAYEE_NAME`, `WHATSAPP` (country code + number, digits only) and `PLANS`.
Leave `ADMIN_PIN_HASH` as `__ADMIN_PIN_HASH__`; the deploy fills it in.

## 2. Set your admin PIN as a secret (never in the code)
Use 8+ characters, e.g. a short passphrase.

**GitHub Pages**
1. Repo → Settings → Secrets and variables → Actions → New repository secret: name `ADMIN_PIN`, value your PIN.
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. Push to `main`. The workflow hashes the PIN and publishes the site.

**Netlify (alternative)**
Site configuration → Environment variables → add `ADMIN_PIN`. `netlify.toml` already runs the build.

To change the PIN: update the secret and re-run the deploy.

## 3. Use admin
Open `https://your-site/#admin`, enter the PIN, then AI settings → paste your Gemini (or Claude) key. The key stays in that browser only.
Five wrong PINs lock the dialog for 10 minutes on that device.

## Test locally
`ADMIN_PIN='your-pin' node scripts/build.mjs` then open `dist/index.html`.
