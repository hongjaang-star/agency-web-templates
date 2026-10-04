---
name: site-template
description: 업종별 브랜딩 소개형 홈페이지를 이 템플릿 구조(Next.js 정적 export)로 하루 1개 생성할 때 사용. 리서치 카드 → 데이터 작성 → 섹션 조합 → 테마 → QA → 배포 순서.
---

# 업종별 홈페이지 생성 스킬

## 입력
- `research/{업종슬러그}.md` 리서치 카드 (없으면 1단계부터)
- 업종 슬러그(`{대분류}-{업종}`), 변형 이름(콘셉트: luxe, clean, soft, expert …)

## 산출물
- `src/data/*` 콘텐츠 교체본, `homeSections` 순서, `@theme` 토큰, 이미지 에셋
- `npm run build` 통과한 `out/` 폴더, 포트폴리오용 썸네일 1장

## 절차
1. **리서치 카드** (`research-card.md` 양식): 목표, 타깃, 핵심 CTA, 필수 섹션, 검색 키워드("지역 + 업종"), 업종 규제.
2. **업종 설정** `src/data/site.ts`
   - `site`: 가상 업체명·연락처·주소(실존 업체와 겹치지 않게), `seoTitle`은 "지역 업종 업체명 | 핵심 서비스" 형식
   - `industry`: schema.org 타입(예: 치과 `["MedicalClinic","Dentist"]`, 세무 `["AccountingService"]`), 전문가 호칭
   - `homeSections`: 블록 키 순서. 필요 없는 블록은 빼고, 없는 블록만 새로 만든다
3. **콘텐츠** `src/data/content.ts`, 서비스 목록 파일: 코드에 문구를 직접 쓰지 않는다. 문구는 모두 data 로.
4. **테마** `src/app/globals.css` 의 `@theme` 토큰만 교체. 텍스트 색은 배경 대비 4.5:1 이상.
5. **블록 추가 규칙**: `src/components/blocks/{Name}.tsx` 에 default export, 데이터는 props 가 아니라 `@/data` 에서 import, `index.ts` 레지스트리에 키 등록.
6. **빌드·검증**: `npm run lint && npm run build` → `out/` 확인 → QA 체크리스트 전부 통과.

## QA 체크리스트
- [ ] 모든 페이지 title·description 고유, canonical·og:image(`/og.png`) 절대주소
- [ ] JSON-LD 가 업종 타입으로 출력 (구글 리치결과 테스트)
- [ ] sitemap.xml·robots.txt 생성, 데모는 noindex 여부 결정
- [ ] 모바일 360px 가로 스크롤 없음, 하단 플로팅 CTA 동작
- [ ] 이미지 alt, 키보드 포커스, 대비 4.5:1
- [ ] 전화·지도·예약 링크가 실제 동작 (가상 데이터면 `#` 대신 표시용 링크)
- [ ] 폼이 있으면 개인정보 수집·이용 동의 + 개인정보처리방침 페이지
- [ ] 업종 규제 문구: 의료(과장·비교·치료효과 보장·환자 유인 표현, 부작용 고지), 법률(승소율 표시), 가격 표시 기준
- [ ] Lighthouse 성능·SEO·접근성 90 이상

## 금지
- 실존 업체 사이트의 문구·이미지 복제
- 컴포넌트 안에 업체명·업종명 하드코딩 (Logo, Footer, schema 포함)
