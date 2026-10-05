import type {Metadata} from 'next';
import Link from '../components/SiteLink';
import '../fonts/fonts.css';
import './globals.css';
import './portfolio.css';
import {studio} from '../data/studio';
import {absolute,basePath} from '../lib/urls';
export const metadata:Metadata={metadataBase:new URL(absolute('/')),icons:{icon:`${basePath}/favicon.svg`},title:{default:`${studio.name} | 일상을 담는 공간`,template:`%s | ${studio.name}`},description:studio.description,robots:{index:false,follow:false},openGraph:{title:studio.name,description:studio.description,type:'website',images:[absolute('/images/living.webp')]}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ko"><body><a className="skip" href="#main">본문으로 이동</a><header className="site-header"><Link className="wordmark" href="/">{studio.wordmark}<span>SPACE DESIGN STUDIO</span></Link><nav aria-label="주 메뉴">{studio.nav.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</nav><span className="header-note">SEOUL, KR<br/>SPACE / LIFE</span></header><main id="main">{children}</main><footer className="site-footer"><div className="footer-top"><Link className="wordmark" href="/">{studio.wordmark}</Link><p>공간을 넘어,<br/>일상에 남는 디자인.</p><Link href="/contact/" className="footer-link">다음 공간 이야기 ↗</Link></div><div className="footer-bottom"><span>{studio.demo}</span><Link href="/privacy/">개인정보 안내</Link><span>© FORME / 07 · PORTFOLIO DEMO</span></div></footer><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:studio.name,url:absolute('/'),description:studio.description}).replace(/</g,'\\u003c')}}/></body></html>}
