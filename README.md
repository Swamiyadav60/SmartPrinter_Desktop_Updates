# SmartPrinter Desktop Update Server

Official software release and auto-update server for **SmartPrinter Desktop** clients (`https://updates.smartprinter.in`).

This server provides:
1. Public downloads for all 4 Windows platform builds.
2. Isolated Electron auto-update channels (`latest.yml`, `.exe`, `.blockmap`).
3. Health check endpoint for uptime monitors (`/health`).

---

## 1. Quick Start & Local Development

### Prerequisites
- Node.js 18+ (tested on Node.js v24.16.0)
- npm 9+

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Local URL: `http://localhost:3000`  
Health Check: `http://localhost:3000/health`

### Build for Production
```bash
npm run build
```
Generates production output in `dist/`.

---

## 2. Directory Structure & Upload Targets

Electron auto-update files **MUST** be uploaded into their dedicated platform directory in `dist/desktop/` (or `public/desktop/` before building):

```text
dist/desktop/
├── x64/
│   ├── latest.yml
│   ├── SmartPrinter Desktop Setup <version> x64.exe
│   └── SmartPrinter Desktop Setup <version> x64.exe.blockmap
│
├── x86/
│   ├── latest.yml
│   ├── SmartPrinter Desktop Setup <version> x86.exe
│   └── SmartPrinter Desktop Setup <version> x86.exe.blockmap
│
└── legacy/
    ├── x64/
    │   ├── latest.yml
    │   ├── SmartPrinter Desktop Legacy Setup <version> x64.exe
    │   └── SmartPrinter Desktop Legacy Setup <version> x64.exe.blockmap
    │
    └── x86/
        ├── latest.yml
        ├── SmartPrinter Desktop Legacy Setup <version> x86.exe
        └── SmartPrinter Desktop Legacy Setup <version> x86.exe.blockmap
```

---

## 3. The Four Update Channels & Target Matrix

| Platform Channel | Target OS | Architecture | Electron | Update URL Feed |
| :--- | :--- | :---: | :---: | :--- |
| **Modern x64** | Windows 10 & 11 (64-bit) | x64 | 31.7.7 | `https://updates.smartprinter.in/desktop/x64/` |
| **Modern x86** | Windows 10 (32-bit only)* | x86 | 31.7.7 | `https://updates.smartprinter.in/desktop/x86/` |
| **Legacy x64** | Windows 7 SP1, 8, 8.1 (64-bit) | x64 | 22.3.27 | `https://updates.smartprinter.in/desktop/legacy/x64/` |
| **Legacy x86** | Windows 7 SP1, 8, 8.1 (32-bit) | x86 | 22.3.27 | `https://updates.smartprinter.in/desktop/legacy/x86/` |

*\* Windows 11 has no 32-bit edition. Modern x86 specifically targets 32-bit Windows 10.*

---

## 4. Release Procedure (Step-by-Step)

When publishing a new release (e.g. `1.0.0` or `1.0.1`):

### Step 1: Build the SmartPrinter Desktop Installers
In the desktop project (`smartprinter-desktop/apps/desktop-ui`):
```bash
# To build all 4 targets:
npm run package:all

# Or build individual targets:
npm run package:modern:x64
npm run package:modern:x86
npm run package:legacy:x64
npm run package:legacy:x86
```

### Step 2: Locate Output Artifacts
Artifacts are generated in `dist-packages/`:
- `dist-packages/modern-x64/`
  - `SmartPrinter Desktop Setup <version> x64.exe`
  - `SmartPrinter Desktop Setup <version> x64.exe.blockmap`
  - `latest.yml`
- `dist-packages/modern-x86/`
  - `SmartPrinter Desktop Setup <version> x86.exe`
  - `SmartPrinter Desktop Setup <version> x86.exe.blockmap`
  - `latest.yml`
- `dist-packages/legacy-x64/`
  - `SmartPrinter Desktop Legacy Setup <version> x64.exe`
  - `SmartPrinter Desktop Legacy Setup <version> x64.exe.blockmap`
  - `latest.yml`
- `dist-packages/legacy-x86/`
  - `SmartPrinter Desktop Legacy Setup <version> x86.exe`
  - `SmartPrinter Desktop Legacy Setup <version> x86.exe.blockmap`
  - `latest.yml`

### Step 3: Upload to Update Server
Upload the generated files directly into their respective directories on `updates.smartprinter.in`:
- `modern-x64` artifacts $\rightarrow$ `/var/www/updates.smartprinter.in/dist/desktop/x64/`
- `modern-x86` artifacts $\rightarrow$ `/var/www/updates.smartprinter.in/dist/desktop/x86/`
- `legacy-x64` artifacts $\rightarrow$ `/var/www/updates.smartprinter.in/dist/desktop/legacy/x64/`
- `legacy-x86` artifacts $\rightarrow$ `/var/www/updates.smartprinter.in/dist/desktop/legacy/x86/`

### Step 4: Verify Live Feed
1. Open in browser: `https://updates.smartprinter.in/desktop/x64/latest.yml`
2. Confirm the YAML shows the new `version: <new-version>`.
3. Check the download page: `https://updates.smartprinter.in/`
4. Confirm the Modern x64 card shows the new version, file size, and the download button is active.

### Step 5: Test Client Auto-Update
1. Launch an installed client running an older version.
2. In client logs or Settings $\rightarrow$ Update, click **Check for Updates**.
3. Verify that the client detects the new version from its assigned URL, downloads the update payload, and notifies the user to restart.

---

## 5. Production Deployment & Hosting

Because the installers are ~100MB+ each, hosting requires support for:
1. Static files with HTTP byte-range requests (`Accept-Ranges: bytes` for Electron blockmaps).
2. Proper caching (`no-cache` for `latest.yml`, long cache for `.exe` and `.blockmap`).

### Option A: Standard Linux VPS / Nginx (Recommended)
1. Copy `dist/` to `/var/www/updates.smartprinter.in/dist`.
2. Apply `nginx.conf` (included in repository root) to `/etc/nginx/sites-available/updates.smartprinter.in`.
3. Enable site: `sudo ln -s /etc/nginx/sites-available/updates.smartprinter.in /etc/nginx/sites-enabled/`.
4. Test and reload: `sudo nginx -t && sudo systemctl reload nginx`.
5. Obtain SSL certificate: `sudo certbot --nginx -d updates.smartprinter.in`.

### Option B: Cloudflare Pages / AWS S3 + CloudFront
1. Connect repository or deploy `dist/` to Cloudflare Pages.
2. The included `public/_headers` and `public/_redirects` will automatically configure CORS, byte ranges, and SPA routing.
3. Configure CNAME DNS record for `updates.smartprinter.in`.

---

## 6. Health Check Endpoint
```http
GET https://updates.smartprinter.in/health
```
Response:
```json
{
  "status": "ok",
  "service": "SmartPrinter Update Server"
}
```
