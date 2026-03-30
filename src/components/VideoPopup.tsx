"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Maximize2, Play, Pause } from "lucide-react";

export default function VideoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if user has already seen the popup
    const seen = localStorage.getItem("celvo-video-seen");
    if (!seen) {
      // Show popup after 1 second delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setHasSeenPopup(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark as seen in localStorage
    localStorage.setItem("celvo-video-seen", "true");
    setHasSeenPopup(true);
  };

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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Popup Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{
                type: "spring",
                duration: 0.6,
                bounce: 0.3,
              }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#d4af37] via-[#f0d882] to-[#d4af37] opacity-75 blur-2xl" />

              {/* Main Content */}
              <div className="relative overflow-hidden rounded-3xl border border-[#d4af37]/30 bg-black shadow-2xl">
                {/* Top Gradient Line */}
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

                {/* Header */}
                <div className="relative border-b border-white/10 bg-gradient-to-br from-white/5 to-transparent px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="h-3 w-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0d882] shadow-lg shadow-[#d4af37]/50"
                      />
                      <h3 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                        Celvo'yu Keşfedin
                      </h3>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={handleClose}
                      className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-red-500/50 hover:bg-red-500/10"
                    >
                      <X className="h-5 w-5 text-gray-300 transition-colors group-hover:text-red-400" />
                    </button>
                  </div>

                  {/* Subtitle */}
                  <p className="mt-2 text-sm text-gray-400">
                    Premium tekstil dünyamıza hoş geldiniz
                  </p>
                </div>

                {/* Video Container */}
                <div className="relative aspect-video w-full bg-black">
                  <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src="/celvo.mp4" type="video/mp4" />
                    Tarayıcınız video oynatmayı desteklemiyor.
                  </video>

                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      {/* Left Controls */}
                      <div className="flex items-center gap-2">
                        {/* Play/Pause Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={togglePlay}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/20"
                        >
                          {isPlaying ? (
                            <Pause className="h-5 w-5 text-white" />
                          ) : (
                            <Play className="h-5 w-5 text-white" />
                          )}
                        </motion.button>

                        {/* Mute/Unmute Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={toggleMute}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/20"
                        >
                          {isMuted ? (
                            <VolumeX className="h-5 w-5 text-white" />
                          ) : (
                            <Volume2 className="h-5 w-5 text-white" />
                          )}
                        </motion.button>
                      </div>

                      {/* Right Controls */}
                      <div className="flex items-center gap-2">
                        {/* Fullscreen Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleFullscreen}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/20"
                        >
                          <Maximize2 className="h-5 w-5 text-white" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
                    className="absolute right-4 top-4 rounded-full border border-[#d4af37]/30 bg-black/60 px-4 py-2 backdrop-blur-md"
                  >
                    <span className="bg-gradient-to-r from-[#d4af37] to-[#f0d882] bg-clip-text text-sm font-bold text-transparent">
                      YENİ
                    </span>
                  </motion.div>
                </div>

                {/* Bottom Section with CTA */}
                <div className="border-t border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6">
                  <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="text-center sm:text-left">
                      <h4 className="text-lg font-semibold text-white">
                        Koleksiyonumuzu İnceleyin
                      </h4>
                      <p className="mt-1 text-sm text-gray-400">
                        Premium kalitede tekstil ürünleri
                      </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-3">
                      <motion.a
                        href="/koleksiyon"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f0d882] px-6 py-3 font-semibold text-black shadow-lg shadow-[#d4af37]/30 transition-all hover:shadow-[#d4af37]/50"
                        onClick={handleClose}
                      >
                        <span className="relative z-10">Koleksiyona Git</span>
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f0d882] to-[#d4af37] opacity-0 transition-opacity group-hover:opacity-100" />
                      </motion.a>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClose}
                        className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10"
                      >
                        Kapat
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Bottom Gradient Line */}
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}






