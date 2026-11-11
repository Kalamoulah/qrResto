// Stats.tsx
const STATS = [
  { big: "+31%", caption: "de chiffre d'affaires supplémentaire grâce aux photos qui incitent les clients à découvrir plus de plats.", owner: "Aminata M.", place: "Le Baobab Doré, Plateau · Dakar" },
  { big: "+85 000 FCFA", caption: "de revenus mensuels en plus. Les clients commandaient des entrées et desserts qu'ils ne voyaient pas avant.", owner: "Ousmane D.", place: "Maquis Teranga, Ouakam · Dakar" },
  { big: "−14 min", caption: "de temps d'attente par table. La commande est prête à l'arrivée du serveur.", owner: "Fatou K.", place: "Chez Fatou, Almadies · Dakar" },
  { big: "+47%", caption: "de satisfaction client mesurée sur Google Reviews. Les clients apprécient la modernité et la clarté.", owner: "Moussa S.", place: "La Pirogue, Ngor · Dakar" },
  { big: "2× plus", caption: "de tables tournées par soir. Moins d'attente = clients satisfaits plus vite = plus de rotations.", owner: "Seydou N.", place: "Le Thiossane, Sacré-Cœur · Dakar" },
  { big: "+120 000 FCFA", caption: "de ventes le premier mois complet. Les touristes commandaient plus en voyant les descriptions claires.", owner: "Ndéye B.", place: "Snack Jérébi, Médina · Dakar" },
];

export function Stats() {
  return (
    <section className="bg-white px-[5vw] py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-16">
        <div>
          <div className="text-xs font-bold tracking-widest uppercase text-[#8B6914] mb-3 font-title-regular">Ils ont fait confiance à QR Menu</div>
          <h2 className=" text-4xl lg:text-5xl font-title-regular font-normal text-black">
            Des résultats <em className="text-[#8B6914]">chiffrés,</em> pas des promesses
          </h2>
        </div>
        <div>
          <p className="text-lg font-text text-gray-500 leading-relaxed">
            Ces restaurants de Dakar ont mesuré l&apos;impact de QR Menu sur leur activité. Voici leurs résultats réels, 3 mois après l&apos;adoption.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {STATS.map((s) => (
          <div key={s.owner} className="p-8 rounded-2xl border-[1.5px] border-[#C9A84C]/25 hover:border-[#C9A84C] hover:shadow-[0_8px_24px_rgba(201,168,76,0.1)] transition-all">
            <div className="font-italic-bold text-4xl text-black mb-2">
              {s.big.split(/(\d[\d\s]*)/).map((part, i) =>
                /\d/.test(part) ? <em key={i} className="text-[#8B6914] not-italic">{part}</em> : part
              )}
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.caption}</p>
            <div className="text-sm font-bold text-black">{s.owner}</div>
            <div className="text-xs text-gray-500">{s.place}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Beliefs.tsx
const BELIEFS = [
  { num: "01", title: "L'attente fait fuir", body: "Un client qui attend 15 minutes pour voir un menu est un client qui risque de partir. Dans un marché compétitif comme Dakar, chaque minute compte. La rapidité n'est pas un luxe, c'est une nécessité." },
  { num: "02", title: "Un menu visuel vend mieux", body: "Les études montrent qu'un plat avec photo se vend 30% plus souvent. Vos recettes méritent d'être vues. Un menu digital avec images transforme la décision d'achat de vos clients à chaque service." },
  { num: "03", title: "La tech n'est pas réservée aux grandes chaînes", body: "Chez QR Menu, nous croyons que chaque restaurant — du maquis de Médina au gastronomique des Almadies — mérite les mêmes outils que les grandes enseignes internationales." },
];

export function Beliefs() {
  return (
    <section className="bg-black px-[5vw] py-24">
      <div className="mb-16">
        <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-3 font-title-regular">Nos convictions</div>
        <h2 className="font-title-regular text-4xl lg:text-5xl font-normal text-white">
          3 vérités sur la<br />restauration à Dakar
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {BELIEFS.map((b) => (
          <div
            key={b.num}
            className="border border-[#C9A84C]/20 rounded-2xl p-10 hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all"
          >
            <div className="font-serif text-5xl text-[#C9A84C]/30 mb-4 leading-none">{b.num}</div>
            <h3 className="text-xl font-bold text-white mb-3 font-title-regular">{b.title}</h3>
            <p className="text-sm text-gray-500 font-text leading-relaxed">{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Pricing.tsx
const FEATURES = [
  "Menu digital illimité (plats, catégories, photos)",
  "QR codes illimités — un par table",
  "Mises à jour en temps réel depuis votre téléphone",
  "Menu disponible en français et anglais",
  "Tableau de bord — statistiques de consultation",
  "Support WhatsApp 7j/7 en français",
  "Installation guidée offerte",
];

export function Pricing() {
  return (
    <section id="tarif" className="bg-gray-50 px-[5vw] py-24 text-center">
      <div className="text-xs font-bold tracking-widest uppercase text-[#8B6914] mb-3 font-title-regular">Tarif simple</div>
      <h2 className="font-serif text-4xl lg:text-5xl font-normal text-black font-title-regular mb-4 max-w-md mx-auto">
        Un seul abonnement.<br />Tout inclus.
      </h2>
      <p className="text-lg text-gray-500  font-text max-w-lg mx-auto mb-14 leading-relaxed">
        Pas de frais cachés. Pas de commission. Pas de surprise. Juste un tarif honnête pour un outil qui fonctionne.
      </p>
      <div
        className="max-w-md mx-auto bg-black rounded-2xl p-12 relative overflow-hidden text-left"
        style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}
      >
        <div className="absolute top-[-60px] right-[-60px] w-[250px] h-[250px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 65%)" }} />

        <div className="inline-block bg-[#C9A84C] text-black rounded-full px-4 py-1 text-xs font-bold mb-6">
          ✦ Offre de lancement
        </div>
        <div className="font-title-regular text-6xl text-white leading-none mb-1">
          <span className="text-2xl">FCFA</span> 10 000
        </div>
        <div className="text-gray-500 text-sm mb-8">par mois · sans engagement</div>

        <ul className="space-y-0 mb-8">
          {FEATURES.map((f) => (
            <li key={f} className="flex items-center font-text gap-3 text-gray-300 text-sm py-2.5 border-b border-white/5">
              <span className="text-[#C9A84C] font-bold text-sm">✓</span>
              {f}
            </li>
          ))}
        </ul>

        <button className="w-full py-4 bg-[#C9A84C] text-black rounded-xl text-base font-bold hover:bg-[#F0D080] transition-all hover:-translate-y-0.5">
          Commencer gratuitement — 14 jours d&apos;essai
        </button>
        <p className="text-center text-xs text-gray-600 mt-4">
          Aucune carte bancaire requise · Paiement par Orange Money, Wave ou virement
        </p>
      </div>
    </section>
  );
}

// Footer.tsx
export function Footer() {
  return (
    <footer className="bg-[#111111] px-[5vw] pt-16 pb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5 font-bold text-xl text-white mb-4">
            <div className="w-9 h-9 bg-black border border-[#C9A84C]/30 rounded-[9px] flex items-center justify-center">
              <span className="text-[#F0D080] text-lg font-bold">Q</span>
            </div>
            QR Menu
          </div>
          <p className="text-sm text-gray-500 font-title-regular leading-relaxed max-w-xs">
            La solution de menu digital conçue pour les restaurants de Dakar et du Sénégal. Simple, rapide, abordable.
          </p>
        </div>
        {[
          { title: "Produit", links: ["Fonctionnalités", "Comment ça marche", "Tarif", "Démo"] },
          { title: "Ressources", links: ["Guide de démarrage", "FAQ", "Blog", "Cas clients"] },
          { title: "Contact", links: ["WhatsApp", "Email", "Instagram", "Support"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-bold font-title-regular uppercase tracking-widest text-[#C9A84C] mb-4">{col.title}</h4>
            {col.links.map((link) => (
              <a key={link} href="#" className="block font-text text-sm text-gray-500 hover:text-white transition-colors mb-2 no-underline">
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-xs text-gray-700">© 2025 QR Menu · Dakar, Sénégal</p>
        <p className="text-xs text-gray-700">Politique de confidentialité · Conditions d&apos;utilisation</p>
      </div>
    </footer>
  );
}

export default Stats;
