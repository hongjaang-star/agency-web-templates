const SECTION_SCHEMAS = {
  hero: {
    label: '히어로',
    layoutOptions: [{ value: 'none', label: '배경 없음 (그래픽 패턴)' }, { value: 'image', label: '이미지 배경' }],
    fields: {
      none: [],
      image: [
        { key: 'bgImage', label: '배경 이미지', alwaysOn: true, options: [
          { key: 'src', label: '이미지 파일', type: 'image', default: '' },
          { key: 'fit', label: '맞춤 방식', type: 'select', choices: [{ v: 'cover', l: '꽉 채우기' }, { v: 'contain', l: '전체 보이기' }], default: 'cover' },
          { key: 'overlay', label: '어둡게 오버레이', type: 'number', min: 0, max: 80, step: 10, unit: '%', default: 20 }
        ] }
      ]
    }
  },
  diff: {
    label: '차별점',
    layoutOptions: [{ value: 'horizontal', label: '가로 배치' }, { value: 'vertical', label: '세로 배치' }],
    fields: { horizontal: diffBaseFields(), vertical: diffBaseFields() }
  },
  board: {
    label: '게시판형 리스트',
    layoutOptions: [{ value: 'text', label: '텍스트 목록형' }, { value: 'thumbnail', label: '썸네일 카드형' }, { value: 'card', label: '썸네일+제목+내용 요약형' }],
    fields: {
      text: [
        { key: 'title', label: '제목', alwaysOn: true, options: [
          { key: 'grid', label: '그리드', type: 'select', choices: [{ v: '1', l: '1열' }, { v: '2', l: '2열' }], default: '1' }
        ] },
        { key: 'date', label: '등록일시', toggle: true, defaultOn: true, options: [
          { key: 'format', label: '표시 형식', type: 'select', choices: [{ v: 'date', l: 'YYYY.MM.DD' }, { v: 'relative', l: 'N일 전' }], default: 'date' }
        ] },
        { key: 'author', label: '등록자', toggle: true, defaultOn: true, options: [] },
        { key: 'thumbnail', label: '썸네일', toggle: true, defaultOn: false, options: [
          { key: 'grid', label: '그리드', type: 'select', choices: [{ v: '1', l: '1열' }, { v: '2', l: '2열' }], default: '1' },
          { key: 'hover', label: '이미지 호버 효과', type: 'select', choices: [{ v: 'zoom', l: '확대' }, { v: 'dim', l: '딤 처리' }, { v: 'none', l: '없음' }], default: 'zoom' }
        ] }
      ],
      thumbnail: [
        { key: 'thumbnail', label: '썸네일', alwaysOn: true, options: [
          { key: 'columns', label: '그리드 열 수', type: 'select', choices: [{ v: '2', l: '2열' }, { v: '3', l: '3열' }, { v: '4', l: '4열' }], default: '3' },
          { key: 'ratio', label: '이미지 비율', type: 'select', choices: [{ v: 'square', l: '정방형' }, { v: '169', l: '16:9' }, { v: '43', l: '4:3' }], default: '43' },
          { key: 'hover', label: '이미지 호버 효과', type: 'select', choices: [{ v: 'zoom', l: '확대' }, { v: 'overlay', l: '오버레이' }, { v: 'none', l: '없음' }], default: 'zoom' },
          { key: 'carousel', label: '슬라이드(캐러셀)', type: 'toggle', default: false }
        ] },
        { key: 'title', label: '제목', alwaysOn: true, options: [
          { key: 'pos', label: '타이틀 위치', type: 'select', choices: [{ v: 'fixed', l: '하단 고정' }, { v: 'hover', l: '호버 시 노출' }], default: 'fixed' },
          { key: 'effect', label: '타이틀 효과', type: 'select', choices: [{ v: 'fade', l: '페이드' }, { v: 'slideup', l: '슬라이드업' }], default: 'fade' }
        ] },
        { key: 'category', label: '카테고리 뱃지', toggle: true, defaultOn: true, options: [] }
      ],
      card: [
        { key: 'thumbnail', label: '썸네일', alwaysOn: true, options: [
          { key: 'columns', label: '그리드 열 수', type: 'select', choices: [{ v: '2', l: '2열' }, { v: '3', l: '3열' }], default: '3' },
          { key: 'ratio', label: '이미지 비율', type: 'select', choices: [{ v: 'square', l: '정방형' }, { v: '169', l: '16:9' }, { v: '43', l: '4:3' }], default: '169' },
          { key: 'hover', label: '이미지 호버 효과', type: 'select', choices: [{ v: 'zoom', l: '확대' }, { v: 'dim', l: '딤 처리' }, { v: 'none', l: '없음' }], default: 'zoom' }
        ] },
        { key: 'title', label: '제목', alwaysOn: true, options: [] },
        { key: 'excerpt', label: '내용 요약', alwaysOn: true, options: [
          { key: 'lines', label: '표시 줄 수', type: 'select', choices: [{ v: '2', l: '2줄' }, { v: '3', l: '3줄' }], default: '2' }
        ] },
        { key: 'date', label: '등록일시', toggle: true, defaultOn: true, options: [
          { key: 'format', label: '표시 형식', type: 'select', choices: [{ v: 'date', l: 'YYYY.MM.DD' }, { v: 'relative', l: 'N일 전' }], default: 'date' }
        ] },
        { key: 'author', label: '등록자', toggle: true, defaultOn: false, options: [] },
        { key: 'category', label: '카테고리 뱃지', toggle: true, defaultOn: true, options: [] }
      ]
    }
  },
  gallery: {
    label: '갤러리·포트폴리오',
    layoutOptions: [{ value: 'grid', label: '그리드' }, { value: 'masonry', label: '메이슨리' }, { value: 'filterTab', label: '필터탭형' }],
    fields: { grid: galleryBaseFields(), masonry: galleryBaseFields(), filterTab: galleryBaseFields() }
  },
  testimonial: {
    label: '후기',
    layoutOptions: [{ value: 'card', label: '카드 나열형' }, { value: 'slide', label: '슬라이드형' }],
    fields: { card: testimonialBaseFields(false), slide: testimonialBaseFields(true) }
  },
  faq: {
    label: 'FAQ',
    layoutOptions: [{ value: 'accordion', label: '아코디언' }, { value: 'card', label: '카드형' }],
    fields: {
      accordion: [
        { key: 'category', label: '카테고리 표시', toggle: true, defaultOn: false, options: [] },
        { key: 'accordionSettings', label: '아코디언 설정', alwaysOn: true, options: [
          { key: 'defaultOpen', label: '기본 펼침 개수', type: 'select', choices: [{ v: '0', l: '모두 닫힘' }, { v: '1', l: '1개 펼침' }, { v: 'all', l: '전체 펼침' }], default: '1' },
          { key: 'icon', label: '아이콘 스타일', type: 'select', choices: [{ v: 'plus', l: '+ / −' }, { v: 'arrow', l: '화살표' }], default: 'plus' }
        ] }
      ],
      card: [
        { key: 'category', label: '카테고리 표시', toggle: true, defaultOn: true, options: [] }
      ]
    }
  }
};

function diffBaseFields() {
  return [
    { key: 'count', label: '항목 개수', alwaysOn: true, options: [
      { key: 'value', label: '개수 (2~6)', type: 'number', min: 2, max: 6, default: 3 }
    ] },
    { key: 'number', label: '번호', alwaysOn: true, options: [
      { key: 'shape', label: '번호 스타일', type: 'select', choices: [{ v: 'square', l: '네모' }, { v: 'round', l: '라운드' }], default: 'square' }
    ] },
    { key: 'typography', label: '공통 폰트 스타일', alwaysOn: true, options: [
      { key: 'weight', label: '제목 굵기', type: 'select', choices: [{ v: '600', l: '미디엄' }, { v: '700', l: '세미볼드' }, { v: '800', l: '볼드' }], default: '700' },
      { key: 'case', label: '제목 표기', type: 'select', choices: [{ v: 'normal', l: '기본' }, { v: 'upper', l: '대문자' }], default: 'normal' }
    ] }
  ];
}
function galleryBaseFields() {
  return [
    { key: 'thumbnail', label: '썸네일', alwaysOn: true, options: [
      { key: 'columns', label: '그리드 열 수', type: 'select', choices: [{ v: '2', l: '2열' }, { v: '3', l: '3열' }, { v: '4', l: '4열' }], default: '3' },
      { key: 'ratio', label: '이미지 비율', type: 'select', choices: [{ v: 'square', l: '정방형' }, { v: '169', l: '16:9' }, { v: '43', l: '4:3' }], default: '43' },
      { key: 'hover', label: '호버 효과', type: 'select', choices: [{ v: 'zoom', l: '확대' }, { v: 'dim', l: '딤 처리' }, { v: 'none', l: '없음' }], default: 'zoom' }
    ] },
    { key: 'title', label: '프로젝트명', alwaysOn: true, options: [
      { key: 'pos', label: '표시 위치', type: 'select', choices: [{ v: 'below', l: '이미지 하단' }, { v: 'overlay', l: '이미지 위 오버레이' }], default: 'below' }
    ] },
    { key: 'category', label: '카테고리', toggle: true, defaultOn: true, options: [] },
    { key: 'summary', label: '요약 설명', toggle: true, defaultOn: false, options: [] }
  ];
}
function testimonialBaseFields(withSlideSettings) {
  const fields = [
    { key: 'content', label: '후기 내용', alwaysOn: true, options: [] },
    { key: 'name', label: '작성자명', alwaysOn: true, options: [] },
    { key: 'role', label: '소속·직함', toggle: true, defaultOn: true, options: [] },
    { key: 'rating', label: '평점', toggle: true, defaultOn: true, options: [
      { key: 'style', label: '별점 스타일', type: 'select', choices: [{ v: 'star', l: '★ 아이콘' }, { v: 'number', l: '숫자 (4.8/5)' }], default: 'star' }
    ] },
    { key: 'avatar', label: '프로필 사진', toggle: true, defaultOn: true, options: [] }
  ];
  if (withSlideSettings) {
    fields.push({ key: 'slideSettings', label: '슬라이드 설정', alwaysOn: true, options: [
      { key: 'autoplay', label: '자동 재생', type: 'toggle', default: true },
      { key: 'pagination', label: '페이지네이션', type: 'select', choices: [{ v: 'dot', l: '도트' }, { v: 'number', l: '숫자' }], default: 'dot' }
    ] });
  }
  return fields;
}

const DEFAULT_BOARD_POSTS = [
  { title: '첫 방문자를 고객으로 바꾸는 랜딩페이지 구조', date: '2026-08-28', author: '관리자', category: '전략', thumbnail: '', excerpt: '첫 화면에서 방문자의 시선이 어디로 향하는지부터 점검하면, 문의 전환율을 가장 빠르게 끌어올릴 수 있습니다.', body: '<p>첫 화면에서 방문자의 시선이 어디로 향하는지부터 점검하면, 문의 전환율을 가장 빠르게 끌어올릴 수 있습니다.</p>' },
  { title: '로컬 비즈니스를 위한 검색 노출 체크리스트', date: '2026-08-19', author: '관리자', category: 'SEO', thumbnail: '', excerpt: '지도 등록, 메타데이터, 로딩 속도까지 — 로컬 사업자가 가장 먼저 챙겨야 할 검색 노출 항목을 정리했습니다.', body: '<p>지도 등록, 메타데이터, 로딩 속도까지 — 로컬 사업자가 가장 먼저 챙겨야 할 검색 노출 항목을 정리했습니다.</p>' },
  { title: '홈페이지 개편, 언제 해야 할까', date: '2026-08-05', author: '관리자', category: '전략', thumbnail: '', excerpt: '트래픽이 아니라 전환율이 떨어지기 시작했다면, 그게 개편을 고민할 신호일 수 있습니다.', body: '<p>트래픽이 아니라 전환율이 떨어지기 시작했다면, 그게 개편을 고민할 신호일 수 있습니다.</p>' },
  { title: '모바일 퍼널에서 자주 놓치는 3가지', date: '2026-07-22', author: '관리자', category: 'UX', thumbnail: '', excerpt: '버튼 크기, 입력 필드 개수, 스크롤 깊이 — 모바일에서 이탈을 부르는 흔한 실수 3가지를 짚어봤습니다.', body: '<p>버튼 크기, 입력 필드 개수, 스크롤 깊이 — 모바일에서 이탈을 부르는 흔한 실수 3가지를 짚어봤습니다.</p>' },
  { title: '문의 전환율을 높이는 CTA 문구', date: '2026-07-10', author: '관리자', category: '카피', thumbnail: '', excerpt: '"문의하기" 대신 어떤 문구를 쓰느냐에 따라 클릭률이 달라집니다. 실제 테스트로 검증된 표현들을 소개합니다.', body: '<p>"문의하기" 대신 어떤 문구를 쓰느냐에 따라 클릭률이 달라집니다.</p>' },
  { title: '포트폴리오 페이지, 사진보다 중요한 것', date: '2026-06-30', author: '관리자', category: '디자인', thumbnail: '', excerpt: '좋은 사진보다 먼저 필요한 건 "어떤 문제를 해결했는지"를 보여주는 한 줄입니다.', body: '<p>좋은 사진보다 먼저 필요한 건 "어떤 문제를 해결했는지"를 보여주는 한 줄입니다.</p>' }
];
let postIdCounter = 0;
let commentIdCounter = 0;
function createBoardData() {
  return DEFAULT_BOARD_POSTS.map((p) => Object.assign({}, p, {
    id: 'post' + (postIdCounter += 1),
    pinned: false,
    password: '',
    comments: []
  }));
}
const GALLERY_ITEMS = [
  { name: '카페 브랜드 홈페이지', category: '브랜딩' },
  { name: '이커머스 리뉴얼', category: '이커머스' },
  { name: '세미나 예약 플랫폼', category: '플랫폼' },
  { name: '뷰티 클리닉 소개 사이트', category: '브랜딩' },
  { name: '구독형 커머스 대시보드', category: '이커머스' },
  { name: '커뮤니티 매칭 서비스', category: '플랫폼' }
];
const TESTIMONIALS = [
  { name: '김서연', role: '브랜드 마케터', content: '요청한 것보다 늘 한 걸음 더 고민해주셔서 결과물에 믿음이 갔습니다.', rating: 4.8 },
  { name: '박도현', role: '스타트업 대표', content: '오픈 이후 문의 전환율이 눈에 띄게 올랐어요. 구조 설계가 확실히 다릅니다.', rating: 5.0 },
  { name: '이하은', role: '운영 매니저', content: '수정 요청에 대한 응답이 빠르고, 근거를 함께 설명해주셔서 편했습니다.', rating: 4.6 },
  { name: '최지우', role: '프로덕트 오너', content: 'SEO까지 챙겨주셔서 별도 대행사를 구할 필요가 없었어요.', rating: 4.9 }
];
const FAQ_ITEMS = [
  { q: '제작 기간은 얼마나 걸리나요?', a: '페이지 수와 기능에 따라 다르지만, 평균적으로 기획부터 오픈까지 4~6주 정도 소요됩니다.', category: '일정' },
  { q: '디자인 시안은 몇 번까지 수정 가능한가요?', a: '기본 2회 수정이 포함되어 있으며, 추가 수정은 별도 협의를 통해 진행합니다.', category: '디자인' },
  { q: '오픈 이후 유지보수도 맡길 수 있나요?', a: '네, 월 단위 유지보수 계약을 통해 콘텐츠 업데이트와 기술 점검을 지원합니다.', category: '운영' },
  { q: 'SEO 최적화도 포함되나요?', a: '모든 프로젝트에 기본 기술 SEO(메타데이터, 구조화 데이터, 사이트맵)가 포함됩니다.', category: 'SEO' },
  { q: '견적은 어떻게 받을 수 있나요?', a: '상담 신청 버튼을 통해 요구사항을 남겨주시면 1~2일 내로 견적을 안내드립니다.', category: '견적' }
];

let sectionConfigs = {};
let galleryActiveTab = '전체';
let testimonialTimer = null;
let settingsState = { screen: 'sectionList', sectionKey: null, detailFieldKey: null };

/* ---------- 박스(div) 스타일 편집 ---------- */
const BOX_LABELS = {
  'wrap.hero': '히어로 섹션 여백',
  'hero.leftPanel': '히어로 텍스트 영역',
  'wrap.services': '서비스 섹션 여백',
  'service.0': '서비스 카드 1',
  'service.1': '서비스 카드 2',
  'service.2': '서비스 카드 3',
  'footer.col.0': '푸터 칼럼 1',
  'footer.col.1': '푸터 칼럼 2',
  'footer.col.2': '푸터 칼럼 3',
  'footer.col.3': '푸터 칼럼 4'
};
const BOX_OPTIONS = [
  { key: 'widthMode', label: '너비', type: 'select', choices: [{ v: 'auto', l: '자동' }, { v: 'custom', l: '직접 지정' }], default: 'auto' },
  { key: 'width', label: '너비 값', type: 'number', min: 100, max: 1200, step: 20, unit: 'px', default: 400, dependsOn: { key: 'widthMode', value: 'custom' } },
  { key: 'heightMode', label: '높이', type: 'select', choices: [{ v: 'auto', l: '자동' }, { v: 'custom', l: '직접 지정' }], default: 'auto' },
  { key: 'height', label: '높이 값', type: 'number', min: 50, max: 800, step: 20, unit: 'px', default: 200, dependsOn: { key: 'heightMode', value: 'custom' } },
  { key: 'align', label: '정렬', type: 'select', choices: [{ v: 'left', l: '왼쪽' }, { v: 'center', l: '가운데' }, { v: 'right', l: '오른쪽' }], default: 'left' },
  { key: 'padding', label: '안쪽 여백 (Padding)', type: 'number', min: 0, max: 120, step: 4, unit: 'px', default: 0 },
  { key: 'margin', label: '바깥 여백 (Margin, 위·아래)', type: 'number', min: 0, max: 120, step: 4, unit: 'px', default: 0 },
  { key: 'bgColor', label: '배경 색상', type: 'color', default: '' },
  { key: 'bgImage', label: '배경 이미지', type: 'image', default: '' }
];
let boxStyleState = {};
let currentBoxKey = null;

function buildDefaultBoxState() {
  const s = {};
  BOX_OPTIONS.forEach((o) => { s[o.key] = o.default; });
  return s;
}
function initBoxStyles() { Object.keys(BOX_LABELS).forEach((k) => { boxStyleState[k] = buildDefaultBoxState(); }); }

function applyBoxStyle(key) {
  const el = document.querySelector('[data-box="' + key + '"]');
  if (!el) return;
  const s = boxStyleState[key];
  if (!s) return;
  el.style.width = s.widthMode === 'custom' ? s.width + 'px' : '';
  el.style.height = s.heightMode === 'custom' ? s.height + 'px' : '';
  el.style.textAlign = s.align || '';
  el.style.padding = s.padding ? s.padding + 'px' : '';
  el.style.marginTop = s.margin ? s.margin + 'px' : '';
  el.style.marginBottom = s.margin ? s.margin + 'px' : '';
  el.style.backgroundColor = s.bgColor || '';
  if (s.bgImage) {
    el.style.backgroundImage = 'url(' + s.bgImage + ')';
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
    el.style.backgroundRepeat = 'no-repeat';
  } else {
    el.style.backgroundImage = '';
    el.style.backgroundSize = '';
    el.style.backgroundPosition = '';
    el.style.backgroundRepeat = '';
  }
}
function applyAllBoxStyles() { Object.keys(boxStyleState).forEach(applyBoxStyle); }

function openBoxPanel(key) {
  currentBoxKey = key;
  document.body.classList.add('panel-open');
  switchTab('box');
}
function renderBoxPanel() {
  const body = document.getElementById('boxPanelBody');
  body.innerHTML = '';
  if (!currentBoxKey) {
    const hint = document.createElement('p'); hint.className = 'structure-hint';
    hint.textContent = '페이지에서 점선 박스 영역을 클릭하면 이곳에서 스타일을 편집할 수 있어요.';
    body.appendChild(hint);
    return;
  }
  const s = boxStyleState[currentBoxKey];
  const title = document.createElement('p'); title.className = 'structure-hint';
  title.textContent = (BOX_LABELS[currentBoxKey] || currentBoxKey) + ' 스타일';
  body.appendChild(title);

  BOX_OPTIONS.forEach((o) => {
    if (o.dependsOn && s[o.dependsOn.key] !== o.dependsOn.value) return;
    const row = document.createElement('div'); row.className = 'option-row';
    const lbl = document.createElement('label'); lbl.textContent = o.label; row.appendChild(lbl);
    renderOptionControl(
      row, o,
      () => s[o.key],
      (v) => { s[o.key] = v; },
      () => { applyBoxStyle(currentBoxKey); markDirty(); },
      () => renderBoxPanel()
    );
    body.appendChild(row);
  });

  const resetBtn = document.createElement('button');
  resetBtn.type = 'button'; resetBtn.className = 'box-reset-btn'; resetBtn.textContent = '이 박스 스타일 초기화';
  resetBtn.addEventListener('click', () => {
    boxStyleState[currentBoxKey] = buildDefaultBoxState();
    applyBoxStyle(currentBoxKey);
    renderBoxPanel();
    markDirty();
  });
  body.appendChild(resetBtn);
}

function buildDefaultFieldState(fieldsDef) {
  const fs = {};
  fieldsDef.forEach((f) => {
    const on = f.alwaysOn ? true : (f.defaultOn !== undefined ? f.defaultOn : true);
    const opts = {};
    (f.options || []).forEach((o) => {
      if (o.type === 'toggle') opts[o.key] = o.default !== undefined ? o.default : true;
      else opts[o.key] = o.default;
    });
    fs[f.key] = { on, opts };
  });
  return fs;
}
function initSectionConfig(key) {
  const schema = SECTION_SCHEMAS[key];
  const layoutType = schema.layoutOptions[0].value;
  sectionConfigs[key] = { layoutType, fieldState: { [layoutType]: buildDefaultFieldState(schema.fields[layoutType]) } };
}
/* sectionKey는 'hero'(고정 단일) 또는 블록 인스턴스 id일 수 있음 */
function resolveActiveSchema(sectionKey) {
  if (sectionKey === 'hero') return SECTION_SCHEMAS.hero;
  const block = CONTENT_BLOCKS.find((b) => b.id === sectionKey);
  return block ? SECTION_SCHEMAS[block.type] : null;
}
function resolveActiveConfig(sectionKey) {
  if (sectionKey === 'hero') return sectionConfigs.hero;
  return CONTENT_BLOCKS.find((b) => b.id === sectionKey);
}
function ensureFieldState(key, layoutType) {
  const config = resolveActiveConfig(key);
  const schema = resolveActiveSchema(key);
  if (!config.fieldState[layoutType]) {
    config.fieldState[layoutType] = buildDefaultFieldState(schema.fields[layoutType]);
  }
}

function openSectionSettings(key) {
  settingsState = { screen: 'layout', sectionKey: key, detailFieldKey: null };
  document.body.classList.add('panel-open');
  switchTab('structure');
}

function renderSettingsScreen() {
  const body = document.getElementById('structureBody');
  const crumbEl = document.getElementById('structureBreadcrumb');
  body.innerHTML = ''; crumbEl.innerHTML = '';

  const crumbs = [{ label: '섹션 선택', screen: 'sectionList' }];
  if (settingsState.sectionKey) {
    const schema = resolveActiveSchema(settingsState.sectionKey);
    const config = resolveActiveConfig(settingsState.sectionKey);
    if (schema && config) {
      crumbs.push({ label: schema.label, screen: 'layout' });
      if (settingsState.screen === 'fields' || settingsState.screen === 'detail') {
        const layoutLabel = schema.layoutOptions.find((o) => o.value === config.layoutType).label;
        crumbs.push({ label: layoutLabel, screen: 'fields' });
      }
      if (settingsState.screen === 'detail') {
        const fieldsDef = schema.fields[config.layoutType];
        const f = fieldsDef.find((x) => x.key === settingsState.detailFieldKey);
        crumbs.push({ label: f.label, screen: 'detail' });
      }
    }
  }
  crumbs.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.className = 'crumb-btn' + (i === crumbs.length - 1 ? ' current' : '');
    btn.textContent = c.label;
    btn.disabled = i === crumbs.length - 1;
    btn.addEventListener('click', () => {
      if (c.screen === 'sectionList') settingsState = { screen: 'sectionList', sectionKey: null, detailFieldKey: null };
      else { settingsState.screen = c.screen; if (c.screen === 'layout') settingsState.detailFieldKey = null; }
      renderSettingsScreen();
    });
    crumbEl.appendChild(btn);
    if (i < crumbs.length - 1) { const sep = document.createElement('span'); sep.className = 'crumb-sep'; sep.textContent = '›'; crumbEl.appendChild(sep); }
  });

  if (settingsState.screen === 'sectionList') renderScreenSectionList(body);
  else if (settingsState.screen === 'layout') renderScreenLayout(body);
  else if (settingsState.screen === 'fields') renderScreenFields(body);
  else if (settingsState.screen === 'detail') renderScreenDetail(body);
}

function renderScreenSectionList(body) {
  const h = document.createElement('p'); h.className = 'structure-hint';
  h.textContent = '페이지에서 ⚙ 섹션 설정 버튼을 클릭하거나, 메뉴 탭에서 콘텐츠 블록의 "구조 설정"을 눌러 편집하세요.';
  body.appendChild(h);
}
function renderScreenLayout(body) {
  const key = settingsState.sectionKey, schema = resolveActiveSchema(key), config = resolveActiveConfig(key);
  const h = document.createElement('p'); h.className = 'structure-hint'; h.textContent = '레이아웃 유형을 선택하세요';
  body.appendChild(h);
  const wrap = document.createElement('div'); wrap.className = 'layout-opt-grid';
  schema.layoutOptions.forEach((opt) => {
    const btn = document.createElement('button');
    btn.className = 'layout-opt-btn' + (config.layoutType === opt.value ? ' active' : '');
    btn.textContent = opt.label;
    btn.addEventListener('click', () => {
      config.layoutType = opt.value;
      ensureFieldState(key, opt.value);
      renderSectionContent(key);
      settingsState.screen = 'fields';
      renderSettingsScreen();
    });
    wrap.appendChild(btn);
  });
  body.appendChild(wrap);
}
function renderScreenFields(body) {
  const key = settingsState.sectionKey, schema = resolveActiveSchema(key), config = resolveActiveConfig(key);
  const layoutType = config.layoutType, fieldsDef = schema.fields[layoutType], fs = config.fieldState[layoutType];
  const h = document.createElement('p'); h.className = 'structure-hint'; h.textContent = '표시할 항목을 선택하세요 · 필수 항목이 위에 고정돼 있어요';
  body.appendChild(h);

  const sorted = [...fieldsDef].sort((a, b) => (b.alwaysOn ? 1 : 0) - (a.alwaysOn ? 1 : 0));
  sorted.forEach((f) => {
    const row = document.createElement('div');
    row.className = 'field-toggle-row' + (f.alwaysOn ? ' required' : '');
    const left = document.createElement('div'); left.className = 'field-toggle-left';

    if (f.alwaysOn) {
      const badge = document.createElement('span'); badge.className = 'field-required-badge'; badge.textContent = '필수';
      left.appendChild(badge);
    } else {
      const sw = document.createElement('label'); sw.className = 'toggle-switch';
      const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = fs[f.key].on;
      cb.addEventListener('change', (e) => { fs[f.key].on = e.target.checked; renderSectionContent(key); });
      const track = document.createElement('span'); track.className = 'track';
      const thumb = document.createElement('span'); thumb.className = 'thumb';
      sw.appendChild(cb); sw.appendChild(track); sw.appendChild(thumb);
      left.appendChild(sw);
    }
    const nameEl = document.createElement('span'); nameEl.className = 'field-name'; nameEl.textContent = f.label;
    left.appendChild(nameEl);
    row.appendChild(left);

    if (f.options && f.options.length) {
      const detailBtn = document.createElement('button'); detailBtn.className = 'field-detail-btn'; detailBtn.textContent = '세부 옵션 ›';
      detailBtn.addEventListener('click', () => { settingsState.screen = 'detail'; settingsState.detailFieldKey = f.key; renderSettingsScreen(); });
      row.appendChild(detailBtn);
    }
    body.appendChild(row);
  });
}
/* ---------- 공용 숫자 스테퍼 (크기·자간·간격 등 모든 숫자 옵션의 공통 스타일) ---------- */
function buildStepperEl(getV, setV, min, max, step, unit, onCommit) {
  const stepper = document.createElement('div'); stepper.className = 'number-stepper';
  const minusBtn = document.createElement('button'); minusBtn.type = 'button'; minusBtn.className = 'stepper-btn'; minusBtn.textContent = '−';
  const valBox = document.createElement('div'); valBox.className = 'stepper-value'; valBox.textContent = getV() + (unit || '');
  const plusBtn = document.createElement('button'); plusBtn.type = 'button'; plusBtn.className = 'stepper-btn'; plusBtn.textContent = '+';
  const update = (delta) => {
    let v = Math.max(min, Math.min(max, getV() + delta));
    v = Math.round(v * 1000) / 1000;
    setV(v); valBox.textContent = v + (unit || '');
    onCommit();
  };
  minusBtn.addEventListener('click', () => update(-step));
  plusBtn.addEventListener('click', () => update(step));
  stepper.appendChild(minusBtn); stepper.appendChild(valBox); stepper.appendChild(plusBtn);
  return stepper;
}
function makeLabeledStepperField(labelText, getV, setV, min, max, step, unit, onCommit) {
  const field = document.createElement('div'); field.className = 'ts-field';
  const lbl = document.createElement('label'); lbl.textContent = labelText; field.appendChild(lbl);
  field.appendChild(buildStepperEl(getV, setV, min, max, step, unit, onCommit));
  return field;
}

/* ---------- 옵션 컨트롤 공용 렌더러 (select/toggle/number/color/image/slider) ---------- */
function renderOptionControl(row, o, getVal, setVal, applyLive, refreshPanel) {
  if (o.type === 'slider') {
    const wrap = document.createElement('div'); wrap.className = 'option-slider-wrap';
    const input = document.createElement('input'); input.type = 'range';
    input.min = o.min !== undefined ? o.min : 0; input.max = o.max !== undefined ? o.max : 100; input.step = o.step || 1;
    input.value = getVal();
    const readout = document.createElement('span'); readout.className = 'option-slider-value'; readout.textContent = getVal() + (o.unit || '');
    input.addEventListener('input', () => {
      const v = Number(input.value);
      setVal(v); readout.textContent = v + (o.unit || '');
      applyLive();
    });
    input.addEventListener('change', () => { if (refreshPanel) refreshPanel(); });
    wrap.appendChild(input); wrap.appendChild(readout);
    row.appendChild(wrap);
  } else if (o.type === 'select') {
    const group = document.createElement('div'); group.className = 'option-btn-group';
    o.choices.forEach((c) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn' + (getVal() === c.v ? ' active' : '');
      btn.textContent = c.l;
      btn.addEventListener('click', () => {
        setVal(c.v);
        group.querySelectorAll('.option-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        applyLive();
        if (refreshPanel) refreshPanel();
      });
      group.appendChild(btn);
    });
    row.appendChild(group);
  } else if (o.type === 'toggle') {
    const sw = document.createElement('label'); sw.className = 'toggle-switch';
    const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = !!getVal();
    cb.addEventListener('change', (e) => { setVal(e.target.checked); applyLive(); if (refreshPanel) refreshPanel(); });
    const track = document.createElement('span'); track.className = 'track';
    const thumb = document.createElement('span'); thumb.className = 'thumb';
    sw.appendChild(cb); sw.appendChild(track); sw.appendChild(thumb);
    row.appendChild(sw);
  } else if (o.type === 'number') {
    row.appendChild(buildStepperEl(getVal, setVal, o.min !== undefined ? o.min : -Infinity, o.max !== undefined ? o.max : Infinity, o.step || 1, o.unit || '', applyLive));
  } else if (o.type === 'color') {
    const wrap = document.createElement('div'); wrap.className = 'style-color-wrap';
    const swatch = document.createElement('input'); swatch.type = 'color'; swatch.value = getVal() || '#ffffff';
    const hex = document.createElement('input'); hex.type = 'text'; hex.className = 'hex-input'; hex.placeholder = '기본값'; hex.value = getVal() || '';
    swatch.addEventListener('input', () => { hex.value = swatch.value; setVal(swatch.value); applyLive(); });
    hex.addEventListener('change', () => {
      const v = hex.value.trim();
      if (v === '' || /^#[0-9a-fA-F]{6}$/.test(v)) { if (v) swatch.value = v; setVal(v); applyLive(); }
      else { hex.value = getVal() || ''; }
    });
    wrap.appendChild(swatch); wrap.appendChild(hex);
    row.appendChild(wrap);
  } else if (o.type === 'image') {
    const wrap = document.createElement('div'); wrap.className = 'image-picker';
    const preview = document.createElement('div'); preview.className = 'image-preview';
    if (getVal()) { const img = document.createElement('img'); img.src = getVal(); preview.appendChild(img); }
    else { const ph = document.createElement('span'); ph.className = 'image-preview-empty'; ph.textContent = '등록된 이미지 없음'; preview.appendChild(ph); }
    const actions = document.createElement('div'); actions.className = 'image-picker-actions';
    const fileInput = document.createElement('input'); fileInput.type = 'file'; fileInput.accept = 'image/*'; fileInput.className = 'image-file-input';
    const pickBtn = document.createElement('button'); pickBtn.type = 'button'; pickBtn.className = 'image-pick-btn';
    pickBtn.textContent = getVal() ? '이미지 변경' : '이미지 선택';
    pickBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (file.size > 3 * 1024 * 1024) { showToast('3MB 이하 이미지를 사용해주세요', true); fileInput.value = ''; return; }
      const reader = new FileReader();
      reader.onload = () => {
        setVal(reader.result);
        applyLive();
        if (refreshPanel) refreshPanel();
      };
      reader.readAsDataURL(file);
    });
    actions.appendChild(pickBtn);
    if (getVal()) {
      const clearBtn = document.createElement('button'); clearBtn.type = 'button'; clearBtn.className = 'image-clear-btn'; clearBtn.textContent = '제거';
      clearBtn.addEventListener('click', () => { setVal(''); applyLive(); if (refreshPanel) refreshPanel(); });
      actions.appendChild(clearBtn);
    }
    actions.appendChild(fileInput);
    wrap.appendChild(preview); wrap.appendChild(actions);
    row.appendChild(wrap);
  }
}

function renderScreenDetail(body) {
  const key = settingsState.sectionKey, schema = resolveActiveSchema(key), config = resolveActiveConfig(key);
  const layoutType = config.layoutType, fieldsDef = schema.fields[layoutType];
  const f = fieldsDef.find((x) => x.key === settingsState.detailFieldKey);
  const fs = config.fieldState[layoutType][f.key];
  const h = document.createElement('p'); h.className = 'structure-hint'; h.textContent = f.label + ' 세부 옵션';
  body.appendChild(h);
  f.options.forEach((o) => {
    const row = document.createElement('div'); row.className = 'option-row';
    const lbl = document.createElement('label'); lbl.textContent = o.label; row.appendChild(lbl);
    renderOptionControl(
      row, o,
      () => fs.opts[o.key],
      (v) => { fs.opts[o.key] = v; },
      () => renderSectionContent(key),
      () => renderSettingsScreen()
    );
    body.appendChild(row);
  });
}
