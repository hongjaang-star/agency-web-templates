import {basePath} from '../lib/urls';
import type {AnchorHTMLAttributes} from 'react';
// Ordinary document navigation keeps every exported page usable on Pages.
export default function NavLink({href,children,...attributes}:AnchorHTMLAttributes<HTMLAnchorElement>){const destination=href?.charAt(0)==='/'?`${basePath}${href}`:href;return <a href={destination} {...attributes}>{children}</a>;}
