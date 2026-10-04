import Folio from "@/components/Folio";
import ServiceIndex from "@/components/ServiceIndex";
import { categories, services, type ServiceCategory } from "@/data/services";
import { pages, seoPages } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

const P = pages.services;
export const metadata = pageMetadata({ ...seoPages.services, path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <Folio path="/services" kicker={P.no} title={P.title} lead={P.desc} crumbs={[{ label: P.no }]} />
      <div className="wrap">
        {(Object.keys(categories) as ServiceCategory[]).map((key, i) => (
          <section className="chapter" key={key} aria-labelledby={`ch-${key}`}>
            <header>
              <span>제{i + 1}장 · {categories[key].en}</span>
              <h2 id={`ch-${key}`}>{categories[key].ko}</h2>
            </header>
            <ServiceIndex items={services.filter((s) => s.category === key)} />
          </section>
        ))}
      </div>
    </>
  );
}
