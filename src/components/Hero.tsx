"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ShoppingBag, Star, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect } from "react";


export default function Hero() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [heroData, setHeroData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: "center",
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  useEffect(() => {
    // Load hero data from DB
    fetch("/api/admin/get-content?type=hero")
      .then((res) => res.json())
      .then((data) => setHeroData(data))
      .catch(() => {
        setHeroData({
          badge: "Premium Tekstil Koleksiyonu",
          title: "Lüks ve Zarafet Evinizde",
          description: "Celvo ile yaşam alanlarınızı premium tekstil ürünleriyle dönüştürün.",
          trustIndicators: { 
            customers: "1000+", 
            customersLabel: "Mutlu Müşteri",
            quality: "%100",
            qualityLabel: "Kalite Garantisi"
          },
        });
      });

    // Load products from DB
    fetch("/api/admin/get-content?type=products")
      .then((res) => res.json())
      .then((data) => {
        const productList = data?.products || data || [];
        setProducts(Array.isArray(productList) ? productList : [{ id: 1, image: "/images/demo.jpg" }]);
      })
      .catch(() => setProducts([{ id: 1, image: "/images/demo.jpg" }]));
  }, []);

  if (!heroData || !heroData.title || !products || products.length === 0) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-black pt-14">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Main gradient overlay - very subtle */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/3 via-black to-black" />
        
        {/* Minimal golden accent - very subtle */}
        <motion.div
          animate={{
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-[#d4af37]/4 blur-[120px]"
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.01)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-8 sm:py-16 lg:py-20">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-6 py-2 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-[#d4af37]" />
              <span className="text-sm font-medium text-[#d4af37]">
                {heroData.badge}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
            >
              {heroData.title.split(' ').slice(0, 2).join(' ')}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#d4af37] to-[#f0d882] bg-clip-text text-transparent">
                  {heroData.title.split(' ')[2]}
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute bottom-2 left-0 h-3 w-full bg-gradient-to-r from-[#d4af37]/30 to-[#f0d882]/30"
                />
              </span>
              <br />
              {heroData.title.split(' ').slice(3).join(' ')}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-8 max-w-lg text-lg leading-relaxed text-gray-300 sm:text-xl"
            >
              {heroData.description}
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-10 grid grid-cols-3 gap-4"
            >
              {[
                { icon: Star, text: "Premium Kalite" },
                { icon: Sparkles, text: "Şık Tasarım" },
                { icon: ShoppingBag, text: "Hızlı Teslimat" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:border-[#d4af37]/30 hover:bg-white/10"
                >
                  <item.icon className="h-6 w-6 text-[#d4af37]" />
                  <span className="text-xs font-medium text-gray-300">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:w-auto w-full max-w-md"
            >
              <Link
                href="/koleksiyon"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0d882] px-8 py-4 text-base font-semibold text-black shadow-2xl shadow-[#d4af37]/50 transition-all hover:scale-105 hover:shadow-[#d4af37]/70"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                  Koleksiyonu Keşfet
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f0d882] to-[#d4af37] opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>

              <Link
                href="/hakkimizda"
                className="group relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-[#d4af37]/50 hover:bg-white/10"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                  Hakkımızda
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8"
            >
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-[#d4af37] text-[#d4af37]"
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  <span className="font-semibold text-white">{heroData.trustIndicators.customers}</span> {heroData.trustIndicators.customersLabel}
                </p>
              </div>
              <div className="h-12 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white">{heroData.trustIndicators.quality}</p>
                <p className="text-sm text-gray-400">{heroData.trustIndicators.qualityLabel}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative">
              {/* Minimal glow effect behind image - very subtle */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#d4af37]/5 to-[#f0d882]/5 blur-[60px]" />
              
              {/* Image carousel with premium border */}
              <div className="relative overflow-hidden rounded-3xl border border-[#d4af37]/20 bg-gradient-to-br from-white/3 to-white/5 p-2 backdrop-blur-sm">
                <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                  <div className="flex">
                    {products.map((product, index) => (
                      <div
                        key={product.id}
                        onClick={() => setSelectedImage(product.image)}
                        className="relative min-w-0 flex-[0_0_100%] cursor-pointer"
                      >
                        <div className="relative aspect-[3/4]">
                          <Image
                            src={product.image}
                            alt={product.name || `Celvo Premium Tekstil Ürünü ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            priority={index === 0}
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Floating quality badge */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 -top-4 rounded-2xl border border-[#d4af37]/20 bg-black/95 p-4 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37] to-[#f0d882]">
                    <Star className="h-5 w-5 fill-black text-black" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Premium</p>
                    <p className="text-sm font-bold text-white">Kalite</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white backdrop-blur-sm transition-all hover:border-[#d4af37]/50 hover:bg-black/90"
            >
              <X className="h-6 w-6" />
            </motion.button>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-4xl"
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#d4af37]/30 shadow-2xl shadow-[#d4af37]/20">
                <Image
                  src={selectedImage}
                  alt="Celvo Product"
                  width={1200}
                  height={1600}
                  className="h-auto w-auto max-h-[90vh] object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
