export const site = {
  name: "사이노무사무소",
  expert: "공인노무사 김사이",
  tel: "062-123-4567",
  email: "hello@sai-labor.example",
  address: "광주광역시 서구 상무중앙로 00, 4층",
  hours: "평일 09:00—18:00 · 사전 예약제",
};

export const services = [
  { no: "01", type: "EMPLOYER · RULE", title: "인사노무 자문", desc: "채용부터 퇴직까지 반복되는 인사 판단에 빠른 기준을 세웁니다.", tag: "상시 자문", issue:"근로계약 · 근로시간 · 징계 · 퇴직", prepare:"취업규칙, 근로계약서, 최근 인사 이슈", approach:"질문에 답하는 데서 끝내지 않고 다음 실행 문서와 일정을 함께 정리합니다." },
  { no: "02", type: "WORKER · WAGE", title: "임금·퇴직금", desc: "근무기록과 지급내역을 맞춰 청구 가능한 금액과 순서를 계산합니다.", tag: "3년 시효 확인", issue:"미지급 임금 · 연장근로 · 퇴직금", prepare:"급여명세서, 입금내역, 출퇴근 기록", approach:"월별 차액을 표로 만들고 진정·협의·소송 중 현실적인 경로를 제안합니다." },
  { no: "03", type: "WORKER · DISMISSAL", title: "해고·징계", desc: "통보 방식과 사유, 절차를 검토해 3개월 안에 대응 방향을 정합니다.", tag: "3개월 유의", issue:"해고 통보 · 징계 · 권고사직", prepare:"통지서, 메시지, 인사면담 기록", approach:"구제신청 가능성과 합의 가능성을 함께 비교해 선택지를 분명히 합니다." },
  { no: "04", type: "EMPLOYER · HR", title: "노무관리 진단", desc: "문서와 실제 운영 사이의 간격을 찾아 분쟁 전 바로잡습니다.", tag: "현장 진단", issue:"계약 · 임금 · 근로시간 · 규정", prepare:"인사서식, 급여대장, 조직·근무 현황", approach:"우선순위가 표시된 진단표와 바로 적용할 개선안을 제공합니다." },
  { no: "05", type: "ACCIDENT · CLAIM", title: "산재·보상", desc: "업무 관련성과 치료 경과를 연결해 필요한 입증자료를 설계합니다.", tag: "초기 자료 중요", issue:"사고성 재해 · 질병 · 출퇴근 재해", prepare:"진료기록, 업무기록, 사고 경위", approach:"신청부터 불승인 대응까지 단계별 입증 포인트를 관리합니다." },
  { no: "06", type: "RELATION · UNION", title: "노사관계", desc: "갈등을 키우지 않으면서도 지켜야 할 기준과 협의 절차를 세웁니다.", tag: "관계 조정", issue:"단체교섭 · 노사협의 · 조직 갈등", prepare:"협약·회의록, 쟁점 목록, 당사자 구조", approach:"법적 기준과 현장 관계를 함께 고려한 협상 시나리오를 만듭니다." },
];

export const cases = [
  {category:"부당해고",title:"해고 통보 뒤 3개월, 사실관계를 다시 세웠습니다",summary:"통보 경위와 인사기록을 시간순으로 재구성해 구제신청의 핵심 쟁점을 선명하게 정리한 사례입니다.",result:"절차 하자와 해고 사유를 분리해 대응",image:"/images/hero-handshake.webp"},
  {category:"임금체불",title:"흩어진 근무기록을 월별 청구표로 바꿨습니다",summary:"메신저와 입금내역, 출퇴근 자료를 교차 확인해 누락된 연장근로와 퇴직금 범위를 계산했습니다.",result:"자료 정리 후 지급 협의 진행",image:"/images/negotiation.webp"},
  {category:"기업자문",title:"분쟁이 생기기 전, 인사 절차부터 고쳤습니다",summary:"계약서와 취업규칙뿐 아니라 실제 승인·기록 방식을 점검해 반복 위험을 줄였습니다.",result:"우선순위형 개선안 제공",image:"/images/resolution.webp"},
  {category:"산업재해",title:"업무와 치료 기록 사이의 연결고리를 찾았습니다",summary:"업무강도 변화와 진료 시점을 함께 배열해 업무 관련성을 설명할 자료 구조를 만들었습니다.",result:"신청 단계별 입증자료 설계",image:"/images/negotiation.webp"},
  {category:"노사협의",title:"맞서는 주장 대신 합의 가능한 항목을 구분했습니다",summary:"법적 의무와 협상 가능한 조건을 분리해 회의가 결론으로 이어지도록 협의안을 다듬었습니다.",result:"교섭 시나리오와 회의안 정리",image:"/images/hero-handshake.webp"},
  {category:"직장 내 괴롭힘",title:"감정의 언어를 조사 가능한 사실로 정리했습니다",summary:"행위·시점·장소·관계·증거를 기준으로 진술을 구조화하고 조사 절차를 설계했습니다.",result:"사실조사 체크리스트 구축",image:"/images/resolution.webp"},
];

export const steps = [
  ["01", "상황 접수", "누가, 언제, 무엇을 겪었는지 핵심 사실을 확인합니다."],
  ["02", "자료 확인", "계약서·통지서·급여명세서 등 관련 자료를 함께 봅니다."],
  ["03", "쟁점 정리", "가능한 선택지와 각 절차의 기한·비용·준비사항을 설명합니다."],
  ["04", "업무 진행", "위임 범위와 일정을 합의한 뒤 단계별로 진행 상황을 공유합니다."],
];
