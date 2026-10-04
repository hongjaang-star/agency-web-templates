const PAGES = ["home","about","portfolio","price","faq","magazine","contact"];

function showPage(key){
  if(!PAGES.includes(key)) key = "home";
  PAGES.forEach((p) => {
    const el = document.getElementById("page-" + p);
    if(el) el.style.display = (p === key) ? "block" : "none";
  });
  window.scrollTo({top:0, behavior:"instant"});
}

function goTo(key){
  showPage(key);
  if(location.hash !== "#" + key) location.hash = key;
}

// 내부 이동은 href 없이 data-nav로만 처리 (미리보기 창의 "외부링크" 확인창 자체를 발생시키지 않음)
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-nav]");
  if(!a) return;
  e.preventDefault();
  const key = a.getAttribute("data-nav");
  if(PAGES.includes(key)){
    goTo(key);
  } else {
    const target = document.getElementById(key);
    if(target) target.scrollIntoView({behavior:"smooth", block:"start"});
  }
  const headerEl = document.querySelector("header");
  if(headerEl) headerEl.classList.remove("nav-open");
  document.querySelector(".menu-toggle")?.setAttribute("aria-expanded", "false");
});

function currentPage(){
  const key = location.hash.slice(1);
  return PAGES.includes(key) ? key : "home";
}
window.addEventListener("hashchange", () => showPage(currentPage()));
showPage(currentPage());

// 메뉴 토글
const headerEl = document.querySelector("header");
const menuToggle = document.querySelector(".menu-toggle");
if (menuToggle && headerEl) {
  menuToggle.addEventListener("click", () => {
    const isOpen = headerEl.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// 스크롤 노출/숨김
const revealEls = document.querySelectorAll(".reveal");
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting));
  }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// 히어로 비주얼에 가벼운 포인터 깊이감 부여
const heroVisual = document.querySelector(".hero-visual");
if (heroVisual && !prefersReduced && window.matchMedia("(hover: hover)").matches) {
  heroVisual.addEventListener("pointermove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 4;
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -4;
    heroVisual.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  heroVisual.addEventListener("pointerleave", () => {
    heroVisual.style.transform = "perspective(900px) rotateX(0) rotateY(0) rotate(1.5deg)";
  });
}
