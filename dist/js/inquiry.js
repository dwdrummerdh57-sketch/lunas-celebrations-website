/* Extracted from the approved original; reorganized for this portable edition. */
(L => {
  "use strict";

  L.validateCurrentStep = function () {
    const step = document.querySelector('[data-step="' + L.inquiryStep + '"]');
    if (!step) return true;
    for (const input of step.querySelectorAll("input,select,textarea")) {
      if (["text", "email", "tel", "textarea"].includes(input.type)) input.value = input.value.trim();
      if (!input.checkValidity()) {
        input.reportValidity();
        return false;
      }
    }
    return true;
  };
  L.changeInquiryStep = function (direction) {
    if (direction > 0 && !L.validateCurrentStep()) return;
    L.inquiryStep = Math.max(0, Math.min(2, L.inquiryStep + direction));
    document.querySelectorAll("[data-step]").forEach((x, i) => x.hidden = i !== L.inquiryStep);
    document.querySelectorAll("[data-progress]").forEach((x, i) => {
      x.removeAttribute("aria-current");
      if (i === L.inquiryStep) x.setAttribute("aria-current", "step");
      x.classList.toggle("complete", i < L.inquiryStep);
    });
    L.$("#previous-step").hidden = L.inquiryStep === 0;
    L.$("#next-step").hidden = L.inquiryStep === 2;
    L.$("#submit-inquiry").hidden = L.inquiryStep !== 2;
    L.$("#step-label").textContent = "Step " + (L.inquiryStep + 1) + " of 3";
    L.$("#next-step").innerHTML = L.businessText(L.inquiryStep === 0 ? "Your Event <span>→</span>" : "The Inspiration <span>→</span>");
    document.querySelector('[data-step="' + L.inquiryStep + '"] input, [data-step="' + L.inquiryStep + '"] select, [data-step="' + L.inquiryStep + '"] textarea')?.focus({
      preventScroll: true
    });
  };
  L.syncContactPreference = function () {
    const phone = L.$('[name="contact-method"]').value === "phone";
    L.$('[name="email"]').required = !phone;
    L.$('[name="phone"]').required = phone;
    L.$("#email-label").textContent = phone ? "Email address (optional)" : "Email address *";
    L.$("#phone-label").textContent = phone ? "Phone number *" : "Phone number (optional)";
  };
  L.clearInspiration = function () {
    const input = L.$('[name="inspiration"]');
    input.value = "";
    input.setCustomValidity("");
    L.$("#file-feedback").textContent = "Image cleared. You can continue without an image.";
    L.$("#clear-inspiration").hidden = true;
  };
  L.validateFile = function () {
    const input = L.$('[name="inspiration"]'),
      file = input.files[0];
    if (!file) {
      input.setCustomValidity("");
      L.$("#file-feedback").textContent = "";
      L.$("#clear-inspiration").hidden = true;
      return true;
    }
    const allowed = ["image/jpeg", "image/png", "image/webp"].includes(file.type) && file.size <= 5 * 1024 * 1024;
    const message = allowed ? "Image selected locally. Nothing has been uploaded." : "Choose a JPG, PNG or WebP image under 5 MB, or clear the selection to continue without an image.";
    input.setCustomValidity(allowed ? "" : message);
    L.$("#file-feedback").textContent = message;
    L.$("#clear-inspiration").hidden = false;
    return allowed;
  };
  L.inquiry = function (e) {
    e.preventDefault();
    if (L.inquiryStep < 2) {
      L.changeInquiryStep(1);
      return;
    }
    if (!L.validateCurrentStep() || !L.validateFile()) return;
    L.$("#form-area").innerHTML = L.businessText(`<div class="success" tabindex="-1"><p class="eyebrow">PREVIEW COMPLETE</p><h2>Your event idea is<br>ready for a conversation.</h2><p>This is a demonstration confirmation. Your information and image were not sent or saved, and no booking has been made.</p><p>On the finished site, the team would receive your inquiry and discuss your vision, availability and next steps. Response times will be confirmed by the owners.</p><p>To make a real inquiry now, please call Luna’s Luxury Events HTX.</p><div class="actions"><a class="button dark" href="tel:+16618605930">Call 661-860-5930 ↗</a><button class="button" id="reset-inquiry">Try the form again</button></div></div>`);
    L.$(".success").focus();
    L.$("#reset-inquiry").onclick = () => L.render();
  };
  L.initInquiry = function () {
    document.addEventListener("click", e => {
      const b = e.target.closest("button,a");
      if (!b) return;
      if (b.id === "clear-inspiration") L.clearInspiration();
      if (b.id === "next-step") L.changeInquiryStep(1);
      if (b.id === "previous-step") L.changeInquiryStep(-1);
    });
  };
})(window.Luna);
