# pro-tax-office / trust — 세무사무소 홈페이지 템플릿

가상 사무소 "한결세무회계" 데모. Next.js 정적 export, 팔레트 네이비 + 브라스, 레벨 L1(외부 링크 CTA).

```bash
npm install
npm run dev     # http://localhost:3000/project/pro-tax-office
npm run build   # 정적 HTML → out/
npm run lint
```

## 구조
```
src/
├─ app/            /, /about, /services, /services/[slug] (8개), /cases, /contact, sitemap·robots·og.png
├─ components/
│  ├─ blocks/      메인 섹션 9개 (hero, stats, services, clients, process, team, cases, faq, visit)
│  └─ *.tsx        헤더·푸터·배너·플로팅 버튼 (문구는 data 에서 읽음)
├─ data/
│  ├─ site.ts      ★ 사무소 정보, 업종 설정, 섹션 순서, 메뉴, CTA·배너 문구, 브랜드 색
│  ├─ services.ts  ★ 업무분야 (메뉴·목록·상세·sitemap 자동 생성)
│  └─ content.ts   통계, 고객 유형, 절차, 구성원, 사례, FAQ, 신고 일정
└─ lib/            주소 설정 · SEO · 구조화 데이터 (AccountingService, Service, FAQPage, Person)
docs/site-spec.md  사이트 스펙 (단일 기준 문서)
research/          리서치 카드
```

## 배포
`.env.example` → `.env.production.local` 복사 후 `NEXT_PUBLIC_BASE_PATH`, `NEXT_PUBLIC_SITE_URL` 입력 → `npm run build` → `out/` 업로드.

## 독립 앱 규칙 (모노레포)

이 앱은 `agency-web-templates` 모노레포 안의 독립 앱입니다. 다른 사이트와 소스를 공유하지 않습니다.

- 다른 앱(`templates/*/*`)이나 `library/` 를 import 하지 않는다. 위반하면 배포 전 `scripts/check-isolation.mjs` 가 실패한다.
- 이 앱의 컴포넌트를 다른 사이트의 출발점으로 복사하지 않는다. 화면 모듈은 `library/pro-tax-office/trust/` 에 캡처와 스타일 코드로만 기록되어 있다.
- 빌드·배포는 루트 `.github/workflows/deploy.yml` 이 맡는다. 주소: https://hongjaang-star.github.io/agency-web-templates/pro-tax-office/trust/
