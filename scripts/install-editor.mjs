// Add a self-contained editor to any exported template. Run after next build.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const editorSeed = path.join(repository, 'editor');
const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

export function installEditor(outputDirectory, siteId, basePath, sourceDirectory) {
  if (!/^[a-z0-9-]+(?:\/[a-z0-9-]+){1,2}$/.test(siteId)) throw new Error('siteId must be slug/variant or concepts/slug/variant');
  basePath = basePath.replace(/\/$/, '');
  if (basePath && (!basePath.startsWith('/') || /[?#\\]|\.\./.test(basePath))) throw new Error('Invalid editor basePath');
  const output = path.resolve(outputDirectory);
  if (!fs.existsSync(path.join(output, 'index.html'))) throw new Error('Build the static export before installing the editor');
  const app = path.join(repository, siteId.startsWith('concepts/') ? siteId : 'templates/' + siteId);
  // Existing per-site sources are never overwritten by starter changes.
  const editorSource = path.resolve(sourceDirectory || (fs.existsSync(path.join(app, 'index.html')) || fs.existsSync(path.join(app, 'package.json')) ? path.join(app, 'site-editor') : path.join(output, 'site-editor')));
  if (!fs.existsSync(editorSource)) fs.cpSync(editorSeed, editorSource, { recursive: true });
  const context = { URL };
  vm.runInNewContext(fs.readFileSync(path.join(editorSource, 'core.js'), 'utf8'), context);
  const htmlFiles = [];
  function visit(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (['editor', 'site-editor', '_next', 'images', 'fonts'].includes(entry.name)) continue;
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(file);
      else if (entry.name.endsWith('.html')) htmlFiles.push(file);
    }
  }
  visit(output);
  const pages = [];
  for (const file of htmlFiles) {
    const relative = path.relative(output, file).replaceAll(path.sep, '/');
    if (/(?:^|\/)(404|500|_not-found)(?:\/|\.html)/.test(relative)) continue;
    const route = relative === 'index.html' ? '/' : relative.endsWith('/index.html') ? '/' + relative.slice(0, -10) : '/' + relative;
    let html = fs.readFileSync(file, 'utf8');
    const title = (html.match(/<title>(.*?)<\/title>/s)?.[1] || route).replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    pages.push({ path: route, title });
    html = html.replace(/<!-- agency-editor:start -->[\s\S]*?<!-- agency-editor:end -->/g, '');
    const config = escape(JSON.stringify({ siteId, basePath }));
    const injection = `<!-- agency-editor:start --><script defer src="${escape(basePath)}/editor/core.js"></script><script defer src="${escape(basePath)}/editor/runtime.js" data-agency-editor="${config}"></script><!-- agency-editor:end -->`;
    if (!html.includes('</body>')) throw new Error('Missing body in ' + relative);
    fs.writeFileSync(file, html.replace('</body>', injection + '</body>'));
  }
  pages.sort((a, b) => a.path === '/' ? -1 : b.path === '/' ? 1 : a.path.localeCompare(b.path));
  const target = path.join(output, 'editor');
  fs.mkdirSync(target, { recursive: true });
  fs.cpSync(editorSource, target, { recursive: true });
  fs.writeFileSync(path.join(target, 'manifest.json'), JSON.stringify({ version: 1, siteId, basePath, source: 'site-editor', name: pages[0]?.title.split('|')[0].trim() || siteId, pages }, null, 2));
  const settingsFile = path.join(output, 'editor-state.json');
  const published = fs.existsSync(settingsFile) ? context.AgencyEditorCore.validate(JSON.parse(fs.readFileSync(settingsFile, 'utf8')), siteId) : context.AgencyEditorCore.empty(siteId);
  fs.writeFileSync(path.join(target, 'published.json'), JSON.stringify(published));
  console.log(`Editor installed: ${siteId} (${pages.length} pages, ${basePath}/editor/)`);
  return { siteId, basePath, pages };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [output, siteId, basePath] = process.argv.slice(2);
  if (!output || !siteId || basePath === undefined) throw new Error('Usage: node scripts/install-editor.mjs OUT SLUG/VARIANT BASE_PATH');
  installEditor(output, siteId, basePath);
}
