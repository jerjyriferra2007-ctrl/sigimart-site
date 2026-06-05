import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface CatalogViewProps {
  searchValue: string;
  onSearchChange: (val: string) => void;
  selectedCategory: 'all' | 'sayur' | 'buah' | 'daging' | 'sembako';
  onSelectCategory: (cat: any) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (p: Product) => void;
  cartCount: number;
  cartTotal: number;
  onNavigate: (tab: any) => void;
}

type SortOption = 'relevance' | 'low-price' | 'high-price' | 'alphabetical';

export default function CatalogView({
  searchValue,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  cartCount,
  cartTotal,
  onNavigate
}: CatalogViewProps) {
  const [activeChip, setActiveChip] = useState<'semua' | 'terbaru' | 'harga-terendah' | 'sayur' | 'buah' | 'sembako'>('semua');
  const [sortOption, setSortOption] = useState<SortOption>('relevance');

  // Multi category filter based on both chip selection and standard state
  const currentCategory = useMemo(() => {
    if (activeChip === 'sayur') return 'sayur';
    if (activeChip === 'buah') return 'buah';
    if (activeChip === 'sembako') return 'sembako';
    if (selectedCategory !== 'all') return selectedCategory;
    return 'all';
  }, [activeChip, selectedCategory]);

  // Compute filtered items
  const filteredProducts = useMemo(() => {
    let items = [...PRODUCTS];

    // 1. Filter by category
    if (currentCategory !== 'all') {
      items = items.filter((p) => p.category === currentCategory);
    }

    // 2. Filter by search value
    if (searchValue.trim().length > 0) {
      const query = searchValue.toLowerCase().trim();
      items = items.filter(
        (p) => 
          p.name.toLowerCase().includes(query) || 
          p.description.toLowerCase().includes(query) ||
          p.origin.toLowerCase().includes(query)
      );
    }

    // 3. Handle sorting option
    if (activeChip === 'harga-terendah' || sortOption === 'low-price') {
      items.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-price') {
      items.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'alphabetical') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    }

    return items;
  }, [currentCategory, searchValue, activeChip, sortOption]);

  const handleChipClick = (chip: typeof activeChip) => {
    setActiveChip(chip);
    if (chip === 'sayur' || chip === 'buah' || chip === 'sembako') {
      onSelectCategory(chip);
    } else if (chip === 'semua') {
      onSelectCategory('all');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFB]">
      {/* Search and Main Header */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-zinc-100 shadow-sm">
        <div className="flex justify-between items-center px-5 h-16 w-full">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('home')}
              className="hover:bg-zinc-50 p-2 rounded-full text-[#006d37] hover:text-emerald-700 transition-colors active-press"
            >
              <span className="material-symbols-outlined font-bold text-xl">arrow_back</span>
            </button>
            <h1 className="text-lg font-extrabold text-[#006d37] tracking-tight">Kategori Produk</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="hover:bg-zinc-50 p-2 rounded-full text-zinc-400 hover:text-[#006d37] active-press">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </button>
          </div>
        </div>

        {/* Real-time search element inside Kategori list */}
        <div className="px-5 pb-3">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#2ECC71] transition-colors text-lg">
              search
            </span>
            <input 
              type="text"
              className="w-full bg-[#f3fcf1]/50 border border-zinc-200 rounded-full py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-[#2ECC71]/20 focus:border-[#2ECC71] outline-none text-xs transition-all font-medium"
              placeholder="Cari sayur atau buah segar..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchValue && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-800 transition-all text-[12px]"
              >
                <span className="material-symbols-outlined text-[12px] font-bold">close</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 px-5 pt-4 pb-28">
        {/* Horizontally scrollable filter chips */}
        <section className="mb-5 overflow-x-auto hide-scrollbar -mx-5 px-5">
          <div className="flex gap-2 pb-1.5 whitespace-nowrap">
            <button 
              onClick={() => handleChipClick('semua')}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all active-press ${activeChip === 'semua' && selectedCategory === 'all' ? 'bg-[#006d37] text-white shadow-sm' : 'bg-white text-zinc-600 border border-zinc-200/80 hover:bg-emerald-50'}`}
            >
              Semua
            </button>
            <button 
              onClick={() => handleChipClick('terbaru')}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all active-press ${activeChip === 'terbaru' ? 'bg-[#006d37] text-white shadow-sm' : 'bg-white text-zinc-600 border border-zinc-200/80 hover:bg-emerald-50'}`}
            >
              Terbaru
            </button>
            <button 
              onClick={() => handleChipClick('harga-terendah')}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all active-press ${activeChip === 'harga-terendah' ? 'bg-[#006d37] text-white shadow-sm' : 'bg-white text-zinc-600 border border-zinc-200/80 hover:bg-emerald-50'}`}
            >
              Harga Terendah
            </button>
            <button 
              onClick={() => handleChipClick('sayur')}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all active-press ${activeChip === 'sayur' || selectedCategory === 'sayur' ? 'bg-[#2ECC71] text-white shadow-sm' : 'bg-white text-zinc-600 border border-zinc-200/80 hover:bg-emerald-50'}`}
            >
              Sayuran
            </button>
            <button 
              onClick={() => handleChipClick('buah')}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all active-press ${activeChip === 'buah' || selectedCategory === 'buah' ? 'bg-[#2ECC71] text-white shadow-sm' : 'bg-white text-zinc-600 border border-zinc-200/80 hover:bg-emerald-50'}`}
            >
              Buah-buahan
            </button>
            <button 
              onClick={() => handleChipClick('sembako')}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all active-press ${activeChip === 'sembako' || selectedCategory === 'sembako' ? 'bg-[#2ECC71] text-white shadow-sm' : 'bg-white text-zinc-600 border border-zinc-200/80 hover:bg-emerald-50'}`}
            >
              Sembako
            </button>
          </div>
        </section>

        {/* Sorting Dropdown selector */}
        <div className="flex justify-between items-center mb-4 px-1.5">
          <p className="text-xs text-zinc-400 font-medium">
            Menampilkan <strong className="text-zinc-700 font-bold">{filteredProducts.length}</strong> produk segar
          </p>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-zinc-400">filter_list</span>
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="text-xs font-bold text-zinc-600 bg-transparent border-none py-0.5 outline-none focus:ring-0 cursor-pointer hover:text-emerald-700"
            >
              <option value="relevance">Tingkat Relevansi</option>
              <option value="low-price">Harga: Terendah</option>
              <option value="high-price">Harga: Tertinggi</option>
              <option value="alphabetical">Nama: A - Z</option>
            </select>
          </div>
        </div>

        {/* Product Grid Layout */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3.5">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow group cursor-pointer flex flex-col border border-zinc-250/20"
              >
                <div className="relative h-36 w-full overflow-hidden bg-zinc-50">
                  <img 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={product.image} 
                  />
                  {product.isPromo && (
                    <div className="absolute top-2 left-2 bg-[#E74C3C] text-white text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide shadow-sm">
                      PROMO
                    </div>
                  )}
                </div>

                <div className="p-3 text-left flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-zinc-800 line-clamp-1 group-hover:text-[#006d37] transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex flex-col mt-0.5 mb-2">
                      <span className="text-[#006d37] font-extrabold text-sm font-sans">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-medium leading-none">
                        / {product.unit}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-1.5 border-t border-zinc-50">
                    <span className="text-[9px] text-zinc-400 font-medium">
                      {product.unitAvailableText || `Tersedia ${product.availableQty} pcs`}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="bg-[#2ECC71] text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#006d37] shadow-md shadow-[#2ECC71]/15 transition-colors active-press cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg font-bold">add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-white rounded-3xl p-6 border border-zinc-100 flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-zinc-300">search_off</span>
            <div className="space-y-1">
              <p className="text-sm font-bold text-zinc-700">Produk segar tidak ditemukan</p>
              <p className="text-xs text-zinc-400 max-w-[200px] mx-auto leading-relaxed">
                Kami tidak dapat mendeteksi "{searchValue}" di dataran tinggi Sigi. Silakan coba keyword lainnya!
              </p>
            </div>
            <button 
              onClick={() => {
                onSearchChange('');
                setActiveChip('semua');
                onSelectCategory('all');
              }}
              className="mt-2 text-xs font-bold text-white bg-[#006d37] px-4 py-1.5 rounded-full shadow-sm hover:bg-emerald-800 transition-colors active-press"
            >
              Reset Filter
            </button>
          </div>
        )}
      </main>

      {/* Floating Cart Panel Widget */}
      {cartCount > 0 && (
        <div className="fixed bottom-24 right-6 z-40">
          <button 
            onClick={() => onNavigate('cart')}
            className="bg-[#006d37] hover:bg-[#005027] text-white flex items-center gap-2 px-5 py-3.5 rounded-full shadow-lg shadow-emerald-950/30 active-press cursor-pointer transition-all border border-emerald-500/20"
          >
            <span className="material-symbols-outlined text-xl material-symbols-fill">shopping_basket</span>
            <span className="text-xs font-bold tracking-tight">
              {cartCount} Item - Rp {cartTotal.toLocaleString('id-ID')}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
