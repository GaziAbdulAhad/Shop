/* ===== আপনার দোকানের তথ্য: শুধু এই অংশ বদলান (X-যুক্ত নম্বর থাকলে যোগাযোগ বোতাম লুকানো থাকে) ===== */
const SHOP={
  name:SHOP_NAME,                    // দোকানের নাম বদলাতে js/app.js-এর SHOP_NAME বদলান
  whatsapp:"01755855600",
  phone:"01755855600",             // আলাদা কল/হেল্পলাইন নম্বর থাকলে এখানে বদলান
  site:"gaziabdulahad.github.io/Shop", // নীতিমালায় "Website:" লাইনে বসে
  messenger:"https://m.me/61583242650306",
  facebook:"",
  email:"",
  address:"",                        // ঠিকানা লিখলে যোগাযোগ পেজে দেখাবে
  map:"",                            // Google Maps লিংক (ঐচ্ছিক)
  hours:["",""]                      // সাপোর্টের সময় লিখলে যোগাযোগ পেজে দেখাবে, যেমন ["প্রতিদিন সকাল ১০টা – রাত ৯টা",""]
};
const DEMO=/X/i.test(SHOP.whatsapp+SHOP.phone);
function L(){try{return localStorage.getItem("lang")==="en"?1:0}catch(e){return 0}}
function waHref(msg){const n=SHOP.whatsapp.replace(/\D/g,"").replace(/^0/,"880");return "https://wa.me/"+n+(msg?"?text="+encodeURIComponent(msg):"")}
function T(s){const m={shop:esc(SHOP.name),wa:esc(SHOP.whatsapp),phone:esc(SHOP.phone),site:esc(SHOP.site)};return String(s).replace(/\{(\w+)\}/g,(x,k)=>k in m?m[k]:x)}
function blk(lines){let h="",ul="";const f=()=>{if(ul){h+=`<ul>${ul}</ul>`;ul=""}};
  lines.forEach(x=>{x=T(x);if(x.startsWith("• "))ul+=`<li>${x.slice(2)}</li>`;else{f();h+=`<p>${x}</p>`}});f();return h}

/* js/policies.js-এর লেখাকে ভেঙে পলিসি ও অংশে সাজায় */
function parsePolicies(txt){
  const out=[];let P=null,S=null,lang=null;
  txt.split("\n").forEach(raw=>{const l=raw.trim();if(!l)return;
    if(l.startsWith("=== ")){const a=l.slice(4).split("|").map(x=>x.trim());P={id:a[0],icon:a[1],t:[a[2],a[3]],s:[]};out.push(P);S={h:["",""],b:[[],[]]};P.s.push(S);lang=null;return}
    if(l.startsWith("--- ")){const a=l.slice(4).split("|").map(x=>x.trim());S={h:[a[0],a[1]||a[0]],b:[[],[]]};P.s.push(S);lang=null;return}
    if(l==="[bn]"){lang=0;return}if(l==="[en]"){lang=1;return}
    if(P&&lang!==null)S.b[lang].push(l)});
  out.forEach(p=>{p.s=p.s.filter(s=>s.b[0].length||s.b[1].length)});
  return out}
const POLICIES=typeof POLICY_TEXT!=="undefined"?parsePolicies(POLICY_TEXT):[];

/* প্রোডাক্ট পেজের ভাঁজ-খোলা বক্স: শর্তাবলীর নির্দিষ্ট অংশ (নম্বর দিয়ে বাছা) */
const QUICK=[
 {link:"terms",icon:"🚚",t:["ডেলিভারি তথ্য","Delivery Information"],pick:["৪."]},
 {link:"return",icon:"🔁",t:["রিটার্ন ও এক্সচেঞ্জ","Return & Exchange"],pick:["৫.","৬.","৮."]},
 {link:"cancellation",icon:"❌",t:["অর্ডার ক্যানসেলেশন","Order Cancellation"],pick:["৭."]}
];
function quickAcc(){const i=L(),terms=POLICIES.find(p=>p.id==="terms");if(!terms)return"";
  return QUICK.map(q=>{const secs=q.pick.map(k=>terms.s.find(s=>s.h[0].startsWith(k))).filter(Boolean);
    return `<details class="acc"><summary>${q.icon} ${q.t[i]}</summary><div class="ab">${secs.map(s=>`<h3 class="ah">${T(s.h[i])}</h3>${blk(s.b[i])}`).join("")}<p><a href="policy.html#${q.link}">${i?"Read full policy →":"সম্পূর্ণ নীতিমালা পড়ুন →"}</a></p></div></details>`}).join("")}
const ICO_MS='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.652V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/></svg>';
const ICO_WA='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
const HAS_WA=!/X/i.test(SHOP.whatsapp),HAS_MS=!!SHOP.messenger;
function contactBtns(){
  const b=[];
  if(HAS_MS)b.push(`<a class="cbtn ms" href="${esc(SHOP.messenger)}" target="_blank" rel="noopener">${ICO_MS}Chat With Us</a>`);
  if(HAS_WA)b.push(`<a class="cbtn wa" href="${waHref("এই পণ্যটি সম্পর্কে জানতে চাই: "+(document.title||"")+" "+location.href)}" target="_blank" rel="noopener">${ICO_WA}WhatsApp Us</a>`);
  return b.length?`<div class="cbtns">${b.join("")}</div>`:"";
}
/* নিচের কোণে ভাসমান যোগাযোগ বোতাম */
function initFab(){
  if(!HAS_WA&&!HAS_MS)return;
  const items=[];
  if(HAS_WA)items.push(`<a class="fab-i" href="${waHref("")}" target="_blank" rel="noopener"><span class="ic wa">${ICO_WA}</span><span><b>হোয়াটসঅ্যাপ</b><small>সরাসরি মেসেজ করুন</small></span></a>`);
  if(HAS_MS)items.push(`<a class="fab-i" href="${esc(SHOP.messenger)}" target="_blank" rel="noopener"><span class="ic ms">${ICO_MS}</span><span><b>মেসেঞ্জার</b><small>Facebook দিয়ে চ্যাট</small></span></a>`);
  document.body.insertAdjacentHTML("beforeend",`<div class="fab"><div class="fab-pop" hidden><div class="fab-h"><b>কীভাবে যোগাযোগ করবেন?</b><small>আপনার পছন্দের চ্যানেল বেছে নিন</small></div>${items.join("")}</div><button class="fab-b" type="button" aria-label="যোগাযোগ করুন" aria-expanded="false"><svg class="o" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z"/></svg><span class="x" aria-hidden="true">✕</span></button></div>`);
  const f=document.querySelector(".fab"),pop=f.querySelector(".fab-pop"),b=f.querySelector(".fab-b");
  const set=o=>{pop.hidden=!o;f.classList.toggle("open",o);b.setAttribute("aria-expanded",o)};
  b.addEventListener("click",()=>set(pop.hidden));
  document.addEventListener("click",e=>{if(!f.contains(e.target))set(false)});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")set(false)});
}
initFab();
