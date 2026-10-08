# site-spec: biz-manufacturing / fieldmap  (v1.0, L1)

| 구분 | 값 |
|---|---|
| 비즈니스 | 세로결정밀(가상), 알루미늄 압출·CNC 가공. 방열판, 압출 프로파일, 하우징·케이스, 정밀 가공 브래킷 |
| 목표 | 견적 요청 전환 / "견적에 담기" → 체크리스트 정리 → 메일 / 담은 모델 수, 견적 정리 횟수 |
| 타깃 | 완성품 제조사 구매·개발 담당자, 장비 협력사 관리 부서 |
| 메시지 | 어디에 쓰실 부품인가요? / 분야 → 모델 → 사양·최소 주문·납기를 한 번에 |
| 톤 | 짧은, 구체적인, 수치 중심 / 금지: 최고·유일·100%, 인증·고객사를 실제처럼 표기 |
| 비주얼 | fieldmap: graphite #1f2326, aluminum #d9dcdf, paper #f4f5f6, safety orange #ff5a1f / IBM Plex Sans KR(굵기 대비) + IBM Plex Mono(품번·사양) / 줄무늬 로고, 얇은 괘선, 4px 모서리 |
| 모션 | 없음(필터는 즉시 반영). prefers-reduced-motion 대응 |
| 이미지 | 사진 없음. 카테고리별 선화 + 제품마다 "이미지 설명"(가상 제품 사진 지시문, `catalog.ts` 의 `image`) |
| 정보구조 | 홈, 제품 찾기, 제품 상세 8, 적용 분야, 분야 상세 6, 설비·공정, 회사, 견적 요청 / 홈: application-picker, categories, featured, numbers, certs·sectors, quote-cta |
| 시그니처 | 적용 분야 × 카테고리 제품 찾기(주소 `?app=&cat=` 공유), 카드의 "견적에 담기"와 헤더 배지, 견적 요청 체크리스트 |
| 데이터 | `src/data/catalog.ts` 하나에서 카테고리 4 · 분야 6 · 모델 8 관리. 제품을 추가하면 찾기·분야·상세·sitemap·JSON-LD 에 자동 반영 |
| SEO | 알루미늄 부품·방열판·프로파일 키워드, title "페이지 \| 세로결정밀 알루미늄 부품", Organization·Product·FAQPage·BreadcrumbList |
| 규제 | rules/common.md — 가상 업체 데모 표기, 인증·고객·설비·수치는 예시 표기, 방수 등급은 "시험 조건 예시" |
| 기능 | 견적 담기(브라우저 저장, 서버 전송 없음), 메일 링크. 사이트 편집기(공통, 빌드 시 설치). 견적 폼 접수는 L2 |
| 출발 시안 | concepts/biz-manufacturing/fieldmap (레퍼런스 보고서 조합 1, 이슈 #30) |
