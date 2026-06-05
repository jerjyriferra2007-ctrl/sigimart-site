import React, { useState, useEffect } from 'react';
import { ActiveOrder, OrderStep } from '../types';

interface TrackingViewProps {
  activeOrder: ActiveOrder | null;
  onNavigate: (tab: any) => void;
  onResetOrder: () => void;
}

interface ChatMessage {
  sender: 'user' | 'driver';
  text: string;
  time: string;
}

export default function TrackingView({ activeOrder, onNavigate, onResetOrder }: TrackingViewProps) {
  // Simulated tracking state
  const [currentStep, setCurrentStep] = useState<OrderStep>('received');
  const [minsRemaining, setMinsRemaining] = useState(12);
  const [etaTime, setEtaTime] = useState('12:45');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: 'driver', text: 'Halo kak! Pesanan sayur organik SigiMart Anda sudah saya terima dan sedang dikoordinasikan. Ada tambahan lain?', time: 'Baru saja' }
  ]);
  const [showLocationAlert, setShowLocationAlert] = useState(false);

  // Auto-simulate delivery order steps for beautiful demonstration
  useEffect(() => {
    if (activeOrder) {
      setCurrentStep(activeOrder.status);
    }

    const stage1 = setTimeout(() => {
      setCurrentStep('processed');
      setMinsRemaining(9);
      setChatMessages((prev) => [
        ...prev,
        { sender: 'driver', text: 'Pesanan sedang dipacking aman menggunakan vakum pack dan siap dikirim ya kak.', time: 'Baru saja' }
      ]);
    }, 10000); // 10s to diproses

    const stage2 = setTimeout(() => {
      setCurrentStep('shipping');
      setMinsRemaining(5);
      setChatMessages((prev) => [
        ...prev,
        { sender: 'driver', text: 'Saya sudah di motor Honda Vario menuju Apartemen Green Bay Anda kak. Mohon ditunggu!', time: 'Baru saja' }
      ]);
    }, 22000); // 22s to sedang dikirim

    const stage3 = setTimeout(() => {
      setCurrentStep('arrived');
      setMinsRemaining(0);
      setChatMessages((prev) => [
        ...prev,
        { sender: 'driver', text: 'Sayur Segar SigiMart sudah sampai di tujuan kak! Terima kasih banyak atas kepercayaannya.', time: 'Baru saja' }
      ]);
    }, 35000); // 35s to arrived

    return () => {
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
    };
  }, [activeOrder]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg, time: 'Sekarang' }]);
    setChatInput('');

    // Simulated smart intelligent reply based on the active state
    setTimeout(() => {
      let response = 'Siap dimengerti kak! Saya laksanakan secepatnya.';
      if (currentStep === 'received') {
        response = 'Sip kak, saat ini petugas SigiMart sedang memilah kesegaran sayurannya dari rak.';
      } else if (currentStep === 'processed') {
        response = 'Baik kak, kemasan vakum pack double kami pastikan rapat dan rapi agar sayur tetap segar.';
      } else if (currentStep === 'shipping') {
        response = 'Siap kak, sebentar lagi saya sampai di Jl. Kebon Jeruk/Pluit. Ditunggu di depan ya!';
      } else if (currentStep === 'arrived') {
        response = 'Sama-sama kak! Semoga sayurannya bermanfaat dan sehat selalu!';
      }
      setChatMessages((prev) => [...prev, { sender: 'driver', text: response, time: 'Sekarang' }]);
    }, 1500);
  };

  const handleReset = () => {
    onResetOrder();
    onNavigate('home');
  };

  const triggerMyPositionAlert = () => {
    setShowLocationAlert(true);
    setTimeout(() => setShowLocationAlert(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFB]">
      {/* Top Navigation AppBar */}
      <header className="bg-white/95 backdrop-blur-md flex justify-between items-center w-full px-5 h-16 border-b border-zinc-100 shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('home')}
            className="hover:bg-emerald-50 p-2 rounded-full cursor-pointer text-[#006d37] transition-colors active-press"
          >
            <span className="material-symbols-outlined font-bold text-xl">arrow_back</span>
          </button>
          <h1 className="text-lg font-extrabold text-[#006d37]">Lacak Pesanan</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-emerald-50 text-[#006d37] rounded-full active-press">
            <span className="material-symbols-outlined material-symbols-fill text-[22px]">notifications</span>
          </button>
        </div>
      </header>

      {/* Manual progression simulator banner info */}
      <div className="bg-emerald-900 text-white text-[11px] font-bold py-2.5 px-5 flex items-center justify-between shadow-inner">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2ECC71] animate-ping"></span>
          <span>Simulasi Pengiriman Real-time Berjalan...</span>
        </div>
        <div className="flex gap-1.5">
          <button 
            onClick={() => {
              setCurrentStep('received');
              setMinsRemaining(12);
            }} 
            className="bg-transparent hover:bg-white/10 px-2 py-0.5 rounded border border-white/20 active-press text-[9px]"
          >
            S1
          </button>
          <button 
            onClick={() => {
              setCurrentStep('processed');
              setMinsRemaining(9);
            }} 
            className="bg-transparent hover:bg-white/10 px-2 py-0.5 rounded border border-white/20 active-press text-[9px]"
          >
            S2
          </button>
          <button 
            onClick={() => {
              setCurrentStep('shipping');
              setMinsRemaining(5);
            }} 
            className="bg-transparent hover:bg-white/10 px-2 py-0.5 rounded border border-white/20 active-press text-[9px]"
          >
            S3
          </button>
          <button 
            onClick={() => {
              setCurrentStep('arrived');
              setMinsRemaining(0);
            }} 
            className="bg-transparent hover:bg-white/10 px-2 py-0.5 rounded border border-white/20 active-press text-[9px]"
          >
            S4
          </button>
        </div>
      </div>

      <main className="relative flex-1 pb-24">
        {/* Live Map illustration Section */}
        <section className="w-full h-[380px] relative overflow-hidden bg-zinc-100">
          <img 
            alt="Jakarta 3D modern neighborhood design view illustration map" 
            className="w-full h-full object-cover transition-transform duration-1000"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnMkkg8xV2nZgRP4_H9U-sC-XgIe74jCLGnzKLNdtGGSZQPT8VZyCIt7u9q12W8pZhQVt9gTMfR2isEpE426iZNUbt9qeS-tMRm5vo1I6qeAGMai5M_LlcUQ9zHsYAWWWSeaBetdf9TiwzVnPEUkM6BY0cdi2y7juHkXw2QaaRYo5nRRrR_COiq0UgYqHSLiK-5xyblREC383yFse6bymd87ujHAal9zk7MbM2JJ08veWBe7qqkzRhmYDGXVXtDvreM4bURwym2Uhi" 
          />
          
          {/* My location locator warning alert */}
          {showLocationAlert && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-zinc-950/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-bold shadow-lg flex items-center gap-1.5 transition-all animate-bounce">
              <span className="material-symbols-outlined text-sm text-[#2ECC71]">gps_fixed</span> GPS: Sinkronisasi Lokasi Sukses
            </div>
          )}

          {/* Map Overlay UI */}
          <div className="absolute inset-0 pointer-events-none p-5 flex flex-col justify-between z-10">
            <div className="flex justify-between items-start w-full">
              <div className="bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-md pointer-events-auto border border-zinc-200/40 text-left min-w-[150px]">
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5">Estimasi Tiba</p>
                <p className="text-xl font-extrabold text-[#006d37] font-sans leading-none flex items-baseline gap-1">
                  {currentStep === 'arrived' ? 'Tiba' : '12:45'}
                  <span className="text-[10px] text-zinc-500 font-bold whitespace-nowrap">
                    {currentStep === 'arrived' ? 'di tempat' : `(${minsRemaining} menit lagi)`}
                  </span>
                </p>
              </div>
              
              <button 
                onClick={triggerMyPositionAlert}
                className="bg-white p-3.5 rounded-full shadow-lg pointer-events-auto hover:bg-zinc-50 transition-all active:scale-90 border border-zinc-200/50 cursor-pointer flex items-center justify-center text-zinc-700"
              >
                <span className="material-symbols-outlined text-xl">my_location</span>
              </button>
            </div>
          </div>

          {/* Smooth map-gradient background blending layer */}
          <div className="absolute bottom-0 left-0 right-0 h-24 map-gradient z-10"></div>
        </section>

        {/* Content detail container wrapper overlay */}
        <div className="px-5 -mt-8 relative z-20 space-y-5">
          
          {/* Status Stepper Bento Box */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-zinc-100/60 flex flex-col gap-5 text-left transition-all">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-100">
              <h2 className="font-extrabold text-sm text-zinc-800">Status Pengiriman</h2>
              <span className="bg-[#eef6eb] border border-emerald-100 text-[#006d37] px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase">
                ID #{activeOrder?.id || 'SG-99201'}
              </span>
            </div>

            {/* Micro progress stepper diagram */}
            <div className="flex justify-between items-start relative px-1">
              {/* Progress Line connectors track */}
              <div className="absolute top-5 left-8 right-8 h-0.5 bg-zinc-100">
                <div 
                  className="h-full bg-[#2ECC71] transition-all duration-1000 ease-out"
                  style={{ 
                    width: 
                      currentStep === 'received' ? '0%' :
                      currentStep === 'processed' ? '33%' :
                      currentStep === 'shipping' ? '66%' : '100%'
                  }}
                ></div>
              </div>

              {/* Steps bubble metrics */}
              {[
                { step: 'received', label: 'Pesanan Diterima', icon: 'check_circle' },
                { step: 'processed', label: 'Diproses', icon: 'inventory_2' },
                { step: 'shipping', label: 'Sedang Dikirim', icon: 'delivery_dining' },
                { step: 'arrived', label: 'Tiba di Tujuan', icon: 'home' }
              ].map((s, idx) => {
                const stepsList: OrderStep[] = ['received', 'processed', 'shipping', 'arrived'];
                const activeIndex = stepsList.indexOf(currentStep);
                const stepIndex = stepsList.indexOf(s.step as any);
                
                const isCompleted = stepIndex <= activeIndex;
                const isCurrent = s.step === currentStep;

                return (
                  <div key={s.step} className="flex flex-col items-center gap-2 relative z-10 w-16">
                    <div 
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isCompleted 
                          ? 'bg-[#006d37] text-white ring-4 ring-emerald-500/10' 
                          : 'bg-white border-2 border-zinc-200 text-zinc-400'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-[18px] ${isCompleted ? 'material-symbols-fill' : ''}`}>
                        {s.icon}
                      </span>
                    </div>
                    <span className={`text-[9px] text-center font-bold uppercase tracking-tight leading-tight ${
                      isCompleted ? 'text-[#006d37]' : 'text-zinc-400'
                    }`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier Card details with active Chat interactions */}
          <div className="bg-white rounded-3xl p-5 shadow-md border border-zinc-100/60 text-left">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  alt="Ahmad Hidayat delivery driver avatar icon photo" 
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#e8f0e5]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbrFdC_QVfEnPiuoPFE__ITbXfWQJX2h5yZ993my5--ABqMuTpfnQUNfPFHLvffkfPM5tZj_wNJlxMEVNxYXsMlEJAk-9WsML9ChIyycxNuzD2mpxP1CUcqnpusNPTeQurrxpYLFW7tEgFAmJ4AtzA7h9fQHtR1NmZNOO0dI3Oxe1m1mpwXqFaAVMrG-PtLA6_fsG0sOLsP_XgPSPiDqvSLqMjapTWDMv2a-Y06TGNB4aXxBtHeCxLICVIr_488JTFtBVXh1abaBiE" 
                />
                <div className="absolute -bottom-1 -right-1 bg-[#F1C40F] w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[11px] text-white material-symbols-fill">star</span>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-extrabold text-zinc-800 tracking-tight">Ahmad Hidayat</h3>
                <p className="text-[11px] text-zinc-400 font-bold">
                  Kurir SigiMart • <span className="text-[#006d37] font-extrabold">4.9 Rating</span>
                </p>
                <p className="text-[11px] text-zinc-500 font-bold mt-0.5 leading-none">
                  Honda Vario • B 1234 SGM
                </p>
              </div>

              <div className="flex gap-2.5">
                <button 
                  onClick={() => setChatOpen(!chatOpen)}
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer active-press ${chatOpen ? 'bg-emerald-600 text-white shadow-md' : 'bg-zinc-100 hover:bg-zinc-200 text-emerald-800'}`}
                >
                  <span className="material-symbols-outlined text-lg material-symbols-fill">chat</span>
                </button>
                <a 
                  href="tel:123456"
                  onClick={(e) => {
                    // prevent reload but simulate visual cue
                    e.preventDefault();
                    triggerMyPositionAlert();
                  }}
                  className="w-11 h-11 rounded-2xl bg-[#006d37] text-white flex items-center justify-center active-press cursor-pointer text-center hover:bg-emerald-800"
                >
                  <span className="material-symbols-outlined text-lg">call</span>
                </a>
              </div>
            </div>

            {/* Live Interactive Chat bubble Widget overlay if active */}
            {chatOpen && (
              <div className="mt-4 border-t border-zinc-100 pt-4 space-y-3.5 animate-slide-up">
                <div className="bg-[#F8FAFB] p-3 rounded-2xl h-44 overflow-y-auto space-y-3.5 border border-zinc-200/50 flex flex-col text-xs hide-scrollbar">
                  {chatMessages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm text-left ${
                        msg.sender === 'user' 
                          ? 'bg-emerald-600 text-white rounded-tr-none self-end' 
                          : 'bg-white border text-zinc-800 rounded-tl-none self-start border-zinc-200/60'
                      }`}
                    >
                      <p className="font-semibold leading-relaxed">{msg.text}</p>
                      <span className={`text-[8px] font-bold block pt-1 text-right ${msg.sender === 'user' ? 'text-emerald-100' : 'text-zinc-400'}`}>
                        {msg.time}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Tulis pesan ke Ahmad..." 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  />
                  <button 
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 rounded-xl flex items-center justify-center cursor-pointer active-press"
                  >
                    Kirim
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Quick billing summary packaging section */}
          <div className="bg-white rounded-3xl p-5 shadow-md border border-zinc-100/60 text-left">
            <h2 className="text-xs font-extrabold text-zinc-800 pb-3 border-b border-zinc-50 tracking-tight leading-none mb-4 uppercase">
              Ringkasan Pesanan
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#eef6eb] flex items-center justify-center text-[#006d37]">
                  <span className="material-symbols-outlined text-xl">location_on</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-zinc-400 leading-none mb-1">Alamat Pengiriman</p>
                  <p className="text-xs font-bold text-zinc-800 truncate leading-tight">
                    {activeOrder?.address?.fullAddress || 'Apartemen Green Bay, Pluit, Tower B, No 12'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#eef6eb] flex items-center justify-center overflow-hidden border border-zinc-100">
                  <img 
                    alt="Garden fresh macro leafy bok choy" 
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5E6JnZU_tyRkCls37CdNIPTbV1czjJTjJQwkUs1yVZ7lh4AsyVQyYOJO1ONYgPb-A7orZG5TPsUBVNBWgcSxqxT3Qm1D0HXjEAIkOPWYqwcsqZ6FxKm-bwdgEBOJWmhBpUseWHcFY90WkUwRIyr2F9EnNNLrVndx_QNRId3tCeiwlmHe9YaX4GAOOu4zHA824crEF8d0_BoR3K79-tDvfPeCk66Ylnv8IVIToW9XSOYIOJJksYfuPprbdyluEBjAiv0QgmkfvVxhk" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-[#006d37] leading-none mb-1 uppercase tracking-wider">Paket Sayur Segar</p>
                  <p className="text-xs font-bold text-zinc-800 truncate leading-tight">
                    {activeOrder?.items?.map(it => it.product.name).join(', ') || 'Bayam, Wortel, + 4 produk lainnya'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-zinc-800 text-sans">
                    Rp {(activeOrder?.total || 84500).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core action back to catalog harian trigger */}
          <div className="pt-2">
            <button 
              onClick={handleReset}
              className="w-full bg-[#006d37] hover:bg-emerald-800 text-white font-extrabold py-4 rounded-full shadow-md active-press cursor-pointer flex items-center justify-center gap-2 text-xs"
            >
              <span className="material-symbols-outlined text-base">shopping_basket</span>
              Kembali Belanja Sayuran Segar
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
