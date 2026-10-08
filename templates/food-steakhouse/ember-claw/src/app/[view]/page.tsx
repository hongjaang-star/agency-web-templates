import Site from '../../components/Site';import {titles,description} from '../../data/site';
export function generateStaticParams(){return ['brand','menu','season','stores','reserve'].map(view=>({view}));}
export async function generateMetadata({params}:{params:Promise<{view:keyof typeof titles}>}){const {view}=await params;return {title:titles[view]+' · 엠버 & 클로 | 가상 업체 데모',description:titles[view]+'. '+description};}
export default async function Page({params}:{params:Promise<{view:string}>}){const {view}=await params;return <Site view={view}/>;}
