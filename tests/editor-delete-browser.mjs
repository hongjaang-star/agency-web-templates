import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { installEditor } from '../scripts/install-editor.mjs';
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'editor-delete-'));
fs.writeFileSync(path.join(root, 'index.html'), '<html><body><main><section><h1>Title</h1><p>Sibling</p></section></main></body></html>');
installEditor(root, 'test/deletion', '/');
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const file = path.join(root, url.pathname, url.pathname.endsWith('/') ? 'index.html' : '');
  if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
  res.setHeader('Content-Type', file.endsWith('.js') ? 'application/javascript' : file.endsWith('.css') ? 'text/css' : file.endsWith('.json') ? 'application/json' : 'text/html');
  res.end(fs.readFileSync(file));
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${server.address().port}/editor/`);
  const frame = page.frameLocator('#preview');
  await frame.locator('h1').click();
  await page.locator('[data-tab=divbox]').click();
  const remove = page.getByRole('button', { name: '이 요소 삭제', exact: true });
  assert.equal(await remove.count(), 1);
  assert.equal(await page.getByRole('button', { name: '이 요소 숨기기', exact: true }).count(), 1);
  const toggle = page.getByRole('switch', { name: '숨김 컨텐츠 보기' });
  await page.getByRole('button', { name: '이 요소 숨기기', exact: true }).click();
  await frame.locator('h1').waitFor({ state: 'hidden' });
  await toggle.click(); await frame.locator('h1').waitFor({ state: 'visible' });
  await frame.locator('[data-agency-ui="hidden-overlay"]').waitFor();
  assert.match(await frame.locator('[data-agency-ui="hidden-overlay"]').innerText(), /숨김 처리 중/);
  assert.match(await frame.locator('[data-agency-ui="hidden-overlay"]').evaluate(el => el.style.background), /repeating-linear-gradient/);
  await page.locator('.file-menu summary').click();
  const downloaded = page.waitForEvent('download'); await page.locator('#export-html').click();
  const exported = fs.readFileSync(await (await downloaded).path(), 'utf8');
  assert.ok(exported.includes('display: none !important'));
  assert.ok(!exported.includes('hidden-overlay'));
  await page.locator('.file-menu summary').click();
  await toggle.click(); await frame.locator('h1').waitFor({ state: 'hidden' });
  await frame.locator('[data-agency-ui="hidden-overlay"]').waitFor({ state: 'detached' });
  await page.locator('#undo').click(); await frame.locator('h1').waitFor();
  await frame.locator('h1').click(); await page.locator('[data-tab=divbox]').click();
  page.once('dialog', d => d.dismiss()); await remove.click();
  assert.equal(await frame.locator('h1').count(), 1);
  page.once('dialog', d => d.accept()); await remove.click();
  await frame.locator('h1').waitFor({ state: 'detached' });
  await page.locator('#undo').click(); await frame.locator('h1').waitFor();
  await page.locator('#redo').click(); await frame.locator('h1').waitFor({ state: 'detached' });
  await page.locator('#save').click();
  await page.waitForFunction(() => document.getElementById('status').textContent.includes('저장됨'));
  await page.reload(); await frame.locator('p').waitFor();
  await frame.locator('h1').waitFor({ state: 'detached' });
  assert.equal(await frame.locator('h1').count(), 0);
  assert.equal(await frame.locator('p').innerText(), 'Sibling');
  console.log('PASS: hidden preview toggle/stripes/export, delete/cancel, separate hide button, undo/redo, save/reload, sibling preserved');
} finally {
  await browser.close(); await new Promise(resolve => server.close(resolve));
  fs.rmSync(root, { recursive: true, force: true });
}

