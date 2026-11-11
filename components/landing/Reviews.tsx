// Reviews.tsx
const REVIEWS = [
  { initials: "AM", name: "Aminata M.", place: "Le Baobab Doré, Plateau", text: "Mes clients adorent. Ils scannent, ils voient les photos, ils commandent. J'ai gagné au moins une heure par soir sur le service." },
  { initials: "OD", name: "Ousmane D.", place: "Maquis Teranga, Ouakam", text: "En une semaine, mes revenus ont augmenté. Les gens commandent plus quand ils voient les photos. Simple et efficace." },
  { initials: "FK", name: "Fatou K.", place: "Chez Fatou, Almadies", text: "L'installation a pris 20 minutes. Maintenant mes serveurs peuvent se concentrer sur le service, pas sur la prise de commande." },
  { initials: "MS", name: "Moussa S.", place: "La Pirogue, Ngor", text: "Les touristes adorent. Ils peuvent lire le menu en français ou en anglais. Je n'avais pas pensé à ça." },
  { initials: "NB", name: "Ndéye B.", place: "Snack Jérébi, Médina", text: "Mon restaurant est petit, je n'ai que 8 tables. Mais avec QR Menu, je gère comme un grand. Le support est réactif." },
  { initials: "SN", name: "Seydou N.", place: "Le Thiossane, Sacré-Cœur", text: "Plus de menus plastifiés collants. Plus de fautes de prix. Mes clients ont confiance. Je recommande à tous." },
];

export default function Reviews() {
  return (
    <section id="temoignages" className="bg-white px-[5vw] py-24">
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 bg-[#FDF6E3] border border-[#C9A84C]/30 rounded-lg px-4 py-2 text-sm font-semibold text-[#8B6914] mb-6">
          ★★★★★ &nbsp; Noté 4.9 · Plus de 200 restaurants
        </div>
        <div className="text-xs font-bold font-title-regular tracking-widest uppercase text-[#8B6914] mb-3">Ce qu'ils disent</div>
        <h2 className="font-title-regular text-4xl lg:text-5xl font-normal text-black">
          Pourquoi nous sommes <em className="text-[#8B6914]">#1 à Dakar</em>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {REVIEWS.map((r) => (
          <div key={r.name} className="bg-gray-50 rounded-xl p-6 hover:-translate-y-0.5 transition-transform">
            <div className="text-yellow-400 text-sm mb-3">★★★★★</div>
            <p className="text-sm text-black leading-relaxed font-text mb-4">« {r.text} »</p>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full   bg-black text-[#C9A84C] flex items-center justify-center text-xs font-bold flex-shrink-0">
                {r.initials}
              </div>
              <div>
                <div className="text-sm font-bold font-title-regular  text-black">{r.name}</div>
                <div className="text-xs text-gray-500 font-text">{r.place}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
