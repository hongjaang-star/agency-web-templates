import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { installEditor } from '../scripts/install-editor.mjs';

const context = { URL };
vm.runInNewContext(fs.readFileSync(new URL('../editor/core.js', import.meta.url), 'utf8'), context);
const core = context.AgencyEditorCore;
const siteId = 'test-site/original';
const key = 'body > main:nth-of-type(1) > h1:nth-of-type(1)';
const data = () => ({ version: 1, siteId, pages: { '/': { [key]: { styles: { 'letter-spacing': '2px' }, text: '수정 제목' } } } });

test('import is strictly bound to one site, including same-origin variants', () => {
  assert.equal(core.validate(data(), siteId).pages['/'][key].text, '수정 제목');
  assert.throws(() => core.validate(data(), 'test-site/another'));
  assert.throws(() => core.validate(data(), 'another-site/original'));
  assert.throws(() => core.validate(data(), 'concepts/test-site/original'));
});

test('reject script URLs, executable styles, foreign selectors, and route traversal', () => {
  for (const invalid of ['javascript:alert(1)', 'data:text/html;base64,AAA', 'data:image/svg+xml;base64,AAA', 'https://user:password@example.com/photo.png']) assert.equal(core.safeURL(invalid, true), false);
  for (const [property, value] of [['background-image', 'url("javascript:alert(1)")'], ['position', 'fixed'], ['color', 'red; display:none'], ['font-family', 'expression(alert(1))']]) {
    const input = data(); input.pages['/'][key].styles = { [property]: value }; assert.throws(() => core.validate(input, siteId));
  }
  const foreign = data(); foreign.pages['/']['#other-site'] = foreign.pages['/'][key]; assert.throws(() => core.validate(foreign, siteId));
  const traversal = data(); traversal.pages['/../another/'] = {}; assert.throws(() => core.validate(traversal, siteId));
});

test('uploaded raster backgrounds and plain text survive round trips', () => {
  const input = data(); input.pages['/'][key].styles['background-image'] = 'url("data:image/png;base64,AAAA")';
  input.pages['/'][key].text = '<script>alert(1)</script>';
  const clean = core.validate(JSON.parse(JSON.stringify(input)), siteId);
  assert.equal(clean.pages['/'][key].styles['background-image'], input.pages['/'][key].styles['background-image']);
  assert.equal(clean.pages['/'][key].text, input.pages['/'][key].text);
});

test('future templates get an independent editor without source imports; installation is idempotent', () => {
  const output = fs.mkdtempSync(path.join(os.tmpdir(), 'agency-editor-unit-'));
  try {
    fs.mkdirSync(path.join(output, 'about'));
    fs.writeFileSync(path.join(output, 'index.html'), '<html><head><title>새 사이트</title></head><body><h1>원본</h1></body></html>');
    fs.writeFileSync(path.join(output, 'about/index.html'), '<html><head><title>소개</title></head><body><h1>소개</h1></body></html>');
    installEditor(output, 'new-site/new-variant', '/agency-web-templates/new-site/new-variant');
    installEditor(output, 'new-site/new-variant', '/agency-web-templates/new-site/new-variant');
    const html = fs.readFileSync(path.join(output, 'index.html'), 'utf8');
    assert.equal((html.match(/agency-editor:start/g) || []).length, 1);
    const manifest = JSON.parse(fs.readFileSync(path.join(output, 'editor/manifest.json'), 'utf8'));
    assert.deepEqual(manifest.pages.map(page => page.path), ['/', '/about/']);
    assert.equal(manifest.siteId, 'new-site/new-variant');
    assert.ok(html.includes('/agency-web-templates/new-site/new-variant/editor/runtime.js'));
    const settings = { version: 1, siteId: 'new-site/new-variant', pages: { '/': { [key]: { styles: {}, image: 'https://example.com/photo.webp' } } } };
    fs.writeFileSync(path.join(output, 'editor-state.json'), JSON.stringify(settings));
    installEditor(output, 'new-site/new-variant', '');
    assert.equal(JSON.parse(fs.readFileSync(path.join(output, 'editor/published.json'), 'utf8')).pages['/'][key].image, 'https://example.com/photo.webp');
    assert.ok(fs.readFileSync(path.join(output, 'index.html'), 'utf8').includes('src="/editor/runtime.js"'));
    fs.writeFileSync(path.join(output, 'editor-state.json'), JSON.stringify(data()));
    assert.throws(() => installEditor(output, 'new-site/new-variant', '/new-site/new-variant'));
  } finally { fs.rmSync(output, { recursive: true, force: true }); }
});
