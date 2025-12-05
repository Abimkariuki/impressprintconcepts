import { useState, useEffect, useRef } from "react";
import { useAuth } from "../lib/useAuth";
import { files as filesApi } from "../lib/api";
import logoFallback from "../assets/Impress-Print-Concepts-LOGO.png";
import SearchBar from "./SearchBar";
import MegaMenu from "./MegaMenu";
import { Page } from "../App";

interface HeaderProps {
  onLoginClick: () => void;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartItemCount: number;
  onAdminClick?: () => void;
  onNavigateToCategory: (category: string) => void;
  currency?: 'KSH' | 'USD' | 'EUR' | 'GBP';
  onCurrencyChange?: (c: 'KSH' | 'USD' | 'EUR' | 'GBP') => void;
}

export default function Header({ onLoginClick, currentPage, onNavigate, cartItemCount, onAdminClick, onNavigateToCategory, currency = 'KSH', onCurrencyChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const catRefs = useRef<HTMLButtonElement[]>([]);
  const [isShrunk, setIsShrunk] = useState(false);
  
  const [currentLogo, setCurrentLogo] = useState<any>(null);
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    const fetchLogo = () => {
      filesApi.getCurrentLogo()
        .then((res) => { if (mounted) setCurrentLogo(res); })
        .catch(() => { if (mounted) setCurrentLogo(null); });
    };
    fetchLogo();
    const onLogoUpdated = () => { fetchLogo(); };
    window.addEventListener('logoUpdated', onLogoUpdated);
    return () => { mounted = false; window.removeEventListener('logoUpdated', onLogoUpdated); };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setIsShrunk(y > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const categories = [
    { name: "All Products", slug: "all" },
    { name: "Business Cards", slug: "business-cards" },
    { name: "Marketing & Stationery", slug: "marketing-stationery" },
    { name: "Signs & Banners", slug: "signs-banners" },
    { name: "Invitations & Events", slug: "invitations-events" },
    { name: "Stickers & Labels", slug: "stickers-labels" },
    { name: "Gifts & Décor", slug: "gifts-decor" },
    { name: "Apparel", slug: "apparel" },
    { name: "Business", slug: "business" },
    { name: "Services", slug: "services" }
  ];

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const scheduleClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    closeTimerRef.current = window.setTimeout(() => {
      setIsMegaOpen(false);
      setActiveCategory(null);
    }, 400);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!activeCategory) return;
      if (e.key === "Escape") {
        setIsMegaOpen(false);
        setActiveCategory(null);
        cancelClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCategory]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-yellow-500 text-brown-900 py-3 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center md:justify-between">
            <div className="flex items-center space-x-8">
              <span className="hidden lg:flex items-center body-text-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                info@impressprintconcepts.co.ke
              </span>
              <span className="flex items-center body-text-medium whitespace-nowrap">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:+254788694143" className="font-semibold">0788 694 143</a>
                <span className="mx-2">|</span>
                <a href="tel:+254720549608" className="font-semibold">0720 549 608</a>
              </span>
              <span className="hidden lg:flex items-center body-text-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Mon-Fri: 8AM-6PM
              </span>
            </div>
            <div className="hidden lg:flex items-center space-x-6">
              <button onClick={() => onNavigate('sample')} className="text-brown-900 font-semibold">Free Kit</button>
              <span className="text-brown-400">|</span>
              <button onClick={() => onNavigate('about')} className="text-brown-900 font-semibold">About Us</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`bg-white sticky top-0 z-50 border-b-4 border-yellow-500 transition-all duration-300 ${isShrunk ? 'shadow-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${isShrunk ? 'h-16' : 'h-24'}`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src={(currentLogo && currentLogo.url) || logoFallback}
                    onError={() => setCurrentLogo(null)}
                    alt="Impress Print Concepts Logo"
                    className={`w-auto transition-all duration-300 ${isShrunk ? 'h-8' : 'h-12'}`}
                  />
                </button>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-6 flex-1">
              <div className="flex-1 flex items-center justify-center">
                  <div className="w-full max-w-md">
<SearchBar onNavigate={(page: string) => onNavigate(page as Page)} onNavigateToCategory={onNavigateToCategory} />
                  </div>
                </div>

              <div className="flex items-center space-x-6">
              {/* Cart Button */}
              <button
                onClick={() => onNavigate('cart')}
                className="relative text-brown-900 hover:text-yellow-600 font-heading font-semibold transition-all duration-300 px-4 py-2 rounded-full hover:bg-yellow-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2h-4a2 2 0 01-2-2v-6" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-brown-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Orders Button */}
              {user && (
                <button
                  onClick={() => onNavigate('orders')}
                  className="text-brown-900 hover:text-yellow-600 font-heading font-semibold transition-all duration-300 px-4 py-2 rounded-full hover:bg-yellow-50"
                >
                  Orders
                </button>
              )}

              {/* User Account / Login */}
              {!user && (
                <button
                  onClick={onLoginClick}
                  aria-label="Sign in"
                  className="text-brown-600 hover:text-brown-800 transition-all duration-300 relative group p-2 rounded-full hover:bg-brown-50 border border-brown-300 hover:border-brown-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.63 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              )}

              {user && (
                <div className="flex items-center space-x-4">
                  <div className="text-brown-900 font-heading font-semibold">
                    Welcome, {user.name?.split(' ')[0] || 'User'}
                  </div>
                  <button
                    onClick={onAdminClick}
                    className="flex items-center space-x-2 bg-brown-900 text-yellow-500 px-4 py-2 rounded-full font-heading font-semibold hover:bg-brown-800 transition-all duration-300"
                  >
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Dashboard</span>
                  </button>
                </div>
              )}
              </div>
            </nav>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-brown-900 hover:text-yellow-600 p-3 rounded-full hover:bg-yellow-50 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden border-t border-yellow-200 bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => {
                    onNavigate('cart');
                    setIsMenuOpen(false);
                  }}
                  className="block text-brown-900 hover:text-yellow-600 px-4 py-3 text-base font-heading font-semibold w-full text-left rounded-xl hover:bg-yellow-50 transition-colors"
                >
                  Cart ({cartItemCount})
                </button>
                <button
                  onClick={() => {
                    onNavigate('cart');
                    setIsMenuOpen(false);
                  }}
                  className="block text-brown-900 hover:text-yellow-600 px-4 py-3 text-base font-heading font-semibold w-full text-left rounded-xl hover:bg-yellow-50 transition-colors"
                >
                  Cart ({cartItemCount})
                </button>
                
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        onNavigate('orders');
                        setIsMenuOpen(false);
                      }}
                      className="block text-brown-900 hover:text-yellow-600 px-4 py-3 text-base font-heading font-semibold w-full text-left rounded-xl hover:bg-yellow-50 transition-colors"
                    >
                      Orders
                    </button>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onAdminClick?.();
                      }}
                      className="block bg-brown-900 text-yellow-500 px-4 py-3 text-base font-heading font-semibold w-full text-left rounded-xl hover:bg-brown-800 transition-colors mt-4"
                    >
                      Dashboard
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onLoginClick();
                    }}
                    className="block text-brown-600 hover:text-brown-800 px-4 py-3 text-base font-heading font-semibold w-full text-left rounded-xl hover:bg-brown-50 transition-colors border border-brown-300 mt-4"
                  >
                    <span className="sr-only">Sign In</span>
                    <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.63 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Categories Menu */}
      <div className="bg-gray-50 border-t border-yellow-50 relative" onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            onMouseEnter={cancelClose}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setIsMegaOpen(false);
                setActiveCategory(null);
                cancelClose();
                return;
              }
              const currentIndex = catRefs.current.findIndex((el) => el === document.activeElement);
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                const delta = e.key === "ArrowRight" ? 1 : -1;
                const next = ((currentIndex >= 0 ? currentIndex : 0) + delta + categories.length) % categories.length;
                const nextSlug = categories[next].slug;
                setActiveCategory(nextSlug);
                catRefs.current[next]?.focus();
                cancelClose();
                e.preventDefault();
              } else if (e.key === "Enter") {
                const idx = currentIndex >= 0 ? currentIndex : categories.findIndex((c) => c.slug === activeCategory);
                const slug = categories[idx]?.slug;
                if (slug) {
                  if (isDesktop) {
                    setActiveCategory((prev) => (prev === slug ? null : slug));
                    setIsMegaOpen((prev) => (activeCategory === slug ? !prev : true));
                    cancelClose();
                  } else {
                    onNavigateToCategory(slug);
                    setIsMegaOpen(false);
                    setActiveCategory(null);
                  }
                }
              }
            }}
            className="flex items-center overflow-x-auto whitespace-nowrap py-2 no-scrollbar justify-center"
          >
            {categories.map((cat) => (
              <button
                key={cat.slug}
                ref={(el) => {
                  if (el) {
                    const idx = categories.findIndex((c) => c.slug === cat.slug);
                    catRefs.current[idx] = el;
                  }
                }}
                onMouseEnter={() => { if (isDesktop) { setActiveCategory(cat.slug); setIsMegaOpen(true); } }}
                onFocus={() => setActiveCategory(cat.slug)}
                onClick={() => {
                  if (isDesktop) {
                    setActiveCategory((prev) => (prev === cat.slug ? null : cat.slug));
                    setIsMegaOpen((prev) => (activeCategory === cat.slug ? !prev : true));
                    cancelClose();
                  } else {
                    onNavigateToCategory(cat.slug);
                    setIsMegaOpen(false);
                    setActiveCategory(null);
                  }
                }}
                onTouchStart={() => {
                  onNavigateToCategory(cat.slug);
                  setIsMegaOpen(false);
                  setActiveCategory(null);
                }}
                aria-haspopup="true"
                aria-expanded={activeCategory === cat.slug}
                className="inline-block mr-3 last:mr-0 text-brown-900 hover:text-yellow-600 font-medium text-xs sm:text-sm px-2 py-1 whitespace-nowrap rounded-md transition-colors hover:bg-yellow-50 focus:outline-none focus:ring-1 focus:ring-yellow-300"
              >
                {cat.name}
              </button>
            ))}
          </nav>
        </div>
        {isDesktop && (
          <MegaMenu
            category={activeCategory}
            visible={isMegaOpen && !!activeCategory}
            onNavigateToCategory={(slug) => { onNavigateToCategory(slug); setActiveCategory(null); }}
            onClose={scheduleClose}
            onCancelClose={cancelClose}
          />
        )}
      </div>
    </>
  );
}
