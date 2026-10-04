import {studio,pageInfo} from '../data/studio';
import {absolute} from '../lib/urls';
export const dynamic='force-static';
export default function sitemap(){return ['/',...Object.keys(pageInfo).map(p=>`/${p}/`),...studio.projects.map(p=>`/projects/${p.id}/`)].map(route=>({url:absolute(route)}));}
