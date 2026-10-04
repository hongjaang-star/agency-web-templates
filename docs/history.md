# 작업 이력과 교훈

| 날짜 | 작업 | 결과 |
|---|---|---|
| 2026-10-05 | 인테리어 FORME / 07 독립 10페이지·AI 이미지·공통 에디터·공간 사례 필터/재료 선택/준비 요약. 실제 썸네일과 공간 라벨 등록, 포트폴리오 집계 자동화, 빌드·360px·편집 저장 검증 | 완성 사이트 4개 + 시안 3개 |
| 2026-10-04 | 로컬 스튜디오구조 홈페이지를 Pages 루트로 게시. 실제 6개 사이트 캡처 썸네일·업종/상태 라벨·세 줄 설명·새 창 연결, 데스크톱/모바일/필터/링크 검증 | agency/ 및 registry/portfolio.json |
| 2026-10-04 | 공통 editor/ 단일 소스로 동일한 UI·기능 유지, 중복 소스 6종 통합, /editor/ 접근 및 siteId별 저장/적용 분리 유지 | 에디터 1.1.0 |
| 2026-10-04 | 로컬 원본 콘텐츠/요소 패널 JS·CSS를 그대로 사용하고 사이트별 site-editor 소스 분리. 기존 소스 자동 덮어쓰기 제거, 실제 원본 컨트롤/리치 텍스트/이미지 검사 | 독립 에디터 소스 6종 |
| 2026-10-04 | 로컬 피부과 에디터 분석 후 텍스트·자간·이미지·여백 공통 편집기 구현. 완성 템플릿과 HTML 시안에 자동 설치, 사이트별 IndexedDB/설정 격리, JSON 배포, 실제 브라우저 통합 검사 | 사이트별 editor/ |
| 2026-09-30 | 설계안 작성, 고객군 목록화 | Google 문서 v1.0 |
| 2026-10-01 | medical-dermatology 리팩터링: 섹션 블록 12개 분리, 업종 값 data 이동, basePath 환경변수, 정적 export, site-template 스킬 | GitHub 반영 |
| 2026-10-01 | 설계안 문서 6개 탭으로 확장 (운영계획, 파이프라인, 스펙 표준, 자동화, 마케팅·수익화) | Google 문서 v1.2 |
| 2026-10-02 | pro-tax-office/trust 제작: 20 정적 페이지(업무분야 상세 8), 헤더 메뉴·플로팅 버튼·배너·CTA·구조화 데이터를 data 기반으로 공통화 | GitHub Pages 배포 |
| 2026-10-03 | medical-dermatology 이미지 17장 등록 버전 배포 | GitHub Pages 배포 |
| 2026-10-03 | 관리 시트 생성 | 등록 2, 배포 2 |
| 2026-10-04 | 디자인 다양성 원칙, 시안 3개 방식, 모노레포 스타터 키트 | 이 저장소 |
| 2026-10-04 | /migrate: 피부과·세무사무소를 templates/ 로 이관, 루트 워크플로 빌드 확인. SITE_URL 이중 경로·세무 플로팅 버튼 basePath 누락 수정, 데모 noindex 추가 | PR |
| 2026-10-04 | pro-tax-office/almanac 완성(16페이지, Tailwind 없는 독립 앱), trust 삭제, library 17개 모듈 추가 | PR |
| 2026-10-04 | pro-tax-office 재디자인 시안 3개(almanac·compass·lifemap), research/pro-tax-office.md | PR |
| 2026-10-04 | 사이트 소스 분리 검사, 앱 내 site-template 스킬 제거, 모듈 스타일 라이브러리(library/, 33개 모듈 캡처·스타일 코드) | PR |
| 2026-10-04 | 유형·변형 관리 방법(plan 07), trust 복원, registry role·type 필드, 배포 목록 업종별 묶음, 관리 시트 유형·역할 열 | PR |

## 교훈
2026-10-04: trust 다크 골드 개정, AI 세무사 프로필 3장, 카드 hover/focus 개선. lint·정적 빌드 통과, 360px 가로 넘침 없음.
- 루트에 package-lock.json 이 생기면 Next(Turbopack)가 모노레포 루트를 작업 루트로 잡는다. 각 앱 next.config 에 `turbopack.root` 를 둔다.
- 날짜에 따라 바뀌는 화면(D-day 등)은 정적 빌드 시점에 굳지 않도록 브라우저에서 계산한다.
- `NEXT_PUBLIC_SITE_URL` 은 도메인만 넣는다. 앱의 `absoluteUrl()` 이 SITE_URL + BASE_PATH 로 조합하므로 경로까지 넣으면 canonical·sitemap 이 이중 경로가 된다(기존 개별 저장소 배포에도 있던 문제).
- 내부 링크는 `next/link` 로. 일반 `<a href="/...">` 에는 basePath 가 붙지 않는다.
- PowerShell 5에서 `$ErrorActionPreference = "Stop"` 은 git·gh·npm 실패를 잡지 못한다. 외부 명령마다 `$LASTEXITCODE` 를 확인할 것. 반대로 stderr 를 `*>` 로 돌리면 정상 응답(예: Pages 409 "already enabled")도 중단 원인이 된다.
- `gh auth login` 이 안 된 상태로 스크립트가 "완료"를 출력한 적이 있다. 결과는 반드시 저장소·Actions 상태로 확인한다.
- 사용자 PC 의 로컬 Git 기록이 원격보다 뒤처질 수 있다. 원격 최신본에 로컬 파일을 덮어쓰는 방식이 안전했다.
- 샌드박스에서는 Google Fonts 접속이 막혀 빌드 검증 시 서체를 임시 대체했다. 실제 빌드는 정상.
- 피부과·세무사무소는 화면 골격(PageHero, CtaBand, 헤더 배치, 푸터)이 같아 같은 템플릿으로 보인다. 다음 사이트부터는 화면 컴포넌트를 공유하지 않는다.
- 피부과 남은 과제: 의료광고 표현("100% 정품·정량", "무료 정밀 진단") 검토.
