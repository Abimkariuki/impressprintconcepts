export type CatalogProduct = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  materials?: string[];
  sizes?: string[];
  finishes?: string[];
  priceUnit?: string;
  category: string;
};

export const categoryData: Record<string, { name: string; description: string; icon: string; products: CatalogProduct[] }> = {
  "signs-banners": {
    name: "Banners & Signs",
    description: "Professional banners and signage solutions for indoor and outdoor use",
    icon: "🏷️",
    products: [
      { id: 1, name: "Pull-Up Banner", price: 650, image: "https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?w=400&h=300&fit=crop", description: "Portable retractable banner stand perfect for trade shows and events", materials: ["Vinyl", "Fabric"], sizes: ["33\"x81\"", "47\"x81\""], finishes: ["Matte", "Gloss"], priceUnit: "per meter", category: "signs-banners" },
      { id: 2, name: "PVC Banner", price: 550, image: "https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?w=400&h=300&fit=crop", description: "Durable PVC banner for outdoor advertising and events", materials: ["PVC"], sizes: ["2ft×4ft", "3ft×6ft", "4ft×8ft", "Custom"], finishes: ["Matte", "Gloss"], priceUnit: "per meter", category: "signs-banners" }
    ]
  },
  "stickers-labels": {
    name: "Stickers & Labels",
    description: "Custom stickers and labels for products, branding, and decoration",
    icon: "🏷️",
    products: [
      { id: 3, name: "Vinyl Stickers", price: 600, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop", description: "Weather-resistant vinyl stickers for indoor and outdoor use", materials: ["Vinyl"], sizes: ["2\"×2\"", "3\"×3\"", "4\"×4\"", "Custom"], finishes: ["Gloss", "Matte", "Clear"], category: "stickers-labels" },
      { id: 8, name: "Roll Labels", price: 700, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop", description: "Convenient labels supplied on rolls for easy application", materials: ["Paper", "BOPP"], sizes: ["1\"×2\"", "2\"×3\"", "Custom"], finishes: ["Matte", "Gloss"], category: "stickers-labels" }
    ]
  },
  "business-cards": {
    name: "Business Cards",
    description: "Professional cards with premium and textured stocks",
    icon: "💼",
    products: [
      { id: 4, name: "Premium Business Cards", price: 950, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", description: "High-quality business cards with various finishing options", materials: ["Paper", "Cardstock"], sizes: ["Standard", "Square"], finishes: ["Matte", "Gloss", "Spot UV", "Foil"], category: "business-cards" },
      { id: 9, name: "Textured Linen Cards", price: 1200, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", description: "Elegant linen texture for a refined tactile feel", materials: ["Cardstock"], sizes: ["Standard"], finishes: ["Matte", "Foil"], category: "business-cards" }
    ]
  },
  "marketing-stationery": {
    name: "Marketing & Stationery",
    description: "Brochures, letterheads and office stationery",
    icon: "📄",
    products: [
      { id: 10, name: "Tri‑Fold Brochures", price: 900, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", description: "Handy brochures for product and service overviews", materials: ["Paper"], sizes: ["A4", "Letter"], finishes: ["Gloss", "Matte"], category: "marketing-stationery" },
      { id: 11, name: "Company Letterheads", price: 800, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", description: "Branded letterheads for professional correspondence", materials: ["Paper"], sizes: ["A4"], finishes: ["Matte"], category: "marketing-stationery" }
    ]
  },
  "invitations-events": {
    name: "Invitations & Events",
    description: "Cards and envelopes for special occasions",
    icon: "🎉",
    products: [
      { id: 12, name: "Invitation Cards", price: 700, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop", description: "Personalized invitations in popular sizes", materials: ["Cardstock"], sizes: ["5x7"], finishes: ["Matte", "Gloss"], category: "invitations-events" },
      { id: 13, name: "Thank You Cards", price: 650, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop", description: "Simple cards to show appreciation", materials: ["Cardstock"], sizes: ["A6"], finishes: ["Matte"], category: "invitations-events" }
    ]
  },
  "gifts-decor": {
    name: "Gifts & Décor",
    description: "Personalized gifts and decorative prints",
    icon: "🎁",
    products: [
      { id: 14, name: "Custom Mugs", price: 800, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop", description: "Ceramic mugs with photo or logo prints", materials: ["Ceramic"], sizes: ["Standard"], finishes: ["Sublimation"], category: "gifts-decor" },
      { id: 15, name: "Canvas Prints", price: 1200, image: "https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?w=400&h=300&fit=crop", description: "Ready-to-hang canvas wall art", materials: ["Canvas"], sizes: ["12x16", "16x20"], finishes: ["Matte"], category: "gifts-decor" }
    ]
  },
  "apparel": {
    name: "Apparel",
    description: "Custom garments for teams and promotions",
    icon: "👕",
    products: [
      { id: 16, name: "T‑Shirts", price: 750, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop", description: "Printed tees with durable inks", materials: ["Cotton"], sizes: ["S", "M", "L", "XL"], finishes: ["DTF", "Sublimation"], category: "apparel" },
      { id: 17, name: "Hoodies", price: 1350, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop", description: "Warm hoodies branded with your design", materials: ["Fleece"], sizes: ["S", "M", "L", "XL"], finishes: ["DTF"], category: "apparel" }
    ]
  },
  "business": {
    name: "Business",
    description: "Design packages and sample kits",
    icon: "🏢",
    products: [
      { id: 18, name: "Card Design Package", price: 1500, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", description: "Professional business card design", materials: ["Digital"], sizes: ["N/A"], finishes: ["N/A"], category: "business" },
      { id: 19, name: "Sample Kit", price: 500, image: "https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?w=400&h=300&fit=crop", description: "Free kit of paper and finish samples", materials: ["Mixed"], sizes: ["Assorted"], finishes: ["Various"], category: "business" }
    ]
  },
  "services": {
    name: "Services",
    description: "Design & Branding services",
    icon: "🛠️",
    products: [
      { id: 20, name: "Logo Design Package", price: 2500, image: "https://images.unsplash.com/photo-1545235617-9465d2a5569c?w=400&h=300&fit=crop", description: "Professional logo concepts with revisions", materials: ["Digital"], sizes: ["N/A"], finishes: ["N/A"], category: "services" },
      { id: 21, name: "Brand Identity Toolkit", price: 4500, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop", description: "Color palette, typography, usage guide", materials: ["Digital"], sizes: ["N/A"], finishes: ["N/A"], category: "services" },
      { id: 22, name: "Social Media Branding Kit", price: 2000, image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=300&fit=crop", description: "Profile, cover, post templates", materials: ["Digital"], sizes: ["N/A"], finishes: ["N/A"], category: "services" },
      { id: 23, name: "Stationery Design", price: 1500, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", description: "Business cards, letterheads, envelopes", materials: ["Digital"], sizes: ["A4", "Standard"], finishes: ["Print-ready"], category: "services" }
    ]
  }
};

export function getAllProducts(): CatalogProduct[] {
  return Object.values(categoryData).flatMap((c) => c.products);
}
