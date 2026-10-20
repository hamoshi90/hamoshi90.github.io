/* Static, privacy-conscious catalog interactions. No network requests or storage. */
(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('site-navigation');
  if (menuButton && menu) {
    function closeMenu() {
      menu.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menu.classList.toggle('is-open', !expanded);
      menuButton.setAttribute('aria-expanded', String(!expanded));
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.tool-card');
  const emptyState = document.querySelector('.empty-state');
  filters.forEach(filter => filter.addEventListener('click', () => {
    const category = filter.dataset.filter;
    let visible = 0;
    cards.forEach(card => {
      const match = category === 'all' || card.dataset.category === category;
      card.hidden = !match;
      if (match) visible++;
    });
    filters.forEach(b => {
      const active = b === filter;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    if (emptyState) emptyState.hidden = visible !== 0;
  }));
})();
