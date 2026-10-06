import {copy} from '../../data/copy';
import Link from '../../components/NavLink';
import PageHeading from '../../components/PageHeading';
import Picture from '../../components/Picture';
import { BakeClock } from '../../components/Interactive';
import { absolute } from '../../lib/urls';
export const metadata = { description: copy["n3"], title: copy["n1"], alternates: { canonical: absolute('/bakery/') } };
export default function Page() { return <><PageHeading label="OUR LITTLE BAKERY" title={copy["n2"]} description={copy["n3"]}/><section className="section craft"><div className="craft-photo"><Picture name="baker-hands" alt={copy["n4"]} eager/></div><div className="craft-copy"><span className="eyebrow">{copy["n5"]}</span><h2>{copy["n6"]}<br />{copy["n7"]}</h2><p>{copy["n8"]}</p><blockquote>{copy["n9"]}<br />{copy["n10"]}</blockquote><p>{copy["n11"]}</p></div></section><div className="wide-photo"><Picture name="butter-layers" alt={copy["n12"]} sizes="90vw"/></div><section className="section baking"><div><span className="eyebrow">{copy["n13"]}</span><h2>{copy["n14"]}<br />{copy["n15"]}</h2><p>{copy["n16"]}</p></div><BakeClock /></section><div className="prose"><h2>{copy["n17"]}</h2><p>{copy["n18"]}</p><Link className="text-link" href="/menu/">{copy["n19"]}</Link></div></>; }
