let FIELDS = [
  { key: 'nav.logo', label: '로고 텍스트', group: '헤더' },
  { key: 'nav.links.0.label', label: '메뉴 1', group: '헤더' },
  { key: 'nav.links.1.label', label: '메뉴 2', group: '헤더' },
  { key: 'nav.links.2.label', label: '메뉴 3', group: '헤더' },
  { key: 'nav.links.3.label', label: '메뉴 4', group: '헤더' },
  { key: 'nav.cta', label: '헤더 CTA 버튼', group: '헤더' },

  { key: 'hero.eyebrow', label: '상단 마커', group: '히어로' },
  { key: 'hero.title', label: '타이틀', type: 'textarea', group: '히어로' },
  { key: 'hero.desc', label: '설명', type: 'textarea', group: '히어로' },
  { key: 'hero.ctaPrimary', label: '기본 버튼', group: '히어로' },
  { key: 'hero.ctaGhost', label: '보조 버튼', group: '히어로' },
  { key: 'hero.plateCaption', label: '그래픽 캡션', group: '히어로' },

  { key: 'diff.eyebrow', label: '상단 마커', group: '차별점' },
  { key: 'diff.title', label: '타이틀', type: 'textarea', group: '차별점' },
  { key: 'diff.items.0.title', label: '항목 1 제목', group: '차별점' },
  { key: 'diff.items.0.desc', label: '항목 1 설명', type: 'textarea', group: '차별점' },
  { key: 'diff.items.1.title', label: '항목 2 제목', group: '차별점' },
  { key: 'diff.items.1.desc', label: '항목 2 설명', type: 'textarea', group: '차별점' },
  { key: 'diff.items.2.title', label: '항목 3 제목', group: '차별점' },
  { key: 'diff.items.2.desc', label: '항목 3 설명', type: 'textarea', group: '차별점' },
  { key: 'diff.items.3.title', label: '항목 4 제목', group: '차별점' },
  { key: 'diff.items.3.desc', label: '항목 4 설명', type: 'textarea', group: '차별점' },
  { key: 'diff.items.4.title', label: '항목 5 제목', group: '차별점' },
  { key: 'diff.items.4.desc', label: '항목 5 설명', type: 'textarea', group: '차별점' },
  { key: 'diff.items.5.title', label: '항목 6 제목', group: '차별점' },
  { key: 'diff.items.5.desc', label: '항목 6 설명', type: 'textarea', group: '차별점' },

  { key: 'services.eyebrow', label: '상단 마커', group: '서비스' },
  { key: 'services.title', label: '타이틀', type: 'textarea', group: '서비스' },
  { key: 'services.items.0.title', label: '서비스 1 제목', group: '서비스' },
  { key: 'services.items.0.desc', label: '서비스 1 설명', type: 'textarea', group: '서비스' },
  { key: 'services.items.1.title', label: '서비스 2 제목', group: '서비스' },
  { key: 'services.items.1.desc', label: '서비스 2 설명', type: 'textarea', group: '서비스' },
  { key: 'services.items.2.title', label: '서비스 3 제목', group: '서비스' },
  { key: 'services.items.2.desc', label: '서비스 3 설명', type: 'textarea', group: '서비스' },

  { key: 'board.eyebrow', label: '상단 마커', group: '게시판' },
  { key: 'board.title', label: '타이틀', type: 'textarea', group: '게시판' },
  { key: 'gallery.eyebrow', label: '상단 마커', group: '갤러리' },
  { key: 'gallery.title', label: '타이틀', type: 'textarea', group: '갤러리' },
  { key: 'testimonial.eyebrow', label: '상단 마커', group: '후기' },
  { key: 'testimonial.title', label: '타이틀', type: 'textarea', group: '후기' },
  { key: 'faq.eyebrow', label: '상단 마커', group: 'FAQ' },
  { key: 'faq.title', label: '타이틀', type: 'textarea', group: 'FAQ' },

  { key: 'footer.bizName', label: '상호', group: '푸터' },
  { key: 'footer.bizNo', label: '사업자등록번호', group: '푸터' },
  { key: 'footer.address', label: '주소', group: '푸터' },
  { key: 'footer.tel', label: '연락처', group: '푸터' }
];

let content = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
let theme = { ...DEFAULT_THEME };
let dirty = false;
let adminOn = false;

/* ---------- 텍스트별 타이포그래피 오버라이드 / HTML 편집 모드 ---------- */
const FONT_OPTIONS = [
  { v: '', l: '기본값 (Pretendard Variable)' },
  { v: 'Pretendard Variable, sans-serif', l: 'Pretendard Variable' },
  { v: 'Georgia, serif', l: '세리프 (Georgia)' },
  { v: '"Courier New", monospace', l: '모노스페이스 (Courier New)' },
  { v: 'system-ui, sans-serif', l: '시스템 고딕' }
];
let styleState = {};
let htmlModeKeys = new Set();

function applyFieldStyle(key) {
  const el = document.querySelector('[data-bind="' + key + '"]');
  if (!el) return;
  const s = styleState[key] || {};
  el.style.fontFamily = s.fontFamily || '';
  el.style.fontSize = s.fontSize ? s.fontSize + 'px' : '';
  el.style.color = s.color || '';
  el.style.letterSpacing = (s.letterSpacing !== undefined && s.letterSpacing !== '') ? s.letterSpacing + 'em' : '';
  el.style.textAlign = s.align || '';
}
function applyAllFieldStyles() { Object.keys(styleState).forEach(applyFieldStyle); }

function toggleHtmlMode(key) {
  if (htmlModeKeys.has(key)) htmlModeKeys.delete(key); else htmlModeKeys.add(key);
  const row = document.getElementById('field-' + key);
  const inputEl = row.querySelector('.field-input');
  const btn = row.querySelector('.html-toggle-btn');
  const isHtml = htmlModeKeys.has(key);
  inputEl.classList.toggle('is-html', isHtml);
  btn.textContent = isHtml ? '텍스트로 되돌리기' : 'HTML로 수정하기';
  btn.classList.toggle('active', isHtml);
  const target = document.querySelector('[data-bind="' + key + '"]');
  const val = getPath(content, key);
  if (target) { if (isHtml) target.innerHTML = val; else target.textContent = val; }
  markDirty();
}
function resetFieldStyle(key) {
  delete styleState[key];
  applyFieldStyle(key);
  buildContentForm();
  markDirty();
}

function getPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}
function setPath(obj, path, value) {
  const keys = path.split('.');
  let o = obj;
  for (let i = 0; i < keys.length - 1; i++) o = o[keys[i]];
  o[keys[keys.length - 1]] = value;
}

function render() {
  document.querySelectorAll('[data-bind]').forEach((el) => {
    const key = el.getAttribute('data-bind');
    const val = getPath(content, key);
    if (val === undefined) return;
    if (htmlModeKeys.has(key)) el.innerHTML = val; else el.textContent = val;
  });
  applyAllFieldStyles();
  if(typeof PageQuality!=='undefined')PageQuality.update();
}
function applyTheme() {
  THEME_FIELDS.forEach((f) => document.documentElement.style.setProperty(f.cssVar, theme[f.key]));
  document.querySelectorAll('#panel .btn-style-preview').forEach(b => b.style.setProperty('--ink', theme.ink));
  document.documentElement.style.setProperty('--font-body', theme.fontFamily || DEFAULT_THEME.fontFamily);
  document.documentElement.style.setProperty('--radius', (theme.radius !== undefined ? theme.radius : DEFAULT_THEME.radius) + 'px');
  document.documentElement.style.setProperty('--heading-spacing', (theme.headingSpacing !== undefined ? theme.headingSpacing : DEFAULT_THEME.headingSpacing) + 'em');
}

function buildContentForm() {
  const root = document.getElementById('contentForm');
  root.innerHTML = '';
  const groups = [];
  FIELDS.forEach((f) => {
    let g = groups.find((x) => x.name === f.group);
    if (!g) { g = { name: f.group, fields: [] }; groups.push(g); }
    g.fields.push(f);
  });
  groups.forEach((g) => {
    const section = document.createElement('section');
    section.className = 'field-group';
    const h = document.createElement('h4');
    h.textContent = g.name;
    section.appendChild(h);
    g.fields.forEach((f) => {
      const row = document.createElement('div');
      row.className = 'field-row';
      row.id = 'field-' + f.key;

      const header = document.createElement('div');
      header.className = 'field-row-header';
      const label = document.createElement('label');
      label.textContent = f.label;
      header.appendChild(label);
      const styleToggle = document.createElement('button');
      styleToggle.type = 'button';
      styleToggle.className = 'style-toggle-btn';
      styleToggle.textContent = '스타일';
      header.appendChild(styleToggle);
      row.appendChild(header);

      const input = document.createElement(f.type === 'textarea' ? 'textarea' : 'input');
      if (f.type !== 'textarea') input.type = 'text';
      input.className = 'field-input';
      input.value = getPath(content, f.key) || '';
      input.addEventListener('input', (e) => {
        setPath(content, f.key, e.target.value);
        const target = document.querySelector('[data-bind="' + f.key + '"]');
        if (target) { if (htmlModeKeys.has(f.key)) target.innerHTML = e.target.value; else target.textContent = e.target.value; }
        markDirty();
      });
      row.appendChild(input);

      /* ---- 타이포그래피 드로어 ---- */
      const drawer = document.createElement('div');
      drawer.className = 'style-drawer';

      const row1 = document.createElement('div'); row1.className = 'style-drawer-row';
      const fontField = document.createElement('div'); fontField.className = 'style-drawer-field';
      const fontLabel = document.createElement('label'); fontLabel.textContent = '폰트';
      const fontSel = document.createElement('select'); fontSel.className = 'style-font';
      FONT_OPTIONS.forEach((o) => { const op = document.createElement('option'); op.value = o.v; op.textContent = o.l; fontSel.appendChild(op); });
      fontField.appendChild(fontLabel); fontField.appendChild(fontSel);
      row1.appendChild(fontField);
      drawer.appendChild(row1);

      const row2 = document.createElement('div'); row2.className = 'ts-row';
      const targetElForCompute = document.querySelector('[data-bind="' + f.key + '"]');
      let startSize = 14, startSpacing = 0;
      if (targetElForCompute) {
        const cs = getComputedStyle(targetElForCompute);
        const parsedSize = parseFloat(cs.fontSize);
        if (!isNaN(parsedSize)) startSize = Math.round(parsedSize);
        const lsRaw = cs.letterSpacing;
        if (lsRaw && lsRaw !== 'normal') {
          const lsPx = parseFloat(lsRaw);
          if (!isNaN(lsPx) && startSize) startSpacing = Math.round((lsPx / startSize) * 1000) / 1000;
        }
      }
      const savedStyleEarly = styleState[f.key];
      const sizeHolder = { v: (savedStyleEarly && savedStyleEarly.fontSize) ? Number(savedStyleEarly.fontSize) : startSize };
      const spacingHolder = { v: (savedStyleEarly && savedStyleEarly.letterSpacing !== undefined && savedStyleEarly.letterSpacing !== '') ? Number(savedStyleEarly.letterSpacing) : startSpacing };
      const sizeSpacingCommit = () => {
        styleState[f.key] = styleState[f.key] || {};
        styleState[f.key].fontSize = sizeHolder.v;
        styleState[f.key].letterSpacing = spacingHolder.v;
        applyFieldStyle(f.key);
        markDirty();
      };
      row2.appendChild(makeLabeledStepperField('크기', () => sizeHolder.v, (v) => { sizeHolder.v = v; }, 8, 96, 1, 'px', sizeSpacingCommit));
      row2.appendChild(makeLabeledStepperField('자간', () => spacingHolder.v, (v) => { spacingHolder.v = v; }, -0.1, 0.3, 0.005, 'em', sizeSpacingCommit));
      drawer.appendChild(row2);

      const row3 = document.createElement('div'); row3.className = 'style-drawer-row';
      const colorField = document.createElement('div'); colorField.className = 'style-drawer-field';
      const colorLabel = document.createElement('label'); colorLabel.textContent = '컬러';
      const colorWrap = document.createElement('div'); colorWrap.className = 'style-color-wrap';
      const colorInput = document.createElement('input'); colorInput.type = 'color'; colorInput.className = 'style-color'; colorInput.value = '#000000';
      const colorHex = document.createElement('input'); colorHex.type = 'text'; colorHex.className = 'style-color-hex'; colorHex.placeholder = '기본값';
      colorWrap.appendChild(colorInput); colorWrap.appendChild(colorHex);
      colorField.appendChild(colorLabel); colorField.appendChild(colorWrap);
      row3.appendChild(colorField);
      drawer.appendChild(row3);

      const row4 = document.createElement('div'); row4.className = 'style-drawer-row';
      const alignField = document.createElement('div'); alignField.className = 'style-drawer-field';
      const alignLabel = document.createElement('label'); alignLabel.textContent = '정렬';
      const alignGroup = document.createElement('div'); alignGroup.className = 'option-btn-group';
      [{ v: 'left', l: '왼쪽' }, { v: 'center', l: '가운데' }, { v: 'right', l: '오른쪽' }].forEach((c) => {
        const btn = document.createElement('button');
        btn.type = 'button'; btn.dataset.align = c.v;
        btn.className = 'option-btn' + ((styleState[f.key] && styleState[f.key].align ? styleState[f.key].align : 'left') === c.v ? ' active' : '');
        btn.textContent = c.l;
        btn.addEventListener('click', () => {
          styleState[f.key] = styleState[f.key] || {};
          styleState[f.key].align = c.v;
          alignGroup.querySelectorAll('.option-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          applyFieldStyle(f.key);
          markDirty();
        });
        alignGroup.appendChild(btn);
      });
      alignField.appendChild(alignLabel); alignField.appendChild(alignGroup);
      row4.appendChild(alignField);
      drawer.appendChild(row4);

      const actions = document.createElement('div'); actions.className = 'style-drawer-actions';
      const htmlBtn = document.createElement('button'); htmlBtn.type = 'button'; htmlBtn.className = 'html-toggle-btn'; htmlBtn.textContent = 'HTML로 수정하기';
      const resetBtn = document.createElement('button'); resetBtn.type = 'button'; resetBtn.className = 'style-reset-btn'; resetBtn.textContent = '스타일 초기화';
      actions.appendChild(htmlBtn); actions.appendChild(resetBtn);
      drawer.appendChild(actions);

      row.appendChild(drawer);
      section.appendChild(row);

      /* ---- 저장된 값으로 드로어 초기 동기화 ---- */
      const savedStyle = styleState[f.key];
      if (savedStyle) {
        if (savedStyle.fontFamily) fontSel.value = savedStyle.fontFamily;
        if (savedStyle.color) { colorHex.value = savedStyle.color; colorInput.value = savedStyle.color; }
      }
      if (htmlModeKeys.has(f.key)) {
        input.classList.add('is-html');
        htmlBtn.textContent = '텍스트로 되돌리기';
        htmlBtn.classList.add('active');
      }

      /* ---- 이벤트 바인딩 ---- */
      styleToggle.addEventListener('click', () => {
        drawer.classList.toggle('open');
        styleToggle.classList.toggle('open', drawer.classList.contains('open'));
      });
      const applyFromDrawer = () => {
        styleState[f.key] = styleState[f.key] || {};
        styleState[f.key].fontFamily = fontSel.value;
        styleState[f.key].color = colorHex.value;
        applyFieldStyle(f.key);
        markDirty();
      };
      fontSel.addEventListener('change', applyFromDrawer);
      colorInput.addEventListener('input', () => { colorHex.value = colorInput.value; applyFromDrawer(); });
      colorHex.addEventListener('change', () => {
        const v = colorHex.value.trim();
        if (v === '' || /^#[0-9a-fA-F]{6}$/.test(v)) { if (v !== '') colorInput.value = v; applyFromDrawer(); }
        else { colorHex.value = styleState[f.key] ? (styleState[f.key].color || '') : ''; }
      });
      htmlBtn.addEventListener('click', () => toggleHtmlMode(f.key));
      resetBtn.addEventListener('click', () => resetFieldStyle(f.key));
    });
    root.appendChild(section);
  });
}

function buildThemeForm() {
  const root = document.getElementById('themeForm');
  root.innerHTML = '';
  THEME_FIELDS.forEach((f) => {
    const row = document.createElement('div');
    row.className = 'theme-row';
    const label = document.createElement('label');
    label.textContent = f.label;
    row.appendChild(label);
    const wrap = document.createElement('div');
    wrap.className = 'theme-input-wrap';
    const swatch = document.createElement('input');
    swatch.type = 'color';
    swatch.value = theme[f.key];
    const hex = document.createElement('input');
    hex.type = 'text';
    hex.className = 'hex-input';
    hex.value = theme[f.key];
    swatch.addEventListener('input', (e) => {
      theme[f.key] = e.target.value;
      hex.value = e.target.value;
      document.documentElement.style.setProperty(f.cssVar, e.target.value);
      markDirty();
    });
    hex.addEventListener('change', (e) => {
      const v = e.target.value.trim();
      if (/^#[0-9a-fA-F]{6}$/.test(v)) {
        theme[f.key] = v; swatch.value = v;
        document.documentElement.style.setProperty(f.cssVar, v);
        markDirty();
      } else { hex.value = theme[f.key]; }
    });
    wrap.appendChild(swatch); wrap.appendChild(hex);
    row.appendChild(wrap);
    root.appendChild(row);
  });
}

function openPanel(key) {
  document.body.classList.add('panel-open');
  switchTab('content');
  const row = document.getElementById('field-' + key);
  document.querySelectorAll('.field-row.active').forEach((r) => r.classList.remove('active'));
  if (row) {
    row.classList.add('active');
    row.scrollIntoView({ block: 'center', behavior: 'smooth' });
    const input = row.querySelector('.field-input');
    if (input) input.focus();
    const drawer = row.querySelector('.style-drawer');
    const toggleBtn = row.querySelector('.style-toggle-btn');
    if (drawer) { drawer.classList.add('open'); toggleBtn.classList.add('open'); }
  }
}
function closePanel() { document.body.classList.remove('panel-open'); }

function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach((b) => b.classList.toggle('active', b.dataset.tab === name));
  document.querySelectorAll('.tab-panel').forEach((p) => p.classList.toggle('active', p.id === 'tab-' + name));
  if (name === 'json') refreshJsonView();
  if (name === 'structure') renderSettingsScreen();
  if (name === 'box') renderBoxPanel();
  if (name === 'divbox' && typeof renderDivBoxPanel === 'function') renderDivBoxPanel();
  if (name === 'menu') renderMenuScreen();
  if (name === 'theme') buildTextStylesUI();
}

function toggleAdmin() {
  adminOn = !document.body.classList.contains('panel-open');
  document.body.classList.toggle('admin-on', adminOn);
  if (adminOn) { document.body.classList.add('panel-open'); switchTab('menu'); }
  if (!adminOn) {
    closePanel();
    settingsState = { screen: 'sectionList', sectionKey: null, detailFieldKey: null };
    currentBoxKey = null;
    document.querySelectorAll('.editable-box.box-hover').forEach((el) => el.classList.remove('box-hover'));
  }
}

function syncAdminMenuButton() {
  const open = document.body.classList.contains('panel-open');
  const button = document.getElementById('adminToggle');
  button.textContent = open ? '관리자 메뉴 닫기' : '관리자 메뉴 열기';
  button.setAttribute('aria-expanded', String(open));
}
new MutationObserver(syncAdminMenuButton).observe(document.body, {attributes: true, attributeFilter: ['class']});
syncAdminMenuButton();

function markDirty() {
  dirty = true;
  document.getElementById('saveBtn').disabled = false;
  document.getElementById('dirtyLabel').textContent = '저장되지 않은 변경사항';
}

