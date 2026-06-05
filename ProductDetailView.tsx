import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onAddToCartWithQty: (p: Product, q: number) => void;
  onNavigate: (tab: any) => void;
  onSelectProduct: (p: Product) => void;
}

export default function ProductDetailView({
  product,
  onBack,
  onAddToCartWithQty,
  onNavigate,
  onSelectProduct
}: ProductDetailViewProps) {
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  // Filter 3 related items
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const increase = () => setQty((prev) => prev + 1);
  const decrease = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAdd = () => {
    onAddToCartWithQty(product, qty);
    setQty(1); // reset qty after adding
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Top Header */}
      <header className="bg-white/95 backdrop-blur-md font-sans border-b border-zinc-100 flex justify-between items-center w-full px-5 h-16 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="hover:bg-emerald-50 text-emerald-600 transition-colors p-2 rounded-full active-press cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl font-bold">arrow_back</span>
          </button>
          <h1 className="text-base font-extrabold text-[#006d37] tracking-tight">Detail Produk</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="hover:bg-emerald-50 text-zinc-400 p-2 rounded-full active-press">
            <span className="material-symbols-outlined text-lg">share</span>
          </button>
          <button className="hover:bg-emerald-50 text-zinc-400 p-2 rounded-full active-press">
            <span className="material-symbols-outlined text-lg">notifications</span>
          </button>
        </div>
      </header>

      {/* Hero Product Image */}
      <div className="relative w-full aspect-square bg-zinc-50 overflow-hidden">
        <img 
          alt={product.name} 
          className="w-full h-full object-cover"
          src={product.image} 
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#006d37]/90 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg backdrop-blur-sm border border-emerald-500/30">
            <span className="material-symbols-outlined text-[13px] material-symbols-fill text-[#2ECC71]">verified</span>
            Kesegaran Terjamin
          </span>
        </div>
      </div>

      {/* Main product card overlapping content panel */}
      <div className="bg-white rounded-t-[32px] -mt-8 relative z-10 p-5 shadow-[0_-8px_30px_rgba(0,0,0,0.03)] text-left flex flex-col gap-6">
        
        {/* Title, weight and heart indicator */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-zinc-900 leading-tight">
              {product.name}
            </h2>
            <p className="text-xs text-zinc-400 font-bold">
              {product.unit} per ikat • {product.origin || 'Kebun Sigi'}
            </p>
          </div>
          <button 
            onClick={() => setLiked(!liked)}
            className={`w-11 h-11 flex items-center justify-center rounded-full border border-zinc-150 transition-all active-press cursor-pointer ${liked ? 'bg-red-50 border-red-200 text-[#E74C3C]' : 'bg-white text-zinc-400 hover:text-zinc-500'}`}
          >
            <span className={`material-symbols-outlined text-xl ${liked ? 'material-symbols-fill text-[#E74C3C]' : ''}`}>
              favorite
            </span>
          </button>
        </div>

        {/* Pricing tag block */}
        <div className="flex items-center gap-3 bg-[#eef6eb]/50 p-4 rounded-2xl border border-emerald-100/30">
          <div>
            <p className="text-[10px] uppercase font-bold text-zinc-400 leading-none mb-1">Harga Special</p>
            <div className="flex items-baseline gap-2">
              <span className="text-[#006d37] font-extrabold text-2xl">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-zinc-400 line-through text-xs font-semibold">
                    Rp {product.originalPrice.toLocaleString('id-ID')}
                  </span>
                  <span className="bg-[#ffdad6] text-[#ba1a1a] text-[9px] font-extrabold px-2 py-0.5 rounded-lg">
                    {product.discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic feature items */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#eef6eb] p-3 rounded-2xl flex flex-col items-center text-center justify-center border border-emerald-500/10 shadow-sm">
            <span className="material-symbols-outlined text-[#006d37] mb-1 material-symbols-fill text-xl">eco</span>
            <span className="text-[9px] font-extrabold text-zinc-500 uppercase tracking-wide">Organik</span>
          </div>
          <div className="bg-[#eef6eb] p-3 rounded-2xl flex flex-col items-center text-center justify-center border border-emerald-500/10 shadow-sm">
            <span className="material-symbols-outlined text-[#006d37] mb-1 text-xl">schedule</span>
            <span className="text-[9px] font-extrabold text-zinc-500 uppercase tracking-wide">Panen Pagi Ini</span>
          </div>
          <div className="bg-[#eef6eb] p-3 rounded-2xl flex flex-col items-center text-center justify-center border border-emerald-500/10 shadow-sm">
            <span className="material-symbols-outlined text-[#006d37] mb-1 text-xl">package_2</span>
            <span className="text-[9px] font-extrabold text-zinc-500 uppercase tracking-wide">Vacuum Pack</span>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-2">
          <h3 className="text-sm font-extrabold text-zinc-900 tracking-tight">Deskripsi Produk</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Logistic estimates parameters */}
        <div className="border-y border-zinc-100 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#273C75] text-xl bg-blue-50 p-2.5 rounded-xl">local_shipping</span>
              <div>
                <p className="text-xs font-extrabold text-zinc-800">Estimasi Pengiriman</p>
                <p className="text-[11px] text-zinc-400 font-medium">Besok Pagi (06:00 - 09:00)</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-zinc-300">chevron_right</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#273C75] text-xl bg-blue-50 p-2.5 rounded-xl">location_on</span>
            <div>
              <p className="text-xs font-extrabold text-zinc-800">Dikirim dari</p>
              <p className="text-[11px] text-zinc-400 font-medium">Gudang Pusat SigiMart Jakarta</p>
            </div>
          </div>
        </div>

        {/* Related Products Scroller */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-extrabold text-zinc-900 tracking-tight">Produk Terkait</h3>
            <button 
              onClick={() => onNavigate('categories')}
              className="text-[#006d37] text-xs font-extrabold hover:underline"
            >
              Lihat Semua
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-5 px-5 pb-2">
            {related.map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                  onSelectProduct(item);
                  setQty(1); // reset active counter details
                }}
                className="min-w-[140px] w-[140px] bg-white rounded-2xl border border-zinc-100 overflow-hidden shadow-sm flex flex-col text-left cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="h-28 bg-zinc-50 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-zinc-800 truncate">{item.name}</p>
                    <p className="text-[9px] text-zinc-400 font-medium mb-1">{item.unit}</p>
                  </div>
                  <div className="flex justify-between items-center bg-zinc-50 p-1 rounded-lg">
                    <span className="text-[#006d37] font-extrabold text-[11px]">Rp {item.price.toLocaleString('id-ID')}</span>
                    <span className="material-symbols-outlined text-sm font-bold text-white bg-[#2ECC71] rounded-full p-0.5">add</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="h-28"></div> {/* Bottom margins placeholder */}

      {/* Floating Sticky Actions base overlay */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-zinc-100 p-4 pb-6 flex items-center gap-4 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] rounded-t-3xl">
        <div className="flex items-center gap-3.5 border border-zinc-200/80 rounded-full px-4 py-2 bg-[#F8FAFB]">
          <button 
            onClick={decrease}
            className="text-[#006d37] font-extrabold active-press"
          >
            <span className="material-symbols-outlined text-lg font-bold">remove</span>
          </button>
          <span className="font-extrabold text-sm text-zinc-800 min-w-[16px] text-center">
            {qty}
          </span>
          <button 
            onClick={increase}
            className="text-[#006d37] font-extrabold active-press"
          >
            <span className="material-symbols-outlined text-lg font-bold">add</span>
          </button>
        </div>

        <button 
          onClick={handleAdd}
          className="flex-1 bg-[#2ECC71] hover:bg-emerald-600 text-white font-extrabold h-12 rounded-full flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#2ECC71]/20 active-press cursor-pointer"
        >
          <span className="material-symbols-outlined material-symbols-fill text-lg">shopping_cart</span>
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}
