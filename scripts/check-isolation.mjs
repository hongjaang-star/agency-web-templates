// 사이트 소스 분리 검사: 각 앱은 자기 폴더 안의 파일과 npm 패키지만 쓴다.
// 다른 앱, library/, 저장소 루트를 import 하거나 file:/link:/workspace: 의존성을 두면 실패한다.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const apps = fs.existsSync("templates")
  ? fs.readdirSync("templates").flatMap((s) =>
      fs.statSync(`templates/${s}`).isDirectory()
        ? fs.readdirSync(`templates/${s}`).map((v) => `templates/${s}/${v}`).filter((p) => fs.existsSync(`${p}/package.json`))
        : [],
    )
  : [];

const errors = [];
const SRC = /\.(m?[jt]sx?|css)$/;
const IMPORT = /(?:import|export)[^'"]*?from\s*['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)|require\(\s*['"]([^'"]+)['"]\s*\)|@import\s+['"]([^'"]+)['"]/g;

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    if (["node_modules", ".next", "out", "public"].includes(f)) continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (SRC.test(f)) out.push(p);
  }
  return out;
}

for (const app of apps) {
  const appDir = path.join(root, app);
  const inside = (p) => p === appDir || p.startsWith(appDir + path.sep);

  const pkg = JSON.parse(fs.readFileSync(`${app}/package.json`, "utf8"));
  for (const [name, spec] of Object.entries({ ...pkg.dependencies, ...pkg.devDependencies })) {
    if (/^(file|link|workspace|portal):/.test(spec)) errors.push(`${app}/package.json: ${name} → ${spec} (로컬 패키지 공유 금지)`);
  }

  const ts = fs.existsSync(`${app}/tsconfig.json`) ? fs.readFileSync(`${app}/tsconfig.json`, "utf8") : "";
  for (const m of ts.matchAll(/"(\.{1,2}\/[^"]*)"/g)) {
    if (!inside(path.resolve(appDir, m[1]))) errors.push(`${app}/tsconfig.json: ${m[1]} 가 앱 밖을 가리킴`);
  }

  for (const file of walk(appDir)) {
    const src = fs.readFileSync(file, "utf8");
    for (const m of src.matchAll(IMPORT)) {
      const spec = m[1] || m[2] || m[3] || m[4];
      if (!spec.startsWith(".")) continue;
      const target = path.resolve(path.dirname(file), spec);
      if (!inside(target)) errors.push(`${path.relative(root, file)}: "${spec}" 가 앱 밖을 import`);
    }
  }
}

if (errors.length) {
  console.error("사이트 소스 분리 위반:\n" + errors.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}
console.log(`사이트 소스 분리 검사 통과 (${apps.length}개 앱)`);
