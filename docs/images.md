Image assets used in dropdown (MegaMenu) and their paths:

- Business Cards promo: `src/assets/products/folders_top_sellers.jpg`
- Marketing & Stationery promo: `src/assets/banners/brochure_marketing.jpg`
- Signs & Banners promo: `src/assets/products/corrugated_boards_signs.jpg`
- Invitations & Events promo: `src/assets/products/door_hangers_marketing.jpg`
- Stickers & Labels promo: `src/assets/products/stiickers_roll_labels_carousel.jpg`
- Gifts & Décor promo: `src/assets/products/holiday_mug.png`
- Apparel promo: `src/assets/products/holiday_tshirt.jpg`
- Business promo: `src/assets/banners/trifecta_stationery_thin.jpg`
- Services promo: `src/assets/products/letterhead_top_seller.jpg`
- All Products promo: `src/assets/banners/holiday_gifts_homepage_gp.jpg`

Naming conventions:
- Use lowercase words separated by underscores.
- Prefer descriptive, category-related names.
- File types: PNG/JPG as appropriate; SVG for vector icons.
- Store category promos under `src/assets/products/` or `src/assets/banners/`.

Fallback:
- Logo fallback image: `src/assets/Impress-Print-Concepts-LOGO.png` applied via `onError` in MegaMenu.
Responsive sizing strategy
- HTML attributes: set `width`/`height` to preserve aspect ratio in layout.
- CSS: use `max-width: 100%; height: auto;` for fluid scaling.
- Use `style={{ aspectRatio: 'W / H' }}` when container needs ratio control.
- Add `loading="lazy"` and `decoding="async"` to defer offscreen images.
- Provide `sizes` and `srcset` for responsive delivery when variants exist.

Performance and caching
- Prefer optimized PNG/JPG; add WebP variants when available.
- Serve with `Cache-Control: public, max-age=604800` and ETag.
- Keep web images <200KB where possible; high-res app assets <1MB.
