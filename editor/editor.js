(async function () {
  'use strict';
  const Core = window.AgencyEditorCore;
  const $ = id => document.getElementById(id), frame = $('preview');
  let config, state, published, storage, selection, route = '/', scope = 'page', ready = false, dirty = false;
  let history = [], future = [], savedFingerprint = '', loaded = false;
  const status = text => { $('status').textContent = text; };
  const clone = value => JSON.parse(JSON.stringify(value));
  function send(type, extra = {}) { if (ready) frame.contentWindow.postMessage({ channel: 'agency-editor', siteId: config.siteId, type, ...extra }, location.origin); }
  function clearSelection(notify = true) {
    selection = null; window.LocalEditor?.clear();
    $('selected-label').textContent = '미리보기에서 편집할 요소를 선택하세요.';
    $('selection-panel').hidden = true; $('selection-empty').hidden = false;
    $('parent').disabled = true; $('children').replaceChildren(new Option('하위 요소 선택', ''));
    if (notify) send('clear-selection');
  }
  function buttons() { $('undo').disabled = !history.length; $('redo').disabled = !future.length; $('save').textContent = dirty ? '변경사항 저장' : '저장'; }
  function changed() { dirty = JSON.stringify(state) !== savedFingerprint; buttons(); status(dirty ? '미저장 변경사항 · 저장을 눌러주세요' : '저장된 설정'); }
  function commit(update) {
    const previous = clone(state);
    try { update(); state = Core.validate(state, config.siteId); }
    catch (error) { state = previous; status(error.message); return; }
    if (JSON.stringify(previous) === JSON.stringify(state)) return;
    history.push(previous); if (history.length > 40) history.shift(); future = [];
    changed(); send('state', { state });
  }
  function edit(key, value) {
    if (!selection) return;
    commit(() => {
      const rules = state.pages[scope === 'site' ? '*' : route] ||= {};
      const record = rules[selection.key] ||= { styles: {} };
      if (Core.properties.has(key)) { if (value === '') delete record.styles[key]; else record.styles[key] = value; }
      else if (value === undefined) delete record[key]; else record[key] = value;
      if (key === 'text') delete record.html;
    });
  }
  function stored(key) { return state.pages[scope === 'site' ? '*' : route]?.[selection.key]?.[key]; }
  function group(title, open = false) { const box = document.createElement('details'); box.open = open; const summary = document.createElement('summary'); summary.textContent = title; const grid = document.createElement('div'); grid.className = 'control-grid'; box.append(summary, grid); $('controls').append(box); return grid; }
  function field(grid, title, key, options = {}) {
    const label = document.createElement('label'); label.textContent = title; if (options.wide) label.className = 'wide';
    let input;
    if (options.choices) {
      input = document.createElement('select');
      for (const [value, name] of [['', '기존 디자인'], ...options.choices]) { const option = document.createElement('option'); option.value = value; option.textContent = name; input.append(option); }
    } else { input = document.createElement(options.textarea ? 'textarea' : 'input'); if (!options.textarea) input.type = options.numeric ? 'number' : 'text'; }
    input.id = 'field-' + key;
    const current = Core.properties.has(key) ? selection.styles[key] : (stored(key) ?? selection[key] ?? '');
    const explicit = Core.properties.has(key) ? state.pages[scope === 'site' ? '*' : route]?.[selection.key]?.styles?.[key] : current;
    if (options.numeric) {
      input.step = options.step ?? '1'; if (options.min !== undefined) input.min = options.min; if (options.max !== undefined) input.max = options.max;
      input.value = explicit !== undefined ? parseFloat(explicit) : '';
      input.placeholder = current && Number.isFinite(parseFloat(current)) ? parseFloat(current).toFixed(2).replace(/\.00$/, '') : '기존';
    } else { input.value = options.choices ? explicit ?? '' : explicit ?? ''; if (!explicit && Core.properties.has(key)) input.placeholder = current || '기존 디자인'; }
    input.addEventListener('change', () => {
      let value = input.value;
      if (options.numeric && value !== '') {
        const number = Number(value); if (!Number.isFinite(number) || (options.min !== undefined && number < options.min) || (options.max !== undefined && number > options.max)) { status('입력 범위를 확인하세요.'); return; }
        value += options.unit || '';
      }
      if (Core.properties.has(key) && value && !CSS.supports(key, value)) { status('스타일 값을 확인하세요.'); return; }
      edit(key, value);
    });
    label.append(input);
    if (options.unit) { const hint = document.createElement('span'); hint.className = 'unit'; hint.textContent = options.unit; label.append(hint); }
    grid.append(label); return input;
  }
  function upload(grid, background = false) {
    const label = document.createElement('label'); label.className = 'wide'; label.textContent = background ? '배경 이미지 업로드' : '이미지 업로드';
    const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/png,image/jpeg,image/webp,image/gif,image/avif'; input.id = background ? 'background-upload' : 'image-upload';
    input.addEventListener('change', async () => {
      const file = input.files[0]; if (!file) return;
      if (file.size > 5 * 1024 * 1024 || !/^image\/(png|jpeg|webp|gif|avif)$/.test(file.type)) { status('PNG/JPEG/WebP/GIF/AVIF 이미지(5MB 이하)를 선택하세요.'); return; }
      const targetKey = selection.key, targetPage = route;
      const reader = new FileReader(); reader.readAsDataURL(file);
      reader.onload = () => {
        if (selection?.key !== targetKey || route !== targetPage) { status('이미지 업로드 중 선택 영역이 바뀌었습니다. 다시 선택하세요.'); return; }
        edit(background ? 'background-image' : 'image', background ? 'url("' + reader.result + '")' : reader.result);
        if (!background) $('field-image').value = '(업로드 이미지)';
      };
      reader.onerror = () => status('이미지를 읽지 못했습니다.');
    }); label.append(input); grid.append(label);
  }
  function drawControls() {
    $('controls').replaceChildren();
    if (!selection) return;
    window.LocalEditor?.select(selection, patch => { commit(() => {
      const rules = state.pages[scope === 'site' ? '*' : route] ||= {};
      const record = rules[selection.key] ||= { styles: {} };
      for (const [property, value] of Object.entries(patch.styles)) { if (value === '') delete record.styles[property]; else record.styles[property] = value; }
      for (const [key, value] of Object.entries(patch)) if (key !== 'styles') { if (value === undefined) delete record[key]; else record[key] = value; }
      if (patch.html !== undefined) delete record.text;
      if (patch.text !== undefined) delete record.html;
    }); if (patch.deleted) clearSelection(); });
    document.body.classList.add('panel-open');
    $('selection-empty').hidden = true; $('selection-panel').hidden = false;
    $('selected-label').textContent = selection.tag + ' · ' + selection.label;
    $('parent').disabled = !selection.parent;
    $('scope').querySelector('[value=site]').disabled = !selection.sharedAllowed;
    if (!selection.sharedAllowed) { scope = 'page'; $('scope').value = 'page'; }
    $('children').replaceChildren(new Option('하위 요소 선택', ''));
    for (const child of selection.children) $('children').append(new Option(child.label, child.key));
    if (selection.editableText) {
      const text = group('텍스트 · 스타일', true);
      field(text, '텍스트 내용 (적용 시 선택 요소의 내용 교체)', 'text', { textarea: true, wide: true });
      const fonts = (selection.fonts || []).filter(font => !font.includes('"') && !font.includes(';')).map(font => ['"' + font + '"', font.replace(/[_-][a-f0-9]{6,}.*$/i, '').replaceAll('_', ' ') + ' (이 사이트)']);
      field(text, '서체', 'font-family', { wide: true, choices: [['system-ui, sans-serif', '기본 산세리프'], ['serif', '기본 명조'], ...fonts] });
      field(text, '글자 크기', 'font-size', { numeric: true, min: 6, max: 300, unit: 'px' });
      field(text, '자간', 'letter-spacing', { numeric: true, min: -10, max: 40, step: .1, unit: 'px' });
      field(text, '줄 간격', 'line-height', { numeric: true, min: 8, max: 500, step: .5, unit: 'px' });
      field(text, '글자 색상', 'color');
      field(text, '굵기', 'font-weight', { choices: [['300', '얇게'], ['400', '보통'], ['500', '중간'], ['600', '조금 굵게'], ['700', '굵게'], ['800', '아주 굵게']] });
      field(text, '정렬', 'text-align', { choices: [['left', '왼쪽'], ['center', '가운데'], ['right', '오른쪽'], ['justify', '양쪽']] });
      field(text, '기울임', 'font-style', { choices: [['normal', '보통'], ['italic', '기울임']] });
      field(text, '텍스트 장식', 'text-decoration', { choices: [['none', '없음'], ['underline', '밑줄'], ['line-through', '취소선']] });
    }
    if (selection.tag === 'img') {
      const image = group('이미지', true);
      field(image, '이미지 주소', 'image', { wide: true }); upload(image);
      field(image, '대체 텍스트', 'alt', { wide: true });
      field(image, '이미지 맞춤', 'object-fit', { choices: [['cover', '영역 채우기'], ['contain', '전체 보이기'], ['fill', '늘이기'], ['none', '원본']] });
      field(image, '이미지 위치', 'object-position', { choices: [['center', '가운데'], ['left', '왼쪽'], ['right', '오른쪽'], ['top', '위'], ['bottom', '아래']] });
    }
    const layout = group('크기 · 여백', true);
    for (const [key, label] of [['width','너비'],['max-width','최대 너비'],['height','높이'],['min-height','최소 높이']]) field(layout, label + ' (px / % / auto)', key);
    for (const [prefix, label] of [['padding','안쪽 여백'],['margin','바깥 여백']]) for (const [side, name] of [['top','위'],['right','오른쪽'],['bottom','아래'],['left','왼쪽']]) field(layout, label + ' · ' + name, prefix + '-' + side, { numeric: true, min: prefix === 'padding' ? 0 : -500, max: 1000, unit: 'px' });
    field(layout, '요소 사이 간격', 'gap', { numeric: true, min: 0, max: 500, unit: 'px' });
    field(layout, '표시', 'display', { choices: [['none','숨기기']] });
    const background = group('배경 · 테두리');
    field(background, '배경 색상', 'background-color', { wide: true });
    const label = document.createElement('label'); label.className = 'wide'; label.textContent = '배경 이미지 URL';
    const input = document.createElement('input'); input.id = 'field-background-url';
    const bg = selection.styles['background-image']; input.placeholder = bg === 'none' ? 'https://… 또는 /이미지/경로' : bg;
    input.addEventListener('change', () => { if (!input.value) edit('background-image', ''); else if (Core.safeURL(input.value, true) && !input.value.includes('"')) edit('background-image', 'url("' + input.value + '")'); else status('이미지 URL을 확인하세요.'); }); label.append(input); background.append(label); upload(background, true);
    field(background, '배경 이미지 크기', 'background-size', { choices: [['cover','채우기'],['contain','전체 보이기'],['auto','원본']] });
    field(background, '배경 이미지 위치', 'background-position', { choices: [['center','가운데'],['left','왼쪽'],['right','오른쪽'],['top','위'],['bottom','아래']] });
    field(background, '배경 이미지 반복', 'background-repeat', { choices: [['no-repeat','반복 안 함'],['repeat','반복']] });
    field(background, '모서리 둥글기', 'border-radius', { numeric: true, min: 0, max: 500, unit: 'px' });
    field(background, '투명도 (0~1)', 'opacity', { numeric: true, min: 0, max: 1, step: .05 });
    field(background, '테두리 두께', 'border-width', { numeric: true, min: 0, max: 40, unit: 'px' });
    field(background, '테두리 종류', 'border-style', { choices: [['none','없음'],['solid','실선'],['dashed','점선'],['double','이중선']] });
    field(background, '테두리 색상', 'border-color');
  }
  function navigate(next) {
    if (!config.pages.some(page => page.path === next)) { status('이 사이트의 편집 가능한 페이지를 선택하세요.'); return; }
    route = next; $('pages').value = route; selection = null; ready = false; window.LocalEditor?.clear();
    $('selection-panel').hidden = true; $('selection-empty').hidden = false; $('sections').replaceChildren(new Option('영역 선택', ''));
    status('페이지 불러오는 중…');
    const url = new URL(config.basePath + route, location.origin); url.searchParams.set('agency-editor', '1'); frame.src = url.href;
  }
  function download(name, value, type) { const url = URL.createObjectURL(new Blob([value], { type })); const link = document.createElement('a'); link.href = url; link.download = name; link.click(); setTimeout(() => URL.revokeObjectURL(url), 5000); }
  window.addEventListener('message', event => {
    const data = event.data;
    if (!config || event.source !== frame.contentWindow || event.origin !== location.origin || data?.channel !== 'agency-editor' || data.siteId !== config.siteId || data.page !== route) return;
    if (data.type === 'ready') {
      ready = true; send('state', { state }); send('show-hidden', { enabled: $('show-hidden').getAttribute('aria-checked') === 'true' }); send('mode', { pick: $('pick').getAttribute('aria-pressed') === 'true' });
      $('sections').replaceChildren(new Option('영역 선택', '')); for (const section of data.sections) $('sections').append(new Option(section.label, section.key)); changed();
    } else if (data.type === 'selection') { const fresh = selection?.key !== data.selection.key; selection = data.selection; window.LocalEditor?.update(selection); if (fresh) drawControls(); }
    else if (data.type === 'selection-cleared') clearSelection(false);
    else if (data.type === 'navigate') navigate(data.route);
    else if (data.type === 'html') download(config.siteId.replaceAll('/', '-') + '-page.html', data.html, 'text/html');
    else if (data.type === 'error') status(data.message);
  });
  try {
    const response = await fetch('./manifest.json'); if (!response.ok) throw new Error('사이트 목록을 읽지 못했습니다.'); config = await response.json();
    storage = Core.database(config.siteId); published = Core.empty(config.siteId);
    try { const settings = await fetch('./published.json'); if (settings.ok) published = Core.validate(await settings.json(), config.siteId); } catch (error) { status(error.message); }
    state = clone(published);
    try { const draft = await storage.get(); if (draft) state = Core.validate(draft, config.siteId); } catch (error) { status('저장된 설정을 읽지 못했습니다: ' + error.message); }
    savedFingerprint = JSON.stringify(state);
    $('site-name').textContent = config.name + ' · 편집기'; $('site-id').textContent = config.siteId; document.title = config.name + ' · 사이트 편집기';
    $('view-site').href = config.basePath + '/';
    for (const page of config.pages) $('pages').append(new Option(page.title, page.path));
    const requestedPage = new URL(location.href).searchParams.get('page');
    loaded = true; navigate(config.pages.some(page => page.path === requestedPage) ? requestedPage : config.pages[0]?.path || '/');
  } catch (error) { status(error.message); return; }
  $('pages').addEventListener('change', event => navigate(event.target.value));
  $('show-hidden').addEventListener('click', () => {
    const enabled = $('show-hidden').getAttribute('aria-checked') !== 'true';
    $('show-hidden').setAttribute('aria-checked', String(enabled));
    send('show-hidden', { enabled });
  });
  $('sections').addEventListener('change', event => send('select', { key: event.target.value }));
  $('parent').addEventListener('click', () => send('select', { key: selection?.parent }));
  $('children').addEventListener('change', event => send('select', { key: event.target.value }));
  $('scope').addEventListener('change', event => { scope = event.target.value; $('scope-note').textContent = scope === 'site' ? '이 사이트 안에서 같은 위치의 헤더·푸터 요소에 적용됩니다.' : '페이지별 수정은 다른 페이지에 적용되지 않습니다.'; drawControls(); });
  $('pick').addEventListener('click', () => { const pick = $('pick').getAttribute('aria-pressed') !== 'true'; $('pick').setAttribute('aria-pressed', pick); $('pick').textContent = pick ? '요소 선택 중' : '탐색 · 미리보기'; send('mode', { pick }); });
  document.querySelectorAll('[data-device]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-device]').forEach(item => item.setAttribute('aria-pressed', item === button));
    frame.style.width = { desktop: '100%', tablet: '768px', mobile: '390px' }[button.dataset.device];
  }));
  $('save').addEventListener('click', async () => { try { await storage.set(state); savedFingerprint = JSON.stringify(state); dirty = false; buttons(); status('저장됨 · 이 브라우저의 해당 사이트에만 적용'); } catch (error) { status('저장 실패: ' + error.message); } });
  $('undo').addEventListener('click', () => { if (!history.length) return; future.push(clone(state)); state = history.pop(); changed(); selection = null; window.LocalEditor?.clear(); send('state', { state }); $('selection-panel').hidden = true; $('selection-empty').hidden = false; });
  $('redo').addEventListener('click', () => { if (!future.length) return; history.push(clone(state)); state = future.pop(); changed(); selection = null; window.LocalEditor?.clear(); send('state', { state }); $('selection-panel').hidden = true; $('selection-empty').hidden = false; });
  $('reset-element').addEventListener('click', () => { if (!selection) return; commit(() => { delete state.pages[scope === 'site' ? '*' : route]?.[selection.key]; }); setTimeout(drawControls, 100); });
  $('reset').addEventListener('click', async () => {
    if (!confirm('이 사이트의 브라우저 편집 내용만 초기화합니다. 배포된 기본 설정은 유지됩니다.')) return;
    try { await storage.clear(); history.push(clone(state)); future = []; state = clone(published); savedFingerprint = JSON.stringify(state); dirty = false; buttons(); send('state', { state }); clearSelection(); status('이 사이트의 브라우저 편집을 초기화했습니다.'); } catch (error) { status('초기화 실패: ' + error.message); }
  });
  $('export').addEventListener('click', () => download('editor-state-' + config.siteId.replaceAll('/', '-') + '.json', JSON.stringify(state, null, 2), 'application/json'));
  $('export-html').addEventListener('click', () => send('export-html'));
  $('import').addEventListener('click', () => $('import-file').click());
  $('import-file').addEventListener('change', async event => {
    const file = event.target.files[0]; if (!file) return;
    try { if (file.size > 30_000_000) throw new Error('편집 파일은 30MB 이하여야 합니다.'); const next = Core.validate(JSON.parse(await file.text()), config.siteId); commit(() => { state = next; }); clearSelection(); status('가져오기 완료 · 저장을 눌러주세요'); } catch (error) { status(error.message); } event.target.value = '';
  });
  document.addEventListener('keydown', event => { if ((event.ctrlKey || event.metaKey) && event.key === 's') { event.preventDefault(); $('save').click(); } });
  window.addEventListener('beforeunload', event => { if (loaded && dirty) { event.preventDefault(); event.returnValue = ''; } });
})();
