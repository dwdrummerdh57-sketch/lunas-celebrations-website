/* Extracted from the approved original; reorganized for this portable edition. */
(L => {
  "use strict";

  L.businessText = function (value) {
    const defaults = {
      "name": "Luna’s Luxury Events HTX",
      "phoneDisplay": "661-860-5930",
      "phoneHref": "tel:+16618605930",
      "socialHandle": "@LLEHTX2026",
      "instagram": "https://www.instagram.com/llehtx2026/",
      "tiktok": "https://www.tiktok.com/@llehtx2026",
      "location": "Humble, Texas"
    };
    let output = String(value);
    for (const key of Object.keys(defaults)) output = output.split(defaults[key]).join(L.business[key]);
    return output;
  };
  L.applyBusinessShell = function () {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!['SCRIPT', 'STYLE'].includes(node.parentElement.tagName)) node.nodeValue = L.businessText(node.nodeValue);
    }
    document.querySelectorAll('[href], [aria-label], meta[content]').forEach(element => {
      for (const name of ['href', 'aria-label', 'content']) {
        if (element.hasAttribute(name)) element.setAttribute(name, L.businessText(element.getAttribute(name)));
      }
    });
  };
  L.$ = s => document.querySelector(s);
  L.money = n => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(n);
  L.bag = [];
  L.shopFilter = "All balloons";
L.occasionFilter = "All occasions";
  L.galleryFilter = "All";
  L.inquiryStep = 0;
  L.lastFocus = null;
  L.photo = (image, alt, extra = "") => `<figure class="editorial-photo ${extra}"><img src="assets/images/${image}.webp" alt="${alt}" loading="lazy" width="1200" height="1600"><figcaption>Stock reference · Not Luna’s portfolio</figcaption></figure>`;
  L.openDialog = function (el) {
    L.lastFocus = document.activeElement;
    el.showModal();
  };
  L.closeDialog = function (el) {
    el.close();
    L.lastFocus?.focus();
  };
  L.toast = function (msg) {
    L.$("#toast").textContent = msg;
    L.$("#toast").classList.add("show");
    setTimeout(() => L.$("#toast").classList.remove("show"), 3500);
  };
})(window.Luna);
