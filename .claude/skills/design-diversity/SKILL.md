---
name: design-diversity
description: 시안이나 사이트를 디자인하기 전에 반드시 읽는다. 디자인 지문 규칙, 레이아웃·히어로 원형, 한글 서체 조합, 중복 방지 검사를 정의한다.
---

# 디자인 다양성 규칙

## 디자인 지문 (registry/sites.json 의 fingerprint)
`layout`, `hero`, `typePair`, `palette`, `imageTreatment`, `motion`, `signature`, `sectionOrder`

## 중복 방지
- 같은 날 만드는 시안 3개는 `layout`, `hero`, `typePair`, `palette` 가 모두 서로 달라야 한다.
- 같은 대분류(pro, medical 등)의 기존 사이트와 `layout`+`hero`+`typePair` 조합이 같으면 안 된다.
- 같은 업종의 다른 변형과는 `layout`·`hero`·`typePair`·`palette` 중 3개 이상 달라야 하고, 포지셔닝(`type`)도 달라야 한다(`docs/plan/07-variants.md`).
- `sectionOrder` 가 "hero, features, process, team, faq, cta" 공식과 같으면 다시 설계한다.
- 공통 컴포넌트(PageHero, CtaBand 등)를 그대로 쓰지 않는다. 엔진(SEO, 데이터, 폼)만 공유한다.
- 기존 화면 모듈은 `library/README.md`(종류별 캡처·사용 사이트·스타일 코드)에서 확인한다. 참고만 하고, 같은 종류의 모듈을 새로 만들 때는 기존과 다르게 설계한다.

## 레이아웃 원형 (layout)
editorial(신문·매거진 지면), swiss-grid(엄격한 그리드, 큰 숫자), immersive(풀블리드 이미지·스크롤 연출),
split(좌우 분할 고정), mosaic(카드·이미지 모자이크), story(긴 스크롤 내러티브), data(수치·대시보드형),
typographic(초대형 타이포 중심), organic(곡선·부드러운 형태), minimal(극단적 여백)

## 히어로 원형 (hero)
statement(한 문장 초대형), split-media, fullbleed-photo, video, collage, interactive(계산기·선택형),
ticker(움직이는 문구), quote(대표 인용), numbers(핵심 수치), map(지역 중심)

## 한글 서체 조합 예 (typePair, Google Fonts 또는 jsDelivr CDN)
Pretendard + Noto Serif KR / Gowun Batang + IBM Plex Sans KR / Hahmlet + Pretendard /
Black Han Sans + Gothic A1 / Song Myung + Nanum Gothic / Nanum Myeongjo + Inter /
IBM Plex Sans KR 단독(굵기 대비) / Gowun Dodum + Noto Sans KR

## 시그니처 섹션
사이트마다 1개 이상, 그 업종·업체에만 의미 있는 연출을 새로 설계한다.
예: 세무 신고 일정 카드, 인테리어 전후 슬라이더, 카페 메뉴 플립북, 법률 사건 흐름 타임라인.
