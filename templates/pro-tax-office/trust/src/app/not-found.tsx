import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center bg-ivory py-24">
      <div className="container-page text-center">
        <p className="font-display text-8xl text-gold">404</p>
        <h1 className="mt-6 font-serif-kr text-3xl text-ink">페이지를 찾을 수 없습니다</h1>
        <p className="mt-4 text-ink-soft">주소가 변경되었거나 삭제된 페이지입니다.</p>
        <div className="mt-10">
          <ButtonLink href="/">홈으로 가기</ButtonLink>
        </div>
      </div>
    </section>
  );
}
