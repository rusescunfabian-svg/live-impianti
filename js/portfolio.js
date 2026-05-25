/**
 * Portfolio: grande a sinistra + 4 piccole + banda scroll + lightbox
 */
(function () {
  "use strict";

  var items = window.PORTFOLIO_ITEMS;
  var thumbsEl = document.getElementById("portfolio-thumbs");
  var heroEl = document.getElementById("portfolio-hero");
  var stripEl = document.getElementById("portfolio-strip");
  var galleryBtn = document.getElementById("portfolio-gallery-btn");
  var countEl = document.getElementById("portfolio-count");

  if (!items || !items.length || !thumbsEl || !heroEl) return;

  var HERO_INDEX = 7;
  var THUMB_INDICES = [0, 1, 8, 14];

  var lightbox = null;
  var lightboxImg = null;
  var lightboxTitle = null;
  var lightboxDesc = null;
  var lightboxCounter = null;
  var currentIndex = 0;
  var lastFocus = null;

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/"/g, "&quot;");
  }

  function isShowcase(index) {
    if (index === HERO_INDEX) return true;
    for (var i = 0; i < THUMB_INDICES.length; i++) {
      if (THUMB_INDICES[i] === index) return true;
    }
    return false;
  }

  function buildVisual(item, index, mode) {
    var src = "assets/progetti/" + item.file;
    var compact = mode === "strip";
    var extraClass =
      mode === "thumb"
        ? " portfolio-item__visual--thumb"
        : mode === "hero"
          ? " portfolio-item__visual--hero"
          : " portfolio-item__visual--strip";

    var meta = compact
      ? '<span class="portfolio-strip__title">' + escapeHtml(item.title) + "</span>"
      : "";

    return (
      '<button type="button" class="portfolio-item__visual' +
      extraClass +
      '" data-index="' +
      index +
      '" aria-label="Apri: ' +
      escapeAttr(item.title) +
      '">' +
      '<div class="portfolio-item__frame">' +
      '<img src="' +
      src +
      '" alt="' +
      escapeAttr(item.alt) +
      '" width="800" height="600" loading="lazy" decoding="async">' +
      '<div class="portfolio-item__overlay" aria-hidden="true">' +
      '<span class="portfolio-item__overlay-title">' +
      escapeHtml(item.title) +
      "</span>" +
      "</div>" +
      "</div>" +
      meta +
      "</button>"
    );
  }

  function buildCard(item, index, mode) {
    var article = document.createElement("article");
    var modClass =
      mode === "strip" ? "strip" : mode === "thumb" ? "thumb" : "hero";
    article.className = "portfolio-item portfolio-item--" + modClass;
    article.innerHTML = buildVisual(item, index, mode);
    return article;
  }

  function createLightbox() {
    lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Galleria progetti");
    lightbox.hidden = true;
    lightbox.innerHTML =
      '<div class="lightbox__backdrop" data-close></div>' +
      '<div class="lightbox__panel">' +
      '<button type="button" class="lightbox__close" data-close aria-label="Chiudi">&times;</button>' +
      '<button type="button" class="lightbox__nav lightbox__nav--prev" aria-label="Precedente">&#8249;</button>' +
      '<figure class="lightbox__figure">' +
      '<img class="lightbox__img" src="" alt="">' +
      '<figcaption class="lightbox__caption">' +
      '<p class="lightbox__counter"></p>' +
      '<h3 class="lightbox__title"></h3>' +
      '<p class="lightbox__desc"></p>' +
      "</figcaption>" +
      "</figure>" +
      '<button type="button" class="lightbox__nav lightbox__nav--next" aria-label="Successivo">&#8250;</button>' +
      '<div class="lightbox__touch-nav">' +
      '<button type="button" class="lightbox__touch-btn lightbox__touch-btn--prev" aria-label="Foto precedente">&#8249; Precedente</button>' +
      '<span class="lightbox__touch-counter" aria-live="polite"></span>' +
      '<button type="button" class="lightbox__touch-btn lightbox__touch-btn--next" aria-label="Foto successiva">Successivo &#8250;</button>' +
      "</div>" +
      '<p class="lightbox__swipe-hint">Scorri a sinistra o a destra per vedere tutte le foto</p>' +
      "</div>";
    document.body.appendChild(lightbox);
    lightboxImg = lightbox.querySelector(".lightbox__img");
    lightboxTitle = lightbox.querySelector(".lightbox__title");
    lightboxDesc = lightbox.querySelector(".lightbox__desc");
    lightboxCounter = lightbox.querySelector(".lightbox__counter");

    lightbox.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", closeLightbox);
    });
    lightbox.querySelector(".lightbox__nav--prev").addEventListener("click", function () {
      showIndex(currentIndex - 1);
    });
    lightbox.querySelector(".lightbox__nav--next").addEventListener("click", function () {
      showIndex(currentIndex + 1);
    });
    lightbox.querySelector(".lightbox__touch-btn--prev").addEventListener("click", function () {
      showIndex(currentIndex - 1);
    });
    lightbox.querySelector(".lightbox__touch-btn--next").addEventListener("click", function () {
      showIndex(currentIndex + 1);
    });

    var touchStartX = 0;
    var touchStartY = 0;
    lightbox.addEventListener(
      "touchstart",
      function (e) {
        if (lightbox.hidden || !e.touches.length) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      },
      { passive: true }
    );
    lightbox.addEventListener(
      "touchend",
      function (e) {
        if (lightbox.hidden || !e.changedTouches.length) return;
        var dx = e.changedTouches[0].clientX - touchStartX;
        var dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
        if (dx < 0) showIndex(currentIndex + 1);
        else showIndex(currentIndex - 1);
      },
      { passive: true }
    );
  }

  function showIndex(i) {
    var n = items.length;
    currentIndex = ((i % n) + n) % n;
    var item = items[currentIndex];
    lightboxImg.src = "assets/progetti/" + item.file;
    lightboxImg.alt = item.alt;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.description;
    var counterText = currentIndex + 1 + " / " + n;
    if (lightboxCounter) {
      lightboxCounter.textContent = counterText;
    }
    var touchCounter = lightbox && lightbox.querySelector(".lightbox__touch-counter");
    if (touchCounter) {
      touchCounter.textContent = counterText;
    }
  }

  function openLightbox(index) {
    if (!lightbox) createLightbox();
    lastFocus = document.activeElement;
    showIndex(index);
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    lightbox.querySelector(".lightbox__close").focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    lightboxImg.removeAttribute("src");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener("keydown", function (e) {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showIndex(currentIndex - 1);
    if (e.key === "ArrowRight") showIndex(currentIndex + 1);
  });

  if (items[HERO_INDEX]) {
    heroEl.appendChild(buildCard(items[HERO_INDEX], HERO_INDEX, "hero"));
  }

  THUMB_INDICES.forEach(function (idx) {
    if (items[idx]) {
      thumbsEl.appendChild(buildCard(items[idx], idx, "thumb"));
    }
  });

  if (stripEl) {
    items.forEach(function (item, index) {
      if (!isShowcase(index)) {
        stripEl.appendChild(buildCard(item, index, "strip"));
      }
    });
  }

  if (countEl) {
    countEl.textContent = "(" + items.length + ")";
  }

  if (galleryBtn) {
    galleryBtn.addEventListener("click", function () {
      openLightbox(0);
    });
  }

  function bindClicks(root) {
    if (!root) return;
    root.addEventListener("click", function (e) {
      var btn = e.target.closest(".portfolio-item__visual");
      if (!btn) return;
      openLightbox(parseInt(btn.getAttribute("data-index"), 10));
    });
  }

  bindClicks(thumbsEl);
  bindClicks(heroEl);
  bindClicks(stripEl);
})();
