// 메인 페이지 섹션 블록 레지스트리 — 순서는 src/data/site.ts 의 homeSections 에서 관리
import Hero from "./Hero";
import Stats from "./Stats";
import Services from "./Services";
import Clients from "./Clients";
import Process from "./Process";
import Team from "./Team";
import Cases from "./Cases";
import Faq from "./Faq";
import Visit from "./Visit";

export const blocks = { hero: Hero, stats: Stats, services: Services, clients: Clients, process: Process, team: Team, cases: Cases, faq: Faq, visit: Visit } as const;

export type BlockKey = keyof typeof blocks;
