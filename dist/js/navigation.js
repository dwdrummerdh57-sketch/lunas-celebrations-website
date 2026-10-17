/* Extracted from the approved original; reorganized for this portable edition. */
(L => {
  "use strict";

  L.render = function () {
    const [path, query] = location.hash.slice(1).split("?");
    let page = path || "home";
    if (!L.pages[page]) page = "home";
    if (page === "home") { L.shopFilter = "All balloons"; L.occasionFilter = "All occasions"; }
    if (page === "shop") {
      const params = new URLSearchParams(query);
      const occasion = params.get("occasion");
      L.occasionFilter = L.occasions.some(o=>o.name===occasion) ? occasion : "All occasions";
      const category = params.get("category");
      L.shopFilter = L.products.some(p=>p.category===category) ? category : "All balloons";
    }
    L.$("#main").innerHTML = L.businessText(L.pages[page]());
    if (L.$("#product-count")) L.$("#product-count").textContent = L.filteredProducts().length + " sample designs · No live inventory";
    if (page === "shop") L.refreshProducts();
    document.title = L.businessText(`${{
      home: "Balloons & Event Decor in Humble",
      about: "About the Owners",
      services: "Custom Event Services",
      shop: "Balloon Shop Preview",
      gallery: "Gallery Preview",
      contact: "Plan Your Event",
      review: "Client Prototype Notes"
    }[page]} | Luna’s Luxury Events HTX`);
    document.querySelectorAll("nav a").forEach(a => {
      a.removeAttribute("aria-current");
      if (a.hash === "#" + page) a.setAttribute("aria-current", "page");
    });
    L.$("#navigation").classList.remove("open");
    L.$("#menu").setAttribute("aria-expanded", "false");
    L.$("#menu").textContent = "Menu ☰";
    if (page === "contact") {
      const date = new Date();
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      L.$("[name=date]").min = date.toISOString().slice(0, 10);
      const val = new URLSearchParams(query).get("service");
      document.querySelectorAll("[name=services]").forEach(i => i.checked = i.value === val);
      L.inquiryStep = 0;
      L.$("#inquiry").addEventListener("submit", L.inquiry);
      L.$("#inquiry").noValidate = true;
      L.$("[name=inspiration]").addEventListener("change", L.validateFile);
      L.$('[name="contact-method"]').addEventListener("change", L.syncContactPreference);
    }
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  };
  L.initNavigation = function () {
    document.addEventListener("click", e => {
      const b = e.target.closest("button,a");
      if (!b) return;
      if (b.tagName === "A" && b.hash === location.hash && /^#(home|services|shop|gallery|about|contact|review)(\?|$)/.test(b.hash) && !b.hasAttribute("data-shop-close")) {
        e.preventDefault();
        L.render();
        L.$("#main").focus({
          preventScroll: true
        });
        return;
      }
      if (b.dataset.galleryFilter) {
        L.galleryFilter = b.dataset.galleryFilter;
        const y = window.scrollY;
        L.render();
        window.scrollTo(0, y);
        document.querySelector(`[data-gallery-filter="${L.galleryFilter}"]`).focus();
      }
      if (b.id === "menu") {
        const opened = L.$("#navigation").classList.toggle("open");
        b.setAttribute("aria-expanded", opened);
        b.textContent = opened ? "Close ×" : "Menu ☰";
      }
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && L.$("#navigation").classList.contains("open")) {
        L.$("#navigation").classList.remove("open");
        L.$("#menu").setAttribute("aria-expanded", "false");
        L.$("#menu").textContent = "Menu ☰";
        L.$("#menu").focus();
      }
    });
    window.addEventListener("hashchange", () => {
      L.render();
      L.$("#main").focus({
        preventScroll: true
      });
    });
  };
})(window.Luna);
