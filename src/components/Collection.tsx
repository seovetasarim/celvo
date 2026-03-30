"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Collection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Load products from DB
    fetch("/api/admin/get-content?type=products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch(() => {
        setProducts([
          {
            id: 1,
            image: "/images/demo.jpg",
            name: "Premium Koleksiyon",
            category: "Tekstil",
          },
        ]);
      });
  }, []);

  if (products.length === 0) {
    return <div className="min-h-screen bg-black py-32" />;
  }

  return (
    <section className="relative overflow-hidden bg-black py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/5 via-black to-black" />
        <div className="absolute left-1/3 top-0 h-[300px] w-[300px] rounded-full bg-[#d4af37]/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-6 py-2 backdrop-blur-sm"
          >
            <span className="text-sm font-medium text-[#d4af37]">
              Premium Koleksiyon
            </span>
          </motion.div>

          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Yeni{" "}
            <span className="bg-gradient-to-r from-[#d4af37] to-[#f0d882] bg-clip-text text-transparent">
              Koleksiyonumuz
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Özenle seçilmiş premium tekstil ürünlerimizle zarafeti evinize taşıyın
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              {/* Product Card */}
              <div
                onClick={() => setSelectedImage(product.image)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-[#d4af37]/30"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                  {/* Click Hint */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredId === product.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                  >
                    <div className="rounded-full border-2 border-white/50 bg-white/10 px-6 py-3 backdrop-blur-sm">
                      <p className="text-sm font-semibold text-white">Büyütmek için tıkla</p>
                    </div>
                  </motion.div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[#d4af37]">
                    {product.category}
                  </p>
                  <h3 className="text-base font-semibold text-white">
                    {product.name}
                  </h3>
                </div>

                {/* Golden accent line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#d4af37] to-[#f0d882] transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="https://www.instagram.com/celvowoman/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:border-pink-500/60 hover:bg-pink-500/10"
          >
            <svg className="h-5 w-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Instagram'da Daha Fazlası</span>
          </a>
        </motion.div>
      </div>

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

