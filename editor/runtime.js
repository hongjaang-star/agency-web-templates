(async function () {
  'use strict';
  const script = document.querySelector('script[data-agency-editor]');
  if (!script) return;
  const config = JSON.parse(script.dataset.agencyEditor);
  const Core = window.AgencyEditorCore;
  const editing = window.parent !== window && new URL(location.href).searchParams.get('agency-editor') === '1';
  const base = new URL(config.basePath + '/', location.origin);
  const normalize = value => '/' + value.replace(/^\/+|\/+$/g, '') + (value.replace(/^\/+|\/+$/g, '') ? '/' : '');
  const page = normalize(location.pathname.slice(base.pathname.length));
  const storage = Core.database(config.siteId);
  let state = Core.empty(config.siteId), selected = null, pickMode = true;
  const elements = new Map(), originals = new Map();
  const originalStyles = new WeakMap();
  const ignore = element => element.closest('[data-agency-ui]') || element.matches('script,style,link,meta,noscript,svg,svg *,iframe,canvas');
  function keyFor(element) {
    if (element === document.body) return 'body';
    if (!element.parentElement) return '';
    const tag = element.localName;
    const siblings = [...element.parentElement.children].filter(child => child.localName === tag);
    return keyFor(element.parentElement) + ' > ' + tag + ':nth-of-type(' + (siblings.indexOf(element) + 1) + ')';
  }
  function indexElements() {
    for (const element of document.body.querySelectorAll('*')) {
      if (ignore(element)) continue;
      const key = element.dataset.agencyKey || keyFor(element);
      element.dataset.agencyKey = key;
      elements.set(key, element);
    }
    elements.set('body', document.body);
  }
  let observer;
  function apply() {
    observer?.disconnect();
    indexElements();
    const globalRules = state.pages['*'] || {}, pageRules = state.pages[page] || {};
    const records = new Map();
    for (const key of new Set([...Object.keys(globalRules), ...Object.keys(pageRules)])) {
      records.set(key, { ...globalRules[key], ...pageRules[key], styles: { ...globalRules[key]?.styles, ...pageRules[key]?.styles } });
    }
    for (const [key, original] of originals) {
      const element = elements.get(key);
      if (!element?.isConnected) continue;
      const record = records.get(key);
      if (original.children && record?.text === undefined) { element.replaceChildren(...original.children.map(child => child.cloneNode(true))); original.children = null; }
      if (original.src !== undefined && record?.image === undefined) {
        for (const [attr, value] of Object.entries(original.media)) value === null ? element.removeAttribute(attr) : element.setAttribute(attr, value);
        delete original.src; delete original.media;
      }
      if (original.alt !== undefined && record?.alt === undefined) { original.alt === null ? element.removeAttribute('alt') : element.setAttribute('alt', original.alt); delete original.alt; }
      const styles = originalStyles.get(element);
      for (const [property, saved] of styles || []) {
        if (record?.styles?.[property] !== undefined) continue;
        if (saved.value) element.style.setProperty(property, saved.value, saved.priority); else element.style.removeProperty(property);
        styles.delete(property);
      }
    }
    for (const [key, record] of records) {
      const element = elements.get(key);
      if (!element?.isConnected || ignore(element)) continue;
      const original = originals.get(key) || {};
      originals.set(key, original);
      if (record.text !== undefined && !element.matches('img,video,input,textarea,select,form,body')) {
        if (!original.children) original.children = [...element.childNodes].map(child => child.cloneNode(true));
        if (element.textContent !== record.text) element.textContent = record.text;
      }
      if (record.image && element.matches('img')) {
        if (original.src === undefined) { original.src = element.getAttribute('src') || ''; original.media = Object.fromEntries(['src', 'srcset', 'sizes'].map(attr => [attr, element.getAttribute(attr)])); }
        if (element.getAttribute('src') !== record.image) element.setAttribute('src', record.image);
        element.removeAttribute('srcset'); element.removeAttribute('sizes');
      }
      if (record.alt !== undefined && element.matches('img')) {
        if (original.alt === undefined) original.alt = element.getAttribute('alt');
        element.alt = record.alt;
      }
      const styles = originalStyles.get(element) || new Map();
      originalStyles.set(element, styles);
      for (const [property, value] of Object.entries(record.styles || {})) {
        if (!styles.has(property)) styles.set(property, { value: element.style.getPropertyValue(property), priority: element.style.getPropertyPriority(property) });
        element.style.setProperty(property, value, 'important');
      }
    }
    observer?.observe(document.body, { childList: true, subtree: true });
    updateOutline();
  }
  let outline;
  function updateOutline() {
    if (!outline || !selected?.isConnected) { if (outline) outline.hidden = true; return; }
    const box = selected.getBoundingClientRect();
    outline.hidden = false;
    Object.assign(outline.style, { left: box.left + 'px', top: box.top + 'px', width: box.width + 'px', height: box.height + 'px' });
  }
  const send = (type, extra = {}) => editing && parent.postMessage({ channel: 'agency-editor', siteId: config.siteId, type, page, ...extra }, location.origin);
  function describe(element) {
    const computed = getComputedStyle(element), values = {};
    for (const property of Core.properties) values[property] = computed.getPropertyValue(property);
    return {
      key: element.dataset.agencyKey || 'body', tag: element.localName,
      editableText: element.matches('h1,h2,h3,h4,h5,h6,p,span,a,button,small,strong,b,em,label,li,dt,dd') && !element.querySelector('img,svg,video,input,ul,ol,div,form'),
      sharedAllowed: !!element.closest('header,footer'),
      text: element.textContent?.trim().slice(0, 20000) || '',
      image: element.matches('img') ? element.getAttribute('src') : '', alt: element.getAttribute('alt') || '',
      styles: values, fonts: [...new Set([...document.fonts].map(font => font.family.replace(/^["']|["']$/g, '')))].slice(0, 40),
      label: element.getAttribute('aria-label') || element.textContent?.trim().slice(0, 65) || element.localName,
      parent: element.parentElement?.dataset.agencyKey || '',
      children: [...element.children].filter(child => !ignore(child)).map(child => ({ key: child.dataset.agencyKey, label: child.localName + ' · ' + (child.textContent?.trim().slice(0, 35) || child.getAttribute('alt') || '') })),
    };
  }
  function select(element) { selected = element; updateOutline(); send('selection', { selection: describe(element) }); }
  function sections() { return [...document.querySelectorAll('header, main > section, main > div, main > article, footer')].filter(element => !ignore(element)).map(element => ({ key: element.dataset.agencyKey, label: element.localName + ' · ' + (element.querySelector('h1,h2,h3')?.textContent || element.textContent || '').trim().slice(0, 50) })); }
  if (document.readyState !== 'complete') await new Promise(resolve => window.addEventListener('load', resolve, { once: true }));
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  try { const response = await fetch(new URL('editor/published.json', base)); if (response.ok) state = Core.validate(await response.json(), config.siteId); } catch (error) { console.warn('Published editor settings:', error.message); }
  try { const draft = await storage.get(); if (draft) state = Core.validate(draft, config.siteId); } catch (error) { send('error', { message: '브라우저의 저장 공간을 읽지 못했습니다: ' + error.message }); }
  if (!editing && !Object.values(state.pages).some(records => Object.keys(records).length)) return;
  indexElements(); apply();
  let applyTimer;
  observer = new MutationObserver(() => { clearTimeout(applyTimer); applyTimer = setTimeout(apply, 80); });
  observer.observe(document.body, { childList: true, subtree: true });
  if (!editing) {
    // Saved DOM overrides are page-specific. Reload internal routes so React never
    // carries overrides from a previous page into a newly mounted route.
    if (Object.keys(state.pages).length) document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank' || link.hasAttribute('download')) return;
      const target = new URL(link.href, location.href);
      if (target.origin === location.origin && target.pathname.startsWith(base.pathname) && target.pathname !== location.pathname) {
        event.preventDefault(); event.stopImmediatePropagation(); location.assign(target.href);
      }
    }, true);
    return;
  }
  outline = document.createElement('div'); outline.dataset.agencyUi = 'outline'; outline.hidden = true;
  Object.assign(outline.style, { position: 'fixed', border: '2px solid #2563eb', background: '#2563eb08', pointerEvents: 'none', zIndex: '2147483646', boxSizing: 'border-box' });
  document.body.append(outline);
  window.addEventListener('scroll', updateOutline, true); window.addEventListener('resize', updateOutline);
  document.addEventListener('click', event => {
    const target = event.target.closest('a');
    if (!pickMode) {
      if (target) {
        const destination = new URL(target.href, location.href);
        if (destination.origin === location.origin && destination.pathname.startsWith(base.pathname) && !destination.hash) { event.preventDefault(); event.stopImmediatePropagation(); send('navigate', { route: normalize(destination.pathname.slice(base.pathname.length)) }); }
        else if (!destination.hash) { event.preventDefault(); event.stopImmediatePropagation(); }
      }
      return;
    }
    event.preventDefault(); event.stopImmediatePropagation();
    let element = event.target;
    if (element.closest('svg')) element = element.closest('svg').parentElement;
    if (!ignore(element) && element !== document.documentElement) select(element);
  }, true);
  document.addEventListener('submit', event => { event.preventDefault(); event.stopImmediatePropagation(); }, true);
  window.addEventListener('message', event => {
    const data = event.data;
    if (event.source !== parent || event.origin !== location.origin || data?.channel !== 'agency-editor' || data.siteId !== config.siteId) return;
    try {
      if (data.type === 'state') { state = Core.validate(data.state, config.siteId); apply(); if (selected?.isConnected) send('selection', { selection: describe(selected) }); }
      else if (data.type === 'select' && elements.get(data.key)?.isConnected) { const element = elements.get(data.key); element.scrollIntoView({ block: 'center', behavior: 'smooth' }); select(element); }
      else if (data.type === 'mode') { pickMode = data.pick; outline.hidden = !pickMode; if (pickMode) updateOutline(); }
      else if (data.type === 'export-html') {
        const copy = document.documentElement.cloneNode(true);
        copy.querySelectorAll('script,[data-agency-ui],link[rel="preload"][as="script"]').forEach(element => element.remove());
        copy.querySelectorAll('[data-agency-key]').forEach(element => element.removeAttribute('data-agency-key'));
        copy.classList.remove('js'); copy.querySelectorAll('.rise,.draw').forEach(element => element.classList.add('on'));
        const baseTag = document.createElement('base'); baseTag.href = location.href.split('?')[0]; copy.querySelector('head').prepend(baseTag);
        send('html', { html: '<!doctype html>\n' + copy.outerHTML });
      }
    } catch (error) { send('error', { message: error.message }); }
  });
  send('ready', { sections: sections() });
})();
