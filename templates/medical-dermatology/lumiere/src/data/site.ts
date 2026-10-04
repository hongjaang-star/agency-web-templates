// ─────────────────────────────────────────────
// 병원 기본 정보 (가상 데이터 — 실제 정보로 교체하세요)
// ─────────────────────────────────────────────

export const site = {
  nameEn: "LUMIÈRE",
  nameKo: "뤼미에르 피부과의원",
  nameShort: "뤼미에르 피부과",
  branch: "강남점",
  area: "강남역", // 검색 지역 키워드 — 제목·설명에 사용
  tagline: "Reveal Your Own Light",
  logoSub: "DERMATOLOGY", // 로고·공유 이미지의 영문 부제
  brandFull: "LUMIÈRE Dermatology", // 저작권 표기, 공유 이미지 대체 텍스트
  regionEn: "GANGNAM · SEOUL", // 공유 이미지 상단 표기
  footerIntro: ["피부 본연의 빛을, 가장 정직한 방법으로.", "피부과 전문의가 직접 진료합니다."],

  // 검색 결과에 보이는 기본 제목·설명 (메인 페이지)
  seoTitle: "강남역 피부과 뤼미에르 | 리프팅·색소·여드름 피부과 전문의 진료",
  description:
    "강남역 3번 출구 도보 3분, 피부과 전문의가 직접 진단하고 시술하는 뤼미에르 피부과. 울쎄라·써마지 리프팅, 기미·색소 레이저, 스킨부스터부터 여드름·아토피 치료까지.",

  phone: "02-000-0000",
  phoneHref: "tel:0200000000",
  address: "서울특별시 강남구 테헤란로 000, 뤼미에르타워 5층",
  subway: "2호선·신분당선 강남역 3번 출구 도보 3분",
  parking: "건물 내 지하주차장 2시간 무료 (진료 고객)",

  // 구조화 데이터(JSON-LD)용 주소 — 실제 정보로 교체하세요
  postal: {
    streetAddress: "테헤란로 000, 뤼미에르타워 5층",
    addressLocality: "강남구",
    addressRegion: "서울특별시",
    postalCode: "06000",
    addressCountry: "KR",
  },
  // 구조화 데이터용 진료시간 (hours 와 같은 내용을 기계가 읽는 형식으로)
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "20:00" },
    { days: ["Saturday"], opens: "10:00", closes: "16:00" },
  ],

  hours: [
    { day: "평일", time: "10:00 – 20:00" },
    { day: "토요일", time: "10:00 – 16:00", note: "점심시간 없이 진료" },
    { day: "점심시간", time: "13:00 – 14:00" },
    { day: "일요일 · 공휴일", time: "휴진" },
  ],

  // 외부 예약·상담 채널 — 실제 채널 URL로 교체하세요
  links: {
    kakao: "https://pf.kakao.com/",
    naverBooking: "https://booking.naver.com/",
    naverMap: "https://map.naver.com/p/search/%EA%B0%95%EB%82%A8%EC%97%AD",
    kakaoMap: "https://map.kakao.com/?q=%EA%B0%95%EB%82%A8%EC%97%AD",
    instagram: "https://www.instagram.com/",
  },

  business: {
    ceo: "한서윤",
    registration: "000-00-00000",
  },
} as const;

// ─────────────────────────────────────────────
// 업종 설정 — 같은 업종의 다른 병원을 만들 때는 그대로, 다른 업종이면 여기를 교체
// ─────────────────────────────────────────────
export const industry = {
  slug: "medical-dermatology",
  variant: "lumiere",
  schemaTypes: ["MedicalClinic", "Dermatology"], // schema.org 타입
  medicalSpecialty: "Dermatologic",
  specialistTitle: "피부과 전문의",
} as const;

// 메인 페이지 섹션 순서 — 키는 src/components/blocks/index.ts 참고. 빼거나 순서만 바꾸면 됩니다.
export const homeSections = [
  "hero", "promise", "concerns", "treatments", "signature", "doctors",
  "process", "space", "equipment", "events", "faq", "visit",
] as const;

export const nav = [
  { href: "/about", label: "병원소개", en: "About" },
  { href: "/doctors", label: "의료진", en: "Doctors" },
  { href: "/treatments", label: "진료과목", en: "Treatments", hasMenu: true },
  { href: "/equipment", label: "보유장비", en: "Equipment" },
  { href: "/events", label: "이벤트", en: "Events" },
  { href: "/location", label: "오시는 길", en: "Location" },
] as const;

// 연출 이미지: public/images/ 아래 동일한 파일명으로 교체합니다.
// 메인 히어로 배경 영상 (public/ 기준 경로). 교체 시 같은 이름으로 덮어쓰거나 경로를 바꾸세요.
// 영상: MP4(H.264) · 소리 없음 · 10초 안팎 · 5MB 이하 권장 / 포스터: 영상 첫 장면 JPG
export const videos = {
  hero: "/Person_touching_face.mp4",
  heroPoster: "/Person_touching_face-poster.jpg",
} as const;

export const images = {
  philosophy: "/images/home/philosophy.jpg",
  signature: "/images/home/signature.jpg",
  consultation: "/images/home/consultation.jpg",
  visit: "/images/home/visit.jpg",
} as const;

export const medicalNotice =
  "모든 시술은 개인의 피부 상태에 따라 효과가 다를 수 있으며, 멍·붓기·홍반·색소침착 등의 부작용이 발생할 수 있습니다. 시술 전 반드시 전문의와 충분히 상담하시기 바랍니다.";
