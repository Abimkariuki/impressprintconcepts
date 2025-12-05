import { useState } from "react";
import { toast } from "sonner";
import { formatPrice, type CurrencyCode } from "../lib/utils";
import { recordEvent } from "../lib/ab";

interface ProductPageProps {
  product: any;
  onAddToCart: (item: any) => void;
  onBackToCategory: () => void;
  currency?: CurrencyCode;
}

export default function ProductPage({ product, onAddToCart, onBackToCategory, currency = 'KSH' }: ProductPageProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "Standard");
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials?.[0] || "Paper");
  const [selectedFinish, setSelectedFinish] = useState(product.finishes?.[0] || "Matte");
  const [quantity, setQuantity] = useState(1);
  const [orientation, setOrientation] = useState<'Horizontal' | 'Vertical'>('Horizontal');
  const [artworkFrontFile, setArtworkFrontFile] = useState<File | null>(null);
  const [artworkBackFile, setArtworkBackFile] = useState<File | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [customDesign, setCustomDesign] = useState(false);

  const basePrice = product.price || 25;
  
  // Calculate dynamic price based on selections
  const calculatePrice = () => {
    let price = basePrice;
    
    // Material pricing
    if (selectedMaterial === "Metal") price *= 2.5;
    else if (selectedMaterial === "Acrylic") price *= 2.0;
    else if (selectedMaterial === "Vinyl") price *= 1.5;
    else if (selectedMaterial === "Cardstock") price *= 1.2;
    
    // Finish pricing
    if (selectedFinish === "Foil") price *= 2.0;
    else if (selectedFinish === "Spot UV") price *= 1.5;
    else if (selectedFinish === "Embossed") price *= 1.3;
    else if (selectedFinish === "Laminated") price *= 1.2;
    
    // Size pricing
    if (selectedSize === "A3") price *= 1.5;
    else if (selectedSize === "2ft×6ft") price *= 3.0;
    else if (selectedSize === "Custom") price *= 1.8;
    
    // Quantity discounts
    if (quantity >= 100) price *= 0.7;
    else if (quantity >= 50) price *= 0.8;
    else if (quantity >= 10) price *= 0.9;
    
    return Math.round(price * quantity * 100) / 100;
  };

  const handleAddToCart = () => {
    const cartItem = {
      productId: product.id,
      name: product.name,
      size: selectedSize,
      material: selectedMaterial,
      finish: selectedFinish,
      quantity,
      unitPrice: calculatePrice() / quantity,
      totalPrice: calculatePrice(),
      artworkFrontFile: artworkFrontFile?.name,
      artworkBackFile: artworkBackFile?.name,
      deliveryMethod,
      customDesign
    };
    
    onAddToCart(cartItem);
    toast.success("Added to cart successfully!");
    try { recordEvent('add_to_cart'); } catch {}
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (e.target.id === 'artworkFrontFile') {
      setArtworkFrontFile(file);
      toast.success("Front artwork uploaded successfully!");
    } else if (e.target.id === 'artworkBackFile') {
      setArtworkBackFile(file);
      toast.success("Back artwork uploaded successfully!");
    }
  };

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-brown-600 mb-8">
          <button
            onClick={onBackToCategory}
            className="hover:text-brown-800 transition-colors"
          >
            ← Back to Category
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="space-y-6">
            <div className="relative">
              <img
                src={product.image}
                alt={`${product.name} large preview`}
                className="w-full object-cover rounded-3xl border-4 border-yellow-300"
                style={{ aspectRatio: '4 / 3' }}
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                sizes="(min-width:1024px) 50vw, 100vw"
                srcSet={`${product.image} 800w`}
              />
              <div className="absolute top-6 right-6 bg-brown-800 text-yellow-400 px-6 py-3 rounded-2xl font-bold text-xl">
                {formatPrice(calculatePrice(), currency)}
              </div>
            </div>
            
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-brown-900 mb-4">{product.name}</h1>
              <p className="text-xl text-brown-700 leading-relaxed font-medium">
                {product.description || "High-quality printing solution with professional results and fast turnaround times."}
              </p>
            </div>

            {/* Compact Customization Form */}
            <div className="bg-white rounded-2xl p-6 border-2 border-yellow-200 space-y-5">
              {/* Size */}
              <div>
                <div className="text-brown-800 font-semibold mb-2">Size</div>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-green-400 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {(product.sizes || ["A4", "A3", "Custom"]).map((size: string) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              {/* Orientation */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-brown-800 font-semibold">Orientation</div>
                  <a className="text-blue-600 text-sm hover:underline" href="#">Paper Thickness</a>
                </div>
                <div className="grid grid-cols-2 border-2 border-green-400 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOrientation('Horizontal')}
                    className={`flex items-center gap-2 px-3 py-2 ${orientation==='Horizontal' ? 'bg-green-50' : ''}`}
                  >
                    <span className="inline-block w-3 h-3 bg-green-500"></span>
                    <span>Horizontal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrientation('Vertical')}
                    className={`flex items-center gap-2 px-3 py-2 border-l ${orientation==='Vertical' ? 'bg-green-50' : ''}`}
                  >
                    <span className="inline-block w-3 h-3 bg-gray-300"></span>
                    <span>Vertical</span>
                  </button>
                </div>
              </div>

              {/* Paper */}
              <div>
                <div className="text-brown-800 font-semibold mb-2">Paper</div>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500"
                >
                  <option value="">Please select an option</option>
                  {(product.materials || ["Paper", "Cardstock", "Vinyl"]).map((material: string) => (
                    <option key={material} value={material}>{material}</option>
                  ))}
                </select>
              </div>

              {/* Color / Finish */}
              <div>
                <div className="text-brown-800 font-semibold mb-2">Color / Finish</div>
                <select
                  value={selectedFinish}
                  onChange={(e) => setSelectedFinish(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500"
                >
                  <option value="">Please select an option</option>
                  {(product.finishes || ["Matte", "Gloss", "Laminated"]).map((finish: string) => (
                    <option key={finish} value={finish}>{finish}</option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <div className="text-brown-800 font-semibold mb-2">Quantity</div>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500"
                />
              </div>

              {/* Subtotal Bar */}
              <div className="bg-gray-100 rounded-lg px-4 py-3 flex justify-between items-center text-sm font-semibold">
                <span>Subtotal (excludes shipping):</span>
                <span className="text-brown-900">{formatPrice(calculatePrice(), currency)}</span>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => document.getElementById('artworkFrontFile')?.click()}
                  className="bg-brown-900 text-yellow-500 px-6 py-2 rounded-full hover:bg-brown-800"
                >
                  Upload Front
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById('artworkBackFile')?.click()}
                  className="bg-brown-900 text-yellow-500 px-6 py-2 rounded-full hover:bg-brown-800"
                >
                  Upload Back
                </button>
              </div>
            </div>

            <input type="file" id="artworkFrontFile" onChange={handleFileUpload} accept=".pdf,.png,.jpg,.jpeg,.ai,.psd" className="hidden" />
            <input type="file" id="artworkBackFile" onChange={handleFileUpload} accept=".pdf,.png,.jpg,.jpeg,.ai,.psd" className="hidden" />

            {/* Delivery Options — compact note */}
            <div className="bg-white rounded-2xl p-4 border-2 border-yellow-200">
              <div className="text-sm text-brown-700">Delivery options available at checkout. Store pickup is free.</div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full min-h-12 bg-brown-800 text-yellow-400 px-8 py-5 rounded-full text-lg font-bold hover:bg-brown-700 transition-all duration-300 transform hover:scale-105"
              >
                Add to Cart - {formatPrice(calculatePrice(), currency)}
              </button>
              
              <button className="w-full min-h-12 bg-yellow-500 text-brown-900 px-8 py-5 rounded-full text-lg font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
                Request Custom Quote
              </button>
            </div>

            {/* Estimated Delivery */}
            <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="font-bold text-green-800">Estimated Delivery</div>
                  <div className="text-green-700">2-3 business days (Rush available)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
