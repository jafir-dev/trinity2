import fs from 'node:fs';
import { con, heading, button, iconList, counter, text, image, icon, resetIds } from './lib/dsl.mjs';
import { C } from './lib/tokens.mjs';
import { kitSettings } from './kit.mjs';
import { buildLucide } from './lucide.mjs';
resetIds(1);
const out='../trinity-media-theme/demo';
fs.mkdirSync(out+'/pages',{recursive:true}); fs.mkdirSync(out+'/library',{recursive:true});
const home=[con({name:'Hero',cls:'tm-hero',minh:'60vh',pad:{d:[96,32],m:[48,16]},dir:'column',gap:20,bg:'#111320'},[
  heading({t:'WE BUILD BRAND EXPERIENCES.',tag:'h1',family:'Bebas Neue',size:[96,72,36],lh:0.9,ls:-4.8,tt:'uppercase',color:C.tm_heading}),
  iconList({items:[{t:'DIP-1, Dubai, UAE',icon:'tm-lucide tm-lucide-map-pin'},{t:'Mail',icon:'tm-lucide tm-lucide-mail'}],iconSize:13,indent:6,iconColor:C.primary,color:C.tm_muted_fg}),
  con({grid:{cols:[4,2,1],gap:16}},[1,2,3,4].map(i=>con({cls:'tm-card',pad:24,border:{w:1,global:C.tm_border},radius:12,bg:'#181a25'},[heading({t:'Card '+i,color:C.tm_heading,size:24,family:'Bebas Neue'}),counter({to:2000,suffix:'+',title:'Projects'})]))),
  button({t:'Contact Now',href:'#',bgg:C.primary,color:'#fff',icon:'tm-lucide tm-lucide-send',iconLib:'tm-lucide'}),
])];
const hdr=[con({name:'Header',pad:[16,32],dir:'row',jc:'space-between',ai:'center'},[heading({t:'HEADER',color:C.tm_heading}),button({t:'GET IN TOUCH',href:'#'})])];
const ftr=[con({name:'Footer',pad:[80,32,32]},[heading({t:'FOOTER',color:C.tm_heading})])];
fs.writeFileSync(out+'/pages/home.json',JSON.stringify(home));
fs.writeFileSync(out+'/library/header.json',JSON.stringify(hdr));
fs.writeFileSync(out+'/library/footer.json',JSON.stringify(ftr));
fs.writeFileSync(out+'/manifest.json',JSON.stringify({kit:kitSettings(),library:[{key:'header',title:'Trinity – Header',type:'header',file:'library/header.json'},{key:'footer',title:'Trinity – Footer',type:'footer',file:'library/footer.json'}],pages:[{key:'home',title:'Home',slug:'home',file:'pages/home.json'}],services:[],categories:[],posts:[],menus:{primary:{name:'Primary',items:[{title:'Home',url:'{{home}}/'}]}}}));
console.log(buildLucide());
