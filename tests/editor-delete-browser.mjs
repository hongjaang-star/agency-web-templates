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
  console.log('PASS: delete/cancel, separate hide button, undo/redo, save/reload, sibling preserved');
} finally {
  await browser.close(); await new Promise(resolve => server.close(resolve));
  fs.rmSync(root, { recursive: true, force: true });
}

