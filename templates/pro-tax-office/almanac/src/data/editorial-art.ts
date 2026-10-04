// Decorative fictional tax clippings; never presented as a source of tax advice.
const root = "/images/editorial";
export const editorialArt = {
  hero: `${root}/hero.webp`,
  calendar: `${root}/calendar.webp`,
  business: `${root}/business.webp`,
  property: `${root}/property.webp`,
  family: `${root}/family.webp`,
  dispute: `${root}/dispute.webp`,
  cases: `${root}/cases.webp`,
  about: `${root}/about.webp`,
  contact: `${root}/contact.webp`,
} as const;

const folioArt: Record<string, string> = {
  "/calendar": editorialArt.calendar,
  "/services": editorialArt.business,
  "/cases": editorialArt.cases,
  "/about": editorialArt.about,
  "/contact": editorialArt.contact,
  "/services/bookkeeping": editorialArt.business,
  "/services/income-vat": editorialArt.calendar,
  "/services/corporate": editorialArt.business,
  "/services/transfer": editorialArt.property,
  "/services/inheritance": editorialArt.family,
  "/services/gift": editorialArt.family,
  "/services/audit": editorialArt.dispute,
  "/services/appeal": editorialArt.dispute,
};

export const getFolioArt = (path: string) => folioArt[path.replace(/\/$/, "")] ?? editorialArt.hero;
