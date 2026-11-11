const STEPS = [
  { num: "1", title: "Créez votre compte", desc: "Inscrivez-vous avec votre email. Aucune carte bancaire requise pour commencer." },
  { num: "2", title: "Ajoutez vos plats", desc: "Saisissez vos plats, prix et photos. L'interface est simple et rapide, même sur mobile." },
  { num: "3", title: "Imprimez vos QR codes", desc: "Générez un QR code par table. Imprimez et collez. Vos clients scannent directement." },
  { num: "4", title: "Gérez en temps réel", desc: "Plat épuisé ? Nouveau prix ? Modifiez depuis votre téléphone, le menu se met à jour partout." },
];

// Simple SVG QR code pattern
function QRCode() {
  const pattern = [
    [1,1,1,0,1],[1,0,1,1,0],[1,1,0,0,1],[0,1,1,0,1],[1,0,1,1,1],
  ];
  return (
    <div className="bg-white rounded-2xl p-6 text-center relative z-10">
      <div className="inline-block bg-[#FDF6E3] text-[#8B6914] border border-[#C9A84C]/30 rounded-lg px-3 py-1 text-xs font-bold mb-4">
        Table 7
      </div>
       <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="140" 
        height="140" 
        viewBox="0 0 16 16" 
        className="mx-auto mb-4"
      >
        <path fill="#000" d="M6 0h-6v6h6v-6zM5 5h-4v-4h4v4z"/>
        <path fill="#000" d="M2 2h2v2h-2v-2z"/>
        <path fill="#000" d="M0 16h6v-6h-6v6zM1 11h4v4h-4v-4z"/>
        <path fill="#000" d="M2 12h2v2h-2v-2z"/>
        <path fill="#000" d="M10 0v6h6v-6h-6zM15 5h-4v-4h4v4z"/>
        <path fill="#000" d="M12 2h2v2h-2v-2z"/>
        <path fill="#000" d="M2 7h-2v2h3v-1h-1z"/>
        <path fill="#000" d="M7 9h2v2h-2v-2z"/>
        <path fill="#000" d="M3 7h2v1h-2v-1z"/>
        <path fill="#000" d="M9 12h-2v1h1v1h1v-1z"/>
        <path fill="#000" d="M6 7v1h-1v1h2v-2z"/>
        <path fill="#000" d="M8 4h1v2h-1v-2z"/>
        <path fill="#000" d="M9 8v1h2v-2h-3v1z"/>
        <path fill="#000" d="M7 6h1v1h-1v-1z"/>
        <path fill="#000" d="M9 14h2v2h-2v-2z"/>
        <path fill="#000" d="M7 14h1v2h-1v-2z"/>
        <path fill="#000" d="M9 11h1v1h-1v-1z"/>
        <path fill="#000" d="M9 3v-2h-1v-1h-1v4h1v-1z"/>
        <path fill="#000" d="M12 14h1v2h-1v-2z"/>
        <path fill="#000" d="M12 12h2v1h-2v-1z"/>
        <path fill="#000" d="M11 13h1v1h-1v-1z"/>
        <path fill="#000" d="M10 12h1v1h-1v-1z"/>
        <path fill="#000" d="M14 10v1h1v1h1v-2h-1z"/>
        <path fill="#000" d="M15 13h-1v3h2v-2h-1z"/>
        <path fill="#000" d="M10 10v1h3v-2h-2v1z"/>
        <path fill="#000" d="M12 7v1h2v1h2v-2h-2z"/>
      </svg>
      
      <div className="text-xs text-gray-500">Scannez pour voir le menu</div>
      <div className="grid grid-cols-2 gap-3 mt-5">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-[#F0D080] text-xl font-bold font-serif">∞</div>
          <div className="text-gray-400 text-[10px] mt-0.5">Tables illimitées</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-[#F0D080] text-xl font-bold">24/7</div>
          <div className="text-gray-400 text-[10px] mt-0.5">Toujours disponible</div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="comment" className="bg-[#FDF6E3] px-[5vw] py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <div className="text-xs font-bold tracking-widest uppercase text-[#8B6914] mb-3 font-title-regular">Comment ça marche</div>
          <h2 className="font-title-regular text-4xl lg:text-5xl font-normal text-black mb-4">
            Donnez à votre restaurant la <em className="text-[#8B6914]">technologie</em> des grands.
          </h2>
          <p className="text-lg font-title-text text-gray-500 leading-relaxed mb-10">
            En moins de 30 minutes, votre menu est en ligne et vos QR codes prêts à l&apos;impression.
          </p>
          <ul className="space-y-6">
            {STEPS.map((step) => (
              <li key={step.num} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#C9A84C] text-black flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {step.num}
                </div>
                <div>
                  <h4 className="text-base font-bold font-title-regular text-black mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-500 font-text leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="bg-black rounded-2xl p-10 relative overflow-hidden"
          style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.2)" }}
        >
          <div className="absolute top-[-40px] right-[-40px] w-[200px] h-[200px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,168,76,0.2) 0%, transparent 70%)" }} />
          <QRCode />
          <p className="text-[#C9A84C]/60 text-xs text-center mt-4">
            ↑ Chaque table a son propre QR code
          </p>
        </div>
      </div>
    </section>
  );
}
