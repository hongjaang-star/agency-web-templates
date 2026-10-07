"use client";
// 견적에 담은 품번 목록 (브라우저 localStorage). 서버로 보내지 않는다.
import { useSyncExternalStore } from "react";

const KEY = "serogyeol-quote";
const EVENT = "serogyeol-quote-change";

function read(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

let cache: string[] = [];
let cacheRaw = "";
function snapshot() {
  let raw = "[]";
  try { raw = localStorage.getItem(KEY) || "[]"; } catch {}
  if (raw !== cacheRaw) { cacheRaw = raw; cache = read(); }
  return cache;
}
const empty: string[] = [];

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => { window.removeEventListener(EVENT, cb); window.removeEventListener("storage", cb); };
}

export function useQuote() {
  return useSyncExternalStore(subscribe, snapshot, () => empty);
}

export function toggleQuote(id: string) {
  const list = read();
  const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function clearQuote() {
  try { localStorage.removeItem(KEY); } catch {}
  window.dispatchEvent(new Event(EVENT));
}
