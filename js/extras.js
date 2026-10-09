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
