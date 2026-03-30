"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  // İlk satır - Yan yana
  {
    title: "AltınBilgi",
    domain: "altinbilgi.com",
    url: "https://www.altinbilgi.com",
    category: "Finance Platform",
    description: "Canlı altın fiyatları ve döviz kurları. Gerçek zamanlı piyasa verileri ve hesaplama araçları.",
    image: "/images/islerimiz/altinbilgi.webp",
    tags: ["Finance", "Real-time", "API"],
    gradient: "from-yellow-600 to-amber-500",
  },
  {
    title: "İddaa Sohbet",
    domain: "iddaasohbet.com",
    category: "Forum & Community",
    description: "Spor bahisleri topluluk platformu. Real-time chat, forum sistemi ve aktif kullanıcı etkileşimi.",
    image: "/images/islerimiz/iddaa.webp",
    tags: ["Forum", "Real-time", "Community"],
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    title: "Tevbe Terapisi",
    domain: "tevbeterapisi.com",
    url: "https://www.tevbeterapisi.com/",
    category: "Healthcare",
    description: "Online terapi platformu. Randevu sistemi, güvenli iletişim ve hasta yönetimi.",
    image: "/images/islerimiz/tevbereferans.webp",
    tags: ["Healthcare", "Booking", "CMS"],
    gradient: "from-purple-600 to-pink-500",
  },
  // İkinci satır - Yan yana
  {
    title: "Hajum",
    domain: "hajum.net",
    category: "Corporate",
    description: "Modern kurumsal web sitesi. SEO optimizasyonu ve profesyonel tasarım.",
    image: "/images/islerimiz/hajumreferans.webp",
    tags: ["Corporate", "SEO", "Modern"],
    gradient: "from-green-600 to-emerald-500",
  },
  {
    title: "Çocuk Mont",
    domain: "cocukmont.com.tr",
    category: "E-Commerce",
    description: "E-ticaret sitesi. Güvenli ödeme, stok yönetimi ve kullanıcı dostu alışveriş.",
    image: "/images/islerimiz/cocukmontreferans.webp",
    tags: ["E-Commerce", "Shopping", "Payment"],
    gradient: "from-yellow-600 to-orange-500",
  },
  {
    title: "Firma Kontrol",
    domain: "firmakontrol.com",
    category: "SaaS Platform",
    description: "Firma sorgulama platformu. API entegrasyonu ve veri analizi.",
    image: "/images/islerimiz/firmakontrol.webp",
    tags: ["SaaS", "API", "Analytics"],
    gradient: "from-orange-600 to-red-500",
  },
  // Geri kalanlar
  {
    title: "RandevuScripti",
    domain: "randevuscripti.com",
    url: "https://www.randevuscripti.com",
    category: "SaaS Script",
    description: "Profesyonel online randevu sistemi. Admin paneli, müşteri yönetimi ve takvim entegrasyonu.",
    image: "/images/islerimiz/randevuscripti.webp",
    tags: ["SaaS", "Booking", "Admin"],
    gradient: "from-blue-600 to-indigo-500",
  },
  {
    title: "eDavetiye",
    domain: "edavetiye.co",
    url: "https://www.edavetiye.co",
    category: "Event Platform",
    description: "Dijital davetiye platformu. RSVP yönetimi, özel şablonlar ve konum entegrasyonu.",
    image: "/images/islerimiz/edavetiye.webp",
    tags: ["Events", "RSVP", "Templates"],
    gradient: "from-rose-600 to-pink-500",
  },
  {
    title: "İlen",
    domain: "ilen.net",
    category: "Platform",
    description: "İlan platformu. Gelişmiş arama, kategori yönetimi ve kullanıcı paneli.",
    image: "/images/islerimiz/ilenreferans.webp",
    tags: ["Platform", "Listing", "Search"],
    gradient: "from-indigo-600 to-purple-500",
  },
  {
    title: "PushAI",
    domain: "pushai.dev",
    url: "https://pushai.dev/",
    category: "AI Technology",
    description: "AI-powered push notification servisi. Advanced analytics ve automation.",
    image: "/images/islerimiz/pushai1.webp",
    tags: ["AI", "SaaS", "API"],
    gradient: "from-pink-600 to-purple-600",
  },
];

export default function Portfolio() {
  return (
    <section id="referanslar" className="relative overflow-hidden bg-black py-32 md:py-40">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-20 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8 inline-flex items-center gap-4 rounded-full border border-[#d4af37]/30 bg-gradient-to-r from-[#d4af37]/10 to-purple-600/10 px-8 py-3 backdrop-blur-xl"
          >
            <div className="h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#d4af37]">
              Portfolio
            </span>
            <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
          </motion.div>

          <h2 className="mb-6 text-6xl font-black tracking-tight text-white md:text-7xl lg:text-8xl">
            <span className="block">Başarılı</span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#d4af37] via-[#f0d882] to-purple-500 bg-clip-text text-transparent">
                Projelerimiz
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 1 }}
                className="absolute -bottom-4 left-0 h-2 w-full origin-left rounded-full bg-gradient-to-r from-[#d4af37] to-transparent"
              />
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-400 md:text-2xl">
            Farklı sektörlerden müşterilerimiz için hayata geçirdiğimiz{" "}
            <span className="font-semibold text-white">modern</span> ve{" "}
            <span className="font-semibold text-white">etkili</span> çözümler.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.url || `https://${project.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black shadow-xl transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:-translate-y-2">
                {/* Gradient top line */}
                <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${project.gradient}`} />

                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                  <Image
                    src={project.image}
                    alt={`${project.title} - Dijital Website Web Tasarım`}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 90 }}
                      className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${project.gradient} shadow-2xl`}
                    >
                      <ExternalLink className="h-7 w-7 text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className={`mb-2 inline-block text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                    {project.category}
                  </span>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    {project.title}
                  </h3>
                  
                  <p className="mb-3 text-sm leading-relaxed text-gray-400">
                    {project.description}
                  </p>

                  {/* Domain */}
                  <div className="mb-4 flex items-center gap-1 text-xs text-gray-500">
                    <ExternalLink className="h-3 w-3" />
                    <span>{project.domain}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Background glow */}
                <div className={`pointer-events-none absolute -inset-20 bg-gradient-to-br ${project.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`} />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/projeler"
            className="group inline-flex items-center gap-3 rounded-full border-2 border-white/20 bg-white/5 px-10 py-5 text-lg font-bold text-white backdrop-blur-sm transition-all hover:scale-105 hover:border-[#d4af37]/50 hover:bg-white/10"
          >
            <span>Tüm Projeleri Görüntüle</span>
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


