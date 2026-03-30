"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  gradient: string;
  initial: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Ahmet Yılmaz",
    role: "CEO",
    company: "TechCorp",
    content:
      "Dijital Website ile çalışmak harika bir deneyimdi. Web sitemiz modern, hızlı ve SEO uyumlu. Organik trafiğimiz 3 ay içinde %250 arttı. Profesyonel ekip, zamanında teslimat.",
    rating: 5,
    gradient: "from-blue-600 to-cyan-500",
    initial: "A",
  },
  {
    name: "Ayşe Demir",
    role: "Kurucu",
    company: "E-Shop",
    content:
      "E-ticaret sitemiz için aldığımız hizmet mükemmeldi. Kullanıcı dostu tasarım ve güçlü altyapı sayesinde satışlarımız katlandı. Müşteri memnuniyeti çok yüksek.",
    rating: 5,
    gradient: "from-purple-600 to-pink-500",
    initial: "A",
  },
  {
    name: "Mehmet Kaya",
    role: "Pazarlama Müdürü",
    company: "Brand Co",
    content:
      "Kurumsal web sitemiz tam olarak istediğimiz gibi oldu. Profesyonel görünüm, hızlı yükleme ve mobil uyumluluk. Ekip her adımda bizimle oldu.",
    rating: 5,
    gradient: "from-green-600 to-emerald-500",
    initial: "M",
  },
  {
    name: "Zeynep Arslan",
    role: "Ürün Müdürü",
    company: "StartupX",
    content:
      "SaaS uygulamamız için tasarım ve geliştirme hizmeti aldık. Modern UI/UX, kullanıcı testleri ve iteratif geliştirme yaklaşımı harika. Kesinlikle tavsiye ederim.",
    rating: 5,
    gradient: "from-orange-600 to-red-500",
    initial: "Z",
  },
  {
    name: "Can Öztürk",
    role: "Genel Müdür",
    company: "Digital Agency",
    content:
      "Portfolyo sitemiz için aldığımız hizmet beklentilerimizi aştı. Yaratıcı tasarım, smooth animasyonlar ve mükemmel performans. Müşterilerimizden çok olumlu geri dönüşler aldık.",
    rating: 5,
    gradient: "from-yellow-600 to-orange-500",
    initial: "C",
  },
  {
    name: "Elif Şahin",
    role: "CTO",
    company: "Innovation Labs",
    content:
      "Teknik danışmanlık ve cloud migration hizmeti için Dijital Website'i seçtik. Güvenilir, deneyimli ve çözüm odaklı bir ekip. Sistemlerimiz artık daha hızlı ve güvenli.",
    rating: 5,
    gradient: "from-indigo-600 to-purple-500",
    initial: "E",
  },
];

// Group testimonials in sets of 3
const groupedTestimonials: Testimonial[][] = [];
for (let i = 0; i < testimonials.length; i += 3) {
  groupedTestimonials.push(testimonials.slice(i, i + 3));
}

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <section className="relative overflow-hidden bg-black py-32 md:py-40">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[150px]" />
        <div className="absolute left-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#d4af37]/10 blur-[150px]" />
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
              Testimonials
            </span>
            <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
          </motion.div>

          <h2 className="mb-6 text-6xl font-black tracking-tight text-white md:text-7xl lg:text-8xl">
            <span className="block">Müşterilerimiz</span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#d4af37] via-[#f0d882] to-purple-500 bg-clip-text text-transparent">
                Ne Diyor?
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
            Birlikte çalıştığımız{" "}
            <span className="font-semibold text-white">markalardan</span> gelen{" "}
            <span className="font-semibold text-white">gerçek</span> geri bildirimler.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {groupedTestimonials.map((group, groupIndex) => (
              <div key={groupIndex} className="flex-[0_0_100%] min-w-0">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {group.map((testimonial, i) => (
                    <motion.div
                      key={testimonial.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative"
                    >
                      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-8 shadow-xl transition-all duration-500 hover:border-white/30">
                        {/* Gradient top line */}
                        <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${testimonial.gradient}`} />

                        {/* Quote icon & Rating */}
                        <div className="mb-6 flex items-start justify-between">
                          <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${testimonial.gradient} opacity-20`}>
                            <Quote className="h-6 w-6 text-white" />
                          </div>
                          
                          {/* Rating */}
                          <div className="flex gap-1">
                            {[...Array(testimonial.rating)].map((_, idx) => (
                              <Star
                                key={idx}
                                className="h-4 w-4 fill-[#d4af37] text-[#d4af37]"
                              />
                            ))}
                          </div>
                        </div>

                        {/* Content */}
                        <p className="mb-6 text-sm leading-relaxed text-gray-300">
                          "{testimonial.content}"
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-4">
                          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.gradient} text-lg font-bold text-white`}>
                            {testimonial.initial}
                          </div>
                          <div>
                            <div className="font-semibold text-white">
                              {testimonial.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              {testimonial.role}, {testimonial.company}
                            </div>
                          </div>
                        </div>

                        {/* Background glow */}
                        <div className={`pointer-events-none absolute -inset-20 bg-gradient-to-br ${testimonial.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10`} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="mt-12 flex items-center justify-center gap-2">
          {groupedTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? "w-8 bg-gradient-to-r from-[#d4af37] to-[#f0d882]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


