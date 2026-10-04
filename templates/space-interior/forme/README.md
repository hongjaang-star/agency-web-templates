# FORME / 07 · 인테리어·리모델링

포름07 공간실험실은 가상 업체 데모다. 기존 앱의 화면 코드를 복사하지 않은 독립 Next.js 정적 export 사이트다.

`npm ci`, `npm run dev`, `npm run lint`, `npm run build`로 실행·검증한다. 배포 시 NEXT_PUBLIC_BASE_PATH와 도메인만 담은 NEXT_PUBLIC_SITE_URL을 설정한다.

10개 페이지: 홈, 공간 기록, 프로젝트 상세 3종, 하는 일, 스튜디오, 진행 과정, 프로젝트 문의, 개인정보 안내. 공간 사례 필터·재료 분위기 선택·준비 자료 체크리스트·상담 요약 복사가 작동한다. 문의 전송과 실제 견적은 제공하지 않는다.

콘텐츠는 src/data/studio.ts, 화면은 src/app 및 src/components, 이미지 자산은 public/images에 있다. 모든 공간 이미지는 AI 제작 예시이며 실제 시공 실적이 아니다.

전체 빌드가 공통 /editor/를 설치한다. 편집값은 space-interior/forme 사이트 ID로 격리된다. 전체 방문자 설정은 public/editor-state.json에 넣고 재배포한다. 자세한 운영은 저장소 docs/site-editor.md를 따른다.

서체는 콘텐츠 글자 묶음을 최적화한 Pretendard이며 새 편집 문자는 시스템 서체로 대체될 수 있다. src/fonts/README.md의 재생성 안내를 참고한다. 작은 화면에서는 최적화한 WebP 변형을 사용한다.
