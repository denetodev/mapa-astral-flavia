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


/**
 * Carrossel infinito de mensagens (assets/depoimentos.js alimenta window.DEPOIMENTOS).
 * Gera os cards a partir dos dados, duplica o conteúdo o suficiente pra rolagem
 * nunca "acabar" e calcula a duração da animação pra manter velocidade constante
 * não importa quantas mensagens existam.
 */
(function () {
  'use strict';

  const track = document.querySelector('[data-messages-track]');
  const viewport = track ? track.closest('.messages__viewport') : null;
  const depoimentos = window.DEPOIMENTOS || [];

  if (!track || !viewport || !depoimentos.length) {
    return;
  }

  function buildCard(item) {
    const card = document.createElement('article');
    card.className = 'message-card';

    const name = document.createElement('p');
    name.className = 'message-card__name';
    name.textContent = item.nome;

    const text = document.createElement('p');
    text.className = 'message-card__text';
    text.textContent = item.texto;

    card.append(name, text);
    return card;
  }

  depoimentos.forEach((item) => track.appendChild(buildCard(item)));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Sem animação: vira uma lista com rolagem horizontal manual (ver CSS).
    return;
  }

  const PX_PER_SECOND = 45;
  const minWidth = viewport.clientWidth * 1.4;

  let guard = 0;
  while (track.scrollWidth < minWidth && guard < 30) {
    depoimentos.forEach((item) => track.appendChild(buildCard(item)));
    guard += 1;
  }

  // Clona o conjunto atual pra formar a segunda metade — com isso, animar de
  // 0 até -50% do track sempre fecha o loop sem deixar espaço em branco.
  const currentCards = Array.from(track.children);
  currentCards.forEach((card) => track.appendChild(card.cloneNode(true)));

  const halfWidth = track.scrollWidth / 2;
  const duration = Math.max(halfWidth / PX_PER_SECOND, 12);
  track.style.setProperty('--messages-duration', duration + 's');
  track.classList.add('is-animated');
})();
