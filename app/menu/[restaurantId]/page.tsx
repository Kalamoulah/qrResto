"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Flame, X } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
type Category = "Entrées" | "Plats" | "Boissons" | "Desserts";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  emoji: string;
  category: Category;
  prepTime: string;
  spicy: boolean;
  calories: string;
  ingredients: string[];
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const menuItems: MenuItem[] = [
  {
    id: 3,
    name: "Central Gyros",
    description: "Le meilleur gyros de la ville, garni de légumes frais, sauce tzatziki maison et viande marinée aux herbes méditerranéennes.",
    price: 14.99,
    emoji: "🥙",
    category: "Entrées",
    prepTime: "10 min",
    spicy: false,
    calories: "540 kcal",
    ingredients: ["Pita artisanal", "Viande marinée", "Tomate", "Oignon rouge", "Tzatziki maison", "Feta"],
  },
  {
    id: 4,
    name: "French Fries Premium",
    description: "Frites belges croustillantes à l'extérieur, moelleuses à l'intérieur. Assaisonnées de fleur de sel et herbes fraîches.",
    price: 9.99,
    emoji: "🍟",
    category: "Entrées",
    prepTime: "8 min",
    spicy: false,
    calories: "380 kcal",
    ingredients: ["Pommes de terre Agria", "Huile de tournesol", "Fleur de sel", "Paprika fumé"],
  },
  {
    id: 5,
    name: "Butter Chicken",
    description: "Le classique indien par excellence. Poulet fondant dans une sauce tomate crémeuse au beurre et aux épices douces.",
    price: 16.99,
    emoji: "🫕",
    category: "Plats",
    prepTime: "20 min",
    spicy: true,
    calories: "710 kcal",
    ingredients: ["Poulet tikka", "Tomates concassées", "Crème fraîche", "Garam masala", "Ghee", "Riz basmati"],
  },
  {
    id: 6,
    name: "Biryani Royal",
    description: "Riz parfumé au safran et cardamome, agrémenté d'agneau confit et garni d'oignons caramélisés et noix de cajou.",
    price: 19.99,
    emoji: "🍛",
    category: "Plats",
    prepTime: "30 min",
    spicy: true,
    calories: "820 kcal",
    ingredients: ["Riz Basmati", "Agneau", "Safran", "Cardamome", "Oignons", "Noix de cajou"],
  },
  {
    id: 7,
    name: "Lassi Mangue",
    description: "Boisson onctueuse à base de yaourt et mangue Alphonso fraîche. Rafraîchissante et légèrement sucrée.",
    price: 5.99,
    emoji: "🥭",
    category: "Boissons",
    prepTime: "5 min",
    spicy: false,
    calories: "220 kcal",
    ingredients: ["Yaourt entier", "Mangue Alphonso", "Lait", "Sucre de canne", "Cardamome"],
  },
  {
    id: 8,
    name: "Chaï Masala",
    description: "Thé épicé traditionnel infusé avec cannelle, gingembre, cardamome et clous de girofle. Un voyage sensoriel en tasse.",
    price: 3.99,
    emoji: "☕",
    category: "Boissons",
    prepTime: "7 min",
    spicy: false,
    calories: "120 kcal",
    ingredients: ["Thé Assam", "Lait entier", "Cannelle", "Gingembre", "Cardamome", "Clous de girofle"],
  },
  {
    id: 9,
    name: "Gulab Jamun",
    description: "Boulettes dorées à base de lait réduit, imbibées de sirop de rose et de cardamome. Le dessert indien par excellence.",
    price: 6.99,
    emoji: "🍮",
    category: "Desserts",
    prepTime: "10 min",
    spicy: false,
    calories: "310 kcal",
    ingredients: ["Lait en poudre", "Farine", "Ghee", "Eau de rose", "Cardamome", "Safran"],
  },
  {
    id: 10,
    name: "Kulfi Pistache",
    description: "Glace indienne dense et crémeuse aux pistaches et à la cardamome. Moins aérée qu'une glace classique, beaucoup plus gourmande.",
    price: 7.99,
    emoji: "🍦",
    category: "Desserts",
    prepTime: "5 min",
    spicy: false,
    calories: "280 kcal",
    ingredients: ["Lait entier", "Crème", "Pistaches", "Cardamome", "Eau de rose", "Sucre"],
  },
];

const categories: Category[] = ["Entrées", "Plats", "Boissons", "Desserts"];

// ── Animation variants (identiques au register) ──
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

// ── Component ──────────────────────────────────────────────────────────────
export default function SpicyCabPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Entrées");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filtered = menuItems.filter((item) => item.category === activeCategory);

  const openSheet = (item: MenuItem) => {
    setSelectedItem(item);
    setSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans">
      {/* ── Header avec animation ── */}
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100 px-5 py-4 flex items-center justify-between"
      >
        <div className="w-9" />
        <h1 className="text-sm font-bold tracking-[0.2em] uppercase text-stone-800">
          The SpicyCab
        </h1>
        <div className="w-9" />
      </motion.header>

      <main className="px-5 pb-10">
        {/* ── Hero greeting avec animation ── */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 mb-5"
        >
          <p className="text-stone-400 text-sm">Bonjour 👋</p>
          <h2 className="text-2xl font-bold text-stone-800 mt-0.5">
            Que souhaitez-vous <br />
            <span className="text-[#C9A84C]">déguster</span> aujourd'hui ?
          </h2>
        </motion.div>

        {/* ── Category Pills avec animation ── */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-4"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#C9A84C] text-white shadow-lg shadow-[#C9A84C]/30"
                  : "bg-white text-stone-600 border border-stone-200 hover:border-[#C9A84C] hover:text-[#C9A84C]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Section title avec animation ── */}
        <motion.h3
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-lg font-bold text-stone-800 mt-7 mb-4"
        >
          Menu Populaire
        </motion.h3>

        {/* ── Grid avec animation stagger (comme register) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-2 gap-3"
          >
            {filtered.map((item) => (
              <motion.button
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openSheet(item)}
                className="bg-white rounded-2xl p-3 text-left shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="w-full aspect-square rounded-xl bg-[#F7F5F2] flex items-center justify-center mb-3 text-5xl">
                  {item.emoji}
                </div>
                <p className="text-lg font-bold text-stone-800">
                  ${item.price.toFixed(2)}
                </p>
                <p className="text-xs text-stone-500 mt-0.5 leading-snug line-clamp-2">
                  {item.name}
                </p>
            
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Bottom Sheet avec animation spring ── */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-3xl p-0 border-0 max-h-[85vh] overflow-y-auto"
        >
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="pb-8"
              >
                {/* Bouton fermeture */}
                <button
                  onClick={() => setSheetOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white z-10"
                >
                  <X size={16} />
                </button>

                {/* Big emoji hero */}
                <div className="bg-[#F7F5F2] flex items-center justify-center py-10 text-8xl rounded-t-3xl">
                  {selectedItem.emoji}
                </div>

                <div className="px-6 pt-5">
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold text-stone-800 leading-tight">
                        {selectedItem.name}
                      </h2>
                      <p className="text-[#C9A84C] font-bold text-2xl mt-1">
                        ${selectedItem.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                     
                      {selectedItem.spicy && (
                        <Badge className="bg-red-50 text-[#C9A84C] border-red-200 text-xs">
                          🌶️ Épicé
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Meta row */}
                  <div className="flex gap-4 mt-4 text-sm text-stone-500">
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {selectedItem.prepTime}
                    </span>
                    <span className="flex items-center gap-1">
                      🔥 {selectedItem.calories}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-stone-500 text-sm leading-relaxed mt-4">
                    {selectedItem.description}
                  </p>

                  {/* Ingredients avec animation stagger */}
                  <div className="mt-5">
                    <h4 className="font-semibold text-stone-700 text-sm mb-2">
                      Ingrédients
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.ingredients.map((ing, idx) => (
                        <motion.span
                          key={ing}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.03, duration: 0.2 }}
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
    </div>
  );
}