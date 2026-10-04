# 스튜디오구조 — 에이전시 홈페이지

사용자 로컬 `webagency_hp/index.html`과 `assets/`를 가져온 정적 홈페이지다. 로컬 원본은 수정하지 않는다. 기존 디자인·서비스·가격·FAQ·매거진·상담 화면을 유지하고 포트폴리오만 실제 배포 사이트로 바꿨다.

- 공개 주소: https://hongjaang-star.github.io/agency-web-templates/
- 포트폴리오 직접 주소: https://hongjaang-star.github.io/agency-web-templates/#portfolio
- 홈페이지 소스: `agency/index.html`, `agency/assets/css/`, `agency/assets/js/`
- 카드·라벨·세 줄 요약·사이트 주소: `registry/portfolio.json`
- 실제 사이트 화면 썸네일: `agency/assets/images/portfolio/`
- 빌드: `npm run build:agency` → `_site/index.html` 및 `_site/assets/`
- 검증: `npm run test:agency:browser`

홈과 포트폴리오 페이지에는 registry의 사례를 업종과 완성/시안 라벨로 묶어 표시한다. 현재 7개이며 업종 필터와 완성/시안 개수는 데이터에서 자동 생성한다. 썸네일·사이트 보기·에디터 링크는 `target="_blank"`와 `rel="noopener noreferrer"`로 새 창에 연결된다.

내용은 HTML에 미리 렌더링되며 포트폴리오 데이터 요청이나 외부 DB가 필요 없다. `scripts/build-agency.mjs`가 `portfolio:home`과 `portfolio:listing` 구역을 registry 기준으로 생성한다. 업데이트 후 로컬 소스 HTML에도 반영하려면 저장소 루트에서 다음을 실행한다.

```sh
node --input-type=module -e "import fs from 'node:fs'; import {renderAgency} from './scripts/build-agency.mjs'; fs.writeFileSync('agency/index.html',renderAgency());"
```

`#portfolio` 등 해시 주소는 새로고침·뒤로가기에서도 해당 화면을 연다. 개별 사이트 주소는 유지한다. 이전 관리용 템플릿 목록은 `/templates.html`에 보존한다.

원본의 상담폼과 매거진은 정적 화면이다. 이번 작업은 포트폴리오 연결과 정적 배포이며 상담 접수 API·회원/게시판 서버는 추가하지 않았다.
