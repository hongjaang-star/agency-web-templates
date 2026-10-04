# 작업 이력과 교훈

| 날짜 | 작업 | 결과 |
|---|---|---|
| 2026-09-30 | 설계안 작성, 고객군 목록화 | Google 문서 v1.0 |
| 2026-10-01 | medical-dermatology 리팩터링: 섹션 블록 12개 분리, 업종 값 data 이동, basePath 환경변수, 정적 export, site-template 스킬 | GitHub 반영 |
| 2026-10-01 | 설계안 문서 6개 탭으로 확장 (운영계획, 파이프라인, 스펙 표준, 자동화, 마케팅·수익화) | Google 문서 v1.2 |
| 2026-10-02 | pro-tax-office/trust 제작: 20 정적 페이지(업무분야 상세 8), 헤더 메뉴·플로팅 버튼·배너·CTA·구조화 데이터를 data 기반으로 공통화 | GitHub Pages 배포 |
| 2026-10-03 | medical-dermatology 이미지 17장 등록 버전 배포 | GitHub Pages 배포 |
| 2026-10-03 | 관리 시트 생성 | 등록 2, 배포 2 |
| 2026-10-04 | 디자인 다양성 원칙, 시안 3개 방식, 모노레포 스타터 키트 | 이 저장소 |
| 2026-10-04 | /migrate: 피부과·세무사무소를 templates/ 로 이관, 루트 워크플로 빌드 확인. SITE_URL 이중 경로·세무 플로팅 버튼 basePath 누락 수정, 데모 noindex 추가 | PR |

## 교훈
- `NEXT_PUBLIC_SITE_URL` 은 도메인만 넣는다. 앱의 `absoluteUrl()` 이 SITE_URL + BASE_PATH 로 조합하므로 경로까지 넣으면 canonical·sitemap 이 이중 경로가 된다(기존 개별 저장소 배포에도 있던 문제).
- 내부 링크는 `next/link` 로. 일반 `<a href="/...">` 에는 basePath 가 붙지 않는다.
- PowerShell 5에서 `$ErrorActionPreference = "Stop"` 은 git·gh·npm 실패를 잡지 못한다. 외부 명령마다 `$LASTEXITCODE` 를 확인할 것. 반대로 stderr 를 `*>` 로 돌리면 정상 응답(예: Pages 409 "already enabled")도 중단 원인이 된다.
- `gh auth login` 이 안 된 상태로 스크립트가 "완료"를 출력한 적이 있다. 결과는 반드시 저장소·Actions 상태로 확인한다.
- 사용자 PC 의 로컬 Git 기록이 원격보다 뒤처질 수 있다. 원격 최신본에 로컬 파일을 덮어쓰는 방식이 안전했다.
- 샌드박스에서는 Google Fonts 접속이 막혀 빌드 검증 시 서체를 임시 대체했다. 실제 빌드는 정상.
- 피부과·세무사무소는 화면 골격(PageHero, CtaBand, 헤더 배치, 푸터)이 같아 같은 템플릿으로 보인다. 다음 사이트부터는 화면 컴포넌트를 공유하지 않는다.
- 피부과 남은 과제: 의료광고 표현("100% 정품·정량", "무료 정밀 진단") 검토.
