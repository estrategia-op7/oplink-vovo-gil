/* ==========================================================================
   MAIN JAVASCRIPT — VOVÔ GIL (OPLINK OFICIAL)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAnalyticsTracking();
  initCarousel();
});

/**
 * GA4 / Analytics CTA Click Event Tracking
 */
function initAnalyticsTracking() {
  const trackableLinks = document.querySelectorAll('a[id^="btn-"], .dish-slide');
  
  trackableLinks.forEach(link => {
    link.addEventListener('click', () => {
      const linkId = link.getAttribute('id') || 'dish-item';
      const linkLabel = link.querySelector('.btn-title, .dish-name')?.textContent?.trim() || linkId;
      
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'cta_click', {
          'cta_id': linkId,
          'cta_label': linkLabel,
          'page_location': window.location.href
        });
      }
    });
  });
}

/**
 * Carrossel Destaques do Cardápio
 */
function initCarousel() {
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dots = document.querySelectorAll('#carousel-dots .carousel-dot');

  if (!track) return;

  const slides = track.querySelectorAll('.dish-slide');
  if (!slides.length) return;

  function updateActiveDot() {
    const scrollLeft = track.scrollLeft;
    const slideWidth = slides[0].offsetWidth + 12; // slide width + gap
    const activeIndex = Math.round(scrollLeft / slideWidth);

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  }

  track.addEventListener('scroll', updateActiveDot, { passive: true });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const slideWidth = slides[0].offsetWidth + 12;
      track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const slideWidth = slides[0].offsetWidth + 12;
      track.scrollBy({ left: slideWidth, behavior: 'smooth' });
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const slideWidth = slides[0].offsetWidth + 12;
      track.scrollTo({ left: index * slideWidth, behavior: 'smooth' });
    });
  });
}

