// 모듈 스타일 라이브러리 생성: 빌드된 _site 를 열어 library/config.json 의 모듈을
// 데스크톱·모바일로 캡처하고, 문구를 뺀 스타일 코드(마크업 구조 + 클래스)를 뽑아 문서로 만든다.
// 사용: npm run build:sites && npm run library
// 결과물은 참고용이다. 앱이 library/ 를 import 하면 check-isolation 이 실패한다.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright";

const BASE_ROOT = process.env.BASE_ROOT || "/agency-web-templates";
const config = JSON.parse(fs.readFileSync("library/config.json", "utf8"));
const registry = JSON.parse(fs.readFileSync("registry/sites.json", "utf8")).items;
const only = process.argv[2]; // 예: medical-dermatology/lumiere

const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 } },
  mobile: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
};

// ── 정적 서버 (_site 를 BASE_ROOT 아래에 노출) ──
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".mp4": "video/mp4", ".woff2": "font/woff2", ".json": "application/json", ".txt": "text/plain", ".xml": "application/xml", ".webmanifest": "application/manifest+json" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (!p.startsWith(BASE_ROOT + "/")) return res.writeHead(404).end();
  p = path.join("_site", p.slice(BASE_ROOT.length));
  if (p.endsWith(path.sep) || (fs.existsSync(p) && fs.statSync(p).isDirectory())) p = path.join(p, "index.html");
  if (!fs.existsSync(p)) return res.writeHead(404).end();
  res.writeHead(200, { "content-type": TYPES[path.extname(p)] || "application/octet-stream" });
  fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const origin = `http://127.0.0.1:${server.address().port}${BASE_ROOT}`;

// ── 브라우저 안에서 실행: 스타일 코드 추출 ──
function extractSkeleton(el) {
  const KEEP = /^(class|style|data-reveal|viewBox|width|height|patternUnits|d|fill|stroke|stroke-width|x|y|x1|x2|y1|y2|cx|cy|r|rx|offset|stop-color|stop-opacity|gradientTransform|preserveAspectRatio|opacity)$/;
  const lines = [];
  const attrs = (n, all) =>
    [...n.attributes]
      .filter((a) => all || KEEP.test(a.name))
      .map((a) => (a.name === "src" || a.name === "srcset" || a.name === "poster" ? ` ${a.name}="…"` : ` ${a.name}="${a.value}"`))
      .join("");
  const sig = (n) => n.tagName + "|" + (n.getAttribute("class") || "");
  function walk(n, depth) {
    const pad = "  ".repeat(depth);
    const tag = n.tagName.toLowerCase();
    if (tag === "svg") {
      const cls = n.getAttribute("class") || "";
      if (/\blucide\b/.test(cls)) {
        const icon = (cls.match(/lucide-([\w-]+)/) || [])[1];
        lines.push(`${pad}<svg class="${cls}" /> <!-- 아이콘${icon ? ": " + icon : ""} -->`);
      } else {
        lines.push(pad + n.outerHTML.replace(/>\s+</g, "><"));
      }
      return;
    }
    if (["img", "video", "source", "input", "br", "hr"].includes(tag)) {
      const media = tag === "img" || tag === "video" ? ` src="…"` : "";
      lines.push(`${pad}<${tag}${attrs(n)}${media} />`);
      return;
    }
    const kids = [...n.childNodes].filter((c) => c.nodeType === 1 || (c.nodeType === 3 && c.textContent.trim()));
    if (!kids.length) return lines.push(`${pad}<${tag}${attrs(n)}></${tag}>`);
    if (kids.length === 1 && kids[0].nodeType === 3) return lines.push(`${pad}<${tag}${attrs(n)}>…</${tag}>`);
    lines.push(`${pad}<${tag}${attrs(n)}>`);
    for (let i = 0; i < kids.length; i++) {
      const c = kids[i];
      if (c.nodeType === 3) {
        lines.push(`${pad}  …`);
        continue;
      }
      walk(c, depth + 1);
      let j = i;
      while (kids[j + 1] && kids[j + 1].nodeType === 1 && sig(kids[j + 1]) === sig(c)) j++;
      if (j > i) {
        lines.push(`${pad}  <!-- ↑ 같은 구조 ${j - i + 1}개 반복 -->`);
        i = j;
      }
    }
    lines.push(`${pad}</${tag}>`);
  }
  walk(el, 0);
  return lines.join("\n");
}

// ── 캡처 ──
const browser = await chromium.launch();
const index = [];
const sites = Object.entries(config.sites).filter(([key]) => !only || key === only);

for (const [key, { modules }] of sites) {
  const [slug, variant] = key.split("/");
  const outDir = `library/${slug}/${variant}`;
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(`${outDir}/shots`, { recursive: true });
  fs.mkdirSync(`${outDir}/code`, { recursive: true });
  const results = modules.map((m) => ({ ...m, site: key, shots: {} }));

  for (const [vp, opts] of Object.entries(VIEWPORTS)) {
    const ctx = await browser.newContext({ ...opts, reducedMotion: "reduce", locale: "ko-KR" });
    const page = await ctx.newPage();
    const pages = [...new Set(modules.map((m) => m.page))];
    for (const pg of pages) {
      await page.goto(`${origin}/${key}${pg}`, { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        // 사이트의 reduced-motion 규칙(전체 transition 0.01ms) 때문에 숨김·복원이 한 프레임 늦게 반영되므로 끈다
        const st = document.createElement("style");
        st.textContent = "*,*::before,*::after{transition:none!important;animation:none!important}";
        document.head.append(st);
        document.querySelectorAll("[data-reveal]").forEach((e) => (e.dataset.visible = "true"));
        document.querySelectorAll("video").forEach((v) => v.pause());
        await document.fonts.ready;
      });
      await page.waitForTimeout(400);
      for (const r of results.filter((m) => m.page === pg)) {
        const sel = (vp === "mobile" && r.selectMobile) || r.select;
        const el = await page.$(sel);
        if (!el || !(await el.isVisible())) continue;
        // 대상 밖의 고정·스티키 요소(헤더, 상담 버튼)가 캡처를 가리지 않도록 숨김
        await page.evaluate((target) => {
          window.scrollTo(0, 0);
          for (const n of document.body.querySelectorAll("*")) {
            const pos = getComputedStyle(n).position;
            if ((pos === "fixed" || pos === "sticky") && !n.contains(target) && !target.contains(n)) {
              n.dataset.libHidden = n.style.visibility || "-";
              n.style.visibility = "hidden";
            }
          }
        }, el);
        const file = `shots/${r.id}-${vp}.jpg`;
        await el.screenshot({ path: `${outDir}/${file}`, type: "jpeg", quality: 72, animations: "disabled" });
        r.shots[vp] = file;
        if (vp === "desktop" || !r.code) {
          r.code = `code/${r.id}.html`;
          fs.writeFileSync(`${outDir}/${r.code}`, (await page.evaluate(extractSkeleton, el)) + "\n");
        }
        await page.evaluate(() => {
          for (const n of document.querySelectorAll("[data-lib-hidden]")) {
            n.style.visibility = n.dataset.libHidden === "-" ? "" : n.dataset.libHidden;
            delete n.dataset.libHidden;
          }
        });
      }
    }
    await ctx.close();
  }

  const missing = results.filter((r) => !r.shots.desktop && !r.shots.mobile);
  if (missing.length) console.warn(`! ${key}: 찾지 못한 모듈 ${missing.map((r) => r.id).join(", ")}`);
  writeSiteDoc(key, outDir, results.filter((r) => r.code));
  index.push(...results.filter((r) => r.code).map(({ select, selectMobile, ...r }) => ({ ...r, shots: Object.fromEntries(Object.entries(r.shots).map(([k, v]) => [k, `${slug}/${variant}/${v}`])), code: `${slug}/${variant}/${r.code}` })));
  console.log(`✓ ${key}: 모듈 ${results.length - missing.length}개`);
}

await browser.close();
server.close();

// 일부 사이트만 다시 만든 경우 나머지 사이트 항목은 유지
const prev = fs.existsSync("library/modules.json") ? JSON.parse(fs.readFileSync("library/modules.json", "utf8")).modules : [];
const done = new Set(sites.map(([k]) => k));
const all = [...prev.filter((m) => !done.has(m.site)), ...index];
fs.writeFileSync("library/modules.json", JSON.stringify({ _doc: "npm run library 로 생성. 직접 고치지 말 것.", modules: all }, null, 2) + "\n");
writeIndexDoc(all);

// ── 문서 ──
function siteInfo(key) {
  const [slug, variant] = key.split("/");
  return registry.find((s) => s.slug === slug && s.variant === variant) || { slug, variant, name: key };
}

function writeSiteDoc(key, outDir, mods) {
  const info = siteInfo(key);
  const app = `templates/${key}`;
  const rel = path.relative(outDir, app);
  const css = fs.existsSync(`${app}/src/app/globals.css`) ? fs.readFileSync(`${app}/src/app/globals.css`, "utf8").trim() : "";
  const layout = fs.existsSync(`${app}/src/app/layout.tsx`) ? fs.readFileSync(`${app}/src/app/layout.tsx`, "utf8") : "";
  const fonts = [...layout.matchAll(/^(import .*next\/font.*|const \w+ = \w+\(\{[\s\S]*?\}\);)$/gm)].map((m) => m[1]).join("\n\n");
  const fp = info.fingerprint || {};
  const out = [
    `# ${info.name} · ${info.variant}`,
    "",
    "> 자동 생성 문서(`npm run library`). 참고용 스타일 기록이며, 이 코드를 다른 사이트에 그대로 쓰지 않는다.",
    "",
    `- 사용 사이트: \`${key}\`${info.company ? ` (${info.company})` : ""}`,
    info.url ? `- 배포 주소: ${info.url}` : "",
    `- 소스: [\`${app}\`](${rel})`,
    "",
    "## 디자인 지문",
    "",
    "| 항목 | 값 |",
    "|---|---|",
    ...Object.entries(fp).map(([k, v]) => `| ${k} | ${v} |`),
    "",
    "## 디자인 토큰",
    "",
    fonts ? "서체 설정 (`src/app/layout.tsx`)\n\n```ts\n" + fonts + "\n```\n" : "",
    "<details><summary>globals.css (색·서체 토큰, 공용 유틸리티)</summary>\n\n```css\n" + css + "\n```\n\n</details>",
    "",
    "## 모듈",
    "",
    ...mods.flatMap((m) => {
      const [srcFile, anchor] = m.source.split("#");
      const code = fs.readFileSync(`${outDir}/${m.code}`, "utf8");
      return [
        `### ${m.label} \`${m.id}\``,
        "",
        `- 종류: \`${m.kind}\` · 사용 사이트: \`${key}\` · 페이지: \`${m.page}\``,
        `- 소스: [\`${m.source}\`](${rel}/${srcFile})${anchor ? ` (${anchor})` : ""}`,
        "",
        "| 데스크톱 1440 | 모바일 390 |",
        "|---|---|",
        `| ${m.shots.desktop ? `<img src="${m.shots.desktop}" width="560">` : "—"} | ${m.shots.mobile ? `<img src="${m.shots.mobile}" width="180">` : "—"} |`,
        "",
        `<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="${m.code}">${m.code}</a></summary>`,
        "",
        "```html",
        code.trimEnd(),
        "```",
        "",
        "</details>",
        "",
      ];
    }),
  ];
  fs.writeFileSync(`${outDir}/README.md`, out.filter((l) => l !== null).join("\n"));
}

function writeIndexDoc(mods) {
  const KIND_LABEL = { header: "헤더", banner: "상단 띠", hero: "히어로", "page-hero": "서브페이지 상단", intro: "소개", finder: "찾기·필터", services: "서비스 목록", signature: "시그니처", team: "구성원", process: "절차", gallery: "갤러리", promo: "이벤트·프로모션", stats: "수치", clients: "고객군", cases: "사례", faq: "FAQ", visit: "오시는 길", cta: "CTA", footer: "푸터", floating: "고정 버튼" };
  const kinds = [...new Set(mods.map((m) => m.kind))];
  const siteKeys = [...new Set(mods.map((m) => m.site))];
  const out = [
    "# 모듈 스타일 라이브러리",
    "",
    "완성 사이트의 화면 모듈을 캡처와 스타일 코드로 남긴 참고 자료. **참고만 하고 가져다 쓰지 않는다.**",
    "",
    "- 사이트 소스는 서로 독립이다. 앱이 다른 앱이나 `library/` 를 import 하면 `scripts/check-isolation.mjs` 가 배포를 막는다.",
    "- 새 사이트는 여기서 리듬·밀도·구조 아이디어만 얻고 레이아웃·서체·색·카피는 다시 설계한다(design-diversity 스킬).",
    "- 스타일 코드는 렌더링된 마크업에서 문구를 `…` 로 바꾸고 반복 항목을 접은 것이다. 클래스는 Tailwind v4 + 각 사이트 globals.css 의 토큰을 따른다.",
    "- 갱신: `npm run build:sites && npm run library` (사이트 하나만: `npm run library -- <slug>/<variant>`). 캡처 대상은 `library/config.json`.",
    "",
    "## 사이트",
    "",
    "| 사이트 | 지문 | 모듈 |",
    "|---|---|---|",
    ...siteKeys.map((k) => {
      const i = siteInfo(k);
      const fp = i.fingerprint || {};
      return `| [${i.name} · ${i.variant}](${k}/README.md) | ${[fp.layout, fp.hero, fp.palette].filter(Boolean).join(" / ")} | ${mods.filter((m) => m.site === k).length} |`;
    }),
    "",
    "## 종류별",
    "",
    ...kinds.flatMap((kind) => [
      `### ${KIND_LABEL[kind] || kind} \`${kind}\``,
      "",
      "| 미리보기 | 모듈 | 사용 사이트 |",
      "|---|---|---|",
      ...mods
        .filter((m) => m.kind === kind)
        .map((m) => {
          const shot = m.shots.desktop || m.shots.mobile;
          const anchor = `${m.label} ${m.id}`.toLowerCase().replace(/[^\p{L}\p{N}\- ]/gu, "").replace(/ /g, "-");
          return `| ${shot ? `<img src="${shot}" width="280">` : "—"} | [${m.label} \`${m.id}\`](${m.site}/README.md#${anchor}) | \`${m.site}\` |`;
        }),
      "",
    ]),
  ];
  fs.writeFileSync("library/README.md", out.join("\n"));
}
