@AGENTS.md

# 앱 규칙

- 저장소 루트 `CLAUDE.md` 와 `docs/decisions.md` 가 우선한다.
- 이 앱은 독립 앱이다. 다른 앱(`templates/*/*`)이나 `library/` 를 import 하지 않는다.
- 업체명·업종 문구는 컴포넌트에 쓰지 말고 `src/data/` 에만 둔다.
- 화면을 바꾸면 루트에서 `npm run build:sites && npm run library -- pro-law-firm/docket` 로 스타일 라이브러리를 갱신한다.
