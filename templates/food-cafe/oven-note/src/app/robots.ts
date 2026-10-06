import type {MetadataRoute} from 'next';
import {absolute} from '../lib/urls';
export const dynamic='force-static';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',disallow:'/'},sitemap:absolute('/sitemap.xml')};}
