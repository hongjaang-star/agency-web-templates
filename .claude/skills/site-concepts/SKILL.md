---
name: site-concepts
description: 업종 하나에 대해 서로 구조가 다른 메인 페이지 퍼블리싱 시안 3개를 만든다. /concepts, /next-site 에서 사용.
---

# 시안 3개 만들기

## 입력
업종 슬러그(registry/backlog.json), 규제 사전(rules/), 기존 디자인 지문(registry/sites.json), 모듈 스타일 라이브러리(library/README.md)

## 절차
0. **변형 추가 모드**: `registry/sites.json` 에 이 slug 의 변형이 이미 있으면 `docs/plan/07-variants.md` 를 읽는다. 기존 변형의 지문(layout·hero·typePair·palette 중 3개 이상 다르게)과 포지셔닝(`type`)을 제외 조건으로 삼고, `concepts/{slug}/` 의 선택되지 않은 시안도 비교 페이지에 "이전 후보"로 함께 보여 준다. 시안 이름은 기존 변형·시안과 겹치지 않게 짓는다.
1. design-diversity 스킬을 먼저 읽는다.
2. `research/{slug}.md` 리서치 카드를 쓴다: 목표, 타깃, 핵심 CTA, 검색 키워드, 규제, 업종 시그니처 아이디어 3개.
3. 시안 3개의 방향을 정한다. 각 방향에 이름(예: `ledger`, `atelier`, `pulse`)과 디자인 지문을 붙이고 중복 방지 규칙을 통과시킨다.
4. `concepts/{slug}/{concept}/index.html` 을 만든다.
   - 메인 1페이지, 데스크톱·모바일 반응형, 실제 서체·색·모션
   - 문구는 실제 업종 스펙 기반(lorem ipsum 금지), 규제 사전 준수
   - 상단에 "가상 업체 데모 · 시안 A/B/C" 표기
   - 이미지가 필요하면 CSS/SVG 연출 또는 라이선스 무료 이미지, 출처를 주석으로 기록
5. `concepts/{slug}/index.html` 에 시안 3개를 비교하는 목록 페이지를 만든다(방향 설명, 지문, 링크).
6. 브랜치 `concepts/{slug}` 로 커밋하고 PR을 연다. PR 본문: 시안별 한 줄 설명, 지문 표, 배포 후 주소
   `https://<owner>.github.io/agency-web-templates/concepts/{slug}/`
7. registry/backlog.json 의 상태를 `concepts` 로 바꾼다(변형 추가 모드에서는 `concepts` 목록에 새 시안 이름만 더한다).

## 품질 기준
- 360px 가로 스크롤 없음, 본문 대비 4.5:1 이상, 키보드 포커스 표시
- 세 시안을 나란히 봤을 때 같은 회사 템플릿으로 보이지 않을 것
