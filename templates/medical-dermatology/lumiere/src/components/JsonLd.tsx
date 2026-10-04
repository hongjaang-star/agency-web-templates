/** 구조화 데이터(JSON-LD). 검색엔진이 병원 정보·의료진·경로를 정확히 이해하도록 돕습니다. */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // "<" 를 이스케이프해 </script> 주입을 막습니다.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
