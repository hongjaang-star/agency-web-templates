# OVEN NOTE / 38

오븐노트38 가상 카페·베이커리. 밝은 식탁, 코발트와 버터 옐로, 다양한 사진 크롭·메뉴판·작업 기록·조합 영수증으로 구성한 독립 Next.js 정적 사이트입니다.

- [사이트](https://hongjaang-star.github.io/agency-web-templates/food-cafe/oven-note/)
- [사이트별 에디터](https://hongjaang-star.github.io/agency-web-templates/food-cafe/oven-note/editor/)
- 9개 콘텐츠 페이지, 메뉴 7종, 원본 콘셉트 사진 12장과 반응형 WebP 24개.
- 메뉴 필터·원재료/알레르기 상세 dialog·굽는 시간 선택·빵/음료 조합 영수증·메모 복사.
- 실제 매장, 재고, 주문, 결제, 예약과 연결하지 않습니다. 가격은 부가세 포함 예시입니다.

## 개발 및 배포

`npm ci`, `npm run dev`, `npm run lint`, `npm run build`. 배포 환경변수는 `.env.example` 참고. 정적 export와 trailing slash를 유지하며 일반 문서 이동으로 GitHub Pages의 페이지 경로를 사용합니다. 서체는 Fontsource 패키지에서 로컬 번들링하며 라이선스는 public/fonts에 보관합니다.

전체 저장소 배포 파이프라인은 export 결과에 공통 에디터를 설치합니다. 에디터 UI 소스는 저장소 editor/, 사이트 콘텐츠는 src/data/, 화면은 src/app 및 src/components로 분리됩니다. 저장 식별자 food-cafe/oven-note는 다른 사이트와 독립입니다.

콘텐츠 수정: src/data/bakery.ts(메뉴·시간표·저널·FAQ), src/data/copy.ts(페이지 문구·기능 라벨). 이미지 출처와 원본 해시는 public/images/sources.json. 다른 사이트 소스나 library를 import하지 않습니다.

검증은 저장소 루트에서 `node tests/bakery-browser.mjs`. 개발용 캡처와 원본 PNG는 공개 저장소에 넣지 않습니다. 배포용 WebP와 실제 홈페이지 썸네일만 포함합니다.
