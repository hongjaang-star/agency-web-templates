import {copy} from '../../data/copy';
import Link from '../../components/NavLink';
import Picture from '../../components/Picture';
import PageHeading from '../../components/PageHeading';
import { stories } from '../../data/bakery';
import { absolute } from '../../lib/urls';
export const metadata = { description: copy["n22"], title: copy["n20"], alternates: { canonical: absolute('/journal/') } };
export default function Page() { return <><PageHeading label="THE LITTLE JOURNAL" title={copy["n21"]} description={copy["n22"]}/><section className="section"><div className="story-grid">{stories.map(s => <Link className="story" href={`/journal/${s.id}/`} key={s.id}><div className="story-photo"><Picture name={s.image} alt={s.intro}/></div><span className="eyebrow">{s.label}</span><h2 style={{ fontSize: 28 }}>{s.title} ↗</h2><p>{s.intro}</p></Link>)}</div></section></>; }
