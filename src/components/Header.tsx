"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/koleksiyon", label: "Koleksiyon" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full py-3 transition-all duration-500 ${
        scrolled ? "border-b border-stone-200 bg-white/95 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Left Side - Logo & Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="group relative z-50">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative h-12 w-auto"
            >
              <Image
                src="/celvo.png"
                alt="Celvo"
                width={120}
                height={48}
                className="h-12 w-auto object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium text-stone-700 transition-all hover:text-stone-950"
              >
                <span>{item.label}</span>
                <span className="absolute inset-0 -z-10 rounded-xl bg-black/5 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side - Contact Button */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+905067000827"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f0d882] px-5 py-2 text-sm font-semibold text-black shadow-lg shadow-[#d4af37]/30 transition-all hover:scale-105 hover:shadow-[#d4af37]/50"
          >
            <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              İletişim
            </span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f0d882] to-[#d4af37] opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-stone-300 bg-white/90 backdrop-blur-sm transition-all hover:border-stone-400 hover:bg-white md:hidden"
          aria-label="Menüyü aç/kapat"
          onClick={() => setOpen((v) => !v)}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5 text-stone-900" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5 text-stone-900" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 top-[72px] bg-black/35 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 right-0 top-full mx-4 mt-4 overflow-hidden rounded-3xl border border-stone-300 bg-white/95 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <div className="p-6">
                <nav className="flex flex-col gap-2">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between rounded-2xl bg-stone-100 px-5 py-4 text-base font-medium text-stone-700 transition-all hover:bg-stone-200 hover:text-stone-950"
                        onClick={() => setOpen(false)}
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
