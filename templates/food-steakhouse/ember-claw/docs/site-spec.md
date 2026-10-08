# 엠버 & 클로 · 완성 사양

기준: [Google Drive 제작 사양서](https://docs.google.com/document/d/1YWm-u5FKOWm8qS9NOLka-QQxegDMuGUxxeqBsIvSjbY/edit). 2026-10-08, L1, 가상 상호·지점·가격·인물. 실제 문의 수집이나 결제 없음.

차콜 #0C0D0C, 마블 #151716, 딥그린 #14281F, 버건디 #4E1C22, 골드 #C9A25C, 불씨 #E0662F. Yellowtail 손글씨·Bodoni Moda 영문·Gowun Batang 한글·IBM Plex 본문/수치. 기존 시안의 장면 흐름과 메뉴·지점 데이터를 발전시킴.

독립 정적 경로 6개: `/`, `/brand/`, `/menu/`, `/season/`, `/stores/`, `/reserve/`. 서버 기능을 가장하지 않으며 네이버 예약 첫 화면으로 연결. 기존 시안의 해시 경로도 전체 사진과 기능 유지.

31개 AI 사진: 히어로 3, 추천 3, 런치 1, 공간 1, 브랜드 5, 메뉴 10, 시즌 5, 매장 3. 장면 프롬프트는 시안 `image-prompts.json`, 출력 치수/원본 SHA256은 `public/images/manifest.json`. 생성 원본의 실제 해상도에서 축소만 수행하고 요청치 2400px로 확대하지 않음. 사진의 따뜻한 조명과 어두운 왼쪽 여백을 텍스트 오버레이에 사용.

메뉴 분류 5종+전체, 굽기 온도 5단계, 숙성 챔버 수치, 3개 지점 사진/약도/주소·전화 복사. 문구와 화면 원본은 `src/data/site.ts`에서 관리하며 스타일은 `src/app/globals.css`, 기존 기능은 `public/site.js`에서 독립 실행. 표시 데이터는 사양서의 가상 정보이며 사실상 영업 실적을 주장하지 않음.

GitHub Pages static export와 basePath, noindex, reduced-motion, 공통 editor 1.1.0 및 siteId별 저장 격리 유지. 주요 서체는 Google Fonts 공식 CSS로 로드하고 시스템 fallback 제공.
