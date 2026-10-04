# agency-web-templates 작업 규칙

업종별 홈페이지 포트폴리오 모노레포. 목표: 하루 1개 업종, 고객이 "템플릿을 받았다"고 느끼지 않는 고유한 디자인.

## 핵심 원칙: 보이지 않는 것은 공통, 보이는 것은 고유
- 공통(재사용): 빌드·배포, SEO·구조화 데이터, 데이터 형식, 폼/예약 API, 접근성·성능 기준, 규제 문구 검사
- 고유(매번 설계): 레이아웃·그리드, 헤더·푸터, 히어로, 서체 조합, 여백 리듬, 이미지 연출, 모션, 카피 말투, 정보 구조(섹션 순서)

## 저장소 구조
- `concepts/{slug}/{concept}/index.html` — 시안. 단일 HTML(인라인 CSS/JS), 빌드 없음
- `templates/{slug}/{variant}/` — 완성 사이트. 독립 Next.js 앱(정적 export)
- `registry/backlog.json` — 업종 대기열, `registry/sites.json` — 완성 사이트와 디자인 지문
- `rules/*.md` — 업종 규제 사전 (카피 작성과 QA에 반드시 사용)

## 작업 흐름
1. `/next-site` 또는 `/concepts <slug>` → 시안 3개 (skill: site-concepts, design-diversity)
2. 사람이 시안 선택
3. `/build-site <slug> <concept>` → 완성 사이트 (skill: site-build)

## 규칙
- 작업은 브랜치에서 하고 PR로 올린다. PR 본문에 미리보기 주소와 체크리스트 결과를 적는다.
- 커밋 메시지: `feat(<slug>): ...`, `concept(<slug>): ...`, `chore: ...`
- 실존 업체 상호·문구·이미지를 복제하지 않는다. 모든 데모에 "가상 업체 데모" 표기.
- 업체명·업종 문구는 컴포넌트가 아니라 data 파일에만 둔다.
- 작업이 끝나면 registry 파일을 갱신한다.
