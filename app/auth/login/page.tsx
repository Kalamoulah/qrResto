// app/login/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  QrCode,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
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
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
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

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: 0.3 },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
    focus: {
      scale: 1.01,
      transition: { type: "spring", stiffness: 300 },
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
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-[#C9A84C] rounded-xl flex items-center justify-center"
            >
              <QrCode size={16} className="text-white" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-bold text-stone-800"
            >
              QR Menu
            </motion.span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-stone-600 hover:text-[#C9A84C] transition-colors">
              Connexion
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-1.5 bg-[#C9A84C] text-white text-sm font-medium rounded-full shadow-md shadow-[#C9A84C]/30 hover:bg-[#b8982d] transition-all"
            >
              Inscription
            </Link>
          </div>
        </div>
      </nav>

      <main className="min-h-[calc(100vh-73px)] flex items-center justify-center px-5 py-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Header */}
          <motion.div variants={headerVariants} className="text-center mb-8">
            <div className="w-16 h-16 bg-[#C9A84C]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock size={28} className="text-[#C9A84C]" />
            </div>
            <h1 className="text-2xl font-bold text-stone-800">Connexion</h1>
            <p className="text-sm text-stone-400 mt-1">
              Connectez-vous à votre espace restaurant
            </p>
          </motion.div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Email
              </label>
              <motion.div
                className="relative"
                whileFocus="focus"
                variants={inputVariants}
              >
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jean@exemple.com"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors"
                />
              </motion.div>
            </motion.div>

            {/* Mot de passe */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Mot de passe
              </label>
              <motion.div
                className="relative"
                whileFocus="focus"
                variants={inputVariants}
              >
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
              </motion.div>
            </motion.div>

            {/* Mot de passe oublié */}
            <motion.div variants={itemVariants} className="text-right">
              <Link href="/forgot-password" className="text-xs text-[#C9A84C] hover:underline">
                Mot de passe oublié ?
              </Link>
            </motion.div>

            {/* Bouton connexion */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              type="submit"
              disabled={!formData.email || !formData.password || isLoading}
              className="w-full mt-2 py-3.5 bg-[#C9A84C] text-white font-semibold rounded-xl shadow-lg shadow-[#C9A84C]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Connexion en cours...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Séparateur */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 my-6"
          >
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs text-stone-400">ou</span>
            <div className="flex-1 h-px bg-stone-200" />
          </motion.div>

          {/* Lien inscription */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-sm text-stone-500">
              Pas encore de compte ?{" "}
              <Link href="/auth/register" className="text-[#C9A84C] font-medium hover:underline">
                Créer un restaurant
              </Link>
            </p>
          </motion.div>

          {/* Démo info */}
          <motion.div
            variants={itemVariants}
            className="mt-6 p-4 bg-amber-50 rounded-xl text-center"
          >
            <p className="text-xs text-stone-500">
              🍽️ <span className="font-medium">Démo :</span> contact@demo.com / demo123
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}