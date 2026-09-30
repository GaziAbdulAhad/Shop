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
function imgURL(u){
  const m=String(u||"").match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=|thumbnail\?(?:.*&)?id=)([\w-]+)/);
  return m?`https://drive.google.com/thumbnail?id=${m[1]}&sz=w1000`:u;
}
function mediaHTML(p){
  const id=ytId(p.video);
  if(id)return `<iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${esc(p.name)}" loading="lazy" allowfullscreen></iframe>`;
  if(p.image)return `<img src="${esc(imgURL(p.image))}" referrerpolicy="no-referrer" alt="${esc(p.name)}" loading="lazy">`;
  return `<div class="empty" style="border:0;height:100%;display:grid;place-items:center">ভিডিও/ছবি নেই</div>`;
}
function cardHTML(p,admin){
  return `<article class="card"><div class="media">${mediaHTML(p)}</div><div class="body">
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
  }catch(e){el.innerHTML=`<div class="empty" style="grid-column:1/-1">প্রোডাক্ট লোড করা যায়নি। API_URL ঠিক আছে কিনা দেখুন।</div>`}
}
layout();
