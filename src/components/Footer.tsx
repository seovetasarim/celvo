"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ContactData {
  phone?: string;
  phoneLink?: string;
  email?: string;
  address?: string;
}

export default function Footer() {
  const [contact, setContact] = useState<ContactData>({
    phone: "0506 700 08 27",
    phoneLink: "tel:+905067000827",
    email: "info@celvo.com.tr",
    address: "Gaziantep",
  });

  useEffect(() => {
    fetch("/api/admin/get-content?type=contact")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setContact({
            phone: data.phone || "0506 700 08 27",
            phoneLink: data.phoneLink || "tel:+905067000827",
            email: data.email || "info@celvo.com.tr",
            address: data.address || "Gaziantep",
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-16 text-center">
          <Link href="/" className="group mb-6 inline-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative mx-auto"
            >
              <Image
                src="/celvo.png"
                alt="Celvo"
                width={180}
                height={72}
                className="h-auto w-44 object-contain"
              />
            </motion.div>
          </Link>

          <h3 className="mb-3 text-2xl font-bold text-stone-900">CÉLVO</h3>
          <p className="mb-6 text-lg italic text-[#b08a20]">
            "Rise in Silence."
          </p>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-stone-600">
            Premium tekstil ürünleriyle yaşam alanlarınıza lüks ve zarafet katın.
            Sessizce yükselen gücün manifestosu.
          </p>
        </div>

        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.a
            href={contact.phoneLink}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-xl border border-stone-300 px-6 py-8 text-center transition-all duration-300 hover:border-[#d4af37]/50"
          >
            <div className="mb-5 flex items-center justify-center">
              <Phone className="h-7 w-7 text-[#b08a20]" strokeWidth={1.5} />
            </div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-stone-500">
              TELEFON
            </p>
            <p className="text-base font-semibold text-stone-900">{contact.phone}</p>
          </motion.a>

          <motion.a
            href={`mailto:${contact.email}`}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-xl border border-stone-300 px-6 py-8 text-center transition-all duration-300 hover:border-[#d4af37]/50"
          >
            <div className="mb-5 flex items-center justify-center">
              <Mail className="h-7 w-7 text-[#b08a20]" strokeWidth={1.5} />
            </div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-stone-500">
              E-POSTA
            </p>
            <p className="text-base font-semibold text-stone-900">{contact.email}</p>
          </motion.a>

          <motion.div
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-xl border border-stone-300 px-6 py-8 text-center transition-all duration-300 hover:border-[#d4af37]/50"
          >
            <div className="mb-5 flex items-center justify-center">
              <MapPin className="h-7 w-7 text-[#b08a20]" strokeWidth={1.5} />
            </div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-stone-500">
              ADRES
            </p>
            <p className="text-base font-semibold text-stone-900">{contact.address}</p>
          </motion.div>

          <motion.a
            href="https://www.instagram.com/celvowoman/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-xl border border-stone-300 px-6 py-8 text-center transition-all duration-300 hover:border-pink-500/50"
          >
            <div className="mb-5 flex items-center justify-center">
              <Instagram className="h-7 w-7 text-pink-500" strokeWidth={1.5} />
            </div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-stone-500">
              INSTAGRAM
            </p>
            <p className="text-base font-semibold text-stone-900">@celvowoman</p>
          </motion.a>
        </div>

        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/hakkimizda"
            className="rounded-lg px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:text-[#b08a20]"
          >
            Hakkımızda
          </Link>
          <span className="text-stone-300">•</span>
          <Link
            href="/koleksiyon"
            className="rounded-lg px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:text-[#b08a20]"
          >
            Koleksiyon
          </Link>
          <span className="text-stone-300">•</span>
          <Link
            href="/iletisim"
            className="rounded-lg px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:text-[#b08a20]"
          >
            İletişim
          </Link>
        </div>

        <div className="mb-8 h-px w-full bg-stone-200" />

        <div className="space-y-4 text-center">
          <p className="text-sm text-stone-500">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-stone-700">CÉLVO</span> - Yusuf Tutar
            <span className="mx-2">•</span>
            Tüm hakları saklıdır.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs text-stone-500">
            <span>Designed & Developed by</span>
            <a
              href="https://www.dijitalwebsite.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#b08a20] transition-colors hover:text-[#8f6f16]"
            >
              Dijital Website
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
