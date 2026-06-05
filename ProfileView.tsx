import React from 'react';
import { UserAddress } from '../types';
import { INITIAL_ADDRESSES } from '../data';

interface ProfileViewProps {
  userEmail: string;
  selectedAddress: UserAddress;
  onSelectAddress: (addr: UserAddress) => void;
  onNavigate: (tab: any) => void;
}

export default function ProfileView({
  userEmail,
  selectedAddress,
  onSelectAddress,
  onNavigate
}: ProfileViewProps) {
  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFB] text-left">
      {/* Top Header */}
      <header className="bg-white/95 backdrop-blur-md flex justify-between items-center w-full px-5 h-16 border-b border-zinc-100 shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('home')}
            className="hover:bg-emerald-50 text-emerald-600 p-2 rounded-full cursor-pointer transition-colors active-press"
          >
            <span className="material-symbols-outlined font-bold text-xl">arrow_back</span>
          </button>
          <h1 className="text-lg font-extrabold text-[#006d37] tracking-tight">Profil Pengguna</h1>
        </div>
        <div>
          <button className="text-zinc-400 p-2 rounded-full hover:text-emerald-600">
            <span className="material-symbols-outlined text-xl">settings</span>
          </button>
        </div>
      </header>

      <main className="p-5 space-y-6">
        {/* User Card */}
        <div className="bg-gradient-to-br from-[#006d37] to-[#2ECC71] rounded-3xl p-6 text-white flex items-center gap-4 shadow-md">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center font-bold text-[#006d37] text-2xl shadow-inner uppercase tracking-wider">
            {userEmail ? userEmail[0] : 'U'}
          </div>
          <div className="space-y-1 min-w-0 flex-1">
            <p className="text-sm font-extrabold truncate">Pelanggan SigiMart</p>
            <p className="text-[11px] text-emerald-100 truncate font-semibold">{userEmail || 'pelanggan@sigimart.com'}</p>
            <div className="inline-block bg-white/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              MEMBER SILVER
            </div>
          </div>
        </div>

        {/* Addresses panels list */}
        <section className="space-y-3">
          <h3 className="text-sm font-extrabold text-zinc-800">Manajemen Alamat</h3>
          <div className="space-y-2.5">
            {INITIAL_ADDRESSES.map((addr) => {
              const active = selectedAddress.label === addr.label;
              return (
                <button
                  key={addr.label}
                  onClick={() => onSelectAddress(addr)}
                  className={`w-full p-4 rounded-xl border flex gap-3 text-left transition-all active-press ${active ? 'border-[#006d37] bg-emerald-500/5' : 'border-zinc-200 bg-white hover:bg-zinc-50'}`}
                >
                  <span className={`material-symbols-outlined py-0.5 ${active ? 'text-[#006d37]' : 'text-zinc-400'}`}>location_on</span>
                  <div className="space-y-0.5">
                    <p className={`text-xs font-extrabold ${active ? 'text-[#006d37]' : 'text-zinc-700'}`}>{addr.label}</p>
                    <p className="text-[11px] text-zinc-500 font-medium leading-tight">{addr.fullAddress}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Quick settings list */}
        <section className="space-y-2">
          <h3 className="text-sm font-extrabold text-zinc-800">Menu Cepat</h3>
          <div className="bg-white rounded-2xl border border-zinc-200 divide-y divide-zinc-100 overflow-hidden shadow-sm">
            {[
              { label: 'Riwayat Pesanan', icon: 'receipt_long_icon', action: () => onNavigate('orders') },
              { label: 'Voucher Saya', icon: 'card_giftcard', subtext: 'Ada 2 voucher gratis ongkir aktif' },

              {
                label: 'Panduan Penggunaan',
                icon:'menu_book',
                action: () =>window.open(
                  'https://docs.google.com/document/d/13eoIkqr-_imeQesk_fmD8ZiAGdTCtP22lfrqdsiB1cs/edit?usp=sharing',
                  '_blank'
                ) 
               },
               
              { label: 'Pusat Bantuan', icon: 'help_outline' },
              { label: 'Keamanan Akun', icon: 'shield_lock' }
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={item.action || (() => {})}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-zinc-400 text-lg">
                    {item.label === 'Riwayat Pesanan' ? 'receipt_long' : item.icon}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-zinc-700">{item.label}</p>
                    {item.subtext && <p className="text-[10px] text-emerald-600 font-medium leading-none">{item.subtext}</p>}
                  </div>
                </div>
                <span className="material-symbols-outlined text-zinc-300 text-sm">chevron_right</span>
              </button>
            ))}
          </div>
        </section>

        <p className="text-[10px] text-center text-zinc-400 font-medium pt-4">
          SigiMart v2.4.1 • Dibangun dengan Fresh Market Framework
        </p>
      </main>
    </div>
  );
}
