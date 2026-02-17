// Animaciones estables con IntersectionObserver y control de scroll
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  // Limpia hash y fuerza ir al inicio
  if (window.location.hash) {
    history.replaceState(null, ' ', window.location.pathname + window.location.search);
  }
  requestAnimationFrame(() => window.scrollTo(0, 0));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Smooth scroll en anclas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });

  const targets = document.querySelectorAll('section, .proyecto-card');

  // Si el usuario reduce movimiento, mostrar sin animar
  if (prefersReducedMotion) {
    targets.forEach((el, index) => {
      if (el.classList.contains('proyecto-card')) el.setAttribute('data-stagger-index', index);
      el.classList.add('animate-in');
      el.dataset.animated = 'true';
    });
    return;
  }

  const observerOptions = {
    threshold: 0.25,
    rootMargin: '0px 0px -20% 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      if (el.dataset.animated === 'true') {
        obs.unobserve(el);
        return;
      }

      el.dataset.animated = 'true';
      el.classList.add('animate-in');
      obs.unobserve(el);

      // Stagger para hijos marcados (si existen)
      const children = el.querySelectorAll('[data-stagger-index]');
      children.forEach((child, idx) => {
        if (child.dataset.animated === 'true') return;
        child.dataset.animated = 'true';
        setTimeout(() => child.classList.add('animate-in'), idx * 100);
      });
    });
  }, observerOptions);

  targets.forEach((el, index) => {
    el.classList.add('animate-on-scroll');
    if (el.classList.contains('proyecto-card')) {
      el.setAttribute('data-stagger-index', index);
    }
    observer.observe(el);
  });

  // Mouse spotlight effect
  const spotlight = document.querySelector('.mouse-spotlight');
  if (spotlight) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      spotlight.style.setProperty('--mouse-x', `${x}%`);
      spotlight.style.setProperty('--mouse-y', `${y}%`);
    });
  }

  // Navbar scroll effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
});
