# Editorial image assets

Built-in image generation was used. These are fictional decorative clippings, not collected real articles or tax advice. Final assets: `public/images/editorial/*.webp` (1536 × 1024).

## Shared generation prompt

Use case: stylized-concept. Asset type: decorative website newspaper collage background. Create ONE wide landscape image, 1536x1024. A flat top-down archival scrapbook of ONLY fictional Korean TAX/ACCOUNTING newspaper clippings arranged with slight overlaps and restrained torn edges. Almanac editorial aesthetic. Warm cream newsprint matching #f4efe4, muted black ink #1d1b18, tiny vermilion #c2361f editorial pencil marks, entirely low saturation. Realistic subtle paper fibers, fine letterpress columns, grayscale halftone engraved illustrations, no glossy modern photos, no busy dark patches. Composition: clippings cluster at RIGHT third and outer bottom edges; LEFT two thirds mostly quiet pale blank paper with just faint ghosted columns, so large live website text stays readable. Print is fictional typographic texture, not readable real news or legal advice: no identifiable publication names, logos, dates, tax rates, claims, people names, or watermarks. Image should look like curated clippings on paper, not a website screenshot. No large headline competing with live heading.

## Subject prompts and usage

- **hero.webp**: General tax and accounting newspaper clippings: bookkeeping, tax filings, property taxation, small grayscale calculator and ledger illustrations.
- **calendar.webp**: Annual tax filing calendar newspaper clippings: monthly calendar grids, filing deadline reminders, neatly ruled tax schedules.
- **business.webp**: Business taxation newspaper clippings: small business bookkeeping, income and VAT filing, corporation accounting, receipts and ledger charts.
- **property.webp**: Property transfer taxation newspaper clippings: apartment facades, property deed line drawings, house sale contract and tax valuation columns.
- **family.webp**: Inheritance and gift taxation newspaper clippings: restrained family asset planning, family-tree diagrams, estate documents and asset distribution charts.
- **dispute.webp**: Tax audit and tax appeal newspaper clippings: documentary evidence files, magnifying-glass line drawings, reviewed ledger rows and procedural columns.
- **cases.webp**: Tax advisory case-study newspaper clippings: anonymized small business case reports, before-and-after ledger columns, analysis tables with no promises or factual numeric claims.
- **about.webp**: Accountant professional philosophy newspaper clippings: explanatory accounting columns, interview editorial layouts, pencil annotations and grayscale desk illustrations.
- **contact.webp**: Tax consultation newspaper clippings: preparing documents for a first consultation, telephone line illustration, appointment notebook and document checklist.

Route-to-image mapping: `src/data/editorial-art.ts`. Home hero uses hero; calendar and income/VAT use calendar; service index, bookkeeping and corporate use business; transfer uses property; inheritance and gift use family; audit and appeal use dispute; cases/about/contact each use their own image.

## Readability

Decorative images have empty alt and are hidden from assistive technology. Live text remains HTML. Paper overlays, opaque lead-copy backing, and darker red heading accents protect reading contrast. Mobile uses a stronger paper wash; images receive no animation. Asset URLs include BASE_PATH.

