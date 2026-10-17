/* Extracted from the approved original; reorganized for this portable edition. */
(L => {
  "use strict";

  L.product = function (id) {
    const p = L.products.find(p => p.id === id);
    if (!p) return;
    const d = L.$("#product-dialog");
    d.innerHTML = L.businessText(`<div class="dialog-head"><h2 id="product-title">${p.name}</h2><button class="close" data-close="product-dialog" aria-label="Close product details">×</button></div><div class="product-layout">${L.art(p.id)}<div><p>${p.description}</p><p><strong>${L.money(p.price)}</strong> · Sample price</p><form id="product-options" class="options"><label class="field">Sample color palette<select name="color">${p.colors.map(c => `<option>${c}</option>`).join("")}</select></label>${id === "number" ? '<label class="field">Sample number<input name="number" type="number" min="0" max="99" step="1" inputmode="numeric" value="2" required></label>' : ""}<label class="field">Quantity<input name="qty" type="number" min="1" max="20" step="1" inputmode="numeric" value="1" required></label><p class="fine">Demonstration options only, not confirmed customization. Call Luna’s for the actual catalog, availability, final price and ordering arrangements.</p><button class="button dark" type="submit">Add to Sample Bag +</button><a class="text-link" href="tel:+16618605930">Ask about this arrangement ↗</a><p class="fine">This sample bag does not send an order or payment.</p></form></div></div>`);
    L.$("#product-options").onsubmit = e => {
      e.preventDefault();
      if (!e.target.reportValidity()) return;
      const f = new FormData(e.target);
      const color = f.get("color");
      const number = f.get("number") || "";
      const qty = Number(f.get("qty"));
      L.addItem(id, color, number, qty);
      L.closeDialog(d);
      L.toast("Added to your sample bag. No order has been placed.");
    };
    L.openDialog(d);
  };
  L.addItem = function (id, color, number = "", qty = 1) {
    const p = L.products.find(item => item.id === id);
    if (!p) return;
    if (!p.colors.includes(color)) return;
    qty = Math.max(1, Math.min(99, Math.trunc(Number(qty) || 1)));
    const key = JSON.stringify([id, color, number]);
    const existing = L.bag.find(item => item.key === key);
    if (existing) existing.qty = Math.min(99, existing.qty + qty);else L.bag.push({
      key,
      id,
      color,
      number,
      qty
    });
    L.updateBag();
  };
  L.updateBag = function () {
    const count = L.bag.reduce((n, p) => n + p.qty, 0);
    L.$("#bag-count").textContent = count;
    L.$(".header-actions .cart-toggle").setAttribute("aria-label", `Open sample shopping bag, ${count} ${count === 1 ? "item" : "items"}`);
  };
  L.drawCart = function () {
    const d = L.$("#cart-dialog");
    d.innerHTML = L.businessText(`<div class="dialog-head"><h2 id="cart-title">Your sample bag</h2><button class="close" data-close="cart-dialog" aria-label="Close shopping bag">×</button></div>${L.bag.length ? `<p class="fine">Demonstration products and prices. Nothing is reserved or ordered. This sample bag resets when the page is refreshed.</p>${L.bag.map((b, i) => {
      const p = L.products.find(x => x.id === b.id);
      return `<div class="cart-row"><div class="cart-item"><img src="assets/images/${p.image}.webp" alt="${p.alt}" width="65" height="80"><div><strong>${p.name}</strong><p>${b.color}${b.number ? " · Number " + b.number : ""}</p><p>${L.money(p.price)} each · Sample price</p></div></div><input type="number" min="1" max="99" step="1" inputmode="numeric" value="${b.qty}" data-qty="${i}" aria-label="Quantity for ${p.name}"><button class="close" data-remove="${i}" aria-label="Remove ${p.name}">×</button></div>`;
    }).join("")}<div class="cart-summary"><strong>Sample subtotal</strong><span>${L.money(L.bag.reduce((n, b) => n + L.products.find(p => p.id === b.id).price * b.qty, 0))}</span></div><p class="fine" style="margin-bottom:20px">Taxes, fulfillment fees and actual prices are not configured.</p><div class="actions"><button class="button dark" id="checkout">Discuss these balloons ↗</button><a class="text-link" href="#shop" data-shop-close>Continue browsing ↗</a></div><div id="checkout-area" aria-live="polite"></div>` : `<div class="cart-empty"><h3>A celebration starts with an idea.</h3><p class="muted" style="margin-bottom:25px">Your sample bag is empty.</p><a class="button dark" href="#shop" data-shop-close>Explore the Sample Shop ↗</a></div>`}`);
  };
  L.initShop = function () {
    document.addEventListener("click", e => {
      const b = e.target.closest("button,a");
      if (!b) return;
      if (b.dataset.product) L.product(b.dataset.product);
      if (b.dataset.occasionFilter) { L.occasionFilter = b.dataset.occasionFilter; L.syncShopURL(); L.refreshProducts(); }
      if (b.hasAttribute("data-reset-filters")) { L.occasionFilter = "All occasions"; L.shopFilter = "All balloons"; L.syncShopURL(); L.refreshProducts(); }
      if (b.id === "copy-bag") {
        const text = "Sample selections only — not an order or confirmed prices.\n" + L.bag.map(item => {
          const p = L.products.find(p=>p.id===item.id);
          return item.qty + " × " + p.name + " · sample option: " + item.color + (item.number ? " · Number " + item.number : "");
        }).join("\n");
        if (!navigator.clipboard?.writeText) { L.$("#copy-status").textContent = "Copy is unavailable here. You can read the selections above when you call."; }
        else navigator.clipboard.writeText(text).then(()=>{ L.$("#copy-status").textContent="Sample selections copied. Nothing was sent to Luna’s."; }).catch(()=>{ L.$("#copy-status").textContent="Your browser could not copy the selections. You can read them above when you call."; });
      }
      if (b.dataset.add) {
        const p = L.products.find(item => item.id === b.dataset.add);
        if (p) {
          L.addItem(p.id, p.colors[0], p.id === "number" ? "2" : "", 1);
          b.innerHTML = L.businessText("Added ✓ <span>+</span>");
          L.toast("Added to your sample bag. Open Bag to review. No order was placed.");
          setTimeout(() => {
            if (b.isConnected) b.innerHTML = L.businessText("Add to Sample Bag <span>+</span>");
          }, 2200);
        }
      }
      if (b.classList.contains("cart-toggle")) {
        L.drawCart();
        L.openDialog(L.$("#cart-dialog"));
      }
      if (b.dataset.close) L.closeDialog(L.$("#" + b.dataset.close));
      if (b.hasAttribute("data-remove")) {
        L.bag.splice(+b.dataset.remove, 1);
        L.updateBag();
        L.drawCart();
        L.$("#cart-dialog .close").focus();
      }
      if (b.id === "checkout") {
        L.$("#checkout-area").innerHTML = L.businessText(`<div class="checkout-note" tabindex="-1"><p class="eyebrow">TALK WITH LUNA’S</p><h3>Let’s discuss your balloons.</h3><p>This sample bag is a planning aid, not an order. No order or payment is processed in this preview. Final products, prices, payment and fulfillment must be confirmed with Luna’s.</p><p>Have these sample selections handy when you call:</p><p class="bag-reference">${L.bag.map(b => L.products.find(p => p.id === b.id).name + ' × ' + b.qty).join(' · ')}</p><div class="actions"><a class="button dark" href="tel:+16618605930">Call 661-860-5930 ↗</a><button class="button" id="copy-bag">Copy sample selections</button></div><p id="copy-status" class="fine" role="status"></p></div>`);
        L.$(".checkout-note").focus();
      }
      if (b.hasAttribute("data-shop-close")) {
        L.closeDialog(L.$("#cart-dialog"));
        if (location.hash === "#shop") L.render();
      }
      if (b.dataset.shopFilter) {
        L.shopFilter = b.dataset.shopFilter;
        L.syncShopURL();
        L.refreshProducts();
      }
    });
    document.addEventListener("change", e => {
      if (e.target.hasAttribute("data-qty")) {
        const i = +e.target.dataset.qty;
        L.bag[i].qty = Math.max(1, Math.min(99, Math.floor(+e.target.value || 1)));
        L.updateBag();
        L.drawCart();
        L.$('#cart-dialog [data-qty="' + i + '"]').focus();
      }
    });
    document.querySelectorAll("dialog").forEach(d => {
      d.addEventListener("click", e => {
        if (e.target === d) {
          const r = d.getBoundingClientRect();
          if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) L.closeDialog(d);
        }
      });
      d.addEventListener("cancel", () => setTimeout(() => L.lastFocus?.focus(), 0));
    });
  };
})(window.Luna);
