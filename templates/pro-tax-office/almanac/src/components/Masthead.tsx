import Link from "next/link";
import { masthead, site } from "@/data/site";
import MastNav from "./MastNav";

export default function Masthead() {
  return (
    <header className="mast">
      <div className="wrap">
        <div className="mast-top">
          <span>{masthead.left}</span>
          <span>{masthead.right}</span>
        </div>
        <div className="mast-row">
          <Link className="logo" href="/" aria-label={`${site.nameKo} 처음으로`}>
            {site.nameKo}
            <small>{site.logoSub}</small>
          </Link>
          <MastNav />
          <a className="call" href={site.phoneHref}>
            {masthead.callLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
