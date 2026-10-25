# agency-web-templates

업종별 홈페이지 포트폴리오 모노레포. 시안 3개 → 선택 → 완성 사이트 → 자동 배포.

- 배포: https://hongjaang-star.github.io/agency-web-templates/
- 대표 홈페이지: 로컬 스튜디오구조 사이트를 `agency/`에서 관리. [포트폴리오](https://hongjaang-star.github.io/agency-web-templates/#portfolio) · [소스/관리 안내](agency/README.md)
- 작업 규칙: CLAUDE.md · 시작 방법: KICKOFF.md
- 명령: `/migrate`(최초 1회), `/next-site`, `/concepts <slug>`, `/build-site <slug> <concept>`

각 완성 사이트의 `editor/`에서 텍스트·자간·이미지·여백을 편집할 수 있습니다. 전체 빌드 시 새 사이트에도 자동 생성되며 저장은 사이트별로 분리됩니다. 사용과 배포 방법은 [사이트 편집기 안내](docs/site-editor.md)를 참고하세요.

신규 카페·베이커리: [OVEN NOTE / 38](https://hongjaang-star.github.io/agency-web-templates/food-cafe/oven-note/) · [에디터](https://hongjaang-star.github.io/agency-web-templates/food-cafe/oven-note/editor/) · [레퍼런스 분석](templates/food-cafe/oven-note/docs/research.md). 코발트·버터 옐로 식탁 디자인, 메뉴 상세와 조합 영수증을 갖춘 독립 9페이지입니다.

신규 아파트 분양 홍보 (realty-presale, 가상 단지 2종 · 각 8페이지):
- [결온 가람숲 · Grove](https://hongjaang-star.github.io/agency-web-templates/concepts/realty-presale/grove/) — 가람신도시 1,128세대, 숲결 그린 몰입형, 홍보 단계 전환 · 생활 반경 지도
- [휘담 서림 더힐 · Dusk](https://hongjaang-star.github.io/agency-web-templates/concepts/realty-presale/dusk/) — 다온시 원도심 재개발 986세대, 먹색 · 노을 엠버 하루 서사형
- 브랜드 · 이미지 가이드: [결온](https://hongjaang-star.github.io/agency-web-templates/concepts/realty-presale/brand/) · [휘담](https://hongjaang-star.github.io/agency-web-templates/concepts/realty-presale/brand-hwidam/) · [GPT용 이미지 가이드 원본](concepts/realty-presale/IMAGE-GUIDE.md) (구글 문서 사본은 관리 시트 비고에 링크). 두 사이트는 `concepts/realty-presale/images/`의 사진 14장을 함께 씁니다.
