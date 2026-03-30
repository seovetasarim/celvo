"use client";

import { motion } from "framer-motion";
import { ExternalLink, Sparkles, ArrowUpRight, Calendar, Target } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "AltınBilgi",
    domain: "altinbilgi.com",
    url: "https://www.altinbilgi.com",
    category: "Finance & Market Data",
    description: "Canlı altın fiyatları ve döviz kurları platformu. Gerçek zamanlı piyasa verileri, hesaplama araçları ve fiyat alarm sistemi ile profesyonel finansal bilgi platformu.",
    image: "/images/islerimiz/altinbilgi.webp",
    tags: ["Next.js", "Real-time Data", "Finance", "API", "WebSocket"],
    features: ["Canlı Veri Akışı", "Hesaplama Araçları", "Fiyat Alarmları"],
    gradient: "from-yellow-600 to-amber-500",
    year: "2025",
  },
  {
    id: 2,
    title: "RandevuScripti",
    domain: "randevuscripti.com",
    url: "https://www.randevuscripti.com",
    category: "SaaS Booking System",
    description: "Profesyonel online randevu yönetim sistemi. Admin paneli, müşteri yönetimi, takvim entegrasyonu ve slot yönetimi ile white-label randevu çözümü.",
    image: "/images/islerimiz/randevuscripti.webp",
    tags: ["Next.js", "SaaS", "Booking System", "Admin Panel", "Calendar"],
    features: ["Admin Dashboard", "Müşteri Yönetimi", "Slot Sistemi"],
    gradient: "from-blue-600 to-indigo-500",
    year: "2025",
  },
  {
    id: 3,
    title: "eDavetiye",
    domain: "edavetiye.co",
    url: "https://www.edavetiye.co",
    category: "Digital Invitation Platform",
    description: "Dijital davetiye oluşturma platformu. RSVP yönetimi, özel şablonlar, konum ve takvim entegrasyonu ile profesyonel etkinlik davetiyeleri.",
    image: "/images/islerimiz/edavetiye.webp",
    tags: ["Next.js", "Digital Invitation", "RSVP", "Events", "Templates"],
    features: ["500+ Şablon", "RSVP Takibi", "Konum Entegrasyonu"],
    gradient: "from-rose-600 to-pink-500",
    year: "2025",
  },
  {
    id: 4,
    title: "İddaa Sohbet",
    domain: "iddaasohbet.com",
    category: "Forum & Community Platform",
    description: "Spor bahisleri ve iddaa tahminleri için kapsamlı topluluk platformu. Real-time chat sistemi, forum altyapısı, kullanıcı profilleri ve etkileşim özellikleri ile Türkiye'nin en aktif bahis topluluğu.",
    image: "/images/islerimiz/iddaa.webp",
    tags: ["Next.js", "Real-time Chat", "Forum", "Community", "WebSocket"],
    features: ["10,000+ Aktif Kullanıcı", "Real-time Messaging", "SEO Optimized"],
    gradient: "from-blue-600 to-cyan-500",
    year: "2024",
  },
  {
    id: 2,
    title: "Tevbe Terapisi",
    domain: "tevbeterapisi.com",
    url: "https://www.tevbeterapisi.com/",
    category: "Healthcare & Wellness",
    description: "Online psikolojik danışmanlık ve terapi platformu. Randevu yönetim sistemi, güvenli hasta-terapist iletişimi, ödeme entegrasyonu ve KVKK uyumlu veri yönetimi ile profesyonel sağlık hizmeti.",
    image: "/images/islerimiz/tevbereferans.webp",
    tags: ["Healthcare", "Booking System", "KVKK", "Payment", "CMS"],
    features: ["Güvenli İletişim", "Randevu Sistemi", "Mobil Uyumlu"],
    gradient: "from-purple-600 to-pink-500",
    year: "2024",
  },
  {
    id: 3,
    title: "Hajum",
    domain: "hajum.net",
    category: "Corporate Website",
    description: "Modern kurumsal web sitesi tasarımı. Responsive design, yüksek performans, SEO optimizasyonu ve kullanıcı dostu admin paneli ile profesyonel marka kimliği yansıması.",
    image: "/images/islerimiz/hajumreferans.webp",
    tags: ["Corporate", "SEO", "Modern Design", "CMS", "Analytics"],
    features: ["100% SEO Score", "Fast Loading", "Admin Panel"],
    gradient: "from-green-600 to-emerald-500",
    year: "2023",
  },
  {
    id: 4,
    title: "Firma Kontrol",
    domain: "firmakontrol.com",
    category: "Business Intelligence Platform",
    description: "Şirket sorgulama ve doğrulama platformu. API entegrasyonları, veri analizi, raporlama araçları ve kullanıcı dashboard'u ile işletmelere güvenilir bilgi sağlayan SaaS çözümü.",
    image: "/images/islerimiz/firmakontrol.webp",
    tags: ["SaaS", "API Integration", "Analytics", "Dashboard", "Database"],
    features: ["API Gateway", "Real-time Data", "Advanced Search"],
    gradient: "from-orange-600 to-red-500",
    year: "2023",
  },
  {
    id: 5,
    title: "Çocuk Mont",
    domain: "cocukmont.com.tr",
    category: "E-Commerce Platform",
    description: "Çocuk giyim e-ticaret sitesi. Güvenli ödeme sistemleri, stok yönetimi, kargo entegrasyonu, admin paneli ve kullanıcı dostu alışveriş deneyimi ile yüksek dönüşüm oranlarına sahip online mağaza.",
    image: "/images/islerimiz/cocukmontreferans.webp",
    tags: ["E-Commerce", "Payment Gateway", "Stock Management", "Cargo", "Admin"],
    features: ["Güvenli Alışveriş", "Hızlı Ödeme", "Stok Takibi"],
    gradient: "from-yellow-600 to-orange-500",
    year: "2024",
  },
  {
    id: 6,
    title: "İlen",
    domain: "ilen.net",
    category: "Classified Ads Platform",
    description: "İlan ve duyuru platformu. Kategori yönetimi, gelişmiş arama filtreleri, kullanıcı paneli, ilan yönetimi ve SEO uyumlu yapı ile kapsamlı ilan sitesi çözümü.",
    image: "/images/islerimiz/ilenreferans.webp",
    tags: ["Platform", "Listing", "Search", "User Panel", "Categories"],
    features: ["Gelişmiş Arama", "Kategori Sistemi", "User Dashboard"],
    gradient: "from-indigo-600 to-purple-500",
    year: "2023",
  },
  {
    id: 7,
    title: "PushAI",
    domain: "pushai.dev",
    url: "https://pushai.dev/",
    category: "AI-Powered SaaS",
    description: "AI destekli push notification servisi. Gelişmiş hedefleme, automation, analytics dashboard ve API entegrasyonu ile modern bildirim yönetim platformu.",
    image: "/images/islerimiz/pushai1.webp",
    tags: ["AI", "SaaS", "API", "Automation", "Analytics"],
    features: ["AI Targeting", "API Integration", "Real-time Analytics"],
    gradient: "from-pink-600 to-purple-600",
    year: "2024",
  },
];

const categories = ["Tümü", "E-Commerce", "SaaS", "Corporate", "Platform", "Healthcare"];

export default function ProjelerPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const filteredProjects = selectedCategory === "Tümü" 
    ? projects 
    : projects.filter(p => p.category.includes(selectedCategory));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projelerimiz - Dijital Website Web Tasarım Portföyü",
    description: "Dijital Website web tasarım ajansının gerçekleştirdiği başarılı projeler",
    url: "https://dijitalwebsite.com/projeler",
  };

  return (
    <>
      <Script
        id="projects-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-black">
        <Header />

        {/* Hero Section */}
        <section className="relative min-h-[70vh] overflow-hidden bg-black pt-32 pb-20">
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
                Portfolio
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
              <span className="block">Başarılı</span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#d4af37] via-[#f0d882] to-purple-500 bg-clip-text text-transparent">
                  Projelerimiz
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
              E-ticaret, kurumsal, SaaS ve community platformlarında{" "}
              <span className="font-semibold text-white">gerçekleştirdiğimiz</span> web tasarım ve yazılım projeleri.
            </motion.p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="relative bg-black py-8">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full border px-6 py-2.5 text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "border-[#d4af37] bg-[#d4af37]/10 text-white"
                      : "border-white/10 bg-white/5 text-gray-400 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid - Enhanced */}
        <section className="relative bg-black py-20 pb-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />
            <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]" />
          </div>

          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-10 lg:gap-12">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="group relative"
                >
                  <div className={`grid grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-8 shadow-2xl transition-all duration-500 hover:border-white/30 lg:grid-cols-5 lg:p-0 ${
                    i % 2 === 0 ? "" : "lg:grid-flow-dense"
                  }`}>
                    {/* Gradient top line */}
                    <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${project.gradient}`} />

                    {/* Image Column */}
                    <div className={`relative lg:col-span-3 ${i % 2 === 0 ? "" : "lg:col-start-3"}`}>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl lg:aspect-auto lg:h-full lg:min-h-[400px] lg:rounded-none">
                        <Image
                          src={project.image}
                          alt={`${project.title} - Dijital Website Web Tasarım Projesi`}
                          fill
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-${i % 2 === 0 ? 'r' : 'l'} from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className={`flex flex-col justify-center lg:col-span-2 lg:p-10 ${i % 2 === 0 ? "" : "lg:col-start-1 lg:row-start-1"}`}>
                      {/* Year & Category */}
                      <div className="mb-4 flex items-center gap-4">
                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                          <Calendar className="h-3 w-3 text-[#d4af37]" />
                          <span className="text-gray-400">{project.year}</span>
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                          {project.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-4xl font-black text-white">
                        {project.title}
                      </h3>

                      {/* Domain */}
                      <a
                        href={project.url || `https://${project.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-[#d4af37]"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {project.domain}
                      </a>

                      {/* Description */}
                      <p className="mb-6 text-base leading-relaxed text-gray-400">
                        {project.description}
                      </p>

                      {/* Features */}
                      <div className="mb-6 space-y-2">
                        {project.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-3">
                            <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${project.gradient}`} />
                            <span className="text-sm text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="mb-6 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <a
                        href={project.url || `https://${project.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-[#d4af37]/50 hover:bg-white/10 lg:w-auto"
                      >
                        <span>Projeyi Ziyaret Et</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      </a>
                    </div>

                    {/* Background glow */}
                    <div className={`pointer-events-none absolute -inset-20 bg-gradient-to-br ${project.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="relative bg-black py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/10 blur-[150px]" />
          </div>

          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-10 backdrop-blur-xl md:p-12"
            >
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#d4af37] via-purple-500 to-[#d4af37]" />

              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                Web Tasarım Portföyümüz ve Referanslarımız
              </h2>

              <div className="space-y-5 text-base leading-relaxed text-gray-300">
                <p>
                  <strong className="text-white">Dijital Website web tasarım ajansı</strong> olarak, e-ticaret sitelerinden SaaS platformlarına, 
                  kurumsal web sitelerinden community platformlarına kadar geniş bir yelpazede <strong className="text-white">başarılı web tasarım projeleri</strong> gerçekleştirdik. 
                  Her projemizde modern teknolojiler, <strong className="text-white">SEO optimizasyonu</strong> ve kullanıcı deneyimi odaklı yaklaşımımızla 
                  müşterilerimizin dijital hedeflerine ulaşmalarını sağladık.
                </p>

                <p>
                  <strong className="text-white">E-ticaret web tasarım</strong> projelerimizde, sadece ürün satan değil müşteri deneyimini önceleyen, 
                  yüksek dönüşüm oranlarına sahip online mağazalar yaratıyoruz. Güvenli ödeme sistemleri, stok yönetimi, kargo entegrasyonları ve 
                  kullanıcı dostu admin panelleriyle eksiksiz e-ticaret çözümleri sunuyoruz. <strong className="text-white">Mobil uyumlu web tasarım</strong> prensipleriyle 
                  her cihazda kusursuz alışveriş deneyimi sağlıyoruz.
                </p>

                <p>
                  <strong className="text-white">Kurumsal web tasarım</strong> çalışmalarımızda, markanızın profesyonel imajını güçlendiren, 
                  güven veren ve kullanıcı deneyimini ön planda tutan çözümler geliştiriyoruz. CMS entegrasyonları, API geliştirme ve 
                  özel yazılım çözümleriyle kurumsal ihtiyaçlarınıza özel web siteleri tasarlıyoruz. <strong className="text-white">Google SEO</strong> uyumlu 
                  kodlama ve teknik optimizasyonlarla arama motorlarında üst sıralarda yer almanızı sağlıyoruz.
                </p>

                <p>
                  SaaS ve platform projelerimizde, ölçeklenebilir altyapı, güvenli veri yönetimi ve gelişmiş özelliklerle 
                  kullanıcılarınıza değer katan dijital ürünler yaratıyoruz. <strong className="text-white">Web yazılım</strong> uzmanlığımızla 
                  API entegrasyonları, real-time özellikler ve automation çözümleri geliştiriyoruz. Portföyümüzdeki her proje, 
                  müşteri memnuniyeti ve teknik mükemmellik prensiplerimizin bir göstergesidir.
                </p>
              </div>
            </motion.div>
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
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#d4af37] via-purple-500 to-[#d4af37]" />

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#d4af37]">
                <Sparkles className="h-4 w-4" />
                <span>Let's Collaborate</span>
              </div>

              <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Sıradaki Başarılı Proje{" "}
                <span className="bg-gradient-to-r from-[#d4af37] to-[#f0d882] bg-clip-text text-transparent">
                  Sizinki Olsun
                </span>
              </h2>

              <p className="mb-10 text-lg text-gray-300 md:text-xl">
                Web tasarım ve SEO projesi için ücretsiz teklif alın, birlikte harika işler çıkaralım.
              </p>

              <Link
                href="/teklif-al"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0d882] px-10 py-5 text-lg font-bold text-black shadow-2xl shadow-[#d4af37]/50 transition-all hover:scale-105 hover:shadow-[#d4af37]/70"
              >
                <span>Projenize Başlayın</span>
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}


