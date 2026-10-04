// 배포 루트 index.html 생성: 업종별로 변형을 묶은 완성 사이트 목록 + 시안 목록
// 변형 관리 규칙: docs/plan/07-variants.md
import fs from "node:fs";
const sites = JSON.parse(fs.readFileSync("registry/sites.json", "utf8")).items.filter((s) => s.status === "deployed");
const concepts = fs.existsSync("concepts") ? fs.readdirSync("concepts").filter((d) => fs.statSync(`concepts/${d}`).isDirectory()) : [];
const esc = (t = "") => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const bySlug = new Map();
for (const s of sites) bySlug.set(s.slug, [...(bySlug.get(s.slug) || []), s]);
const groups = [...bySlug.values()].map((vs) => vs.sort((a, b) => (a.role === "flagship" ? -1 : b.role === "flagship" ? 1 : 0)));

const card = (s) => `<li><a href="./${s.slug}/${s.variant}/">${esc(s.variant)}</a>${s.role === "flagship" ? '<em>대표</em>' : ""}<span><a href="./${s.slug}/${s.variant}/editor/">사이트 편집</a> · ${esc(s.level)} · ${esc(s.fingerprint?.layout)} / ${esc(s.fingerprint?.palette)}</span><p>${esc(s.type || "")}</p></li>`;
const conceptLinks = slug => fs.readdirSync(`concepts/${slug}`, { withFileTypes: true }).filter(entry => entry.isDirectory() && fs.existsSync(`concepts/${slug}/${entry.name}/index.html`)).map(entry => `<a href="./concepts/${slug}/${entry.name}/editor/">${esc(entry.name)} 편집</a>`).join(' · ');
const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Agency Templates</title>
<style>body{font:16px/1.6 system-ui,sans-serif;max-width:900px;margin:40px auto;padding:0 16px;color:#111}h1{font-size:28px}h2{margin-top:36px}h3{margin:28px 0 4px;font-size:18px}h3 small{color:#666;font-weight:400;margin-left:8px}ul{list-style:none;padding:0;margin:0}li{padding:12px 0;border-bottom:1px solid #ddd}li a{font-weight:600;color:#0b57d0}em{font-style:normal;font-size:12px;background:#111;color:#fff;padding:1px 6px;margin-left:8px}span{display:block;color:#666;font-size:14px}p{margin:4px 0 0;font-size:14px}</style></head><body>
<h1>업종별 홈페이지 포트폴리오</h1><p>가상 업체 데모. 업종마다 디자인 유형(변형)이 여러 개일 수 있습니다.</p>
<h2>완성 사이트</h2>${groups.map((vs) => `<h3>${esc(vs[0].name)}<small>${esc(vs[0].slug)} · 변형 ${vs.length}</small></h3><ul>${vs.map(card).join("")}</ul>`).join("")}
<h2>시안</h2><ul>${concepts.map((c) => `<li><a href="./concepts/${c}/">${esc(c)}</a><span>시안 비교 · ${conceptLinks(c)}</span></li>`).join("") || "<li>없음</li>"}</ul></body></html>`;
fs.mkdirSync("_site", { recursive: true });
fs.writeFileSync("_site/templates.html", html);
