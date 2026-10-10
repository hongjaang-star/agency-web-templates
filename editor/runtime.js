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
  if (!editing) {
    // Appending /editor after a section hash never changes the browser pathname.
    const openHashEditor = () => {
      if (/^#(?:.*\/)?editor\/?$/.test(location.hash)) location.replace(Core.editorURL(config.basePath, page, location.origin));
    };
    openHashEditor();
    window.addEventListener('hashchange', openHashEditor);
  }
  const storage = Core.database(config.siteId);
  let state = Core.empty(config.siteId), selected = null, pickMode = true;
  const elements = new Map(), originals = new Map();
  const originalStyles = new WeakMap();
  const removed = new Map();
  let showHidden = false;
  const revealed = new Map(), displays = new WeakMap();
  function clearRevealed() {
    for (const [element, entry] of revealed) {
      element.style.setProperty('display', 'none', 'important');
      entry.overlay.remove();
    }
    revealed.clear();
  }
  function updateHiddenOverlays() {
    for (const [element, entry] of revealed) {
      const rect = element.getBoundingClientRect();
      Object.assign(entry.overlay.style, { left: rect.left + 'px', top: rect.top + 'px', width: rect.width + 'px', height: rect.height + 'px' });
    }
  }
  window.addEventListener('scroll', updateHiddenOverlays, true);
  window.addEventListener('resize', updateHiddenOverlays);
  if (editing) new ResizeObserver(updateHiddenOverlays).observe(document.body);
  const ignore = element => element.closest('[data-agency-ui]') || element.matches('script,style,link,meta,noscript,iframe,canvas') || (element.closest('svg') && !element.matches('text,tspan'));
  const directText = element => [...element.childNodes].filter(node => node.nodeType === Node.TEXT_NODE);
  function textMode(element) {
    if (element.matches('input,textarea')) return element.hasAttribute('placeholder') ? 'placeholder' : '';
    if (element.matches('body,form,select,svg,img,video,audio,iframe,canvas')) return '';
    if (element.querySelector('img,svg,video,input,textarea,select,ul,ol,div,form,section,article,table') || !element.matches('h1,h2,h3,h4,h5,h6,p,span,a,button,small,strong,b,em,i,u,s,label,li,dt,dd,summary,figcaption,caption,td,th,address,legend,option,text,tspan') && element.children.length) return directText(element).some(node => node.data.trim()) ? 'direct' : '';
    return element.textContent.trim() ? 'full' : '';
  }
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
    clearRevealed();
    indexElements();
    const globalRules = state.pages['*'] || {}, pageRules = state.pages[page] || {};
    const records = new Map();
    for (const key of new Set([...Object.keys(globalRules), ...Object.keys(pageRules)])) {
      const record = { ...globalRules[key], ...pageRules[key], styles: { ...globalRules[key]?.styles, ...pageRules[key]?.styles } };
      // Plain textarea newlines must remain visible even on white-space: normal sites.
      // Track this with the other overrides so undo/reset restores authored styling.
      if (record.text !== undefined && /[\r\n]/.test(record.text)) record.styles['white-space'] = 'pre-wrap';
      records.set(key, record);
    }
    // Comment anchors preserve sibling selectors and the original nodes for undo.
    for (const [key, entry] of removed) {
      if (!records.get(key)?.deleted) {
        entry.anchor.replaceWith(entry.element);
        removed.delete(key);
      }
    }
    for (const [key, record] of records) {
      const element = elements.get(key);
      if (record.deleted && element?.parentNode && element !== document.body && !removed.has(key)) {
        const anchor = document.createComment('agency-editor:deleted');
        element.replaceWith(anchor);
        removed.set(key, { element, anchor });
      }
    }
    for (const [key, original] of originals) {
      const element = elements.get(key);
      if (!element?.isConnected) continue;
      const record = records.get(key);
      if (original.direct && record?.text === undefined && record?.html === undefined) { original.direct.forEach(([node, value]) => { if (node.parentNode === element) node.data = value; }); delete original.direct; }
      if (original.placeholder !== undefined && record?.text === undefined) { element.setAttribute('placeholder', original.placeholder); delete original.placeholder; }
      if (original.children && record?.text === undefined && record?.html === undefined) { element.replaceChildren(...original.children.map(child => child.cloneNode(true))); original.children = null; }
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
      const mode = textMode(element);
      if (record.text !== undefined && mode === 'placeholder') {
        if (original.placeholder === undefined) original.placeholder = element.getAttribute('placeholder');
        element.setAttribute('placeholder', record.text);
      } else if (record.text !== undefined && (mode === 'direct' || original.direct)) {
        if (!original.direct) original.direct = directText(element).filter(node => node.data.trim()).map(node => [node, node.data]);
        original.direct.forEach(([node], index) => { if (node.parentNode === element) node.data = index === 0 ? record.text : ''; });
      } else if (record.text !== undefined && !element.matches('img,video,input,textarea,select,form,body')) {
        if (!original.children) original.children = [...element.childNodes].map(child => child.cloneNode(true));
        if (element.textContent !== record.text) element.textContent = record.text;
      }
      if (record.html !== undefined && (mode === 'full' || original.children)) {
        if (!original.children) original.children = [...element.childNodes].map(child => child.cloneNode(true));
        const safe = Core.sanitizeHTML(record.html);
        if (element.innerHTML !== safe) element.innerHTML = safe;
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
        if (property === 'display' && value === 'none' && !displays.has(element)) displays.set(element, getComputedStyle(element).display);
        element.style.setProperty(property, value, 'important');
      }
    }
    if (editing && showHidden) for (const [key, record] of records) {
      const element = elements.get(key);
      if (record.deleted || record.styles?.display !== 'none' || !element?.isConnected) continue;
      const display = displays.get(element);
      element.style.setProperty('display', display && display !== 'none' ? display : 'revert', 'important');
      const overlay = document.createElement('div');
      overlay.dataset.agencyUi = 'hidden-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.style.cssText = 'position:fixed;pointer-events:none;z-index:2147483645;box-sizing:border-box;border:2px dashed #d97706;background:repeating-linear-gradient(135deg,rgba(217,119,6,.22) 0,rgba(217,119,6,.22) 6px,transparent 6px,transparent 14px)';
      const badge = document.createElement('span'); badge.textContent = '숨김 처리 중';
      badge.style.cssText = 'background:#92400e;color:white;font:12px/1.5 system-ui;padding:2px 6px';
      overlay.append(badge); document.body.append(overlay);
      revealed.set(element, { overlay });
    }
    updateHiddenOverlays();
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
      editableText: !!textMode(element), textMode: textMode(element),
      sharedAllowed: !!element.closest('header,footer'),
      text: (textMode(element) === 'placeholder' ? element.getAttribute('placeholder') : textMode(element) === 'direct' ? directText(element).map(node => node.data).join('') : element.textContent)?.trim().slice(0, 20000) || '',
      html: textMode(element) === 'full' ? element.innerHTML?.slice(0, 60000) || '' : '',
      image: element.matches('img') ? element.getAttribute('src') : '', alt: element.getAttribute('alt') || '',
      styles: { ...values, ...(revealed.has(element) ? { display: 'none' } : {}) }, fonts: [...new Set([...document.fonts].map(font => font.family.replace(/^["']|["']$/g, '')))].slice(0, 40),
      authoredStyles: { ...state.pages['*']?.[element.dataset.agencyKey]?.styles, ...state.pages[page]?.[element.dataset.agencyKey]?.styles },
      label: element.getAttribute('aria-label') || element.textContent?.trim().slice(0, 65) || element.localName,
      parent: element.parentElement?.dataset.agencyKey || '',
      children: [...element.children].filter(child => !ignore(child)).map(child => ({ key: child.dataset.agencyKey, label: child.localName + ' · ' + (child.textContent?.trim().slice(0, 35) || child.getAttribute('alt') || '') })),
    };
  }
  function select(element) { selected = element; updateOutline(); send('selection', { selection: describe(element) }); }
  function sections() {
    const regions = [...document.querySelectorAll('header, main > section, main > div, main > article, footer')].filter(element => !ignore(element));
    const texts = [...document.body.querySelectorAll('*')].filter(element => !ignore(element) && textMode(element));
    return [...new Set([...regions, ...texts])].map(element => ({ key: element.dataset.agencyKey, label: (regions.includes(element) ? '영역 · ' : '텍스트 · ') + element.localName + ' · ' + (element.getAttribute('placeholder') || element.querySelector('h1,h2,h3')?.textContent || element.textContent || '').trim().slice(0, 50) }));
  }
  if (document.readyState !== 'complete') await new Promise(resolve => window.addEventListener('load', resolve, { once: true }));
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  if (!editing && window.parent === window) {
    const link = document.createElement('a');
    link.dataset.agencyUi = 'editor-link'; link.textContent = '사이트 편집 ↗';
    link.href = Core.editorURL(config.basePath, page, location.origin);
    link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', '현재 페이지를 사이트 편집기에서 열기 (새 창)');
    Object.assign(link.style, { position: 'fixed', left: '16px', bottom: '16px', zIndex: '2147483645', padding: '8px 12px', border: '1px solid #d5d5d5', borderRadius: '6px', background: '#fff', color: '#222', font: '13px/1.5 system-ui,sans-serif', textDecoration: 'none', boxShadow: '0 2px 8px #0001' });
    const style = document.createElement('style'); style.dataset.agencyUi = 'editor-link-style';
    style.textContent = '[data-agency-ui="editor-link"]:focus-visible{outline:3px solid #2563eb;outline-offset:3px}@media print{[data-agency-ui="editor-link"]{display:none!important}}';
    document.body.append(style, link);
  }
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
    if (element.closest('svg') && !element.matches('text,tspan')) element = element.closest('svg').parentElement;
    if (!textMode(element) && !element.matches('img,video,input,textarea,select')) {
      const node = document.caretPositionFromPoint?.(event.clientX, event.clientY)?.offsetNode || document.caretRangeFromPoint?.(event.clientX, event.clientY)?.startContainer;
      const textElement = node?.nodeType === Node.TEXT_NODE ? node.parentElement : null;
      const box = textElement?.getBoundingClientRect();
      if (box && event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom && !ignore(textElement) && textMode(textElement)) element = textElement;
    }
    if (!ignore(element) && element !== document.documentElement) select(element);
  }, true);
  document.addEventListener('submit', event => { event.preventDefault(); event.stopImmediatePropagation(); }, true);
  window.addEventListener('message', event => {
    const data = event.data;
    if (event.source !== parent || event.origin !== location.origin || data?.channel !== 'agency-editor' || data.siteId !== config.siteId) return;
    try {
      if (data.type === 'state') { state = Core.validate(data.state, config.siteId); apply(); if (selected?.isConnected) send('selection', { selection: describe(selected) }); }
      else if (data.type === 'select' && elements.get(data.key)?.isConnected) { const element = elements.get(data.key); element.scrollIntoView({ block: 'center', behavior: 'smooth' }); select(element); }
      else if (data.type === 'clear-selection') { selected = null; updateOutline(); send('selection-cleared'); }
      else if (data.type === 'mode') { pickMode = data.pick; outline.hidden = !pickMode; if (pickMode) updateOutline(); }
      else if (data.type === 'show-hidden') { showHidden = data.enabled === true; apply(); }
      else if (data.type === 'export-html') {
        const copy = document.documentElement.cloneNode(true);
        copy.querySelectorAll('script,[data-agency-ui],link[rel="preload"][as="script"]').forEach(element => element.remove());
        copy.querySelectorAll('[data-agency-key]').forEach(element => { if (revealed.has(elements.get(element.dataset.agencyKey))) element.style.setProperty('display', 'none', 'important'); });
        copy.querySelectorAll('[data-agency-key]').forEach(element => element.removeAttribute('data-agency-key'));
        copy.classList.remove('js'); copy.querySelectorAll('.rise,.draw').forEach(element => element.classList.add('on'));
        const baseTag = document.createElement('base'); baseTag.href = location.href.split('?')[0]; copy.querySelector('head').prepend(baseTag);
        send('html', { html: '<!doctype html>\n' + copy.outerHTML });
      }
    } catch (error) { send('error', { message: error.message }); }
  });
  send('ready', { sections: sections() });
})();
