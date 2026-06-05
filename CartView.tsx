import React, { useState } from 'react';
import { CartItem, UserAddress, PaymentMethodId } from '../types';
import { INITIAL_ADDRESSES } from '../data';

interface CartViewProps {
  cartItems: CartItem[];
  onIncreaseQty: (pId: string) => void;
  onDecreaseQty: (pId: string) => void;
  selectedAddress: UserAddress;
  onSelectAddress: (addr: UserAddress) => void;
  selectedPayment: PaymentMethodId;
  onSelectPayment: (pMethod: PaymentMethodId) => void;
  onCheckout: () => void;
  onNavigate: (tab: any) => void;
}

export default function CartView({
  cartItems,
  onIncreaseQty,
  onDecreaseQty,
  selectedAddress,
  onSelectAddress,
  selectedPayment,
  onSelectPayment,
  onCheckout,
  onNavigate
}: CartViewProps) {
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  // Math configurations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 10000 : 0;
  const discount = subtotal > 0 ? 5000 : 0;
  const total = subtotal > 0 ? (subtotal + deliveryFee - discount) : 0;

  return (
    <div className="flex-1 flex flex-col bg-[#f3fcf1]/40">
      {/* Top Header */}
      <header className="bg-white/95 backdrop-blur-md flex justify-between items-center w-full px-5 h-16 border-b border-zinc-100 shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('categories')}
            className="active-press duration-150 hover:bg-emerald-50 text-emerald-600 p-2 rounded-full cursor-pointer"
          >
            <span className="material-symbols-outlined font-bold text-xl">arrow_back</span>
          </button>
          <h1 className="font-sans text-lg font-extrabold text-[#006d37] tracking-tight">Keranjang</h1>
        </div>
        <div className="flex items-center">
          <button className="text-zinc-400 hover:text-emerald-600 transition-colors p-2 rounded-full active-press">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
        </div>
      </header>

      <main className="flex-1 px-5 py-5 pb-36 space-y-6">
        
        {/* Address Selection block */}
        <section className="space-y-2.5">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-extrabold text-zinc-800 tracking-tight">Alamat Pengiriman</h2>
            <button 
              onClick={() => setAddressModalOpen(true)}
              className="text-[#006d37] text-xs font-bold hover:underline cursor-pointer"
            >
              Ubah
            </button>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100 flex gap-3 text-left">
            <span className="material-symbols-outlined text-emerald-600 py-0.5">location_on</span>
            <div className="space-y-1">
              <p className="text-xs font-bold text-zinc-800">{selectedAddress.label}</p>
              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                {selectedAddress.fullAddress}
              </p>
            </div>
          </div>
        </section>

        {/* Selected Items */}
        <section className="space-y-3">
          <h2 className="text-sm font-extrabold text-zinc-800 tracking-tight text-left">Item Terpilih</h2>
          
          {cartItems.length > 0 ? (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div 
                  key={item.product.id}
                  className="bg-white p-3 rounded-xl border border-zinc-100 flex gap-3.5 items-center relative shadow-sm"
                >
                  <img 
                    alt={item.product.name} 
                    className="w-16 h-16 object-cover rounded-lg bg-zinc-50"
                    src={item.product.image} 
                  />
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-xs font-bold text-zinc-800 truncate leading-tight mb-0.5">
                      {item.product.name}
                    </p>
                    <p className="text-[10px] text-zinc-400 font-bold mb-1.5">
                      {item.product.unit}
                    </p>
                    <p className="text-xs font-extrabold text-[#006d37] leading-none text-sans">
                      Rp {item.product.price.toLocaleString('id-ID')}
                    </p>
                  </div>

                  {/* Operational counter adjustments */}
                  <div className="flex items-center gap-2 bg-zinc-50 p-1 rounded-full border border-zinc-200">
                    <button 
                      onClick={() => onDecreaseQty(item.product.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm text-[#006d37] hover:bg-[#006d37] hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm font-bold">remove</span>
                    </button>
                    <span className="text-xs font-extrabold text-zinc-800 min-w-[14px] text-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => onIncreaseQty(item.product.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-[#006d37] text-white shadow-sm hover:bg-emerald-800 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm font-bold">add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center bg-white rounded-2xl p-6 border border-zinc-150 shadow-sm flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-zinc-300">shopping_cart_checkout</span>
              <div className="space-y-1">
                <p className="text-sm font-bold text-zinc-700">Keranjang belanja kosong</p>
                <p className="text-xs text-zinc-400 max-w-[200px] leading-relaxed">
                  Wah, keranjang belanja Anda kosong. Mari tambahkan sayuran segar penyehat hari Anda!
                </p>
              </div>
              <button 
                onClick={() => onNavigate('categories')}
                className="mt-1 text-xs font-bold text-white bg-[#006d37] px-4 py-2 rounded-full shadow-sm hover:bg-emerald-800 transition-colors active-press cursor-pointer"
              >
                Pilih Produk Segar
              </button>
            </div>
          )}
        </section>

        {/* Payment Platform selection */}
        <section className="space-y-3 text-left">
          <h2 className="text-sm font-extrabold text-zinc-800 tracking-tight">Metode Pembayaran</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'ovo', text: 'OVO', detail: 'Utama', style: 'text-violet-600', activeStyle: 'border-emerald-600 bg-emerald-500/5' },
              { id: 'dana', text: 'Dana', detail: 'Saldo Rp 150k', style: 'text-sky-500', activeStyle: 'border-emerald-600 bg-emerald-500/5' },
              { id: 'linkaja', text: 'LinkAja', detail: 'Link', style: 'text-red-500', activeStyle: 'border-emerald-600 bg-emerald-500/5' },
            ].map((p) => {
              const active = selectedPayment === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPayment(p.id as any)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer shadow-sm active-press ${active ? p.activeStyle : 'border-transparent bg-white hover:border-zinc-200'}`}
                >
                  <span className={`text-base font-extrabold font-sans italic tracking-tight leading-none mb-1 ${p.style}`}>
                    {p.text}
                  </span>
                  <span className={`text-[9px] font-bold ${active ? 'text-emerald-700' : 'text-zinc-400'}`}>
                    {p.detail}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Bill Summary Statement */}
        <section className="bg-white p-5 rounded-2xl border border-zinc-150 shadow-sm text-left">
          <h2 className="text-sm font-extrabold text-zinc-800 mb-4 tracking-tight">Ringkasan Pesanan</h2>
          <div className="space-y-3 font-sans text-xs">
            <div className="flex justify-between items-center text-zinc-500 font-medium">
              <span>Subtotal ({cartItems.length} item)</span>
              <span className="text-zinc-800 font-bold">Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-500 font-medium">
              <span>Ongkos Kirim</span>
              <span className="text-zinc-800 font-bold">Rp {deliveryFee.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-500 font-medium">
              <span>Diskon SigiMart</span>
              <span className="text-rose-500 font-bold">-Rp {discount.toLocaleString('id-ID')}</span>
            </div>
            <div className="pt-3 border-t border-dashed border-zinc-200 flex justify-between items-center text-sm">
              <span className="font-extrabold text-zinc-800">Total Pembayaran</span>
              <span className="font-extrabold text-[#006d37] text-lg">
                Rp {total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </section>

      </main>

      {/* Floating Action Sticky Bottom controller */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-zinc-100 p-4 pb-6 z-45 rounded-t-3xl shadow-[0_-4px_12px_rgba(0,0,0,0.03)] flex items-center justify-between gap-4">
        <div className="text-left hidden xs:block">
          <p className="text-[10px] font-bold text-zinc-400 uppercase leading-none mb-1">Total Bayar</p>
          <p className="text-sm font-extrabold text-[#006d37]">
            Rp {total.toLocaleString('id-ID')}
          </p>
        </div>
        
        <button 
          onClick={onCheckout}
          disabled={cartItems.length === 0}
          className={`flex-1 py-4.5 rounded-full text-xs font-extrabold tracking-wide transition-all shadow-md active-press cursor-pointer flex items-center justify-center gap-1.5 ${cartItems.length > 0 ? 'bg-[#006d37] hover:bg-emerald-800 text-white shadow-emerald-950/20' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none'}`}
        >
          <span className="material-symbols-outlined text-base">payments</span>
          Bayar Sekarang
        </button>
      </div>

      {/* Address Ubah Modal Dialog Overlay */}
      {addressModalOpen && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full rounded-t-[32px] p-6 space-y-4 animate-slide-up max-w-md text-left shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-100">
              <h3 className="font-extrabold text-sm text-zinc-800">Pilih Alamat Pengiriman</h3>
              <button 
                onClick={() => setAddressModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 active-press"
              >
                <span className="material-symbols-outlined text-sm font-bold">close</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {INITIAL_ADDRESSES.map((addr) => (
                <button
                  key={addr.label}
                  onClick={() => {
                    onSelectAddress(addr);
                    setAddressModalOpen(false);
                  }}
                  className={`w-full p-3.5 rounded-xl border-2 text-left flex gap-3 transition-all ${selectedAddress.label === addr.label ? 'border-[#006d37] bg-emerald-500/5' : 'border-zinc-150 hover:bg-zinc-50'}`}
                >
                  <span className="material-symbols-outlined text-emerald-600 text-lg py-0.5">location_on</span>
                  <div>
                    <p className="text-xs font-bold text-[#006d37]">{addr.label}</p>
                    <p className="text-[11px] text-zinc-500 leading-tight mt-0.5">{addr.fullAddress}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
