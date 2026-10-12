/* ?src=live1 জাতীয় ট্যাগ মনে রাখে, অর্ডারের সাথে পাঠাতে */
(function(){try{const s=new URLSearchParams(location.search).get("src");if(s)sessionStorage.setItem("shop_src",s.replace(/[^\w-]/g,"").slice(0,30))}catch(e){}})();
function getSrc(){try{return sessionStorage.getItem("shop_src")||""}catch(e){return ""}}
/* শুধু ক্রেতাদের পেজে: ট্রাস্ট বার, ভাসমান কার্ট, ফুটারে অর্ডার ট্র্যাক */
const CART_KEY="shop_cart_v1";
function cartGet(){try{return JSON.parse(localStorage.getItem(CART_KEY))||[]}catch(e){return[]}}
function cartSet(l){try{localStorage.setItem(CART_KEY,JSON.stringify(l))}catch(e){}cartWidget()}
function cartAdd(p,q){const l=cartGet(),i=l.findIndex(x=>String(x.id)===String(p.id));
  if(i>=0)l[i].qty=Math.min(20,l[i].qty+(q||1));else l.push({id:p.id,qty:q||1,name:p.name,price:Number(p.price)||0,img:cover(p)});cartSet(l)}
function cartCount(){return cartGet().reduce((a,x)=>a+x.qty,0)}
function cartSum(){return cartGet().reduce((a,x)=>a+x.qty*x.price,0)}
function toast(msg){let t=document.getElementById("toast");
  if(!t){document.body.insertAdjacentHTML("beforeend",'<div id="toast" class="toast" role="status" aria-live="polite"></div>');t=document.getElementById("toast")}
  t.textContent=msg;t.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),1800)}
function cartWidget(){let w=document.getElementById("cw");
  if(!w){document.body.insertAdjacentHTML("beforeend",`<a class="cw" id="cw" href="cart.html" aria-label="কার্ট দেখুন"><span class="cw-i">${CART_SVG}</span><span class="cw-t"></span><b class="cw-p"></b></a>`);w=document.getElementById("cw")}
  const n=cartCount();w.querySelector(".cw-t").textContent=n?n+" টি":"খালি";w.querySelector(".cw-p").textContent=tk(cartSum());w.classList.toggle("has",n>0)}
function trustBar(){const t=(typeof TRUST!=="undefined"?TRUST:[]).map(x=>`<em>${x[0]} ${x[1]}</em>`).join("");if(!t)return;
  document.body.insertAdjacentHTML("afterbegin",`<div class="tbar" aria-label="আমাদের সুবিধা"><div class="tbar-in"><span>${t}</span><span>${t}</span></div></div>`)}
function footTrack(){const w=document.querySelector("footer.site .wrap");if(!w)return;
  w.insertAdjacentHTML("afterbegin",`<div class="ft"><div><b>আপনার অর্ডার কোথায়?</b><p>অর্ডার নম্বর ও মোবাইল নম্বর দিয়ে অবস্থা দেখুন।</p><a class="btn alt2" href="track.html">অর্ডার ট্র্যাক করুন ↗</a></div><div class="fsteps"><span><i>📝</i>অর্ডার গৃহীত</span><b></b><span><i>✅</i>কনফার্মড</span><b></b><span><i>🚚</i>কুরিয়ারে</span><b></b><span><i>🏠</i>দোরগোড়ায়</span></div></div>`)}
document.addEventListener("click",async e=>{const b=e.target.closest("[data-cart]");if(!b)return;e.preventDefault();
  try{const all=await loadAll(),p=all.find(x=>String(x.id)===String(b.dataset.cart));if(!p)return;
    if(isSoldOut(p)){toast("স্টক শেষ");return}cartAdd(p,1);toast("কার্টে যোগ হয়েছে ✓")}catch(err){toast("কার্টে যোগ করা যায়নি")}});
try{trustBar()}catch(e){}
try{cartWidget()}catch(e){}
try{footTrack()}catch(e){}
window.addEventListener("storage",()=>{try{cartWidget()}catch(e){}});

/* ===== কনফিগ: Pixel/GA ID বসালে (সম্মতির পরে) চালু হয়; ফাঁকা থাকলে কিছুই লোড হয় না ===== */
const PIXEL_ID = "";      // Meta Pixel ID, যেমন "1234567890"
const GA_ID = "";         // GA4 Measurement ID, যেমন "G-XXXXXXX"
const SIGNUP_OFFER = "";  // ফুটারের ফর্মে দেখানো সুবিধা, যেমন "প্রথম অর্ডারে ফ্রি ডেলিভারি" (যা লিখবেন তা রাখতে হবে)
function getVid(){ try{ let v=localStorage.getItem("shop_vid"); if(!v){ v="v"+Math.random().toString(36).slice(2,10)+Date.now().toString(36); localStorage.setItem("shop_vid",v); } return v; }catch(e){ return ""; } }
function consented(){ try{ return localStorage.getItem("shop_consent")==="1"; }catch(e){ return false; } }
function loadAds(){ /* শুধু "ঠিক আছে" চাপার পরে */
  if(window._adsLoaded||!consented()) return; window._adsLoaded=true;
  if(PIXEL_ID){ !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init',PIXEL_ID); fbq('track','PageView'); }
  if(GA_ID){ const s=document.createElement("script"); s.async=true; s.src="https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(GA_ID); document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[]; window.gtag=function(){ dataLayer.push(arguments); }; gtag("js",new Date()); gtag("config",GA_ID); }
}
function adEvent(t,pid){ /* আমাদের ইভেন্ট → Pixel/GA */
  try{ const id=pid?[String(pid)]:undefined;
    if(window.fbq){ if(t==="pv"&&pid) fbq("track","ViewContent",{content_ids:id,content_type:"product"}); else if(t==="cart") fbq("track","AddToCart",{content_ids:id,content_type:"product"}); else if(t==="co") fbq("track","InitiateCheckout"); else if(t==="wa"||t==="ms") fbq("track","Contact"); }
    if(window.gtag){ if(t==="pv"&&pid) gtag("event","view_item",{items:[{item_id:String(pid)}]}); else if(t==="cart") gtag("event","add_to_cart",{items:[{item_id:String(pid)}]}); else if(t==="co") gtag("event","begin_checkout"); else if(t==="wa"||t==="ms") gtag("event","contact",{method:t}); } }catch(e){}
}
function shopPurchase(orderId,total,ids){
  try{ if(window.fbq) fbq("track","Purchase",{value:Number(total)||0,currency:"BDT",content_ids:(ids||[]).map(String),content_type:"product"});
    if(window.gtag) gtag("event","purchase",{transaction_id:String(orderId||""),value:Number(total)||0,currency:"BDT"}); }catch(e){}
}
function shopLead(){ try{ if(window.fbq) fbq("track","Lead"); if(window.gtag) gtag("event","generate_lead"); }catch(e){} }

/* ===== নাম-পরিচয়হীন ভিজিট গণনা: শুধু ডিভাইসের একটা এলোমেলো কোড, নাম/নম্বর/IP নেওয়া হয় না ===== */
(function(){
  try{ if(/[?&]me=1/.test(location.search)) localStorage.setItem("shop_me","1"); if(localStorage.getItem("shop_me")==="1") return; }catch(e){ return; }
  const vid=getVid(); if(!vid) return;
  const q=[]; let timer=null;
  function off(){ try{ return localStorage.getItem("shop_track")==="off"; }catch(e){ return false; } }
  function flush(){ if(!q.length) return; const ev=q.splice(0,20); if(off()) return;
    try{ const b=JSON.stringify({action:"hit",vid:vid,events:ev});
      if(navigator.sendBeacon) navigator.sendBeacon(API_URL,new Blob([b],{type:"text/plain;charset=utf-8"}));
      else fetch(API_URL,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:b,keepalive:true}); }catch(e){} }
  function track(t,pid){ if(off()) return; q.push({t:t,pid:pid||"",s:getSrc()}); adEvent(t,pid); clearTimeout(timer); timer=setTimeout(flush,2500); }
  addEventListener("visibilitychange",()=>{ if(document.visibilityState==="hidden") flush(); }); addEventListener("pagehide",flush);
  const pg=location.pathname.split("/").pop()||"index.html", id=new URLSearchParams(location.search).get("id")||"";
  loadAds();
  track("pv", pg==="product.html"?id:"");
  if(pg==="order.html") track("co",id); else if(pg==="cart.html") track("co","cart");
  document.addEventListener("click",e=>{ const a=e.target.closest("a,button"); if(!a) return;
    if(a.matches("[data-cart]")) track("cart",a.dataset.cart);
    else if(/wa\.me|whatsapp/i.test(a.href||"")) track("wa");
    else if(/m\.me|messenger/i.test(a.href||"")) track("ms"); },true);
})();
function privacyNotice(){
  try{ if(localStorage.getItem("shop_notice")) return; }catch(e){ return; }
  const ads=(PIXEL_ID||GA_ID)?" \"ঠিক আছে\" চাপলে Facebook (Meta) ও Google-এর বিশ্লেষণ টুলও চালু হবে।":"";
  document.body.insertAdjacentHTML("beforeend",'<div id="pn" style="position:fixed;left:8px;right:8px;bottom:8px;z-index:70;background:#1B1422;border:1px solid #D4AF37;color:#fff;border-radius:12px;padding:12px;font-size:.85rem;display:flex;gap:8px;flex-wrap:wrap;align-items:center"><span style="flex:1;min-width:220px">সাইট ভালো করতে আমরা নাম-পরিচয় ছাড়া ভিজিট গুনি (কোন পেজ দেখা হলো, কোন বোতামে চাপ পড়ল)। আপনি নিজে না দিলে আপনার নাম বা নম্বর আমরা নিই না।'+ads+' <a href="policy.html#privacy" style="color:#D99ACF">গোপনীয়তা নীতি</a></span><button type="button" id="pn1" class="btn gold" style="width:auto;min-height:38px;padding:0 14px">ঠিক আছে</button><button type="button" id="pn0" class="btn alt2" style="width:auto;min-height:38px;padding:0 14px">গুনবেন না</button></div>');
  const done=v=>{ try{ localStorage.setItem("shop_notice","1"); if(v==="off") localStorage.setItem("shop_track","off"); else localStorage.setItem("shop_consent","1"); }catch(e){} if(v!=="off") loadAds(); document.getElementById("pn").remove(); };
  document.getElementById("pn1").onclick=()=>done("on"); document.getElementById("pn0").onclick=()=>done("off");
}
function footSubscribe(){
  const w=document.querySelector("footer.site .wrap"); if(!w) return;
  w.insertAdjacentHTML("beforeend",'<form id="subf" style="margin:16px auto 0;max-width:420px;display:grid;gap:6px;text-align:left"><b>🔔 নতুন পণ্য ও অফারের খবর পেতে চান?</b>'+(SIGNUP_OFFER?'<span>🎁 '+SIGNUP_OFFER+'</span>':'')+'<input name="phone" type="tel" inputmode="numeric" placeholder="01XXXXXXXXX" required><label class="rd" style="font-weight:400"><input type="checkbox" name="link" value="1"><span>আমার দেখা পণ্যের তথ্য আমার নম্বরের সাথে যুক্ত থাকতে পারে, যাতে পছন্দের পণ্য জানানো যায়</span></label><button class="btn gold" type="submit">খবর পেতে চাই</button><small style="color:var(--muted)">আপনার নম্বর শুধু নতুন পণ্য/অফারের মেসেজের জন্য ব্যবহার হবে। বন্ধ করতে বললেই বন্ধ করে দেওয়া হবে।</small><p class="msg" id="submsg" role="status"></p></form>');
  const f=document.getElementById("subf"), m=document.getElementById("submsg");
  f.addEventListener("submit",async ev=>{ ev.preventDefault(); const phone=f.phone.value.replace(/[\s-]/g,"");
    if(!/^01[3-9]\d{8}$/.test(phone)){ m.style.color="#ff7b6b"; m.textContent="মোবাইল নম্বর ১১ ডিজিটের হতে হবে।"; return; }
    try{ const r=await api({action:"subscribe",sub:{phone:phone,src:getSrc(),vid:f.link.checked?getVid():""}}); if(!r.ok) throw new Error(r.error||"হয়নি"); f.reset(); shopLead(); m.style.color=""; m.textContent="ধন্যবাদ! নতুন পণ্য এলে জানাব।"; }
    catch(err){ m.style.color="#ff7b6b"; m.textContent=err.message||"সমস্যা হয়েছে"; } });
}
function notifyHTML(pid){
  return '<form class="nf" data-pid="'+esc(pid)+'" style="margin:10px 0;display:grid;gap:6px"><b>🔔 স্টকে এলে জানান</b><input name="phone" type="tel" inputmode="numeric" placeholder="01XXXXXXXXX" required><button class="btn gold" type="submit">স্টকে এলে জানান</button><small style="color:var(--muted)">শুধু এই পণ্য স্টকে এলে আপনাকে মেসেজ করা হবে।</small><p class="msg"></p></form>';
}
document.addEventListener("submit",async e=>{ const f=e.target.closest&&e.target.closest("form.nf"); if(!f) return; e.preventDefault();
  const m=f.querySelector(".msg"), phone=f.phone.value.replace(/[\s-]/g,"");
  if(!/^01[3-9]\d{8}$/.test(phone)){ m.style.color="#ff7b6b"; m.textContent="মোবাইল নম্বর ১১ ডিজিটের হতে হবে।"; return; }
  try{ const r=await api({action:"subscribe",sub:{phone:phone,src:"restock-"+f.dataset.pid}}); if(!r.ok) throw new Error(r.error||"হয়নি"); shopLead(); f.innerHTML='<b>✅ ধন্যবাদ! স্টকে এলে মেসেজ করব।</b>'; }
  catch(err){ m.style.color="#ff7b6b"; m.textContent=err.message||"সমস্যা হয়েছে"; } });
try{privacyNotice()}catch(e){}
try{footSubscribe()}catch(e){}
