import { site } from "@/data/site";

// 단순화한 아이콘(원형 배지 안의 흰 기호). 서비스 로고 파일을 쓰지 않고 SVG 로 그린다.
const icons: Record<string, React.ReactNode> = {
  kakao: <path d="M12 5.5c-4.1 0-7.4 2.6-7.4 5.8 0 2 1.3 3.8 3.3 4.8l-.8 3 3.4-2.2c.5.1 1 .1 1.5.1 4.1 0 7.4-2.6 7.4-5.8S16.1 5.5 12 5.5z" fill="currentColor" />,
  instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="1.9">
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.8" />
      <circle cx="12" cy="12" r="3.1" />
      <circle cx="15.9" cy="8.1" r=".6" fill="currentColor" stroke="none" />
    </g>
  ),
  youtube: (
    <g>
      <rect x="4.5" y="7" width="15" height="10.4" rx="3" fill="currentColor" />
      <path d="M10.6 9.7v5l4.2-2.5z" fill="var(--sns-bg)" />
    </g>
  ),
  blog: (
    <g fill="currentColor">
      <path d="M6.5 6.2h2.2v4.2c.6-.7 1.5-1 2.4-1 2.2 0 3.6 1.7 3.6 4.1s-1.5 4.2-3.7 4.2c-1 0-1.8-.4-2.4-1.1v.9H6.5zm4 5.1c-1.1 0-1.9.9-1.9 2.2s.8 2.2 1.9 2.2 1.9-.9 1.9-2.2-.8-2.2-1.9-2.2z" />
      <rect x="16.6" y="6.2" width="1.6" height="11.5" rx=".8" />
    </g>
  ),
};

export default function SnsLinks() {
  return (
    <ul className="sns" aria-label="SNS">
      {site.sns.map((s) => (
        <li key={s.key}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (새 창)`} title={s.label}>
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">{icons[s.key]}</svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
