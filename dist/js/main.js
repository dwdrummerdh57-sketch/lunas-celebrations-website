/* Extracted from the approved original; reorganized for this portable edition. */
(L => {
  "use strict";

  L.applyBusinessShell();
  L.initNavigation();
  L.initShop();
  L.initInquiry();
  L.$("#year").textContent = new Date().getFullYear();
  L.render();
})(window.Luna);
