// app/forgot-password/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Mail, 
  ArrowRight,
  QrCode,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError("Veuillez entrer votre adresse email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer une adresse email valide");
      return;
    }

    setIsLoading(true);
    setError("");
    
    // Simulation d'envoi d'email
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      
      // Redirection automatique après 5 secondes
      setTimeout(() => {
        router.push("/login");
      }, 5000);
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
            <Link 
              href="/login" 
              className="inline-flex items-center gap-2 text-stone-500 hover:text-[#C9A84C] transition-colors mb-4 text-sm"
            >
              <ArrowLeft size={16} />
              Retour à la connexion
            </Link>
            <div className="w-16 h-16 bg-[#C9A84C]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail size={28} className="text-[#C9A84C]" />
            </div>
            <h1 className="text-2xl font-bold text-stone-800">Mot de passe oublié ?</h1>
            <p className="text-sm text-stone-400 mt-1">
              Ne vous inquiétez pas, ça arrive ! Entrez votre email et nous vous enverrons un lien de réinitialisation.
            </p>
          </motion.div>

          {/* Statut d'envoi */}
          {emailSent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
            >
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800 text-sm">Email envoyé !</h3>
                  <p className="text-green-700 text-xs mt-1">
                    Un lien de réinitialisation a été envoyé à <span className="font-medium">{email}</span>. 
                    Veuillez vérifier votre boîte de réception (et vos spams).
                  </p>
                  <p className="text-green-600 text-xs mt-2">
                    Vous allez être redirigé vers la page de connexion dans quelques secondes...
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Adresse email
                  </label>
                  <motion.div
                    className="relative"
                    whileFocus="focus"
                    variants={inputVariants}
                  >
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="jean@exemple.com"
                      className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-1 transition-colors ${
                        error 
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
                          : "border-stone-200 focus:border-[#C9A84C] focus:ring-[#C9A84C]"
                      }`}
                    />
                  </motion.div>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 mt-1.5 flex items-center gap-1"
                    >
                      <AlertCircle size={12} />
                      {error}
                    </motion.p>
                  )}
                </motion.div>

                {/* Bouton envoyer */}
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  type="submit"
                  disabled={!email || isLoading}
                  className="w-full mt-2 py-3.5 bg-[#C9A84C] text-white font-semibold rounded-xl shadow-lg shadow-[#C9A84C]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le lien de réinitialisation
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
                  Vous n'avez pas de compte ?{" "}
                  <Link href="/auth/register" className="text-[#C9A84C] font-medium hover:underline">
                    Créer un restaurant
                  </Link>
                </p>
              </motion.div>
            </>
          )}

          {/* Aide */}
          <motion.div
            variants={itemVariants}
            className="mt-6 p-4 bg-stone-50 rounded-xl"
          >
            <p className="text-xs text-stone-500 text-center">
              💡 <span className="font-medium">Vous n'avez pas reçu l'email ?</span> Vérifiez vos spams ou 
              {" "}
              <button 
                onClick={() => {
                  setEmailSent(false);
                  setEmail("");
                  setError("");
                }}
                className="text-[#C9A84C] hover:underline"
              >
                réessayez avec une autre adresse
              </button>
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}