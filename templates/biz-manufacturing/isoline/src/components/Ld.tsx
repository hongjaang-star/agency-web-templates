/** 구조화 데이터 출력. "<" 는 < 로 바꿔 </script> 주입을 막는다. */
export default function Ld({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
