# Ember & Claw · 엠버 & 클로

독립 L1 정적 Next.js 앱. 포트폴리오용 가상 스테이크·랍스터 하우스이며 실제 주문/예약을 받지 않습니다.

- 사이트: https://hongjaang-star.github.io/agency-web-templates/food-steakhouse/ember-claw/
- 에디터: 사이트 주소 뒤 `editor/`. 텍스트·서체·자간·이미지·여백, 설정 저장/가져오기/초기화는 siteId로 격리됩니다.
- 기존 사진 적용 시안: https://hongjaang-star.github.io/agency-web-templates/concepts/food-steakhouse/ember-claw/
- 원본 사양서: https://docs.google.com/document/d/1YWm-u5FKOWm8qS9NOLka-QQxegDMuGUxxeqBsIvSjbY/edit

홈·브랜드·메뉴·시즌·매장·예약 6페이지. 원래 시안의 디자인과 메뉴/지점 데이터를 발전시켰으며 다른 앱 화면을 복사하지 않았습니다. `src/data/site.ts`가 화면 문구, `public/site.js`가 메뉴 분류·지점 선택·복사·불씨 기능을 담당합니다. 예약은 사양서대로 네이버 예약 첫 화면 연결이며 가상 데모임을 표시합니다.

사진 31컷은 built-in image_gen으로 각각 제작했습니다. `public/images/manifest.json`에 원본 실제 치수·WebP 치수·크기·SHA256을 기록했습니다. 원본은 생성 도구의 실제 출력 해상도를 유지하고, 확대 보간하지 않았습니다. WebP quality 80, 히어로 최대 1920px/일반 최대 1200px, 최대 파일 237KB. 프롬프트와 장면별 사양은 원본 시안 폴더의 `image-prompts.json`에 보관합니다.

조명 프롬프트: 3000K 로우키, 왼쪽 위 소프트 스팟, 블랙 마블·딥그린·버건디·월넛·브라스, 자연스러운 음식 질감. 글자·로고·간판·워터마크·식별 가능한 얼굴은 제외.

정적 export·trailingSlash·GitHub Pages basePath를 유지합니다. CI가 앱별 빌드 후 공통 editor를 설치합니다. 검증: `node tests/steak-browser.mjs` — 6개 경로/제목, 전체 사진 디코딩, 360/768/1440 가로 넘침, 메뉴 분류, 지점별 사진, editor 6페이지, 기존 시안 6개 화면.
