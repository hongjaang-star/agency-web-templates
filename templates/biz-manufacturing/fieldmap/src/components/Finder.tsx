"use client";
// 제품 찾기: 적용 분야 × 카테고리 필터. 주소의 ?app=&cat= 로 공유할 수 있다.
import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { applications, categories, products, type AppId, type CategoryId } from "@/data/catalog";

export default function Finder() {
  const [app, setApp] = useState<AppId | null>(null);
  const [cat, setCat] = useState<CategoryId | null>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const a = q.get("app") as AppId | null;
    const c = q.get("cat") as CategoryId | null;
    // 주소 값은 첫 렌더 이후에만 읽을 수 있다(정적 export)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (a && applications.some((x) => x.id === a)) setApp(a);
    if (c && categories.some((x) => x.id === c)) setCat(c);
  }, []);

  useEffect(() => {
    const q = new URLSearchParams();
    if (app) q.set("app", app);
    if (cat) q.set("cat", cat);
    const s = q.toString();
    window.history.replaceState(null, "", s ? `?${s}` : window.location.pathname);
  }, [app, cat]);

  const list = useMemo(() => products.filter((p) => (!app || p.apps.includes(app)) && (!cat || p.category === cat)), [app, cat]);
  const appName = app ? applications.find((a) => a.id === app)!.name : null;

  return (
    <div className="finder">
      <div className="finder-apps" role="group" aria-label="적용 분야">
        <button type="button" aria-pressed={app === null} onClick={() => setApp(null)}><b>전체</b><span>분야 상관없이</span></button>
        {applications.map((a) => (
          <button key={a.id} type="button" aria-pressed={app === a.id} onClick={() => setApp(a.id)}><b>{a.name}</b><span>{a.note}</span></button>
        ))}
      </div>
      <div className="finder-grid">
        <aside className="side">
          <h2>CATEGORY</h2>
          <div className="cats" role="group" aria-label="제품 카테고리">
            <button type="button" aria-pressed={cat === null} onClick={() => setCat(null)}>전체</button>
            {categories.map((c) => (
              <button key={c.id} type="button" aria-pressed={cat === c.id} title={c.desc} onClick={() => setCat(c.id)}>{c.name}</button>
            ))}
          </div>
          <p className="count" aria-live="polite"><span>{list.length}</span><small>개 제품{appName ? ` · ${appName}` : ""}</small></p>
        </aside>
        <div className="results">
          {list.length === 0 && <p className="empty">이 조합에 맞는 등록 제품이 없습니다. 도면을 보내 주시면 주문 제작을 검토합니다.</p>}
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </div>
  );
}
