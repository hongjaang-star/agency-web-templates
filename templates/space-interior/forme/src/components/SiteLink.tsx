import {basePath} from '../lib/urls';
// Static hosting uses full document navigation, including dynamic exported pages.
export default function SiteLink({href,...props}:React.ComponentProps<'a'>){return <a {...props} href={href?.startsWith('/')?basePath+href:href}/>;}
