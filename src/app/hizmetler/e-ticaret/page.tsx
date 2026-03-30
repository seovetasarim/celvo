"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Sparkles, ArrowUpRight, CheckCircle2, CreditCard, Package, TrendingUp, Shield, Smartphone, BarChart3, ChevronDown } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import { useState } from "react";

const ecommerceServices = [
  {
    icon: ShoppingCart,
    title: "E-Ticaret Platformu",
    desc: "Shopify, WooCommerce veya custom e-ticaret çözümleri. Kullanıcı dostu alışveriş deneyimi ve güçlü admin paneli.",
    items: ["Custom/Shopify/WooCommerce", "Product Management", "Shopping Cart", "Checkout Flow"],
    gradient: "from-orange-600 to-red-500",
  },
  {
    icon: CreditCard,
    title: "Ödeme Sistemleri",
    desc: "Güvenli ödeme gateway entegrasyonları. Stripe, PayPal, iyzico ve local payment providers.",
    items: ["Payment Gateway", "SSL Security", "PCI Compliance", "Multi-Currency"],
    gradient: "from-green-600 to-emerald-500",
  },
  {
    icon: Package,
    title: "Stok & Kargo",
    desc: "Entegre stok yönetimi, otomatik kargo entegrasyonları ve sipariş takip sistemi.",
    items: ["Inventory Management", "Cargo Integration", "Order Tracking", "Warehouse System"],
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    icon: BarChart3,
    title: "Analytics & CRM",
    desc: "Detaylı satış analitiği, müşteri yönetimi ve conversion tracking ile veri odaklı kararlar.",
    items: ["Sales Analytics", "Customer Insights", "Conversion Tracking", "CRM Integration"],
    gradient: "from-purple-600 to-pink-500",
  },
];

const caseStudies = [
  {
    client: "Çocuk Mont",
    domain: "cocukmont.com.tr",
    service: "E-Commerce Development",
    duration: "3 ay",
    results: {
      sales: "+245%",
      conversion: "3.2% → 7.8%",
      cart: "Sepet terk oranı %65 → %38",
      revenue: "Aylık ciro 3.5x arttı",
    },
    image: "/images/islerimiz/cocukmontreferans.webp",
    gradient: "from-yellow-600 to-orange-500",
    technologies: ["WooCommerce", "iyzico", "MNG Kargo", "Google Analytics"],
  },
];

const features = [
  { icon: Shield, title: "Güvenli Altyapı", desc: "SSL, PCI compliance, güvenli ödeme" },
  { icon: Smartphone, title: "Mobil Optimized", desc: "Mobile-first responsive design" },
  { icon: TrendingUp, title: "Conversion Focused", desc: "Yüksek dönüşüm oranları" },
  { icon: BarChart3, title: "Advanced Analytics", desc: "Detaylı satış raporları" },
];

const packages = [
  {
    name: "E-Commerce Starter",
    price: "15.000₺",
    priceDetail: "küçük mağazalar",
    desc: "Temel e-ticaret sitesi (50-100 ürün)",
    features: [
      "WooCommerce veya Shopify",
      "50-100 Ürün Kapasitesi",
      "Responsive Design",
      "Ödeme Gateway (1 adet)",
      "Kargo Entegrasyonu (1-2 firma)",
      "Temel Stok Yönetimi",
      "SSL Sertifikası",
      "Google Analytics",
      "Admin Panel Eğitimi",
      "3 Ay Destek",
    ],
    popular: false,
    gradient: "from-orange-600 to-red-500",
  },
  {
    name: "E-Commerce Professional",
    price: "35.000₺",
    priceDetail: "kurumsal mağazalar",
    desc: "Gelişmiş özelliklerle profesyonel online mağaza",
    features: [
      "Custom E-Commerce Platform",
      "Sınırsız Ürün",
      "Multi-vendor Support (Opsiyonel)",
      "Advanced Product Filters",
      "Multiple Payment Gateways",
      "Tüm Kargo Firmaları Entegre",
      "Advanced Inventory Management",
      "Customer Account System",
      "Wishlist & Compare",
      "Product Reviews & Ratings",
      "Coupon & Discount System",
      "Email Marketing Integration",
      "SEO Optimization",
      "1 Yıl Premium Hosting",
      "6 Ay Priority Support",
    ],
    popular: true,
    gradient: "from-[#d4af37] to-[#f0d882]",
  },
  {
    name: "E-Commerce Enterprise",
    price: "75.000₺+",
    priceDetail: "büyük ölçek",
    desc: "B2B/B2C marketplace ve kompleks çözümler",
    features: [
      "Headless E-Commerce (Next.js)",
      "Multi-store & Multi-language",
      "B2B Wholesale Features",
      "Advanced ERP Integration",
      "Custom Payment Solutions",
      "Subscription & Recurring Payments",
      "Advanced Marketing Automation",
      "AI Product Recommendations",
      "Real-time Inventory Sync",
      "Multi-warehouse Management",
      "Custom Reporting Dashboard",
      "Mobile App (React Native)",
      "Dedicated Server Infrastructure",
      "24/7 Enterprise Support",
      "12 Ay Managed Service",
    ],
    popular: false,
    gradient: "from-red-600 to-pink-600",
  },
];

const faqs = [
  {
    q: "E-ticaret sitesi kurmak ne kadar sürer?",
    a: "Hazır platform (Shopify/WooCommerce) ile 3-4 hafta, custom e-ticaret geliştirme 6-10 hafta sürer. Ürün sayısı ve özelleştirme seviyesine göre değişir.",
  },
  {
    q: "Hangi ödeme sistemlerini entegre ediyorsunuz?",
    a: "iyzico, PayTR, Stripe, PayPal gibi tüm popüler ödeme gateway'lerini entegre ediyoruz. Ayrıca banka POS'u ve havale/EFT seçenekleri de eklenebilir.",
  },
  {
    q: "Kargo entegrasyonları nasıl çalışıyor?",
    a: "MNG, Yurtiçi, Aras, PTT gibi tüm kargo firmalarını API ile entegre ediyoruz. Otomatik kargo ücreti hesaplama, takip numarası gönderimi ve toplu kargo oluşturma özellikleri.",
  },
  {
    q: "Stok yönetimi var mı?",
    a: "Evet, gelişmiş stok takip sistemi ile ürün girişi, stok uyarıları, varyant yönetimi ve multi-warehouse desteği sunuyoruz. ERP entegrasyonu da yapabiliriz.",
  },
  {
    q: "Mobil uygulaması da yapıyor musunuz?",
    a: "Evet, React Native ile iOS ve Android mobil uygulama geliştiriyoruz. E-ticaret sitenizle senkronize çalışan native mobile app.",
  },
  {
    q: "SEO çalışması dahil mi?",
    a: "Evet, ürün sayfaları SEO optimizasyonu, meta tags, schema markup ve site haritası dahildir. İleri seviye SEO için ayrı paketlerimiz var.",
  },
];

export default function ETicaretPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "E-Ticaret Web Sitesi Hizmeti",
    description: "Profesyonel e-ticaret sitesi geliştirme ve online mağaza çözümleri",
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
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/30 via-black to-black" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute left-1/4 top-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-r from-orange-600/30 to-red-500/30 blur-[180px]"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              className="absolute right-1/4 top-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-l from-red-600/20 to-orange-600/20 blur-[180px]"
            />
          </div>

          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:100px_100px]" />

          <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-orange-500/30 bg-orange-600/10 px-6 py-2.5 backdrop-blur-xl"
            >
              <ShoppingCart className="h-5 w-5 text-orange-400" />
              <span className="text-sm font-bold uppercase tracking-widest text-orange-400">
                E-Commerce Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 max-w-5xl text-6xl font-black leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl"
            >
              Online Satış,{" "}
              <span className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
                Maksimum Dönüşüm
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12 max-w-3xl text-xl leading-relaxed text-gray-400"
            >
              Conversion-optimized e-ticaret siteleri. Güvenli ödeme, stok yönetimi,
              kargo entegrasyonu ve powerful admin panel.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/teklif-al"
                className="group rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-10 py-4 text-base font-bold text-white shadow-2xl shadow-orange-500/50 transition-all hover:scale-105 hover:shadow-orange-500/70"
              >
                <span className="flex items-center gap-2">
                  E-Ticaret Teklifi Alın
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
              <Link
                href="/projeler"
                className="rounded-full border-2 border-white/20 bg-white/5 px-10 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                E-Ticaret Projelerimiz
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="relative bg-black py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent p-6 text-center backdrop-blur-xl"
                >
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
                      <feature.icon className="h-6 w-6 text-orange-400" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Detail */}
        <section className="relative bg-black py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-orange-600/10 blur-[150px]" />
          </div>

          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                E-Ticaret Çözümlerimiz
              </h2>
              <p className="text-lg text-gray-400">
                Satış odaklı, kullanıcı dostu online mağazalar
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {ecommerceServices.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative"
                >
                  <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.1] to-white/[0.02] p-8 backdrop-blur-xl transition-all duration-500 hover:border-white/30">
                    <div className={`absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r ${service.gradient}`} />

                    <div className="relative mb-8">
                      <div className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 shadow-2xl`}>
                        <div className="flex h-full w-full items-center justify-center rounded-[15px] bg-black/80 backdrop-blur-xl">
                          <service.icon className="h-9 w-9 text-white" />
                        </div>
                      </div>
                    </div>

                    <h3 className="mb-4 text-2xl font-black text-white">
                      {service.title}
                    </h3>

                    <p className="mb-6 text-sm leading-relaxed text-gray-400">
                      {service.desc}
                    </p>

                    <div className="space-y-2">
                      {service.items.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-gray-500">
                          <div className={`h-1 w-1 rounded-full bg-gradient-to-r ${service.gradient}`} />
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className={`pointer-events-none absolute -inset-20 bg-gradient-to-br ${service.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-5`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study - Premium Layout */}
        <section className="relative bg-black py-40">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-yellow-600/10 blur-[180px]" />
          </div>

          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20 text-center"
            >
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-orange-500/30 bg-orange-600/10 px-6 py-2.5 backdrop-blur-xl">
                <BarChart3 className="h-5 w-5 text-orange-400" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
                  Success Story
                </span>
              </div>
              <h2 className="mb-6 text-6xl font-black text-white md:text-7xl">
                E-Ticaret{" "}
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Başarı Hikayesi
                </span>
              </h2>
            </motion.div>

            {caseStudies.map((study) => (
              <motion.div
                key={study.client}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="group relative"
              >
                <div className="grid grid-cols-1 gap-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-12 shadow-2xl lg:grid-cols-2 lg:items-center lg:p-20">
                  <div className={`absolute left-0 top-0 h-2 w-full bg-gradient-to-r ${study.gradient}`} />

                  {/* Image */}
                  <div className="relative">
                    <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                      <img
                        src={study.image}
                        alt={`${study.client} - E-Ticaret Başarı Hikayesi`}
                        className="h-full w-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      
                      {/* Tech badges on image */}
                      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                        {study.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-white/20 bg-black/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-xl"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <div className="mb-6">
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-600/10 px-4 py-1.5">
                        <span className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${study.gradient} bg-clip-text text-transparent`}>
                          {study.service}
                        </span>
                      </div>
                      <h3 className="mb-2 text-5xl font-black text-white">
                        {study.client}
                      </h3>
                      <a
                        href={`https://${study.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-orange-400"
                      >
                        🌐 {study.domain}
                      </a>
                    </div>

                    <div className="mb-8 flex items-center gap-4">
                      <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm">
                        <span className="text-gray-500">Project Duration:</span>{" "}
                        <span className="font-bold text-white">{study.duration}</span>
                      </div>
                    </div>

                    {/* Results - 2x2 Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="relative overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent p-6">
                        <div className="mb-2 flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-orange-400" />
                          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Sales</span>
                        </div>
                        <div className="text-4xl font-black text-white">{study.results.sales}</div>
                        <div className="mt-1 text-xs text-gray-500">increase</div>
                      </div>

                      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6">
                        <div className="mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-gray-400" />
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Conversion</span>
                        </div>
                        <div className="text-3xl font-black text-white">{study.results.conversion}</div>
                        <div className="mt-1 text-xs text-gray-500">improvement</div>
                      </div>

                      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6">
                        <div className="mb-2 flex items-center gap-2">
                          <ShoppingCart className="h-5 w-5 text-gray-400" />
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Cart Rate</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{study.results.cart}</div>
                        <div className="mt-1 text-xs text-gray-500">optimized</div>
                      </div>

                      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6">
                        <div className="mb-2 flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-gray-400" />
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Revenue</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{study.results.revenue}</div>
                        <div className="mt-1 text-xs text-gray-500">monthly</div>
                      </div>
                    </div>
                  </div>

                  <div className={`pointer-events-none absolute -inset-20 bg-gradient-to-br ${study.gradient} opacity-0 blur-[100px] transition-opacity duration-500 group-hover:opacity-15`} />
                </div>
              </motion.div>
            ))}
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
              <h2 className="mb-4 text-5xl font-bold text-white md:text-6xl">
                E-Ticaret Paketleri
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                İhtiyacınıza özel online mağaza çözümleri
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
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="rounded-full border border-[#d4af37]/50 bg-gradient-to-r from-[#d4af37] to-[#f0d882] px-5 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-lg">
                        🛒 Best Seller
                      </div>
                    </div>
                  )}

                  <div className={`relative h-full overflow-hidden rounded-3xl border p-10 backdrop-blur-xl transition-all duration-500 ${
                    pkg.popular
                      ? "border-[#d4af37]/50 bg-gradient-to-br from-[#d4af37]/10 via-[#d4af37]/5 to-transparent shadow-2xl shadow-[#d4af37]/30"
                      : "border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] hover:border-white/30"
                  }`}>
                    <div className={`absolute left-0 top-0 h-2 w-full ${
                      pkg.popular 
                        ? "bg-gradient-to-r from-[#d4af37] to-[#f0d882]"
                        : `bg-gradient-to-r ${pkg.gradient}`
                    }`} />

                    <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                      {pkg.priceDetail}
                    </div>
                    <h3 className="mb-4 text-3xl font-black text-white">{pkg.name}</h3>
                    <p className="mb-6 text-sm leading-relaxed text-gray-400">{pkg.desc}</p>

                    <div className="mb-8 border-b border-white/10 pb-8">
                      <div className="text-6xl font-black text-white">{pkg.price}</div>
                      <div className="mt-2 text-sm text-gray-500">one-time investment</div>
                    </div>

                    <ul className="mb-10 space-y-4">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className={`h-5 w-5 shrink-0 ${pkg.popular ? 'text-[#d4af37]' : 'text-orange-400'}`} />
                          <span className="text-sm leading-relaxed text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/teklif-al"
                      className={`block w-full rounded-xl py-4 text-center text-sm font-bold transition-all ${
                        pkg.popular
                          ? "bg-gradient-to-r from-[#d4af37] to-[#f0d882] text-black shadow-lg shadow-[#d4af37]/50 hover:scale-105"
                          : "border-2 border-white/10 bg-white/5 text-white hover:border-orange-500/50 hover:bg-white/10"
                      }`}
                    >
                      {pkg.popular ? "🚀 En Popüler Paket" : "Paketi Seç"}
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
              <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                Sık Sorulan Sorular
              </h2>
              <p className="text-lg text-gray-400">
                E-ticaret hakkında merak edilenler
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
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-bold text-white">{faq.q}</h3>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${
                          openFaq === i ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    {openFaq === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
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
              <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-500" />

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-600/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-orange-400">
                <Sparkles className="h-4 w-4" />
                <span>Start Selling</span>
              </div>

              <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                E-Ticaret Sitenizi{" "}
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Kuralım
                </span>
              </h2>

              <p className="mb-10 text-lg text-gray-300 md:text-xl">
                Ücretsiz danışmanlık, detaylı e-ticaret teklifi ve platform karşılaştırması.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/teklif-al"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-orange-500/50 transition-all hover:scale-105"
                >
                  <span>E-Ticaret Teklifi</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>

                <a
                  href="tel:+905321667697"
                  className="rounded-full border-2 border-white/20 bg-white/5 px-10 py-5 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
                >
                  📞 E-Ticaret Danışmanı
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



