"use client";

import { motion } from "framer-motion";
import { Code2, Sparkles, ArrowUpRight, CheckCircle2, Zap, Shield, Rocket, ChevronDown } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import { useState } from "react";


const services = [
  {
    icon: Code2,
    title: "Frontend Development",
    desc: "React, Next.js, TypeScript ile modern kullanıcı arayüzleri. Component-based architecture, state management ve responsive design.",
    items: ["React & Next.js", "TypeScript", "Tailwind CSS", "Responsive Design"],
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    icon: Rocket,
    title: "Backend Development",
    desc: "Node.js, Express ve modern API teknolojileriyle güçlü sunucu uygulamaları. RESTful API, GraphQL ve mikroservis mimarisi.",
    items: ["Node.js & Express", "RESTful API", "PostgreSQL/MongoDB", "Authentication"],
    gradient: "from-purple-600 to-pink-500",
  },
  {
    icon: Shield,
    title: "Full-Stack Solutions",
    desc: "End-to-end web uygulamaları. Admin panelleri, user management, payment integration ve complex business logic.",
    items: ["Full-Stack Apps", "Admin Panels", "Payment Gateway", "Cloud Hosting"],
    gradient: "from-green-600 to-emerald-500",
  },
];

const technologies = [
  { name: "Next.js 15", logo: "⚡", color: "from-gray-700 to-black" },
  { name: "React 19", logo: "⚛️", color: "from-blue-600 to-cyan-500" },
  { name: "TypeScript", logo: "TS", color: "from-blue-700 to-blue-500" },
  { name: "Tailwind CSS", logo: "🎨", color: "from-cyan-600 to-blue-500" },
  { name: "Node.js", logo: "🟢", color: "from-green-700 to-green-500" },
  { name: "PostgreSQL", logo: "🐘", color: "from-blue-800 to-blue-600" },
  { name: "Docker", logo: "🐳", color: "from-blue-600 to-blue-800" },
  { name: "AWS/Vercel", logo: "☁️", color: "from-orange-600 to-yellow-500" },
];

const packages = [
  {
    name: "Startup",
    price: "10.000₺",
    priceDetail: "başlangıç",
    desc: "Küçük işletmeler ve startuplar için",
    features: [
      "5-7 Sayfa Modern Web Sitesi",
      "Responsive Design (Mobil Uyumlu)",
      "Temel SEO Optimizasyonu",
      "Contact Form Entegrasyonu",
      "Google Analytics",
      "SSL Sertifikası",
      "1 Yıl Domain + Hosting",
      "3 Ay Ücretsiz Destek",
    ],
    popular: false,
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    name: "Business",
    price: "25.000₺",
    priceDetail: "en popüler",
    desc: "Kurumsal firmalar için profesyonel çözüm",
    features: [
      "10-15 Sayfa Premium Web Sitesi",
      "Custom UI/UX Tasarım",
      "CMS Entegrasyonu (İçerik Yönetimi)",
      "Advanced SEO + Site Haritası",
      "Blog Sistemi",
      "Multi-language Desteği",
      "API Development",
      "E-posta Marketing Entegrasyonu",
      "1 Yıl Premium Hosting + CDN",
      "6 Ay Priority Destek",
    ],
    popular: true,
    gradient: "from-[#d4af37] to-[#f0d882]",
  },
  {
    name: "Enterprise",
    price: "50.000₺+",
    priceDetail: "özel çözüm",
    desc: "Büyük ölçekli projeler ve SaaS",
    features: [
      "Sınırsız Sayfa & Özellik",
      "Custom Web Application",
      "Headless CMS Architecture",
      "Microservices Design",
      "Advanced Security (Penetration Test)",
      "CI/CD Pipeline",
      "Load Balancing & Auto-scaling",
      "Real-time Features (WebSocket)",
      "Dedicated DevOps",
      "12 Ay Enterprise Support",
    ],
    popular: false,
    gradient: "from-purple-600 to-pink-500",
  },
];

const faqs = [
  {
    q: "Web sitesi geliştirme süresi ne kadar?",
    a: "Proje kapsamına göre 2-8 hafta arası değişir. Basit siteler 2-3 hafta, kompleks web uygulamaları 6-8 hafta sürebilir. Detaylı timeline planlama toplantısında belirlenir.",
  },
  {
    q: "Hangi web geliştirme teknolojilerini kullanıyorsunuz?",
    a: "Next.js, React, TypeScript, Node.js gibi modern ve endüstri standardı teknolojiler kullanıyoruz. Backend için PostgreSQL/MongoDB, hosting için Vercel/AWS tercih ediyoruz.",
  },
  {
    q: "Web sitemi kendim güncelleyebilir miyim?",
    a: "Evet, headless CMS (Sanity, Contentful) veya custom admin panel ile içeriklerinizi kolayca yönetebilirsiniz. Eğitim ve dokümantasyon sağlıyoruz.",
  },
  {
    q: "Mobil uygulama da yapıyor musunuz?",
    a: "Evet, React Native ile cross-platform mobil uygulamalar ve PWA (Progressive Web App) çözümleri geliştiriyoruz.",
  },
  {
    q: "Hosting ve domain dahil mi?",
    a: "Evet, tüm paketlerimizde 1 yıl hosting ve SSL sertifikası dahildir. Domain kaydı da yapabiliriz veya mevcut domaininizi kullanabiliriz.",
  },
  {
    q: "Destek hizmeti nasıl çalışıyor?",
    a: "Proje sonrası 3-12 ay arası ücretsiz destek sunuyoruz. Bug fixes, küçük güncellemeler ve technical support dahildir.",
  },
];

export default function WebGelistirmePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web Geliştirme Hizmeti",
    description: "Profesyonel web sitesi geliştirme, Next.js, React ile modern web uygulamaları",
    provider: {
      "@type": "Organization",
      name: "Dijital Website",
    },
  };

  return (
    <>
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-black">
        <Header />

        {/* Hero */}
        <section className="relative min-h-screen overflow-hidden bg-black pt-24">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-black to-black" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute left-1/4 top-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-r from-blue-600/30 to-cyan-500/30 blur-[180px]"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              className="absolute right-1/4 top-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-l from-purple-600/20 to-blue-600/20 blur-[180px]"
            />
          </div>

          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:100px_100px]" />

          <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-blue-500/30 bg-blue-600/10 px-6 py-2.5 backdrop-blur-xl"
            >
              <Code2 className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-bold uppercase tracking-widest text-blue-400">
                Web Development Services
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 max-w-5xl text-6xl font-black leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl"
            >
              Modern Web Siteleri,{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Profesyonel Çözümler
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12 max-w-3xl text-xl leading-relaxed text-gray-400"
            >
              Next.js, React ve TypeScript ile lightning-fast, SEO-optimized ve scalable
              web uygulamaları. Enterprise-grade kod kalitesi, modern architecture.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/teklif-al"
                className="group rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-10 py-4 text-base font-bold text-white shadow-2xl shadow-blue-500/50 transition-all hover:scale-105 hover:shadow-blue-500/70"
              >
                <span className="flex items-center gap-2">
                  Ücretsiz Teklif Alın
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
              <Link
                href="/projeler"
                className="rounded-full border-2 border-white/20 bg-white/5 px-10 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                Projelerimizi Görün
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Services Detail */}
        <section className="relative bg-black py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-cyan-600/10 blur-[150px]" />
          </div>

          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                Neler Sunuyoruz?
              </h2>
              <p className="text-lg text-gray-400">
                Kapsamlı web geliştirme hizmetleri
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="group relative"
                >
                  <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.1] to-white/[0.02] p-10 backdrop-blur-xl transition-all duration-500 hover:border-white/30">
                    <div className={`absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r ${service.gradient}`} />

                    <div className={`absolute -inset-20 bg-gradient-to-br ${service.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10`} />

                    <div className="relative mb-8">
                      <div className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 shadow-2xl`}>
                        <div className="flex h-full w-full items-center justify-center rounded-[15px] bg-black/80 backdrop-blur-xl">
                          <service.icon className="h-9 w-9 text-white" />
                        </div>
                      </div>
                    </div>

                    <h3 className="mb-4 text-3xl font-black text-white">
                      {service.title}
                    </h3>

                    <p className="mb-8 text-base leading-relaxed text-gray-400">
                      {service.desc}
                    </p>

                    <div className="space-y-3">
                      {service.items.map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                          <span className="text-sm font-medium text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Showcase */}
        <section className="relative bg-black py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-purple-600/10 blur-[150px]" />
          </div>

          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-600/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-400">
                Tech Stack
              </div>
              <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                Modern Teknoloji Altyapısı
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                Enterprise-grade tools ve proven technologies
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
              {technologies.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent p-8 text-center backdrop-blur-xl transition-all hover:border-white/30"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 transition-opacity group-hover:opacity-10`} />
                  <div className="relative">
                    <div className="mb-3 text-4xl">{tech.logo}</div>
                    <div className="text-base font-bold text-white">{tech.name}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="relative bg-black py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/10 blur-[150px]" />
          </div>

          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#d4af37]">
                <Sparkles className="h-3 w-3" />
                Pricing
              </div>
              <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                Şeffaf ve Rekabetçi Fiyatlar
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                Her bütçeye uygun profesyonel web geliştirme paketleri
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`relative ${pkg.popular ? "lg:-translate-y-6 lg:scale-105" : ""}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="rounded-full border border-[#d4af37]/50 bg-gradient-to-r from-[#d4af37] to-[#f0d882] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg">
                        En Popüler
                      </div>
                    </div>
                  )}

                  <div className={`relative h-full overflow-hidden rounded-3xl border p-10 backdrop-blur-xl transition-all duration-500 ${
                    pkg.popular
                      ? "border-[#d4af37]/50 bg-gradient-to-br from-[#d4af37]/10 via-[#d4af37]/5 to-transparent shadow-2xl shadow-[#d4af37]/30"
                      : "border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] hover:border-white/30"
                  }`}>
                    <div className={`absolute left-0 top-0 h-1.5 w-full ${
                      pkg.popular 
                        ? "bg-gradient-to-r from-[#d4af37] to-[#f0d882]"
                        : `bg-gradient-to-r ${pkg.gradient}`
                    }`} />

                    <div className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-500">
                      {pkg.priceDetail}
                    </div>
                    <h3 className="mb-4 text-3xl font-black text-white">{pkg.name}</h3>
                    <p className="mb-6 text-sm text-gray-400">{pkg.desc}</p>

                    <div className="mb-8 border-b border-white/5 pb-8">
                      <div className="text-5xl font-black text-white">{pkg.price}</div>
                      <div className="mt-2 text-sm text-gray-500">tek seferlik ödeme</div>
                    </div>

                    <ul className="mb-10 space-y-4">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className={`h-5 w-5 shrink-0 ${pkg.popular ? 'text-[#d4af37]' : 'text-blue-400'}`} />
                          <span className="text-sm leading-relaxed text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/teklif-al"
                      className={`block w-full rounded-xl py-4 text-center text-sm font-bold transition-all ${
                        pkg.popular
                          ? "bg-gradient-to-r from-[#d4af37] to-[#f0d882] text-black shadow-lg shadow-[#d4af37]/50 hover:scale-105"
                          : "border-2 border-white/10 bg-white/5 text-white hover:border-blue-500/50 hover:bg-white/10"
                      }`}
                    >
                      Paketi Seç
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative bg-black py-32">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-4xl font-bold text-white">
                Sık Sorulan Sorular
              </h2>
              <p className="text-lg text-gray-400">
                Web geliştirme hakkında merak edilenler
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 text-left backdrop-blur-xl transition-all hover:border-white/30"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">{faq.q}</h3>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-400 transition-transform ${
                          openFaq === i ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    {openFaq === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 text-sm leading-relaxed text-gray-400"
                      >
                        {faq.a}
                      </motion.p>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative bg-black py-32">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-12 text-center backdrop-blur-xl md:p-16"
            >
              <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-600/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-400">
                <Sparkles className="h-4 w-4" />
                <span>Start Building</span>
              </div>

              <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Web Projenizi{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Hayata Geçirelim
                </span>
              </h2>

              <p className="mb-10 text-lg text-gray-300 md:text-xl">
                Ücretsiz danışmanlık, detaylı teklif ve proje planlaması için iletişime geçin.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/teklif-al"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-blue-500/50 transition-all hover:scale-105"
                >
                  <span>Ücretsiz Teklif Alın</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>

                <a
                  href="tel:+905321667697"
                  className="rounded-full border-2 border-white/20 bg-white/5 px-10 py-5 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
                >
                  📞 Hemen Arayın
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}


