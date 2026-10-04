// Publish the user's local agency homepage; preserve each demo's existing URL.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(repository, 'agency');
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
export function renderAgency() {
  const items = JSON.parse(fs.readFileSync(path.join(repository, 'registry/portfolio.json'), 'utf8')).items;
  const groups = new Map();
  for (const item of items) {
    if (!/^(?:concepts\/)?[a-z0-9-]+\/[a-z0-9-]+\/$/.test(item.path) || item.summary.length !== 3) throw new Error('Invalid portfolio entry: ' + item.id);
    if (!fs.existsSync(path.join(source, 'assets/images/portfolio', item.thumbnail))) throw new Error('Missing portfolio screenshot: ' + item.id);
    const key = item.category + '-' + item.kind;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  const siteCount = items.filter(i => i.kind === 'site').length;
  const external = 'target="_blank" rel="noopener noreferrer"';
  const cards = items => items.map(item => `<article class="portfolio-card" data-portfolio-card data-category="${escape(item.category)}" data-kind="${escape(item.kind)}">
    <a class="portfolio-preview" href="./${escape(item.path)}" ${external} aria-label="${escape(item.name + ' · ' + item.kindLabel)} 사이트 보기 (새 창)">
      <div class="port-plate"><img src="assets/images/portfolio/${escape(item.thumbnail)}" alt="${escape(item.name + ' ' + item.kindLabel)} 실제 홈페이지 화면" width="1440" height="900" loading="lazy"><span class="portfolio-open" aria-hidden="true">↗</span></div>
      <div class="portfolio-copy"><div class="portfolio-labels"><span>${escape(item.categoryLabel)}</span><span class="label-${item.kind}">${escape(item.kindLabel)}</span></div>
        <h3>${escape(item.name)}</h3><div class="portfolio-summary">${item.summary.map(line => `<p>${escape(line)}</p>`).join('')}</div>
      </div>
    </a>
    <div class="portfolio-actions"><a href="./${escape(item.path)}" ${external}>${item.kind === 'site' ? '사이트' : '시안'} 보기 <span aria-hidden="true">↗</span></a><a href="./${escape(item.path)}editor/" ${external}>에디터 열기 <span aria-hidden="true">↗</span></a></div>
  </article>`).join('');
  function portfolio(context) {
    // 분류 필터는 portfolio.json 에 나온 순서대로 자동 생성 (새 업종 분류를 추가해도 코드 수정 없음)
    const categories = [...new Map(items.map(i => [i.category, i.categoryLabel])).entries()];
    const filters = [['all','전체',items.length], ...categories.map(([key,label]) => [key,label,items.filter(i=>i.category===key).length]), ['site','완성 사이트',siteCount], ['concept','디자인 시안',items.length-siteCount]];
    return `<div class="portfolio-collection" data-portfolio>
      <div class="filter-row" role="group" aria-label="포트폴리오 분류">${filters.map(([key,label,count])=>`<button type="button" class="filter-chip${key==='all'?' active':''}" data-portfolio-filter="${key}" aria-pressed="${key==='all'}">${label} <span>${count}</span></button>`).join('')}</div>
      <p class="portfolio-count" data-portfolio-count role="status" aria-live="polite">${items.length}개 프로젝트 · 완성 사이트 ${siteCount}개 / 디자인 시안 ${items.length-siteCount}개</p>
      ${[...groups.entries()].map(([key,group])=>`<section class="portfolio-group" data-portfolio-group aria-labelledby="${context}-${key}"><div class="portfolio-group-heading"><h${context==='home'?'3':'2'} id="${context}-${key}">${escape(group[0].categoryLabel)} <span>${escape(group[0].kindLabel)}</span></h${context==='home'?'3':'2'}><span class="portfolio-group-count">${group.length}개</span></div><div class="port-grid">${cards(group)}</div></section>`).join('')}
    </div>`;
  }
  let html = fs.readFileSync(path.join(source, 'index.html'), 'utf8');
  for (const context of ['home','listing']) {
    const expression = new RegExp(`<!-- portfolio:${context}:start -->[\\s\\S]*?<!-- portfolio:${context}:end -->`);
    if (!expression.test(html)) throw new Error('Missing portfolio slot: ' + context);
    html = html.replace(expression, `<!-- portfolio:${context}:start -->${portfolio(context)}<!-- portfolio:${context}:end -->`);
  }
  return html;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const output = path.resolve(process.argv[2] || path.join(repository, '_site'));
  fs.mkdirSync(output, { recursive: true });
  fs.cpSync(path.join(source, 'assets'), path.join(output, 'assets'), { recursive: true });
  fs.writeFileSync(path.join(output, 'index.html'), renderAgency());
  const items = JSON.parse(fs.readFileSync(path.join(repository, 'registry/portfolio.json'), 'utf8')).items;
  console.log(`Agency homepage published with ${items.length} categorized portfolios`);
}
