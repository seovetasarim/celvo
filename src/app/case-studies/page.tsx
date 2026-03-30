"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, TrendingUp, Target, CheckCircle2, BarChart3, ShoppingCart, Users, Zap } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const allCaseStudies = [
  {
    id: 1,
    client: "İddaa Sohbet",
    domain: "iddaasohbet.com",
    industry: "Forum & Community",
    service: "SEO Optimization & Community Platform",
    duration: "6 ay",
    challenge: "Yeni bir spor bahisleri forumu olarak Google'da görünürlük kazanmak ve organik kullanıcı çekmek.",
    solution: "Comprehensive SEO strategy, technical optimization, content marketing ve forum engagement tactics.",
    results: {
      traffic: "+350%",
      keywords: "1,200+ keyword ilk sayfada",
      ranking: "#1-3 ana keywordlerde",
      users: "10,000+ aktif kullanıcı",
    },
    metrics: [
      { label: "Organic Traffic", value: "+350%", icon: TrendingUp, highlight: true },
      { label: "Keyword Rankings", value: "1,200+", icon: Target },
      { label: "Top Positions", value: "#1-3", icon: CheckCircle2 },
      { label: "Active Users", value: "10K+", icon: Users },
    ],
    image: "/images/islerimiz/iddaa.webp",
    technologies: ["Next.js", "SEO", "Forum Engine", "Real-time Chat"],
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    id: 2,
    client: "Tevbe Terapisi",
    domain: "tevbeterapisi.com",
    url: "https://www.tevbeterapisi.com/",
    industry: "Healthcare & Wellness",
    service: "Healthcare Platform Development",
    duration: "4 ay",
    challenge: "Online terapi için KVKK uyumlu, güvenli ve kullanıcı dostu platform geliştirmek.",
    solution: "Custom healthcare platform, secure booking system, encrypted communication ve payment integration.",
    results: {
      satisfaction: "98% hasta memnuniyeti",
      bookings: "500+ aylık randevu",
      rating: "4.9/5 ortalama puan",
      growth: "+180% kullanıcı artışı",
    },
    metrics: [
      { label: "Patient Satisfaction", value: "98%", icon: CheckCircle2, highlight: true },
      { label: "Monthly Bookings", value: "500+", icon: BarChart3 },
      { label: "Average Rating", value: "4.9/5", icon: Target },
      { label: "User Growth", value: "+180%", icon: TrendingUp },
    ],
    image: "/images/islerimiz/tevbereferans.webp",
    technologies: ["React", "KVKK Compliant", "Booking System", "Payment Gateway"],
    gradient: "from-purple-600 to-pink-500",
  },
  {
    id: 3,
    client: "Çocuk Mont",
    domain: "cocukmont.com.tr",
    industry: "E-Commerce",
    service: "E-Commerce Development & Optimization",
    duration: "3 ay",
    challenge: "Düşük dönüşüm oranı ve yüksek sepet terk oranı. Mobil alışveriş deneyimi zayıf.",
    solution: "UI/UX redesign, checkout flow optimization, mobile-first approach ve conversion rate optimization.",
    results: {
      sales: "+245% satış artışı",
      conversion: "3.2% → 7.8% dönüşüm",
      cart: "Sepet terk %65 → %38",
      revenue: "Aylık ciro 3.5x",
    },
    metrics: [
      { label: "Sales Increase", value: "+245%", icon: TrendingUp, highlight: true },
      { label: "Conversion Rate", value: "7.8%", icon: Target },
      { label: "Cart Abandonment", value: "38%", icon: ShoppingCart },
      { label: "Revenue Growth", value: "3.5x", icon: BarChart3 },
    ],
    image: "/images/islerimiz/cocukmontreferans.webp",
    technologies: ["WooCommerce", "iyzico", "MNG Kargo", "Google Analytics"],
    gradient: "from-yellow-600 to-orange-500",
  },
  {
    id: 4,
    client: "Hajum",
    domain: "hajum.net",
    industry: "Corporate",
    service: "Corporate Website & SEO",
    duration: "4 ay",
    challenge: "Eski web sitesi mobil uyumsuz ve Google'da görünmüyor. Modern bir kurumsal kimlik gerekiyor.",
    solution: "Full website redesign, technical SEO overhaul, content strategy ve brand identity refresh.",
    results: {
      traffic: "+280% organik trafik",
      da: "Domain Authority 45 → 68",
      keywords: "850+ keyword top 10",
      leads: "+165% lead generation",
    },
    metrics: [
      { label: "Organic Traffic", value: "+280%", icon: TrendingUp, highlight: true },
      { label: "Domain Authority", value: "68", icon: Zap },
      { label: "Top 10 Keywords", value: "850+", icon: Target },
      { label: "Lead Generation", value: "+165%", icon: Users },
    ],
    image: "/images/islerimiz/hajumreferans.webp",
    technologies: ["Next.js", "Technical SEO", "Google Search Console", "Analytics"],
    gradient: "from-green-600 to-emerald-500",
  },
  {
    id: 5,
    client: "PushAI",
    domain: "pushai.dev",
    url: "https://pushai.dev/",
    industry: "AI & SaaS",
    service: "SaaS Platform Development",
    duration: "5 ay",
    challenge: "AI-powered notification service için scalable platform ve developer-friendly API geliştirmek.",
    solution: "Headless architecture, RESTful API, real-time dashboard ve comprehensive documentation.",
    results: {
      users: "2,000+ active developers",
      api: "10M+ API calls/ay",
      uptime: "99.9% uptime SLA",
      growth: "+320% MoM growth",
    },
    metrics: [
      { label: "Active Developers", value: "2K+", icon: Users },
      { label: "API Calls", value: "10M+", icon: BarChart3, highlight: true },
      { label: "Uptime", value: "99.9%", icon: CheckCircle2 },
      { label: "MoM Growth", value: "+320%", icon: TrendingUp },
    ],
    image: "/images/islerimiz/pushai1.webp",
    technologies: ["Next.js", "Node.js API", "PostgreSQL", "Redis", "Vercel"],
    gradient: "from-pink-600 to-purple-600",
  },
];

export default function CaseStudiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Vaka Çalışmaları - Dijital Website Başarı Hikayeleri",
    description: "Dijital Website web tasarım ve SEO ajansının gerçekleştirdiği başarılı projeler ve ölçülebilir sonuçlar",
    url: "https://dijitalwebsite.com/case-studies",
  };

  return (
    <>
      <Script
        id="case-studies-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-black">
        <Header />

        {/* Hero */}
        <section className="relative min-h-[80vh] overflow-hidden bg-black pt-32 pb-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-[#d4af37]/20 to-purple-600/20 blur-[150px]"
            />
          </div>

          <div className="absolute inset-0 -z-10 opacity-20 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:80px_80px]" />

          <div className="mx-auto max-w-5xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 inline-flex items-center gap-4 rounded-full border border-[#d4af37]/30 bg-gradient-to-r from-[#d4af37]/10 via-purple-600/10 to-[#d4af37]/10 px-8 py-3 backdrop-blur-xl"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-[#d4af37]"
              />
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#d4af37]">
                Case Studies
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="h-2 w-2 rounded-full bg-purple-500"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 text-6xl font-black tracking-tight text-white md:text-7xl lg:text-8xl"
            >
              <span className="block">Kanıtlanmış</span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#d4af37] via-[#f0d882] to-purple-500 bg-clip-text text-transparent">
                  Başarılar
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="absolute -bottom-4 left-0 h-2 w-full origin-left rounded-full bg-gradient-to-r from-[#d4af37] via-purple-500 to-transparent"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-400 md:text-2xl"
            >
              Gerçek projeler, <span className="font-semibold text-white">ölçülebilir sonuçlar</span> ve{" "}
              <span className="font-semibold text-white">sürdürülebilir büyüme</span>. Data ile konuşuyoruz.
            </motion.p>
          </div>
        </section>

        {/* Case Studies - Detailed */}
        <section className="relative bg-black py-20 pb-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="space-y-24">
              {allCaseStudies.map((study, i) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="group relative"
                >
                  <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black shadow-2xl">
                    <div className={`absolute left-0 top-0 h-2 w-full bg-gradient-to-r ${study.gradient}`} />

                    {/* Header */}
                    <div className="border-b border-white/5 p-10 lg:p-12">
                      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
                        <div>
                          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
                            <span className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${study.gradient} bg-clip-text text-transparent`}>
                              {study.industry}
                            </span>
                          </div>
                          <h2 className="mb-3 text-5xl font-black text-white">
                            {study.client}
                          </h2>
                          <a
                            href={study.url || `https://${study.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-[#d4af37]"
                          >
                            🌐 {study.domain}
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
                              <span className="text-gray-500">Service:</span>{" "}
                              <span className="font-semibold text-white">{study.service}</span>
                            </div>
                            <div className="rounded-lg border border-green-500/20 bg-green-500/5 px-3 py-1.5">
                              <span className="font-semibold text-green-400">📅 {study.duration}</span>
                            </div>
                          </div>
                        </div>

                        {/* Image Preview */}
                        <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 shadow-xl">
                          <img
                            src={study.image}
                            alt={`${study.client} Case Study`}
                            className="h-full w-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        </div>
                      </div>
                    </div>

                    {/* Challenge & Solution */}
                    <div className="grid grid-cols-1 gap-8 border-b border-white/5 p-10 lg:grid-cols-2 lg:p-12">
                      <div>
                        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                          <Target className="h-5 w-5 text-orange-400" />
                          Challenge
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-400">
                          {study.challenge}
                        </p>
                      </div>
                      <div>
                        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                          <Zap className="h-5 w-5 text-green-400" />
                          Solution
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-400">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="p-10 lg:p-12">
                      <h3 className="mb-8 text-2xl font-bold text-white">
                        Measurable Results
                      </h3>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {study.metrics.map((metric) => (
                          <div
                            key={metric.label}
                            className={`relative overflow-hidden rounded-2xl border p-6 backdrop-blur-sm transition-all hover:scale-105 ${
                              metric.highlight
                                ? `border-opacity-30 bg-gradient-to-br opacity-10 to-transparent ${study.gradient.replace('from-', 'border-').split(' ')[0].replace('border-', 'from-')}`
                                : "border-white/10 bg-white/5"
                            }`}
                          >
                            <div className="mb-3 flex items-center gap-2">
                              <metric.icon className={`h-5 w-5 ${metric.highlight ? 'text-green-400' : 'text-gray-400'}`} />
                              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                {metric.label}
                              </span>
                            </div>
                            <div className="text-4xl font-black text-white">{metric.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="mt-8 flex flex-wrap gap-2">
                        {study.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={`pointer-events-none absolute -inset-20 bg-gradient-to-br ${study.gradient} opacity-0 blur-[100px] transition-opacity duration-500 group-hover:opacity-10`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative bg-black py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/10 blur-[150px]" />
          </div>

          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-12 text-center backdrop-blur-xl md:p-16"
            >
              <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-[#d4af37] via-purple-500 to-[#d4af37]" />

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#d4af37]">
                <Sparkles className="h-4 w-4" />
                <span>Your Turn</span>
              </div>

              <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Sıradaki Başarı Hikayesi{" "}
                <span className="bg-gradient-to-r from-[#d4af37] to-[#f0d882] bg-clip-text text-transparent">
                  Sizinki
                </span>
              </h2>

              <p className="mb-10 text-lg text-gray-300 md:text-xl">
                Projeniz için ücretsiz danışmanlık ve detaylı strateji planı alın.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/teklif-al"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0d882] px-10 py-5 text-lg font-bold text-black shadow-2xl shadow-[#d4af37]/50 transition-all hover:scale-105"
                >
                  <span>Projenize Başlayın</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>

                <a
                  href="tel:+905321667697"
                  className="rounded-full border-2 border-white/20 bg-white/5 px-10 py-5 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
                >
                  📞 Strateji Görüşmesi
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




