<!-- 원본: Google Docs '에이전시 템플릿형 홈페이지 구축 설계안' / 탭 '자동화 시스템' (2026-10-02 v1.2 기준 사본) -->

# 자동화 시스템

목표는 승인 게이트 세 곳을 제외한 모든 단계를 명령 하나로 실행하는 것이다. 한 번에 다 만들지 않고, 매주 생산하면서 시간이 가장 많이 드는 단계부터 자동화한다.

## 구성 요소

도구는 무료이거나 사용량 기반 요금인 것으로 시작하고, 매출이 생긴 뒤 유료 도구를 검토한다.

| 구성 요소 | 도구 | 역할 |
|---|---|---|
| 저장소 | GitHub 모노레포 agency-web-templates | 공통 패키지, 템플릿, 스킬, 규제 사전 |
| 생성 엔진 | Claude Code와 skills | 스펙 기반 데이터·블록 생성, 커밋 |
| 명령 도구 | npm 스크립트 (new, qa, shot, sns, publish) | 단계별 실행 진입점 |
| CI·CD | GitHub Actions | 검사, 빌드, 배포, 소재 생성, 기록 |
| 호스팅 | 정적 호스팅 (Cloudflare Pages 또는 Vercel) | 데모 사이트와 포트폴리오 사이트 |
| 이미지 소재 | Playwright 스크린샷, Satori·Sharp 합성 | 캐러셀, 목업, 썸네일 |
| 영상 소재 | Playwright 스크롤 녹화와 FFmpeg | 15초 스크롤 릴스 |
| 발행 | Meta Graph API, Threads API, YouTube Data API | 인스타그램·페이스북·스레드·쇼츠 예약 발행 |
| 기록 | Google Docs·Sheets API | 진행 현황, 업종 백로그, KPI 갱신 |
| 폼 백엔드 | PHP와 MySQL 공통 API | 상담·견적·예약 접수 (L2 이후) |

## 명령 체계

사람이 기억할 명령은 다섯 개다. 인자는 슬러그와 변형이다.

| 명령 | 하는 일 |
|---|---|
| npm run new -- pro-tax-office trust | 템플릿 복제, 업종 설정 초기화, research.md와 site-spec.md 초안 생성, 작업 브랜치 생성 |
| npm run qa -- pro-tax-office/trust | lint, 타입 검사, 빌드, Lighthouse CI, 링크·접근성·금지 표현 검사, QA 리포트 |
| npm run shot -- pro-tax-office/trust | 데스크톱·모바일 스크린샷, 목업 합성, 썸네일 |
| npm run sns -- pro-tax-office/trust | 캐러셀 5장, 스크롤 릴스, 캡션 3안 생성 |
| npm run publish -- pro-tax-office/trust | 승인된 소재 예약 발행, 진행 현황 문서 갱신 |

## Git 규칙과 배포 흐름

커밋, 배포, 소재 생성은 사람이 따로 실행하지 않고 Git 이벤트에 연결한다.

1. 작업은 site/{슬러그}-{변형} 브랜치에서 하고 단계마다 커밋한다.
1. 커밋 메시지는 "feat(pro-tax-office): trust 변형 메인 섹션 구성" 형식으로 쓰고 이것으로 CHANGELOG를 자동 생성한다.
1. PR을 열면 Actions가 qa를 실행하고 리포트와 미리보기 URL을 PR 댓글로 남긴다.
1. G2 승인 후 main에 병합하면 데모 서버(demo.도메인/{슬러그}/{변형})에 배포되고 포트폴리오 목록(templates.json)이 갱신된다.
1. 배포가 끝나면 shot과 sns가 이어서 실행되고, 소재는 Google Drive의 marketing 폴더에 저장된다.
1. G3 승인 후 publish가 예약 발행하고 이 문서의 진행 현황을 갱신한다.

## 자동화 단계

생산을 멈추지 않고 단계적으로 올린다. 각 단계는 앞 단계가 2주 이상 안정적으로 돌아간 뒤 착수한다.

| 단계 | 범위 | 시점 | 효과 |
|---|---|---|---|
| A1 | 스킬, new·qa 명령 | 0주차 | 구현·검사 시간 절반 |
| A2 | CI 배포, 포트폴리오 목록 자동 갱신 | 1주차 | 배포 수작업 제거 |
| A3 | shot·sns 소재 자동 생성 | 2~3주차 | SNS 준비 10분 이내 |
| A4 | 예약 발행 API, 진행 현황 자동 기록 | 5~6주차 | 발행·기록 수작업 제거 |
| A5 | S0~S8 일괄 실행, 사람은 G1~G3만 | 9주차 이후 | 하루 2개 이상 생산 가능 |

## 모노레포 구조

업종이 3개를 넘는 1주차에 agency-web-templates로 이관한다.

- packages/core: 레이아웃, SEO, 구조화 데이터, 공통 UI
- packages/blocks: 업종 공통 섹션 블록
- packages/modules: 지도, 폼, 게시판, 예약 클라이언트
- packages/themes: 테마 프리셋 토큰
- templates/{슬러그}/{변형}: 업종별 사이트 (data, 이미지, 전용 블록)
- skills/, rules/: Claude 스킬, 업종 규제 사전
- marketing/templates: 캐러셀·썸네일 디자인 템플릿
- scripts/, api/: 명령 스크립트, PHP 공통 폼 API (L2부터)

## 주의 사항

외부 플랫폼 정책 때문에 완전 자동화가 어려운 부분이 있다.

- 인스타그램 자동 발행은 비즈니스 계정과 Meta 앱 검수가 필요하다. 검수 전에는 예약 발행 도구나 수동 업로드로 운영한다.
- 네이버 블로그는 자동 발행 경로가 제한적이므로 초안 생성까지만 자동화하고 게시는 사람이 한다.
- API 키와 토큰은 GitHub Secrets에만 두고 저장소 파일에 쓰지 않는다.
