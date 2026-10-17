/* Collection concepts are editable here; product membership lives in data.js. */
((L) => {
  "use strict";
  L.occasions = [
    { name: "Birthdays", image: "birthday-bouquet", alt: "Pastel birthday balloon bouquet" },
    { name: "Baby Showers", image: "party-bundle", alt: "Soft blue and ivory balloon reference" },
    { name: "Anniversaries", image: "bouquet", alt: "Rose gold and gold balloon bouquet" },
    { name: "Graduations", image: "gold-balloon", alt: "Gold balloon celebration reference" },
    { name: "Celebrations & Surprises", image: "bubble-gift", alt: "Pastel bubble balloon gift reference" }
  ];
  L.filteredProducts = () => L.products.filter(p =>
    (L.shopFilter === "All balloons" || p.category === L.shopFilter) &&
    (L.occasionFilter === "All occasions" || (p.occasions || []).includes(L.occasionFilter)));
  L.occasionSection = () => `<section class="occasion-shopping section wrap" aria-labelledby="occasion-title">
    <div class="section-head"><div><p class="eyebrow">FIND A REASON TO CELEBRATE</p><h2 id="occasion-title">Balloons for<br><em>their moment.</em></h2></div><p class="section-intro">Every milestone deserves a little extra magic. Find balloon inspiration designed around the people and occasions worth celebrating.</p></div>
    <div class="occasion-grid">${L.occasions.map(o => `<a class="occasion-card" href="#shop?occasion=${encodeURIComponent(o.name)}"><div><img src="assets/images/${o.image}.webp" alt="${o.alt} — stock reference" width="600" height="700" loading="lazy"><span>STOCK REFERENCE</span></div><h3>${o.name}<span aria-hidden="true">↗</span></h3></a>`).join("")}</div>
    <p class="gallery-reference-note">Occasion collections are browsing concepts using sample products and licensed stock photographs.</p>
  </section>`;
  L.occasionFilters = () => `<div class="occasion-filter-row"><span id="occasion-label">Browse by occasion</span><div class="filters occasion-filters" aria-labelledby="occasion-label">${["All occasions", ...L.occasions.map(o=>o.name)].map(name=>`<button class="filter" data-occasion-filter="${name}" aria-pressed="${L.occasionFilter===name}">${name}</button>`).join("")}</div></div>`;
  L.syncShopURL = () => {
    if (!location.hash.startsWith("#shop")) return;
    const params = new URLSearchParams();
    if (L.occasionFilter !== "All occasions") params.set("occasion", L.occasionFilter);
    if (L.shopFilter !== "All balloons") params.set("category", L.shopFilter);
    history.replaceState(null, "", "#shop" + (params.size ? "?" + params.toString() : ""));
  };
  L.refreshProducts = () => {
    L.$("#products").innerHTML = L.businessText(L.cards());
    const count = L.filteredProducts().length;
    if (L.$("#product-count")) L.$("#product-count").textContent = count + " sample designs · No live inventory";
    if (L.$("#filter-status")) L.$("#filter-status").textContent = count + " sample designs · " + L.shopFilter + " · " + L.occasionFilter;
    document.querySelectorAll("[data-shop-filter]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.shopFilter===L.shopFilter));
    document.querySelectorAll("[data-occasion-filter]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.occasionFilter===L.occasionFilter));
  };
  L.howToOrder = () => `<section class="balloon-order-section section" aria-labelledby="order-title"><div class="wrap"><div class="section-head"><div><p class="eyebrow">BALLOONS NOW. BOUTIQUE COMING SOON.</p><h2 id="order-title">Your next celebration,<br><em>in three little steps.</em></h2></div><a class="text-link" href="tel:+16618605930">Talk balloons with Luna’s ↗</a></div><ol class="balloon-order-steps"><li><span>01</span><h3>Find your balloons</h3><p>Browse the boutique for a style or occasion you love. The designs and prices shown here are samples.</p></li><li><span>02</span><h3>Make it yours</h3><p>Explore sample options, or ask Luna’s what can be created for your celebration.</p></li><li><span>03</span><h3>Arrange your order</h3><p>Contact Luna’s to confirm the actual product, price, payment and how you’ll receive your balloons.</p></li></ol><div class="order-contact"><p><strong>The store is coming. Balloons are available now.</strong><br>This demonstration does not send orders or take payments. Call to discuss a real balloon order.</p><a class="button dark" href="tel:+16618605930">Call 661-860-5930 ↗</a></div></div></section>`;
  L.shoppingFAQ = () => `<section class="shopping-faq section wrap" aria-labelledby="faq-title"><div><p class="eyebrow">A FEW HELPFUL DETAILS</p><h2 id="faq-title">Before you<br><em>celebrate.</em></h2><p>Need something specific?<br><a class="text-link" href="tel:+16618605930">Ask Luna’s directly ↗</a></p></div><div class="faq-list">
    <details><summary>Can I buy balloons before the shop opens?</summary><p>Yes. Luna’s is selling balloons while the Humble storefront is being prepared. Call 661-860-5930 to discuss current products and the next step for your order.</p></details>
    <details><summary>Are these the actual products and prices?</summary><p>This prototype shows sample designs, stock photos and demo prices. Ask Luna’s for the current catalog and confirmed price. The owners’ real product content will replace these references.</p></details>
    <details><summary>Can I customize an arrangement?</summary><p>Share your colors, occasion and ideas with Luna’s. The team will confirm which options are available and their prices. The selectors in this preview are examples.</p></details>
    <details><summary>How will my order be confirmed?</summary><p>Confirm availability, the final price, payment instructions and fulfillment with Luna’s before treating an order as confirmed. Adding to this sample bag does not place or reserve an order.</p></details>
    <details><summary>Is pickup or delivery available?</summary><p>Fulfillment arrangements are still being finalized. Ask Luna’s how your balloons can be received before agreeing to an order. No pickup address, delivery area, fee or timing is promised here.</p></details>
    <details><summary>Is the physical boutique open?</summary><p>Not yet. The Humble balloon boutique is being prepared; the opening date and address will be shared when confirmed. You can still contact Luna’s about balloons now.</p></details>
  </div></section>`;

  // Equal customer paths reuse the existing process typography and list components.
  L.celebrationPaths = () => `<section class="process-section celebration-paths section" aria-labelledby="paths-title"><div class="wrap"><div class="section-head"><div><p class="eyebrow">LET’S MAKE IT SPECIAL</p><h2 id="paths-title">Your celebration.<br><em>Your way.</em></h2></div></div><div class="celebration-path-grid">
    <article class="celebration-path" aria-labelledby="balloon-path-title"><p class="eyebrow">THE BALLOON BOUTIQUE</p><h3 id="balloon-path-title">Shop Balloons</h3><ol class="process-list"><li><span>01</span><div><h4>Find your favorites</h4><p>Browse balloon collections and occasions.</p></div></li><li><span>02</span><div><h4>Make it personal</h4><p>Explore colors, arrangements, and customization possibilities.</p></div></li><li><span>03</span><div><h4>Arrange your order</h4><p><a href="tel:+16618605930">Contact Luna’s</a> to confirm product availability, pricing, payment, and pickup or delivery options.</p></div></li></ol><p class="fine path-note">Catalog and options shown are samples. Fulfillment and payment arrangements must be confirmed directly; this site does not place orders.</p><a class="button dark" href="#shop">Explore Balloons →</a></article>
    <article class="celebration-path" aria-labelledby="event-path-title"><p class="eyebrow">PERSONALIZED EVENT SERVICES</p><h3 id="event-path-title">Plan an Event</h3><ol class="process-list"><li><span>01</span><div><h4>Share your vision</h4><p>Tell Luna’s about your celebration, desired services, and event date.</p></div></li><li><span>02</span><div><h4>Create your experience</h4><p>Discuss ideas, styling, decorations, and planning requirements.</p></div></li><li><span>03</span><div><h4>Celebrate beautifully</h4><p>Finalize the agreed services and let Luna’s help bring your vision to life.</p></div></li></ol><p class="fine path-note">Availability and booking terms are confirmed directly. The event inquiry form is a demonstration and does not send a message or book an event.</p><a class="button dark" href="#contact">Plan Your Event →</a></article>
  </div></div></section>`;
})(window.Luna);
