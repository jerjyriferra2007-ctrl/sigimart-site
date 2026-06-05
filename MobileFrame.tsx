import React, { ReactNode } from 'react';

interface MobileFrameProps {
  children: ReactNode;
  activeTab: string;
  onSetTab: (tab: any) => void;
  cartCount: number;
}

export default function MobileFrame({ children, activeTab, onSetTab, cartCount }: MobileFrameProps) {
  return (
    <div className="min-h-screen bg-[#F0F5F1] text-zinc-950 font-sans flex flex-col items-center justify-start md:py-8 lg:py-12 px-4 selection:bg-emerald-500 selection:text-white antialiased">
      {/* Centered Device shell wrapper */}
      <div className="w-full max-w-md bg-[#F8FAFB] md:rounded-[40px] md:shadow-[0_24px_60px_rgba(20,50,30,0.12)] border border-transparent md:border-zinc-200/50 overflow-hidden flex flex-col relative h-full min-h-[812px] md:min-h-[844px] lg:min-h-[880px] transition-all">
        {/* Mock notch for premium visual touch */}
        <div className="hidden md:flex justify-between items-center px-6 pt-3 pb-2 bg-white dark:bg-zinc-950 text-xs font-semibold text-zinc-500 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-1.5">
            <span>09:41</span>
            <span className="material-symbols-outlined text-[12px] font-bold">location_on</span>
            <span className="text-[10px] text-emerald-600 font-bold">SigiMart</span>
          </div>
          {/* Speaker capsule pillar bar */}
          <div className="w-20 h-4.5 bg-zinc-900 rounded-full flex items-center justify-center">
            <div className="w-8 h-1 bg-zinc-800 rounded-full"></div>
          </div>
          <div className="flex items-center gap-1.5 font-mono">
            <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
            <span className="material-symbols-outlined text-[14px]">wifi</span>
            <span className="material-symbols-outlined text-[14px]">battery_5_bar</span>
          </div>
        </div>

        {/* Inner page display stream */}
        <div className="flex-1 flex flex-col relative overflow-y-auto overflow-x-hidden hide-scrollbar">
          {children}
        </div>
      </div>

      {/* Control info sidebar / explanatory panel on side for desktop developers */}
      <div className="mt-6 text-center max-w-md bg-white p-4 rounded-2xl shadow-sm border border-emerald-100 flex flex-col gap-2">
        <h4 className="font-bold text-sm text-emerald-800 flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-lg">touch_app</span> Panel Interaktif SigiMart
        </h4>
        <p className="text-xs text-zinc-500">
          Aplikasi di atas berjalan secara <strong>interaktif</strong>. Anda dapat mengklik produk untuk membuka detailnya, menambahkan ke keranjang belanja harian, memilih metode pembayaran, menyunting alamat pengiriman, dan melakukan proses transaksi pembayaran hingga melacak status kurir secara real-time!
        </p>
        <div className="flex gap-2 justify-center flex-wrap mt-1">
          <button 
            onClick={() => onSetTab('splash')} 
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${activeTab === 'splash' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
          >
            Splash Screen
          </button>
          <button 
            onClick={() => onSetTab('home')} 
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${activeTab === 'home' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
          >
            SigiMart Home
          </button>
          <button 
            onClick={() => onSetTab('categories')} 
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${activeTab === 'categories' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
          >
            Kategori
          </button>
          <button 
            onClick={() => onSetTab('cart')} 
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${['cart'].includes(activeTab) ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
          >
            Keranjang ({cartCount})
          </button>
          <button 
            onClick={() => onSetTab('orders')} 
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${['orders'].includes(activeTab) ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
          >
            Lacak Pesanan
          </button>
        </div>
      </div>
    </div>
  );
}
