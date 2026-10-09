/* Site-independent editing protocol and validation. No template imports. */
(function (root) {
  'use strict';
  const properties = new Set(['font-family', 'font-size', 'font-weight', 'font-style', 'text-decoration', 'letter-spacing', 'line-height', 'text-align', 'color', 'background-color', 'background-image', 'background-size', 'background-position', 'background-repeat', 'opacity', 'width', 'max-width', 'height', 'min-height', 'object-fit', 'object-position', 'border-radius', 'border-width', 'border-style', 'border-color', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'gap', 'display', 'box-shadow', 'text-shadow', 'filter', 'clip-path']);
  const keyPattern = /^body(?: > [a-z][a-z0-9-]*:nth-of-type\([1-9]\d*\))*$/;
  function safeURL(value, image = false) {
    if (typeof value !== 'string' || value.length > 8_000_000 || /[\x00-\x1f\\]/.test(value)) return false;
    if (image && /^data:image\/(?:png|jpeg|webp|gif|avif);base64,[a-z0-9+/=]+$/i.test(value)) return true;
    try { const url = new URL(value, 'https://example.test/'); return /^https?:$/.test(url.protocol) && !url.username && !url.password; } catch { return false; }
  }
  function validate(input, siteId) {
    if (!input || input.version !== 1 || input.siteId !== siteId || !input.pages || typeof input.pages !== 'object' || Array.isArray(input.pages)) throw new Error('다른 사이트의 설정이거나 지원하지 않는 편집 파일입니다.');
    const output = { version: 1, siteId, pages: {} };
    const pages = Object.entries(input.pages);
    if (pages.length > 200) throw new Error('페이지 수가 너무 많습니다.');
    for (const [route, records] of pages) {
      if (route !== '*' && (!/^\/(?:[^?#\\\x00-\x1f]*)$/.test(route) || route.includes('..'))) throw new Error('페이지 경로를 확인하세요.');
      if (!records || typeof records !== 'object' || Array.isArray(records) || Object.keys(records).length > 2000) throw new Error('편집 데이터가 올바르지 않습니다.');
      output.pages[route] = {};
      for (const [key, record] of Object.entries(records)) {
        if (!keyPattern.test(key) || !record || typeof record !== 'object') throw new Error('편집 대상이 올바르지 않습니다.');
        const clean = { styles: {} };
        for (const [property, value] of Object.entries(record.styles || {})) {
          if (!properties.has(property) || typeof value !== 'string' || value.length > 8_000_100 || /[{}<>\x00-\x1f]|(?:expression|@import|javascript\s*:)/i.test(value) || (property !== 'background-image' && value.includes(';'))) throw new Error('지원하지 않는 스타일입니다.');
          if (property === 'background-image') {
            const match = /^url\("([^"\n]+)"\)$/.exec(value);
            const gradient = /^linear-gradient\([\d.]+deg, #[a-f\d]{6}, #[a-f\d]{6}\)$/i.test(value);
            if (value !== 'none' && !gradient && (!match || !safeURL(match[1], true))) throw new Error('배경 이미지 주소를 확인하세요.');
          } else if (/url\s*\(/i.test(value)) throw new Error('지원하지 않는 스타일 주소입니다.');
          clean.styles[property] = value;
        }
        if (record.text !== undefined) { if (typeof record.text !== 'string' || record.text.length > 20000) throw new Error('텍스트가 너무 깁니다.'); clean.text = record.text; }
        if (record.html !== undefined) { if (typeof record.html !== 'string' || record.html.length > 60000) throw new Error('텍스트가 너무 깁니다.'); clean.html = record.html; }
        if (record.image !== undefined) { if (!safeURL(record.image, true)) throw new Error('이미지 주소를 확인하세요.'); clean.image = record.image; }
        if (record.alt !== undefined) { if (typeof record.alt !== 'string' || record.alt.length > 2000) throw new Error('대체 텍스트를 확인하세요.'); clean.alt = record.alt; }
        output.pages[route][key] = clean;
      }
    }
    return output;
  }
  function empty(siteId) { return { version: 1, siteId, pages: {} }; }
  function database(siteId) {
    let pending;
    const open = () => pending ||= new Promise((resolve, reject) => {
      const request = indexedDB.open('agency-editor:' + siteId, 1);
      request.onupgradeneeded = () => request.result.createObjectStore('settings');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => { pending = null; reject(request.error); };
    });
    async function transaction(mode, operation) {
      const db = await open();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('settings', mode);
        const request = operation(tx.objectStore('settings'));
        tx.oncomplete = () => resolve(request.result);
        tx.onerror = tx.onabort = () => reject(tx.error || new Error('저장 실패'));
      });
    }
    return { get: () => transaction('readonly', store => store.get('draft')), set: value => transaction('readwrite', store => store.put(value, 'draft')), clear: () => transaction('readwrite', store => store.delete('draft')) };
  }
  // Rich text is sanitized again at the point of insertion, including imports.
  // Only formatting elements and safe links survive; attributes/CSS are not code.
  function sanitizeHTML(value) {
    const document = root.document;
    const template = document.createElement('template'); template.innerHTML = String(value);
    const allowed = new Set(['P','BR','STRONG','B','EM','I','U','S','SPAN','H2','H3','H4','UL','OL','LI','A']);
    for (const el of [...template.content.querySelectorAll('*')].reverse()) {
      if (['SCRIPT','STYLE','IFRAME','OBJECT','EMBED','SVG','MATH','TEMPLATE'].includes(el.tagName)) { el.remove(); continue; }
      if (!allowed.has(el.tagName)) { el.replaceWith(...el.childNodes); continue; }
      const href = el.tagName === 'A' && safeURL(el.getAttribute('href')) ? el.getAttribute('href') : null;
      for (const attr of [...el.attributes]) el.removeAttribute(attr.name);
      if (href) { el.setAttribute('href', href); el.setAttribute('rel', 'noopener noreferrer'); }
    }
    return template.innerHTML;
  }
  function editorURL(basePath, page, origin) {
    const url = new URL(basePath.replace(/\/$/, '') + '/editor/', origin);
    if (page && page !== '/') url.searchParams.set('page', page);
    return url.href;
  }
  root.AgencyEditorCore = { properties, keyPattern, safeURL, validate, empty, database, sanitizeHTML, editorURL };
})(globalThis);
