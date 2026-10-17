# Luna’s Luxury Events HTX — complete editable source

The actual approved website, saved version 7 at commit `993635e55b7f2b01b3b928cbdc2ffbb876442c8b`. No design, wording, spacing, photography or interaction change was made for this export. Both Balloon Boutique and Event Services retain equal positioning, including the latest implemented final CTA.

**Framework: vanilla HTML, CSS and JavaScript.** There is no React, Vite, Next.js, TypeScript or Tailwind. The original editable application is in **dist/**; despite the name, this is required source, not a disposable framework build cache. All original tracked files are included. The original README is preserved at handoff/ORIGINAL-README.md.

The added package.json supplies convenient local commands using Node core only. No runtime npm packages are required. Original application files, template, original homepage script, assets and hosting configuration are unchanged. See handoff/PROVENANCE.md and ORIGINAL-SHA256SUMS.txt for provenance and integrity.

## Windows: extract and open the whole project

1. Download `lunas-luxury-events-htx-source.zip`.
2. In File Explorer, right-click the ZIP → **Extract All** → **Extract**.
3. Find the folder named **lunas-luxury-events-htx**, containing this README, package.json, dist, templates, scripts and handoff.
4. In Visual Studio Code, choose **File → Open Folder…** → select **lunas-luxury-events-htx** → **Select Folder**.
5. Press **Ctrl+Shift+E** to display Explorer. Expand dist to see the website source. You do not need to paste code into new files.

Work from the extracted folder, not from inside the ZIP.

## Easiest local preview: Live Server

1. In VS Code’s Extensions panel, install **Live Server** if needed.
2. Expand **dist**, right-click **index.html** → **Open with Live Server**.
3. Keep that browser tab open. Navigate using the site’s links; hash routes such as `#shop` are expected.
4. Save source edits using **Ctrl+S**. Live Server refreshes automatically.

**The correct entry is dist/index.html.** Live Server needs no Node/npm installation for this app. Do not open only a CSS/JS file or treat the ZIP itself as the project.

## Terminal preview: exact commands

Install Node.js if needed; Node 18+ supports the included preview/build tools, and Node 24 is recommended and was used for verification. Restart VS Code after installation. Choose **Terminal → New Terminal**, working in the folder containing package.json.

The following commands work in Windows PowerShell without changing execution policy. In Command Prompt or other shells, plain `npm` is equivalent to `npm.cmd`.

```powershell
node --version
npm.cmd --version
npm.cmd install
npm.cmd run dev
```

There are no runtime dependency packages to download. The manifest and lockfile describe the added command shortcuts, not a newly introduced framework.

Open **http://localhost:8000/**. Keep the terminal running and press **Ctrl+C** to stop it. This simple Node server needs a manual browser refresh after saving; use Live Server for automatic refresh.

If port 8000 is busy:

```powershell
node handoff/serve.cjs dist 8002
```

Open http://localhost:8002/ instead.

## Source file map

| Content or behavior | Location |
| --- | --- |
| Main editable application | `dist/` |
| Homepage content and section order | `dist/js/views.js` → `L.pages.home` |
| Shared services/gallery renderers | `L.servicesMini`, `L.galleryPreview` in `dist/js/views.js` |
| Two-column balloon/event journey | `dist/js/discovery.js` → `L.celebrationPaths` |
| Shared header/navigation, final CTA, footer and metadata | `templates/shell.html`, then regenerate the homepage |
| Common name/phone/social information | `dist/js/data.js` → `L.business` |
| Sample products, descriptions, prices, options, featured/occasion metadata | `dist/js/data.js` → `L.products` |
| Service titles/descriptions and images | `dist/js/data.js` → `L.serviceData` |
| Occasion browsing, ordering guidance and shopping FAQ | `dist/js/discovery.js` |
| All seven page templates | `dist/js/views.js` → `L.pages` |
| Product details, bag, quantities/subtotal, removal and contact panel | `dist/js/shop.js` |
| Event inquiry validation, steps, local image selection and demo confirmation | `dist/js/inquiry.js`; field markup in `views.js` |
| Routing, active links and mobile menu | `dist/js/navigation.js` |
| Common helpers and in-memory state | `dist/js/shared.js` |
| Startup | `dist/js/main.js` |
| Colors, fonts, spacing, components and layout | `dist/css/styles.css`, then `dist/css/responsive.css` |
| Self-hosted font declarations/files | `dist/css/fonts.css`, `dist/assets/fonts/` |
| Photographs | `dist/assets/images/` |
| Original logo | `dist/assets/logo/lunas-logo.jpg` |
| Original homepage generator | `scripts/render-home.cjs` |
| Original platform hosting binding | `.openai/hosting.json` → `dist` |
| Added independent server/build tools and optional tests | `handoff/` |

The existing deferred scripts load in dependency order: data → shared → discovery → views → navigation → shop → inquiry → main. Keep that order in the shared shell. Routes are hashes such as `#services`, `#contact?service=Room%20decor` and `#shop?occasion=Birthdays`; no separate HTML page files or server rewrite rules are missing.

## Editing and previewing safely

- Change runtime text/layout in the JS templates. Change shared navigation, footer, final CTA and metadata in templates/shell.html. Save and refresh to preview.
- After editing templates or product data, synchronize the static homepage using the original generator:

```powershell
node scripts/render-home.cjs
```

- Do not edit only generated dist/index.html and expect that edit to survive regeneration. Keep the shell’s `<!-- HOME_CONTENT -->` marker.
- Brand colors are CSS custom properties near the beginning of styles.css. Responsive.css intentionally includes later component overrides as well as media rules; preserve stylesheet/cascade order.
- Replace photos with owner-authorized assets and update references/alt text. Catalog image `bouquet` maps to `dist/assets/images/bouquet.webp`. Retain truthful stock/sample notices until replacing the references.
- Stable product IDs control some sample options. The fifth serviceData array entry preserves its original form value; keep it aligned with inquiry checkboxes.
- Common business substitutions do not redraw the logo or update every uppercase/short editorial phrase. Check those labels when changing branding.

## Build and deploy independently

```powershell
npm.cmd run build
npm.cmd run preview
```

The build invokes the **unchanged original homepage generator**, then recreates **build/** from dist/. It clears only the generated build directory; do not store hand-edited source there. This is static release packaging, not framework compilation.

Preview at **http://localhost:8001/**. Upload the **contents of build/** to your own static HTTPS host. Keep asset folders intact. Do not use the entire project root as the public web root; tools, templates, QA files, dependencies and .openai do not belong there. ChatGPT Work is not needed for hosting or routine edits. Configure your domain and HTTPS with your selected host. This export does not purchase hosting or deploy a public site.

## Optional development tests

Only the optional tests need external packages. Node 24 is recommended. jsdom 30.1.3 is pinned separately in handoff/qa, with its own lockfile:

```powershell
npm.cmd install --prefix handoff/qa
npm.cmd test --prefix handoff/qa
```

The tests simulate DOM interactions with native dialogs/scroll stubbed. They do not certify rendered desktop/mobile layouts. See handoff/VERIFICATION.md for completed checks and remaining visual review.

## Included assets and known limitations

The original logo, 14 approved stock reference photographs, seven local font files, original CSS, all templates/routes and all interaction code are included. Photo sources are in handoff/PHOTO-CREDITS.md; font licenses accompany dist/assets/fonts/. Stock photographs are references, not Luna’s completed portfolio or real inventory. No asset was silently substituted or omitted. Existing social destinations still require owner confirmation.

The source retains category/occasion filters, product dialogs/options, Add to Bag, quantities/subtotal/removal, sample-selection copying, gallery filters, event validation, multi-step navigation and reset. Bag/form data is memory-only and clears on refresh. Local inspiration selection is not a server upload.

Products, options and prices are demonstrations. No payments, order submission, delivered inquiry/email, confirmed booking, inventory backend, guaranteed pickup/delivery or server upload exists to export. Real owner catalog files were not present in the inspected project. Fulfillment and ordering/payment workflow still need confirmation and production integration. No .env or environment values are required. Keep prototype notices and noindex until a production launch is approved.

No fresh rendered-browser visual or console review is claimed; supported browser control is unavailable. Check locally at desktop, tablet and mobile widths before public release. The source is complete and independently editable; production transaction services remain unimplemented.
