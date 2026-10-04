---
name: site-build
description: 선택된 시안을 완성 사이트(templates/{slug}/{variant})로 만든다. /build-site 에서 사용.
---

# 선택 시안 → 완성 사이트

1. `templates/` 의 기존 사이트 하나를 엔진 참고용으로 읽는다(SEO, 구조화 데이터, config, sitemap, robots, og, 정적 export 설정).
   화면 컴포넌트는 복사하지 않고 선택 시안의 디자인으로 새로 만든다.
2. `templates/{slug}/{concept}/` 에 독립 Next.js 앱을 만든다. basePath 는 `NEXT_PUBLIC_BASE_PATH` 환경변수.
3. 시안 디자인을 그대로 옮기고 서브페이지(소개, 서비스 목록·상세, 사례 또는 포트폴리오, 상담·오시는 길)를 같은 디자인 언어로 확장한다.
4. 콘텐츠는 `src/data/` 에만 둔다. 구조화 데이터 타입은 업종에 맞게 지정한다.
5. `docs/site-spec.md`, `docs/CHANGELOG.md`, README 를 작성한다.
6. 검사: `npm run lint && npm run build` 통과, 페이지별 고유 title·description, 금지 표현 없음, 가상 업체 표기.
7. 분리 검사: `node scripts/check-isolation.mjs` 통과(다른 앱·`library/` import 금지).
8. registry/sites.json 에 사이트와 디자인 지문을 추가하고, backlog 상태를 `done` 으로 바꾼다.
9. `library/config.json` 에 화면 모듈(헤더, 히어로, 섹션, 푸터 등)을 추가하고 `npm run build:sites && npm run library -- {slug}/{concept}` 로 캡처·스타일 코드를 만든다.
10. 브랜치 `site/{slug}-{concept}` 로 PR. 병합되면 자동 배포된다.
