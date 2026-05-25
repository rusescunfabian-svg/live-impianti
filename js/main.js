/**
 * Live Impianti — nav mobile, scroll reveal, header on scroll
 */
(function () {
  "use strict";

  var toggle = document.getElementById("nav-toggle");
  var mobileNav = document.getElementById("nav-mobile");
  var header = document.getElementById("header");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("hidden") === false;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.add("hidden");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (header) {
    var lastScrollTop = 0;
    var isMobile = window.innerWidth <= 768;
    
    window.addEventListener(
      "scroll",
      function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (isMobile) {
          if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 0.3s ease';
          } else {
            header.style.transform = 'translateY(0)';
            header.style.transition = 'transform 0.3s ease';
          }
        }
        
        header.classList.toggle("shadow-lg", scrollTop > 24);
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      },
      { passive: true }
    );
    
    window.addEventListener('resize', function() {
      isMobile = window.innerWidth <= 768;
    });
  }

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll("[data-reveal]");

  if (prefersReduced) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else if (revealEls.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
