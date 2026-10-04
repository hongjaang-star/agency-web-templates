# pro-tax-office / almanac — 세무사무소 홈페이지

가상 사무소 "한결세무회계"(광주 상무지구) 데모. 신문·연감 지면 디자인. Next.js 정적 export, 레벨 L1(외부 링크 CTA).
시안: `concepts/pro-tax-office/almanac/` (2026-10-04 선택)

```bash
npm install
npm run dev     # http://localhost:3000/project/pro-tax-office
npm run build   # 정적 HTML → out/
npm run lint
```

## 구조
```
src/
├─ app/            /, /calendar, /services, /services/[slug] (8개), /cases, /about, /contact, sitemap·robots·og.png
├─ components/     마스트헤드, 판권란(푸터), 섹션 머리, 폴리오(서브페이지 머리), 세무 연감, 업무 색인, 사례 기사, 묻고 답하기
├─ data/
│  ├─ site.ts      ★ 사무소 정보, 메뉴, 모든 화면 문구, 페이지별 검색 제목·설명, 브랜드 색
│  ├─ services.ts  ★ 업무분야 8개 (색인·상세·sitemap 자동 생성)
│  └─ content.ts   칼럼, 원칙, 수치, 구성원, 사례, FAQ, 세무 연감 기한
└─ lib/            주소 설정 · SEO · 구조화 데이터 · 다음 기한 계산
docs/site-spec.md  사이트 스펙 (단일 기준 문서)
```

- 스타일은 `src/app/globals.css` 하나(Tailwind 없음). 서체: Hahmlet(next/font) + Pretendard(npm).
- 세무 연감의 D-day 는 빌드 시점이 아니라 **방문한 날** 기준으로 브라우저에서 계산한다. 기한은 `content.ts` 의 `deadlines`.

## 배포
`.env.example` → `.env.production.local` 복사 후 `NEXT_PUBLIC_BASE_PATH`, `NEXT_PUBLIC_SITE_URL`(도메인만) 입력 → `npm run build` → `out/` 업로드.

## 독립 앱 규칙 (모노레포)

- 다른 앱(`templates/*/*`)이나 `library/` 를 import 하지 않는다. 위반하면 배포 전 `scripts/check-isolation.mjs` 가 실패한다.
- 화면 모듈은 `library/pro-tax-office/almanac/` 에 캡처와 스타일 코드로 기록되어 있다.
- 빌드·배포는 루트 `.github/workflows/deploy.yml`. 주소: https://hongjaang-star.github.io/agency-web-templates/pro-tax-office/almanac/
