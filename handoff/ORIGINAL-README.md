# Luna’s Luxury Events HTX — approved celebration brand direction

Beautiful balloons, thoughtful event experiences, and unforgettable celebrations. The homepage now introduces Balloon Boutique and Event Services as two equally important offerings, following the approved hero → services → boutique → occasions → work → two-path process → final CTA order.

Editable vanilla public files live in dist/: index.html, css/, js/, assets/. Shared shell: templates/shell.html. Regenerate the static homepage with `node scripts/render-home.cjs`. No runtime dependencies or framework were added. The hosting manifest still serves dist/ with the existing identity and private audience.

Use dist/js/data.js for catalog, business details and service descriptions; dist/js/views.js for page and section templates; dist/js/discovery.js for occasions and the equal celebration paths. Expanded service titles keep their old form values in serviceData array item 5 so preselection remains accurate. The bag, filters, event form and existing pages are retained.

The independent source ZIP uses the same public files, plus its editable shell, README and optional Node tools. Open its root index.html with Live Server. QA.md records the actual checks and missing rendered-browser validation. Products/options/prices and stock photos remain samples. Orders, payments, messages, files and bookings are not transmitted. Real catalog assets, fulfillment decisions and ordering/payment integrations are still required for production.
