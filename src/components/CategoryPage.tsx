import { formatPrice, type CurrencyCode } from "../lib/utils";
import { useEffect, useState } from "react";
import s1 from "../assets/products/sample products (1).png";
import s2 from "../assets/products/sample products (2).png";
import s3 from "../assets/products/sample products (3).png";
import s4 from "../assets/products/sample products (4).png";
import s5 from "../assets/products/sample products (5).png";
import s6 from "../assets/products/sample products (6).png";
import s7 from "../assets/products/sample products (7).png";
import s8 from "../assets/products/sample products (8).png";
import s9 from "../assets/products/sample products (9).png";
import s10 from "../assets/products/sample products (10).png";
import s11 from "../assets/products/sample products (11).png";
import MobileFilters from "./MobileFilters";

interface CategoryPageProps {
  category: string;
  onProductClick: (product: any) => void;
  onBackToShop: () => void;
  currency?: CurrencyCode;
}

export default function CategoryPage({ category, onProductClick, onBackToShop, currency = 'KSH' }: CategoryPageProps) {
  const sampleImages = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11];
  const categoryData = {
    "signs-banners": {
      name: "Banners & Signs",
      description: "Professional banners and signage solutions for indoor and outdoor use",
      icon: "🏷️",
      products: [
        {
          id: 1,
          name: "Pull-Up Banner",
          price: 650,
          image: "https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?w=400&h=300&fit=crop",
          description: "Portable retractable banner stand perfect for trade shows and events",
          materials: ["Vinyl", "Fabric"],
          sizes: ["33\"x81\"", "47\"x81\""],
          finishes: ["Matte", "Gloss"],
          priceUnit: "per meter"
        },
        {
          id: 2,
          name: "PVC Banner",
          price: 550,
          image: "https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?w=400&h=300&fit=crop",
          description: "Durable PVC banner for outdoor advertising and events",
          materials: ["PVC"],
          sizes: ["2ft×4ft", "3ft×6ft", "4ft×8ft", "Custom"],
          finishes: ["Matte", "Gloss"],
          priceUnit: "per meter"
        }
      ]
    },
    "stickers-labels": {
      name: "Stickers & Labels",
      description: "Custom stickers and labels for products, branding, and decoration",
      icon: "🏷️",
      products: [
        {
          id: 3,
          name: "Vinyl Stickers",
          price: 600,
          image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
          description: "Weather-resistant vinyl stickers for indoor and outdoor use",
          materials: ["Vinyl"],
          sizes: ["2\"×2\"", "3\"×3\"", "4\"×4\"", "Custom"],
          finishes: ["Gloss", "Matte", "Clear"]
        },
        {
          id: 8,
          name: "Roll Labels",
          price: 700,
          image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
          description: "Convenient labels supplied on rolls for easy application",
          materials: ["Paper", "BOPP"],
          sizes: ["1\"×2\"", "2\"×3\"", "Custom"],
          finishes: ["Matte", "Gloss"]
        }
      ]
    },
    "business-cards": {
      name: "Business Cards",
      description: "Professional cards with premium and textured stocks",
      icon: "💼",
      products: [
        {
          id: 4,
          name: "Premium Business Cards",
          price: 950,
          image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
          description: "High-quality business cards with various finishing options",
          materials: ["Paper", "Cardstock"],
          sizes: ["Standard", "Square"],
          finishes: ["Matte", "Gloss", "Spot UV", "Foil"]
        },
        {
          id: 9,
          name: "Textured Linen Cards",
          price: 1200,
          image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
          description: "Elegant linen texture for a refined tactile feel",
          materials: ["Cardstock"],
          sizes: ["Standard"],
          finishes: ["Matte", "Foil"]
        }
      ]
    },
    "marketing-stationery": {
      name: "Marketing & Stationery",
      description: "Brochures, letterheads and office stationery",
      icon: "📄",
      products: [
        { id: 10, name: "Tri‑Fold Brochures", price: 900, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", description: "Handy brochures for product and service overviews", materials: ["Paper"], sizes: ["A4", "Letter"], finishes: ["Gloss", "Matte"] },
        { id: 11, name: "Company Letterheads", price: 800, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", description: "Branded letterheads for professional correspondence", materials: ["Paper"], sizes: ["A4"], finishes: ["Matte"] }
      ]
    },
    "invitations-events": {
      name: "Invitations & Events",
      description: "Cards and envelopes for special occasions",
      icon: "🎉",
      products: [
        { id: 12, name: "Invitation Cards", price: 700, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop", description: "Personalized invitations in popular sizes", materials: ["Cardstock"], sizes: ["5x7"], finishes: ["Matte", "Gloss"] },
        { id: 13, name: "Thank You Cards", price: 650, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop", description: "Simple cards to show appreciation", materials: ["Cardstock"], sizes: ["A6"], finishes: ["Matte"] }
      ]
    },
    "gifts-decor": {
      name: "Gifts & Décor",
      description: "Personalized gifts and decorative prints",
      icon: "🎁",
      products: [
        { id: 14, name: "Custom Mugs", price: 800, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop", description: "Ceramic mugs with photo or logo prints", materials: ["Ceramic"], sizes: ["Standard"], finishes: ["Sublimation"] },
        { id: 15, name: "Canvas Prints", price: 1200, image: "https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?w=400&h=300&fit=crop", description: "Ready-to-hang canvas wall art", materials: ["Canvas"], sizes: ["12x16", "16x20"], finishes: ["Matte"] }
      ]
    },
    "apparel": {
      name: "Apparel",
      description: "Custom garments for teams and promotions",
      icon: "👕",
      products: [
        { id: 16, name: "T‑Shirts", price: 750, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop", description: "Printed tees with durable inks", materials: ["Cotton"], sizes: ["S", "M", "L", "XL"], finishes: ["DTF", "Sublimation"] },
        { id: 17, name: "Hoodies", price: 1350, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop", description: "Warm hoodies branded with your design", materials: ["Fleece"], sizes: ["S", "M", "L", "XL"], finishes: ["DTF"] }
      ]
    },
    "business": {
      name: "Business",
      description: "Design packages and sample kits",
      icon: "🏢",
      products: [
        { id: 18, name: "Card Design Package", price: 1500, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", description: "Professional business card design", materials: ["Digital"], sizes: ["N/A"], finishes: ["N/A"] },
        { id: 19, name: "Sample Kit", price: 500, image: "https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?w=400&h=300&fit=crop", description: "Free kit of paper and finish samples", materials: ["Mixed"], sizes: ["Assorted"], finishes: ["Various"] }
      ]
    },
    "services": {
      name: "Services",
      description: "Design & Branding services",
      icon: "🛠️",
      products: [
        { id: 20, name: "Logo Design Package", price: 2500, image: "https://images.unsplash.com/photo-1545235617-9465d2a5569c?w=400&h=300&fit=crop", description: "Professional logo concepts with revisions", materials: ["Digital"], sizes: ["N/A"], finishes: ["N/A"] },
        { id: 21, name: "Brand Identity Toolkit", price: 4500, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop", description: "Color palette, typography, usage guide", materials: ["Digital"], sizes: ["N/A"], finishes: ["N/A"] },
        { id: 22, name: "Social Media Branding Kit", price: 2000, image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=300&fit=crop", description: "Profile, cover, post templates", materials: ["Digital"], sizes: ["N/A"], finishes: ["N/A"] },
        { id: 23, name: "Stationery Design", price: 1500, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", description: "Business cards, letterheads, envelopes", materials: ["Digital"], sizes: ["A4", "Standard"], finishes: ["Print-ready"] }
      ]
    }
  };

  const currentCategory = categoryData[category as keyof typeof categoryData];
  const desiredCount = 4;
  const baseProducts = currentCategory ? currentCategory.products : [];
  const displayProducts = baseProducts.length >= desiredCount
    ? baseProducts.slice(0, desiredCount)
    : Array.from({ length: desiredCount }, (_, i) => {
        const src = baseProducts[i % baseProducts.length];
        return {
          ...src,
          id: src.id * 10 + i,
          name: src.name,
        };
      });

  useEffect(() => {
    try {
      localStorage.setItem('catalogSnapshot', JSON.stringify(displayProducts));
    } catch {}
  }, [displayProducts]);

  // Sidebar filter state (similar to Shop)
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);

  // Derive options from products
  const materialOptions = Array.from(new Set((displayProducts || []).flatMap((p: any) => p.materials || [])));
  const sizeOptions = Array.from(new Set((displayProducts || []).flatMap((p: any) => p.sizes || [])));
  const finishOptions = Array.from(new Set((displayProducts || []).flatMap((p: any) => p.finishes || [])));

  const filteredDisplayProducts = displayProducts.filter((p: any) => {
    if (selectedMaterial !== 'all' && !(p.materials || []).map((m: string) => m.toLowerCase()).includes(selectedMaterial.toLowerCase())) return false;
    if (selectedSize !== 'all' && !(p.sizes || []).map((s: string) => s.toLowerCase()).includes(selectedSize.toLowerCase())) return false;
    if (selectedFinish !== 'all' && !(p.finishes || []).map((f: string) => f.toLowerCase()).includes(selectedFinish.toLowerCase())) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    return true;
  });


  if (!currentCategory) {
    return (
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-brown-900 mb-4">Category Not Found</h2>
          <button
            onClick={onBackToShop}
            className="bg-yellow-500 text-brown-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all duration-300"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb moved to PageTitleBar */}
        
        {/* Header removed: icon and description are shown in PageTitleBar above */}
        
        {/* Desktop Filters - Hidden on mobile */}
        <div className="hidden lg:block bg-white rounded-2xl border-2 border-yellow-200 p-4 shadow-sm -mt-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-brown-800 font-semibold">Material</span>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="px-3 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
              >
                <option value="all">All</option>
                {materialOptions.map((m) => (
                  <option key={m} value={m.toLowerCase()}>{m}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brown-800 font-semibold">Size</span>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="px-3 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
              >
                <option value="all">All</option>
                {sizeOptions.map((s) => (
                  <option key={s} value={s.toLowerCase()}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brown-800 font-semibold">Finish</span>
              <select
                value={selectedFinish}
                onChange={(e) => setSelectedFinish(e.target.value)}
                className="px-3 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
              >
                <option value="all">All</option>
                {finishOptions.map((f) => (
                  <option key={f} value={f.toLowerCase()}>{f}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-brown-800 font-semibold">Max Price</span>
              <input
                type="range"
                min="0"
                max="50000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-40 h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-brown-800 font-medium">{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        </div>

        {/* Mobile Filters Component */}
        <MobileFilters
          selectedCategory="all"
          categories={[]}
          selectedMaterial={selectedMaterial}
          materials={materialOptions}
          selectedSize={selectedSize}
          sizes={sizeOptions}
          selectedFinish={selectedFinish}
          finishes={finishOptions}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setSelectedCategory={() => {}}
          setSelectedMaterial={setSelectedMaterial}
          setSelectedSize={setSelectedSize}
          setSelectedFinish={setSelectedFinish}
          onApply={() => {
            // Filters are applied automatically through state updates
          }}
          onReset={() => {
            setSelectedMaterial('all');
            setSelectedSize('all');
            setSelectedFinish('all');
            setPriceRange([0, 50000]);
          }}
          currency={currency}
        />

        {/* Products Grid */}
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredDisplayProducts.map((product, idx) => (
              <div
                key={product.id}
                onClick={() => onProductClick({ ...product, image: sampleImages[idx % sampleImages.length] })}
                className="group bg-white rounded-3xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 border-2 border-yellow-200 hover:border-yellow-400 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={sampleImages[idx % sampleImages.length]}
                    alt={`${product.name} preview`}
                    className="w-full object-cover group-hover:scale-110 transition-transform duration-300"
                    style={{ aspectRatio: '4 / 3' }}
                    width={400}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 100vw"
                    srcSet={`${sampleImages[idx % sampleImages.length]} 400w`}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
                  />
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="bg-brown-800 text-yellow-400 px-4 py-2 rounded-full text-lg font-bold">
                      {formatPrice(product.price, currency)}
                    </span>
                    {('priceUnit' in product) && product.priceUnit === 'per meter' && (
                      <span className="bg-black/50 text-yellow-300 px-2 py-1 rounded-full text-xs font-semibold">
                        per meter
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-artistic font-bold text-brown-900 mb-2 group-hover:text-brown-700 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(product.materials || []).length > 0 && (
                      <span className="bg-yellow-100 text-brown-900 px-2 py-1 rounded-full text-xs font-semibold">
                        {(product.materials || []).join(", ")}
                      </span>
                    )}
                    {(product.finishes || []).length > 0 && (
                      <span className="bg-yellow-100 text-brown-900 px-2 py-1 rounded-full text-xs font-semibold">
                        {(product.finishes || []).join(", ")}
                      </span>
                    )}
                  </div>
                  <button className="w-full bg-yellow-500 text-brown-900 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Shop */}
        <div className="text-center mt-16">
          <button
            onClick={onBackToShop}
            className="bg-brown-800 text-yellow-400 px-8 py-4 rounded-full font-bold hover:bg-brown-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            ← Back to All Categories
          </button>
        </div>
      </div>
    </div>
  );
}