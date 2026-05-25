/**
 * Live Impianti — Advanced animations and interactions
 */
(function () {
  "use strict";

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  if (prefersReducedMotion) {
    return; // Skip all animations if user prefers reduced motion
  }

  // ===== NUMBER COUNTING ANIMATION =====
  function animateNumbers() {
    const numberElements = document.querySelectorAll('.numero-val');
    
    numberElements.forEach(element => {
      const finalValue = parseInt(element.textContent.replace('+', '').replace('%', ''));
      const duration = 2000; // 2 seconds
      const stepTime = 20; // update every 20ms
      const steps = duration / stepTime;
      const increment = finalValue / steps;
      let currentValue = 0;
      
      const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
          element.textContent = finalValue + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
          clearInterval(counter);
          
          // Add animated class to parent for underline animation
          const parentItem = element.closest('.numero-item');
          if (parentItem) {
            parentItem.classList.add('animated');
          }
        } else {
          element.textContent = Math.floor(currentValue) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
        }
      }, stepTime);
    });
  }

  // ===== SCROLL REVEAL FOR SECTIONS =====
  function initScrollReveal() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          
          // Add animated class to specific elements within section
          if (section.classList.contains('numeri-section')) {
            // Trigger number counting animation
            setTimeout(animateNumbers, 300);
          }
          
          if (section.classList.contains('metodo-section')) {
            const stepsContainer = section.querySelector('.metodo-steps');
            if (stepsContainer) {
              setTimeout(() => {
                stepsContainer.classList.add('animated');
              }, 500);
            }
          }
          
          if (section.classList.contains('cta-section')) {
            const ctaInner = section.querySelector('.cta-inner');
            if (ctaInner) {
              setTimeout(() => {
                ctaInner.classList.add('animated');
              }, 300);
            }
          }
          
          if (section.classList.contains('contact-section')) {
            const contactInfo = section.querySelector('.contact-info');
            if (contactInfo) {
              setTimeout(() => {
                contactInfo.classList.add('animated');
              }, 400);
            }
          }
          
          // Unobserve after animation
          observer.unobserve(section);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
      observer.observe(section);
    });
  }

  // ===== HOVER EFFECTS ENHANCEMENT =====
  function initHoverEffects() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-ghost, .btn-more');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
      });
    });
    
    // Enhanced card hover effects
    const cards = document.querySelectorAll('.project-card, .servizio-card, .testi-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = ((x - centerX) / centerX) * 2;
        const rotateX = ((centerY - y) / centerY) * 2;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  }

  // ===== PARALLAX EFFECT FOR HERO =====
  function initParallax() {
    const heroVisual = document.querySelector('.hero-visual img');
    
    if (!heroVisual) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      heroVisual.style.transform = `scale(1.1) translateY(${rate}px)`;
    });
  }

  // ===== FORM INPUT ANIMATIONS =====
  function initFormAnimations() {
    const formInputs = document.querySelectorAll('.f-input, .f-select, .f-textarea');
    
    formInputs.forEach(input => {
      // Add focus effect
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        if (!this.value) {
          this.parentElement.classList.remove('focused');
        }
      });
      
      // Add floating label effect if empty
      if (!input.value) {
        input.addEventListener('input', function() {
          if (this.value) {
            this.parentElement.classList.add('has-value');
          } else {
            this.parentElement.classList.remove('has-value');
          }
        });
      }
    });
  }

  // ===== INITIALIZE ALL ANIMATIONS =====
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    // Initialize all animation systems
    initScrollReveal();
    initHoverEffects();
    initParallax();
    initFormAnimations();
    
    // Add CSS variables for advanced effects
    document.documentElement.style.setProperty('--scroll-progress', '0');
    
    // Update scroll progress variable
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollTop / docHeight;
      
      document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
    });
  }

  // Start everything
  init();

})();