/* FORMA motion library: 2-keyframe skeletal exercise illustrations; custom SVG, no online GIFs. */
(() => {
const basic={h:[120,27],n:[120,51],sl:[104,64],sr:[136,64],el:[98,94],er:[142,94],wl:[96,118],wr:[144,118],hl:[110,105],hr:[130,105],kl:[108,141],kr:[132,141],al:[106,169],ar:[134,169]};
function pose(base,changes){return {...base,...changes};}
const squat=pose(basic,{el:[111,90],er:[129,90],wl:[116,98],wr:[124,98]});
const squatDown=pose(squat,{h:[120,48],n:[120,70],sl:[104,83],sr:[136,83],el:[111,101],er:[129,101],wl:[116,108],wr:[124,108],hl:[108,122],hr:[132,122],kl:[86,141],kr:[154,141],al:[94,169],ar:[146,169]});
const standing=basic;
const side={h:[146,29],n:[133,51],sl:[130,65],sr:[133,65],el:[140,94],er:[143,94],wl:[143,117],wr:[145,117],hl:[117,107],hr:[121,107],kl:[116,141],kr:[128,141],al:[111,169],ar:[134,169]};
const pushupA={h:[205,78],n:[183,81],sl:[164,83],sr:[167,83],el:[173,121],er:[169,119],wl:[181,157],wr:[172,157],hl:[104,88],hr:[105,89],kl:[63,94],kr:[64,95],al:[28,96],ar:[28,99]};
const pushupB=pose(pushupA,{h:[205,108],n:[183,112],sl:[164,115],sr:[167,115],el:[155,137],er:[176,136],hl:[104,116],hr:[105,117],kl:[63,108],kr:[64,110]});
const curlA=pose(basic,{el:[97,95],er:[143,95],wl:[95,122],wr:[145,122]});
const curlB=pose(curlA,{wl:[103,73],wr:[137,73]});
const upA=pose(basic,{el:[92,85],er:[148,85],wl:[98,72],wr:[142,72]});
const upB=pose(basic,{el:[102,37],er:[138,37],wl:[105,13],wr:[135,13]});
const lateralB=pose(basic,{el:[73,69],er:[167,69],wl:[43,71],wr:[197,71]});
const rowA=pose(side,{h:[187,55],n:[168,73],sl:[154,87],sr:[160,86],hl:[108,112],hr:[112,112],kl:[106,142],kr:[127,139],al:[99,168],ar:[131,168],el:[159,108],er:[161,107],wl:[163,139],wr:[168,139]});
const rowB=pose(rowA,{el:[128,104],er:[132,103],wl:[115,117],wr:[122,119]});
const lungeA=pose(side,{hl:[115,108],hr:[119,108],kl:[107,139],kr:[129,138],al:[109,168],ar:[131,168]});
const lungeB=pose(lungeA,{h:[145,45],n:[132,67],sl:[129,81],sr:[133,81],el:[139,110],er:[143,110],wl:[145,134],wr:[148,134],hl:[116,129],hr:[120,129],kl:[87,147],kr:[153,151],al:[69,168],ar:[180,168]});
const hingeB=pose(side,{h:[204,64],n:[184,80],sl:[173,85],sr:[177,87],el:[175,107],er:[178,106],wl:[167,137],wr:[174,137],hl:[117,111],hr:[121,111],kl:[119,144],kr:[132,144],al:[112,168],ar:[137,168]});
const bridgeA={h:[48,136],n:[70,134],sl:[81,127],sr:[84,129],el:[93,141],er:[96,142],wl:[105,161],wr:[109,160],hl:[119,140],hr:[124,142],kl:[153,113],kr:[158,114],al:[181,165],ar:[189,165]};
const bridgeB=pose(bridgeA,{hl:[119,109],hr:[124,111],sl:[81,128],sr:[84,129],kl:[155,115],kr:[158,115]});
const benchA={h:[48,120],n:[70,121],sl:[91,120],sr:[92,119],el:[108,90],er:[111,88],wl:[116,64],wr:[130,61],hl:[138,126],hr:[141,126],kl:[175,125],kr:[177,125],al:[190,165],ar:[201,165]};
const benchB=pose(benchA,{el:[107,51],er:[117,51],wl:[108,17],wr:[120,16]});
const jackA=pose(basic,{el:[99,94],er:[141,94],wl:[95,122],wr:[145,122]});
const jackB=pose(basic,{el:[81,42],er:[159,42],wl:[55,15],wr:[185,15],kl:[87,141],kr:[153,141],al:[64,166],ar:[176,166]});
const pulldownA=pose(basic,{el:[85,36],er:[155,36],wl:[70,16],wr:[170,16]});
const pulldownB=pose(basic,{el:[91,88],er:[149,88],wl:[106,75],wr:[134,75]});
const deadA={h:[194,129],n:[173,125],sl:[158,124],sr:[160,126],el:[143,93],er:[153,94],wl:[138,66],wr:[160,67],hl:[118,126],hr:[120,129],kl:[92,92],kr:[104,95],al:[76,73],ar:[103,70]};
const deadB=pose(deadA,{wl:[115,71],el:[133,94],kr:[67,116],ar:[36,112]});
const highKneesB=pose(basic,{el:[88,83],er:[152,83],wl:[91,62],wr:[149,107],hl:[110,105],hr:[130,105],kl:[114,141],kr:[155,105],al:[107,169],ar:[161,136]});
const birdA={h:[180,77],n:[165,83],sl:[151,85],sr:[154,85],el:[150,116],er:[163,115],wl:[151,159],wr:[169,157],hl:[101,94],hr:[104,94],kl:[88,130],kr:[113,133],al:[87,162],ar:[118,163]};
const birdB=pose(birdA,{el:[178,69],er:[169,116],wl:[212,57],wr:[169,157],kl:[69,99],kr:[113,133],al:[37,92],ar:[118,163]});
const frontB=pose(basic,{el:[106,74],er:[134,74],wl:[111,50],wr:[129,50]});
const triA=pose(basic,{el:[105,32],er:[135,32],wl:[113,69],wr:[127,69]});
const triB=pose(basic,{el:[105,32],er:[135,32],wl:[108,9],wr:[132,9]});
const inclineA=pose(pushupA,{h:[205,45],n:[183,52],sl:[164,61],sr:[167,61],el:[175,85],er:[174,86],wl:[184,122],wr:[180,123],hl:[104,87],hr:[105,88],kl:[63,110],kr:[64,110],al:[29,133],ar:[28,134]});
const inclineB=pose(inclineA,{h:[205,70],n:[183,76],sl:[164,84],sr:[167,84],el:[162,103],er:[180,104]});
const pullA=pose(pulldownA,{h:[120,42],n:[120,66],sl:[104,78],sr:[136,78],hl:[110,119],hr:[130,119],kl:[108,155],kr:[132,155],al:[106,182],ar:[134,182]});
const pullB=pose(pullA,{h:[120,24],n:[120,48],sl:[104,60],sr:[136,60],hl:[110,101],hr:[130,101],kl:[108,137],kr:[132,137],al:[106,164],ar:[134,164],el:[88,48],er:[152,48],wl:[70,16],wr:[170,16]});
const calfB=pose(basic,{h:[120,21],n:[120,45],sl:[104,58],sr:[136,58],el:[98,88],er:[142,88],wl:[96,112],wr:[144,112],hl:[110,99],hr:[130,99],kl:[108,135],kr:[132,135],al:[106,161],ar:[134,161]});
const patterns={squat:[squat,squatDown],lunge:[lungeA,lungeB],hinge:[side,hingeB],bridge:[bridgeA,bridgeB],calf:[basic,calfB],pushup:[pushupA,pushupB],press:[benchA,benchB],fly:[benchA,pose(benchA,{el:[94,60],er:[135,59],wl:[65,60],wr:[161,61]})],row:[rowA,rowB],pulldown:[pulldownA,pulldownB],overhead:[upA,upB],raise:[basic,lateralB],curl:[curlA,curlB],plank:[pushupA,pose(pushupA,{h:[206,79],hl:[103,91],hr:[105,92]})],deadbug:[deadA,deadB],climber:[pushupA,pose(pushupA,{kl:[110,132],kr:[64,100],al:[129,145],ar:[28,99]})],jack:[jackA,jackB],highknees:[basic,highKneesB],birddog:[birdA,birdB],frontraise:[basic,frontB],triceps:[triA,triB],incline:[inclineA,inclineB],pullup:[pullA,pullB]};
const bones=[['n','sl'],['n','sr'],['sl','el'],['el','wl'],['sr','er'],['er','wr'],['sl','hl'],['sr','hr'],['hl','hr'],['hl','kl'],['kl','al'],['hr','kr'],['kr','ar']];
const items=new Map();let watching=null;let raf=null;
function makeSvg(type,compact){
const poseA=patterns[type]?.[0]||basic;
let shape=`<svg class="figure-svg ${compact?'figure-small':''}" viewBox="0 0 240 190" aria-label="Ilustrasi animasi gerakan" role="img"><defs><filter id="shadow"><feGaussianBlur stdDeviation="2"/></filter></defs><ellipse cx="120" cy="177" rx="82" ry="4" fill="#7f987d" opacity=".12"/><path d="M38 176H202" stroke="currentColor" opacity=".12" stroke-width="1.5" stroke-dasharray="4 6"/>`;
for(let i=0;i<bones.length;i++)shape+=`<line data-bone="${i}" stroke="${i<=3?'#607e61':'#253e35'}" stroke-width="${i<=3?10:12}" stroke-linecap="round" x1="0" y1="0" x2="0" y2="0"/>`;
shape+=`<circle data-head r="15" fill="#d2ecad" stroke="#253e35" stroke-width="4"/><circle data-eye r="2.2" fill="#253e35"/><circle data-core r="6" fill="#b6e761" stroke="#263d32" stroke-width="3"/>`;
shape+=`<text x="222" y="183" font-size="9" font-weight="700" fill="#8ca086" text-anchor="end" letter-spacing="1.5">FORMA</text></svg>`;
return shape;
}
function frame(it,phase){
 const [a,b]=patterns[it.type]||[basic,basic]; const smooth=(1-Math.cos(phase*Math.PI))/2;
 const get=k=>[a[k][0]+(b[k][0]-a[k][0])*smooth,a[k][1]+(b[k][1]-a[k][1])*smooth];
 for(let i=0;i<bones.length;i++){const [u,v]=bones[i],x=get(u),y=get(v),el=it.lines[i];el.setAttribute('x1',x[0].toFixed(1));el.setAttribute('y1',x[1].toFixed(1));el.setAttribute('x2',y[0].toFixed(1));el.setAttribute('y2',y[1].toFixed(1));}
 const h=get('h');it.head.setAttribute('cx',h[0]);it.head.setAttribute('cy',h[1]);it.eye.setAttribute('cx',h[0]+5);it.eye.setAttribute('cy',h[1]-2);
 const l=get('hl'),r=get('hr');it.core.setAttribute('cx',(l[0]+r[0])/2);it.core.setAttribute('cy',(l[1]+r[1])/2);
}
function tick(t){for(const it of items.values())if(it.active)frame(it,(1+Math.sin(t/900+it.phase))/2);raf=requestAnimationFrame(tick);}
function mount(root=document){
 const nodes=root.querySelectorAll('.motion[data-motion]:not([data-mounted])');
 if(!watching && 'IntersectionObserver' in window)watching=new IntersectionObserver(entries=>{entries.forEach(e=>{const it=items.get(e.target);if(it)it.active=e.isIntersecting;});},{rootMargin:'120px'});
 nodes.forEach((node,i)=>{
    node.dataset.mounted='yes'; const type=node.dataset.motion;node.innerHTML=makeSvg(type,node.classList.contains('motion-small'));
    const svg=node.querySelector('svg');const it={type,lines:[...svg.querySelectorAll('[data-bone]')],head:svg.querySelector('[data-head]'),eye:svg.querySelector('[data-eye]'),core:svg.querySelector('[data-core]'),active:!watching,phase:i*.32};
    items.set(node,it);frame(it,0);if(watching)watching.observe(node);
 });
 for(const node of [...items.keys()])if(!node.isConnected){watching?.unobserve(node);items.delete(node);}
 if(!raf)raf=requestAnimationFrame(tick);
}
window.FormaMotion={mount};
})();
