# medical-dermatology

LUMIÈRE(뤼미에르) 피부과 홈페이지. 청결하고 세련된 프리미엄 톤(화이트 + 샴페인 골드·베이지)의 병원 사이트입니다.

> 병원명, 의료진, 주소, 연락처 등은 모두 **가상 데이터**입니다. `src/data/` 에서 실제 정보로 교체하세요.

## 기술 스택

- Next.js 16 (App Router, 정적 생성) · React 19 · TypeScript
- Tailwind CSS 4 · lucide-react
- 폰트: Cormorant, 나눔명조 (next/font), Pretendard (self-hosted)
- Node.js 20.9 이상

## 실행

```bash
npm install     # 처음 1회
npm run dev     # http://localhost:3000/project/medical-dermatology
npm run build   # 정적 HTML 생성 → out/ 폴더 (Node 서버 불필요)
npm run lint
```

## 구조

```
src/
├─ app/            페이지 (폴더 = 주소), sitemap · robots · manifest · 공유 이미지(og.png)
├─ components/
│  ├─ blocks/      메인 섹션 블록 12개 + 레지스트리(index.ts)
│  └─ *.tsx        헤더, 푸터, 로고, 공통 UI
├─ data/           ★ 병원 정보 · 업종 설정 · 섹션 순서 · 진료과목 · 의료진 (콘텐츠는 여기서만 수정)
└─ lib/            주소 설정 · SEO · 구조화 데이터 (업종 무관 공통 코드)
public/            영상 · 이미지
skills/            사이트 생성 스킬 (SKILL.md, 리서치 카드 양식)
research/          업종별 리서치 카드
docs/              인수인계서 (handover.html)
```

## 배포 전 확인

- `.env.example` 을 `.env.production.local` 로 복사하고 값 입력
  - `NEXT_PUBLIC_BASE_PATH`: 도메인 루트 배포는 비움, 데모 서버는 `/medical-dermatology/lumiere`
  - `NEXT_PUBLIC_SITE_URL`: 실제 도메인 (canonical · sitemap · 공유 이미지 주소)
- `npm run build` 후 `out/` 폴더 안의 파일 전체를 호스팅에 업로드
- 가상 데이터, 샘플 이미지를 실제 정보·사진으로 교체

자세한 유지보수 방법은 [`docs/handover.html`](docs/handover.html) 을 참고하세요.

## 템플릿으로 재사용하기

- 메인 섹션 순서 변경: `src/data/site.ts` 의 `homeSections` 배열만 수정
- 같은 업종 다른 병원: `src/data/` 와 `public/images/` 교체
- 다른 업종: `industry` 설정(schema.org 타입, 전문가 호칭) 교체 + 필요한 블록 추가
- 디자인 변형: `src/app/globals.css` 의 `@theme` 토큰 교체
- 자세한 절차와 QA 체크리스트: [`skills/site-template/SKILL.md`](skills/site-template/SKILL.md)

## 모노레포 이관 계획

업종이 3개 이상 쌓이면 `agency-web-templates` 저장소로 합치고, 공통 코드를 패키지로 분리합니다.

```
agency-web-templates/
├─ packages/core      # lib/, Header·Footer·Logo·ui, JsonLd
├─ packages/blocks    # components/blocks (업종 공통 블록)
├─ templates/medical-dermatology/lumiere   # ← 이 저장소
└─ skills/
```
