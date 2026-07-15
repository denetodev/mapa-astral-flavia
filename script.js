/**
 * Landing Page — Mapa Astral da Flávia
 * Equipe DIMAC/CRM · Banco do Brasil
 *
 * Interações mínimas: apenas reveal-on-scroll das seções.
 * Todo o resto (estrelas, roda zodiacal, floating) é CSS puro.
 */

(function () {
  'use strict';

  // Respeita a preferência de movimento reduzido do sistema
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Se o usuário prefere pouco movimento, revela tudo imediatamente e sai.
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // IntersectionObserver — revela quando a seção entra na viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -80px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();
