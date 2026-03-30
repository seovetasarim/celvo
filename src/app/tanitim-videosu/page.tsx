"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { motion } from "framer-motion";
import { Play, Volume2, VolumeX, Maximize2, Pause, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

export default function TanitimVideosuPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="bg-black">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-black pb-20 pt-32">
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/10 via-black to-black" />
            <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#d4af37]/10 blur-[150px]" />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-6 py-2 text-sm font-medium text-[#d4af37] backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Tanıtım Videosu
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 text-center text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Célvo'yu
              <br />
              <span className="bg-gradient-to-r from-[#d4af37] to-[#f0d882] bg-clip-text text-transparent">
                Keşfedin
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-12 text-center text-xl text-gray-400"
            >
              Premium tekstil dünyamıza hoş geldiniz
            </motion.p>
          </div>
        </section>

        {/* Video Section */}
        <section className="relative overflow-hidden bg-black py-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-[#d4af37]/30 bg-black shadow-2xl"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-r from-[#d4af37] via-[#f0d882] to-[#d4af37] opacity-20 blur-2xl" />

              {/* Top Gradient Line */}
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

              {/* Video Container */}
              <div className="relative aspect-video w-full bg-black">
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  loop
                  muted={isMuted}
                  playsInline
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  controls={false}
                >
                  <source src="/celvo.mp4" type="video/mp4" />
                  Tarayıcınız video oynatmayı desteklemiyor.
                </video>

                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
                  <div className="flex items-center justify-between">
                    {/* Left Controls */}
                    <div className="flex items-center gap-3">
                      {/* Play/Pause Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={togglePlay}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm transition-all hover:border-[#d4af37]/40 hover:bg-white/20"
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6 text-white" />
                        ) : (
                          <Play className="h-6 w-6 text-white" />
                        )}
                      </motion.button>

                      {/* Mute/Unmute Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleMute}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm transition-all hover:border-[#d4af37]/40 hover:bg-white/20"
                      >
                        {isMuted ? (
                          <VolumeX className="h-6 w-6 text-white" />
                        ) : (
                          <Volume2 className="h-6 w-6 text-white" />
                        )}
                      </motion.button>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-3">
                      {/* Fullscreen Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleFullscreen}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm transition-all hover:border-[#d4af37]/40 hover:bg-white/20"
                      >
                        <Maximize2 className="h-6 w-6 text-white" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Premium Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
                  className="absolute right-6 top-6 rounded-full border border-[#d4af37]/30 bg-black/80 px-5 py-2 backdrop-blur-md"
                >
                  <span className="bg-gradient-to-r from-[#d4af37] to-[#f0d882] bg-clip-text text-sm font-bold text-transparent">
                    CÉLVO
                  </span>
                </motion.div>
              </div>

              {/* Bottom Gradient Line */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* About Video Section */}
        <section className="relative overflow-hidden bg-black py-20">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Description */}
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm">
                <h2 className="mb-6 text-center text-3xl font-bold text-white">
                  Premium Tekstil Deneyimi
                </h2>
                <p className="mb-4 text-lg leading-relaxed text-gray-300">
                  Célvo, yalnızca bir tekstil markası değil; aynı zamanda bir yaşam
                  felsefesidir. Videomuzda, premium kaliteli ürünlerimizi, lüks
                  tasarımlarımızı ve zarafet dolu koleksiyonumuzu keşfedeceksiniz.
                </p>
                <p className="text-lg leading-relaxed text-gray-300">
                  Her ürün, sessizce yükselen gücün manifestosu olan markanın
                  felsefesini yansıtır. Gösterişsiz zarafet, tavizsiz kalite ve derin
                  öz güvenle tasarlanmış koleksiyonumuz, sizi köklerden zirveye taşır.
                </p>
              </div>

              {/* Values Grid */}
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  {
                    title: "Premium Kalite",
                    description: "En üst seviye malzeme ve işçilik",
                  },
                  {
                    title: "Lüks Tasarım",
                    description: "Gösterişsiz zarafet ve modern estetik",
                  },
                  {
                    title: "Özel Koleksiyon",
                    description: "Sessizce yükselen güç için özel üretim",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center backdrop-blur-sm transition-all hover:border-[#d4af37]/30"
                  >
                    <h3 className="mb-3 text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.description}</p>
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#d4af37] to-[#f0d882] transition-all duration-500 group-hover:w-full" />
                  </motion.div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="rounded-3xl border border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/10 to-transparent p-10 text-center backdrop-blur-sm">
                <h3 className="mb-4 text-2xl font-bold text-white">
                  Koleksiyonumuzu Keşfedin
                </h3>
                <p className="mb-8 text-lg text-gray-300">
                  Premium tekstil ürünlerimizle lüks ve zarafeti yaşayın
                </p>
                <motion.a
                  href="/koleksiyon"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f0d882] px-8 py-4 text-lg font-semibold text-black shadow-lg shadow-[#d4af37]/30 transition-all hover:shadow-[#d4af37]/50"
                >
                  <Sparkles className="h-5 w-5" />
                  Koleksiyona Git
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final Quote */}
        <section className="relative overflow-hidden bg-black py-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/5 via-black to-black" />
          </div>
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/10 to-transparent p-12 backdrop-blur-sm"
            >
              <p className="mb-4 text-3xl font-bold italic text-[#d4af37]">
                "Rise in Silence."
              </p>
              <p className="text-xl text-gray-300">
                Sessizce Yüksel. Premium Tekstilin Gücünü Keşfet.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}


