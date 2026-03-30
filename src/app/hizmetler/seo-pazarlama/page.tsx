"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, ArrowUpRight, CheckCircle2, ChevronDown, TrendingUp, Target, BarChart3, Megaphone } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import { useState } from "react";

const seoServices = [
  {
    icon: Search,
    title: "Teknik SEO",
    desc: "Site hızı optimizasyonu, Core Web Vitals, schema markup, XML sitemap ve teknik altyapı iyileştirmeleri.",
    items: ["Site Speed Optimization", "Core Web Vitals", "Schema Markup", "Technical Audit"],
    gradient: "from-green-600 to-emerald-500",
  },
  {
    icon: Target,
    title: "İçerik SEO",
    desc: "Keyword research, SEO yazı optimizasyonu, content strategy ve blog içerik planlaması.",
    items: ["Keyword Research", "Content Optimization", "Blog Strategy", "Meta Tags"],
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Link Building",
    desc: "Quality backlink stratejisi, guest posting, digital PR ve domain authority artışı.",
    items: ["Quality Backlinks", "Guest Posting", "Digital PR", "Authority Building"],
    gradient: "from-orange-600 to-red-500",
  },
  {
    icon: Megaphone,
    title: "Local SEO",
    desc: "Google My Business optimizasyonu, local citations ve bölgesel arama görünürlüğü.",
    items: ["Google My Business", "Local Citations", "Maps Optimization", "Reviews Management"],
    gradient: "from-yellow-600 to-orange-500",
  },
];

const caseStudies = [
  {
    client: "İddaa Sohbet",
    service: "SEO Optimizasyonu",
    duration: "6 ay",
    results: {
      traffic: "+350%",
      keywords: "1.200+ keyword ilk sayfada",
      ranking: "#1-3 ana keywordlerde",
    },
    image: "/images/islerimiz/iddaa.webp",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    client: "Hajum",
    service: "Technical SEO + Content",
    duration: "4 ay",
    results: {
      traffic: "+280%",
      keywords: "850+ keyword top 10",
      ranking: "Domain Authority 45 → 68",
    },
    image: "/images/islerimiz/hajumreferans.webp",
    gradient: "from-green-600 to-emerald-500",
  },
  {
    client: "İlen Platform",
    service: "Full SEO Package",
    duration: "8 ay",
    results: {
      traffic: "+420%",
      keywords: "2.500+ indexed keywords",
      ranking: "100K+ monthly organic visits",
    },
    image: "/images/islerimiz/ilenreferans.webp",
    gradient: "from-indigo-600 to-purple-500",
  },
];

const seoMetrics = [
  { label: "Avg. Traffic Increase", value: "+285%", icon: TrendingUp },
  { label: "Avg. Keyword Rankings", value: "1,200+", icon: Target },
  { label: "Page 1 Success Rate", value: "94%", icon: CheckCircle2 },
  { label: "Client Retention", value: "96%", icon: BarChart3 },
];

const packages = [
  {
    name: "SEO Starter",
    price: "5.000₺",
    priceDetail: "aylık",
    desc: "Küçük işletmeler için temel SEO",
    features: [
      "Teknik SEO Denetimi",
      "10 Keyword Optimizasyonu",
      "On-Page SEO (5 Sayfa)",
      "Google Analytics Setup",
      "Search Console Setup",
      "Aylık Performans Raporu",
      "Meta Tag Optimizasyonu",
      "XML Sitemap",
    ],
    popular: false,
    gradient: "from-green-600 to-emerald-500",
  },
  {
    name: "SEO Professional",
    price: "12.000₺",
    priceDetail: "aylık",
    desc: "Kurumsal SEO & içerik stratejisi",
    features: [
      "Comprehensive SEO Audit",
      "30+ Keyword Targeting",
      "On-Page SEO (15 Sayfa)",
      "Technical SEO Fixes",
      "Content Strategy & Planning",
      "4 SEO Optimized Blog/Ay",
      "Backlink Campaign (10 Quality Links)",
      "Competitor Analysis",
      "Google My Business Optimization",
      "Schema Markup Implementation",
      "Weekly Performance Reports",
      "Monthly Strategy Calls",
    ],
    popular: true,
    gradient: "from-[#d4af37] to-[#f0d882]",
  },
  {
    name: "SEO Enterprise",
    price: "25.000₺+",
    priceDetail: "aylık",
    desc: "Agresif SEO + dijital pazarlama",
    features: [
      "Enterprise SEO Strategy",
      "100+ Keyword Campaign",
      "Unlimited On-Page SEO",
      "Advanced Technical SEO",
      "Content Hub Development",
      "8+ SEO Blog Posts/Ay",
      "Premium Backlink Campaign (25+ Links)",
      "PR & Guest Posting",
      "Multi-location SEO",
      "International SEO",
      "Conversion Rate Optimization",
      "Google Ads Management",
      "Social Media Marketing",
      "Dedicated SEO Manager",
    ],
    popular: false,
    gradient: "from-orange-600 to-red-500",
  },
];

const faqs = [
  {
    q: "SEO sonuç alması ne kadar sürer?",
    a: "İlk sonuçları genellikle 2-3 ayda görmeye başlarsınız. Önemli sıralamalar 4-6 ayda gelir. SEO uzun vadeli bir yatırımdır ve zamanla momentum kazanır. Rekabet düzeyine ve niche'e göre değişir.",
  },
  {
    q: "Google'da ilk sayfaya çıkma garantisi var mı?",
    a: "Kimse %100 garanti veremez çünkü Google algoritması sürekli değişir. Ancak kanıtlanmış stratejilerimiz ve geçmiş performansımız (%94 first page success rate) ile yüksek başarı oranı sunuyoruz.",
  },
  {
    q: "Hangi SEO teknikleri kullanıyorsunuz?",
    a: "White-hat SEO teknikleri kullanıyoruz: technical optimization, quality content, natural link building, user experience improvements. Black-hat veya risky taktikler kullanmıyoruz.",
  },
  {
    q: "Local SEO nedir ve neden önemli?",
    a: "Local SEO, Google Maps ve yerel aramalarda görünürlük sağlar. 'web tasarım istanbul' gibi location-based aramalarda üst sıralarda çıkmanızı sağlar. Fiziksel mağazası olan işletmeler için kritiktir.",
  },
  {
    q: "SEO raporu ne sıklıkla alırım?",
    a: "Haftalık mini raporlar ve aylık comprehensive raporlar gönderiyoruz. Rankings, traffic, conversions ve recommendations içerir. Monthly strategy calls ile detaylı görüşüyoruz.",
  },
  {
    q: "Content writing hizmeti de veriyor musunuz?",
    a: "Evet, SEO-optimized blog yazıları, product descriptions ve landing page content yazıyoruz. Anadili Türkçe profesyonel yazarlarımız keyword integration ile kaliteli içerik üretiyor.",
  },
];

export default function SEOPazarlamaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEO ve Dijital Pazarlama Hizmeti",
    description: "Google SEO optimizasyonu ve dijital pazarlama stratejileri",
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
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/30 via-black to-black" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute left-1/4 top-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-r from-green-600/30 to-emerald-500/30 blur-[180px]"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              className="absolute right-1/4 top-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-l from-emerald-600/20 to-green-600/20 blur-[180px]"
            />
          </div>

          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:100px_100px]" />

          <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-green-500/30 bg-green-600/10 px-6 py-2.5 backdrop-blur-xl"
            >
              <Search className="h-5 w-5 text-green-400" />
              <span className="text-sm font-bold uppercase tracking-widest text-green-400">
                SEO & Digital Marketing
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 max-w-5xl text-6xl font-black leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl"
            >
              Google'da{" "}
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                #1 Olun
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12 max-w-3xl text-xl leading-relaxed text-gray-400"
            >
              Data-driven SEO stratejileri ile organik trafiğinizi artırın. Technical SEO,
              content optimization ve link building ile ranking dominance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/teklif-al"
                className="group rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-10 py-4 text-base font-bold text-white shadow-2xl shadow-green-500/50 transition-all hover:scale-105 hover:shadow-green-500/70"
              >
                <span className="flex items-center gap-2">
                  SEO Analizi Alın
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
              <Link
                href="#case-studies"
                className="rounded-full border-2 border-white/20 bg-white/5 px-10 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                Başarı Hikayeleri
              </Link>
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-20 grid w-full max-w-5xl grid-cols-2 gap-6 lg:grid-cols-4"
            >
              {seoMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent p-6 text-center backdrop-blur-xl"
                >
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                      <metric.icon className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                  <div className="mb-1 text-4xl font-black text-white">{metric.value}</div>
                  <div className="text-xs uppercase tracking-wider text-gray-500">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SEO Services Grid */}
        <section className="relative bg-black py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-emerald-600/10 blur-[150px]" />
          </div>

          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20 text-center"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-600/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-green-400">
                Services
              </div>
              <h2 className="mb-4 text-5xl font-bold text-white md:text-6xl">
                Kapsamlı SEO Hizmetleri
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                Google algoritmasına hakim, kanıtlanmış stratejiler
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {seoServices.map((service, i) => (
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

        {/* Case Studies - Enhanced */}
        <section id="case-studies" className="relative bg-black py-40">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-0 top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-green-600/10 blur-[180px]" />
            <div className="absolute left-0 bottom-0 h-[600px] w-[600px] rounded-full bg-emerald-600/10 blur-[180px]" />
          </div>

          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20 text-center"
            >
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-green-500/30 bg-green-600/10 px-6 py-2.5 backdrop-blur-xl">
                <BarChart3 className="h-5 w-5 text-green-400" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
                  Success Stories
                </span>
              </div>
              <h2 className="mb-6 text-6xl font-black text-white md:text-7xl">
                Kanıtlanmış{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Başarılar
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-400">
                Real clients, measurable results, sustainable growth
              </p>
            </motion.div>

            <div className="space-y-16">
              {caseStudies.map((study, i) => (
                <motion.div
                  key={study.client}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                  className="group relative"
                >
                  <div className={`grid grid-cols-1 gap-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-10 shadow-2xl transition-all duration-500 hover:border-white/30 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-16 ${
                    i % 2 === 0 ? "" : "lg:grid-flow-dense"
                  }`}>
                    <div className={`absolute left-0 top-0 h-2 w-full bg-gradient-to-r ${study.gradient}`} />

                    {/* Image */}
                    <div className={`relative ${i % 2 === 0 ? "" : "lg:col-start-2"}`}>
                      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-xl">
                        <img
                          src={study.image}
                          alt={`${study.client} SEO Case Study`}
                          className="h-full w-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${i % 2 === 0 ? "" : "lg:col-start-1 lg:row-start-1"}`}>
                      <div className="mb-6">
                        <div className={`mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r ${study.gradient} bg-opacity-10 px-4 py-1.5`}>
                          <span className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${study.gradient} bg-clip-text text-transparent`}>
                            {study.service}
                          </span>
                        </div>
                        <h3 className="text-5xl font-black text-white">
                          {study.client}
                        </h3>
                      </div>

                      <div className="mb-8 flex items-center gap-4">
                        <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm">
                          <span className="text-gray-500">Duration:</span>{" "}
                          <span className="font-bold text-white">{study.duration}</span>
                        </div>
                        <div className="rounded-lg border border-green-500/20 bg-green-500/5 px-4 py-2 text-sm">
                          <span className="font-bold text-green-400">Active Campaign</span>
                        </div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="relative overflow-hidden rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent p-6 backdrop-blur-sm">
                          <div className="mb-2 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-green-400">Traffic</span>
                          </div>
                          <div className="text-4xl font-black text-white">{study.results.traffic}</div>
                          <div className="mt-1 text-xs text-gray-500">organic growth</div>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                          <div className="mb-2 flex items-center gap-2">
                            <Target className="h-4 w-4 text-gray-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Keywords</span>
                          </div>
                          <div className="text-3xl font-black text-white">{study.results.keywords}</div>
                          <div className="mt-1 text-xs text-gray-500">top rankings</div>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                          <div className="mb-2 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-gray-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Achievement</span>
                          </div>
                          <div className="text-2xl font-bold text-white">{study.results.ranking}</div>
                          <div className="mt-1 text-xs text-gray-500">position</div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-8">
                        <Link
                          href="/projeler"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-green-400 transition-colors hover:text-green-300"
                        >
                          <span>View Full Case Study</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    <div className={`pointer-events-none absolute -inset-20 bg-gradient-to-br ${study.gradient} opacity-0 blur-[100px] transition-opacity duration-500 group-hover:opacity-15`} />
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
              <h2 className="mb-4 text-5xl font-bold text-white md:text-6xl">
                SEO Paketleri
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-400">
                Aylık SEO yönetimi ve sürekli optimizasyon
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
                        🚀 Recommended
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
                      <div className="mt-2 text-sm text-gray-500">recurring monthly</div>
                    </div>

                    <ul className="mb-10 space-y-4">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className={`h-5 w-5 shrink-0 ${pkg.popular ? 'text-[#d4af37]' : 'text-green-400'}`} />
                          <span className="text-sm leading-relaxed text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/teklif-al"
                      className={`block w-full rounded-xl py-4 text-center text-sm font-bold transition-all ${
                        pkg.popular
                          ? "bg-gradient-to-r from-[#d4af37] to-[#f0d882] text-black shadow-lg shadow-[#d4af37]/50 hover:scale-105"
                          : "border-2 border-white/10 bg-white/5 text-white hover:border-green-500/50 hover:bg-white/10"
                      }`}
                    >
                      {pkg.popular ? "🎯 En Çok Tercih Edilen" : "Paketi Seç"}
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
                SEO Hakkında Sorular
              </h2>
              <p className="text-lg text-gray-400">
                Arama motoru optimizasyonu merak edilenler
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
              <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-500" />

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-600/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-green-400">
                <Sparkles className="h-4 w-4" />
                <span>Rank Higher</span>
              </div>

              <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Google Sıralamanızı{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Yükseltelim
                </span>
              </h2>

              <p className="mb-10 text-lg text-gray-300 md:text-xl">
                Ücretsiz SEO analizi ve detaylı strateji planı için iletişime geçin.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/teklif-al"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-green-500/50 transition-all hover:scale-105"
                >
                  <span>Ücretsiz SEO Analizi</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>

                <a
                  href="tel:+905321667697"
                  className="rounded-full border-2 border-white/20 bg-white/5 px-10 py-5 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
                >
                  📞 SEO Danışmanı ile Görüşün
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



