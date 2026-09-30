/* ===== নতুন পেজ যোগ করতে: ১) নতুন .html ফাইল বানান ২) নিচের PAGES-এ এক লাইন যোগ করুন ===== */
const PAGES=[
  {href:"index.html",label:"হোম"},
  {href:"about.html",label:"আমাদের সম্পর্কে"},
  {href:"admin.html",label:"প্রোডাক্ট যোগ করুন"}
];
const SHOP_NAME="আমার দোকান";
const API_URL="https://script.google.com/macros/s/AKfycbxPHNUStvLnIlCt3K9xnBLdU2VCaJtflxvNV41XQPmivEJ9UlAVFqFDPSaOSqOY1Ofq/exec"; // Apps Script Web App URL

async function getProducts(){const r=await fetch(API_URL);const d=await r.json();return Array.isArray(d)?d:[]}
async function api(body){const r=await fetch(API_URL,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(body)});return r.json()}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function ytId(url){
  const m=String(url||"").match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  return m?m[1]:null;
}
function imgURL(u,w){
  const m=String(u||"").match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=|thumbnail\?(?:.*&)?id=)([\w-]+)/);
  return m?`https://drive.google.com/thumbnail?id=${m[1]}&sz=w${w||1000}`:u;
}
function imgFail(el){if(el.dataset.f)return;el.dataset.f=1;const m=el.src.match(/[?&]id=([\w-]+)/);if(m)el.src="https://lh3.googleusercontent.com/d/"+m[1]+"=w1600"}
function imgList(p){return String(p.image||"").split(/[\s,|]+/).filter(Boolean)}
function mediaHTML(p){
  const id=ytId(p.video);
  if(id)return `<iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${esc(p.name)}" loading="lazy" allowfullscreen></iframe>`;
  if(imgList(p).length)return `<img src="${esc(imgURL(imgList(p)[0]))}" referrerpolicy="no-referrer" alt="${esc(p.name)}" loading="lazy">`;
  return `<div class="empty" style="border:0;height:100%;display:grid;place-items:center">ভিডিও/ছবি নেই</div>`;
}
function cardHTML(p,admin){
  return `<article class="card"><div data-gal="${esc(p.id)}"></div><div class="body">
  <h3>${esc(p.name)}</h3><p class="clamp">${esc(p.desc||"")}</p><div class="price">৳ ${esc(p.price)}</div>
  ${admin?`<button class="btn alt" data-del="${p.id}">মুছে ফেলুন</button>`:`<a class="btn gold" href="order.html?id=${encodeURIComponent(p.id)}">অর্ডার করুন</a>`}
  </div></article>`;
}
function layout(){
  const cur=location.pathname.split("/").pop()||"index.html";
  document.body.insertAdjacentHTML("afterbegin",`<header class="site"><div class="wrap"><a class="logo" href="index.html">${SHOP_NAME}</a><nav>${
    PAGES.map(p=>`<a href="${p.href}" class="${p.href===cur?"on":""}">${p.label}</a>`).join("")}</nav></div></header>`);
  document.body.insertAdjacentHTML("beforeend",`<footer class="site"><div class="wrap">© ${new Date().getFullYear()} ${SHOP_NAME}</div></footer>`);
}
async function renderList(el,admin){
  el.innerHTML=`<div class="empty" style="grid-column:1/-1">লোড হচ্ছে...</div>`;
  try{
    const l=await getProducts();
    el.innerHTML=l.length?l.map(p=>cardHTML(p,admin)).join(""):`<div class="empty" style="grid-column:1/-1">এখনও কোনো প্রোডাক্ট নেই। <a href="admin.html">প্রথম প্রোডাক্ট যোগ করুন</a></div>`;
    l.forEach(p=>{const r=el.querySelector('[data-gal="'+CSS.escape(String(p.id))+'"]');if(r)initGallery(r,p)});
  }catch(e){el.innerHTML=`<div class="empty" style="grid-column:1/-1">প্রোডাক্ট লোড করা যায়নি। API_URL ঠিক আছে কিনা দেখুন।</div>`}
}

function openLightbox(urls,start){
  let k=start,z=false;
  const lb=document.createElement("div");lb.className="lb";lb.setAttribute("role","dialog");lb.setAttribute("aria-label","ছবি জুম");
  lb.innerHTML=`<button class="lbx" aria-label="বন্ধ করুন">&times;</button>${urls.length>1?'<button class="nav prev" aria-label="আগের">&#10094;</button><button class="nav next" aria-label="পরের">&#10095;</button>':''}<div class="lbimg"><img alt=""></div>`;
  document.body.appendChild(lb);document.body.style.overflow="hidden";
  const box=lb.querySelector(".lbimg"),im=lb.querySelector("img");
  function set(n){k=(n+urls.length)%urls.length;z=false;delete im.dataset.f;im.classList.remove("z");im.style.transformOrigin="";im.src=imgURL(urls[k],2000)}
  function close(){lb.remove();document.body.style.overflow="";document.removeEventListener("keydown",key)}
  function key(e){if(e.key==="Escape")close();else if(e.key==="ArrowLeft")set(k-1);else if(e.key==="ArrowRight")set(k+1)}
  im.addEventListener("click",()=>{z=!z;im.classList.toggle("z",z)});
  box.addEventListener("pointermove",e=>{if(!z)return;const r=box.getBoundingClientRect();im.style.transformOrigin=((e.clientX-r.left)/r.width*100)+"% "+((e.clientY-r.top)/r.height*100)+"%"});
  lb.addEventListener("click",e=>{if(e.target.closest(".prev"))set(k-1);else if(e.target.closest(".next"))set(k+1);else if(e.target.closest(".lbx"))close()});
  im.onerror=()=>imgFail(im);document.addEventListener("keydown",key);set(k);
}
function initGallery(root,p){
  const items=[],v=ytId(p.video);
  if(v)items.push({t:"v",id:v});
  imgList(p).forEach(u=>items.push({t:"i",u}));
  if(!items.length){root.innerHTML=`<div class="empty" style="border:0">ছবি/ভিডিও নেই</div>`;return}
  const many=items.length>1,hasImg=items.some(x=>x.t==="i");
  root.className="gal";
  root.innerHTML=`<div class="stage"><div class="view"></div>${many?'<button class="nav prev" aria-label="আগের">&#10094;</button><button class="nav next" aria-label="পরের">&#10095;</button>':''}</div>`+
   (many?`<div class="thumbs">${items.map((it,n)=>`<button class="th" data-n="${n}" aria-label="মিডিয়া ${n+1}">${it.t==="v"?`<img src="https://img.youtube.com/vi/${it.id}/mqdefault.jpg" alt=""><span class="play">&#9654;</span>`:`<img src="${esc(imgURL(it.u,300))}" alt="" loading="lazy" onerror="imgFail(this)">`}</button>`).join("")}</div>`:"")+
   (hasImg?'<p class="hint">জুম করতে ছবিতে ক্লিক করুন</p>':"");
  const view=root.querySelector(".view"),tb=root.querySelector(".thumbs"),ths=root.querySelectorAll(".th");let i=0;
  function show(n){
    i=(n+items.length)%items.length;const it=items[i];
    view.innerHTML=it.t==="v"?`<iframe src="https://www.youtube-nocookie.com/embed/${it.id}" title="${esc(p.name)}" allowfullscreen></iframe>`:`<img src="${esc(imgURL(it.u,1000))}" alt="${esc(p.name)}" referrerpolicy="no-referrer" style="cursor:zoom-in" onerror="imgFail(this)">`;
    ths.forEach((b,k)=>b.classList.toggle("on",k===i));
    if(tb)tb.scrollTo({left:ths[i].offsetLeft-tb.clientWidth/2+ths[i].clientWidth/2,behavior:"smooth"});
  }
  root.addEventListener("click",e=>{
    const t=e.target.closest(".th");
    if(t)show(+t.dataset.n);
    else if(e.target.closest(".prev"))show(i-1);
    else if(e.target.closest(".next"))show(i+1);
    else if(e.target.tagName==="IMG"&&view.contains(e.target)){const urls=items.filter(x=>x.t==="i").map(x=>x.u);openLightbox(urls,urls.indexOf(items[i].u))}
  });
  show(0);
}
layout();
