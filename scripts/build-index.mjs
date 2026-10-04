// 배포 루트 index.html 생성: 완성 사이트 + 시안 목록
import fs from "node:fs";
const sites = JSON.parse(fs.readFileSync("registry/sites.json", "utf8")).items.filter((s) => s.status !== "retired");
const concepts = fs.existsSync("concepts") ? fs.readdirSync("concepts").filter((d) => fs.statSync(`concepts/${d}`).isDirectory()) : [];
const li = (h, t, s) => `<li><a href="${h}">${t}</a><span>${s}</span></li>`;
const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Agency Templates</title>
<style>body{font:16px/1.6 system-ui,sans-serif;max-width:860px;margin:40px auto;padding:0 20px;color:#111}h1{font-size:28px}ul{list-style:none;padding:0}li{display:flex;justify-content:space-between;gap:16px;padding:12px 0;border-bottom:1px solid #ddd}span{color:#666;font-size:14px}a{color:#0b57d0}</style></head><body>
<h1>업종별 홈페이지 포트폴리오</h1><h2>완성 사이트</h2><ul>${sites.map((s) => li(`./${s.slug}/${s.variant}/`, `${s.name} · ${s.variant}`, s.fingerprint.layout + " / " + s.fingerprint.palette)).join("")}</ul>
<h2>시안</h2><ul>${concepts.map((c) => li(`./concepts/${c}/`, c, "시안 3종")).join("") || "<li>없음</li>"}</ul></body></html>`;
fs.mkdirSync("_site", { recursive: true });
fs.writeFileSync("_site/index.html", html);
