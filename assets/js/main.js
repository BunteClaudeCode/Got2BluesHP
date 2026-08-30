/* Got2Blues — small progressive-enhancement helpers: mobile nav, photo
   lightbox, and a no-backend contact form that opens a prefilled email. */

document.addEventListener("DOMContentLoaded", function () {
  initNav();
  initLightbox();
  initContactForm();
  setFooterYear();
});

function initNav() {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  nav.querySelectorAll(".nav__link").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initLightbox() {
  var triggers = document.querySelectorAll("[data-lightbox-trigger]");
  var lightbox = document.getElementById("lightbox");
  if (!triggers.length || !lightbox) return;

  var stage = lightbox.querySelector("[data-lightbox-stage]");
  var caption = lightbox.querySelector("[data-lightbox-caption]");
  var closeBtn = lightbox.querySelector(".lightbox__close");

  function open(trigger) {
    var source = trigger.querySelector("img, svg");
    stage.innerHTML = source ? source.outerHTML : "";
    caption.textContent = trigger.getAttribute("data-caption") || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    stage.innerHTML = "";
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () { open(trigger); });
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) close();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") close();
  });
}

function initContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("form-status");
  var contactEmail = form.getAttribute("data-contact-email") || "booking@got2blues.example";

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = form.elements["name"].value.trim();
    var email = form.elements["email"].value.trim();
    var message = form.elements["message"].value.trim();

    if (!name || !email || !message) {
      status.textContent = "Bitte alle Felder ausfüllen.";
      return;
    }

    var subject = "Anfrage über die Website von " + name;
    var body = message + "\n\n---\nName: " + name + "\nE-Mail: " + email;
    var mailto =
      "mailto:" + encodeURIComponent(contactEmail) +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    window.location.href = mailto;
    status.textContent = "Dein E-Mail-Programm sollte sich gleich öffnen …";
  });
}

function setFooterYear() {
  var el = document.getElementById("current-year");
  if (el) el.textContent = new Date().getFullYear();
}
