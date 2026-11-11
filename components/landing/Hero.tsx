"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Clock, Flame, X } from "lucide-react";

const MENU_ITEMS = {
  entrees: [
    { id: 1, emoji: "🥗", name: "Salade Thiebou", desc: "Riz, légumes, poisson fumé", price: "2 500 FCFA", prepTime: "10 min", spicy: false, calories: "320 kcal", ingredients: ["Riz", "Laitue", "Tomate", "Poisson fumé"] },
    { id: 2, emoji: "🍲", name: "Soupe Kandia", desc: "Gombo, viande, crevettes", price: "2 000 FCFA", prepTime: "15 min", spicy: true, calories: "280 kcal", ingredients: ["Gombo", "Viande", "Crevettes"] },
    { id: 3, emoji: "🥑", name: "Avocado Crevettes", desc: "Avocat, crevettes, sauce légère", price: "3 000 FCFA", prepTime: "12 min", spicy: false, calories: "350 kcal", ingredients: ["Avocat", "Crevettes", "Sauce légère"] },
  ],
  plats: [
    { id: 4, emoji: "🍛", name: "Mafé Royal", desc: "Bœuf, arachide, légumes du jour", price: "3 500 FCFA", prepTime: "25 min", spicy: false, calories: "650 kcal", ingredients: ["Bœuf", "Pâte d'arachide", "Légumes"] },
    { id: 5, emoji: "🐟", name: "Ceebu Jën Blanc", desc: "Riz blanc, thiof entier, sauce", price: "4 000 FCFA", prepTime: "30 min", spicy: false, calories: "720 kcal", ingredients: ["Riz", "Thiof", "Légumes"] },
    { id: 6, emoji: "🍗", name: "Yassa Poulet", desc: "Poulet mariné, oignons, riz", price: "3 500 FCFA", prepTime: "20 min", spicy: true, calories: "580 kcal", ingredients: ["Poulet", "Oignon", "Citron", "Riz"] },
    { id: 7, emoji: "🍖", name: "Dibi", desc: "Grillade de mouton, oignons", price: "4 500 FCFA", prepTime: "20 min", spicy: true, calories: "680 kcal", ingredients: ["Mouton", "Oignons", "Épices"] },
  ],
  boissons: [
    { id: 8, emoji: "🥤", name: "Bissap", desc: "Jus d'hibiscus frais", price: "1 000 FCFA", prepTime: "5 min", spicy: false, calories: "120 kcal", ingredients: ["Hibiscus", "Sucre", "Eau"] },
    { id: 9, emoji: "🧃", name: "Jus de Bouye", desc: "Jus de fruit du baobab", price: "1 000 FCFA", prepTime: "5 min", spicy: false, calories: "110 kcal", ingredients: ["Bouye", "Sucre", "Vanille"] },
    { id: 10, emoji: "🥛", name: "Lait caillé", desc: "Traditionnel", price: "800 FCFA", prepTime: "3 min", spicy: false, calories: "90 kcal", ingredients: ["Lait", "Ferments"] },
  ],
  desserts: [
    { id: 11, emoji: "🍰", name: "Thiakry", desc: "Semoule au lait caillé", price: "1 500 FCFA", prepTime: "10 min", spicy: false, calories: "250 kcal", ingredients: ["Semoule", "Lait caillé", "Vanille"] },
    { id: 12, emoji: "🍌", name: "Beignets", desc: "Beignets de banane", price: "1 000 FCFA", prepTime: "15 min", spicy: false, calories: "300 kcal", ingredients: ["Banane", "Farine", "Sucre"] },
  ],
};

type Category = "entrees" | "plats" | "boissons" | "desserts";
type DemoStep = "scan" | "loading" | "menu" | "add-item" | "view-cart" | "reset";

interface CartItem {
  id: number;
  name: string;
  price: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const scalePulse = {
  initial: { scale: 1 },
  animate: { scale: [1, 1.05, 1] },
  transition: { duration: 0.5, repeat: Infinity }
};

function PhoneMockup() {
  const [activeCategory, setActiveCategory] = useState<Category>("plats");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [demoStep, setDemoStep] = useState<DemoStep>("scan");
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const categories = [
    { id: "entrees" as Category, label: "Entrées" },
    { id: "plats" as Category, label: "Plats" },
    { id: "boissons" as Category, label: "Boissons" },
    { id: "desserts" as Category, label: "Desserts" },
  ];

  const currentItems = MENU_ITEMS[activeCategory];
  const mafeItem = MENU_ITEMS.plats.find(item => item.id === 4);

  const handleAddToCart = (item: CartItem) => {
    setCart([...cart, item]);
    setToastMessage(`${item.name} ajouté au panier`);
    setTimeout(() => setToastMessage(null), 1500);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace(/\D/g, ""));
      return total + price;
    }, 0);
  };

  const openSheet = (item: any) => {
    setSelectedItem(item);
    setSheetOpen(true);
    handleUserInteraction();
  };

  // Animation de scan
  useEffect(() => {
    if (isUserInteracted) return;

    if (demoStep === "scan") {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setDemoStep("loading");
            return 100;
          }
          return prev + 10;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [demoStep, isUserInteracted]);

  // Animation principale
  useEffect(() => {
    if (isUserInteracted) return;

    const timers: NodeJS.Timeout[] = [];

    if (demoStep === "loading") {
      const timer = setTimeout(() => {
        setDemoStep("menu");
      }, 1500);
      timers.push(timer);
    }

    if (demoStep === "menu") {
      const timer = setTimeout(() => {
        setDemoStep("add-item");
      }, 2500);
      timers.push(timer);
    }

    if (demoStep === "add-item" && mafeItem) {
      const timer = setTimeout(() => {
        handleAddToCart({ id: mafeItem.id, name: mafeItem.name, price: mafeItem.price });
        setDemoStep("view-cart");
      }, 1000);
      timers.push(timer);
    }

    if (demoStep === "view-cart") {
      const timer1 = setTimeout(() => {
        setIsCartOpen(true);
      }, 800);
      const timer2 = setTimeout(() => {
        setIsCartOpen(false);
        setDemoStep("reset");
      }, 3500);
      timers.push(timer1, timer2);
    }

    if (demoStep === "reset") {
      const timer = setTimeout(() => {
        setCart([]);
        setActiveCategory("plats");
        setScanProgress(0);
        setDemoStep("scan");
      }, 1500);
      timers.push(timer);
    }

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [demoStep, isUserInteracted, mafeItem]);

  const handleUserInteraction = () => {
    if (!isUserInteracted) {
      setIsUserInteracted(true);
      setDemoStep("menu");
      setScanProgress(100);
    }
  };

  // QR Code SVG
  const QRCodeSVG = () => (
    <svg width="120" height="120" viewBox="0 0 16 16" fill="none" className="mx-auto">
      <path fill="#000" d="M6 0h-6v6h6v-6zM5 5h-4v-4h4v4z" />
      <path fill="#000" d="M2 2h2v2h-2v-2z" />
      <path fill="#000" d="M0 16h6v-6h-6v6zM1 11h4v4h-4v-4z" />
      <path fill="#000" d="M2 12h2v2h-2v-2z" />
      <path fill="#000" d="M10 0v6h6v-6h-6zM15 5h-4v-4h4v4z" />
      <path fill="#000" d="M12 2h2v2h-2v-2z" />
      <path fill="#000" d="M2 7h-2v2h3v-1h-1z" />
      <path fill="#000" d="M7 9h2v2h-2v-2z" />
      <path fill="#000" d="M3 7h2v1h-2v-1z" />
      <path fill="#000" d="M9 12h-2v1h1v1h1v-1z" />
      <path fill="#000" d="M6 7v1h-1v1h2v-2z" />
      <path fill="#000" d="M8 4h1v2h-1v-2z" />
      <path fill="#000" d="M9 8v1h2v-2h-3v1z" />
      <path fill="#000" d="M7 6h1v1h-1v-1z" />
      <path fill="#000" d="M9 14h2v2h-2v-2z" />
      <path fill="#000" d="M7 14h1v2h-1v-2z" />
      <path fill="#000" d="M9 11h1v1h-1v-1z" />
      <path fill="#000" d="M9 3v-2h-1v-1h-1v4h1v-1z" />
      <path fill="#000" d="M12 14h1v2h-1v-2z" />
      <path fill="#000" d="M12 12h2v1h-2v-1z" />
      <path fill="#000" d="M11 13h1v1h-1v-1z" />
      <path fill="#000" d="M10 12h1v1h-1v-1z" />
      <path fill="#000" d="M14 10v1h1v1h1v-2h-1z" />
      <path fill="#000" d="M15 13h-1v3h2v-2h-1z" />
      <path fill="#000" d="M10 10v1h3v-2h-2v1z" />
      <path fill="#000" d="M12 7v1h2v1h2v-2h-2z" />
    </svg>
  );

  return (
    <>
      <div className="relative mx-auto w-[320px]" onClick={handleUserInteraction}>
        {/* Badge démo */}
        {!isUserInteracted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="bg-black/80 text-[#C9A84C] text-[10px] px-3 py-1 rounded-full flex items-center gap-1">
              <motion.span
                className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              Démo automatique
            </div>
          </motion.div>
        )}

        {/* Gold background */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[420px] h-[340px] rounded-[32px] -z-10"
          style={{ background: "linear-gradient(135deg, #C9A84C 0%, #8B6914 100%)" }}
        />

        {/* Phone frame */}
        <motion.div
          className="relative z-10 w-[300px] mx-auto bg-black rounded-[48px] p-[10px] shadow-[0_40px_100px_rgba(0,0,0,0.35)]"
          animate={demoStep === "scan" && !isUserInteracted ? { y: [0, -5, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative bg-[#F5F5F5] rounded-[40px] overflow-hidden flex flex-col" style={{ height: 620 }}>

            {/* Status bar */}
            <div className="bg-black flex items-center justify-between px-6 pt-3 pb-2">
              <span className="text-white text-[11px] font-semibold">9:41</span>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-full" />
              <div className="flex items-center gap-1">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="white"><rect x="0" y="3" width="3" height="7" rx="1" /><rect x="4" y="2" width="3" height="8" rx="1" /><rect x="8" y="0" width="3" height="10" rx="1" /><rect x="12" y="1" width="2" height="9" rx="1" /></svg>
                <svg width="13" height="10" viewBox="0 0 13 10" fill="white"><path d="M6.5 2C8.8 2 10.8 3 12.2 4.6L13 3.7C11.4 1.9 9.1.8 6.5.8S1.6 1.9 0 3.7l.8.9C2.2 3 4.2 2 6.5 2z" /><path d="M6.5 4.5c1.6 0 3 .7 4 1.7l.8-.9C10 4 8.4 3.3 6.5 3.3S3 4 1.7 5.3l.8.9c1-1 2.4-1.7 4-1.7z" /><circle cx="6.5" cy="8" r="1.5" /></svg>
              </div>
            </div>

            {/* Écran de scan QR */}
            <AnimatePresence mode="wait">
              {(demoStep === "scan" || demoStep === "loading") && !isUserInteracted && (
                <motion.div
                  key="scan-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 bg-black flex flex-col items-center justify-center"
                  style={{ top: 80 }}
                >
                  <motion.div
                    animate={demoStep === "scan" ? scalePulse.animate : {}}
                    transition={scalePulse.transition}
                    className="bg-white rounded-2xl p-4"
                  >
                    <QRCodeSVG />
                  </motion.div>
                  <motion.div className="w-32 h-0.5 bg-[#C9A84C]/30 rounded-full mt-6 overflow-hidden">
                    <motion.div
                      className="h-full bg-[#C9A84C] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${scanProgress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </motion.div>
                  <p className="text-[#C9A84C] text-xs mt-3">
                    {demoStep === "scan" ? "Scannez le QR code..." : "Chargement du menu..."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* App header */}
            <motion.div
              variants={headerVariants}
              initial="hidden"
              animate="visible"
              className="bg-black px-5 pt-2 pb-3 flex justify-between items-center"
            >
              <div>
                <div className="text-[#F0D080] font-bold text-[15px] mb-0.5">🍽 Le Baobab Doré</div>
                <div className="text-gray-400 text-[11px]">Table 7 · Menu du jour</div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); handleUserInteraction(); setIsCartOpen(!isCartOpen); }}
                className="relative"
              >
                <span className="text-[#F0D080] text-xl">🛒</span>
                <AnimatePresence>
                  {cart.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-[#C9A84C] text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {cart.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>

            {/* Panier modal */}
            <AnimatePresence>
              {isCartOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-24 left-2 right-2 bg-white rounded-2xl shadow-2xl z-20 p-4 border border-[#C9A84C]/30 max-h-80 overflow-auto"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-black">Mon panier</h3>
                    <button onClick={(e) => { e.stopPropagation(); handleUserInteraction(); setIsCartOpen(false); }} className="text-gray-400">✕</button>
                  </div>
                  {cart.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-4">Panier vide</p>
                  ) : (
                    <>
                      {cart.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex justify-between items-center py-2 border-b border-gray-100"
                        >
                          <span className="text-sm">{item.name}</span>
                          <span className="text-xs text-[#8B6914] font-bold">{item.price}</span>
                        </motion.div>
                      ))}
                      <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-200">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-[#8B6914]">{getTotalPrice().toLocaleString()} FCFA</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-4 bg-black text-[#C9A84C] py-2 rounded-xl text-sm font-bold"
                      >
                        Commander
                      </motion.button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Category pills */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="bg-white px-4 py-2.5 flex gap-2 flex-wrap justify-center border-b border-gray-100"
            >
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { handleUserInteraction(); setActiveCategory(cat.id); }}
                  className={`rounded-full px-3.5 py-1 text-[10px] font-bold whitespace-nowrap transition-all ${activeCategory === cat.id
                      ? "bg-black text-[#C9A84C]"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                >
                  {cat.label}
                </motion.button>
              ))}
            </motion.div>

            {/* Menu items - grid 2 colonnes */}
            <div className="bg-white px-3 flex-1 overflow-y-auto pb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="grid grid-cols-2 gap-2"
                >
                  {currentItems.map((item) => (
                    <motion.button
                      key={item.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => openSheet(item)}
                      className="bg-white rounded-xl p-2 text-left shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                    >
                      <div className="w-full aspect-square rounded-lg bg-[#F7F5F2] flex items-center justify-center text-4xl">
                        {item.emoji}
                      </div>
                      <p className="text-sm font-bold text-stone-800 mt-1">
                        {item.price}
                      </p>
                      <p className="text-[10px] text-stone-500 mt-0.5 leading-tight line-clamp-1">
                        {item.name}
                      </p>
                    </motion.button>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Toast notification */}
            <AnimatePresence>
              {toastMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-20 left-4 right-4 bg-black/90 text-[#C9A84C] text-xs text-center py-2 rounded-full"
                >
                  {toastMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Bottom Sheet pour les détails - PAS de bottom bar */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl p-0 border-0 max-h-[85vh] overflow-y-auto">
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="pb-8"
              >
                <button
                  onClick={() => setSheetOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white z-10"
                >
                  <X size={16} />
                </button>
                <div className="bg-[#F7F5F2] flex items-center justify-center py-10 text-8xl rounded-t-3xl">
                  {selectedItem.emoji}
                </div>
                <div className="px-6 pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold text-stone-800 leading-tight">{selectedItem.name}</h2>
                      <p className="text-[#C9A84C] font-bold text-2xl mt-1">{selectedItem.price}</p>
                    </div>
                    {selectedItem.spicy && (
                      <Badge className="bg-red-50 text-[#C9A84C] border-red-200 text-xs">🌶️ Épicé</Badge>
                    )}
                  </div>
                  <div className="flex gap-4 mt-4 text-sm text-stone-500">
                    <span className="flex items-center gap-1"><Clock size={13} /> {selectedItem.prepTime}</span>
                    <span className="flex items-center gap-1">🔥 {selectedItem.calories}</span>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed mt-4">{selectedItem.desc}</p>
                  <div className="mt-5">
                    <h4 className="font-semibold text-stone-700 text-sm mb-2">Ingrédients</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.ingredients.map((ing: string, idx: number) => (
                        <motion.span
                          key={ing}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.03 }}
                          className="px-3 py-1 bg-stone-100 rounded-full text-xs text-stone-600"
                        >
                          {ing}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden pb-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,168,76,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center font-title-regular gap-2 text-sm font-medium text-gray-600 mb-8"
        >
          <span className="text-base leading-none" style={{ color: "#C9A84C" }}>★★★★★</span>
          <span className="text-gray-900 font-semibold">4.9</span>
          <span className="text-gray-400">·</span>
          <span>Plus de 200 restaurants à Dakar</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-title-bold font-bold text-black leading-[1.02] tracking-tight mb-8"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", maxWidth: 920 }}
        >
          Vous perdez des ventes
          <br />
          à cause de l&apos;attente.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center bg-white"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all bg-black text-[#C9A84C]"
          >
            <Link href="/register">
              Créer mon menu QR gratuit
            </Link>
            <motion.svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative mt-16 w-full flex justify-center"
          style={{ paddingBottom: 0 }}
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}