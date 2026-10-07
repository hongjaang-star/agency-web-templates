import type { CategoryId } from "@/data/catalog";

// 제품 카테고리별 선화. 실제 사진이 들어오기 전까지 형태를 보여 주는 자리이며, 아래에 이미지 설명이 붙는다.
export default function Drawing({ category, stroke = "currentColor" }: { category: CategoryId; stroke?: string }) {
  const s = { fill: "none", stroke, strokeWidth: 2, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 200 190" aria-hidden="true" className="drawing">
      {category === "heatsink" && (
        <g {...s}>
          <path d="M20 120 L100 150 L180 120 L100 90 Z" />
          <path d="M20 120 v10 L100 160 L180 130 v-10" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <path key={i} d={`M${34 + i * 18} ${125 - i * 2.3} v-60 l14 -5 v60`} />
          ))}
        </g>
      )}
      {category === "profile" && (
        <g {...s}>
          <rect x="50" y="40" width="100" height="100" rx="6" />
          <path d="M88 40 v14 h-8 v10 h40 v-10 h-8 v-14 M88 140 v-14 h-8 v-10 h40 v10 h-8 v14 M50 88 h14 v-8 h10 v40 h-10 v-8 h-14 M150 88 h-14 v-8 h-10 v40 h10 v-8 h14" />
          <circle cx="100" cy="90" r="9" />
        </g>
      )}
      {category === "housing" && (
        <g {...s}>
          <path d="M30 80 L100 52 L170 80 L100 108 Z" />
          <path d="M30 80 v54 L100 162 L170 134 v-54 M100 108 v54" />
          <path d="M30 70 L100 42 L170 70" strokeDasharray="5 6" />
          <circle cx="58" cy="118" r="4" />
          <circle cx="142" cy="118" r="4" />
        </g>
      )}
      {category === "bracket" && (
        <g {...s}>
          <path d="M40 60 h40 v70 h80 v30 h-120 Z" />
          <path d="M40 60 l14 -10 h40 l-14 10 M80 60 l14 -10 v70 M160 130 l14 -10 v30 l-14 10 M94 120 h80" />
          <circle cx="60" cy="95" r="7" />
          <circle cx="120" cy="145" r="5" />
          <circle cx="145" cy="145" r="5" />
        </g>
      )}
    </svg>
  );
}
