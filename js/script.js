/* =========================================================
   MUZAMMIL ZAIB — PORTFOLIO SCRIPT
   Every block is independent — safe to edit/comment out.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     1) TYPING EFFECT — HERO ROLES
     Edit the array below to change the rotating titles.
     ========================================================= */
  const roles = [
    'Software Developer',
    'Android App Developer',
    'AI-Assisted Solutions Builder',
    'Founder — Muzammil Nichari Agency'
  ];
  const typedEl = document.getElementById('typed');

  if (typedEl) {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
      const current = roles[roleIndex];

      if (!deleting) {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1600); // pause when full word shown
          return;
        }
      } else {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(typeLoop, deleting ? 45 : 90); // delete fast, type slower
    }
    typeLoop();
  }

  /* =========================================================
     2) THEME TOGGLE (dark <-> light)
     Stored in localStorage so choice persists after refresh.
     ========================================================= */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = themeToggle ? themeToggle.querySelector('i') : null;
  const htmlEl      = document.documentElement;

  // Load saved theme, or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.className = theme === 'light'
      ? 'fa-solid fa-sun'
      : 'fa-solid fa-moon';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = htmlEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      htmlEl.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
    });
  }

  /* =========================================================
     3) MOBILE MENU (hamburger)
     ========================================================= */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      // Swap icon bars <-> x
      const icon = hamburger.querySelector('i');
      if (icon) {
        icon.className = mobileMenu.classList.contains('open')
          ? 'fa-solid fa-xmark'
          : 'fa-solid fa-bars';
      }
    });

    // Close menu after clicking any link inside
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const icon = hamburger.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  /* =========================================================
     4) SMOOTH SCROLL for all in-page anchor links
     (CSS has scroll-behavior:smooth, this is a fallback)
     ========================================================= */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href.length < 2) return; // skip '#'
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* =========================================================
     5) SCROLL REVEAL ANIMATION
     Any element with class="reveal" fades up when visible.
     ========================================================= */
  const revealTargets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // animate once
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    // Fallback for very old browsers
    revealTargets.forEach(el => el.classList.add('active'));
  }

  /* =========================================================
     6) BACK-TO-TOP BUTTON
     Shows only after scrolling 400px down.
     ========================================================= */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =========================================================
     7) FOOTER YEAR
     Automatically updates the copyright year.
     ========================================================= */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     8) CONTACT FORM — FRONT-END VALIDATION ONLY
     -----------------------------------------------------
     ⚠️ This does NOT send emails by itself.
     To receive messages, use a free service like Formspree:

     1. Sign up at https://formspree.io (free tier available)
     2. Create a form → you get an endpoint like:
        https://formspree.io/f/xxxxxxxx
     3. In index.html, change the <form> tag to:
        <form ... action="https://formspree.io/f/xxxxxxxx" method="POST">
        and REMOVE novalidate to let the browser submit.
     Or, replace the block below with a fetch() call to that endpoint.

     For now, this just validates fields and shows a demo message.
     ========================================================= */
  const contactForm = document.getElementById('contactForm');
  const formNote    = document.getElementById('formNote');

  if (contactForm && formNote) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const name    = contactForm.name.value.trim();
      const email   = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      // Simple email regex
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      formNote.className = 'form-note';
      formNote.textContent = '';

      if (!name || !email || !message) {
        formNote.classList.add('error');
        formNote.textContent = 'Please fill in all fields.';
        return;
      }
      if (!emailOk) {
        formNote.classList.add('error');
        formNote.textContent = 'Please enter a valid email address.';
        return;
      }

      // DEMO ONLY — real email sending requires Formspree/backend
      formNote.classList.add('success');
      formNote.textContent =
        '✅ Validation passed. (Demo only — connect Formspree to actually send.)';

      // Optionally reset the form:
      contactForm.reset();
    });
  }

});