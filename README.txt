AURÉ — STATIC SITE EXPORT FOR SHOPIFY THEME REBUILD
====================================================

Plain HTML/CSS/JS. No build step, no frameworks, no CDN or external font
links. Every image, icon, font and video is included locally, so the site
works fully offline. Open index.html in a browser to preview.

FOLDER STRUCTURE
----------------
  index.html                  Home page
  collection.html             All products (filter / sort); ?vol=1 = The Debut, ?vol=2 = Roma
  product-<handle>.html       11 product pages (see list below)
  css/fonts.css               @font-face rules (local fonts)
  css/main.css                All styles, grouped by section, responsive rules at the end
  js/catalog.js               Product list used by search / wishlist (placeholder data)
  js/enquiry-cart.js          Enquiry list ("cart") stored in localStorage + WhatsApp hand-off
  js/main.js                  Shared: header, nav drawer, dropdowns, wishlist, reveal, splash
  js/home.js                  Home only: collection tabs, rail arrows, gallery marquee
  js/collection.js            Collection only: filter, sort, 4/2 column toggle
  js/product.js               Product only: gallery, lightbox zoom, options, price, add to list
  images/                     logos, favicon, hero-banner, size-chart
  images/products/            <handle>-1..5.webp (silver-sage has 4)
  images/gallery/             client-bridal-01..06.webp ("The Art of Dressing")
  images/founders/            founder-najia.webp, founder-izza.webp
  images/icons/               icon-email / icon-whatsapp / icon-instagram .png
  fonts/                      Poppins (200/300/400), Cormorant Garamond (variable + italic)
  videos/                     <handle>-video.mp4 for the 5 Roma pieces

Every HTML page marks its reusable parts with comments, e.g.
  <!-- ===== SECTION: Hero banner (Shopify: sections/hero.liquid ...) ===== -->
  <!-- ===== /SECTION: Hero banner ===== -->
Smaller repeated pieces are marked "SNIPPET" (splash, WhatsApp button,
mobile tab bar, lightbox) or "product card" (snippets/product-card.liquid).

PAGES
-----
1. index.html — Home
   Sections: Header + nav drawer · Hero banner · Featured products ("Our
   Collection", tabbed) · Founders (brand story) · Contact cards ·
   Client gallery marquee ("The Art of Dressing") · Footer.
2. collection.html — Collection
   Header · Collection grid with filter + sort toolbar · Footer.
3. Product pages (main-product template, same layout for all):
   The Debut: product-mist-green, product-onyx-black, product-rose-pink,
              product-ruby-red, product-silver-sage, product-serein
   Roma:      product-sienna, product-eden, product-lyra, product-amore,
              product-sage
   Sections: Header · Breadcrumb · Media gallery + thumbnails · Info card
   (title, price, SKU, delivery, options, quantity, add button,
   accordions) · Footer · Lightbox.
   Roma differences: "Price on request", size fixed to Custom, an extra
   video in the gallery, an extra "Disclaimer" accordion, no SKU line.
   Size Chart link: all Debut pieces + Lyra.

ANIMATIONS & INTERACTIVE FEATURES
---------------------------------
All pages
- Splash loader: dark full-screen overlay with a pulsing logo (CSS
  keyframes), fades out once the page has loaded (min 0.5s, max 4s).
- Header:
  · Home: transparent with a white logo over the hero; after 24px of
    scroll it turns frosted white (backdrop blur), the logo cross-fades
    to the nude version and icons change colour. (.is-scrolled)
  · Product pages: slides up out of view while scrolling down, comes
    back when scrolling up (desktop only). (.is-hidden)
  · Collection: always solid.
- Nav drawer: burger opens a slide-in panel from the left with a
  dimmed overlay. "Shop By Collection" expands an accordion (also on
  hover on the home page, desktop). Esc / overlay click closes it.
- Header dropdowns (fade + slide down; click outside or Esc closes):
  · Search (home only): live client-side search by name or collection
    ("Roma", "Vol 2", "The Debut"…), results link to product pages.
  · Wishlist (home + collection): saved pieces with remove buttons.
  · Enquiry list (all pages): items with thumbnail, options, qty
    stepper, remove, "Clear list", and "Send enquiry via WhatsApp /
    Checkout" which opens WhatsApp with a pre-written message listing
    every item.
- Wishlist: heart buttons on cards and product pages; saved in
  localStorage key "aure_wishlist" (ids d1–d6, v1–v5). Badge shows count.
  On product pages the header/tab-bar heart saves the current piece.
- Enquiry list: localStorage key "aure_enquiry", shared across pages;
  the count badge updates live.
- Hover states: links/icons turn gold, buttons darken, CTA fills.
- Mobile (≤768px home, ≤820px other pages): compact header, bottom tab
  bar (Wishlist / Home / Cart) and a floating WhatsApp button.
- In-page links scroll smoothly with an offset for the fixed header.

Home
- Scroll reveal: elements with class "reveal" fade up 26px as they enter
  the viewport, staggered 90ms between siblings (IntersectionObserver).
- Collection tabs: New Arrivals / Roma / The Debut filter the product
  rail with a quick fade-out / fade-in (240ms).
- Product rail: horizontal scroller (hidden scrollbar) with round
  prev / next arrows that ease one card at a time. On mobile it becomes
  a 2-column grid.
- Product cards: on hover the card lifts 12px with a soft shadow and the
  second product image cross-fades in. Roma cards show a "New" badge.
- Client gallery: images scroll sideways continuously (0.6px/frame) in a
  seamless loop (images are duplicated once); users can still swipe /
  trackpad-scroll it. Disabled for prefers-reduced-motion.

Collection
- Filter popover (All / The Debut / Roma) updates the title, the count
  and the URL (?vol=1 / ?vol=2), and a dot appears on the Filter button.
- Sort popover: Featured, Name A–Z, Price low→high, Price high→low
  ("Price on request" pieces sort last).
- Grid toggle: 4 or 2 columns (desktop).
- Card hover: lift 6px + second image fade.

Product pages
- Gallery: two images side by side (one on small screens); arrows and
  thumbnails move through the images (and the video on Roma pieces,
  which autoplays muted in the gallery). Active thumbnail gets a gold
  border.
- Lightbox: click an image or the expand button to open it full screen;
  click to zoom 2.4x, drag to pan, click again to reset; click the
  backdrop, ✕ or Esc to close. Videos open with player controls.
- Size Chart: opens images/size-chart.webp in the same lightbox.
- Option pills (Item / Size / Fabric) highlight the selection. Price
  updates live: Debut = item price + PKR 10,000 for Pure Raw Silk on the
  shirt (+5,000 on culottes/shalwar); Serein = fabric price. Roma pieces
  swap the fabric label with the item (Dupatta → Net Organza).
- Quantity stepper (min 1).
- "Add to Enquiry List": requires a size (shows a red inline error and
  turns the Size label red if missing), adds the configured item and
  opens the Enquiry list dropdown.
- Accordions: Description (open by default), Disclaimer (Roma),
  Exchange Policy — chevron rotates on toggle.

PLACEHOLDER / SAMPLE CONTENT TO REPLACE WITH SHOPIFY DATA
---------------------------------------------------------
- Products: all 11 names, descriptions, spec lists (Size / Cut / Fabric
  …), images and videos are hard-coded in each page and in
  js/catalog.js → map to Shopify products, product.media, metafields.
- Prices (PKR, sample): Mist Green 65,000; Onyx Black 55,000; Rose Pink
  65,000; Ruby Red 65,000; Silver Sage 75,000; Serein from 100,000;
  Culottes / Shalwar 10,000; silk upgrade +10,000 / +5,000. Roma pieces
  "Price on request". Prices live in data-price / data-silk-extra
  attributes on the option buttons → replace with variant prices.
- Options (Item / Size / Fabric) → Shopify product options / variants.
- SKU line "AURÉ-VOL1-000-XS" is the same placeholder on every Debut
  product → use variant.sku.
- "Delivery 4–5 Weeks", "New" badges, "View Look Book" tag (no action
  yet), "Roma — Out now", "Occasion Wear ’26" → section settings.
- Collections "The Debut" (Vol. 1) and "Roma" (Vol. 2) → Shopify
  collections; collection.html filtering → collection filters / URLs.
- Enquiry list + WhatsApp hand-off (js/enquiry-cart.js) is a stand-in
  for a real cart → Shopify cart (/cart/add.js) and checkout.
- Wishlist and search are client-side only (localStorage / catalog.js)
  → a wishlist app and Shopify predictive search.
- Exchange Policy and Disclaimer text → Shopify policies or a page.
- Contact details (email, WhatsApp +92 321 8955558, Instagram
  @aure_officiall) are the brand's public contact links, used in the
  drawer, contact cards, FAB and WhatsApp message → theme settings.
- Founders copy/photos and client gallery images → section blocks.

SECURITY
--------
No API keys, tokens, passwords, analytics IDs or private form endpoints
are included. The only outbound links are public mailto:, wa.me and
instagram.com links. There are no forms that post data anywhere.
