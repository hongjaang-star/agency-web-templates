# 피부과 · lumiere

> 자동 생성 문서(`npm run library`). 참고용 스타일 기록이며, 이 코드를 다른 사이트에 그대로 쓰지 않는다.

- 사용 사이트: `medical-dermatology/lumiere` (뤼미에르 피부과(가상))
- 배포 주소: https://hongjaang-star.github.io/agency-web-templates/medical-dermatology/lumiere/
- 소스: [`templates/medical-dermatology/lumiere`](../../../templates/medical-dermatology/lumiere)

## 디자인 지문

| 항목 | 값 |
|---|---|
| layout | immersive |
| hero | video |
| typePair | Cormorant + Nanum Myeongjo + Pretendard |
| palette | ivory·ink·champagne gold |
| imageTreatment | warm natural photo |
| motion | reveal fade |
| signature | 고민별 시술 찾기 |
| sectionOrder | hero, promise, concerns, treatments, signature, doctors, process, space, equipment, events, faq, visit |

## 디자인 토큰

서체 설정 (`src/app/layout.tsx`)

```ts
import { Cormorant, Nanum_Myeongjo } from "next/font/google";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const nanumMyeongjo = Nanum_Myeongjo({
  variable: "--font-nanum-myeongjo",
  subsets: ["latin"],
  // 사이트에서는 400 굵기만 사용합니다. 굵기를 추가하면 한글 글자 범위별 선언이 90여 개씩 늘어납니다.
  weight: "400",
  display: "swap",
  preload: false,
});
```

<details><summary>globals.css (색·서체 토큰, 공용 유틸리티)</summary>

```css
@import "tailwindcss";
/* Pretendard — self-hosted (was CDN; render-blocking 제거) */
@import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";

/* ─────────────────────────────────────────────
   LUMIÈRE Design Tokens
   White + Champagne Gold / Beige
   ───────────────────────────────────────────── */
@theme {
  /* Surfaces */
  --color-ivory: #faf8f5;      /* page background */
  --color-cream: #f4efe8;      /* alt section */
  --color-sand: #ede6dc;       /* muted fill / placeholder */
  --color-line: #e3dbcf;       /* borders, dividers */

  /* Text */
  --color-ink: #1c1917;        /* primary text, primary button */
  --color-ink-soft: #57534e;   /* secondary text (7:1 on ivory) */
  --color-ink-mute: #716a65;   /* captions only (4.6:1 on cream, 5.0:1 on ivory) */

  /* Brand */
  --color-gold: #b8976a;       /* decorative only: lines, icons, large display */
  --color-gold-deep: #7f6434;  /* gold text/links (5.2:1 on ivory) */
  --color-gold-soft: #d9c7a7;

  /* Type */
  --font-sans: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
  --font-display: var(--font-cormorant), "Times New Roman", serif;
  --font-serif-kr: var(--font-nanum-myeongjo), serif;

  /* Motion */
  --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);

  --animate-fade-up: fade-up 0.9s var(--ease-soft) both;
  /* above-the-fold text: movement only, never invisible (keeps LCP early) */
  --animate-rise: rise 0.9s var(--ease-soft) both;
  @keyframes rise {
    from { transform: translateY(14px); }
    to { transform: translateY(0); }
  }
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
}

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }
  body {
    background: var(--color-ivory);
    color: var(--color-ink);
    font-family: var(--font-sans);
    font-size: 16px;
    line-height: 1.7;
    word-break: keep-all;
    overflow-wrap: break-word;
  }
  ::selection {
    background: var(--color-gold-soft);
    color: var(--color-ink);
  }
  :focus-visible {
    outline: 2px solid var(--color-gold-deep);
    outline-offset: 3px;
    border-radius: 2px;
  }
  h1, h2, h3 {
    text-wrap: balance;
  }
}

/* Scroll reveal — content is visible by default; JS opts into the animation */
.js [data-reveal] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.9s var(--ease-soft), transform 0.9s var(--ease-soft);
  transition-delay: var(--reveal-delay, 0ms);
}
.js [data-reveal][data-visible="true"] {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .js [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Utilities */
@utility container-page {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: 1.25rem;
  @media (width >= 768px) { padding-inline: 2rem; }
  @media (width >= 1280px) { padding-inline: 3rem; }
}

@utility eyebrow {
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-gold-deep);
}
```

</details>

## 모듈

### 상단 공지 띠 `top-banner`

- 종류: `banner` · 사용 사이트: `medical-dermatology/lumiere` · 페이지: `/`
- 소스: [`src/components/TopBanner.tsx`](../../../templates/medical-dermatology/lumiere/src/components/TopBanner.tsx)

| 데스크톱 1440 | 모바일 390 |
|---|---|
| <img src="shots/top-banner-desktop.jpg" width="560"> | <img src="shots/top-banner-mobile.jpg" width="180"> |

<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="code/top-banner.html">code/top-banner.html</a></summary>

```html
<div class="relative bg-ink text-ivory">
  <div class="container-page flex min-h-11 items-center justify-center py-2 pr-12 text-center">
    <a class="group inline-flex items-center gap-2 text-[13px] tracking-wide text-ivory/90 transition-colors hover:text-white md:text-sm">
      <span class="font-display text-base italic text-gold-soft">…</span>
      <span>…</span>
      <svg class="lucide lucide-arrow-right size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" /> <!-- 아이콘: arrow-right -->
    </a>
  </div>
  <button class="absolute right-2 top-1/2 inline-flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center text-ivory/70 transition-colors hover:text-white">
    <svg class="lucide lucide-x size-4" /> <!-- 아이콘: x -->
  </button>
</div>
```

</details>

### 헤더 `header`

- 종류: `header` · 사용 사이트: `medical-dermatology/lumiere` · 페이지: `/`
- 소스: [`src/components/Header.tsx`](../../../templates/medical-dermatology/lumiere/src/components/Header.tsx)

| 데스크톱 1440 | 모바일 390 |
|---|---|
| <img src="shots/header-desktop.jpg" width="560"> | <img src="shots/header-mobile.jpg" width="180"> |

<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="code/header.html">code/header.html</a></summary>

```html
<header class="sticky top-0 z-40" style="">
  <div class="hidden border-b border-line bg-ivory md:block">
    <div class="container-page flex h-10 items-center justify-between text-[13px] text-ink-soft">
      <p>
        …
        <strong class="font-semibold text-ink">…</strong>
      </p>
      <div class="flex items-center gap-6">
        <span class="inline-flex items-center gap-1.5">
          <svg class="lucide lucide-clock size-3.5 text-gold" /> <!-- 아이콘: clock -->
          …
        </span>
        <a class="inline-flex items-center gap-1.5 hover:text-ink">
          <svg class="lucide lucide-phone size-3.5 text-gold" /> <!-- 아이콘: phone -->
          …
        </a>
      </div>
    </div>
  </div>
  <div class="border-b bg-white/95 backdrop-blur-md transition-shadow duration-300 border-transparent">
    <div class="container-page flex h-[72px] items-center justify-between gap-6 md:h-20">
      <a class="group inline-flex flex-col leading-none">
        <span class="font-display text-[1.7rem] font-medium tracking-[0.18em] text-ink">…</span>
        <span class="mt-1 text-[10px] font-medium tracking-[0.42em] text-gold-deep">…</span>
        <span class="sr-only">
          …
          …
        </span>
      </a>
      <nav class="hidden lg:block">
        <ul class="flex items-center gap-1">
          <li>
            <a class="relative inline-flex h-11 items-center px-4 text-[15px] font-medium transition-colors duration-300 after:absolute after:bottom-1.5 after:left-4 after:right-4 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-300 text-ink-soft hover:text-ink after:scale-x-0 hover:after:scale-x-100">…</a>
          </li>
          <!-- ↑ 같은 구조 2개 반복 -->
          <li class="relative">
            <div class="flex items-center">
              <a class="relative inline-flex h-11 items-center px-4 text-[15px] font-medium transition-colors duration-300 after:absolute after:bottom-1.5 after:left-4 after:right-4 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-300 text-ink-soft hover:text-ink after:scale-x-0 hover:after:scale-x-100">…</a>
              <button class="-ml-3 inline-flex size-8 cursor-pointer items-center justify-center text-ink-soft hover:text-ink">
                <svg class="lucide lucide-chevron-down size-4 transition-transform duration-300" /> <!-- 아이콘: chevron-down -->
              </button>
            </div>
            <div class="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3 transition-all duration-300 invisible -translate-y-1 opacity-0">
              <div class="grid grid-cols-2 gap-8 border border-line bg-white p-8 shadow-[0_24px_60px_-30px_rgba(28,25,23,0.35)]">
                <div>
                  <p class="eyebrow !text-xs">…</p>
                  <p class="mt-1 font-serif-kr text-lg text-ink">…</p>
                  <ul class="mt-4 space-y-1 border-t border-line pt-4">
                    <li>
                      <a class="block py-1.5 text-[15px] text-ink-soft transition-colors hover:text-gold-deep">…</a>
                    </li>
                    <!-- ↑ 같은 구조 4개 반복 -->
                  </ul>
                </div>
                <!-- ↑ 같은 구조 2개 반복 -->
              </div>
            </div>
          </li>
          <li>
            <a class="relative inline-flex h-11 items-center px-4 text-[15px] font-medium transition-colors duration-300 after:absolute after:bottom-1.5 after:left-4 after:right-4 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-300 text-ink-soft hover:text-ink after:scale-x-0 hover:after:scale-x-100">…</a>
          </li>
          <!-- ↑ 같은 구조 3개 반복 -->
        </ul>
      </nav>
      <div class="flex items-center gap-2">
        <a class="hidden h-11 items-center bg-ink px-6 text-sm font-medium tracking-wide text-ivory transition-colors duration-300 hover:bg-gold-deep sm:inline-flex">…</a>
        <button class="inline-flex size-11 cursor-pointer items-center justify-center text-ink lg:hidden">
          <svg class="lucide lucide-menu size-6" /> <!-- 아이콘: menu -->
        </button>
      </div>
    </div>
  </div>
  <div class="fixed inset-0 z-50 lg:hidden invisible" style="">
    <div class="absolute inset-0 bg-ink/40 transition-opacity duration-300 opacity-0"></div>
    <div class="absolute right-0 top-0 flex h-dvh w-[88%] max-w-sm flex-col bg-ivory transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] translate-x-full">
      <div class="flex h-[72px] items-center justify-between border-b border-line px-5">
        <a class="group inline-flex flex-col leading-none">
          <span class="font-display text-[1.7rem] font-medium tracking-[0.18em] text-ink">…</span>
          <span class="mt-1 text-[10px] font-medium tracking-[0.42em] text-gold-deep">…</span>
          <span class="sr-only">
            …
            …
          </span>
        </a>
        <button class="inline-flex size-11 cursor-pointer items-center justify-center">
          <svg class="lucide lucide-x size-6" /> <!-- 아이콘: x -->
        </button>
      </div>
      <nav class="flex-1 overflow-y-auto px-5 py-4">
        <ul>
          <li class="border-b border-line">
            <a class="flex items-center justify-between py-4 text-[17px] font-medium ">
              …
              <span class="font-display text-sm tracking-widest text-ink-mute">…</span>
            </a>
          </li>
          <!-- ↑ 같은 구조 6개 반복 -->
        </ul>
      </nav>
      <div class="space-y-2 border-t border-line p-5">
        <a class="flex h-12 items-center justify-center bg-ink text-[15px] font-medium text-ivory">…</a>
        <a class="flex h-12 items-center justify-center gap-2 border border-line text-[15px]">
          <svg class="lucide lucide-phone size-4 text-gold" /> <!-- 아이콘: phone -->
          …
        </a>
      </div>
    </div>
  </div>
</header>
```

</details>

### 히어로 `home-hero`

- 종류: `hero` · 사용 사이트: `medical-dermatology/lumiere` · 페이지: `/`
- 소스: [`src/components/blocks/Hero.tsx`](../../../templates/medical-dermatology/lumiere/src/components/blocks/Hero.tsx)

| 데스크톱 1440 | 모바일 390 |
|---|---|
| <img src="shots/home-hero-desktop.jpg" width="560"> | <img src="shots/home-hero-mobile.jpg" width="180"> |

<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="code/home-hero.html">code/home-hero.html</a></summary>

```html
<section class="relative isolate overflow-hidden bg-ivory">
  <video class="-z-20 object-cover absolute inset-x-0 top-0 h-[68svh] w-full object-[60%_center] lg:inset-y-0 lg:h-full lg:object-center" src="…" />
  <button class="absolute right-4 top-4 z-10 inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink backdrop-blur transition-colors hover:bg-white md:right-6 lg:bottom-8 lg:right-8 lg:top-auto">
    <svg class="lucide lucide-play size-4 translate-x-px" /> <!-- 아이콘: play -->
  </button>
  <div class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[68svh] bg-linear-to-t from-ivory from-0% via-ivory/50 via-25% to-ivory/0 to-55% lg:hidden"></div>
  <div class="pointer-events-none absolute inset-0 -z-10 hidden bg-linear-to-r from-ivory/95 from-0% via-ivory/75 via-30% to-ivory/0 to-60% lg:block"></div>
  <div class="container-page flex flex-col pb-16 pt-[54svh] lg:min-h-[calc(100svh-164px)] lg:justify-center lg:py-24">
    <div class="max-w-xl lg:max-w-[500px]">
      <p class="eyebrow animate-fade-up">…</p>
      <h1 class="mt-5 animate-rise font-serif-kr text-[2.35rem] leading-[1.35] text-ink sm:text-5xl sm:leading-[1.3] xl:text-[3.5rem]" style="animation-delay:100ms">
        …
        <br />
        …
        <em class="not-italic text-gold-deep">…</em>
        …
      </h1>
      <p class="mt-6 max-w-md animate-rise text-ink-soft md:text-[17px]" style="animation-delay:200ms">
        …
        <br class="hidden sm:block" />
        …
      </p>
      <div class="mt-9 flex animate-fade-up flex-wrap gap-3" style="animation-delay:300ms">
        <a class="group inline-flex h-12 items-center justify-center gap-3 px-7 text-[15px] font-medium tracking-wide transition-colors duration-300 bg-ink text-ivory hover:bg-gold-deep ">
          …
          <svg class="lucide lucide-arrow-right size-4 transition-transform duration-300 group-hover:translate-x-1" /> <!-- 아이콘: arrow-right -->
        </a>
        <a class="group inline-flex h-12 items-center justify-center gap-3 px-7 text-[15px] font-medium tracking-wide transition-colors duration-300 border border-ink/80 text-ink hover:bg-ink hover:text-ivory bg-white/60 backdrop-blur-sm">
          …
          <svg class="lucide lucide-arrow-right size-4 transition-transform duration-300 group-hover:translate-x-1" /> <!-- 아이콘: arrow-right -->
        </a>
      </div>
      <dl class="mt-12 grid max-w-md animate-fade-up grid-cols-3 border-t border-ink/15 pt-6" style="animation-delay:400ms">
        <div>
          <dt class="sr-only">…</dt>
          <dd class="font-display text-3xl text-ink">…</dd>
          <dd class="mt-1 text-[13px] text-ink-soft">…</dd>
        </div>
        <!-- ↑ 같은 구조 3개 반복 -->
      </dl>
    </div>
  </div>
</section>
```

</details>

### 약속·소개 `home-promise`

- 종류: `intro` · 사용 사이트: `medical-dermatology/lumiere` · 페이지: `/`
- 소스: [`src/components/blocks/PromiseSection.tsx`](../../../templates/medical-dermatology/lumiere/src/components/blocks/PromiseSection.tsx)

| 데스크톱 1440 | 모바일 390 |
|---|---|
| <img src="shots/home-promise-desktop.jpg" width="560"> | <img src="shots/home-promise-mobile.jpg" width="180"> |

<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="code/home-promise.html">code/home-promise.html</a></summary>

```html
<section class="bg-white py-24 md:py-32">
  <div class="container-page grid gap-16 lg:grid-cols-12">
    <div class="lg:col-span-5">
      <div data-reveal="true" class=" max-w-2xl ">
        <p class="eyebrow">…</p>
        <h2 class="mt-4 font-serif-kr text-[1.75rem] leading-snug text-ink md:text-4xl md:leading-snug">
          …
          <br />
          …
        </h2>
        <p class="mt-5 text-ink-soft md:text-[17px]">…</p>
      </div>
      <div data-reveal="true" class="relative mt-12 aspect-[4/3] overflow-hidden">
        <img class="object-cover" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" src="…" />
      </div>
    </div>
    <ol class="lg:col-span-6 lg:col-start-7 lg:pt-8">
      <li data-reveal="true" style="--reveal-delay:0ms" class="grid grid-cols-[auto_1fr] gap-6 border-t border-line py-10 last:border-b md:gap-10">
        <span class="font-display text-5xl leading-none text-gold">…</span>
        <div>
          <p class="font-display text-sm tracking-[0.25em] text-ink-mute uppercase">…</p>
          <h3 class="mt-2 font-serif-kr text-2xl text-ink">…</h3>
          <p class="mt-3 text-ink-soft">…</p>
        </div>
      </li>
      <!-- ↑ 같은 구조 3개 반복 -->
    </ol>
  </div>
</section>
```

</details>

### 고민별 찾기 `home-concerns`

- 종류: `finder` · 사용 사이트: `medical-dermatology/lumiere` · 페이지: `/`
- 소스: [`src/components/blocks/Concerns.tsx`](../../../templates/medical-dermatology/lumiere/src/components/blocks/Concerns.tsx)

| 데스크톱 1440 | 모바일 390 |
|---|---|
| <img src="shots/home-concerns-desktop.jpg" width="560"> | <img src="shots/home-concerns-mobile.jpg" width="180"> |

<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="code/home-concerns.html">code/home-concerns.html</a></summary>

```html
<section class="border-y border-line bg-cream py-24 md:py-32">
  <div class="container-page">
    <div data-reveal="true" class="mx-auto text-center max-w-2xl ">
      <p class="eyebrow">…</p>
      <h2 class="mt-4 font-serif-kr text-[1.75rem] leading-snug text-ink md:text-4xl md:leading-snug">…</h2>
      <p class="mt-5 text-ink-soft md:text-[17px]">…</p>
    </div>
    <ul class="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-3">
      <li data-reveal="true" style="--reveal-delay:0ms">
        <a class="group block">
          <div class="relative aspect-[4/5] overflow-hidden">
            <img class="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" src="…" />
          </div>
          <div class="mt-5 flex items-start justify-between gap-3">
            <div>
              <h3 class="text-lg font-semibold text-ink transition-colors group-hover:text-gold-deep md:text-xl">…</h3>
              <p class="mt-1 text-[14px] text-ink-soft md:text-[15px]">…</p>
            </div>
            <svg class="lucide lucide-arrow-up-right mt-1 size-5 shrink-0 text-ink-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" /> <!-- 아이콘: arrow-up-right -->
          </div>
        </a>
      </li>
      <!-- ↑ 같은 구조 6개 반복 -->
    </ul>
  </div>
</section>
```

</details>

### 시술 목록 `home-treatments`

- 종류: `services` · 사용 사이트: `medical-dermatology/lumiere` · 페이지: `/`
- 소스: [`src/components/blocks/Treatments.tsx`](../../../templates/medical-dermatology/lumiere/src/components/blocks/Treatments.tsx)

| 데스크톱 1440 | 모바일 390 |
|---|---|
| <img src="shots/home-treatments-desktop.jpg" width="560"> | <img src="shots/home-treatments-mobile.jpg" width="180"> |

<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="code/home-treatments.html">code/home-treatments.html</a></summary>

```html
<section class="bg-ivory py-24 md:py-32">
  <div class="container-page">
    <div class="flex flex-wrap items-end justify-between gap-8">
      <div data-reveal="true" class=" max-w-2xl ">
        <p class="eyebrow">…</p>
        <h2 class="mt-4 font-serif-kr text-[1.75rem] leading-snug text-ink md:text-4xl md:leading-snug">…</h2>
        <p class="mt-5 text-ink-soft md:text-[17px]">…</p>
      </div>
      <div data-reveal="true">
        <a class="group inline-flex items-center gap-2 border-b border-gold pb-1 text-[15px] font-medium text-ink transition-colors hover:text-gold-deep">
          …
          <svg class="lucide lucide-arrow-right size-4 transition-transform duration-300 group-hover:translate-x-1" /> <!-- 아이콘: arrow-right -->
        </a>
      </div>
    </div>
    <div class="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div data-reveal="true">
        <div class="flex items-baseline justify-between border-b border-ink pb-4">
          <h3 class="font-serif-kr text-xl text-ink">…</h3>
          <span class="font-display text-lg italic text-gold-deep">…</span>
        </div>
        <ul>
          <li class="border-b border-line">
            <a class="group grid grid-cols-[1fr_auto] items-center gap-4 py-6 transition-colors">
              <div>
                <p class="flex flex-wrap items-baseline gap-x-3">
                  <span class="text-lg font-semibold text-ink transition-colors group-hover:text-gold-deep">…</span>
                  <span class="font-display text-[15px] tracking-wide text-ink-mute">…</span>
                </p>
                <p class="mt-1 text-[15px] text-ink-soft">…</p>
              </div>
              <span class="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink-soft transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-ivory">
                <svg class="lucide lucide-arrow-up-right size-4" /> <!-- 아이콘: arrow-up-right -->
              </span>
            </a>
          </li>
          <!-- ↑ 같은 구조 4개 반복 -->
        </ul>
      </div>
      <!-- ↑ 같은 구조 2개 반복 -->
    </div>
  </div>
</section>
```

</details>

### 시그니처 `home-signature`

- 종류: `signature` · 사용 사이트: `medical-dermatology/lumiere` · 페이지: `/`
- 소스: [`src/components/blocks/Signature.tsx`](../../../templates/medical-dermatology/lumiere/src/components/blocks/Signature.tsx)

| 데스크톱 1440 | 모바일 390 |
|---|---|
| <img src="shots/home-signature-desktop.jpg" width="560"> | <img src="shots/home-signature-mobile.jpg" width="180"> |

<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="code/home-signature.html">code/home-signature.html</a></summary>

```html
<section class="relative bg-ink text-ivory">
  <div class="grid lg:grid-cols-2">
    <div class="relative min-h-[360px] lg:min-h-[640px]">
      <img class="object-cover" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" src="…" />
    </div>
    <div class="flex items-center px-5 py-20 md:px-16 lg:py-24 xl:px-24">
      <div data-reveal="true" class="max-w-lg">
        <p class="eyebrow !text-gold-soft">…</p>
        <h2 class="mt-5 font-serif-kr text-3xl leading-snug md:text-4xl md:leading-snug">
          …
          <br />
          …
        </h2>
        <p class="mt-6 text-ivory/75 md:text-[17px]">…</p>
        <ul class="mt-8 space-y-3 border-t border-white/15 pt-8 text-[15px] text-ivory/85">
          <li class="flex items-center gap-3">
            <span class="h-px w-5 bg-gold"></span>
            …
          </li>
          <!-- ↑ 같은 구조 3개 반복 -->
        </ul>
        <div class="mt-10">
          <a class="group inline-flex h-12 items-center justify-center gap-3 px-7 text-[15px] font-medium tracking-wide transition-colors duration-300 bg-ivory text-ink hover:bg-gold-soft ">
            …
            <svg class="lucide lucide-arrow-right size-4 transition-transform duration-300 group-hover:translate-x-1" /> <!-- 아이콘: arrow-right -->
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

</details>

### 의료진 `home-doctors`

- 종류: `team` · 사용 사이트: `medical-dermatology/lumiere` · 페이지: `/`
- 소스: [`src/components/blocks/Doctors.tsx`](../../../templates/medical-dermatology/lumiere/src/components/blocks/Doctors.tsx)

| 데스크톱 1440 | 모바일 390 |
|---|---|
| <img src="shots/home-doctors-desktop.jpg" width="560"> | <img src="shots/home-doctors-mobile.jpg" width="180"> |

<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="code/home-doctors.html">code/home-doctors.html</a></summary>

```html
<section class="bg-white py-24 md:py-32">
  <div class="container-page">
    <div data-reveal="true" class="mx-auto text-center max-w-2xl ">
      <p class="eyebrow">…</p>
      <h2 class="mt-4 font-serif-kr text-[1.75rem] leading-snug text-ink md:text-4xl md:leading-snug">…</h2>
      <p class="mt-5 text-ink-soft md:text-[17px]">…</p>
    </div>
    <ul class="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      <li data-reveal="true" style="--reveal-delay:0ms" class="group">
        <div class="relative aspect-[3/4] overflow-hidden rounded-t-full">
          <img class="object-cover" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" src="…" />
        </div>
        <div class="mt-6 text-center">
          <p class="text-[13px] tracking-wider text-gold-deep">…</p>
          <p class="mt-2 font-serif-kr text-2xl text-ink">
            …
            <span class="text-base text-ink-soft">…</span>
          </p>
          <p class="mt-1 text-sm text-ink-mute">…</p>
        </div>
      </li>
      <!-- ↑ 같은 구조 3개 반복 -->
    </ul>
    <div data-reveal="true" class="mt-14 text-center">
      <a class="group inline-flex items-center gap-2 border-b border-gold pb-1 text-[15px] font-medium text-ink transition-colors hover:text-gold-deep">
        …
        <svg class="lucide lucide-arrow-right size-4 transition-transform duration-300 group-hover:translate-x-1" /> <!-- 아이콘: arrow-right -->
      </a>
    </div>
  </div>
</section>
```

</details>

### 진행 절차 `home-process`

- 종류: `process` · 사용 사이트: `medical-dermatology/lumiere` · 페이지: `/`
- 소스: [`src/components/blocks/Process.tsx`](../../../templates/medical-dermatology/lumiere/src/components/blocks/Process.tsx)

| 데스크톱 1440 | 모바일 390 |
|---|---|
| <img src="shots/home-process-desktop.jpg" width="560"> | <img src="shots/home-process-mobile.jpg" width="180"> |

<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="code/home-process.html">code/home-process.html</a></summary>

```html
<section class="bg-ivory py-24 md:py-32">
  <div class="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
    <div class="lg:col-span-5">
      <div data-reveal="true" class=" max-w-2xl ">
        <p class="eyebrow">…</p>
        <h2 class="mt-4 font-serif-kr text-[1.75rem] leading-snug text-ink md:text-4xl md:leading-snug">
          …
          <br />
          …
        </h2>
        <p class="mt-5 text-ink-soft md:text-[17px]">…</p>
      </div>
      <div data-reveal="true" class="relative mt-10 aspect-[4/3] overflow-hidden">
        <img class="object-cover" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" src="…" />
      </div>
    </div>
    <div class="lg:col-span-7 lg:pt-4">
      <ol>
        <li data-reveal="true" style="--reveal-delay:0ms" class="relative grid grid-cols-[auto_1fr] gap-6 pb-12 last:pb-0 md:gap-10">
          <span class="absolute bottom-0 left-[27px] top-14 w-px bg-line"></span>
          <span class="relative flex size-14 items-center justify-center rounded-full border border-gold bg-ivory font-display text-xl text-gold-deep">…</span>
          <div class="pt-2">
            <p class="font-display text-sm tracking-[0.25em] text-ink-mute uppercase">…</p>
            <h3 class="mt-1 text-xl font-semibold text-ink">…</h3>
            <p class="mt-2 text-ink-soft">…</p>
          </div>
        </li>
        <!-- ↑ 같은 구조 4개 반복 -->
      </ol>
      <div data-reveal="true" class="mt-12 pl-20 md:pl-24">
        <a class="group inline-flex h-12 items-center justify-center gap-3 px-7 text-[15px] font-medium tracking-wide transition-colors duration-300 bg-ink text-ivory hover:bg-gold-deep ">
          …
          <svg class="lucide lucide-arrow-right size-4 transition-transform duration-300 group-hover:translate-x-1" /> <!-- 아이콘: arrow-right -->
        </a>
      </div>
    </div>
  </div>
</section>
```

</details>

### 공간 갤러리 `home-space`

- 종류: `gallery` · 사용 사이트: `medical-dermatology/lumiere` · 페이지: `/`
- 소스: [`src/components/blocks/Space.tsx`](../../../templates/medical-dermatology/lumiere/src/components/blocks/Space.tsx)

| 데스크톱 1440 | 모바일 390 |
|---|---|
| <img src="shots/home-space-desktop.jpg" width="560"> | <img src="shots/home-space-mobile.jpg" width="180"> |

<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="code/home-space.html">code/home-space.html</a></summary>

```html
<section class="bg-white py-24 md:py-32">
  <div class="container-page">
    <div class="flex flex-wrap items-end justify-between gap-8">
      <div data-reveal="true" class=" max-w-2xl ">
        <p class="eyebrow">…</p>
        <h2 class="mt-4 font-serif-kr text-[1.75rem] leading-snug text-ink md:text-4xl md:leading-snug">…</h2>
        <p class="mt-5 text-ink-soft md:text-[17px]">…</p>
      </div>
      <div data-reveal="true">
        <a class="group inline-flex items-center gap-2 border-b border-gold pb-1 text-[15px] font-medium text-ink transition-colors hover:text-gold-deep">
          …
          <svg class="lucide lucide-arrow-right size-4 transition-transform duration-300 group-hover:translate-x-1" /> <!-- 아이콘: arrow-right -->
        </a>
      </div>
    </div>
    <div class="mt-14 grid gap-x-5 gap-y-8 md:grid-cols-3">
      <figure data-reveal="true" class="md:col-span-2 md:row-span-2">
        <div class="relative aspect-square overflow-hidden">
          <img class="object-cover" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" src="…" />
        </div>
        <figcaption class="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[15px]">
          <span class="font-semibold text-ink">…</span>
          <span class="text-ink-soft">…</span>
        </figcaption>
      </figure>
      <figure data-reveal="true" style="--reveal-delay:90ms">
        <div class="relative aspect-square overflow-hidden">
          <img class="object-cover" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" src="…" />
        </div>
        <figcaption class="mt-3 text-[15px] font-semibold text-ink">…</figcaption>
      </figure>
      <!-- ↑ 같은 구조 2개 반복 -->
    </div>
  </div>
</section>
```

</details>

### 장비 스트립 `home-equipment`

- 종류: `gallery` · 사용 사이트: `medical-dermatology/lumiere` · 페이지: `/`
- 소스: [`src/components/blocks/EquipmentStrip.tsx`](../../../templates/medical-dermatology/lumiere/src/components/blocks/EquipmentStrip.tsx)

| 데스크톱 1440 | 모바일 390 |
|---|---|
| <img src="shots/home-equipment-desktop.jpg" width="560"> | <img src="shots/home-equipment-mobile.jpg" width="180"> |

<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="code/home-equipment.html">code/home-equipment.html</a></summary>

```html
<section class="border-y border-line bg-cream py-20 md:py-24">
  <div class="container-page grid gap-12 lg:grid-cols-12 lg:items-center">
    <div class="lg:col-span-4">
      <div data-reveal="true" class=" max-w-2xl ">
        <p class="eyebrow">…</p>
        <h2 class="mt-4 font-serif-kr text-[1.75rem] leading-snug text-ink md:text-4xl md:leading-snug">…</h2>
        <p class="mt-5 text-ink-soft md:text-[17px]">…</p>
      </div>
      <div data-reveal="true" class="mt-8">
        <a class="group inline-flex items-center gap-2 border-b border-gold pb-1 text-[15px] font-medium text-ink transition-colors hover:text-gold-deep">
          …
          <svg class="lucide lucide-arrow-right size-4 transition-transform duration-300 group-hover:translate-x-1" /> <!-- 아이콘: arrow-right -->
        </a>
      </div>
    </div>
    <ul data-reveal="true" class="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4">
      <li class="border-b border-r border-line bg-ivory/60 px-5 py-6">
        <p class="font-display text-lg leading-tight text-ink">…</p>
        <p class="mt-1 text-[13px] text-ink-mute">…</p>
      </li>
      <!-- ↑ 같은 구조 8개 반복 -->
    </ul>
  </div>
</section>
```

</details>

### 이벤트 `home-events`

- 종류: `promo` · 사용 사이트: `medical-dermatology/lumiere` · 페이지: `/`
- 소스: [`src/components/blocks/Events.tsx`](../../../templates/medical-dermatology/lumiere/src/components/blocks/Events.tsx)

| 데스크톱 1440 | 모바일 390 |
|---|---|
| <img src="shots/home-events-desktop.jpg" width="560"> | <img src="shots/home-events-mobile.jpg" width="180"> |

<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="code/home-events.html">code/home-events.html</a></summary>

```html
<section class="bg-ivory py-24 md:py-32">
  <div class="container-page">
    <div class="flex flex-wrap items-end justify-between gap-8">
      <div data-reveal="true" class=" max-w-2xl ">
        <p class="eyebrow">…</p>
        <h2 class="mt-4 font-serif-kr text-[1.75rem] leading-snug text-ink md:text-4xl md:leading-snug">…</h2>
      </div>
      <div data-reveal="true">
        <a class="group inline-flex items-center gap-2 border-b border-gold pb-1 text-[15px] font-medium text-ink transition-colors hover:text-gold-deep">
          …
          <svg class="lucide lucide-arrow-right size-4 transition-transform duration-300 group-hover:translate-x-1" /> <!-- 아이콘: arrow-right -->
        </a>
      </div>
    </div>
    <ul class="mt-14 grid gap-6 md:grid-cols-3">
      <li data-reveal="true" style="--reveal-delay:0ms">
        <a class="group flex h-full flex-col border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-[0_30px_60px_-35px_rgba(127,100,52,0.45)]">
          <span class="font-display text-lg italic text-gold-deep">…</span>
          <h3 class="mt-4 font-serif-kr text-xl text-ink">…</h3>
          <p class="mt-3 flex-1 text-[15px] text-ink-soft">…</p>
          <p class="mt-8 flex items-center justify-between border-t border-line pt-5 text-[13px] text-ink-mute">
            …
            <svg class="lucide lucide-arrow-up-right size-4 text-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /> <!-- 아이콘: arrow-up-right -->
          </p>
        </a>
      </li>
      <!-- ↑ 같은 구조 3개 반복 -->
    </ul>
  </div>
</section>
```

</details>

### 자주 묻는 질문 `home-faq`

- 종류: `faq` · 사용 사이트: `medical-dermatology/lumiere` · 페이지: `/`
- 소스: [`src/components/blocks/Faq.tsx`](../../../templates/medical-dermatology/lumiere/src/components/blocks/Faq.tsx)

| 데스크톱 1440 | 모바일 390 |
|---|---|
| <img src="shots/home-faq-desktop.jpg" width="560"> | <img src="shots/home-faq-mobile.jpg" width="180"> |

<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="code/home-faq.html">code/home-faq.html</a></summary>

```html
<section class="border-t border-line bg-white py-24 md:py-32">
  <div class="container-page grid gap-12 lg:grid-cols-12">
    <div class="lg:col-span-4">
      <div data-reveal="true" class=" max-w-2xl ">
        <p class="eyebrow">…</p>
        <h2 class="mt-4 font-serif-kr text-[1.75rem] leading-snug text-ink md:text-4xl md:leading-snug">…</h2>
        <p class="mt-5 text-ink-soft md:text-[17px]">…</p>
      </div>
      <div data-reveal="true" class="mt-8">
        <a class="group inline-flex items-center gap-2 border-b border-gold pb-1 text-[15px] font-medium text-ink transition-colors hover:text-gold-deep">
          …
          <svg class="lucide lucide-arrow-right size-4 transition-transform duration-300 group-hover:translate-x-1" /> <!-- 아이콘: arrow-right -->
        </a>
      </div>
    </div>
    <div data-reveal="true" class="border-t border-ink lg:col-span-8">
      <details class="group border-b border-line">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[17px] font-medium text-ink [&::-webkit-details-marker]:hidden">
          <span>
            <span class="mr-3 font-display text-xl text-gold-deep">…</span>
            …
          </span>
          <svg class="lucide lucide-plus size-5 shrink-0 text-ink-soft transition-transform duration-300 group-open:rotate-45" /> <!-- 아이콘: plus -->
        </summary>
        <p class="pb-7 pl-9 text-ink-soft">…</p>
      </details>
      <!-- ↑ 같은 구조 5개 반복 -->
    </div>
  </div>
</section>
```

</details>

### 오시는 길 `home-visit`

- 종류: `visit` · 사용 사이트: `medical-dermatology/lumiere` · 페이지: `/`
- 소스: [`src/components/blocks/Visit.tsx`](../../../templates/medical-dermatology/lumiere/src/components/blocks/Visit.tsx)

| 데스크톱 1440 | 모바일 390 |
|---|---|
| <img src="shots/home-visit-desktop.jpg" width="560"> | <img src="shots/home-visit-mobile.jpg" width="180"> |

<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="code/home-visit.html">code/home-visit.html</a></summary>

```html
<section class="bg-ivory py-24 md:py-32">
  <div class="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
    <div class="relative aspect-[4/3] overflow-hidden lg:col-span-6 lg:aspect-auto">
      <img class="object-cover" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" src="…" />
    </div>
    <div class="lg:col-span-6">
      <div data-reveal="true" class=" max-w-2xl ">
        <p class="eyebrow">…</p>
        <h2 class="mt-4 font-serif-kr text-[1.75rem] leading-snug text-ink md:text-4xl md:leading-snug">…</h2>
      </div>
      <dl data-reveal="true" class="mt-10 divide-y divide-line border-y border-line">
        <div class="flex items-center justify-between py-4">
          <dt class="text-ink-soft">…</dt>
          <dd class="font-medium tabular-nums text-ink">…</dd>
        </div>
        <!-- ↑ 같은 구조 4개 반복 -->
      </dl>
      <div data-reveal="true" class="mt-8 space-y-3 text-[15px] text-ink-soft">
        <p class="flex gap-3">
          <svg class="lucide lucide-map-pin mt-1 size-4 shrink-0 text-gold" /> <!-- 아이콘: map-pin -->
          …
        </p>
        <!-- ↑ 같은 구조 2개 반복 -->
      </div>
      <div data-reveal="true" class="mt-10 flex flex-wrap gap-3">
        <a class="group inline-flex h-12 items-center justify-center gap-3 px-7 text-[15px] font-medium tracking-wide transition-colors duration-300 bg-ink text-ivory hover:bg-gold-deep ">
          …
          <svg class="lucide lucide-arrow-right size-4 transition-transform duration-300 group-hover:translate-x-1" /> <!-- 아이콘: arrow-right -->
        </a>
        <a class="group inline-flex h-12 items-center justify-center gap-3 px-7 text-[15px] font-medium tracking-wide transition-colors duration-300 border border-ink/80 text-ink hover:bg-ink hover:text-ivory ">
          …
          <svg class="lucide lucide-arrow-right size-4 transition-transform duration-300 group-hover:translate-x-1" /> <!-- 아이콘: arrow-right -->
        </a>
      </div>
    </div>
  </div>
</section>
```

</details>

### 서브페이지 상단 `page-hero`

- 종류: `page-hero` · 사용 사이트: `medical-dermatology/lumiere` · 페이지: `/about/`
- 소스: [`src/components/ui.tsx#PageHero`](../../../templates/medical-dermatology/lumiere/src/components/ui.tsx) (PageHero)

| 데스크톱 1440 | 모바일 390 |
|---|---|
| <img src="shots/page-hero-desktop.jpg" width="560"> | <img src="shots/page-hero-mobile.jpg" width="180"> |

<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="code/page-hero.html">code/page-hero.html</a></summary>

```html
<section class="relative overflow-hidden border-b border-line bg-cream">
  <span class="pointer-events-none absolute -right-10 bottom-[-0.2em] select-none font-display text-[22vw] leading-none text-white/60 md:text-[14rem]">…</span>
  <div class="container-page relative py-16 md:py-24">
    <script>…</script>
    <nav class="text-[13px] text-ink-soft">
      <ol class="flex flex-wrap items-center gap-2">
        <li>
          <a class="hover:text-ink">…</a>
        </li>
        <li class="flex items-center gap-2">
          <span class="h-px w-3 bg-gold"></span>
          <span class="text-ink">…</span>
        </li>
      </ol>
    </nav>
    <p class="eyebrow mt-10 animate-fade-up">…</p>
    <h1 class="mt-4 animate-rise font-serif-kr text-4xl leading-tight text-ink md:text-5xl" style="animation-delay:80ms">…</h1>
    <p class="mt-5 max-w-xl animate-rise text-ink-soft md:text-[17px]" style="animation-delay:160ms">…</p>
  </div>
</section>
```

</details>

### 상담 유도 띠 `cta-band`

- 종류: `cta` · 사용 사이트: `medical-dermatology/lumiere` · 페이지: `/doctors/`
- 소스: [`src/components/ui.tsx#CtaBand`](../../../templates/medical-dermatology/lumiere/src/components/ui.tsx) (CtaBand)

| 데스크톱 1440 | 모바일 390 |
|---|---|
| <img src="shots/cta-band-desktop.jpg" width="560"> | <img src="shots/cta-band-mobile.jpg" width="180"> |

<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="code/cta-band.html">code/cta-band.html</a></summary>

```html
<section class="border-t border-line bg-cream py-20">
  <div data-reveal="true" class="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
    <div>
      <p class="eyebrow">…</p>
      <p class="mt-3 font-serif-kr text-2xl text-ink md:text-3xl">…</p>
    </div>
    <a class="group inline-flex h-12 items-center justify-center gap-3 px-7 text-[15px] font-medium tracking-wide transition-colors duration-300 bg-ink text-ivory hover:bg-gold-deep ">
      …
      <svg class="lucide lucide-arrow-right size-4 transition-transform duration-300 group-hover:translate-x-1" /> <!-- 아이콘: arrow-right -->
    </a>
  </div>
</section>
```

</details>

### 푸터 `footer`

- 종류: `footer` · 사용 사이트: `medical-dermatology/lumiere` · 페이지: `/`
- 소스: [`src/components/Footer.tsx`](../../../templates/medical-dermatology/lumiere/src/components/Footer.tsx)

| 데스크톱 1440 | 모바일 390 |
|---|---|
| <img src="shots/footer-desktop.jpg" width="560"> | <img src="shots/footer-mobile.jpg" width="180"> |

<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="code/footer.html">code/footer.html</a></summary>

```html
<footer class="bg-ink pb-24 text-ivory/70 lg:pb-0">
  <div class="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
    <div class="md:col-span-4">
      <a class="group inline-flex flex-col leading-none">
        <span class="font-display text-[1.7rem] font-medium tracking-[0.18em] text-ivory">…</span>
        <span class="mt-1 text-[10px] font-medium tracking-[0.42em] text-gold-soft">…</span>
        <span class="sr-only">
          …
          …
        </span>
      </a>
      <p class="mt-6 max-w-xs text-sm leading-relaxed">
        …
        <br />
        …
      </p>
    </div>
    <div class="md:col-span-3">
      <h2 class="eyebrow !text-gold-soft">…</h2>
      <ul class="mt-5 grid grid-cols-2 gap-y-2.5 text-sm">
        <li>
          <a class="transition-colors hover:text-white">…</a>
        </li>
        <!-- ↑ 같은 구조 7개 반복 -->
      </ul>
    </div>
    <div class="md:col-span-5">
      <h2 class="eyebrow !text-gold-soft">…</h2>
      <dl class="mt-5 space-y-2 text-sm">
        <div class="flex gap-6">
          <dt class="w-28 shrink-0 text-ivory/50">…</dt>
          <dd class="text-ivory/85">…</dd>
        </div>
        <!-- ↑ 같은 구조 4개 반복 -->
      </dl>
      <a class="mt-6 inline-block font-display text-3xl tracking-wider text-ivory transition-colors hover:text-gold-soft">…</a>
    </div>
  </div>
  <div class="border-t border-white/10">
    <div class="container-page space-y-4 py-8 text-xs leading-relaxed text-ivory/50">
      <p>…</p>
      <p class="text-ivory/80">…</p>
      <p>
        …
        …
        …
        …
        …
        <br class="sm:hidden" />
        <span class="hidden sm:inline">…</span>
        …
      </p>
      <!-- ↑ 같은 구조 2개 반복 -->
    </div>
  </div>
</footer>
```

</details>

### 고정 상담 버튼 `floating-contact`

- 종류: `floating` · 사용 사이트: `medical-dermatology/lumiere` · 페이지: `/`
- 소스: [`src/components/FloatingContact.tsx`](../../../templates/medical-dermatology/lumiere/src/components/FloatingContact.tsx)

| 데스크톱 1440 | 모바일 390 |
|---|---|
| <img src="shots/floating-contact-desktop.jpg" width="560"> | <img src="shots/floating-contact-mobile.jpg" width="180"> |

<details><summary>스타일 코드 (마크업 구조 + 클래스, 문구는 …) · <a href="code/floating-contact.html">code/floating-contact.html</a></summary>

```html
<aside class="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col border border-line bg-white/95 shadow-[0_20px_50px_-25px_rgba(28,25,23,0.35)] backdrop-blur lg:flex" style="">
  <a class="group flex w-[76px] flex-col items-center gap-1.5 border-b border-line px-2 py-4 text-[11px] font-medium text-ink-soft transition-colors last:border-b-0 hover:bg-cream hover:text-ink">
    <svg class="lucide lucide-message-circle size-5 text-gold transition-colors group-hover:text-gold-deep" /> <!-- 아이콘: message-circle -->
    …
    <span class="sr-only">…</span>
  </a>
  <!-- ↑ 같은 구조 3개 반복 -->
  <button class="flex h-12 cursor-pointer items-center justify-center bg-ink text-ivory transition-opacity duration-300 hover:bg-gold-deep pointer-events-none opacity-0">
    <svg class="lucide lucide-arrow-up size-4" /> <!-- 아이콘: arrow-up -->
  </button>
</aside>
```

</details>
