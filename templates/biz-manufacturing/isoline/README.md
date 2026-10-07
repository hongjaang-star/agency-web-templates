# 세로결정밀 · isoline (가상 업체 데모)

알루미늄 부품 제조사 홈페이지 템플릿. 어두운 화면에 등각 선화와 도면 표제란으로 부품을 보여 줍니다.

## 실행
```bash
npm ci
npm run dev        # http://localhost:3000/project/biz-manufacturing (.env.development)
npm run lint
npm run build      # out/ 정적 HTML
```

배포 환경변수(.env.example): `NEXT_PUBLIC_BASE_PATH`, `NEXT_PUBLIC_SITE_URL`(도메인만), 데모는 `NEXT_PUBLIC_NOINDEX=1`.

## 부품 등록
`src/data/catalog.ts` 만 고치면 됩니다. `products` 에 `id`(품번, 주소 /parts/{id}), `category`, `apps`, `spec`, `moq`, `lead`, `image`(가상 제품 이미지 설명)를 넣으세요.
업체 정보와 문구는 `src/data/site.ts`, 공정·연혁·인증·견적 문구는 `src/data/content.ts`.

## 서체
한글 Pretendard 는 npm 패키지로 자체 호스팅(`globals.css` 의 @import), 숫자·영문 Space Grotesk 는 next/font.
