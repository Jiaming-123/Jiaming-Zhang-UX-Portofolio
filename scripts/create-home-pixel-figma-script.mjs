// Emits a retry-safe Figma Plugin API script. Run via the Figma connector,
// never in the browser. Each SVG path imports as a native editable letter.
import fs from 'node:fs'
const data = JSON.parse(fs.readFileSync(new URL('../design/home-pixel-glyphs-v2.json', import.meta.url), 'utf8'))
const layouts = [
  { id: '74:1190', titles: [
    { ids: ['74:1226'], lines: ['JIAMING'], tracking: -.045 },
    { ids: ['74:1228'], lines: ['ZHANG'], tracking: -.045, outline: true },
    { ids: ['74:1259'], lines: ['UniLink'] },
    { ids: ['74:1292'], lines: ['DESIGN ACROSS', 'SCREENS,', 'SYSTEMS', '& SERVICES.'], outlineRows: [3], lineHeight: .98 },
    { ids: ['74:1309'], lines: ['BoardGameMate'], fit: true },
    { ids: ['74:1329'], lines: ['My Furniture', 'Store'], fit: true },
    { ids: ['74:1354'], lines: ['CultureLens', 'Concierge'], fit: true },
    { ids: ['74:1344'], lines: ['Crownlands'], fit: true },
    { ids: ['74:1367', '74:1368', '74:1369'], lines: ["LET'S CREATE", 'MEANINGFUL', 'EXPERIENCES.'], outlineRows: [1], indent: 171.915, lineHeight: .95 },
  ] },
  { id: '94:1449', titles: [
    { ids: ['94:1484'], lines: ['JIAMING'], tracking: -.045, fit: true, availableWidth: 400 },
    { ids: ['94:1486'], lines: ['ZHANG'], tracking: -.045, outline: true, fit: true, availableWidth: 276 },
    { ids: ['94:1523'], lines: ['UniLink'] },
    { ids: ['94:1534'], lines: ['DESIGN ACROSS', 'SCREENS,', 'SYSTEMS', '& SERVICES.'], outlineRows: [3], lineHeight: .98, size: 50.74 },
    { ids: ['94:1617'], lines: ['BoardGameMate'], fit: true },
    { ids: ['94:1550'], lines: ['My Furniture', 'Store'], size: 28.38 },
    { ids: ['94:1570'], lines: ['CultureLens', 'Concierge'], size: 28.38 },
    { ids: ['94:1593'], lines: ['Crownlands'], size: 28.38 },
    { ids: ['94:1632', '94:1633', '94:1635'], lines: ["LET'S CREATE", 'MEANINGFUL', 'EXPERIENCES.'], outlineRows: [1], size: 52.89, lineHeight: .95 },
  ] },
]

const code = `
const data=${JSON.stringify(data)};
const layouts=${JSON.stringify(layouts)};
const page=await figma.getNodeByIdAsync('0:1');
await figma.setCurrentPageAsync(page);
const ids=layouts.flatMap(l=>l.titles.flatMap(t=>t.ids));
const sources=await Promise.all(ids.map(id=>figma.getNodeByIdAsync(id)));
if(sources.some(n=>!n||n.type!=='TEXT')) throw new Error('A mapped original title is missing; no canvas writes performed');
const byId=new Map(sources.map(n=>[n.id,n]));
const fonts=new Map();
const homes=await Promise.all(layouts.map(l=>figma.getNodeByIdAsync(l.id)));
for(const home of homes) for(const n of home.findAllWithCriteria({types:['TEXT']})) for(const s of n.getStyledTextSegments(['fontName'])) fonts.set(JSON.stringify(s.fontName),s.fontName);
await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
const createdNodeIds=[],mutatedNodeIds=[],titleReports=[];
function track(n){ createdNodeIds.push(n.id); if('children' in n) for(const c of n.children) track(c); }
function escape(s){ return s.replaceAll('&','&amp;').replaceAll("'",'&apos;').replaceAll('<','&lt;'); }
function lineSvg(text,size,tracking,outline){
  let x=0,paths=[],maxBottom=649;
  for(const char of text){
    const g=data.glyphs[char]; if(!g) throw new Error('Missing glyph '+char);
    if(g.path) paths.push('<path id="'+escape(char)+'" d="'+g.path+'" transform="translate('+x+' 0)" '+(outline?'fill="none" stroke="#ffffff" stroke-opacity="0.68" stroke-width="'+(1000/size)+'"':'fill="#ffffff"')+'/>');
    x+=g.advance+tracking*1000; maxBottom=Math.max(maxBottom,g.bounds[3]);
  }
  const width=x-tracking*1000;
  return {svg:'<svg xmlns="http://www.w3.org/2000/svg" width="'+(width*size/1000)+'" height="'+(maxBottom*size/1000)+'" viewBox="0 0 '+width+' '+maxBottom+'">'+paths.join('')+'</svg>',width:width*size/1000,height:maxBottom*size/1000};
}
for(const layout of layouts){
  const home=await figma.getNodeByIdAsync(layout.id);
  for(const spec of layout.titles){
    const original=byId.get(spec.ids[0]),parent=original.parent;
    const name='Pixel vectors v2 / '+spec.lines.join(' / ');
    const existing=parent.children.find(n=>n.name===name);
    if(existing){titleReports.push({id:existing.id,name,alreadyPresent:true});continue;}
    let size=spec.size??original.fontSize;
    const tracking=spec.tracking??-.02;
    if(spec.fit){
      const longest=Math.max(...spec.lines.map((l,i)=>lineSvg(l,size,tracking,spec.outline||(spec.outlineRows??[]).includes(i)).width));
      const available=spec.availableWidth??original.width;
      if(longest>available) size*=available/longest;
    }
    const title=figma.createAutoLayout('VERTICAL'); track(title);
    title.name=name; title.fills=[]; title.clipsContent=false;
    title.itemSpacing=0; title.primaryAxisAlignItems='MIN'; title.counterAxisAlignItems='MIN';
    parent.insertChild(parent.children.indexOf(original)+1,title);
    title.x=original.x; title.y=original.y;
    for(let i=0;i<spec.lines.length;i++){
      const outline=spec.outline||(spec.outlineRows??[]).includes(i);
      const row=figma.createAutoLayout('HORIZONTAL'); track(row);
      row.name=spec.lines[i]+(outline?' / Outline':' / Solid'); row.fills=[]; row.clipsContent=false;
      row.paddingLeft=outline?(spec.indent??0):0;
      title.appendChild(row);
      const info=lineSvg(spec.lines[i],size,tracking,outline);
      const imported=figma.createNodeFromSvg(info.svg); track(imported);
      imported.name='Editable glyph outlines / '+spec.lines[i]; imported.clipsContent=false;
      row.appendChild(imported);
      for(const v of imported.findAllWithCriteria({types:['VECTOR']})) v.name='Glyph / '+v.name;
      const rowWidth=info.width+row.paddingLeft;
      row.resize(rowWidth,size*(spec.lineHeight??1.12));
      row.primaryAxisSizingMode='FIXED'; row.counterAxisSizingMode='FIXED';
    }
    title.primaryAxisSizingMode='AUTO'; title.counterAxisSizingMode='AUTO';
    for(const id of spec.ids){const n=byId.get(id); n.visible=false; mutatedNodeIds.push(n.id);}
    const vectors=title.findAllWithCriteria({types:['VECTOR']});
    titleReports.push({id:title.id,home:home.id,name,size,width:title.width,height:title.height,letters:vectors.length,anchorCount:vectors.reduce((sum,n)=>sum+n.vectorNetwork.vertices.length,0),originalIds:spec.ids});
  }
}
return {createdNodeIds,mutatedNodeIds,titleReports,sourceFont:data.sourceFont,changedGlyphs:data.changedGlyphs};
`
process.stdout.write(code)
