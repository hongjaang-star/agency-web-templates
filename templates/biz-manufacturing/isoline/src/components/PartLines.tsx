import type { CategoryId } from "@/data/catalog";

// 부품 선화 (등각 투상 느낌의 얇은 선). 치수선은 장식이며 실제 치수가 아니다.
export default function PartLines({ category, dims = false }: { category: CategoryId; dims?: boolean }) {
  return (
    <svg className="lines" viewBox="0 0 240 200" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        {category === "heatsink" && (
          <>
            <path d="M30 140 L120 172 L210 140 L120 108 Z" />
            <path d="M30 140 v10 L120 182 L210 150 v-10" />
            {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${44 + i * 18} ${145 - i * 2.2} v-64 l12 -4 v64`} />)}
          </>
        )}
        {category === "profile" && (
          <>
            <path d="M70 60 L130 36 L190 60 L130 84 Z" />
            <path d="M70 60 v90 L130 174 L190 150 v-90 M130 84 v90" />
            <path d="M92 69 l12 5 v10 l-12 -5 Z M156 74 l12 -5 v10 l-12 5 Z" />
            <ellipse cx="130" cy="60" rx="10" ry="5" />
          </>
        )}
        {category === "housing" && (
          <>
            <path d="M30 90 L120 54 L210 90 L120 126 Z" />
            <path d="M30 90 v56 L120 182 L210 146 v-56 M120 126 v56" />
            <path d="M30 76 L120 40 L210 76" strokeDasharray="4 5" />
            <path d="M54 112 v28 M78 122 v28 M162 122 v28 M186 112 v28" opacity=".55" />
          </>
        )}
        {category === "bracket" && (
          <>
            <path d="M50 70 L80 58 v80 L170 102 v34 L50 184 Z" />
            <path d="M80 58 l16 6 v80 l-16 -6 M170 102 l16 6 v34 l-16 -6 M96 144 l90 -36" />
            <ellipse cx="65" cy="120" rx="7" ry="9" />
            <ellipse cx="130" cy="140" rx="6" ry="4" />
            <ellipse cx="152" cy="131" rx="6" ry="4" />
          </>
        )}
      </g>
      {dims && (
        <g className="dims" fill="none" stroke="currentColor" strokeWidth="0.8" opacity=".5">
          <path d="M20 190 h200 M20 186 v8 M220 186 v8" />
          <path d="M228 30 v160 M224 30 h8 M224 190 h8" />
        </g>
      )}
    </svg>
  );
}
