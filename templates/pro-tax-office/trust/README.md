# pro-tax-office / trust — 세무사무소 홈페이지 템플릿

가상 사무소 "한결세무회계" 데모. Next.js 정적 export, 테마 프리셋 `trust`(네이비 + 브라스), 레벨 L1(외부 링크 CTA).

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
│  └─ *.tsx        헤더·푸터·배너·플로팅 버튼 (업종 무관, data 에서 문구를 읽음)
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

## medical-dermatology 대비 공통화한 부분
헤더 메가메뉴(services.ts), 플로팅 상담 버튼(channels), 상단 배너·CTA(site.banner, site.cta), 푸터 고지(site.footerNotice),
공유 이미지·매니페스트 색상(brandColors), 구조화 데이터(orgSchema·serviceSchema·faqSchema). 모노레포 이관 시 packages/core 로 올릴 대상입니다.
