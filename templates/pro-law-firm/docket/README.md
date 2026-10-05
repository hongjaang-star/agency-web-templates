# pro-law-firm / docket — 법률사무소 홈페이지

가상 사무소 "담연 법률사무소"(대전 둔산동, 대전지방법원 인근) 데모. 초대형 명조 타이포 디자인. Next.js 정적 export, 레벨 L1(외부 링크 CTA).
시안: `concepts/pro-law-firm/docket/` (2026-10-04, 추천 시안 자동 선택)

```bash
npm install
npm run dev     # http://localhost:3000/project/pro-law-firm
npm run build   # 정적 HTML → out/
npm run lint
```

## 구조
```
src/
├─ app/            /, /areas, /areas/[slug] (8개), /flow, /attorneys, /cases, /contact, sitemap·robots·og.png
├─ components/     헤더·푸터, 업무 띠(Ticker), 업무분야 목록, 사건 흐름(CaseFlow 탭 8, FlowNav 바로가기), 변호사, 사례 카드(CaseCard, CaseBrowser 검색·필터), FAQ, 오시는 길, 서브페이지 머리
├─ data/
│  ├─ site.ts      ★ 사무소 정보, 메뉴, 모든 화면 문구, 페이지별 검색 제목·설명, 브랜드 색
│  ├─ areas.ts     ★ 업무분야 8개 (목록·상세·sitemap 자동 생성)
│  └─ content.ts   사건 흐름 8종(업무분야별), 변호사, 원칙, 사례 14건(분야·키워드), FAQ
└─ lib/            주소 설정 · SEO · 구조화 데이터(LegalService, Person, Service, FAQPage, BreadcrumbList)
docs/site-spec.md  사이트 스펙 (단일 기준 문서)
```

- 스타일은 `src/app/globals.css` 하나(Tailwind 없음). 서체: Song Myung + Gothic A1 (next/font).
- 사이트 편집기는 빌드 때 `editor/` 로 자동 설치된다(`docs/site-editor.md`). 앱 안에 에디터 코드는 없다.

## 광고 규정
변호사업무광고규정에 따라 "최고·유일", 승소율, "무료 상담", 결과 단정 표현을 쓰지 않고 "전문" 대신 "주요 업무"로 쓴다. 푸터에 광고책임변호사를 표시한다. 문구는 `src/data/` 에서만 바꾼다.

## 배포
`.env.example` → `.env.production.local` 복사 후 `NEXT_PUBLIC_BASE_PATH`, `NEXT_PUBLIC_SITE_URL`(도메인만) 입력 → `npm run build` → `out/` 업로드.

## 독립 앱 규칙 (모노레포)
- 다른 앱(`templates/*/*`)이나 `library/` 를 import 하지 않는다. 위반하면 배포 전 `scripts/check-isolation.mjs` 가 실패한다.
- 화면 모듈은 `library/pro-law-firm/docket/` 에 캡처와 스타일 코드로 기록되어 있다.
- 빌드·배포는 루트 `.github/workflows/deploy.yml`. 주소: https://hongjaang-star.github.io/agency-web-templates/pro-law-firm/docket/
