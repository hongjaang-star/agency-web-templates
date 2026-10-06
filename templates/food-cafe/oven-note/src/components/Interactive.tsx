'use client';
import {copy} from '../data/copy';
import { useRef, useState } from 'react';
import { bakery, menu, times } from '../data/bakery';
import Picture from './Picture';
const money = (n: number) => n.toLocaleString('ko-KR') + copy["n117"];
export function MenuBoard({ preview = false }: {
    preview?: boolean;
}) { const [filter, setFilter] = useState('all'); const [selected, setSelected] = useState(menu[0]); const modal = useRef<HTMLDialogElement>(null); const items = preview ? menu.slice(0, 3) : menu.filter(m => filter === 'all' || m.category === filter); return <div className="menu-board">{!preview && <div className="filters" aria-label={copy["n118"]}>{[['all', copy["n119"]], ['bread', copy["n120"]], ['sweet', copy["n121"]], ['drink', copy["n122"]]].map(([id, label]) => <button key={id} aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>)}</div>}<div className={'products ' + (preview ? 'preview' : '')}>{items.map((item, i) => <button className="product" key={item.id} onClick={() => { setSelected(item); modal.current?.showModal(); }}><div className="product-photo"><Picture name={item.id} alt={item.name}/><span className="product-number">0{i + 1}</span><span className="open-product" aria-hidden="true">＋</span></div><div className="product-title"><h3>{item.name}</h3><span>{money(item.price)}</span></div><p>{item.note}</p><small>{item.en}</small></button>)}</div><p className="fineprint">{bakery.priceNote}</p><dialog aria-label={selected.name} ref={modal} className="menu-dialog" onClick={e => { if (e.target === e.currentTarget)
    modal.current?.close(); }}><button className="close-dialog" aria-label={copy["n123"]} onClick={() => modal.current?.close()}>{copy["n124"]}</button><Picture name={selected.id} alt={selected.name}/><div className="dialog-copy"><span className="eyebrow">{selected.en}</span><h2>{selected.name}</h2><p>{selected.note}</p><dl><dt>{copy["n125"]}</dt><dd>{money(selected.price)}{copy["n126"]}</dd><dt>{copy["n127"]}</dt><dd>{selected.taste}</dd><dt>{copy["n128"]}</dt><dd>{selected.ingredients}</dd><dt>{copy["n129"]}</dt><dd>{selected.allergens}</dd></dl><p className="fineprint">{copy["n130"]}</p></div></dialog></div>; }
export function BakeClock() {
    const [active, setActive] = useState(0);
    const selectedMenu = times[active].ids.flatMap(id => menu.filter(item => item.id === id));
    return <div className="bake-clock">
        <div className="clock-tabs" role="group" aria-label={copy["n131"]}>
            {times.map((time, index) => <button key={time.time} aria-pressed={active === index} onClick={() => setActive(index)}>
                <span>{time.time}</span><small>{index === 0 ? 'MORNING' : index === 1 ? 'MIDDAY' : 'AFTERNOON'}</small>
            </button>)}
        </div>
        <div className="clock-content" aria-live="polite">
            <h3>{times[active].title}</h3>
            <div className="clock-menu" key={times[active].time}>
                {selectedMenu.map(item => <figure key={item.id}>
                    <div className="clock-menu-photo"><Picture name={item.id} alt={item.name} sizes="(max-width: 700px) 28vw, 18vw"/></div>
                    <figcaption>{item.name}</figcaption>
                </figure>)}
            </div>
            <span className="fineprint">{copy["n132"]}</span>
        </div>
    </div>;
}
export function PairMaker() { const breads = menu.filter(m => m.category !== 'drink'), drinks = menu.filter(m => m.category === 'drink'); const [bread, setBread] = useState(breads[0].id), [drink, setDrink] = useState(drinks[0].id), [status, setStatus] = useState(''); const b = menu.find(m => m.id === bread)!, d = menu.find(m => m.id === drink)!; const note = `오븐노트38 / 오늘의 조합\n${b.name} ${money(b.price)}\n${d.name} ${money(d.price)}\n합계 ${money(b.price + d.price)} (부가세 포함 예시)\n가상 메뉴 메모이며 실제 주문이 아닙니다.`; return <div className="pair-grid"><div><span className="eyebrow">{copy["n133"]}</span><h2>{copy["n134"]}<br />{copy["n135"]}</h2><p>{copy["n136"]}</p><label>{copy["n137"]}<select value={bread} onChange={e => { setBread(e.target.value); setStatus(''); }}>{breads.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</select></label><label>{copy["n138"]}<select value={drink} onChange={e => { setDrink(e.target.value); setStatus(''); }}>{drinks.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</select></label></div><div className="receipt"><div className="receipt-brand">{copy["n32"]}<sup>38</sup></div><p>{copy["n139"]}</p><div className="receipt-row"><span>{b.name}</span><span>{money(b.price)}</span></div><div className="receipt-row"><span>{d.name}</span><span>{money(d.price)}</span></div><div className="receipt-row receipt-total"><strong>{copy["n140"]}</strong><strong>{money(b.price + d.price)}</strong></div><p className="fineprint">{copy["n141"]}</p><button className="button blue" onClick={async () => { try {
    await navigator.clipboard.writeText(note);
    setStatus(copy["n142"]);
}
catch {
    setStatus(copy["n143"]);
} }}>{copy["n144"]}</button><p className="copy-status" role="status">{status}</p>{status.startsWith(copy["n145"]) && <textarea readOnly aria-label={copy["n146"]} value={note}/>}<div className="receipt-end">{copy["n147"]}</div></div></div>; }
