// app/auth/reset-password/page.tsx
"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Lock, 
  Eye, 
  EyeOff,
  QrCode,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

// Composant séparé pour utiliser useSearchParams
function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { password: "", confirmPassword: "" };

    if (!formData.password) {
      newErrors.password = "Veuillez entrer un mot de passe";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Veuillez confirmer votre mot de passe";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulation de réinitialisation
    setTimeout(() => {
      setIsLoading(false);
      setResetSuccess(true);
      
      // Redirection après 3 secondes
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    }, 1500);
  };

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

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans flex items-center justify-center px-5 py-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <Link 
            href="/auth/login" 
            className="inline-flex items-center gap-2 text-stone-500 hover:text-[#C9A84C] transition-colors mb-4 text-sm"
          >
            ← Retour à la connexion
          </Link>
          <div className="w-16 h-16 bg-[#C9A84C]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-[#C9A84C]" />
          </div>
          <h1 className="text-2xl font-bold text-stone-800">Nouveau mot de passe</h1>
          <p className="text-sm text-stone-400 mt-1">
            Créez un nouveau mot de passe sécurisé
          </p>
        </motion.div>

        {resetSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
          >
            <CheckCircle size={48} className="text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-green-800">Mot de passe réinitialisé !</h3>
            <p className="text-green-700 text-sm mt-2">
              Votre mot de passe a été modifié avec succès.
            </p>
            <p className="text-green-600 text-xs mt-3">
              Vous allez être redirigé vers la page de connexion...
            </p>
          </motion.div>
        ) : (
          <>
           
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nouveau mot de passe */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      setErrors({ ...errors, password: "" });
                    }}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-3 bg-white border rounded-xl focus:outline-none focus:ring-1 transition-colors ${
                      errors.password 
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                        : "border-stone-200 focus:border-[#C9A84C] focus:ring-[#C9A84C]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={18} className="text-stone-400" /> : <Eye size={18} className="text-stone-400" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.password}
                  </p>
                )}
              </motion.div>

              {/* Confirmation mot de passe */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, confirmPassword: e.target.value });
                      setErrors({ ...errors, confirmPassword: "" });
                    }}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-3 bg-white border rounded-xl focus:outline-none focus:ring-1 transition-colors ${
                      errors.confirmPassword 
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                        : "border-stone-200 focus:border-[#C9A84C] focus:ring-[#C9A84C]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? <EyeOff size={18} className="text-stone-400" /> : <Eye size={18} className="text-stone-400" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.confirmPassword}
                  </p>
                )}
              </motion.div>

              {/* Bouton */}
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 py-3.5 bg-[#C9A84C] text-white font-semibold rounded-xl shadow-lg shadow-[#C9A84C]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Réinitialisation en cours...
                  </>
                ) : (
                  "Réinitialiser le mot de passe"
                )}
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

// Composant principal avec Suspense
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}