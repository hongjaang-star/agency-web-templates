# 세로결정밀 · fieldmap (가상 업체 데모)

알루미늄 부품 제조사 홈페이지 템플릿. 적용 분야로 부품을 찾고 여러 모델을 한 번에 견적 요청합니다.

## 실행
```bash
npm ci
npm run dev        # http://localhost:3000/project/biz-manufacturing (.env.development)
npm run lint
npm run build      # out/ 정적 HTML
```

배포 환경변수(.env.example): `NEXT_PUBLIC_BASE_PATH`, `NEXT_PUBLIC_SITE_URL`(도메인만), 데모는 `NEXT_PUBLIC_NOINDEX=1`.

## 제품 등록
`src/data/catalog.ts` 만 고치면 됩니다.
- `categories` 제품 카테고리, `applications` 적용 분야
- `products` 모델: `id`(품번, 주소), `category`, `apps`, `spec`(사양 이름:값), `moq`, `lead`, `image`(가상 제품 이미지 설명)

업체 정보와 문구는 `src/data/site.ts`, 설비·연혁·인증·견적 문구는 `src/data/content.ts`.

## 구조
- `src/app` 페이지 (제품·분야 상세는 `generateStaticParams` 로 정적 생성)
- `src/components` 화면 (Finder, ProductCard, QuoteForm, quote-store …)
- `src/lib` 주소·SEO·구조화 데이터
- `docs/site-spec.md` 기준 문서, `docs/CHANGELOG.md`
