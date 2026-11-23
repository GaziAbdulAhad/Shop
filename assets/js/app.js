/* ═══════════════════════════════════════════════════════════
   MEHER — App Engine
   Chrome (header/footer) injection · i18n (EN/BN) · live catalog
   (Google Sheets via MEHER_API) · cart/wishlist · search · toast
   Load order on every page:  data.js → api.js → app.js → page JS
   ═══════════════════════════════════════════════════════════ */
'use strict';

const MEHER = (() => {
  const CFG = window.MEHER_CONFIG;
  const API = window.MEHER_API;
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => [...(c || document).querySelectorAll(s)];

  /* ══ I18N ════════════════════════════════════════════════ */
  const I18N = {
    en: {
      /* chrome */
      announce: 'Cash on Delivery all over Bangladesh',
      trust_cod: '💰 Cash on Delivery', trust_exchange: '🔁 7-Day Exchange', trust_delivery: '🚚 Delivery All Bangladesh',
      new: 'New', trending: 'Trending', offer: 'Offer',
      nav_home: 'Home', nav_shop: 'All Products', nav_jewelry: 'Jewelry', nav_track: 'Track Order',
      nav_policy: 'Policy', nav_contact: 'Contact', nav_faq: 'FAQs', faq_intro: 'Answers to the most-asked questions.', faq_ask_wa: 'Ask directly on WhatsApp →',
      search_ph: 'Search products…', search_btn: 'Search', skip_to_content: 'Skip to content', hero_badge: 'Cash on Delivery — Nationwide',
      wishlist: 'Wishlist', cart: 'Cart', call: 'Call', menu: 'Menu', close: 'Close',
      add_to_cart: 'Add to Cart', out_of_stock: 'Out of Stock', in_stock: 'In Stock',
      footer_shop: 'Shop', footer_help: 'Help', footer_contact: 'Get in Touch',
      f_track: 'Track Order', f_faq: 'FAQs', f_about: 'About Us', f_contact: 'Contact',
      f_deliv_pay: 'Delivery & payment', f_return_ex: 'Returns & exchange', f_cancel: 'Order cancellation', f_privacy: 'Privacy policy',
      fd_store: 'Online store, Bangladesh · Cash on Delivery nationwide', nl_hint: "We'll WhatsApp you about new arrivals — nothing else.",
      newsletter_title: 'New arrival alerts', nl_placeholder: '01XXXXXXXXX', nl_success: "Thanks! We'll WhatsApp you when new arrivals land.", nl_invalid: 'Enter a valid 11-digit mobile number.', nl_consent: 'My viewed items may be linked to my number for personalized suggestions', nl_notify: 'Notify me',
      ft_rights: 'ARIFAH · All prices in BDT',
      added_cart: 'Added to your cart ✓', added_wish: 'Saved to wishlist ✓', removed_wish: 'Removed from wishlist', removed_cart: 'Item removed',
      err_required: 'Please fill in all required fields.', err_name: 'Please enter your name (min 2 characters).', err_phone: 'Enter a valid 11-digit mobile number (01XXXXXXXXX).', err_address: 'Please enter your full address (min 10 characters).', err_email: 'Please enter a valid email address.', err_order_notfound: 'No order found with those details. Check the Order ID and phone.',
      results_for: 'Results for', no_results: 'Nothing matched. Try another keyword.', items: 'items',
      sort_featured: 'Featured', sort_price_asc: 'Price: Low → High', sort_price_desc: 'Price: High → Low', sort_name: 'Name A–Z',
      filters: 'Filters', clear: 'Clear all', availability: 'Availability', in_stock_only: 'Show available only', price_range: 'Price range', category: 'Category', all: 'All', sort: 'Sort by',
      cart_col_total: 'Total',
      /* home */
      hero_eyebrow: 'Cash on Delivery · Nationwide',
      hero_h1: 'The final touch of elegance,<br><em>now at your doorstep</em>',
      hero_sub: 'Gold-plated bridal necklace sets and koredor bicha — weddings, gaye holud or Eid. Order now, pay when the parcel is in your hands.',
      hero_cta1: 'View all products', hero_wa: 'Ask on WhatsApp', hero_note: 'Dhaka 1–2 days · Outside Dhaka 2–4 days ·', hero_track: 'Track your order →',
      offer_eyebrow: 'Sale / Offers', offer_title: "Today's offers", offer_link: 'All offers →',
      cat_eyebrow: 'Explore', cat_title: 'Categories', see_all: 'All →',
      all_eyebrow: 'Our full collection', all_title: 'All products', all_link: 'Browse with filters →',
      why_eyebrow: 'Why shop from us', why_title: 'Why ARIFAH?',
      promise_1_t: 'Delivery nationwide', promise_1_d: 'Courier delivery — 1–2 days Dhaka, 2–4 days outside.',
      promise_2_t: 'Cash on Delivery', promise_2_d: 'Pay only when the parcel is in your hands — nothing upfront.',
      promise_3_t: 'Quality checked', promise_3_d: 'Every item is inspected before packing.',
      promise_4_t: 'WhatsApp support', promise_4_d: 'Ask anything — direct on WhatsApp.',
      pol_eyebrow: 'Transparent business', pol_title: 'Our promises', pol_link: 'Full policy →',
      pc_return_t: '🔁 Return policy', pc_return_d: "Check the product in front of the delivery person — return it on the spot if you don't like it. 7 days to report damaged/wrong items via WhatsApp.",
      pc_terms_t: '📜 Terms & delivery', pc_terms_d: '৳60 inside Dhaka, ৳120 outside · Cash on Delivery · Dispatched after a confirmation call.',
      pc_privacy_t: '🔒 Privacy', pc_privacy_d: 'Your details are used only to confirm & deliver your order — never sold or shared.',
      /* shop templates */
      crumb_home: 'Home', crumb_shop: 'All products', crumb_jewelry: 'Jewelry', crumb_policy: 'Policy',
      shop_h1: 'All Products', shop_sub: 'Bridal sets & koredor bicha — quality-checked before packing.<br>Filter by price and availability.',
      jewelry_h1: 'Jewelry Collection', jewelry_sub: 'Gold-plated bridal necklace sets and koredor bicha — pearl, kundan & stone designs for weddings, gaye holud and Eid.<br>Everything in one place.',
      filter_title: 'Filters', filter_category: 'Category', filter_price: 'Price (৳)', filter_min: 'Min', filter_max: 'Max', filter_stock: 'Stock', filter_instock: 'Show in-stock items only', filter_clear: 'Clear all', filter_fab: 'Filters', loading: 'Loading…',
      /* product page */
      pdp_details: 'Product details', pdp_delivery_l: 'Delivery:', pdp_delivery_d: 'Dhaka 1–2 days · Outside Dhaka 2–4 days — Cash on Delivery',
      pdp_return_l: 'Returns:', pdp_return_d: "Return at the doorstep if you don't like it — report within 7 days for damaged/wrong items.",
      pdp_quality_l: 'Quality:', pdp_quality_d: 'Every item is hand-checked before packing.',
      pdp_related_eyebrow: 'You may also like', pdp_related_title: 'More products',
      pdp_buy_now: 'Order now', pdp_ask_wa: 'Ask on WhatsApp',
      pdp_restock_title: '🔔 Notify me when restocked', pdp_restock_btn: 'Notify me', pdp_restock_ph: 'Your mobile number',
      pdp_reviews_eyebrow: 'Customer reviews', pdp_reviews_title: 'Reviews',
      pdp_reviewed_by: 'reviews',
      no_reviews: 'No reviews yet — delivered?', write_review: 'Write a review →',
      verified: '✓ Verified purchase', load_error: 'Could not load reviews.',
      /* search */
      search_eyebrow: 'Search', search_default_h1: 'Search the collection', search_recent: 'Recent searches', search_btn_full: 'Search',
      /* wishlist */
      wish_eyebrow: 'Saved for later', wish_h1: 'Your Wishlist', wish_sub: 'Tap the ♡ on any product — it stays saved on this device.',
      wish_empty_h: 'Your wishlist is empty', wish_empty_p: 'Save the pieces you love — they will wait right here.', wish_browse: 'Browse products',
      /* cart */
      cart_eyebrow: 'Your bag', cart_h1: 'Cart',
      cart_empty_h: 'Your bag is empty', cart_empty_p: 'Pick a bridal set or koredor bicha.', cart_empty_cta: 'Shop products',
      cart_continue: '← Continue shopping', cart_clear: 'Clear bag',
      cart_summary_h: 'Order summary', cart_subtotal: 'Subtotal', cart_shipping: 'Delivery charge', cart_deli_in: 'Inside Dhaka — ৳60', cart_deli_out: 'Outside Dhaka — ৳120', cart_deli_short: 'Delivery',
      cart_cod_note: 'Cash on Delivery — pay when you receive.', cart_checkout: 'Place order →', cart_trust: 'Report within 7 days · Quality checked',
      /* checkout */
      co_eyebrow: 'Cash on Delivery — nothing upfront', co_h1: 'Place Your Order',
      co_sub: 'Enter your name, number & address — we call to confirm before dispatch.',
      co_form_h: 'Your details', co_name_l: 'Name', co_name_ph: 'Your full name', want_shop_first: 'Add products to your bag first.', co_phone_l: 'Mobile number', co_district_l: 'District', co_district_ph: 'Select district',
      co_address_l: 'Full address', co_address_ph: 'House / Road / Area / Thana — complete address',
      co_delivery_l: 'Delivery', co_inside_t: 'Inside Dhaka', co_inside_d: '৳60 · 1–2 working days', co_outside_t: 'Outside Dhaka', co_outside_d: '৳120 · 2–4 working days',
      co_marketing: 'Notify me on WhatsApp about new arrivals & offers. My viewed items may be linked to my number for personalized suggestions.',
      co_summary_h: 'Order summary', co_col_items: 'Items', co_col_shipping: 'Delivery', co_col_total: 'Total',
      co_summary_note_html: "✓ Cash on Delivery<br>✓ Return at the doorstep if you don't like it<br>✓ Damaged or wrong item? Report via WhatsApp within 7 days",
      co_submit: '🛒 Place order', co_sending: 'Placing your order…',
      co_confirm_note: 'Our representative will call you to confirm the order.', co_err_district: 'Select your district',
      /* confirmation */
      conf_h1: 'Order placed!', conf_p_html: 'Thank you for your order ❤️<br>Our representative will call you to confirm.',
      conf_order_id: 'Order ID', conf_total_l: 'Total:', conf_cod: ' BDT · Cash on Delivery',
      conf_track: 'Track your order', conf_home: 'Back to home', conf_note: 'Keep your order ID — you will need it to track delivery.',
      conf_notfound: 'No recent order found on this device. Contact us on WhatsApp if you did place an order.',
      /* track */
      track_eyebrow: 'Where is my parcel?', track_h1: 'Track Your Order',
      track_p: 'Enter your order ID and the phone number used at checkout.',
      track_id_l: 'Order ID', track_phone_l: 'Phone number', track_btn: 'Track', track_searching: 'Searching…',
      track_delivery_progress: 'Delivery progress', track_current_status: 'Current status:', track_items_col: 'Items', track_amount_col: 'Amount',
      track_order_l: 'Order', track_cancelled_html: 'This order has been <strong>cancelled</strong>. Contact us with any questions.',
      track_deli_to: 'Deliver to:',
      st_1: 'Order received', st_2: 'Confirmed & packing', st_3: 'With courier', st_4: 'Delivered',
      /* review */
      rv_eyebrow: 'Your experience', rv_h1: 'Write a Review',
      rv_p: 'Only delivered orders can be reviewed. Reviews are published after verification.',
      rv_order_l: 'Order ID', rv_phone_l: 'Order phone number', rv_rating_l: 'Rating', rv_name_l: 'Your name',
      rv_text_l: 'How was the product?', rv_text_ph: 'Share your experience', rv_photo_l: 'Photo', rv_photo_hint: '(optional)',
      rv_submit: 'Submit review', rv_invalid_rating: 'Pick a star rating.',
      rv_success_h: 'Thank you!', rv_success_p: 'Your review was submitted. It will be published after verification.', rv_home: 'Back to home', rv_home_aria: 'Back to home',
      /* about */
      ab_h1: 'About Us',
      ab_p1: 'ARIFAH is a Bangladeshi online jewelry & fashion boutique. For weddings, gaye holud, Eid and everyday dressing, we make and sell gold-plated bridal necklace sets and koredor bicha — delivered nationwide by courier.',
      ab_h2_1: 'How we work',
      ab_l1: 'Cash on Delivery always — never any advance. Inspect the parcel in front of the delivery person before you pay.',
      ab_l2: 'Quality checked — every item is hand-inspected before packing.',
      ab_l3: 'Honesty & transparency — we describe products accurately; if something goes wrong, we fix it fairly.',
      ab_l4: 'Talk to a human — message us on WhatsApp and you get a real answer, fast.',
      ab_h2_2: 'Our goal',
      ab_p2: 'Every Bangladeshi woman deserves quality jewelry — beautiful, affordable, without hassle or middlemen.',
      ab_h2_3: 'Contact',
      /* contact */
      ct_h1: 'Contact Us', ct_sub: 'Orders, delivery, returns or anything else — WhatsApp gets the fastest answer.',
      ct_message: 'Message', ct_chat: 'Open Messenger', ct_call: 'Call now', ct_phone: 'Phone',
      ct_box_h: 'Placed an order?', ct_box_p: 'Check your order status instantly with your order ID and phone number.', ct_track: 'Track your order',
      /* policies */
      pr_more_q: 'More questions?', pr_all_link: 'All policies →', pr_home: 'Home', pr_crumb: 'Policy', pr_all_hub: 'All policies in one place →',
      policy_h1: 'Our Policies', policy_sub: 'Transparency is the foundation of our business — any questions? Contact us on WhatsApp. Switch the language from the top bar and the policy follows.'
    },
    bn: {
      /* chrome */
      announce: 'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি',
      trust_cod: '💰 ক্যাশ অন ডেলিভারি', trust_exchange: '🔁 ৭ দিন এক্সচেঞ্জ', trust_delivery: '🚚 সারাদেশে ডেলিভারি',
      new: 'নতুন', trending: 'জনপ্রিয়', offer: 'অফার',
      nav_home: 'হোম', nav_shop: 'সব প্রোডাক্ট', nav_jewelry: 'জুয়েলারি', nav_track: 'অর্ডার ট্র্যাক',
      nav_policy: 'পলিসি', nav_contact: 'যোগাযোগ', nav_faq: 'প্রশ্নোত্তর', faq_intro: 'সবচেয়ে বেশি জিজ্ঞাসা করা প্রশ্নের উত্তর।', faq_ask_wa: 'WhatsApp-এ সরাসরি জিজ্ঞেস করুন →',
      search_ph: 'প্রোডাক্ট খুঁজুন…', search_btn: 'খুঁজুন', skip_to_content: 'মূল কন্টেন্টে যান', hero_badge: 'ক্যাশ অন ডেলিভারি — সারাদেশে',
      wishlist: 'উইশলিস্ট', cart: 'কার্ট', call: 'কল', menu: 'মেনু', close: 'বন্ধ করুন',
      add_to_cart: 'কার্টে যোগ করুন', out_of_stock: 'স্টক শেষ', in_stock: 'স্টকে আছে',
      footer_shop: 'শপ', footer_help: 'সাহায্য', footer_contact: 'যোগাযোগ',
      f_track: 'অর্ডার ট্র্যাক', f_faq: 'প্রশ্নোত্তর', f_about: 'আমাদের সম্পর্কে', f_contact: 'যোগাযোগ',
      f_deliv_pay: 'ডেলিভারি ও পেমেন্ট', f_return_ex: 'রিটার্ন ও এক্সচেঞ্জ', f_cancel: 'অর্ডার ক্যানসেলেশন', f_privacy: 'প্রাইভেসি পলিসি',
      fd_store: 'অনলাইন স্টোর, বাংলাদেশ · সারাদেশে ক্যাশ অন ডেলিভারি', nl_hint: 'নতুন পণ্য এলে WhatsApp-এ জানাব — নম্বর শুধু এই কাজের জন্যই।',
      newsletter_title: '🔔 নতুন পণ্যের খবর', nl_placeholder: '01XXXXXXXXX', nl_success: 'ধন্যবাদ! নতুন পণ্য এলে WhatsApp-এ জানাব।', nl_invalid: 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন।', nl_consent: 'আমার দেখা পণ্যের তথ্য আমার নম্বরের সাথে যুক্ত থাকতে পারে, যাতে পছন্দের পণ্য জানানো যায়', nl_notify: 'জানিয়ে দিন',
      ft_rights: 'ARIFAH (আরিফাহ) · দাম বাংলাদেশি টাকায় (BDT)',
      added_cart: 'কার্টে যোগ হয়েছে ✓', added_wish: 'উইশলিস্টে সংরক্ষিত হয়েছে ✓', removed_wish: 'উইশলিস্ট থেকে বাদ দেওয়া হয়েছে', removed_cart: 'পণ্যটি বাদ দেওয়া হয়েছে',
      err_required: 'সবগুলো প্রয়োজনীয় তথ্য পূরণ করুন।', err_name: 'আপনার নাম লিখুন (কমপক্ষে ২ অক্ষর)।', err_phone: 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (01XXXXXXXXX)।', err_address: 'সম্পূর্ণ ঠিকানা লিখুন (কমপক্ষে ১০ অক্ষর)।', err_email: 'সঠিক ইমেইল ঠিকানা দিন।', err_order_notfound: 'এই তথ্য দিয়ে কোনো অর্ডার পাওয়া যায়নি। অর্ডার নম্বর ও মোবাইল আবার দেখুন।',
      results_for: 'এর রেজাল্ট', no_results: 'কিছু পাওয়া যায়নি। অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন।', items: 'টি প্রোডাক্ট',
      sort_featured: 'ফিচার্ড', sort_price_asc: 'দাম: কম → বেশি', sort_price_desc: 'দাম: বেশি → কম', sort_name: 'নাম A–Z',
      filters: 'ফিল্টার', clear: 'সব মুছুন', availability: 'স্টক', in_stock_only: 'শুধু পাওয়া যায়', price_range: 'দাম সীমা', category: 'ক্যাটাগরি', all: 'সব', sort: 'সাজানো',
      cart_col_total: 'মোট',
      /* home */
      hero_eyebrow: 'ক্যাশ অন ডেলিভারি · সারাদেশ',
      hero_h1: 'সাজের শেষ ছোঁয়া,<br><em>এখন আপনার দোরগোড়ায়</em>',
      hero_sub: 'গোল্ড-প্লেটেড ব্রিডাল নেকলেস সেট আর কোমরের ভিতর — বিয়ে, গায়ে হলুদ বা যেকোনো উৎসবের সাজে। অর্ডার করুন, পণ্য হাতে পেয়ে পেমেন্ট করুন।',
      hero_cta1: 'সব প্রোডাক্ট দেখুন', hero_wa: 'WhatsApp-এ জিজ্ঞেস করুন', hero_note: 'ঢাকায় ১–২ দিন · বাইরে ২–৪ দিন ·', hero_track: 'অর্ডার ট্র্যাক করুন →',
      offer_eyebrow: 'সেল / অফার', offer_title: 'আজকের অফার', offer_link: 'সব অফার →',
      cat_eyebrow: 'এক্সপ্লোর', cat_title: 'ক্যাটাগরি', see_all: 'সব →',
      all_eyebrow: 'আমাদের পুরো কালেকশন', all_title: 'সব প্রোডাক্ট', all_link: 'ফিল্টার সহ দেখুন →',
      why_eyebrow: 'কেন আমাদের কাছ থেকে', why_title: 'কেন ARIFAH?',
      promise_1_t: 'সারাদেশে ডেলিভারি', promise_1_d: 'ঢাকায় ১–২ দিন, বাইরে ২–৪ দিন — কুরিয়ারে পাঠানো হয়।',
      promise_2_t: 'ক্যাশ অন ডেলিভারি', promise_2_d: 'পণ্য হাতে পেয়ে মূল্য পরিশোধ — আগে এক টাকাও নয়।',
      promise_3_t: 'কোয়ালিটি চেক করা', promise_3_d: 'প্যাকেট করার আগে প্রতিটি পণ্য পরীক্ষা করা হয়।',
      promise_4_t: 'WhatsApp সাপোর্ট', promise_4_d: 'যেকোনো প্রশ্নে সরাসরি জিজ্ঞেস করুন।',
      pol_eyebrow: 'স্বচ্ছ ব্যবসা', pol_title: 'আমাদের প্রতিশ্রুতি', pol_link: 'সম্পূর্ণ পলিসি →',
      pc_return_t: '🔁 রিটার্ন পলিসি', pc_return_d: 'পণ্য ডেলিভারির সময় ডেলিভারি ম্যানের সামনে দেখে নিন — পছন্দ না হলে সেই মুহূর্তেই ফেরত দিতে পারবেন। ক্ষতিগ্রস্ত/ভুল পণ্য ৭ দিনের মধ্যে WhatsApp-এ জানান।',
      pc_terms_t: '📜 শর্তাবলি ও ডেলিভারি', pc_terms_d: 'ঢাকার ভেতর ৳৬০, বাইরে ৳১২০ · ক্যাশ অন ডেলিভারি · কনফার্মেশন কলের পর কুরিয়ারে পাঠানো হয়।',
      pc_privacy_t: '🔒 গোপনীয়তা', pc_privacy_d: 'আপনার তথ্য শুধু অর্ডার কনফার্ম ও ডেলিভারির জন্যই ব্যবহার হয় — বিক্রি বা শেয়ার করা হয় না।',
      /* shop templates */
      crumb_home: 'হোম', crumb_shop: 'সব প্রোডাক্ট', crumb_jewelry: 'জুয়েলারি', crumb_policy: 'পলিসি',
      shop_h1: 'সব প্রোডাক্ট', shop_sub: 'ব্রিডাল নেকলেস সেট ও কোমরের ভিতর — প্রতিটি পণ্য প্যাকেট করার আগে কোয়ালিটি চেক করা হয়।<br>দাম ও স্টক দিয়ে ফিল্টার করুন।',
      jewelry_h1: 'জুয়েলারি কালেকশন', jewelry_sub: 'গোল্ড-প্লেটেড ব্রিডাল নেকলেস সেট ও কোমরের ভিতর — পার্ল, কুন্দন ও পাথর বসানো ডিজাইন। বিয়ে, গায়ে হলুদ, ঈদ ও প্রতিদিনের সাজে।<br>সব জুয়েলারি এক জায়গায়।',
      filter_title: 'ফিল্টার', filter_category: 'ক্যাটাগরি', filter_price: 'দাম (৳)', filter_min: 'সর্বনিম্ন', filter_max: 'সর্বোচ্চ', filter_stock: 'স্টক', filter_instock: 'শুধু পাওয়া যায় এমন পণ্য', filter_clear: 'সব মুছুন', filter_fab: 'ফিল্টার', loading: 'লোড হচ্ছে…',
      /* product page */
      pdp_details: 'প্রোডাক্ট ডিটেইলস', pdp_delivery_l: 'ডেলিভারি:', pdp_delivery_d: 'ঢাকায় ১–২ দিন · বাইরে ২–৪ দিন — ক্যাশ অন ডেলিভারি',
      pdp_return_l: 'রিটার্ন:', pdp_return_d: 'পণ্য না পছন্দ হলে ডেলিভারির সময়ই ফেরত — ৭ দিনের মধ্যে জানাতে পারেন (ক্ষতিগ্রস্ত/ভুল অর্ডারের ক্ষেত্রে)',
      pdp_quality_l: 'কোয়ালিটি:', pdp_quality_d: 'প্যাকেট করার আগে প্রতিটি পণ্য হাতে চেক করা হয়',
      pdp_related_eyebrow: 'আরও দেখুন', pdp_related_title: 'আরও প্রোডাক্ট',
      pdp_buy_now: 'এখনই অর্ডার করুন', pdp_ask_wa: 'WhatsApp-এ জিজ্ঞেস করুন',
      pdp_restock_title: '🔔 স্টকে এলে জানান', pdp_restock_btn: 'স্টকে এলে জানাব', pdp_restock_ph: 'আপনার মোবাইল নম্বর',
      pdp_reviews_eyebrow: 'কাস্টমার রিভিউ', pdp_reviews_title: 'রিভিউ',
      pdp_reviewed_by: 'রিভিউ',
      no_reviews: 'এখনও কোনো রিভিউ নেই। ডেলিভারির পর', write_review: 'রিভিউ লিখুন →',
      verified: '✓ ভেরিফাইড ক্রয়', load_error: 'রিভিউ লোড করা যায়নি।',
      /* search */
      search_eyebrow: 'অনুসন্ধান', search_default_h1: 'কালেকশন খুঁজুন', search_recent: 'সাম্প্রতিক খোঁজা', search_btn_full: 'খুঁজুন',
      /* wishlist */
      wish_eyebrow: 'পরে দেখবেন বলে সেভ', wish_h1: 'আপনার উইশলিস্ট', wish_sub: 'প্রতিটা পণ্যের ♡ চাপলে এখানে সেভ থাকবে — এই ডিভাইসে।',
      wish_empty_h: 'আপনার উইশলিস্ট খালি', wish_empty_p: 'পছন্দের পণ্য সেভ করে রাখুন — পরে এখানেই পাবেন।', wish_browse: 'প্রোডাক্ট দেখুন',
      /* cart */
      cart_eyebrow: 'আপনার ব্যাগ', cart_h1: 'কার্ট',
      cart_empty_h: 'কার্ট খালি', cart_empty_p: 'ব্রিডাল নেকলেস সেট বা কোমরের ভিতর পছন্দ করুন।', cart_empty_cta: 'প্রোডাক্ট দেখুন',
      cart_continue: '← আরও পণ্য দেখুন', cart_clear: 'কার্ট খালি করুন',
      cart_summary_h: 'অর্ডার সামারি', cart_subtotal: 'সাবটোটাল', cart_shipping: 'ডেলিভারি চার্জ', cart_deli_in: 'ঢাকার ভেতরে — ৳৬০', cart_deli_out: 'ঢাকার বাইরে — ৳১২০', cart_deli_short: 'ডেলিভারি',
      cart_cod_note: 'ক্যাশ অন ডেলিভারি — পণ্য হাতে পেয়ে পরিশোধ করবেন।', cart_checkout: 'অর্ডার করুন →', cart_trust: '৭ দিনের মধ্যে রিপোর্ট করুন · কোয়ালিটি চেক করা',
      /* checkout */
      co_eyebrow: 'ক্যাশ অন ডেলিভারি — আগে কিছু দিতে হবে না', co_h1: 'অর্ডার কনফার্ম করুন',
      co_sub: 'নাম, মোবাইল ও ঠিকানা দিন — অর্ডার করার পর আমাদের প্রতিনিধি কল করে কনফার্ম করবেন।',
      co_form_h: 'আপনার তথ্য', co_name_l: 'নাম', co_name_ph: 'আপনার পূর্ণ নাম', want_shop_first: 'অর্ডার করার আগে পণ্য কার্টে যোগ করুন।', co_phone_l: 'মোবাইল নম্বর', co_district_l: 'জেলা', co_district_ph: 'জেলা নির্বাচন করুন',
      co_address_l: 'সমগ্র ঠিকানা', co_address_ph: 'বাড়ি/রোড/এলাকা/থানা — সম্পূর্ণ ঠিকানা',
      co_delivery_l: 'ডেলিভারি', co_inside_t: 'ঢাকার ভেতরে', co_inside_d: '৳৬০ · ১–২ কর্মদিবস', co_outside_t: 'ঢাকার বাইরে', co_outside_d: '৳১২০ · ২–৪ কর্মদিবস',
      co_marketing: 'নতুন পণ্য ও অফারের খবর WhatsApp-এ পেতে চাই। আমার দেখা পণ্যের তথ্য আমার অর্ডারের সাথে যুক্ত থাকতে পারে, যাতে পছন্দের পণ্য জানানো যায়।',
      co_summary_h: 'অর্ডার সামারি', co_col_items: 'পণ্য', co_col_shipping: 'ডেলিভারি', co_col_total: 'সর্বমোট',
      co_summary_note_html: '✓ ক্যাশ অন ডেলিভারি<br>✓ পণ্য না পছন্দ হলে ডেলিভারির সময়ই ফেরত দিতে পারবেন<br>✓ ক্ষতিগ্রস্ত বা ভুল পণ্য ৭ দিনের মধ্যে WhatsApp-এ জানান',
      co_submit: '🛒 অর্ডার কনফার্ম করুন', co_sending: 'অর্ডার পাঠানো হচ্ছে…',
      co_confirm_note: 'অর্ডার কনফার্ম হলে আমাদের প্রতিনিধি আপনার নম্বরে কল করে নিশ্চিত করবেন।', co_err_district: 'জেলা নির্বাচন করুন',
      /* confirmation */
      conf_h1: 'অর্ডার সফল হয়েছে!', conf_p_html: 'ধন্যবাদ আপনার অর্ডারের জন্য ❤️<br>আমাদের প্রতিনিধি আপনার নম্বরে কল করে কনফার্ম করবেন।',
      conf_order_id: 'অর্ডার নম্বর', conf_total_l: 'মোট:', conf_cod: ' টাকা · ক্যাশ অন ডেলিভারি',
      conf_track: 'অর্ডার ট্র্যাক করুন', conf_home: 'হোমে ফিরে যান', conf_note: 'অর্ডার নম্বরটি লিখে রাখুন — ট্র্যাক করতে লাগবে।',
      conf_notfound: 'এই ডিভাইসে কোনো সাম্প্রতিক অর্ডার পাওয়া যায়নি — তবুও অর্ডার হয়ে থাকলে WhatsApp-এ যোগাযোগ করুন।',
      /* track */
      track_eyebrow: 'কোথায় আমার অর্ডার?', track_h1: 'অর্ডার ট্র্যাক করুন',
      track_p: 'অর্ডার নম্বর ও অর্ডারের মোবাইল নম্বর দিন — বর্তমান অবস্থা দেখাবে।',
      track_id_l: 'অর্ডার নম্বর', track_phone_l: 'মোবাইল নম্বর', track_btn: 'দেখুন', track_searching: 'খোঁজা হচ্ছে…',
      track_delivery_progress: 'ডেলিভারির অগ্রগতি', track_current_status: 'বর্তমান অবস্থা:', track_items_col: 'আইটেম', track_amount_col: 'পরিমাণ',
      track_order_l: 'অর্ডার', track_cancelled_html: 'এই অর্ডারটি বাতিল করা হয়েছে। প্রশ্ন থাকলে যোগাযোগ করুন।',
      track_deli_to: 'ডেলিভারি ঠিকানা:',
      st_1: 'অর্ডার গৃহীত', st_2: 'কনফার্মড ও প্যাকিং', st_3: 'কুরিয়ারে', st_4: 'দোরগোড়ায় পৌঁছেছে',
      /* review */
      rv_eyebrow: 'আপনার অভিজ্ঞতা', rv_h1: 'রিভিউ লিখুন',
      rv_p: 'ডেলিভারি পাওয়া অর্ডারের রিভিউ দেওয়া যাবে। রিভিউ যাচাইয়ের পর ওয়েবসাইটে প্রকাশ করা হয়।',
      rv_order_l: 'অর্ডার নম্বর', rv_phone_l: 'অর্ডারের মোবাইল নম্বর', rv_rating_l: 'রেটিং', rv_name_l: 'আপনার নাম',
      rv_text_l: 'পণ্যটি কেমন লেগেছে?', rv_text_ph: 'আপনার মতামত লিখুন', rv_photo_l: 'ছবি দিন', rv_photo_hint: '(ঐচ্ছিক)',
      rv_submit: 'রিভিউ সাবমিট করুন', rv_invalid_rating: 'স্টার দিয়ে রেটিং বেছে নিন।',
      rv_success_h: 'ধন্যবাদ!', rv_success_p: 'আপনার রিভিউ জমা হয়েছে। যাচাইয়ের পর এটি ওয়েবসাইটে প্রকাশ করা হবে।', rv_home: 'হোমে ফিরে যান', rv_home_aria: 'হোমে ফিরে যান',
      /* about */
      ab_h1: 'আমাদের সম্পর্কে',
      ab_p1: 'ARIFAH (আরিফাহ) বাংলাদেশের একটি অনলাইন জুয়েলারি ও ফ্যাশন বুটিক। বিয়ে, গায়ে হলুদ, ঈদ আর প্রতিদিনের সাজের জন্য আমরা গোল্ড-প্লেটেড ব্রিডাল নেকলেস সেট এবং কোমরের ভিতর তৈরি করি ও বিক্রি করি। আমাদের পুরো ব্যবসা অনলাইন — সারা বাংলাদেশে কুরিয়ারে ডেলিভারি।',
      ab_h2_1: 'আমাদের পদ্ধতি',
      ab_l1: 'ক্যাশ অন ডেলিভারি সবসময় — অগ্রিম কোনো টাকা নিই না। পণ্য হাতে পেয়ে, দেখেশুনে মূল্য পরিশোধ করবেন।',
      ab_l2: 'কোয়ালিটি চেক — প্যাকেট করার আগে প্রতিটি পণ্য হাতে পরীক্ষা করা হয়।',
      ab_l3: 'সততা ও স্বচ্ছতা — আমরা প্রতিটি পণ্যের সঠিক তথ্য দেওয়ার চেষ্টা করি। ভুল বা ত্রুটি হলে ন্যায্য সমাধানে বিশ্বাস করি।',
      ab_l4: 'সরাসরি কথা বলুন — WhatsApp-এ মেসেজ করলে আমরা দ্রুত উত্তর দিই।',
      ab_h2_2: 'আমাদের লক্ষ্য',
      ab_p2: 'প্রতিটি বাঙালি নারীর কাছে মানসম্মত, সুন্দর ও সাশ্রয়ী জুয়েলারি পৌঁছে দেওয়া — ভেজাল ছাড়া, ঝামেলা ছাড়া, সরাসরি।',
      ab_h2_3: 'যোগাযোগ',
      /* contact */
      ct_h1: 'যোগাযোগ করুন', ct_sub: 'অর্ডার, সাইজ, রিটার্ন বা যেকোনো প্রশ্নে — আমরা WhatsApp-এ সবচেয়ে দ্রুত উত্তর দিই।',
      ct_message: 'মেসেজ করুন', ct_call: 'কল করুন', ct_chat: 'Messenger খুলুন', ct_phone: 'ফোন',
      ct_box_h: 'অর্ডার দিয়েছেন?', ct_box_p: 'অর্ডার নম্বর ও মোবাইল নম্বর দিয়ে এক পলকে অবস্থা দেখে নিন।', ct_track: 'অর্ডার ট্র্যাক করুন',
      /* policies */
      pr_more_q: 'আরও প্রশ্ন?', pr_all_link: 'সব পলিসি →', pr_home: 'হোম', pr_crumb: 'পলিসি', pr_all_hub: 'সব পলিসি এক জায়গায় →',
      policy_h1: 'আমাদের পলিসি', policy_sub: 'স্বচ্ছতা আমাদের ব্যবসার মূল — আরও প্রশ্ন থাকলে WhatsApp-এ যোগাযোগ করুন। উপরের মেনু থেকে ভাষা বদলালে পলিসিও সেই ভাষায় আসবে।'
    }
  };
  const LANG_KEY = 'meher-lang';
  const getLang = () => localStorage.getItem(LANG_KEY) || 'bn'; /* Bengali-first shop */
  const t = (key, vars) => {
    let s = (I18N[getLang()] || I18N.bn)[key] || I18N.en[key] || key;
    if (vars) for (const k in vars) s = s.replace('{' + k + '}', vars[k]);
    return s;
  };
  function applyLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    $$('[data-i18n-ph]').forEach(el => { el.setAttribute('placeholder', t(el.dataset.i18nPh)); });
    $$('[data-i18n-title]').forEach(el => { el.setAttribute('title', t(el.dataset.i18nTitle)); });
    const tg = $('#langToggleBtn'); if (tg) tg.textContent = lang === 'en' ? 'বাংলা' : 'English';
    updateBadges();
    window.dispatchEvent(new CustomEvent('meher:lang-changed', { detail: lang }));
  }

  /* ══ Live catalog ════════════════════════════════════════ */
  async function loadProducts(force) {
    const all = await API.getProducts(force);
    window.MEHER_PRODUCTS = all;
    return all;
  }
  const products = () => window.MEHER_PRODUCTS || [];

  /* ══ Cart / Wishlist / Recent (persistent) ═══════════════ */
  const read  = (k, fb) => { try { return JSON.parse(localStorage.getItem(k)) ?? fb; } catch { return fb; } };
  const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const CART_KEY = 'meher-cart', WISH_KEY = 'meher-wishlist', RECENT_KEY = 'meher-recent', LAST_ORDER = 'meher-last-order';

  /* cart line prices must come from the LIVE catalog — hydrate on demand */
  let productsReady = null;
  const ensureProducts = () => (productsReady = productsReady || loadProducts());

  const getCart = () => read(CART_KEY, []);
  const saveCart = c => { write(CART_KEY, c); updateBadges(); };
  const lineProduct = item => products().find(p => String(p.id) === String(item.id)) || null;
  const cartCount = () => getCart().reduce((n, i) => n + i.qty, 0);
  async function cartSubtotal() { await ensureProducts(); return getCart().reduce((sum, i) => { const p = lineProduct(i); return sum + (p ? Number(p.price) * i.qty : 0); }, 0); }
  function addToCart(id, qty = 1) {
    const p = products().find(x => String(x.id) === String(id)); if (!p) return;
    const cart = getCart();
    const found = cart.find(x => String(x.id) === String(id));
    if (found) found.qty = Math.min(20, found.qty + qty);
    else cart.push({ id: p.id, qty });
    saveCart(cart);
    toast(t('added_cart'));
  }
  const removeFromCart = idx => { const c = getCart(); c.splice(idx, 1); saveCart(c); toast(t('removed_cart')); };
  const setQty = (idx, qty) => { const c = getCart(); if (!c[idx]) return; c[idx].qty = Math.max(1, Math.min(20, qty)); saveCart(c); };

  const getWishlist = () => read(WISH_KEY, []);
  const isWishlisted = id => getWishlist().some(x => String(x) === String(id));
  function toggleWishlist(id) {
    let w = getWishlist();
    const had = w.some(x => String(x) === String(id));
    w = had ? w.filter(x => String(x) !== String(id)) : [...w, String(id)];
    write(WISH_KEY, w); updateBadges();
    toast(had ? t('removed_wish') : t('added_wish'));
    return !had;
  }

  const getRecent = () => read(RECENT_KEY, []);
  function addRecent(id) { const r = [String(id), ...getRecent().filter(x => String(x) !== String(id))].slice(0, 10); write(RECENT_KEY, r); }

  const saveLastOrder = o => write(LAST_ORDER, o);
  const getLastOrder = () => read(LAST_ORDER, null);

  function updateBadges() {
    const cc = $('#cartCount'); if (cc) cc.textContent = cartCount();
    const wc = $('#wishCount'); if (wc) wc.textContent = getWishlist().length;
    /* floating rail / side dock */
    const fw = $('#floatWishCount'); if (fw) { const n = getWishlist().length; fw.textContent = n; fw.hidden = n === 0; }
    const fc = $('#floatCartCount');
    if (fc) {
      const n = cartCount();
      fc.textContent = n; fc.hidden = n === 0;
      const ft = $('#floatCartTotal');
      if (ft) cartSubtotal().then(sum => { ft.textContent = window.MEHER_UTIL.money(sum); });
    }
  }

  /* ══ Toast ═══════════════════════════════════════════════ */
  function toast(msg, type) {
    let wrap = $('.toast-wrap');
    if (!wrap) { wrap = document.createElement('div'); wrap.className = 'toast-wrap'; wrap.setAttribute('aria-live', 'polite'); document.body.appendChild(wrap); }
    const el = document.createElement('div');
    el.className = 'toast' + (type === 'error' ? ' error' : '');
    el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 250); }, 3600);
  }

  /* ══ Chrome: header + footer ══════════════════════════════ */
  const ICON = {
    bag: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 7h12l1.5 13.5a1 1 0 0 1-1 1.1H5.5a1 1 0 0 1-1-1.1L6 7Z"/><path d="M9 11V6a3 3 0 0 1 6 0v5"/></svg>',
    heart: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 8.6a5.5 5.5 0 0 0-9.3-5.4L12 2l-.5 1.2A5.5 5.5 0 0 0 3.2 8.6c0 5.4 7 9.6 8.8 10.6 1.8-1 8.8-5.2 8.8-10.6Z"/></svg>',
    search: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    menu: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    wa: '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    ms: '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.652V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/></svg>',
    close: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    phone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 6 6l3.27-1.27a2 2 0 0 1 2.11.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    whatsapp: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.47 0 1.45 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.37l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.31-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41"/></svg>',
    messenger: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 4.97 0 11.11c0 3.5 1.74 6.61 4.47 8.65V24l4.09-2.24c1.1.3 2.25.46 3.44.46 6.63 0 12-4.97 12-11.11S18.63 0 12 0zm1.19 14.96l-3.05-3.26-5.97 3.26L10.73 8l3.13 3.26L19.75 8 12.28 14.96z"/></svg>'
  };

  function headerHTML() {
    return `
    <!-- Trust Bar -->
    <div class="trust-bar" role="status" aria-live="polite">
      <div class="container">
        <span class="trust-item" data-i18n="trust_cod">${I18N.bn.trust_cod}</span>
        <span class="trust-divider" aria-hidden="true">•</span>
        <span class="trust-item" data-i18n="trust_exchange">${I18N.bn.trust_exchange}</span>
        <span class="trust-divider" aria-hidden="true">•</span>
        <span class="trust-item" data-i18n="trust_delivery">${I18N.bn.trust_delivery}</span>
      </div>
    </div>

    <div class="announcement"><span data-i18n="announce">${I18N.bn.announce}</span></div>
    <div class="site-header">
      <div class="container header-inner">
        <button id="mobileMenuBtn" class="icon-btn menu-toggle" aria-label="Menu" aria-controls="mobileDrawer">${ICON.menu}</button>
        <a class="logo" href="index.html" aria-label="ARIFAH — ${t('nav_home')}">
          <span class="logo-mark">A</span>
          <span class="logo-text"><span class="brand">ARIFAH</span><span class="tag">${CFG.taglineEn}</span></span>
        </a>
        <form class="searchbar" id="siteSearchForm" role="search" action="search.html" method="get">
          <label class="sr-only" for="siteSearchInput">${I18N[getLang()].search_ph}</label>
          <input id="siteSearchInput" name="q" type="search" autocomplete="off" data-i18n-ph="search_ph" placeholder="${I18N[getLang()].search_ph}" aria-expanded="false" aria-controls="searchSuggest" />
          <button type="submit" aria-label="${I18N[getLang()].search_btn}">${ICON.search}</button>
          <div class="suggest" id="searchSuggest" role="listbox" aria-label="Search suggestions"></div>
        </form>
        <div class="header-actions">
          <button class="lang-toggle" id="langToggleBtn" type="button" aria-label="Switch language / ভাষা পরিবর্তন">English</button>
        </div>
      </div>
    </div>
    <nav class="main-nav" aria-label="Primary">
      <div class="container nav-inner">
        <a class="nav-link" href="index.html" data-i18n="nav_home">হোম</a>
        <a class="nav-link" href="shop.html" data-i18n="nav_shop">সব প্রোডাক্ট</a>
        <a class="nav-link" href="jewelry.html" data-i18n="nav_jewelry">জুয়েলারি</a>
        <a class="nav-link" href="track.html" data-i18n="nav_track">অর্ডার ট্র্যাক</a>
        <a class="nav-link" href="policy.html" data-i18n="nav_policy">পলিসি</a>
        <a class="nav-link" href="contact.html" data-i18n="nav_contact">যোগাযোগ</a>
      </div>
    </nav>
    <div class="drawer" id="mobileDrawer" role="dialog" aria-modal="true" aria-label="Menu">
      <div class="drawer-backdrop" data-close-drawer></div>
      <div class="drawer-panel">
        <div class="drawer-close"><button class="icon-btn" data-close-drawer aria-label="Close">${ICON.close}</button></div>
        <form class="searchbar" id="drawerSearchForm" role="search" action="search.html" method="get" style="display:flex;margin:0 0 1rem">
          <input name="q" type="search" required placeholder="${I18N[getLang()].search_ph}" aria-label="Search" style="width:100%;height:44px;border-radius:999px;border:1.5px solid #E7E2E7;background:#fff;padding:0 1rem" />
        </form>
        <a href="index.html" data-i18n="nav_home">হোম</a>
        <a href="shop.html" data-i18n="nav_shop">সব প্রোডাক্ট</a>
        <a href="jewelry.html" data-i18n="nav_jewelry">জুয়েলারি</a>
        <a href="track.html" data-i18n="nav_track">অর্ডার ট্র্যাক</a>
        <a href="policy.html" data-i18n="nav_policy">পলিসি</a>
        <a href="faq.html" data-i18n="nav_faq">প্রশ্নোত্তর</a>
        <a href="contact.html" data-i18n="nav_contact">যোগাযোগ</a>
      </div>
    </div>`;
  }

  function footerHTML() {
    return `
    <div class="site-footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <p class="brand">ARIFAH</p>
            <p style="margin:.6rem 0;font-size:.85rem;color:#CDBFDC;line-height:1.6">${CFG.taglineEn} — ${CFG.taglineBn}<br><span data-i18n="fd_store">অনলাইন স্টোর, বাংলাদেশ · সারাদেশে ক্যাশ অন ডেলিভারি</span></p>
            <p style="margin-top:.5rem;font-size:.85rem;display:grid;gap:.35rem">
              <a href="${window.MEHER_WA('আসসালামু আলাইকুম, পণ্য সম্পর্কে জানতে চাই')}" style="color:#7FE3A8;font-weight:700;display:inline-flex;gap:.4rem;align-items:center" target="_blank" rel="noopener">${ICON.whatsapp} WhatsApp: ${CFG.whatsapp}</a>
              <a href="${CFG.messenger}" style="color:#8FD0FF;font-weight:700;display:inline-flex;gap:.4rem;align-items:center" target="_blank" rel="noopener">${ICON.messenger} <span data-i18n="ct_chat">Messenger-এ চ্যাট করুন</span></a>
              <a href="${CFG.hotlineHref}" style="color:var(--gold);font-weight:700;display:inline-flex;gap:.4rem;align-items:center">${ICON.phone} <span data-i18n="ct_call">কল করুন</span>: ${CFG.hotline}</a>
            </p>
          </div>
          <nav aria-label="Shop"><h4 data-i18n="footer_shop">শপ</h4><ul>
            <li><a href="shop.html" data-i18n="nav_shop">সব প্রোডাক্ট</a></li>
            <li><a href="jewelry.html" data-i18n="nav_jewelry">জুয়েলারি</a></li>
            <li><a href="track.html" data-i18n="f_track">অর্ডার ট্র্যাক</a></li>
          </ul></nav>
          <nav aria-label="Help"><h4 data-i18n="footer_help">সাহায্য</h4><ul>
            <li><a href="shipping-policy.html" data-i18n="f_deliv_pay">ডেলিভারি ও পেমেন্ট</a></li>
            <li><a href="return-policy.html" data-i18n="f_return_ex">রিটার্ন ও এক্সচেঞ্জ</a></li>
            <li><a href="policy.html#cancellation" data-i18n="f_cancel">অর্ডার ক্যানসেলেশন</a></li>
            <li><a href="privacy-policy.html" data-i18n="f_privacy">প্রাইভেসি পলিসি</a></li>
            <li><a href="faq.html" data-i18n="f_faq">প্রশ্নোত্তর</a></li>
          </ul></nav>
          <div>
            <h4 data-i18n="newsletter_title">🔔 নতুন পণ্যের খবর</h4>
            <p style="font-size:.8rem;color:#CDBFDC;margin-bottom:.6rem" data-i18n="nl_hint">নতুন পণ্য এলে WhatsApp-এ জানাব — নম্বর শুধু এই কাজের জন্যই।</p>
            <form data-phone-subscribe style="display:grid;gap:.5rem">
              <div style="display:flex;gap:.5rem">
                <label class="sr-only" for="subPhone">Mobile</label>
                <input id="subPhone" name="phone" class="input" type="tel" inputmode="numeric" required data-i18n-ph="nl_placeholder" placeholder="01XXXXXXXXX" style="min-height:44px;border:0">
                <button class="btn btn-gold btn-sm" type="submit" style="white-space:nowrap;min-height:44px" data-i18n="nl_notify">জানিয়ে দিন</button>
              </div>
              <label style="display:flex;gap:.4rem;align-items:flex-start;font-size:.7rem;color:#B4A5BF"><input type="checkbox" name="link" value="1" style="accent-color:var(--gold);margin-top:.15rem"><span data-i18n="nl_consent">আমার দেখা পণ্যের তথ্য আমার নম্বরের সাথে যুক্ত থাকতে পারে, যাতে পছন্দের পণ্য জানানো যায়</span></label>
              <p class="msg" role="status" style="font-size:.75rem;color:#8FE3A8"></p>
            </form>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© <span id="footerYear"></span> <span data-i18n="ft_rights">ARIFAH (আরিফাহ) · দাম বাংলাদেশি টাকায় (BDT)</span></span>
          <span style="display:flex;gap:.4rem;align-items:center">We accept <span class="pay-mark">CASH ON DELIVERY</span></span>
        </div>
      </div>
    </div>`;
  }

  /* ══ Product card renderer ════════════════════════════════ */
  function starsHTML(n) {
    const r = Math.max(0, Math.min(5, Math.round(n)));
    return `<span class="stars" aria-label="${r} / 5" style="color:var(--gold-deep);letter-spacing:.1em">${'★'.repeat(r)}<i style="color:#D8CFDD;font-style:normal">${'★'.repeat(5 - r)}</i></span>`;
  }
  function productCardHTML(p) {
    const name = p.name;
    const off = API.discountPct(p);
    const soldOut = API.isSoldOut(p);
    const rating = Number(p.rcount) > 0 ? { r: Number(p.rating) || 0, c: Number(p.rcount) } : null;
    const sub = window.MEHER_SUBCATS[API.subOf(p)] || window.MEHER_SUBCATS['other'];
    const subLabel = getLang() === 'en' ? sub.en : sub.bn;
    const price = Number(p.price) || 0;

    // New/Trending/Offer tags based on data attributes
    const tags = [];
    if (off > 0) tags.push(`<span class="badge badge-red" style="font-size:.65rem">−${off}%</span>`);
    if (p.newItem === 'yes' || p.isNew === 'yes') tags.push(`<span class="badge badge-purple" style="font-size:.65rem">${t('new')}</span>`);
    if (p.trending === 'yes' || p.isTrending === 'yes') tags.push(`<span class="badge badge-gold" style="font-size:.65rem">${t('trending')}</span>`);
    if (p.offer === 'yes' || p.isOffer === 'yes') tags.push(`<span class="badge badge-pink" style="font-size:.65rem">${t('offer')}</span>`);
    const badgeHTML = tags.length ? `<div class="pc-badges" style="gap:.3rem">${tags.join('')}</div>` : '';

    return `
    <article class="product-card" data-id="${p.id}">
      <div class="pc-media">
        ${badgeHTML}
        <button class="pc-wish" data-wish="${p.id}" aria-pressed="${isWishlisted(p.id)}" aria-label="${t('wishlist')} — ${name}">${ICON.heart}</button>
        <a href="product.html?id=${encodeURIComponent(p.id)}" aria-label="${name}"><img src="${API.cover(p, 600)}" alt="${name}" loading="lazy" width="400" height="480" referrerpolicy="no-referrer" onerror="MEHER_API.imgFail(this)"></a>
      </div>
      <div class="pc-body">
        <span class="pc-cat">${subLabel}</span>
        <a class="pc-name" href="product.html?id=${encodeURIComponent(p.id)}">${name}</a>
        ${rating ? `<div class="pc-rating" style="font-size:.75rem">${starsHTML(rating.r)} <b>${rating.r}</b> <span class="text-muted">(${rating.c})</span></div>` : ''}
        <div class="pc-price"><span class="now">${window.MEHER_UTIL.money(price)}</span>${p.oldprice ? `<span class="was">${window.MEHER_UTIL.money(p.oldprice)}</span>` : ''}</div>
        ${soldOut
          ? `<span class="pc-stock out">${t('out_of_stock')}</span>`
          : `<span class="pc-stock">✓ ${t('in_stock')}</span>`}
        <div class="pc-add">
          ${soldOut
            ? `<span class="btn btn-outline btn-sm btn-block" style="opacity:.6;pointer-events:none">${t('out_of_stock')}</span>`
            : `<button class="btn btn-primary btn-sm btn-block" data-quickadd="${p.id}">${t('add_to_cart')}</button>`}
        </div>
      </div>
    </article>`;
  }
  function renderGrid(container, list) {
    if (!container) return;
    container.innerHTML = list.length
      ? list.map(productCardHTML).join('')
      : `<p class="text-muted" style="grid-column:1/-1;text-align:center;padding:3rem 1rem">${t('no_results')}</p>`;
  }

  /* ══ Global bindings ══════════════════════════════════════ */
  document.addEventListener('click', e => {
    const wish = e.target.closest('[data-wish]');
    if (wish) {
      e.preventDefault();
      const active = toggleWishlist(wish.dataset.wish);
      wish.classList.toggle('active', active);
      wish.setAttribute('aria-pressed', active);
      return;
    }
    const quick = e.target.closest('[data-quickadd]');
    if (quick) { ensureProducts().then(() => addToCart(quick.dataset.quickadd)); return; }
    const closeDrawer = e.target.closest('[data-close-drawer]');
    if (closeDrawer) { $('#mobileDrawer')?.classList.remove('open'); document.body.style.overflow = ''; return; }
    const closeModal = e.target.closest('[data-close-modal]');
    if (closeModal) { closeModalEl(closeModal.closest('.modal')); return; }
  });

  function openModalEl(modal) { if (!modal) return; modal.classList.add('open'); document.body.style.overflow = 'hidden'; const f = modal.querySelector('.modal-panel button, .modal-panel a, .modal-panel input'); if (f) f.focus(); }
  function closeModalEl(modal) { if (!modal) return; modal.classList.remove('open'); document.body.style.overflow = ''; }
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    $$('.modal.open').forEach(closeModalEl);
    const d = $('#mobileDrawer'); if (d?.classList.contains('open')) { d.classList.remove('open'); document.body.style.overflow = ''; }
  });

  /* footer phone subscribe → live backend */
  document.addEventListener('submit', async e => {
    const f = e.target.closest('[data-phone-subscribe]');
    if (!f) return;
    e.preventDefault();
    const phoneEl = f.querySelector('input[name="phone"]');
    const msg = f.querySelector('.msg');
    const phone = phoneEl.value.replace(/[\s-]/g, '');
    const setErr = m => { msg.style.color = '#FF9D97'; msg.textContent = m; };
    if (!/^01[3-9]\d{8}$/.test(phone)) return setErr('মোবাইল নম্বর ১১ ডিজিটের হতে হবে (01XXXXXXXXX)।');
    msg.style.color = '#CDBFDC'; msg.textContent = 'পাঠানো হচ্ছে…';
    try {
      const link = f.querySelector('input[name="link"]')?.checked;
      const r = await API.api({ action: 'subscribe', sub: { phone, src: 'meher-website', vid: link ? getVid() : '' } });
      if (!r.ok) throw new Error(r.error || 'সমস্যা হয়েছে');
      f.reset();
      msg.style.color = '#8FE3A8';
      msg.textContent = t('nl_success');
    } catch (err) { setErr(err.message || 'সমস্যা হয়েছে, আবার চেষ্টা করুন।'); }
  });
  function getVid() {
    try {
      let v = localStorage.getItem('meher-vid');
      if (!v) { v = 'v' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36); localStorage.setItem('meher-vid', v); }
      return v;
    } catch { return ''; }
  }

  /* ══ Search suggestions ════════════════════════════════════ */
  function searchProducts(q) {
    const needle = String(q || '').trim().toLowerCase();
    if (!needle) return [];
    return products().filter(p =>
      [p.name, p.desc, p.category, API.subOf(p)].filter(Boolean).join(' ').toLowerCase().includes(needle)
    );
  }
  function bindSearchSuggest() {
    const input = $('#siteSearchInput'), box = $('#searchSuggest'), form = $('#siteSearchForm');
    if (!input || !box || !form) return;
    let idx = -1;
    const render = q => {
      const hits = searchProducts(q).slice(0, 6);
      if (!hits.length) { box.classList.remove('open'); return; }
      box.innerHTML = `<div class="suggest-head"><span>${hits.length} ${t('items')}</span><button type="button" data-clear-suggest>✕</button></div>` +
        hits.map(p => `<a class="suggest-item" href="product.html?id=${encodeURIComponent(p.id)}" role="option"><img src="${API.cover(p, 120)}" alt="" width="46" height="56" loading="lazy" referrerpolicy="no-referrer" onerror="MEHER_API.imgFail(this)"><span><span class="s-name">${p.name}</span><br><span class="s-price">৳${p.price}</span></span></a>`).join('');
      box.classList.add('open'); idx = -1;
    };
    input.addEventListener('input', () => input.value.trim().length >= 2 ? render(input.value) : box.classList.remove('open'));
    input.addEventListener('focus', () => { if (input.value.trim().length >= 2) render(input.value); });
    input.addEventListener('keydown', e => {
      const items = $$('.suggest-item', box);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        idx = (idx + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % Math.max(items.length, 1);
        items.forEach((el, i) => el.classList.toggle('active', i === idx));
      } else if (e.key === 'Enter' && idx >= 0 && items[idx]) {
        e.preventDefault(); window.location.href = items[idx].href;
      } else if (e.key === 'Escape') box.classList.remove('open');
    });
    box.addEventListener('click', e => { if (e.target.closest('[data-clear-suggest]')) { input.value = ''; box.classList.remove('open'); input.focus(); } });
    document.addEventListener('click', e => { if (!form.contains(e.target)) box.classList.remove('open'); });
    form.addEventListener('submit', () => {
      const q = input.value.trim();
      if (!q) return;
      const h = read('meher-search-history', []);
      write('meher-search-history', [q, ...h.filter(x => x.toLowerCase() !== q.toLowerCase())].slice(0, 6));
    });
  }

  /* ══ Shop/filter engine ═══════════════════════════════════ */
  function initShop(fixedSub) {
    const grid = $('#productGrid');
    if (!grid) return () => {};
    grid.innerHTML = Array(4).fill('<div class="skeleton" style="height:340px"></div>').join('');
    const params = new URLSearchParams(location.search);
    const state = {
      sub: fixedSub || params.get('sub') || 'all',
      min: parseFloat(params.get('min')) || 0,
      max: parseFloat(params.get('max')) || Infinity,
      inStock: params.get('avail') !== '0', // hide sold-out by default
      sort: params.get('sort') || 'featured'
    };
    const resultCount = $('#resultCount');
    let list = [];

    const apply = () => {
      let out = list.filter(p =>
        (state.sub === 'all' || API.subOf(p) === state.sub) &&
        Number(p.price) >= state.min && Number(p.price) <= state.max &&
        (!state.inStock || !API.isSoldOut(p))
      );
      switch (state.sort) {
        case 'price_asc':  out = [...out].sort((a, b) => a.price - b.price); break;
        case 'price_desc': out = [...out].sort((a, b) => b.price - a.price); break;
        case 'name':       out = [...out].sort((a, b) => String(a.name).localeCompare(String(b.name))); break;
        default: break;
      }
      renderGrid(grid, out);
      if (resultCount) resultCount.textContent = `${out.length} ${t('items')}`;
    };

    /* controls wired once */
    $('#sortSelect')?.addEventListener('change', e => { state.sort = e.target.value; apply(); });
    $('#minPrice')?.addEventListener('change', e => { state.min = parseFloat(e.target.value) || 0; apply(); });
    $('#maxPrice')?.addEventListener('change', e => { state.max = parseFloat(e.target.value) || Infinity; apply(); });
    $('#availOnly')?.addEventListener('change', e => { state.inStock = e.target.checked; apply(); });
    $$('[data-sub]').forEach(el => el.addEventListener('change', () => {
      state.sub = el.checked ? el.dataset.sub : 'all';
      $$('[data-sub]').forEach(o => { if (o !== el) o.checked = false; });
      apply();
    }));
    $('#clearFilters')?.addEventListener('click', () => {
      const allRadio = $('.filter-panel input[data-sub="all"]');
      if (allRadio) allRadio.checked = true;
      else $$('.filter-panel input[type="checkbox"]').forEach(c => { if (c.id !== 'availOnly') c.checked = false; });
      if ($('#availOnly')) $('#availOnly').checked = true;
      state.sub = 'all'; state.min = 0; state.max = Infinity; state.inStock = true;
      if ($('#minPrice')) $('#minPrice').value = ''; if ($('#maxPrice')) $('#maxPrice').value = '';
      apply();
    });
    $('#filterFab')?.addEventListener('click', () => { $('#filterPanel')?.classList.add('open'); document.body.style.overflow = 'hidden'; });
    $('#filterClose')?.addEventListener('click', () => { $('#filterPanel')?.classList.remove('open'); document.body.style.overflow = ''; });
    if (params.get('sort') && $('#sortSelect')) $('#sortSelect').value = params.get('sort');
    if (state.sub !== 'all') { const el = $(`[data-sub="${state.sub}"]`); if (el) el.checked = true; }

    loadProducts().then(all => { list = all; apply(); }).catch(() => { grid.innerHTML = `<p class="text-muted" style="grid-column:1/-1;text-align:center;padding:3rem">প্রোডাক্ট লোড করা যায়নি।</p>`; });
    return apply;
  }

  /* ══ Side dock (wishlist · cart) + contact FAB ═══════════════ */
  function floatingRailHTML(here) {
    const inCheckoutFlow = /^(cart|checkout)\.html$/.test(here);
    const dock = inCheckoutFlow ? '' : `
    <div class="side-dock" aria-label="উইশলিস্ট ও কার্ট">
      <a class="dock-item" href="wishlist.html" aria-label="উইশলিস্ট"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 8.6a5.5 5.5 0 0 0-9.3-5.4L12 2l-.5 1.2A5.5 5.5 0 0 0 3.2 8.6c0 5.4 7 9.6 8.8 10.6 1.8-1 8.8-5.2 8.8-10.6Z"/></svg><span class="dock-badge" id="floatWishCount" hidden>0</span></a>
      <span class="dock-divider" aria-hidden="true"></span>
      <a class="dock-item dock-cart" href="cart.html" aria-label="কার্ট দেখুন">${ICON.bag}<span class="dock-badge" id="floatCartCount" hidden>0</span></a>
      <span class="dock-total" id="floatCartTotal" title="সর্বোমোট">৳0</span>
    </div>`;
    return `
    ${dock}
    <div class="float-rail" aria-label="দ্রুত কাজ">
      <div class="fab-wrap">
        <button class="float-fab" id="contactFab" type="button" aria-expanded="false" aria-controls="contactPop" aria-label="যোগাযোগ করুন">
          <svg class="chat-ic" width="27" height="27" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
          <svg class="close-ic" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        <div class="fab-pop" id="contactPop" role="dialog" aria-label="যোগাযোগের মাধ্যম">
          <div class="fab-pop-head"><b>কীভাবে যোগাযোগ করবেন?</b><small>আপনার পছন্দের চ্যানেল বেছে নিন</small></div>
          <a class="fab-opt" href="${window.MEHER_WA ? window.MEHER_WA('') : '#'}" target="_blank" rel="noopener"><span class="fi wa">${ICON.wa}</span><span><b>হোয়াটসঅ্যাপ</b><small>সরাসরি মেসেজ করুন</small></span></a>
          <a class="fab-opt" href="${CFG.messenger}" target="_blank" rel="noopener"><span class="fi ms">${ICON.ms}</span><span><b>মেসেঞ্জার</b><small>Facebook দিয়ে চ্যাট</small></span></a>
        </div>
      </div>
    </div>`;
  }
  function bindFloatingRail(here) {
    document.body.insertAdjacentHTML('beforeend', floatingRailHTML(here));
    const fab = $('#contactFab'), pop = $('#contactPop');
    if (!fab || !pop) return;
    const set = open => { pop.classList.toggle('open', open); fab.classList.toggle('open', open); fab.setAttribute('aria-expanded', String(open)); };
    fab.addEventListener('click', () => set(!pop.classList.contains('open')));
    document.addEventListener('click', e => { if (!e.target.closest('.fab-wrap')) set(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
  }

  /* ══ Boot ══════════════════════════════════════════════════ */
  function boot() {
    /* ad-source attribution (same as original site): ?src=live1 etc. */
    try { const s = new URLSearchParams(location.search).get('src'); if (s) sessionStorage.setItem('shop_src', s.replace(/[^\w-]/g, '').slice(0, 30)); } catch (e) { }
    const h = $('#site-header'); if (h) h.innerHTML = headerHTML();
    const f = $('#site-footer'); if (f) f.innerHTML = footerHTML();
    $('#footerYear') && ($('#footerYear').textContent = new Date().getFullYear());

    const lang = getLang();
    document.documentElement.lang = lang;
    applyLang(lang);

    const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    $$('.nav-link').forEach(a => { if (a.getAttribute('href')?.split('?')[0].split('/').pop() === here) a.classList.add('active'); });
    bindFloatingRail(here);

    $('#mobileMenuBtn')?.addEventListener('click', () => { $('#mobileDrawer')?.classList.add('open'); document.body.style.overflow = 'hidden'; });
    $('#langToggleBtn')?.addEventListener('click', () => applyLang(getLang() === 'en' ? 'bn' : 'en'));

    bindSearchSuggest();
    /* preload catalog so badges/grids are instant */
    ensureProducts().then(updateBadges);
    updateBadges();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

  return { t, getLang, applyLang, loadProducts, getCart, saveCart, cartCount, cartSubtotal, addToCart, removeFromCart, setQty, getWishlist, isWishlisted, toggleWishlist, getRecent, addRecent, saveLastOrder, getLastOrder, lineProduct, renderGrid, initShop, searchProducts, productCardHTML, openModalEl, closeModalEl, toast, starsHTML, $, $$ };
})();
window.MEHER = MEHER;
