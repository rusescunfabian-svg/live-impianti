/**
 * Live Impianti — Mobile menu functionality
 */
(function () {
  "use strict";

  // ===== MOBILE MENU TOGGLE =====
  function initMobileMenu() {
    const hamButton = document.querySelector('.ham');
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    
    if (!hamButton || !nav) return;
    
    // Create mobile menu overlay
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(14, 26, 16, 0.98);
      backdrop-filter: blur(20px);
      z-index: 999;
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px 20px;
    `;
    
    // Clone navigation for mobile
    const mobileNav = nav.cloneNode(true);
    mobileNav.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
      width: 100%;
      max-width: 400px;
    `;
    
    // Style mobile nav links
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.style.cssText = `
        color: white;
        font-size: 1.2rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        padding: 12px 24px;
        width: 100%;
        text-align: center;
        border-radius: 8px;
        transition: all 0.3s ease;
      `;
      
      link.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(184, 147, 58, 0.2)';
        this.style.color = 'var(--gold-light)';
      });
      
      link.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
        this.style.color = 'white';
      });
    });
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '✕';
    closeButton.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      background: transparent;
      border: none;
      color: white;
      font-size: 2rem;
      cursor: pointer;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    mobileMenu.appendChild(closeButton);
    mobileMenu.appendChild(mobileNav);
    document.body.appendChild(mobileMenu);
    
    // Toggle menu function
    function toggleMenu() {
      const isOpen = mobileMenu.style.display === 'flex';
      
      if (isOpen) {
        mobileMenu.style.display = 'none';
        document.body.style.overflow = 'auto';
        hamButton.classList.remove('active');
      } else {
        mobileMenu.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        hamButton.classList.add('active');
      }
    }
    
    // Add hamburger animation
    hamButton.addEventListener('click', toggleMenu);
    closeButton.addEventListener('click', toggleMenu);
    
    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) {
        toggleMenu();
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.style.display === 'flex') {
        toggleMenu();
      }
    });
    
    // Update hamburger animation
    hamButton.classList.add('ham-animated');
  }

  // ===== TOUCH GESTURES =====
  function initTouchGestures() {
    // Prevent zoom on double-tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
    
    // Improve scrolling on iOS
    document.addEventListener('touchmove', function(event) {
      if (event.scale !== 1) {
        event.preventDefault();
      }
    }, { passive: false });
  }

  // ===== MOBILE FORM OPTIMIZATIONS =====
  function initMobileForms() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
      // Increase font size for better readability
      input.style.fontSize = '16px';
      
      // Prevent zoom on focus (iOS)
      input.addEventListener('focus', function() {
        this.style.fontSize = '16px';
      });
    });
  }

  // ===== INITIALIZE ALL MOBILE OPTIMIZATIONS =====
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    // Initialize all mobile optimization systems
    initMobileMenu();
    initTouchGestures();
    initMobileForms();
    
    console.log('Mobile optimizations initialized');
  }

  // Start everything
  init();

})();