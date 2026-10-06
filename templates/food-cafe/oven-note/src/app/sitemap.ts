import type {MetadataRoute} from 'next';
import {stories} from '../data/bakery';
import {absolute} from '../lib/urls';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return ['/', '/menu/','/bakery/','/journal/','/visit/','/privacy/',...stories.map(s=>`/journal/${s.id}/`)].map(route=>({url:absolute(route)}));}
