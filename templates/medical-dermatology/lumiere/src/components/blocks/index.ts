// 메인 페이지 섹션 블록 레지스트리 — 순서는 src/data/site.ts 의 homeSections 에서 관리
import Hero from "./Hero";
import PromiseSection from "./PromiseSection";
import Concerns from "./Concerns";
import Treatments from "./Treatments";
import Signature from "./Signature";
import Doctors from "./Doctors";
import Process from "./Process";
import Space from "./Space";
import EquipmentStrip from "./EquipmentStrip";
import Events from "./Events";
import Faq from "./Faq";
import Visit from "./Visit";

export const blocks = {
  hero: Hero,
  promise: PromiseSection,
  concerns: Concerns,
  treatments: Treatments,
  signature: Signature,
  doctors: Doctors,
  process: Process,
  space: Space,
  equipment: EquipmentStrip,
  events: Events,
  faq: Faq,
  visit: Visit,
} as const;

export type BlockKey = keyof typeof blocks;
