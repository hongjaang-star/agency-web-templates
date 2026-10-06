import {copy} from '../../../data/copy';
import { notFound } from 'next/navigation';
import Link from '../../../components/NavLink';
import Picture from '../../../components/Picture';
import PageHeading from '../../../components/PageHeading';
import { stories } from '../../../data/bakery';
import { absolute } from '../../../lib/urls';
export const dynamicParams = false;
export function generateStaticParams() { return stories.map(s => ({ id: s.id })); }
export async function generateMetadata({ params }: {
    params: Promise<{
        id: string;
    }>;
}) { const { id } = await params; const s = stories.find(s => s.id === id); return { title: s?.title, description: s?.intro, alternates: { canonical: absolute(`/journal/${id}/`) } }; }
export default async function Page({ params }: {
    params: Promise<{
        id: string;
    }>;
}) { const { id } = await params; const s = stories.find(s => s.id === id); if (!s)
    notFound(); return <><PageHeading label={s.label} title={s.title} description={s.intro}/><div className="wide-photo"><Picture name={s.image} alt={s.intro} eager sizes="90vw"/></div><article className="prose">{s.paragraphs.map(p => <p key={p}>{p}</p>)}<Link className="text-link" href="/journal/">{copy["n23"]}</Link></article></>; }
