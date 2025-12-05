import { useState, useEffect } from "react";
import { formatPrice, type CurrencyCode } from "../lib/utils";
import MobileFilters from "./MobileFilters";

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

interface ShopProps {
  onCategoryClick?: (category: string) => void;
  onProductClick?: (product: any) => void;
  currency?: CurrencyCode;
}

export default function Shop({ onProductClick, currency = 'KSH' }: ShopProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [selectedUseCase, setSelectedUseCase] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState<string>('popularity');

  const categories = [
    { name: "All Products", slug: "all", icon: "🧭", description: "Browse our full catalog", productCount: 200 },
    { name: "Business Cards", slug: "business-cards", icon: "💼", description: "Standard, premium, textured stocks", productCount: 30 },
    { name: "Marketing & Stationery", slug: "marketing-stationery", icon: "📄", description: "Brochures, letterheads, notepads", productCount: 40 },
    { name: "Signs & Banners", slug: "signs-banners", icon: "🖼️", description: "Retractable, PVC, mesh, window graphics", productCount: 35 },
    { name: "Invitations & Events", slug: "invitations-events", icon: "🎉", description: "Greeting cards, invitations, envelopes", productCount: 28 },
    { name: "Stickers & Labels", slug: "stickers-labels", icon: "🏷️", description: "Roll labels, vinyl, clear, foil", productCount: 36 },
    { name: "Gifts & Décor", slug: "gifts-decor", icon: "🎁", description: "Mugs, canvas prints, framed art", productCount: 22 },
    { name: "Apparel", slug: "apparel", icon: "👕", description: "T‑shirts, hoodies, polos, hats", productCount: 32 },
    { name: "Business", slug: "business", icon: "🏢", description: "Design packages, sample kits", productCount: 10 },
    { name: "Services", slug: "services", icon: "🛠️", description: "Design & Branding services", productCount: 12 }
  ];

  const products = [
    { id: 1, name: "Standard Business Cards", category: "business-cards", price: 1250, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", material: "Paper", size: "Standard", finish: "Matte", useCase: "Corporate", rating: 4.9, reviews: 234 },
    { id: 2, name: "Retractable Banner", category: "signs-banners", price: 4250, image: "https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?w=400&h=300&fit=crop", material: "Vinyl", size: "Custom", finish: "Gloss", useCase: "Outdoor", rating: 4.8, reviews: 156 },
    { id: 3, name: "Custom T-Shirt", category: "apparel", price: 750, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop", material: "Fabric", size: "Standard", finish: "Sublimation", useCase: "Events", rating: 4.7, reviews: 89 },
    { id: 4, name: "Vinyl Stickers", category: "stickers-labels", price: 600, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop", material: "Vinyl", size: "A4", finish: "Gloss", useCase: "Indoor", rating: 4.6, reviews: 312 },
    { id: 5, name: "Tri-Fold Brochures", category: "marketing-stationery", price: 1750, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", material: "Paper", size: "A4", finish: "Gloss", useCase: "Retail", rating: 4.8, reviews: 178 },
    { id: 6, name: "Ceramic Mug Print", category: "gifts-decor", price: 1150, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop", material: "Ceramic", size: "Standard", finish: "Sublimation", useCase: "Corporate", rating: 4.6, reviews: 210 },
    { id: 7, name: "Invitation Cards", category: "invitations-events", price: 950, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop", material: "Cardstock", size: "5x7", finish: "Matte", useCase: "Events", rating: 4.7, reviews: 120 }
  ];

  const materials = ["All", "PVC", "Vinyl", "Paper", "Fabric", "Metal", "Acrylic", "Canvas"];
  const sizes = ["All", "A4", "A3", "2ft×6ft", "Custom"];
  const finishes = ["All", "Gloss", "Matte", "Laminated", "Embossed"];
  const useCases = ["All", "Indoor", "Outdoor", "Corporate", "Events", "Retail"];
  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" }
  ];

  const sampleImages = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11];

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (selectedMaterial !== 'all' && product.material.toLowerCase() !== selectedMaterial.toLowerCase()) return false;
    if (selectedSize !== 'all' && product.size.toLowerCase() !== selectedSize.toLowerCase()) return false;
    if (selectedFinish !== 'all' && product.finish.toLowerCase() !== selectedFinish.toLowerCase()) return false;
    if (selectedUseCase !== 'all' && product.useCase.toLowerCase() !== selectedUseCase.toLowerCase()) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });

  useEffect(() => {
    try {
      localStorage.setItem('catalogSnapshot', JSON.stringify(filteredProducts));
    } catch {}
  }, [filteredProducts]);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-brown-900 mb-4">
            Our Premium Collection
          </h1>
          <p className="text-xl text-brown-700 max-w-3xl mx-auto">
            Discover our wide range of professional printing solutions crafted with precision and creativity
          </p>
        </div>

        {/* Desktop Filters - Hidden on mobile */}
        <div className="hidden lg:block bg-white rounded-2xl border-2 border-yellow-200 p-4 shadow-sm -mt-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-brown-800 font-semibold">Category</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brown-800 font-semibold">Material</span>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="px-3 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
              >
                {materials.map((material) => (
                  <option key={material} value={material.toLowerCase()}>
                    {material}
                  </option>
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
                {sizes.map((size) => (
                  <option key={size} value={size.toLowerCase()}>
                    {size}
                  </option>
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
                {finishes.map((finish) => (
                  <option key={finish} value={finish.toLowerCase()}>
                    {finish}
                  </option>
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
              <span className="text-brown-800 font-medium">{formatPrice(priceRange[1], currency)}</span>
            </div>
          </div>
        </div>

        {/* Mobile Filters Component */}
        <MobileFilters
          selectedCategory={selectedCategory}
          categories={categories}
          selectedMaterial={selectedMaterial}
          materials={materials}
          selectedSize={selectedSize}
          sizes={sizes}
          selectedFinish={selectedFinish}
          finishes={finishes}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setSelectedCategory={setSelectedCategory}
          setSelectedMaterial={setSelectedMaterial}
          setSelectedSize={setSelectedSize}
          setSelectedFinish={setSelectedFinish}
          onApply={() => {
            // Filters are applied automatically through state updates
          }}
          onReset={() => {
            setPriceRange([0, 50000]);
          }}
          currency={currency}
        />

        {/* Main Content */}
        <div className="mt-6">
          {/* Sort and Results */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-brown-700 font-medium">
              Showing {filteredProducts.length} products
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  Sort by {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, idx) => {
              const img = sampleImages[idx % sampleImages.length];
              const prod = { ...product, image: img };
              return (
                <div
                  key={prod.id}
                  onClick={() => onProductClick?.(prod)}
                  className="group bg-white rounded-3xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 border-2 border-yellow-200 hover:border-yellow-400 cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={img}
                      alt={`${prod.name} preview`}
                      className="w-full object-cover group-hover:scale-110 transition-transform duration-300"
                      style={{ aspectRatio: '4 / 3' }}
                      width={400}
                      height={300}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 100vw"
                      srcSet={`${img} 400w`}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-brown-900 text-yellow-500 px-3 py-1 rounded-full text-sm font-bold">
                        {formatPrice(prod.price, currency)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-artistic font-bold text-brown-900 mb-2 group-hover:text-brown-700 transition-colors">
                      {prod.name}
                    </h3>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-brown-600 text-sm ml-2">({prod.reviews})</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-yellow-100 text-brown-900 px-2 py-1 rounded-full text-xs font-semibold">
                        {prod.material}
                      </span>
                      <span className="bg-yellow-100 text-brown-900 px-2 py-1 rounded-full text-xs font-semibold">
                        {prod.finish}
                      </span>
                    </div>
                    
                    <button className="w-full bg-yellow-500 text-brown-900 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg btn-artistic">
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-artistic font-bold text-brown-900 mb-4">No products found</h3>
              <p className="text-brown-700 mb-8">Try adjusting your filters to see more results.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedMaterial('all');
                  setSelectedSize('all');
                  setSelectedFinish('all');
                  setSelectedUseCase('all');
                  setPriceRange([0, 50000]);
                }}
                className="bg-yellow-500 text-brown-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all duration-300 btn-artistic"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}