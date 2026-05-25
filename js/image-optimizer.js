/**
 * Live Impianti — Image optimization and lazy loading
 */
(function () {
  "use strict";

  // Configuration
  const config = {
    // Lazy loading threshold (in pixels)
    rootMargin: '50px 0px',
    threshold: 0.01,
    
    // Image quality settings
    placeholderQuality: 10,
    progressiveLoad: true,
    
    // Responsive image breakpoints
    breakpoints: {
      small: 640,
      medium: 768,
      large: 1024,
      xlarge: 1280
    }
  };

  // ===== LAZY LOADING WITH INTERSECTION OBSERVER =====
  function initLazyLoading() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      loadAllImages();
      return;
    }

    const lazyImages = document.querySelectorAll('img[data-src], img[data-srcset]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Load the image
          if (img.dataset.src) {
            img.src = img.dataset.src;
            delete img.dataset.src;
          }
          
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            delete img.dataset.srcset;
          }
          
          // Add loaded class for CSS transitions
          img.classList.add('loaded');
          
          // Stop observing
          observer.unobserve(img);
        }
      });
    }, config);

    // Start observing all lazy images
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ===== FALLBACK FOR BROWSERS WITHOUT INTERSECTION OBSERVER =====
  function loadAllImages() {
    const lazyImages = document.querySelectorAll('img[data-src], img[data-srcset]');
    
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        delete img.dataset.src;
      }
      
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
        delete img.dataset.srcset;
      }
      
      img.classList.add('loaded');
    });
  }

  // ===== IMAGE PLACEHOLDER GENERATION =====
  function generatePlaceholder(width, height, color = '#f5f0e8') {
    // Create a simple SVG placeholder
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#4a5c4e" font-family="Outfit, sans-serif" font-size="14">Loading...</text>
    </svg>`;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  // ===== RESPONSIVE IMAGE HANDLING =====
  function initResponsiveImages() {
    // This would typically be handled server-side
    // For now, we'll add responsive attributes to existing images
    const portfolioImages = document.querySelectorAll('.project-card img, .project-featured-img img');
    
    portfolioImages.forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Add decoding attribute for better performance
      img.setAttribute('decoding', 'async');
      
      // Add sizes attribute for responsive images
      if (!img.hasAttribute('sizes')) {
        img.setAttribute('sizes', '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw');
      }
    });
  }

  // ===== IMAGE LOADING STATE MANAGEMENT =====
  function initImageLoadingStates() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      const isCritical = img.id === 'hero-img' || img.getAttribute('loading') === 'eager';
      if (!isCritical) {
        img.classList.add('loading');
      }
      
      // Remove loading class when image loads
      img.addEventListener('load', function() {
        this.classList.remove('loading');
        this.classList.add('loaded');
      });
      
      // Handle image errors
      img.addEventListener('error', function() {
        this.classList.remove('loading');
        this.classList.add('error');
        
        // Set a fallback image
        if (!this.hasAttribute('data-fallback-set')) {
          this.src = generatePlaceholder(
            this.width || 400,
            this.height || 300,
            '#e8f4ec'
          );
          this.setAttribute('data-fallback-set', 'true');
        }
      });

      if (img.complete) {
        if (img.naturalWidth > 0) {
          img.classList.remove('loading');
          img.classList.add('loaded');
        } else {
          img.classList.remove('loading');
          img.classList.add('error');
        }
      }
    });
  }

  // ===== PERFORMANCE MONITORING =====
  function initPerformanceMonitoring() {
    // Monitor Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        console.log('LCP candidate:', lastEntry.startTime, 'URL:', lastEntry.url);
        
        // You could send this data to analytics
        // sendToAnalytics('lcp', lastEntry.startTime);
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }
    
    // Monitor First Contentful Paint (FCP)
    if ('PerformanceObserver' in window) {
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        console.log('FCP:', entries[0].startTime);
      });
      
      fcpObserver.observe({ entryTypes: ['paint'] });
    }
  }

  // ===== INITIALIZE ALL IMAGE OPTIMIZATIONS =====
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    // Initialize all image optimization systems
    initLazyLoading();
    initResponsiveImages();
    initImageLoadingStates();
    
    // Optional: Initialize performance monitoring
    // initPerformanceMonitoring();
    
    console.log('Image optimization initialized');
  }

  // Start everything
  init();

})();
