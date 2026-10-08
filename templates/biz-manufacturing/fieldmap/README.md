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

### 제품 이미지와 제조 모션 (2026-10-09)
`public/images/products/`의 WebP 8종은 built-in image_gen으로 제작한 가상 제품 시각화입니다. `manifest.json`에 제품별 전체 프롬프트·실제 치수·파일 크기·해시가 있습니다. 공통 밝은 회색 스튜디오 배경, 최대 1200px, WebP quality 85이며 확대 보간하지 않았습니다. 실제 제작은 승인 도면을 기준으로 합니다.

`ManufacturingMotion`은 표준 압출 프로파일의 6단계를 단순화한 SVG/CSS 모션입니다. 홈과 설비·공정 페이지에 표시하며 단계별 선택, 자동 재생, 일시정지 및 reduced-motion을 지원합니다. 원본 설계 도면이나 특정 설비의 실제 영상이 아닙니다. 참고: [Hydro 압출 소개](https://www.hydro.com/en/global/about-hydro/management-and-organization/organization-overview/hydro-extrusions/), [Haas 5축 가공](https://www.haascnc.com/machines/multi-axis/5-axis-mills/5-Axis_Machines.html).

검증: `node tests/fieldmap-browser.mjs`. 환경변수 `FIELDMAP_ORIGIN`으로 공개 서버 검증도 가능합니다. 제품 8종과 상세 경로, 필터·견적 저장, 360/768/1440 가로 넘침, 제조 모션 6단계·재생·일시정지·동작 줄이기, 에디터를 검사합니다.
