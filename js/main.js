/* ═══════════════════════════════════════════
   ANSARI MANTASHA — PORTFOLIO JS
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Loader ── */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 1200);
  });

  /* ── Year ── */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── Custom Cursor ── */
  const cursor     = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursorTrail');
  let trailX = 0, trailY = 0, curX = 0, curY = 0;

  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', e => {
      curX = e.clientX; curY = e.clientY;
      cursor.style.transform = `translate(${curX}px, ${curY}px)`;
    });
    function animateTrail() {
      trailX += (curX - trailX) * 0.12;
      trailY += (curY - trailY) * 0.12;
      if (cursorTrail) cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px)`;
      requestAnimationFrame(animateTrail);
    }
    animateTrail();
    document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(2)';
        if (cursorTrail) cursorTrail.style.opacity = '0';
      });
      el.addEventListener('mouseleave', () => {
        if (cursorTrail) cursorTrail.style.opacity = '0.5';
      });
    });
  }

  /* ── Navbar scroll ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveNav() {
    const scrollY = window.scrollY;
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', setActiveNav, { passive: true });

  /* ── Hamburger / Mobile Menu ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });
  mobileClose?.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-nav-link').forEach(l => {
    l.addEventListener('click', closeMenu);
  });

  /* ── Resume Nav Dropdown ── */
  const resumeDropdown = document.getElementById('resumeDropdown');
  const resumeNavBtn   = document.getElementById('resumeNavBtn');

  resumeNavBtn?.addEventListener('click', e => {
    e.stopPropagation();
    resumeDropdown.classList.toggle('open');
  });
  document.addEventListener('click', () => {
    resumeDropdown?.classList.remove('open');
  });

  /* ── Smooth Scroll for anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── Typed Text Effect ── */
  const typedEl = document.getElementById('typedText');
  const phrases = [
    'Cloud & DevOps Trainer',
    'AWS Practitioner',
    'Infrastructure Enthusiast',
    'Kubernetes Explorer',
    'Terraform Builder',
  ];
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function type() {
    if (!typedEl) return;
    const current = phrases[phraseIdx];
    typedEl.textContent = deleting
      ? current.slice(0, charIdx--)
      : current.slice(0, charIdx++);

    let speed = deleting ? 40 : 80;
    if (!deleting && charIdx > current.length) {
      speed = 2000; deleting = true;
    } else if (deleting && charIdx < 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      charIdx = 0; speed = 400;
    }
    setTimeout(type, speed);
  }
  type();

  /* ── Scroll-triggered Animations (AOS-lite) ── */
  const animEls = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animEls.forEach(el => observer.observe(el));

  /* ── Skill bar animation ── */
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          fill.classList.add('animated');
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillsGrid = document.getElementById('skillsGrid');
  if (skillsGrid) skillObserver.observe(skillsGrid);

  /* ── Skill Filter ── */
  const skillFilters = document.querySelectorAll('.skill-filter');
  const skillCards   = document.querySelectorAll('.skill-card');

  skillFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      skillCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });

  /* ── Projects Tab Filter ── */
  const projTabs  = document.querySelectorAll('.proj-tab');
  const projCards = document.querySelectorAll('.project-card');

  projTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      projTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.tab;
      projCards.forEach(card => {
        const show = filter === 'all' || card.dataset.tab === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });

  /* ── Contact Form ── */
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit span');
    const orig = btn.textContent;
    btn.textContent = 'Message Sent! ✓';
    contactForm.style.opacity = '0.7';
    setTimeout(() => {
      btn.textContent = orig;
      contactForm.style.opacity = '1';
      contactForm.reset();
    }, 3000);
  });

  /* ── Back to Top ── */
  const backTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backTop?.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Terminal typing effect (hero card) ── */
  // Lines already rendered in HTML — static for performance

});
