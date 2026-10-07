# site-spec: biz-manufacturing / isoline  (v1.0, L1)

| 구분 | 값 |
|---|---|
| 비즈니스 | 세로결정밀(가상), 알루미늄 압출·CNC 가공. 방열판, 압출 프로파일, 하우징·케이스, 정밀 가공 브래킷 |
| 목표 | 견적 체크 전환 / 분야·부품·준비 자료 체크 → 요청서 문안 → 메일 / 체크리스트 사용 수 |
| 타깃 | 형태와 공정을 먼저 보고 판단하는 설계·개발 엔지니어, 장비 개발사 |
| 메시지 | 도면의 선 그대로, 부품이 됩니다 / 선화·표제란·공정으로 신뢰를 보여 줌 |
| 톤 | 간결한, 기술적인, 차분한 / 금지: 최고·유일·100%, 인증·수치를 실제처럼 표기 |
| 비주얼 | isoline: forest black #0f1714, panel #16211d, mist #e6ece8, chartreuse #c6f432 / Pretendard(한글, 자체 호스팅) + Space Grotesk(숫자·영문) / 등각 선화, 모눈 도면지, 도면 표제란 |
| 모션 | 첫 화면 하우징 분해 선화(분해/조립 버튼). prefers-reduced-motion 이면 전환 없음 |
| 이미지 | 사진 없음. 카테고리별 등각 선화 + 제품마다 "이미지 설명"(`catalog.ts` 의 `image`) |
| 정보구조 | 홈, 적용 분야(링), 부품 도면 목록, 부품 도면 상세 8, 공정, 회사, 견적 체크 / 홈: exploded-hero, field-ring, drawing-index, process, certs, rfq-cta |
| 시그니처 | 분해 선화 히어로, 외곽선 글자 분야 링(주소 #분야 공유), 도면 표제란이 있는 부품 상세 |
| 데이터 | `src/data/catalog.ts` 하나에서 카테고리 4 · 분야 6 · 모델 8. 부품을 추가하면 링·도면 목록·상세·sitemap·JSON-LD 에 자동 반영 |
| SEO | title "페이지 \| 세로결정밀 부품 도면", Organization·Product·HowTo·FAQPage·BreadcrumbList |
| 규제 | rules/common.md — 가상 업체 데모 표기, 인증·설비·수치는 예시 표기, 방수 등급은 "시험 조건 예시" |
| 기능 | 견적 체크리스트(브라우저 안에서만, 서버 전송 없음), 메일 링크. 사이트 편집기(공통, 빌드 시 설치) |
| 출발 시안 | concepts/biz-manufacturing/isoline · 같은 업종 flagship 은 fieldmap(분야 탐색형) |
