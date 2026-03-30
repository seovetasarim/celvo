"use client";

import { motion } from "framer-motion";
import { Palette, Sparkles, ArrowUpRight, CheckCircle2, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { whatsappHref } from "@/lib/whatsapp";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import { useState } from "react";

const designProcess = [
  {
    number: "01",
    phase: "Discovery",
    title: "Keşif & Araştırma",
    description: "Kullanıcı ihtiyaçlarını anlama, pazar analizi ve proje hedeflerini belirleme.",
    deliverables: ["User Personas", "Competitive Analysis", "User Research Report"],
    color: "from-purple-600 to-pink-500",
  },
  {
    number: "02", 
    phase: "Strategy",
    title: "UX Strateji",
    description: "Information architecture, user flows ve wireframe tasarımı.",
    deliverables: ["Site Map", "User Flows", "Low-Fi Wireframes"],
    color: "from-pink-600 to-rose-500",
  },
  {
    number: "03",
    phase: "Design",
    title: "Visual Design",
    description: "Brand identity, UI tasarımı ve design system oluşturma.",
    deliverables: ["High-Fi Mockups", "Design System", "Style Guide"],
    color: "from-orange-600 to-red-500",
  },
  {
    number: "04",
    phase: "Prototype",
    title: "Prototip & Test",
    description: "Interactive prototyping, usability testing ve design refinement.",
    deliverables: ["Interactive Prototype", "Test Results", "Final Designs"],
    color: "from-red-600 to-pink-600",
  },
];

const caseStudies = [
  {
    title: "E-Commerce Redesign",
    client: "Çocuk Mont",
    result: "Dönüşüm oranı %145 arttı",
    image: "/images/islerimiz/cocukmontreferans.webp",
    metrics: ["145% Conversion", "60% Bounce Rate ↓", "4.8★ User Rating"],
    gradient: "from-yellow-600 to-orange-500",
  },
  {
    title: "Healthcare Platform",
    client: "Tevbe Terapisi",
    result: "Kullanıcı memnuniyeti %98",
    image: "/images/islerimiz/tevbereferans.webp",
    metrics: ["98% Satisfaction", "50% Faster Booking", "AA Accessibility"],
    gradient: "from-purple-600 to-pink-500",
  },
  {
    title: "SaaS Dashboard",
    client: "PushAI",
    result: "User engagement %200 arttı",
    image: "/images/islerimiz/pushai1.webp",
    metrics: ["200% Engagement", "Clean Interface", "5★ Reviews"],
    gradient: "from-pink-600 to-purple-600",
  },
];

const designPrinciples = [
  {
    title: "User-Centered",
    desc: "Her tasarım kararı kullanıcı ihtiyaçları ve davranışları üzerine kurulu",
    icon: "👥",
  },
  {
    title: "Data-Driven",
    desc: "Analytics ve user testing ile kanıtlanmış tasarım iyileştirmeleri",
    icon: "📊",
  },
  {
    title: "Accessible",
    desc: "WCAG 2.1 standartlarına uygun, herkes için erişilebilir tasarımlar",
    icon: "♿",
  },
  {
    title: "Scalable",
    desc: "Design system ile büyüyen ürünlere adapte olabilen tasarımlar",
    icon: "📈",
  },
];

const packages = [
  {
    name: "UI Design",
    price: "8.000₺",
    priceDetail: "görsel tasarım",
    desc: "Sadece görsel arayüz tasarımı",
    features: [
      "5-7 Sayfa High-Fidelity Design",
      "Figma/Adobe XD Dosyaları",
      "Responsive (Mobile + Desktop)",
      "Color Palette & Typography",
      "Icon Set & Basic Components",
      "Style Guide PDF",
      "2 Revizyon Hakkı",
      "Developer Handoff",
    ],
    popular: false,
    gradient: "from-purple-600 to-pink-500",
  },
  {
    name: "UI/UX Complete",
    price: "18.000₺",
    priceDetail: "en çok tercih edilen",
    desc: "Full UX research + UI design package",
    features: [
      "User Research & Personas (2-3 Persona)",
      "Competitive & Market Analysis",
      "Information Architecture",
      "User Journey & Flow Diagrams",
      "Wireframes (Low-Fi)",
      "10-15 Sayfa High-Fidelity UI",
      "Interactive Figma Prototype",
      "Complete Design System",
      "Responsive Design (3 Breakpoints)",
      "Usability Testing Session",
      "Design Tokens & Variables",
      "Developer Documentation",
      "3 Revizyon Hakkı",
    ],
    popular: true,
    gradient: "from-[#d4af37] to-[#f0d882]",
  },
  {
    name: "Brand + UX/UI",
    price: "35.000₺+",
    priceDetail: "premium paket",
    desc: "Complete branding + full UI/UX",
    features: [
      "Brand Strategy & Positioning",
      "Logo Design (3 Konsept)",
      "Brand Identity (Colors, Fonts, Voice)",
      "Marketing Materials",
      "Full UI/UX Package (Yukarıdaki Tümü)",
      "Design System Development",
      "Component Library (Coded)",
      "Motion Design & Micro-interactions",
      "Multi-platform (Web, iOS, Android)",
      "Brand Guidelines Book",
      "3 Ay Design Support",
      "Unlimited Revisions",
    ],
    popular: false,
    gradient: "from-pink-600 to-purple-600",
  },
];

const faqs = [
  {
    q: "UI ve UX tasarım arasındaki fark nedir?",
    a: "UX (User Experience) kullanıcının ürünle etkileşiminin tamamını kapsar - araştırma, user flows, wireframes. UI (User Interface) ise görsel tasarım, renk, tipografi gibi aesthetic kısımdır. İyi bir dijital ürün için her ikisi de şarttır.",
  },
  {
    q: "Tasarım süreci ne kadar sürer?",
    a: "Basit UI tasarımı 1-2 hafta, full UI/UX projesi 3-5 hafta, brand + UI/UX 6-8 hafta sürer. Proje kapsamına ve revizyon sayısına göre değişir.",
  },
  {
    q: "Figma mı Adobe XD mi kullanıyorsunuz?",
    a: "Öncelikli olarak Figma kullanıyoruz çünkü collaborative ve modern. Ancak müşteri tercihi varsa Adobe XD, Sketch veya diğer araçları da kullanabiliriz.",
  },
  {
    q: "Design system nedir ve neden önemli?",
    a: "Design system, tutarlı tasarım için components, patterns, style guide ve code snippets içerir. Marka tutarlılığı sağlar, geliştirmeyi hızlandırır ve ölçeklendirmeyi kolaylaştırır. Özellikle büyük projelerde kritik öneme sahiptir.",
  },
  {
    q: "Mobil uygulama tasarımı da yapıyor musunuz?",
    a: "Evet, iOS ve Android için native app UI/UX tasarımları yapıyoruz. Apple HIG ve Material Design guidelines'a uygun, platform-specific tasarımlar sunuyoruz.",
  },
  {
    q: "Usability testing nasıl yapılıyor?",
    a: "Gerçek kullanıcılarla (5-8 kişi) moderated veya unmoderated test sessions yapıyoruz. Görevler veriyor, gözlemliyor ve feedback topluyoruz. Sonuçları analiz edip tasarımı optimize ediyoruz.",
  },
];

export default function UIUXTasarimPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "UI/UX Tasarım Hizmeti",
    description: "Profesyonel kullanıcı arayüzü ve deneyim tasarımı hizmetleri",
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
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-black to-black" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute left-1/4 top-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-r from-purple-600/30 to-pink-500/30 blur-[180px]"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              className="absolute right-1/4 top-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-l from-pink-600/20 to-purple-600/20 blur-[180px]"
            />
          </div>

          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:100px_100px]" />

          <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-purple-500/30 bg-purple-600/10 px-6 py-2.5 backdrop-blur-xl"
            >
              <Palette className="h-5 w-5 text-purple-400" />
              <span className="text-sm font-bold uppercase tracking-widest text-purple-400">
                UI/UX Design Excellence
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 max-w-5xl text-6xl font-black leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl"
            >
              Kullanıcı Odaklı,{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Görsel Mükemmel
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12 max-w-3xl text-xl leading-relaxed text-gray-400"
            >
              Data-driven UX research, pixel-perfect UI design ve interactive prototyping.
              Figma, Adobe XD ile award-winning digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-4 text-base font-bold text-white shadow-2xl shadow-purple-500/50 transition-all hover:scale-105 hover:shadow-purple-500/70"
              >
                <span className="flex items-center gap-2">
                  Tasarım Teklifi Alın
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </a>
              <Link
                href="/projeler"
                className="rounded-full border-2 border-white/20 bg-white/5 px-10 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                Portfolio
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Design Process - Visual Timeline */}
        <section className="relative bg-black py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-pink-600/10 blur-[150px]" />
          </div>

          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20 text-center"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-600/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-purple-400">
                Our Process
              </div>
              <h2 className="mb-4 text-5xl font-bold text-white md:text-6xl">
                Tasarım Sürecimiz
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                Data-driven ve iterative design methodology
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {designProcess.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="group relative"
                >
                  <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.1] to-transparent p-8 backdrop-blur-xl transition-all duration-500 hover:border-white/30">
                    <div className={`absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r ${step.color}`} />

                    <div className="mb-6 text-7xl font-black text-white/[0.08]">{step.number}</div>

                    <div className={`mb-3 inline-block rounded-full border border-purple-500/30 bg-purple-600/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-400`}>
                      {step.phase}
                    </div>

                    <h3 className="mb-4 text-2xl font-black text-white">
                      {step.title}
                    </h3>

                    <p className="mb-6 text-sm leading-relaxed text-gray-400">
                      {step.description}
                    </p>

                    <div className="space-y-2">
                      {step.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-gray-500">
                          <div className={`h-1 w-1 rounded-full bg-gradient-to-r ${step.color}`} />
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className={`pointer-events-none absolute -inset-20 bg-gradient-to-br ${step.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-5`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
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
              <h2 className="mb-4 text-5xl font-bold text-white md:text-6xl">
                Success Stories
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                Gerçek projeler, ölçülebilir sonuçlar
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {caseStudies.map((study, i) => (
                <motion.div
                  key={study.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="group relative"
                >
                  <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black shadow-2xl transition-all duration-500 hover:border-white/30">
                    <div className={`absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r ${study.gradient}`} />

                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="mb-3">
                        <span className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${study.gradient} bg-clip-text text-transparent`}>
                          {study.client}
                        </span>
                      </div>

                      <h3 className="mb-3 text-2xl font-black text-white">
                        {study.title}
                      </h3>

                      <p className="mb-6 text-lg font-semibold text-purple-400">
                        {study.result}
                      </p>

                      {/* Metrics */}
                      <div className="space-y-2">
                        {study.metrics.map((metric) => (
                          <div key={metric} className="flex items-center gap-2 text-sm text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-purple-400" />
                            {metric}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`pointer-events-none absolute -inset-20 bg-gradient-to-br ${study.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-15`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Design Principles */}
        <section className="relative bg-black py-32">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                Tasarım Prensiplerimiz
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {designPrinciples.map((principle, i) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent p-8 text-center backdrop-blur-xl transition-all hover:border-purple-500/50 hover:bg-white/10"
                >
                  <div className="mb-4 text-5xl">{principle.icon}</div>
                  <h3 className="mb-3 text-xl font-bold text-white">{principle.title}</h3>
                  <p className="text-sm text-gray-400">{principle.desc}</p>
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
              <h2 className="mb-4 text-5xl font-bold text-white md:text-6xl">
                Tasarım Paketleri
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                İhtiyacınıza özel UI/UX tasarım çözümleri
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
                        🏆 Most Popular
                      </div>
                    </div>
                  )}

                  <div className={`relative h-full overflow-hidden rounded-3xl border p-10 backdrop-blur-xl transition-all duration-500 ${
                    pkg.popular
                      ? "border-[#d4af37]/50 bg-gradient-to-br from-[#d4af37]/10 via-[#d4af37]/5 to-transparent shadow-2xl shadow-[#d4af37]/30"
                      : "border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] hover:border-white/30"
                  }`}>
                    <div className={`absolute left-0 top-0 h-2 w-full bg-gradient-to-r ${pkg.gradient}`} />

                    <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                      {pkg.priceDetail}
                    </div>
                    <h3 className="mb-4 text-3xl font-black text-white">{pkg.name}</h3>
                    <p className="mb-6 text-sm leading-relaxed text-gray-400">{pkg.desc}</p>

                    <div className="mb-8 border-b border-white/10 pb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-black text-white">{pkg.price}</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">başlangıç fiyatı</div>
                    </div>

                    <ul className="mb-10 space-y-4">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className={`h-5 w-5 shrink-0 ${pkg.popular ? 'text-[#d4af37]' : 'text-purple-400'}`} />
                          <span className="text-sm leading-relaxed text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={whatsappHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full rounded-xl py-4 text-center text-sm font-bold transition-all ${
                        pkg.popular
                          ? "bg-gradient-to-r from-[#d4af37] to-[#f0d882] text-black shadow-lg shadow-[#d4af37]/50 hover:scale-105"
                          : "border-2 border-white/10 bg-white/5 text-white hover:border-purple-500/50 hover:bg-white/10"
                      }`}
                    >
                      {pkg.popular ? "🚀 Şimdi Başla" : "Paketi Seç"}
                    </a>
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
                UI/UX tasarım hakkında merak edilenler
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
              <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-600/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-purple-400">
                <Sparkles className="h-4 w-4" />
                <span>Let's Design</span>
              </div>

              <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Kullanıcılarınızı{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Mutlu Edin
                </span>
              </h2>

              <p className="mb-10 text-lg text-gray-300 md:text-xl">
                UI/UX tasarım projesi için ücretsiz danışmanlık alın, birlikte harika deneyimler yaratalım.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-purple-500/50 transition-all hover:scale-105"
                >
                  <span>Projenize Başlayın</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>

                <a
                  href="tel:+905321667697"
                  className="rounded-full border-2 border-white/20 bg-white/5 px-10 py-5 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
                >
                  📞 Hemen Görüşelim
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


