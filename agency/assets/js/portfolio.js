document.querySelectorAll('[data-portfolio]').forEach(collection => {
  const cards = [...collection.querySelectorAll('[data-portfolio-card]')];
  const buttons = [...collection.querySelectorAll('[data-portfolio-filter]')];
  buttons.forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.portfolioFilter;
    buttons.forEach(item => { const selected = item === button; item.classList.toggle('active', selected); item.setAttribute('aria-pressed', String(selected)); });
    cards.forEach(card => card.hidden = key !== 'all' && card.dataset.category !== key && card.dataset.kind !== key);
    collection.querySelectorAll('[data-portfolio-group]').forEach(group => {
      const count = [...group.querySelectorAll('[data-portfolio-card]')].filter(card => !card.hidden).length;
      group.hidden = !count;
      group.querySelector('.portfolio-group-count').textContent = count + '개';
    });
    const visible = cards.filter(card => !card.hidden), complete = visible.filter(card => card.dataset.kind === 'site').length;
    collection.querySelector('[data-portfolio-count]').textContent = `${visible.length}개 프로젝트 · 완성 사이트 ${complete}개 / 디자인 시안 ${visible.length - complete}개`;
  }));
});
