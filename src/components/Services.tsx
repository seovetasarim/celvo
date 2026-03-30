"use client";

import { Code2, Palette, Rocket, Search, Zap, Globe, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    subtitle: "Modern Web Solutions",
    desc: "Enterprise-grade web applications built with cutting-edge technologies. Scalable, secure, and lightning-fast.",
    features: ["Next.js 15 & React 19", "Headless CMS", "API Development", "Microservices"],
    gradient: "from-[#d4af37] via-[#f0d882] to-[#d4af37]",
    number: "01",
    stats: { value: "500+", label: "Projects Delivered" },
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    subtitle: "Experience-Driven Design",
    desc: "Award-winning interfaces that combine aesthetics with functionality. User-centered design at its finest.",
    features: ["Design Systems", "Prototyping", "User Research", "Accessibility"],
    gradient: "from-[#d4af37] via-[#f0d882] to-[#d4af37]",
    number: "02",
    stats: { value: "98%", label: "User Satisfaction" },
  },
  {
    icon: Rocket,
    title: "E-Commerce",
    subtitle: "Conversion-Optimized Stores",
    desc: "High-performance online stores that drive sales. Integrated payment, inventory, and analytics.",
    features: ["Shopify & Custom", "Payment Gateways", "Multi-currency", "Marketing Tools"],
    gradient: "from-[#d4af37] via-[#f0d882] to-[#d4af37]",
    number: "03",
    stats: { value: "2.5M+", label: "Monthly Transactions" },
  },
  {
    icon: Search,
    title: "SEO & Growth",
    subtitle: "Data-Driven Marketing",
    desc: "Dominate search rankings with our comprehensive SEO strategies. Technical excellence meets content mastery.",
    features: ["Technical SEO", "Content Strategy", "Link Building", "Analytics"],
    gradient: "from-[#d4af37] via-[#f0d882] to-[#d4af37]",
    number: "04",
    stats: { value: "#1", label: "Avg. Ranking Position" },
  },
  {
    icon: Zap,
    title: "Performance",
    subtitle: "Speed & Optimization",
    desc: "Blazing-fast websites that convert. Core Web Vitals optimization, CDN setup, and advanced caching.",
    features: ["Core Web Vitals", "Edge Computing", "Image Optimization", "Lazy Loading"],
    gradient: "from-[#d4af37] via-[#f0d882] to-[#d4af37]",
    number: "05",
    stats: { value: "0.8s", label: "Avg. Load Time" },
  },
  {
    icon: Globe,
    title: "Enterprise Solutions",
    subtitle: "Scalable Architecture",
    desc: "Mission-critical systems for large organizations. Cloud-native, secure, and built to scale globally.",
    features: ["Cloud Migration", "Kubernetes", "Security Audits", "24/7 Support"],
    gradient: "from-[#d4af37] via-[#f0d882] to-[#d4af37]",
    number: "06",
    stats: { value: "99.9%", label: "Uptime SLA" },
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* New card design - with angled corner */}
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-8 shadow-xl">
        {/* Gradient accent line */}
        <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${service.gradient}`} />
        
        {/* Background glow */}
        <div className="absolute inset-0 -z-10">
          <div className={`absolute -inset-20 bg-gradient-to-br ${service.gradient} opacity-5 blur-3xl`} />
        </div>

        {/* Icon */}
        <div className="relative mb-6">
          <div className="relative inline-block">
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-50 blur-xl`}
            />
            <div
              className={`relative flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} p-[1px] shadow-lg`}
            >
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-black">
                <service.icon className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <div className="mb-2">
            <span className={`text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
              {service.subtitle}
            </span>
          </div>

          <h3 className="mb-4 text-2xl font-bold text-white">
            {service.title}
          </h3>

          <p className="mb-6 text-sm leading-relaxed text-gray-400">
            {service.desc}
          </p>

          {/* Stats badge */}
          <div className="mb-6 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${service.gradient} animate-pulse`} />
            <div>
              <div className="text-base font-bold text-white">{service.stats.value}</div>
              <div className="text-[10px] text-gray-500">{service.stats.label}</div>
            </div>
          </div>

          {/* Features grid */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            {service.features.map((feat, idx) => (
              <motion.div
                key={feat}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
                className="flex items-start gap-2 text-xs"
              >
                <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5">
                  <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                </div>
                <span className="leading-tight text-gray-300">{feat}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group/btn relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10"
          >
            <span className="relative z-10 flex items-center justify-between">
              <span>Explore Service</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </span>
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 transition-opacity group-hover/btn:opacity-20`}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="hizmetler" className="relative overflow-hidden bg-black py-32 md:py-48">
      {/* Complex background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        <div className="absolute right-0 top-0 h-[800px] w-[800px] rounded-full bg-purple-600/10 blur-[200px]" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-[#d4af37]/10 blur-[200px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[150px]" />
      </div>

      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "100px 100px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8 inline-flex items-center gap-4 rounded-full border border-[#d4af37]/30 bg-gradient-to-r from-[#d4af37]/10 via-purple-600/10 to-[#d4af37]/10 px-8 py-3 backdrop-blur-xl"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-[#d4af37]"
            />
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#d4af37]">
              Our Services
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="h-2 w-2 rounded-full bg-purple-500"
            />
          </motion.div>

          <h2 className="mb-8 text-6xl font-black tracking-tight text-white md:text-7xl lg:text-8xl">
            <span className="block">Premium Digital</span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#d4af37] via-[#f0d882] to-purple-500 bg-clip-text text-transparent">
                Solutions
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute -bottom-4 left-0 h-2 w-full origin-left rounded-full bg-gradient-to-r from-[#d4af37] via-purple-500 to-transparent"
              />
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-400 md:text-2xl">
            Transform your digital presence with our{" "}
            <span className="font-semibold text-white">award-winning</span>{" "}
            services. From concept to deployment, we deliver{" "}
            <span className="font-semibold text-white">excellence</span>.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.number} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="mb-8 text-lg text-gray-400">
            Need something custom? Let's build it together.
          </p>
          <Link
            href="/teklif-al"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0d882] px-10 py-5 text-lg font-bold text-black shadow-2xl shadow-[#d4af37]/50 transition-all hover:scale-105 hover:shadow-[#d4af37]/70"
          >
            <span>Let's Talk About Your Project</span>
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


