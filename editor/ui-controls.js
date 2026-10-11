/* Presentation layer: preserve native commands and keep controls accessible. */
(() => {
  const paths = {
    left: 'M4 5h16M4 10h10M4 15h16M4 20h10',
    center: 'M4 5h16M7 10h10M4 15h16M7 20h10',
    right: 'M4 5h16M10 10h10M4 15h16M10 20h10',
    undo: 'M9 5L4 10l5 5M4 10h10a6 6 0 010 12',
    redo: 'M15 5l5 5-5 5M20 10H10a6 6 0 000 12',
    pick: 'M5 3l14 9-7 2-3 7z',
    desktop: 'M3 4h18v13H3zM8 21h8M12 17v4',
    tablet: 'M5 2h14v20H5zM11 18h2',
    mobile: 'M7 2h10v20H7zM11 18h2',
    none: 'M4 4h16v16H4zM4 20L20 4',
    solid: 'M4 4h16v16H4z',
  };
  function icon(button, key, label) {
    if (button.dataset.uiIcon) return;
    button.dataset.uiIcon = key;
    button.setAttribute('aria-label', label); button.title = label;
    button.classList.add('editor-icon');
    if (paths[key]) {
      button.innerHTML = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="${key === 'solid' ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[key]}"/></svg>`;
    } else { button.textContent = key; }
  }
  function fontSelect(select) {
    if (select.dataset.uiFont) return;
    select.dataset.uiFont = 'true'; select.classList.add('editor-font-select');
    select.setAttribute('aria-label', '서체 선택');
    for (const option of select.options) {
      option.style.fontFamily = option.value;
      option.textContent = option.textContent.replace(/[_-][a-f0-9]{6,}[^, ]*/gi, '').replaceAll('_', ' ');
    }
    const update = () => { select.style.fontFamily = select.value || 'inherit'; select.title = select.selectedOptions[0]?.textContent || '서체 선택'; };
    select.addEventListener('change', update); update();
  }
  function enhance() {
    for (const id of ['undo', 'redo', 'pick']) {
      const button = document.getElementById(id);
      // The editor updates pick's label when switching mode.
      if (button.dataset.uiIcon && !button.querySelector('svg')) delete button.dataset.uiIcon;
      icon(button, id, { undo: '실행 취소', redo: '다시 실행', pick: button.getAttribute('aria-pressed') === 'true' ? '요소 선택 모드' : '사이트 탐색 모드' }[id]);
    }
    document.querySelectorAll('[data-device]').forEach(b => icon(b, b.dataset.device, { desktop: '데스크톱 미리보기', tablet: '태블릿 미리보기', mobile: '모바일 미리보기' }[b.dataset.device]));
    document.querySelectorAll('#panel .option-row').forEach(row => {
      const label = row.querySelector(':scope > label')?.textContent || '';
      const group = row.querySelector(':scope > .option-btn-group');
      if (!group) return;
      group.setAttribute('role', 'group'); group.setAttribute('aria-label', label);
      if (label === '폰트' && !row.querySelector('select')) {
        const select = document.createElement('select');
        const buttons = [...group.querySelectorAll('button')];
        buttons.forEach((b, i) => select.add(new Option(b.textContent, String(i), false, b.classList.contains('active'))));
        const model = getSelectedDivBox()?.b;
        [...select.options].forEach((o, i) => o.style.fontFamily = DBOX_FONT_PRESETS[i]?.v || 'inherit');
        select.setAttribute('aria-label', '서체 선택'); select.className = 'editor-font-select';
        select.style.fontFamily = model?.text.fontFamily || 'inherit';
        select.addEventListener('change', () => { buttons[Number(select.value)].click(); select.style.fontFamily = getSelectedDivBox()?.b.text.fontFamily || 'inherit'; });
        group.hidden = true; row.append(select);
      }
      if (label === '텍스트 정렬' || label === '배경 종류') {
        group.classList.add('editor-segments');
        const keys = label === '텍스트 정렬' ? ['left', 'center', 'right'] : ['none', 'solid', 'gradient'];
        group.querySelectorAll('button').forEach((b, i) => {
          const name = b.getAttribute('aria-label') || b.textContent;
          icon(b, keys[i] === 'gradient' ? '◩' : keys[i], name);
          if (keys[i] === 'gradient') b.classList.add('gradient-swatch');
        });
      }
    });
    document.querySelectorAll('#contentForm [data-align]').forEach(b => icon(b, b.dataset.align, b.getAttribute('aria-label') || b.textContent));
    document.querySelectorAll('.builder-richtext-btn').forEach(b => {
      const label = b.getAttribute('aria-label') || b.textContent;
      const symbols = { '굵게': 'B', '기울임': 'I', '밑줄': 'U', '제목': 'H₂', '본문': '¶', '목록': '☷', '링크': '↗' };
      icon(b, symbols[label] || label, label);
      if (label === '기울임') b.style.fontStyle = 'italic';
      if (label === '밑줄') b.style.textDecoration = 'underline';
    });
    document.querySelectorAll('.option-btn, [data-align]').forEach(b => b.setAttribute('aria-pressed', String(b.classList.contains('active'))));
    document.querySelectorAll('select.style-font, #field-font-family').forEach(fontSelect);
    document.querySelectorAll('#panel input, #panel textarea, #panel select').forEach(input => {
      if (!input.id && !input.hasAttribute('aria-label')) {
        const label = input.closest('.option-row, .style-drawer-field, .ts-field')?.querySelector('label')?.textContent;
        if (label) input.setAttribute('aria-label', label);
      }
    });
  }
  let queued = false;
  const observer = new MutationObserver(() => {
    if (queued) return; queued = true;
    requestAnimationFrame(() => { queued = false; observer.disconnect(); enhance(); observe(); });
  });
  const observe = () => observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  enhance(); observe();
  document.getElementById('status').setAttribute('role', 'status');
})();
