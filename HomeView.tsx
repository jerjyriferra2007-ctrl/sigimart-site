import React from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface HomeViewProps {
  onSearchChange: (val: string) => void;
  searchValue: string;
  onSelectCategory: (cat: 'sayur' | 'buah' | 'daging' | 'sembako') => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (p: Product) => void;
  cartCount: number;
  cartTotal: number;
  onNavigate: (tab: any) => void;
}

export default function HomeView({
  onSearchChange,
  searchValue,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  cartCount,
  cartTotal,
  onNavigate
}: HomeViewProps) {
  // Filter bestsellers from list
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);

  // Fallback to promo items if needed
  const promoItems = PRODUCTS.filter((p) => p.isPromo);

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFB]">
      {/* Top AppBar */}
      <header className="bg-white/90 backdrop-blur-md flex justify-between items-center w-full px-5 h-16 border-b border-zinc-100 shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006d37] text-2xl font-bold">storefront</span>
          <img 
            alt="SigiMart Brand text" 
            className="h-6 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfleh9nwufhursxD8uBoL4MJwQoCKKy26GQb0Afmmt6U3wGmfByRL9-PmkL5rtFNBuB_Bf0aC1O4BB6-HqcNUSWhemteqVFFgfKGoNhQ1zJy5d1BugebxaR_to7ZFVz0l93kjEXJfVbhtzml6HvYF2MVobAmspWLhVzKax_OHnY9Fp9XzGGX57CgNU2oL_f8X8oQ80Sxiy80tV5llIKPJBmASP-Wej3CM9i5K4dHpl17-bd6_j-RDgBoG1Dz-n90v0C-9fJQEhthHB" 
          />
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-zinc-50 rounded-full text-zinc-400 hover:text-emerald-600 transition-colors active-press">
            <span className="material-symbols-outlined text-[23px]">notifications</span>
          </button>
        </div>
      </header>

      <div className="p-5 space-y-6">
        {/* Search Bar section */}
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#2ECC71] transition-colors text-xl">
            search
          </span>
          <input 
            type="text"
            className="w-full bg-white border border-zinc-200/80 rounded-full py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-[#2ECC71]/20 focus:border-[#2ECC71] focus:bg-white outline-none text-sm transition-all shadow-sm font-medium"
            placeholder="Cari sayur atau buah segar..."
            value={searchValue}
            onChange={(e) => {
              onSearchChange(e.target.value);
              // Auto land on Kategori tab if they type to search!
              if (e.target.value.trim().length > 0) {
                onNavigate('categories');
              }
            }}
          />
        </div>

        {/* Promo Banner Carousel */}
        <section className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-sm bg-gradient-to-r from-emerald-600 to-[#2ECC71] group">
          <div className="absolute inset-0 flex items-center p-6 text-white z-10 w-2/3">
            <div className="space-y-1.5 align-left text-left">
              <span className="text-[10px] bg-white/25 backdrop-blur-md px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                Diskon Minggu Ini
              </span>
              <h2 className="text-xl font-extrabold text-white leading-tight font-sans">
                Flash Sale Sayuran 50%
              </h2>
              <button 
                onClick={() => {
                  onSearchChange('');
                  onNavigate('categories');
                }}
                className="bg-white text-[#006d37] px-4 py-1.5 rounded-full text-xs font-bold transition-transform hover:scale-105 active-press shadow-md shadow-emerald-950/20"
              >
                Belanja Sekarang
              </button>
            </div>
          </div>
          <img 
            alt="Vibrant fresh vegetables" 
            className="absolute right-[-15px] top-0 h-full w-1/2 object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm2kSVSVIAQsYOBQrv1yr8q9cTPSvKAdY5ezsKdBuHjSue8s-PBUXI9d3pkGceyDuVuJDfOrhbkgcK4chW1ZYFGeYFeBkRye0zD0wMKX8RkTNBsTYHMujW8cLQJor9b4G83ZDPewkaKQ5l2bKRWqeWk5w9jvwVuoVReC6VjOWKHJoxSb9mcOjYGFeYz8EpvFQZU-yJsalIYJ4tj9vKBNdSKlD8xhWtnvpOD0pzlQe_N1HZa17EdI3MhndqFjLcJLIj-3TqzM5Wc4Bm" 
          />
        </section>

        {/* Categories Grid */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-zinc-900 tracking-tight">Kategori Populer</h3>
            <button 
              onClick={() => {
                onNavigate('categories');
              }}
              className="text-emerald-600 text-xs font-bold hover:underline"
            >
              Lihat Semua
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {[
              { id: 'sayur', label: 'Sayur', icon: 'eco', color: 'bg-emerald-50 text-[#2ECC71] border-emerald-100/50' },
              { id: 'buah', label: 'Buah', icon: 'nutrition', color: 'bg-amber-50 text-amber-500 border-amber-100/50' },
              { id: 'daging', label: 'Daging', icon: 'set_meal', color: 'bg-red-50 text-rose-500 border-rose-100/50' },
              { id: 'sembako', label: 'Sembako', icon: 'grocery', color: 'bg-yellow-50 text-amber-600 border-yellow-105/50' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as any)}
                className="flex flex-col items-center gap-2 group cursor-pointer active-press"
              >
                <div className={`w-full aspect-square rounded-2xl ${cat.color} flex items-center justify-center border transition-all group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)]`}>
                  <span className="material-symbols-outlined text-3xl font-medium material-symbols-fill">
                    {cat.icon}
                  </span>
                </div>
                <span className="text-xs font-bold text-zinc-600 group-hover:text-emerald-700 transition-colors">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-zinc-900 tracking-tight">Produk Terlaris</h3>
            <button 
              onClick={() => {
                onSearchChange('');
                onNavigate('categories');
              }}
              className="text-emerald-600 text-xs font-bold hover:underline"
            >
              Segarkan
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {bestSellers.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl p-3 shadow-sm border border-zinc-100 flex flex-col gap-2 relative group hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                <div className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full z-10 uppercase tracking-wide">
                  Best Seller
                </div>
                
                <div className="aspect-square rounded-xl overflow-hidden bg-zinc-50 relative">
                  <img 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={product.image} 
                  />
                </div>
                
                <div className="text-left mt-1">
                  <h4 className="text-xs font-bold text-zinc-800 line-clamp-1 group-hover:text-[#006d37] transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-medium">
                    {product.unit}
                  </p>
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-1">
                  <span className="font-extrabold text-sm text-[#2ECC71]">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="w-8 h-8 rounded-full bg-[#2ECC71] hover:bg-[#006d37] text-white flex items-center justify-center transition-all shadow-md shadow-[#2ECC71]/20 active-press cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg font-bold">add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Promo banner */}
        {promoItems.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-base font-bold text-zinc-900 tracking-tight">Rekomendasi Promo</h3>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
              {promoItems.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="min-w-[140px] w-[140px] bg-white rounded-2xl p-2.5 border border-zinc-100 flex flex-col gap-1.5 cursor-pointer hover:shadow-sm"
                >
                  <div className="aspect-square rounded-lg overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-1 left-1 bg-rose-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md">
                      {product.discountPercentage ? `${product.discountPercentage}% OFF` : 'PROMO'}
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-zinc-800 line-clamp-1">{product.name}</p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-[#006d37]">Rp {product.price.toLocaleString('id-ID')}</span>
                      {product.originalPrice && (
                        <span className="text-[9px] text-zinc-400 line-through">Rp {product.originalPrice.toLocaleString('id-ID')}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

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
