/* ---------- 요소(div) 속성 패널 : Phase 1 — 공통 스타일 + 텍스트/이미지 유형 ---------- */
let selectedDivBox = null; // {sectionId, regionId, boxId}

function openDivBoxPanel(sectionId, regionId, boxId) {
  selectedDivBox = { sectionId, regionId, boxId };
  document.querySelectorAll('.region-box.box-selected').forEach((el) => el.classList.remove('box-selected'));
  document.querySelector('.region-box[data-box-id="' + boxId + '"]')?.classList.add('box-selected');
  document.body.classList.add('panel-open');
  switchTab('divbox');
}

function getSelectedDivBox() {
  if (!selectedDivBox) return null;
  const r = Builder.state.sections[selectedDivBox.sectionId]?.regions.find((x) => x.id === selectedDivBox.regionId);
  const b = r?.boxes?.find((x) => x.id === selectedDivBox.boxId);
  if (!r || !b) return null;
  Builder.normalizeBox(b);
  return { r, b };
}

function applyLiveDivBox() {
  if (!selectedDivBox) return;
  Builder.refreshBox(selectedDivBox.sectionId, selectedDivBox.regionId, selectedDivBox.boxId);
  markDirty();
}

function deleteSelectedDivBox() {
  if (!selectedDivBox) return;
  const { sectionId, regionId, boxId } = selectedDivBox;
  const r = Builder.state.sections[sectionId]?.regions.find((x) => x.id === regionId);
  if (r?.boxes) {
    document.getElementById('boxcss-' + boxId)?.remove();
    r.boxes.splice(r.boxes.findIndex((x) => x.id === boxId), 1);
  }
  selectedDivBox = null;
  markDirty();
  const pageKey = CONTENT_BLOCKS.find((b) => b.id === sectionId)?.pageKey;
  if (pageKey) Builder.renderPage(pageKey);
  renderDivBoxPanel();
}

function dboxGroup(parent, title, open) {
  const d = document.createElement('details'); d.className = 'divbox-group'; if (open) d.open = true;
  const s = document.createElement('summary'); s.textContent = title; d.appendChild(s);
  parent.appendChild(d);
  return d;
}
function dboxField(container, label, o, getVal, setVal, refresh) {
  const row = document.createElement('div'); row.className = 'option-row';
  const lbl = document.createElement('label'); lbl.textContent = label; row.appendChild(lbl);
  renderOptionControl(row, o, getVal, setVal, applyLiveDivBox, refresh);
  container.appendChild(row);
}
function dboxTextField(container, label, getVal, setVal, placeholder, refresh) {
  const row = document.createElement('div'); row.className = 'option-row';
  const lbl = document.createElement('label'); lbl.textContent = label; row.appendChild(lbl);
  const input = document.createElement('input'); input.type = 'text'; input.className = 'divbox-text-input';
  if (placeholder) input.placeholder = placeholder;
  input.value = getVal() || '';
  input.addEventListener('input', () => { setVal(input.value); applyLiveDivBox(); });
  if (refresh) input.addEventListener('change', refresh);
  row.appendChild(input);
  container.appendChild(row);
}
function dboxRichText(container, getVal, setVal) {
  const wrap = document.createElement('div'); wrap.className = 'divbox-richtext';
  const toolbar = document.createElement('div'); toolbar.className = 'builder-richtext-toolbar';
  const body = document.createElement('div'); body.className = 'builder-richtext-body'; body.contentEditable = 'true';
  body.innerHTML = getVal() || '';
  const commit = () => { const clean = Builder.sanitize(body.innerHTML); setVal(clean); applyLiveDivBox(); };
  const tool = (label, command, value) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'builder-richtext-btn'; b.textContent = label;
    b.onmousedown = (e) => e.preventDefault();
    b.onclick = () => { body.focus(); document.execCommand(command, false, value); commit(); };
    toolbar.appendChild(b);
  };
  tool('굵게', 'bold'); tool('기울임', 'italic'); tool('밑줄', 'underline');
  tool('제목', 'formatBlock', 'H2'); tool('본문', 'formatBlock', 'P');
  tool('목록', 'insertUnorderedList');
  const linkBtn = document.createElement('button'); linkBtn.type = 'button'; linkBtn.className = 'builder-richtext-btn'; linkBtn.textContent = '링크';
  linkBtn.onmousedown = (e) => e.preventDefault();
  linkBtn.onclick = () => {
    const url = prompt('링크 주소 (https://...)'); if (!url) return;
    const safe = Builder.safeURL(url); if (!safe) { showToast('링크 주소를 확인하세요.', true); return; }
    body.focus(); document.execCommand('createLink', false, safe); commit();
  };
  toolbar.appendChild(linkBtn);
  body.addEventListener('input', commit);
  body.addEventListener('blur', () => { const clean = Builder.sanitize(body.innerHTML); body.innerHTML = clean; setVal(clean); applyLiveDivBox(); });
  wrap.appendChild(toolbar); wrap.appendChild(body);
  container.appendChild(wrap);
}

const DBOX_FONT_PRESETS = [
  { v: '', l: '기본 (Pretendard)' },
  { v: 'Georgia,"Times New Roman",serif', l: '세리프' },
  { v: '"Courier New",monospace', l: '모노스페이스' }
];
const DBOX_TYPE_LABELS = { blank: '빈 박스', text: '텍스트', image: '이미지' };

function renderDivBoxPanel() {
  const body = document.getElementById('divBoxPanelBody');
  body.innerHTML = '';
  const sel = getSelectedDivBox();
  if (!sel) {
    const hint = document.createElement('p'); hint.className = 'structure-hint';
    hint.textContent = '캔버스에서 초록 점선 div의 테두리(실선으로 바뀌는 부분)를 클릭하면 이곳에서 속성을 편집할 수 있어요.';
    body.appendChild(hint);
    return;
  }
  const { b } = sel;
  const header = document.createElement('div'); header.className = 'divbox-panel-header';
  const title = document.createElement('p'); title.className = 'structure-hint';
  title.textContent = 'div 요소 편집 · ' + DBOX_TYPE_LABELS[b.type];
  header.appendChild(title);
  const deleteBtn = document.createElement('button'); deleteBtn.type = 'button'; deleteBtn.className = 'divbox-delete-btn'; deleteBtn.textContent = '삭제';
  deleteBtn.ariaLabel = '이 div 삭제';
  deleteBtn.onclick = () => { if (confirm('이 div를 삭제할까요?')) deleteSelectedDivBox(); };
  header.appendChild(deleteBtn);
  body.appendChild(header);

  const typeRow = document.createElement('div'); typeRow.className = 'option-row';
  const typeLbl = document.createElement('label'); typeLbl.textContent = '유형 선택'; typeRow.appendChild(typeLbl);
  renderOptionControl(typeRow, { type: 'select', choices: [{ v: 'blank', l: '빈 박스' }, { v: 'text', l: '텍스트' }, { v: 'image', l: '이미지' }] },
    () => b.type, (v) => { b.type = v; }, applyLiveDivBox, () => renderDivBoxPanel());
  body.appendChild(typeRow);

  /* ---- 공통 스타일 ---- */
  const common = dboxGroup(body, '공통 스타일 · 배경 / 테두리 / 그림자', true);
  const c = b.common;
  dboxField(common, '안쪽 여백 (Padding)', { type: 'slider', min: 0, max: 100, step: 1, unit: 'px' }, () => c.padding, (v) => { c.padding = v; });
  dboxField(common, '텍스트 정렬', { type: 'select', choices: [{ v: 'left', l: '왼쪽' }, { v: 'center', l: '가운데' }, { v: 'right', l: '오른쪽' }] }, () => c.align, (v) => { c.align = v; });
  dboxField(common, '배경 종류', { type: 'select', choices: [{ v: 'none', l: '없음' }, { v: 'solid', l: '단색' }, { v: 'gradient', l: '그라데이션' }] }, () => c.bg.mode, (v) => { c.bg.mode = v; }, () => renderDivBoxPanel());
  if (c.bg.mode === 'solid') dboxField(common, '배경 색상', { type: 'color' }, () => c.bg.color, (v) => { c.bg.color = v; });
  if (c.bg.mode === 'gradient') {
    dboxField(common, '그라데이션 시작 색', { type: 'color' }, () => c.bg.gradFrom, (v) => { c.bg.gradFrom = v; });
    dboxField(common, '그라데이션 끝 색', { type: 'color' }, () => c.bg.gradTo, (v) => { c.bg.gradTo = v; });
    dboxField(common, '그라데이션 각도', { type: 'slider', min: 0, max: 360, step: 5, unit: '°' }, () => c.bg.gradAngle, (v) => { c.bg.gradAngle = v; });
  }
  if (c.bg.mode !== 'none') dboxField(common, '배경 불투명도', { type: 'slider', min: 0, max: 100, step: 1, unit: '%' }, () => c.bg.opacity, (v) => { c.bg.opacity = v; });
  dboxField(common, '모서리 둥글기', { type: 'slider', min: 0, max: 50, step: 1, unit: 'px' }, () => c.radius, (v) => { c.radius = v; });
  dboxField(common, '테두리 두께', { type: 'slider', min: 0, max: 20, step: 1, unit: 'px' }, () => c.border.width, (v) => { c.border.width = v; }, () => renderDivBoxPanel());
  if (c.border.width) {
    dboxField(common, '테두리 스타일', { type: 'select', choices: [{ v: 'solid', l: '실선' }, { v: 'dashed', l: '점선' }, { v: 'dotted', l: '점' }] }, () => c.border.style, (v) => { c.border.style = v; });
    dboxField(common, '테두리 색상', { type: 'color' }, () => c.border.color, (v) => { c.border.color = v; });
  }
  dboxField(common, '그림자 흐림(Blur)', { type: 'slider', min: 0, max: 60, step: 1, unit: 'px' }, () => c.shadow.blur, (v) => { c.shadow.blur = v; }, () => renderDivBoxPanel());
  if (c.shadow.blur) {
    dboxField(common, '그림자 X 이동', { type: 'slider', min: -40, max: 40, step: 1, unit: 'px' }, () => c.shadow.x, (v) => { c.shadow.x = v; });
    dboxField(common, '그림자 Y 이동', { type: 'slider', min: -40, max: 40, step: 1, unit: 'px' }, () => c.shadow.y, (v) => { c.shadow.y = v; });
    dboxField(common, '그림자 확산(Spread)', { type: 'slider', min: 0, max: 40, step: 1, unit: 'px' }, () => c.shadow.spread, (v) => { c.shadow.spread = v; });
    dboxField(common, '그림자 색상', { type: 'color' }, () => c.shadow.color, (v) => { c.shadow.color = v; });
  }
  dboxField(common, '등장 애니메이션', { type: 'select', choices: [{ v: 'none', l: '없음' }, { v: 'up', l: '아래→위' }, { v: 'down', l: '위→아래' }, { v: 'left', l: '왼쪽→' }, { v: 'right', l: '오른쪽→' }, { v: 'fade', l: '페이드' }, { v: 'zoom', l: '확대' }] }, () => c.motion, (v) => { c.motion = v; });
  const cssRow = document.createElement('div'); cssRow.className = 'option-row';
  const cssLbl = document.createElement('label'); cssLbl.textContent = '커스텀 CSS (선택 · url()/@import 불가)'; cssRow.appendChild(cssLbl);
  const cssArea = document.createElement('textarea'); cssArea.className = 'divbox-css-input'; cssArea.rows = 4; cssArea.placeholder = 'background:#fff; letter-spacing:.02em;';
  cssArea.value = c.customCss || '';
  cssArea.addEventListener('input', () => { c.customCss = cssArea.value; applyLiveDivBox(); });
  cssRow.appendChild(cssArea); common.appendChild(cssRow);

  /* ---- 유형별 옵션 ---- */
  if (b.type === 'text') {
    const t = b.text;
    const g = dboxGroup(body, '텍스트 옵션', true);
    const rtRow = document.createElement('div'); rtRow.className = 'option-row';
    const rtLbl = document.createElement('label'); rtLbl.textContent = '내용'; rtRow.appendChild(rtLbl);
    g.appendChild(rtRow);
    dboxRichText(rtRow, () => t.html, (v) => { t.html = v; });
    dboxField(g, '폰트', { type: 'select', choices: DBOX_FONT_PRESETS }, () => t.fontFamily, (v) => { t.fontFamily = v; });
    dboxField(g, '폰트 크기', { type: 'slider', min: 8, max: 120, step: 1, unit: 'px' }, () => t.fontSize, (v) => { t.fontSize = v; });
    dboxField(g, '굵기', { type: 'select', choices: [{ v: 300, l: '얇게' }, { v: 400, l: '보통' }, { v: 600, l: '중간' }, { v: 700, l: '굵게' }, { v: 800, l: '매우 굵게' }] }, () => t.fontWeight, (v) => { t.fontWeight = v; });
    dboxField(g, '줄간격', { type: 'slider', min: 0.8, max: 3, step: 0.05, unit: '' }, () => t.lineHeight, (v) => { t.lineHeight = v; });
    dboxField(g, '자간', { type: 'slider', min: -2, max: 10, step: 0.1, unit: 'px' }, () => t.letterSpacing, (v) => { t.letterSpacing = v; });
    dboxField(g, '텍스트 색상', { type: 'color' }, () => t.color, (v) => { t.color = v; });
    dboxField(g, '텍스트 그림자 흐림', { type: 'slider', min: 0, max: 30, step: 1, unit: 'px' }, () => t.shadowBlur, (v) => { t.shadowBlur = v; }, () => renderDivBoxPanel());
    if (t.shadowBlur) {
      dboxField(g, '그림자 X', { type: 'slider', min: -20, max: 20, step: 1, unit: 'px' }, () => t.shadowX, (v) => { t.shadowX = v; });
      dboxField(g, '그림자 Y', { type: 'slider', min: -20, max: 20, step: 1, unit: 'px' }, () => t.shadowY, (v) => { t.shadowY = v; });
      dboxField(g, '그림자 색상', { type: 'color' }, () => t.shadowColor, (v) => { t.shadowColor = v; });
    }
    dboxField(g, '그라데이션 텍스트', { type: 'toggle' }, () => t.gradientOn, (v) => { t.gradientOn = v; }, () => renderDivBoxPanel());
    if (t.gradientOn) {
      dboxField(g, '그라데이션 시작 색', { type: 'color' }, () => t.gradFrom, (v) => { t.gradFrom = v; });
      dboxField(g, '그라데이션 끝 색', { type: 'color' }, () => t.gradTo, (v) => { t.gradTo = v; });
      dboxField(g, '그라데이션 각도', { type: 'slider', min: 0, max: 360, step: 5, unit: '°' }, () => t.gradAngle, (v) => { t.gradAngle = v; });
    }
    dboxField(g, '모바일 글자 크기 비율', { type: 'slider', min: 40, max: 100, step: 5, unit: '%' }, () => t.mobileScale, (v) => { t.mobileScale = v; });
  } else if (b.type === 'image') {
    const im = b.image;
    const g = dboxGroup(body, '이미지 옵션', true);
    dboxField(g, '이미지', { type: 'image' }, () => im.src, (v) => { im.src = v; }, () => renderDivBoxPanel());
    dboxField(g, '장식 이미지 (설명 생략)', { type: 'toggle' }, () => im.decorative, (v) => { im.decorative = v; }, () => renderDivBoxPanel());
    if (!im.decorative) dboxTextField(g, '대체 텍스트 (정보 이미지 필수)', () => im.alt, (v) => { im.alt = v; });
    dboxField(g, '맞춤', { type: 'select', choices: [{ v: 'cover', l: 'Cover' }, { v: 'contain', l: 'Contain' }, { v: 'fill', l: 'Fill' }, { v: 'scaled', l: 'Scaled' }] }, () => im.fit, (v) => { im.fit = v; });
    dboxField(g, '밝기', { type: 'slider', min: 0, max: 200, step: 5, unit: '%' }, () => im.brightness, (v) => { im.brightness = v; });
    dboxField(g, '대비', { type: 'slider', min: 0, max: 200, step: 5, unit: '%' }, () => im.contrast, (v) => { im.contrast = v; });
    dboxField(g, '블러', { type: 'slider', min: 0, max: 20, step: 1, unit: 'px' }, () => im.blur, (v) => { im.blur = v; });
    dboxField(g, '흑백', { type: 'slider', min: 0, max: 100, step: 5, unit: '%' }, () => im.grayscale, (v) => { im.grayscale = v; });
    dboxField(g, '세피아', { type: 'slider', min: 0, max: 100, step: 5, unit: '%' }, () => im.sepia, (v) => { im.sepia = v; });
    dboxField(g, '호버 효과', { type: 'select', choices: [{ v: 'none', l: '없음' }, { v: 'zoom', l: '확대' }, { v: 'tilt', l: '기울임' }, { v: 'overlay', l: '오버레이' }] }, () => im.hoverEffect, (v) => { im.hoverEffect = v; }, () => renderDivBoxPanel());
    if (im.hoverEffect !== 'none') dboxField(g, '효과 속도', { type: 'slider', min: 100, max: 1000, step: 50, unit: 'ms' }, () => im.hoverSpeed, (v) => { im.hoverSpeed = v; });
    dboxField(g, '다크 오버레이 불투명도', { type: 'slider', min: 0, max: 100, step: 5, unit: '%' }, () => im.overlayOpacity, (v) => { im.overlayOpacity = v; }, () => renderDivBoxPanel());
    if (im.overlayOpacity) dboxField(g, '오버레이 색상', { type: 'color' }, () => im.overlayColor, (v) => { im.overlayColor = v; });
    dboxField(g, '클리핑 마스크', { type: 'select', choices: [{ v: 'none', l: '없음' }, { v: 'circle', l: '원형' }, { v: 'wave', l: '물결' }, { v: 'diagonal', l: '대각선' }] }, () => im.mask, (v) => { im.mask = v; });
    dboxTextField(g, '클릭 링크 (선택)', () => im.link, (v) => { im.link = v; }, 'https://...', () => renderDivBoxPanel());
    if (im.link) dboxField(g, '새 창으로 열기', { type: 'toggle' }, () => im.newTab, (v) => { im.newTab = v; }, () => renderDivBoxPanel());
  }
}
