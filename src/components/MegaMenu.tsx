import React, { useEffect, useRef, useState } from 'react';
import logoFallback from '../assets/Impress-Print-Concepts-LOGO.png';
import promoBusinessCards from '../assets/products/folders_top_sellers.jpg';
import promoMarketing from '../assets/banners/brochure_marketing.jpg';
import promoSigns from '../assets/products/corrugated_boards_signs.jpg';
import promoInvitations from '../assets/products/door_hangers_marketing.jpg';
import promoStickers from '../assets/products/stiickers_roll_labels_carousel.jpg';
import promoGifts from '../assets/products/holiday_mug.png';
import promoApparel from '../assets/products/holiday_tshirt.jpg';
import promoBusiness from '../assets/banners/trifecta_stationery_thin.jpg';
import promoServices from '../assets/products/letterhead_top_seller.jpg';
import promoAll from '../assets/banners/holiday_gifts_homepage_gp.jpg';

interface MegaMenuProps {
  category: string | null;
  visible: boolean;
  activeCategoryElement: HTMLElement | null;
  onNavigateToCategory: (slug: string) => void;
  onClose?: () => void;
  onCancelClose?: () => void;
}

// Lightweight content map inspired by the provided attachments.
const CONTENT: Record<string, { cols: Array<{ title?: string; items: string[] }>; promo?: { img?: string; title?: string; desc?: string; link?: string } }> = {
  'business-cards': {
    cols: [
      { title: 'Popular', items: ['Glossy', 'Uncoated', 'Magnet'] },
      { title: 'Premium Papers', items: ['Matte', 'Kraft', 'Linen'] },
      { title: 'Ultra Premium Papers', items: ['Smooth White', 'Premium Pearl'] },
      { title: 'Add-Ons', items: ['Round Corners', 'Spot UV', 'Foil'] },
    ],
    promo: { img: promoBusinessCards, title: 'Best Offer: Business Cards', desc: 'Size 2" x 3.5", full color front only.', link: '/products/business-cards' }
  },
  'marketing-stationery': {
    cols: [
      { title: 'Marketing Materials', items: ['Booklets', 'Bookmarks', 'Brochures', 'Business Cards', 'Calendars'] },
      { title: 'Stationery', items: ['Blank Letterheads', 'Letterheads', 'Notepads', 'Calendars'] },
      { title: 'Postcards & Posters', items: ['Postcards', 'Posters', 'Rack Cards'] },
      { title: 'Mailing', items: ['Every Door Direct Mail', 'Mailing Services'] }
    ],
    promo: { img: promoMarketing, title: 'Free Sample Kit', desc: 'Explore our popular paper stocks for easy comparison.', link: '/sample-kit' }
  },
  'signs-banners': {
    cols: [
      { title: 'Banners', items: ['Banners', 'Retractable Banners', 'Table Top Retractable'] },
      { title: 'Posters', items: ['Bulk Posters', 'Large Format Posters'] },
      { title: 'Rigid Signs', items: ['Acrylic Boards', 'Aluminum Boards', 'Corrugated Boards'] },
      { title: 'Window Signage', items: ['Window Clings', 'Window Decals'] }
    ],
    promo: { img: promoSigns, title: 'Custom Yard Signs', desc: 'Capture attention with popular 12" x 18" outdoor signs.', link: '/products/signs' }
  },
  'invitations-events': {
    cols: [
      { title: 'Invitation Cards', items: ['Greeting Cards', 'Postcards', 'Thank You Cards'] },
      { title: 'Envelopes', items: ['Blank Envelopes', 'Custom Envelopes', 'Logo Envelopes'] },
      { title: 'Event', items: ['Baby Shower', 'Birth Announcement', 'Gender Reveal'] },
      { title: 'Wedding', items: ['Bridal Shower', 'Engagement', 'Rehearsal Dinner'] }
    ],
    promo: { img: promoInvitations, title: 'Wedding Postcard Invitations', desc: "Design & print 5' x 7' wedding invitations on 16 pt.", link: '/products/invitations' }
  },
  'stickers-labels': {
    cols: [
      { title: 'Roll Label Shapes', items: ['Rectangle', 'Square', 'Circle', 'Oval'] },
      { title: 'Sticker Shapes', items: ['Circle Stickers', 'Half Circle', 'Leaf Stickers'] },
      { title: 'Templates', items: ['Address Labels', 'Beer Bottle Labels', 'Birthday Labels'] },
      { title: 'Materials', items: ['White Vinyl', 'Clear BOPP', 'Silver Foil'] }
    ],
    promo: { img: promoStickers, title: 'Branding with Roll Labels', desc: 'Customize packaging, bottles, & bags.', link: '/products/stickers' }
  },
  'gifts-decor': {
    cols: [
      { title: 'Photo Gifts', items: ['Mouse Pads', 'Mugs', 'Photo Books'] },
      { title: 'Wall Prints', items: ['Canvas Prints', 'Framed Prints', 'Metal Wall Prints'] },
      { title: 'Home Decor', items: ['Pillows', 'Wall Art'] },
      { title: 'Shop All Gifts', items: ['Custom Gifts', 'Christmas Prints & Gifts'] }
    ],
    promo: { img: promoGifts, title: 'Custom Ceramic Mugs', desc: 'Create a personal mug by adding photos, logos, & text.', link: '/products/gifts' }
  },
  'apparel': {
    cols: [
      { title: 'T-Shirts', items: ['White', 'Black', 'Red', 'Blue'] },
      { title: 'Sweatshirts', items: ['Crewneck', 'Hoodie', 'Full Zip Hoodie'] },
      { title: 'Polos', items: ['White', 'Black', 'Royal Blue'] },
      { title: 'Hats', items: ['White', 'Black', 'Red'] }
    ],
    promo: { img: promoApparel, title: 'Custom T-Shirts', desc: 'Upload a design to get started. No minimums.', link: '/products/apparel' }
  },
  'business': {
    cols: [
      { title: 'Design Services', items: ['Business Cards', 'Postcards', 'Envelopes'] },
      { title: 'Mailing', items: ['4 x 6 Postcards', '5 x 7 Postcards'] },
      { title: 'Packages', items: ['Direct Marketing Packages', 'Mailing Services'] },
      { title: 'Other', items: ['Print Brokers', 'Free Sample Kit'] }
    ],
    promo: { img: promoBusiness, title: 'Business Card Design Services', desc: 'In-house design team, packages starting at $39.', link: '/services/design' }
  },
  'services': {
    cols: [
      { title: 'Services', items: ['Design Services', 'Mailing Services', 'Printing Services'] },
      { title: 'Direct Mail', items: ['EDDM Services', 'Mailing Packages'] },
      { title: 'Production', items: ['Large Format', 'Bindery', 'Fulfillment'] },
      { title: 'Support', items: ['Sample Kit', 'Account Management'] }
    ],
    promo: { img: promoServices, title: 'Business Card Design Services', desc: 'Looking to re-vamp your business card design?', link: '/services' }
  },
  'all': {
    cols: [
      { title: 'Top Categories', items: ['Business Cards', 'Marketing & Stationery', 'Signs & Banners', 'Invitations & Events'] },
      { title: 'Popular', items: ['Stickers & Labels', 'Gifts & Décor', 'Apparel', 'Services'] },
      { title: 'Support', items: ['Free Kit', 'About Us', 'Contact'] },
      { title: 'All Products', items: ['Browse All Products'] }
    ],
    promo: { img: promoAll, title: 'Explore All Products', desc: 'Browse our entire catalog of printing products.', link: '/products' }
  }
};

export default function MegaMenu({ category, visible, activeCategoryElement, onNavigateToCategory, onClose, onCancelClose }: MegaMenuProps) {
  if (!category) return null;
  const data = CONTENT[category] || CONTENT['all'];
  const containerClasses = `mega-menu absolute left-0 right-0 z-50 px-4 mt-2 transition-all duration-200 ease-in-out rounded-2xl border border-yellow-100 bg-white ${
    visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
  }`;
  const gridClasses = `grid grid-cols-4 gap-2 p-4`; // Reduced gap to match 8px requirement
  const itemBtn = `text-left text-xs text-brown-700 hover:text-brown-900 px-0 py-1 rounded transition-colors hover:bg-yellow-50 focus:outline-none focus:ring-1 focus:ring-yellow-300 w-full`;
  const [arrowPosition, setArrowPosition] = useState<number>(0);

  // Calculate arrow position when active category element changes
  useEffect(() => {
    if (activeCategoryElement && visible) {
      const rect = activeCategoryElement.getBoundingClientRect();
      const parentRect = activeCategoryElement.parentElement?.getBoundingClientRect();
      if (parentRect) {
        const relativeLeft = rect.left - parentRect.left + rect.width / 2 - 6; // 6px is half of arrow width
        setArrowPosition(relativeLeft);
      }
    }
  }, [activeCategoryElement, visible]);

  return (
    <>
      {visible && (
        <div 
          className="category-arrow"
          style={{ 
            left: `${arrowPosition}px`,
            display: activeCategoryElement ? 'block' : 'none'
          }}
        />
      )}
      <div
        className={containerClasses}
        role="region"
        aria-hidden={!visible}
        onMouseEnter={onCancelClose}
        onMouseLeave={onClose}
      >
        <div className={gridClasses}>
          <div className="col cols-scroll smooth-scroll">
            {data.cols.slice(0, 2).map((col, idx) => (
              <div key={idx} className="mb-3">
                {col.title && <h4 className="heading-tertiary">{col.title}</h4>}
                <ul>
                  {col.items.map((it) => (
                    <li key={it}>
                      <button className={itemBtn} onClick={() => onNavigateToCategory(category)}>
                        {it}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="col cols-scroll smooth-scroll">
            {data.cols.slice(2, 4).map((col, idx) => (
              <div key={idx} className="mb-3">
                {col.title && <h4 className="heading-tertiary">{col.title}</h4>}
                <ul>
                  {col.items.map((it) => (
                    <li key={it}>
                      <button className={itemBtn} onClick={() => onNavigateToCategory(category)}>
                        {it}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="promo col" style={{ gridColumn: 'span 2' }}>
            {data.promo && (
              <div className="rounded-xl border border-yellow-100 bg-white/80 shadow-sm p-3 transition-all duration-200 hover:shadow-md">
                <img
                  className="w-full rounded-xl transition-transform duration-200 hover:scale-[1.02]"
                  style={{ aspectRatio: '4 / 1' }}
                  src={data.promo.img}
                  alt="Promo image"
                  width={800}
                  height={200}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width:1024px) 800px, 100vw"
                  srcSet={`${(data.promo.img as string)} 800w`}
                  onError={(e) => {
                    const t = e.currentTarget as HTMLImageElement;
                    if (t.dataset.fallbackApplied !== 'true') {
                      t.src = logoFallback;
                      t.dataset.fallbackApplied = 'true';
                    }
                  }}
                />
                <h3 className="heading-secondary mt-2">{data.promo.title}</h3>
                <p className="body-text mt-1 text-xs text-brown-600">{data.promo.desc}</p>
                <div className="mt-2">
                  <button onClick={() => onNavigateToCategory(category)} className="px-3 py-1.5 rounded-full bg-brown-900 text-yellow-500 font-heading font-semibold hover:bg-brown-800 transition-colors text-sm">Shop Now →</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
