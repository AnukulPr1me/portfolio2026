/* ============================================================
   main.js — Portfolio Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

// ── Dark / Light Mode ─────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');

// Restore saved preference (default: dark)
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
if (savedTheme === 'light') document.body.classList.add('light');

function toggleTheme() {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
}

themeToggle.addEventListener('click', toggleTheme);
themeToggle.addEventListener('touchend', (e) => { e.preventDefault(); toggleTheme(); });

// ── Custom Cursor ─────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top  = my - 6 + 'px';
});

function animateRing() {
  rx += (mx - rx - 18) * 0.12;
  ry += (my - ry - 18) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .project-card, .skill-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    ring.style.transform   = 'scale(1.5)';
    ring.style.opacity     = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    ring.style.transform   = 'scale(1)';
    ring.style.opacity     = '0.5';
  });
});

// ── Scroll Reveal ─────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Skill Bars ────────────────────────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-grid').forEach(el => skillObserver.observe(el));

// ── Nav Active State ──────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--accent)'
      : '';
  });
});

// ── Contact Form ──────────────────────────────────────────
const form      = document.getElementById('contactForm');
const statusEl  = document.getElementById('form-status');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled    = true;
  submitBtn.textContent = 'Sending...';
  statusEl.style.display = 'none';

  const data = {
    name:      form.name.value.trim(),
    email:     form.email.value.trim(),
    subject:   form.subject.value,
    message:   form.message.value.trim(),
    timestamp: new Date().toISOString()
  };

  try {
    // ── Replace with your live backend URL if deployed elsewhere ──
    const res = await fetch('/api/contact', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data)
    });

    if (res.ok) {
      statusEl.className    = 'success';
      statusEl.textContent  = '✓ Message sent! I\'ll get back to you soon.';
      statusEl.style.display = 'block';
      form.reset();
    } else {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Server error');
    }
  } catch (err) {
    statusEl.className = 'error';
    statusEl.textContent = '✗ ' + (
      err.message === 'Failed to fetch'
        ? 'Cannot connect to server. Make sure server.js is running.'
        : err.message
    );
    statusEl.style.display = 'block';
  } finally {
    submitBtn.disabled    = false;
    submitBtn.textContent = 'Send Message';
  }
});

// ── Hamburger Menu ────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden'; // prevent scroll behind menu
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close when a menu link is clicked
  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

}); // end DOMContentLoaded