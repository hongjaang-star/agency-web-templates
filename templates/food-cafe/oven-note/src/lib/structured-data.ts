import {bakery,menu} from '../data/bakery';
import {absolute} from './urls';
export const structuredData={'@context':'https://schema.org','@graph':[{'@type':'WebSite','@id':absolute('/#website'),url:absolute('/'),name:bakery.name,description:bakery.demo,inLanguage:'ko-KR'},{'@type':'Bakery',name:bakery.name,description:bakery.demo,url:absolute('/'),image:absolute('/images/shop.webp'),hasMenu:absolute('/menu/')},{'@type':'ItemList',name:bakery.name+' / MENU',itemListElement:menu.map((item,index)=>({'@type':'ListItem',position:index+1,name:item.name,url:absolute('/menu/')}))}]};
