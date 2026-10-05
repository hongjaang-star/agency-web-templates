# FORME / 07 · 인테리어·리모델링

포름07 공간실험실은 가상 업체 데모다. 기존 앱의 화면 코드를 복사하지 않은 독립 Next.js 정적 export 사이트다.

`npm ci`, `npm run dev`, `npm run lint`, `npm run build`로 실행·검증한다. 배포 시 NEXT_PUBLIC_BASE_PATH와 도메인만 담은 NEXT_PUBLIC_SITE_URL을 설정한다.

18개 페이지: 홈, 포트폴리오, 신규 프로젝트 상세 8종, 기존 상세 3종(주소 유지), 하는 일, 스튜디오, 진행 과정, 프로젝트 문의, 개인정보 안내. 오피스·병원·카페·기숙사 각 2개를 분류해 보여 준다. 프로젝트마다 와이드·중간·디테일 사진 각 2장, 총 48개의 서로 다른 AI 공간 사진과 작은 화면용 WebP를 제공한다. 스크롤 등장·미세 이동과 키보드로 넘기는 확대 뷰어, 재료 분위기 선택·준비 자료 체크리스트·상담 요약 복사가 작동한다. 문의 전송과 실제 견적은 제공하지 않는다.

공간 사례는 src/data/projects.ts, 기존 주소용 사례는 src/data/legacy-projects.ts, 스튜디오 콘텐츠는 src/data/studio.ts에 있다. 화면은 src/app 및 src/components, 이미지 자산은 public/images/portfolio에 있다. source.json에 이미지 생성 프롬프트·원본 해시·크기를 기록했다. 모든 공간 이미지는 AI 제작 예시이며 실제 시공 실적이 아니다. 다나함 works는 사진과 설명의 배치 참고에만 사용했다.

전체 빌드가 공통 /editor/를 설치한다. 편집값은 space-interior/forme 사이트 ID로 격리된다. 전체 방문자 설정은 public/editor-state.json에 넣고 재배포한다. 자세한 운영은 저장소 docs/site-editor.md를 따른다.

서체는 콘텐츠 글자 묶음을 최적화한 Pretendard이며 새 편집 문자는 시스템 서체로 대체될 수 있다. src/fonts/README.md의 재생성 안내를 참고한다. 작은 화면에서는 최적화한 WebP 변형을 사용한다.
