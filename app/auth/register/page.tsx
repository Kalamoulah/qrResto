// app/register/page.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Store, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Lock, 
  Eye, 
  EyeOff,
  QrCode,
  Upload,
  Image as ImageIcon,
  X
} from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("#C9A84C");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
    restaurantEmail: "",
    phone: "",
    address: "",
    city: "",
    neighborhood: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.password) return;
      if (formData.password !== formData.confirmPassword) return;
      setStep(2);
    } else if (step === 2) {
      if (!formData.restaurantName || !formData.phone) return;
      setIsLoading(true);
      // Sauvegarder les données (couleur + logo)
      setTimeout(() => {
        setIsLoading(false);
        router.push("/dashboard");
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-100 px-5 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#C9A84C] rounded-xl flex items-center justify-center">
              <QrCode size={16} className="text-white" />
            </div>
            <span className="font-bold text-stone-800">QR Menu</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm text-stone-600 hover:text-[#C9A84C] transition-colors">
              Connexion
            </Link>
            <Link
              href="/register"
              className="px-4 py-1.5 bg-[#C9A84C] text-white text-sm font-medium rounded-full shadow-md shadow-[#C9A84C]/30 hover:bg-[#b8982d] transition-all"
            >
              Inscription
            </Link>
          </div>
        </div>
      </nav>

      <main className="px-5 pb-10 max-w-md mx-auto">
        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 mb-8"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1">
              <motion.div
                className={`h-1 rounded-full transition-all duration-500 ${
                  step >= 1 ? "bg-[#C9A84C]" : "bg-stone-200"
                }`}
                animate={{ width: "100%" }}
                initial={{ width: 0 }}
              />
            </div>
            <div className="flex-1">
              <motion.div
                className={`h-1 rounded-full transition-all duration-500 ${
                  step >= 2 ? "bg-[#C9A84C]" : "bg-stone-200"
                }`}
                animate={{ width: step >= 2 ? "100%" : "0%" }}
                initial={{ width: 0 }}
              />
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-stone-400">
            <motion.span
              animate={{ color: step === 1 ? "#C9A84C" : "#a8a29e" }}
              transition={{ duration: 0.3 }}
            >
              Compte
            </motion.span>
            <motion.span
              animate={{ color: step === 2 ? "#C9A84C" : "#a8a29e" }}
              transition={{ duration: 0.3 }}
            >
              Boutique
            </motion.span>
          </div>
        </motion.div>

        {/* Étape 1 - Création du compte */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <motion.div variants={itemVariants} className="text-center mb-4">
                <h2 className="text-2xl font-bold text-stone-800">Créez votre compte</h2>
                <p className="text-sm text-stone-400 mt-1">Pour gérer votre restaurant</p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Nom complet
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jean@exemple.com"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={18} className="text-stone-400" /> : <Eye size={18} className="text-stone-400" />}
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors"
                  />
                </div>
                <AnimatePresence>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-xs text-red-500 mt-1"
                    >
                      Les mots de passe ne correspondent pas
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                disabled={!formData.fullName || !formData.email || !formData.password || formData.password !== formData.confirmPassword}
                className="w-full mt-4 py-3.5 bg-[#C9A84C] text-white font-semibold rounded-xl shadow-lg shadow-[#C9A84C]/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuer
              </motion.button>

              <motion.p variants={itemVariants} className="text-center text-sm text-stone-500 mt-6">
                Vous avez déjà un compte ?{" "}
                <Link href="/auth/login" className="text-[#C9A84C] font-medium hover:underline">
                  Se connecter
                </Link>
              </motion.p>
            </motion.div>
          )}

          {/* Étape 2 - Création de la boutique avec logo et couleur */}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <motion.div variants={itemVariants} className="text-center mb-4">
                <h2 className="text-2xl font-bold text-stone-800">Votre restaurant</h2>
                <p className="text-sm text-stone-400 mt-1">Créez votre carte numérique</p>
              </motion.div>

              {/* Logo du restaurant */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Logo du restaurant
                </label>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-20 h-20 rounded-xl bg-stone-100 flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-stone-300 hover:border-[#C9A84C] transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={24} className="text-stone-400" />
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <div className="flex-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 border border-stone-300 rounded-lg text-sm text-stone-600 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors flex items-center gap-2"
                    >
                      <Upload size={14} />
                      Télécharger
                    </button>
                    <p className="text-xs text-stone-400 mt-1">PNG, JPG. Carré recommandé.</p>
                  </div>
                </div>
              </motion.div>

              {/* Couleur principale */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Couleur principale
                </label>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl border-2 border-stone-200 cursor-pointer shadow-sm"
                    style={{ backgroundColor: selectedColor }}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  />
                  <input
                    type="text"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors font-mono"
                  />
                  {showColorPicker && (
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-12 h-12 rounded-xl cursor-pointer"
                      onBlur={() => setShowColorPicker(false)}
                    />
                  )}
                </div>
                <p className="text-xs text-stone-400 mt-1">
                  Cette couleur sera utilisée sur votre carte QR et votre menu
                </p>
              </motion.div>

              {/* Aperçu de la carte */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Aperçu
                </label>
                <div 
                  className="rounded-xl p-4 text-center"
                  style={{ backgroundColor: selectedColor }}
                >
                  <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <Store size={20} className="text-white" />
                      )}
                      <span className="text-white font-semibold">
                        {formData.restaurantName || "Mon Restaurant"}
                      </span>
                    </div>
                    <div className="bg-white p-2 rounded-lg inline-block mx-auto">
                      <div className="w-16 h-16 bg-stone-800 rounded flex items-center justify-center mx-auto">
                        <QrCode size={32} className="text-white" />
                      </div>
                    </div>
                    <p className="text-white/80 text-xs mt-2">Scannez pour voir le menu</p>
                  </div>
                </div>
              </motion.div>

              {/* Nom du restaurant */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Nom du restaurant *
                </label>
                <div className="relative">
                  <Store size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleChange}
                    placeholder="Le Baobab Doré"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors"
                  />
                </div>
              </motion.div>

              {/* Email du restaurant */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Email du restaurant
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="email"
                    name="restaurantEmail"
                    value={formData.restaurantEmail}
                    onChange={handleChange}
                    placeholder="contact@baobabdore.sn"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors"
                  />
                </div>
              </motion.div>

              {/* Téléphone */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Téléphone *
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+221 77 123 45 67"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors"
                  />
                </div>
              </motion.div>

              {/* Adresse */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Adresse
                </label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Rue principale, près de la place"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors"
                  />
                </div>
              </motion.div>

              {/* Ville et Quartier */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Ville
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Dakar"
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Quartier
                  </label>
                  <input
                    type="text"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleChange}
                    placeholder="Mermoz"
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors"
                  />
                </div>
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                disabled={!formData.restaurantName || !formData.phone || isLoading}
                className="w-full mt-4 py-3.5 bg-[#C9A84C] text-white font-semibold rounded-xl shadow-lg shadow-[#C9A84C]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Création en cours...
                  </>
                ) : (
                  "Créer mon restaurant"
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}