# 리서치 카드 · pro-consulting (컨설팅)

- 레벨: L1 (브랜딩 소개형, 상담은 과제 메모 정리와 메일·전화 안내)
- 레퍼런스 보고서: `concepts/pro-consulting/research/index.html` (2026-10-09)
- 범위: 중소기업·소상공인 대상 경영·조직(HR) 부티크 컨설팅. 대형 전략 펌·정책자금 대행은 제외.

## 업종 목표
- 대표·실무 책임자가 "우리 회사의 과제가 어떤 프로그램에 해당하는지"를 이해하고, 준비할 자료를 정리해 첫 상담을 신청하게 만든다.

## 주요 타깃
- 직원 10~200명 규모 중소기업 대표, 인사·기획 책임자
- 성장 단계에서 조직·인사제도·운영 체계를 처음 정비하려는 기업
- 정부 컨설팅 지원사업 활용을 검토하는 소상공인·중소기업

## 핵심 CTA
- 과제 진단(자가 체크) → 추천 프로그램 확인 → 상담 메모 복사·저장, 전화·메일

## 필수 섹션 후보
- 해결하는 과제, 프로그램(범위·기간·산출물), 진행 절차, 비용·지원사업 안내, 유형별 사례(가상), 컨설턴트, 인사이트·자료실, 오시는 길, 문의

## 타깃 검색 키워드
- "중소기업 경영컨설팅", "인사제도 컨설팅", "조직문화 진단", "직무분석 컨설팅", "지역명 + 경영지도사", "컨설팅 지원사업"

## 규제·표기 (rules/pro.md, rules/common.md)
- 성공률·매출 증가율·지원금 확보액 보장 금지, "최고·유일·1위" 금지
- 사례는 유형별 가상 예시이며 결과는 기업 상황에 따라 다르다는 고지
- 자격(경영지도사·공인노무사 등) 표기는 가상 인물임을 명시하고 정확한 명칭 사용
- 정부 지원 비율·대상은 해마다 공고가 바뀌므로 수치 단정 대신 "공고 기준 확인" 안내

## 업종 시그니처 아이디어
1. 경영 과제 자가 진단: 5~6문항에 답하면 해당 과제 영역과 추천 프로그램, 준비 자료가 정리됨
2. 프로그램 범위표: 진단·설계·정착 단계별 기간·산출물·참여 인원을 비교
3. 유형별 사례 보드: 업종·규모·과제로 필터되는 가상 사례 카드(과제 → 접근 → 산출물)

## 시안 기획 (조합 1 선택, 이슈 #51)

- 요청: BX컨설팅의 1차 > 2차(> 3차) 메뉴 구성 형식으로 메뉴와 콘텐츠를 구성.
- 메뉴: 서비스(컨설팅 5 · 디지털·AI 3 · 리더 교육 6) / 수행사례 / 인사이트(레터·기획조사·소식) / 회사소개(비전·일하는 방식, 거점 네트워크). 라벨은 가상 업체 맥락에 맞게 바꾸고(세일즈 교육 → 리더 교육, VMC → 비전·일하는 방식) 구조는 유지.
- 메인 흐름: 핵심 과제 3개 → 서비스 → 진단·교육 → 사례 3 → 인사이트 3 → 거점 3 → 업종(로고 대신 업종명).
- 가상 업체: 다음칸 경영컨설팅(DAEUMKAN). 세 시안의 콘텐츠 원본은 각 HTML의 `consult-data` JSON 블록(서비스·진단 문항·준비 자료·절차·진행 방식·사례·인사이트).

| 시안 | layout | hero | typePair | palette | signature |
|---|---|---|---|---|---|
| pivot | contrast-type grid | NOW↔NEXT statement toggle | Archivo(확장폭) + Pretendard | silver mist · ink · electric blue | 단계형 6문항 진단 → 막대·추천·메모 |
| sidebook | sidebar-index | interactive symptom board | Gothic A1 + Space Mono | bone · plum · saffron | 증상 16개 → 과제 시트 |
| atlas | bento mosaic | program tile map | Noto Serif KR + Bricolage Grotesque | midnight navy · ivory · copper | 6개 눈금 → 12주 로드맵 간트 |

pro 대분류 기존 사이트(trust swiss-grid/split-media, almanac editorial/statement, docket typographic/ticker, workboard data-workboard)와 layout+hero+typePair 조합이 겹치지 않는다. 폰트는 Google Fonts·jsDelivr 오픈 라이선스, 이미지 없이 SVG/CSS 도식.
