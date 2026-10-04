/* The local editor's sections.js and divbox.js run unchanged. This adapter maps
 * their box model to the selected element inside this site's preview iframe. */
const CONTENT_BLOCKS = [];
function showToast(message) { document.getElementById('status').textContent = message; }
function markDirty() { window.LocalEditor?.contentChanged(); }
function switchTab(name) {
  document.querySelectorAll('#panel .tab-btn').forEach(el => el.classList.toggle('active', el.dataset.tab === name));
  document.querySelectorAll('#panel .tab-panel').forEach(el => el.classList.toggle('active', el.id === 'tab-' + name));
  if (name === 'divbox' || name === 'content') window.LocalEditor?.rebind();
  if (name === 'divbox') renderDivBoxPanel();
}
const Builder = {
  state: { sections: {} }, normalizeBox() {}, refreshBox() {}, renderPage() {},
  safeURL: value => AgencyEditorCore.safeURL(value) ? value : '',
  sanitize: value => AgencyEditorCore.sanitizeHTML(value),
};
window.LocalEditor = (() => {
  let box, before, selection, apply, contentBefore, styleBefore, latest;
  const clone = value => JSON.parse(JSON.stringify(value));
  const number = (value, fallback = 0) => Number.isFinite(parseFloat(value)) ? parseFloat(value) : fallback;
  const hex = value => { const match = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(value || ''); return match ? '#' + match.slice(1, 4).map(v => Number(v).toString(16).padStart(2, '0')).join('') : /^#[a-f\d]{6}$/i.test(value || '') ? value : ''; };
  function select(item, callback) {
    selection = item; latest = item; apply = callback;
    const s = item.styles, size = number(s['font-size'], 16);
    const proxy = document.getElementById('native-proxy');
    proxy.innerHTML = Builder.sanitize(item.html || item.text || '');
    for (const key of AgencyEditorCore.properties) proxy.style.setProperty(key, s[key] || '');
    content = { selected: { text: item.text } }; contentBefore = item.text;
    styleState = {}; styleBefore = {}; htmlModeKeys.clear();
    FIELDS = item.editableText ? [{ key: 'selected.text', label: item.tag + ' · ' + item.label, group: '선택한 텍스트', type: 'textarea' }] : [];
    FONT_OPTIONS[0].l = '기존 사이트 서체';
    for (const font of [s['font-family'], ...(item.fonts || []).map(v => '"' + v + '"')]) if (font && !FONT_OPTIONS.some(entry => entry.v === font)) FONT_OPTIONS.push({ v: font, l: font.replaceAll('"', '') });
    buildContentForm();
    if (!item.editableText) document.getElementById('contentForm').textContent = '이 요소는 요소 탭에서 이미지·배경·여백을 수정하세요.';
    if (!item.editableText && document.getElementById('tab-content').classList.contains('active')) switchTab('divbox');
    box = {
      id: 'selected', type: item.tag === 'img' ? 'image' : item.editableText ? 'text' : 'blank',
      common: { padding: number(s['padding-top']), align: s['text-align'] || 'left',
        bg: { mode: s['background-color'] === 'rgba(0, 0, 0, 0)' ? 'none' : 'solid', color: hex(s['background-color']), gradFrom: '#f7f7f3', gradTo: '#efefea', gradAngle: 135, opacity: 100 },
        radius: number(s['border-radius']), border: { width: number(s['border-width']), style: s['border-style'] || 'solid', color: hex(s['border-color']) || '#000000' },
        shadow: { x: 0, y: 0, blur: 0, spread: 0, color: '#000000' }, motion: 'none', customCss: '' },
      text: { html: item.html || '', fontFamily: s['font-family'], fontSize: size, fontWeight: number(s['font-weight'], 400),
        lineHeight: number(s['line-height'], size * 1.5) / size, letterSpacing: number(s['letter-spacing']), color: hex(s.color),
        shadowX: 0, shadowY: 0, shadowBlur: 0, shadowColor: '#000000', gradientOn: false, gradFrom: '#2447ff', gradTo: '#e66a00', gradAngle: 90, mobileScale: 100 },
      image: { src: item.image || '', alt: item.alt || '', decorative: false, fit: s['object-fit'] || 'cover', brightness: 100, contrast: 100, blur: 0, grayscale: 0, sepia: 0,
        hoverEffect: 'none', hoverSpeed: 300, overlayOpacity: 0, overlayColor: '#000000', mask: 'none', link: '', newTab: false },
    };
    before = clone(box);
    const bg = /^linear-gradient\(([\d.]+)deg,\s*(#[a-f\d]{6}),\s*(#[a-f\d]{6})\)$/i.exec(item.authoredStyles?.['background-image'] || '');
    if (bg) { box.common.bg = { ...box.common.bg, mode: 'gradient', gradAngle: Number(bg[1]), gradFrom: bg[2], gradTo: bg[3] }; }
    const shadow = value => {
      const color = hex(value) || '#000000', numbers = (value || '').replace(/rgba?\([^)]*\)/g, '').match(/-?[\d.]+px/g)?.map(parseFloat) || [];
      return { x:numbers[0] || 0, y:numbers[1] || 0, blur:numbers[2] || 0, spread:numbers[3] || 0, color };
    };
    box.common.shadow = shadow(s['box-shadow']);
    const ts = shadow(s['text-shadow']); Object.assign(box.text, { shadowX:ts.x, shadowY:ts.y, shadowBlur:ts.blur, shadowColor:ts.color });
    for (const property of ['brightness','contrast','blur','grayscale','sepia']) {
      const match = new RegExp(property + '\\(([\\d.]+)(%|px)?\\)').exec(s.filter || '');
      if (match) box.image[property] = Number(match[1]) * (!match[2] && property !== 'blur' ? 100 : 1);
    }
    box.text.html = Builder.sanitize(box.text.html);
    before = clone(box);
    Builder.state.sections.selected = { regions: [{ id: 'selected', boxes: [box] }] };
    selectedDivBox = { sectionId: 'selected', regionId: 'selected', boxId: 'selected' };
    DBOX_FONT_PRESETS[0].l = '기존 사이트 서체';
    for (const font of [s['font-family'], ...(item.fonts || []).map(v => '"' + v + '"')]) {
      if (font && !DBOX_FONT_PRESETS.some(entry => entry.v === font)) DBOX_FONT_PRESETS.push({ v: font, l: font.replaceAll('"', '') });
    }
    renderDivBoxPanel();
    decorate();
  }
  function decorate() {
    const body = document.getElementById('divBoxPanelBody');
    // Changing an existing React element into a different node type or wrapping
    // images in links would invalidate stable selectors. Use its existing type.
    const unavailable = new Set(['유형 선택', '등장 애니메이션', '그라데이션 텍스트', '모바일 글자 크기 비율', '호버 효과', '다크 오버레이 불투명도', '클릭 링크 (선택)']);
    body.querySelectorAll('.option-row').forEach(row => {
      if (unavailable.has(row.querySelector(':scope > label')?.textContent)) row.hidden = true;
    });
    const deleteButton = body.querySelector('.divbox-delete-btn');
    if (deleteButton) { deleteButton.textContent = '숨기기'; deleteButton.onclick = () => apply({ styles: { display: 'none' } }); }
    body.querySelectorAll('.image-file-input').forEach(input => input.accept = 'image/png,image/jpeg,image/webp,image/gif,image/avif');
  }
  const originalRender = renderDivBoxPanel;
  renderDivBoxPanel = function () { originalRender(); if (box) decorate(); };
  Builder.refreshBox = function () {
    if (!box || !apply) return;
    const patch = { styles: {} }, c = box.common, t = box.text, im = box.image;
    const changed = (path, action) => {
      const get = object => path.split('.').reduce((value, key) => value?.[key], object);
      if (JSON.stringify(get(before)) !== JSON.stringify(get(box))) action(get(box));
    };
    const style = (path, key, convert = v => String(v)) => changed(path, value => patch.styles[key] = convert(value));
    changed('common.padding', value => ['top','right','bottom','left'].forEach(side => patch.styles['padding-' + side] = value + 'px'));
    style('common.align', 'text-align'); style('common.radius', 'border-radius', v => v + 'px');
    for (const key of ['width','style','color']) style('common.border.' + key, 'border-' + key, v => key === 'width' ? v + 'px' : v);
    changed('common.bg', () => {
      if (c.bg.mode === 'gradient') patch.styles['background-image'] = `linear-gradient(${c.bg.gradAngle}deg, ${c.bg.gradFrom}, ${c.bg.gradTo})`;
      else { patch.styles['background-image'] = 'none'; patch.styles['background-color'] = c.bg.mode === 'none' ? 'transparent' : rgba(c.bg.color || '#ffffff', c.bg.opacity / 100); }
    });
    changed('common.shadow', () => patch.styles['box-shadow'] = `${c.shadow.x}px ${c.shadow.y}px ${c.shadow.blur}px ${c.shadow.spread}px ${c.shadow.color}`);
    changed('common.customCss', value => {
      const declaration = document.createElement('span').style;
      if (/[{}<>]|url\s*\(|@import|expression/i.test(value)) { showToast('선택 요소의 스타일 선언만 입력하세요.'); return; }
      declaration.cssText = value;
      for (const key of declaration) if (AgencyEditorCore.properties.has(key)) patch.styles[key] = declaration.getPropertyValue(key);
    });
    if (selection.editableText) {
      changed('text.html', value => patch.html = Builder.sanitize(value));
      for (const [model, css, suffix] of [['fontFamily','font-family',''],['fontSize','font-size','px'],['fontWeight','font-weight',''],['lineHeight','line-height',''],['letterSpacing','letter-spacing','px'],['color','color','']]) style('text.' + model, css, v => v + suffix);
      if (['shadowX','shadowY','shadowBlur','shadowColor'].some(key => before.text[key] !== t[key])) patch.styles['text-shadow'] = `${t.shadowX}px ${t.shadowY}px ${t.shadowBlur}px ${t.shadowColor}`;
    }
    if (selection.tag === 'img') {
      changed('image.src', value => { if (value) patch.image = value; else patch.image = undefined; });
      changed('image.alt', value => patch.alt = value); changed('image.decorative', value => patch.alt = value ? '' : im.alt);
      style('image.fit', 'object-fit', v => v === 'scaled' ? 'scale-down' : v);
      if (['brightness','contrast','blur','grayscale','sepia'].some(key => before.image[key] !== im[key])) patch.styles.filter = `brightness(${im.brightness}%) contrast(${im.contrast}%) blur(${im.blur}px) grayscale(${im.grayscale}%) sepia(${im.sepia}%)`;
      style('image.mask', 'clip-path', v => ({ none:'none', circle:'circle(50%)', wave:'ellipse(50% 45% at 50% 50%)', diagonal:'polygon(10% 0, 100% 0, 90% 100%, 0 100%)' })[v]);
    }
    if (Object.keys(patch.styles).length || Object.keys(patch).length > 1) apply(patch);
    before = clone(box);
  };
  function rgba(color, opacity) { return 'rgba(' + [1,3,5].map(start => parseInt(color.slice(start,start+2),16)).join(',') + ',' + opacity + ')'; }
  function contentChanged() {
    if (!selection?.editableText || !apply) return;
    const patch = { styles: {} }, value = content.selected.text, current = styleState['selected.text'] || {};
    if (value !== contentBefore) { patch[htmlModeKeys.has('selected.text') ? 'html' : 'text'] = htmlModeKeys.has('selected.text') ? Builder.sanitize(value) : value; contentBefore = value; }
    for (const [key, css, unit] of [['fontFamily','font-family',''],['fontSize','font-size','px'],['letterSpacing','letter-spacing','em'],['color','color',''],['align','text-align','']]) {
      if (current[key] !== styleBefore[key]) patch.styles[css] = current[key] === undefined || current[key] === '' ? '' : current[key] + unit;
    }
    styleBefore = clone(current);
    if (Object.keys(patch.styles).length || Object.keys(patch).length > 1) apply(patch);
  }
  return { select, contentChanged, update(item) { latest = item; }, rebind() { if (latest && apply) select(latest, apply); }, clear() { box = null; selection = null; latest = null; selectedDivBox = null; document.getElementById('contentForm').textContent = '미리보기에서 텍스트를 선택하세요.'; renderDivBoxPanel(); } };
})();
// Keep the original content drawer, with safe rich-text HTML at insertion.
toggleHtmlMode = function (key) {
  if (htmlModeKeys.has(key)) htmlModeKeys.delete(key); else htmlModeKeys.add(key);
  const isHtml = htmlModeKeys.has(key), row = document.getElementById('field-' + key);
  content.selected.text = isHtml ? Builder.sanitize(document.getElementById('native-proxy').innerHTML || content.selected.text) : document.getElementById('native-proxy').textContent || content.selected.text;
  row.querySelector('.field-input').value = content.selected.text;
  row.querySelector('.field-input').classList.toggle('is-html', isHtml);
  row.querySelector('.html-toggle-btn').textContent = isHtml ? '텍스트로 되돌리기' : 'HTML로 수정하기';
  row.querySelector('.html-toggle-btn').classList.toggle('active', isHtml);
};
document.getElementById('contentForm').addEventListener('input', event => {
  if (htmlModeKeys.has('selected.text') && event.target.classList.contains('field-input')) event.target.value = Builder.sanitize(event.target.value);
}, true);
document.querySelectorAll('#panel .tab-btn').forEach(button => button.addEventListener('click', () => switchTab(button.dataset.tab)));
document.getElementById('panelClose').onclick = () => document.body.classList.remove('panel-open');
document.getElementById('adminToggle').onclick = () => document.body.classList.toggle('panel-open');
document.getElementById('nativeSave').onclick = () => document.getElementById('save').click();
document.getElementById('divBoxPanelBody').addEventListener('input', event => {
  const body = event.target.closest('.builder-richtext-body');
  if (body) { const clean = Builder.sanitize(body.innerHTML); if (clean !== body.innerHTML) body.innerHTML = clean; }
}, true);
for (const name of ['paste', 'drop']) document.getElementById('divBoxPanelBody').addEventListener(name, event => {
  const body = event.target.closest('.builder-richtext-body');
  if (!body) return;
  const data = event.clipboardData || event.dataTransfer;
  const html = data?.getData('text/html');
  if (!html) return;
  event.preventDefault(); body.focus();
  document.execCommand('insertHTML', false, Builder.sanitize(html));
  body.dispatchEvent(new Event('input', { bubbles: true }));
}, true);
