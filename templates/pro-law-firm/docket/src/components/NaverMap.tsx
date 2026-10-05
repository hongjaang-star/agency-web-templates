"use client";

import { useEffect, useRef, useState } from "react";
import { contactCopy as C, site } from "@/data/site";

type NaverMaps = {
  LatLng: new (lat: number, lng: number) => unknown;
  Map: new (el: HTMLElement, opts: Record<string, unknown>) => unknown;
  Marker: new (opts: Record<string, unknown>) => unknown;
};
declare global {
  interface Window { naver?: { maps: NaverMaps }; navermap_authFailure?: () => void }
}

/**
 * 오시는 길 네이버 지도. site.map.ncpKeyId 가 있으면 NAVER Maps API v3 로 실제 지도를 그리고,
 * 키가 없거나 인증에 실패하면(등록되지 않은 도메인 등) 위치 정보와 네이버 지도 링크 카드를 보여 준다.
 */
export default function NaverMap() {
  const M = site.map;
  const box = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(!M.ncpKeyId);

  useEffect(() => {
    if (!M.ncpKeyId || !box.current) return;
    const el = box.current;
    const draw = () => {
      const maps = window.naver?.maps;
      if (!maps) return setFailed(true);
      const pos = new maps.LatLng(M.lat, M.lng);
      const map = new maps.Map(el, { center: pos, zoom: M.zoom, scaleControl: false, mapDataControl: false });
      new maps.Marker({ position: pos, map, title: M.name });
    };
    window.navermap_authFailure = () => setFailed(true);
    if (window.naver?.maps) return draw();
    const s = document.createElement("script");
    s.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(M.ncpKeyId)}`;
    s.async = true;
    s.onload = draw;
    s.onerror = () => setFailed(true);
    document.head.appendChild(s);
  }, [M]);

  return (
    <figure className="nmap up">
      {failed ? (
        <div key="fallback" className="nmap-fallback" role="img" aria-label={`${M.name} 위치 안내`}>
          <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true"><path d="M12 2.5a7 7 0 00-7 7c0 5 7 12 7 12s7-7 7-12a7 7 0 00-7-7zm0 9.6a2.6 2.6 0 110-5.2 2.6 2.6 0 010 5.2z" fill="currentColor" /></svg>
          <b>{M.name}</b>
          <span>{M.address}</span>
          {M.ncpKeyId && <small>{C.map.fallback}</small>}
        </div>
      ) : (
        <div key="canvas" ref={box} className="nmap-canvas" aria-label={`${C.map.title} · ${M.name}`} role="region" />
      )}
      <figcaption>
        <span className="lbl">{C.map.label}</span>
        <b>{M.name}</b> · {M.address}
        <span className="note">{C.map.note}</span>
        <a className="btn solid" href={M.naverUrl} target="_blank" rel="noopener noreferrer">{C.map.open}<span className="sr-only">(새 창)</span></a>
      </figcaption>
    </figure>
  );
}
