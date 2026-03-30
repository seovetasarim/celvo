"use client";

import { motion } from "framer-motion";
import { Send, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TeklifAlPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      console.log("Form data:", formData);
    }, 2000);
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 pt-20 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500"
          >
            <Check className="h-12 w-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-4xl font-bold text-white"
          >
            Teşekkürler!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 text-lg text-gray-400"
          >
            Talebiniz başarıyla alındı. En kısa sürede size dönüş yapacağız.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0d882] px-8 py-4 text-sm font-bold text-black"
            >
              Ana Sayfaya Dön
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-[#d4af37]/10 blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[200px]" />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-4 rounded-full border border-[#d4af37]/30 bg-gradient-to-r from-[#d4af37]/10 via-purple-600/10 to-[#d4af37]/10 px-8 py-3 backdrop-blur-xl"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-[#d4af37]"
            />
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#d4af37]">
              Free Quote
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="h-2 w-2 rounded-full bg-purple-500"
            />
          </motion.div>

          <h1 className="mb-8 text-6xl font-black tracking-tight text-white md:text-7xl lg:text-8xl">
            <span className="block">Projenizi Hayata</span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#d4af37] via-[#f0d882] to-purple-500 bg-clip-text text-transparent">
                Geçirelim
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="absolute -bottom-4 left-0 h-2 w-full origin-left rounded-full bg-gradient-to-r from-[#d4af37] via-purple-500 to-transparent"
              />
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-400 md:text-2xl">
            24 saat içinde size özel{" "}
            <span className="font-semibold text-white">detaylı teklif</span> ve{" "}
            <span className="font-semibold text-white">ücretsiz danışmanlık</span>.
            Projenizi birlikte planlayalım.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Main Form Card */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-10 backdrop-blur-xl md:p-12">
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#d4af37] via-purple-500 to-[#d4af37]" />
            
            <div className="space-y-8">
              {/* Name & Email */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Ad Soyad <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-5 text-base text-white outline-none transition-all placeholder:text-gray-500 focus:border-[#d4af37]/50 focus:bg-white/10"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    E-posta <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-5 text-base text-white outline-none transition-all placeholder:text-gray-500 focus:border-[#d4af37]/50 focus:bg-white/10"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              {/* Phone & Company */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Telefon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-5 text-base text-white outline-none transition-all placeholder:text-gray-500 focus:border-[#d4af37]/50 focus:bg-white/10"
                    placeholder="0555 123 45 67"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Şirket / Marka Adı
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-5 text-base text-white outline-none transition-all placeholder:text-gray-500 focus:border-[#d4af37]/50 focus:bg-white/10"
                    placeholder="Şirket adınız (opsiyonel)"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Proje Detayları <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={8}
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-5 text-base text-white outline-none transition-all placeholder:text-gray-500 focus:border-[#d4af37]/50 focus:bg-white/10"
                  placeholder="Projeniz hakkında detaylı bilgi verin:&#10;&#10;• Ne tür bir web sitesi/hizmet istiyorsunuz?&#10;• Hedef kitleniz kimler?&#10;• Tahmini bütçeniz nedir?&#10;• Özel istekleriniz var mı?"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col items-center gap-6">
            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0d882] px-12 py-5 text-lg font-bold text-black shadow-2xl shadow-[#d4af37]/50 transition-all hover:shadow-[#d4af37]/70 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  <span>Gönderiliyor...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Ücretsiz Teklif Alın</span>
                </>
              )}
            </motion.button>
            
            {status === "error" && (
              <p className="text-sm text-red-400">
                Bir hata oluştu. Lütfen tekrar deneyin.
              </p>
            )}
          </div>

          <p className="text-center text-sm text-gray-500">
            Formunuzu göndererek{" "}
            <Link href="#" className="text-[#d4af37] hover:underline">
              gizlilik politikasını
            </Link>{" "}
            kabul etmiş olursunuz.
          </p>
        </motion.form>
      </div>
      
      <Footer />
    </div>
  );
}



