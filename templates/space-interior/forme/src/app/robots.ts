import {absolute} from '../lib/urls';
export const dynamic='force-static';
export default function robots(){return {rules:{userAgent:'*',disallow:'/'},sitemap:absolute('/sitemap.xml')};}
