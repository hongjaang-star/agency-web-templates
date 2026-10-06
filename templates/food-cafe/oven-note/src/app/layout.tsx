import {structuredData} from '../lib/structured-data';
import {copy} from '../data/copy';
import type { Metadata } from 'next';
import Link from '../components/NavLink';
import '@fontsource/fraunces/latin-500.css';
import '@fontsource/fraunces/latin-600.css';
import '@fontsource/ibm-plex-sans-kr/400.css';
import '@fontsource/ibm-plex-sans-kr/600.css';
import { bakery, nav } from '../data/bakery';
import { absolute, basePath } from '../lib/urls';
import './globals.css';
export const metadata: Metadata = { title: { default: copy["n24"], template: copy["n25"] }, description: bakery.intro, robots: { index: false, follow: false }, metadataBase: new URL(absolute('/')), alternates: { canonical: absolute('/') }, openGraph: { title: copy["n26"], description: bakery.intro, images: [absolute('/images/morning-table.webp')] } };
export default function RootLayout({ children }: {
    children: React.ReactNode;
}) { return <html lang="ko"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,'\u003c')}}/><a className="skip" href="#main">{copy["n27"]}</a><div className="topline"><span>{copy["n28"]}</span><span>{copy["n29"]}</span><span>{bakery.hours}{copy["n30"]}</span></div><header className="site-header"><Link className="brand" href="/" aria-label={copy["n31"]}>{copy["n32"]}<sup>38</sup><small>{copy["n33"]}</small></Link><nav aria-label={copy["n34"]}>{nav.map(n => <Link key={n.href} href={n.href}>{n.label}</Link>)}</nav><Link className="header-note" href="/#pair">{copy["n35"]}</Link></header><main id="main">{children}</main><footer className="footer"><div className="footer-top"><p>{copy["n36"]}<br />{copy["n37"]}</p><div>{nav.map(n => <Link key={n.href} href={n.href}>{n.label} ↗</Link>)}</div><div><span>{bakery.hours}</span><p>{copy["n38"]}</p><Link href="/privacy/">{copy["n39"]}</Link><a href={`${basePath}/editor/`}>{copy["n40"]}</a></div></div><div className="footer-word">{copy["n32"]}<sup>38</sup></div><div className="footer-bottom"><span>{bakery.demo}</span><span>{copy["n41"]}</span></div></footer></body></html>; }

