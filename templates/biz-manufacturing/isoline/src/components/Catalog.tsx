"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductImage from "./ProductImage";
import { applications, categories, products } from "@/data/catalog";

export default function Catalog() {
  const [category, setCategory] = useState("all");
  const [app, setApp] = useState("all");
  const [query, setQuery] = useState("");
  useEffect(() => {
    const sync = () => { const id = window.location.hash.slice(1); setCategory(categories.some(c => c.id === id) ? id : "all"); };
    sync(); window.addEventListener("hashchange", sync); window.addEventListener("popstate", sync);
    return () => { window.removeEventListener("hashchange", sync); window.removeEventListener("popstate", sync); };
  }, []);
  const choose = (id: string) => { setCategory(id); window.history.pushState(null, "", id === "all" ? window.location.pathname : `#${id}`); };
  const list = products.filter(p => (category === "all" || p.category === category) && (app === "all" || p.apps.some(a => a === app)) && `${p.id} ${p.name} ${p.summary} ${Object.values(p.spec).join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));
  const reset = () => { choose("all"); setApp("all"); setQuery(""); };
  return <section className="sec flush">
    <div className="catalog-controls">
      <div className="filter-chips" role="group" aria-label="제품 카테고리"><button aria-pressed={category === "all"} onClick={() => choose("all")}>전체 제품</button>{categories.map(c => <button key={c.id} aria-pressed={category === c.id} onClick={() => choose(c.id)}>{c.name}</button>)}</div>
      <div className="catalog-inputs"><label>제품 검색<input type="search" placeholder="품번, 제품명, 재질 검색" value={query} onChange={e => setQuery(e.target.value)} /></label><label>적용 분야<select aria-label="적용 분야" value={app} onChange={e => setApp(e.target.value)}><option value="all">전체 분야</option>{applications.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select></label><button className="outline-button" onClick={reset}>필터 초기화</button></div>
    </div>
    <p className="result-count" role="status">전체 {products.length}종 중 {list.length}종 표시 · 사양과 납기는 가상 예시입니다.</p>
    {category !== "all" && <p className="proc">{categories.find(c => c.id === category)?.process}</p>}
    <ul className="catalog-grid">{list.map(p => <li key={p.id}><Link href={`/parts/${p.id}/`} className="catalog-product"><ProductImage p={p} /><div><span className="code num">{p.id}</span><h2>{p.name}</h2><p>{p.summary}</p><small>{p.spec["재질"]} · 최소 주문 {p.moq} · 납기 {p.lead}</small><span className="catalog-detail">제품 상세 보기 ↗</span></div></Link><Link className="catalog-rfq" href={`/rfq/?part=${p.id}`}>이 제품으로 견적 준비 →</Link></li>)}</ul>
    {!list.length && <div className="empty-state"><h2>조건에 맞는 제품이 없습니다.</h2><p>검색어를 줄이거나 적용 분야와 카테고리를 다시 선택해 주세요.</p><button className="go" onClick={reset}>전체 제품 보기</button></div>}
  </section>;
}
