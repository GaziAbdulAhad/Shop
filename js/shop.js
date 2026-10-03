/* ===== আপনার দোকানের তথ্য: শুধু এই অংশ বদলান (X-যুক্ত নম্বর থাকলে যোগাযোগ বোতাম লুকানো থাকে) ===== */
const SHOP={
  name:SHOP_NAME,                    // দোকানের নাম বদলাতে js/app.js-এর SHOP_NAME বদলান
  whatsapp:"01XXXXXXXXX",
  phone:"01XXXXXXXXX",
  site:"gaziabdulahad.github.io/Shop", // নীতিমালায় "Website:" লাইনে বসে
  messenger:"",                      // যেমন https://m.me/আপনার-পেজ
  facebook:"",
  email:"",
  address:"আপনার দোকানের ঠিকানা এখানে লিখুন",
  map:"",                            // Google Maps লিংক (ঐচ্ছিক)
  hours:["প্রতিদিন সকাল ১০টা – রাত ৯টা","Every day, 10:00 AM – 9:00 PM"]
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
function contactBtns(){if(DEMO)return"";return `<div class="cbtns"><a class="btn wa" href="${waHref("এই পণ্যটি সম্পর্কে জানতে চাই: "+location.href)}" target="_blank" rel="noopener">WhatsApp</a><a class="btn tel" href="tel:${esc(SHOP.phone)}">কল করুন</a></div>`}
