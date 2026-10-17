# Export verification — October 17, 2026

## Current approved source

The actual clean checkout is at commit 993635e55b7f2b01b3b928cbdc2ffbb876442c8b, matching saved Site version 7 and its recorded deployment. No redesign, content correction or live deployment was performed for this export. The current implemented final CTA is preserved as “Whatever the occasion, let’s make it unforgettable.” with both Shop Balloons and Plan Your Event actions. All 41 tracked original files are included unchanged; only the original README is relocated to handoff/ORIGINAL-README.md to allow a Windows setup guide at the root.

## Commands executed successfully

Tests ran on Linux using Node.js 24.19.0 and npm. Windows instructions use npm.cmd, the Windows executable equivalent; a Windows computer was not directly tested.

1. `npm install --ignore-scripts --no-audit --no-fund` at the root: succeeded; there are no runtime dependency packages. Generated package-lock.json is included.
2. `npm install --prefix handoff/qa --ignore-scripts --no-audit --no-fund`: succeeded; installed the optional jsdom 30.1.3 QA dependencies and generated its separate lockfile. Dependency directories are excluded from the ZIP.
3. `npm run build`: succeeded. The unchanged original homepage generator produced 15,964 characters, then the added helper copied public files into a generated release directory.
4. `npm test --prefix handoff/qa`: both included suites passed.
5. `npm run dev`: started the independent server on port 8000. The HTTP entry, stylesheet/script startup in jsdom and every served local resource returned correctly, with no jsdom errors.
6. `npm run preview`: started the generated release on port 8001; equivalent entry/resource/startup checks passed.
7. All 41 original-file checksums still matched after the build. All eight application JavaScript files passed syntax checks, 15 images decoded and seven local fonts parsed.

The only npm warning concerned the managed environment’s http-proxy configuration; installation/build/test commands completed successfully. No runtime app dependency on that environment setting exists.

## Behavior checked

- All seven views, primary links, navigation state, repeated-route behavior, menu toggling and Escape/focus recovery.
- Exact approved hero text, homepage section order, three services, four gallery subjects, five occasion collections, equal two-path process and paired final CTA destinations.
- Event journey: Services → Gallery → Inquiry; service-specific form preselection for all three display titles preserves the original form keys.
- Balloon journey: occasion/category browsing, valid query restoration, filtered and empty/reset states, detail options, direct/configured additions, quantity limits/recovery, removal and bag subtotals. The six-product sample basket is $203; changing the $35 bouquet to quantity 2 produces $238 and to quantity 99 produces $3,633. The two-product test bag is $83.
- The bag contact panel, supplied phone links, sample selection copying with a mocked clipboard, and the unsupported-clipboard message. No actual phone call or real clipboard permission check was performed.
- Event form required fields, preferred contact channel, invalid email, whitespace/past-date checks, back/forward flow, file-type error clearing, honest demonstration confirmation and reset.
- Every rendered route’s local image paths; static entry references, self-hosted font paths and local HTTP resource responses. Existing demo/sample/stock notices remain.

## Verification limits

These are DOM/resource and source-integrity checks, not rendered-browser tests. jsdom uses stubs for native dialog and scroll APIs and a mock clipboard. Supported browser control is unavailable in this managed environment. Desktop/tablet/mobile layout, image cropping, actual font rendering, native dialogs, browser console/network panels, horizontal overflow and touch behavior remain unverified. No new screenshots or visual sign-off are claimed. Review locally at 1440, 1024, 768, 390 and 375px before public release.

No orders, payments, inquiry delivery, email, uploads, inventory reservation or event bookings are operational or were tested as live. The original code contains no backend or private configuration for those services. The owners’ real catalog files are not in the source; samples remain explicit. Fulfillment, ordering/payment workflow and any real integrations still need confirmation and testing.

## Portability and additions

The unchanged application resides in dist/ and runs on a standard static HTTP server with local fonts/images. No ChatGPT runtime, credentials or continued Work account is required. Added handoff tooling uses Node core. Optional tests are separate dev dependencies. .openai/hosting.json is a preserved non-secret original hosting binding, not a requirement for independent hosting. No .env.example is applicable. Photo sources and font license notices are included; no original asset or source component was omitted or substituted.
