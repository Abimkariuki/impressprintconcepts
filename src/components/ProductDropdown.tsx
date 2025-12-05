import { useEffect, useMemo, useState } from 'react';
import { getAllProducts, type CatalogProduct } from '../lib/catalog';

interface ProductDropdownProps {
  onSelect?: (product: CatalogProduct) => void;
}

export default function ProductDropdown({ onSelect }: ProductDropdownProps) {
  const all = useMemo(() => getAllProducts(), []);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return all.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [all, query]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest('.product-dropdown')) setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div className="product-dropdown relative" aria-expanded={open}>
      <button
        className="inline-flex items-center gap-2 px-3 py-2 border-2 border-yellow-300 rounded-full bg-white text-brown-900 hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
      >
        <span className="text-sm font-semibold">All Products</span>
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" /></svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-80 bg-white border border-yellow-200 rounded-2xl shadow-md p-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full px-3 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-brown-500"
            aria-label="Search products"
          />
          <ul role="listbox" className="max-h-72 overflow-auto mt-2 space-y-2">
            {filtered.map((p) => (
              <li key={`${p.category}-${p.id}`}>
                <button
                  className="w-full flex items-center gap-3 text-left px-2 py-2 rounded-lg hover:bg-yellow-50 focus:outline-none focus:ring-1 focus:ring-yellow-300"
                  onClick={() => { onSelect?.(p); setOpen(false); }}
                >
                  <img
                    src={p.image}
                    alt={`${p.name} thumbnail`}
                    className="rounded-md object-cover"
                    style={{ aspectRatio: '1 / 1' }}
                    width={48}
                    height={48}
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-brown-900 truncate">{p.name}</div>
                    <div className="text-xs text-brown-600 truncate">{p.category}</div>
                  </div>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="text-sm text-brown-600 px-2 py-2">No matches</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
