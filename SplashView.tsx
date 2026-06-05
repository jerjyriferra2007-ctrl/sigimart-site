import React, { useEffect, useState } from 'react';

interface SplashViewProps {
  onBypass: () => void;
}

export default function SplashView({ onBypass }: SplashViewProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onBypass, 400); // trigger move to main app
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onBypass]);

  return (
    <main className="relative h-full min-h-[750px] w-full bg-[#f3fcf1] flex flex-col items-center justify-between py-12 px-6 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#2ECC71]/10 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#006d37]/10 rounded-full blur-3xl opacity-40"></div>

      <div></div> {/* Spacer */}

      {/* Core brand logo and message */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-6 text-center">
        <div className="relative">
          {/* Elevation pulse effect */}
          <div className="absolute inset-0 bg-[#2ECC71]/20 rounded-full blur-xl scale-125 opacity-50 animate-pulse"></div>
          
          <div className="relative bg-white p-6 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#e2ebe0] overflow-hidden">
            <img 
              alt="SigiMart logo banner icon" 
              className="w-32 h-32 md:w-36 md:h-36 object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7jWADrizXO3vIZtzD7haTPM_zzekl3z0jAznAi-jqMgkDWBnMveAUaNFatNAdTDfSPyrnbS6wrOI8fWRfA3Cu69w1G3i2PSTQnn-Hv2KNcFLd4a56-OCnJ_5MWq91JgnMNnFZJZA5vZojmzh4lnSLs-6ipH9kKnhgTsxamnpeSaGUU8ddUmsGpQbf_iwqnJp9_55i9pV3L3GHU-dfe2QvQveJyX5qm-jAUpxfvs_s2AWf_2-wdf92OojvniozzJU0XnPMOo_V3hQI" 
            />
          </div>
        </div>

        {/* Brand name & slogan */}
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-4xl font-extrabold text-[#006d37] tracking-tight font-sans">
            SigiMart
          </h1>
          <p className="text-base font-medium text-[#3d4a3e] max-w-[280px] leading-relaxed">
            Segar dari pasar, langsung ke meja makan Anda.
          </p>
        </div>
      </div>

      {/* Loading bottom area */}
      <div className="relative z-10 flex flex-col items-center space-y-3 w-full max-w-xs">
        {/* Customized percentage track */}
        <div className="w-full h-1.5 bg-zinc-200/60 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#2ECC71] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex flex-col items-center gap-1">
          {/* Animated dot loaders */}
          <div className="flex space-x-1.5 justify-center items-center">
            <span className={`w-2 h-2 rounded-full bg-[#2ECC71] transition-all duration-300 ${progress % 3 === 0 ? 'scale-125 opacity-100' : 'opacity-40'}`}></span>
            <span className={`w-2 h-2 rounded-full bg-[#2ECC71] transition-all duration-300 ${progress % 3 === 1 ? 'scale-125 opacity-100' : 'opacity-40'}`}></span>
            <span className={`w-2 h-2 rounded-full bg-[#2ECC71] transition-all duration-300 ${progress % 3 === 2 ? 'scale-125 opacity-100' : 'opacity-40'}`}></span>
          </div>
          
          <button 
            onClick={onBypass}
            className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#6c7b6d] hover:text-[#006d37] transition-all active:scale-95 flex items-center gap-1 bg-white/80 py-1.5 px-4 rounded-full border border-[#dce5da] shadow-sm active-press"
          >
            Memuat Kesegaran... <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
          </button>
        </div>
      </div>

      {/* Abstract wave decoration at bottom floor */}
      <div className="absolute bottom-0 w-full h-24 opacity-10 pointer-events-none">
        <svg className="w-full h-full" fill="none" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 256L48 229.3C96 203 192 149 288 154.7C384 160 480 224 576 218.7C672 213 768 139 864 128C960 117 1056 171 1152 197.3C1248 224 1344 224 1392 224L1440 224V320H1392C1344 320 1248 320 1152 320C1056 320 960 320 864 320C768 320 672 320 576 320C480 320 384 320 288 320C192 320 96 320 48 320H0V256Z" fill="#2ECC71"></path>
        </svg>
      </div>
    </main>
  );
}
