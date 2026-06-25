/* ============================================
   SANTOS 360 TECH SOLUTIONS — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add(
        'bg-brand-900/80',
        'backdrop-blur-xl',
        'border-b',
        'border-white/5',
        'shadow-lg'
      );
    } else {
      navbar.classList.remove(
        'bg-brand-900/80',
        'backdrop-blur-xl',
        'border-b',
        'border-white/5',
        'shadow-lg'
      );
    }
  };

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // Run once on load

  // ---------- Mobile Menu Toggle ----------
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // ---------- Reveal on Scroll (Intersection Observer) ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- Animated Counters ----------
  const counters = document.querySelectorAll('[data-count]');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count);
    let current = 0;
    const increment = target / 60;
    const suffix = target === 99 ? '%' : '+';

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 25);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ---------- Contact Form Submission ----------
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (form && success) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // TODO: Integrate with your backend / email service
      // Examples: Formspree, EmailJS, Netlify Forms, or custom API

      success.classList.remove('hidden');
      form.reset();

      // Hide success message after 6 seconds
      setTimeout(() => {
        success.classList.add('hidden');
      }, 6000);
    });
  }

  // ---------- Smooth Scroll for Anchor Links (fallback) ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});