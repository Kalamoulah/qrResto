const BENEFITS = [
  {
    icon: "⚡",
    title: "Commande instantanée",
    desc: "Le client scanne et voit le menu complet en 2 secondes. Fini d'attendre qu'un serveur vienne prendre la commande.",
  },
  {
    icon: "📈",
    title: "Plus de ventes",
    desc: "Un menu visuel avec photos génère en moyenne 31% de commandes supplémentaires. Les clients voient tout, ils commandent plus.",
  },
  {
    icon: "✏️",
    title: "Menu toujours à jour",
    desc: "Modifiez vos plats, prix ou disponibilités en temps réel depuis votre téléphone. Sans réimprimer quoi que ce soit.",
  },
  {
    icon: "💰",
    title: "Zéro frais d'impression",
    desc: "Fini les menus plastifiés à refaire chaque saison. Un QR code durable, un menu numérique toujours propre et à jour.",
  },
];

export default function Benefits() {
  return (
    <section id="avantages" className="bg-gray-50 px-[5vw] py-24">
      <div className="section-eyebrow font-title-regular text-xs font-bold tracking-widest uppercase text-[#8B6914] mb-3">
        Vos avantages
      </div>
      <h2 className="font-title-regular text-4xl lg:text-5xl font-normal text-black mb-4">
        Avec QR Menu, vous <em className="text-[#8B6914]">gagnez</em> sur tous les fronts
      </h2>
      <p className="text-lg font-title-bold text-gray-500 max-w-xl mb-14 leading-relaxed">
        Un QR code par table. Votre menu toujours à jour. Aucun papier, aucune attente, aucun serveur débordé.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BENEFITS.map((b) => (
          <div
            key={b.title}
            className="benefit-card relative bg-white rounded-2xl p-8 border border-black/5 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 overflow-hidden"
          >
            <div className="w-12 h-12 bg-[#FDF6E3] rounded-xl flex items-center justify-center text-2xl mb-5">
              {b.icon}
            </div>
            <h3 className="text-base font-bold font-title-regular text-black mb-2">{b.title}</h3>
            <p className="text-sm text-gray-500 font-text leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
