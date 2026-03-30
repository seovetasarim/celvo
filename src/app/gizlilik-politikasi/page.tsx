"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck, FileText, Mail, Download, Calendar } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const tableOfContents = [
  { id: "genel", title: "1. Genel Bilgiler" },
  { id: "toplanan", title: "2. Toplanan Kişisel Veriler" },
  { id: "kullanim", title: "3. Verilerin Kullanım Amaçları" },
  { id: "cerezler", title: "4. Çerezler ve İzleme Teknolojileri" },
  { id: "guvenlik", title: "5. Veri Güvenliği ve Saklama" },
  { id: "haklar", title: "6. KVKK Kapsamında Haklarınız" },
  { id: "ucuncu", title: "7. Üçüncü Taraf Hizmetler" },
  { id: "degisiklik", title: "8. Politika Değişiklikleri" },
  { id: "iletisim", title: "9. İletişim Bilgileri" },
];

const privacySections = [
  {
    id: "genel",
    icon: FileText,
    title: "1. Genel Bilgiler",
    gradient: "from-blue-600 to-cyan-500",
    content: [
      {
        subtitle: "Veri Sorumlusu",
        text: "Dijital Website (\"Şirket\", \"biz\", \"bizim\") olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") ve ilgili mevzuat uyarınca veri sorumlusu sıfatıyla hareket etmekteyiz.",
      },
      {
        subtitle: "Politikanın Kapsamı",
        text: "Bu gizlilik politikası, dijitalwebsite.com web sitesi, alt domainler ve ilgili dijital platformlarımız üzerinden toplanan kişisel verilerin işlenmesine ilişkin uygulamalarımızı açıklamaktadır.",
      },
      {
        subtitle: "Yasal Dayanak",
        text: "KVKK, GDPR ve Elektronik Ticaretin Düzenlenmesi Hakkında Kanun hükümlerine uygun olarak kişisel verilerinizi işlemekteyiz.",
      },
    ],
  },
  {
    id: "toplanan",
    icon: Database,
    title: "2. Toplanan Kişisel Veriler",
    gradient: "from-green-600 to-emerald-500",
    content: [
      {
        subtitle: "Kimlik Bilgileri",
        text: "Ad, soyad, T.C. kimlik numarası (gerekli hallerde)",
      },
      {
        subtitle: "İletişim Bilgileri",
        text: "E-posta adresi, telefon numarası, posta adresi, şirket bilgileri",
      },
      {
        subtitle: "Dijital Kimlik Bilgileri",
        text: "IP adresi, MAC adresi, tarayıcı bilgileri, cihaz bilgileri, işletim sistemi",
      },
      {
        subtitle: "İşlem Güvenliği Bilgileri",
        text: "Oturum kayıtları, log kayıtları, güvenlik soruları",
      },
      {
        subtitle: "Müşteri İşlem Bilgileri",
        text: "Proje talepleri, teklif bilgileri, sözleşme bilgileri, fatura bilgileri",
      },
      {
        subtitle: "Pazarlama Bilgileri",
        text: "Tercihler, ilgi alanları, web sitesi kullanım davranışları, çerez verileri",
      },
    ],
  },
  {
    id: "kullanim",
    icon: Lock,
    title: "3. Verilerin Kullanım Amaçları",
    gradient: "from-purple-600 to-pink-500",
    content: [
      {
        subtitle: "Hizmet Sunumu",
        text: "Web tasarım, SEO ve dijital pazarlama hizmetlerinin sunulması, proje yönetimi, teknik destek sağlanması",
      },
      {
        subtitle: "İletişim ve Bilgilendirme",
        text: "Teklif hazırlama, müşteri iletişimi, proje güncellemeleri, fatura ve ödeme bildirimleri",
      },
      {
        subtitle: "Pazarlama Faaliyetleri",
        text: "E-posta bültenleri, kampanya duyuruları, özel teklifler (açık rıza ile)",
      },
      {
        subtitle: "Analitik ve İyileştirme",
        text: "Web sitesi performans analizi, kullanıcı deneyimi iyileştirme, hizmet kalitesinin artırılması",
      },
      {
        subtitle: "Yasal Yükümlülükler",
        text: "Vergi mevzuatı, ticaret kanunu ve diğer yasal düzenlemelerden kaynaklanan yükümlülüklerin yerine getirilmesi",
      },
    ],
  },
  {
    id: "cerezler",
    icon: Eye,
    title: "4. Çerezler ve İzleme Teknolojileri",
    gradient: "from-orange-600 to-red-500",
    content: [
      {
        subtitle: "Zorunlu Çerezler",
        text: "Web sitesinin temel fonksiyonları için gerekli çerezler. Bu çerezler olmadan site düzgün çalışmaz.",
      },
      {
        subtitle: "Analitik Çerezler",
        text: "Google Analytics, Google Tag Manager ile kullanıcı davranışlarını ve site performansını analiz ederiz.",
      },
      {
        subtitle: "Pazarlama Çerezleri",
        text: "Remarketing, hedefli reklamlar ve conversion tracking için kullanılır (onay gerektirir).",
      },
      {
        subtitle: "Çerez Yönetimi",
        text: "Tarayıcı ayarlarınızdan çerezleri yönetebilir, silebilir veya engelleyebilirsiniz. Ancak bu, site fonksiyonlarını etkileyebilir.",
      },
    ],
  },
  {
    id: "guvenlik",
    icon: Shield,
    title: "5. Veri Güvenliği ve Saklama",
    gradient: "from-yellow-600 to-orange-500",
    content: [
      {
        subtitle: "Teknik Güvenlik Önlemleri",
        text: "SSL/TLS şifreleme, güvenli sunucu altyapısı (AWS/Vercel), firewall koruması, DDoS koruması, düzenli güvenlik güncellemeleri",
      },
      {
        subtitle: "İdari Önlemler",
        text: "Sınırlı erişim politikaları, yetkili personel eğitimi, veri işleme sözleşmeleri, gizlilik taahhütleri",
      },
      {
        subtitle: "Saklama Süreleri",
        text: "Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca saklanır. Yasal saklama yükümlülükleri göz önünde bulundurulur. Aktif müşteriler için süresiz, pasif müşteriler için 10 yıl.",
      },
      {
        subtitle: "Veri İmhası",
        text: "Saklama süresi dolan veriler güvenli bir şekilde silinir veya anonim hale getirilir.",
      },
    ],
  },
  {
    id: "haklar",
    icon: UserCheck,
    title: "6. KVKK Kapsamında Haklarınız",
    gradient: "from-indigo-600 to-purple-500",
    content: [
      {
        subtitle: "Bilgi Talep Etme Hakkı",
        text: "Kişisel verilerinizin işlenip işlenmediğini öğrenme ve işlenmişse buna ilişkin bilgi talep etme hakkınız vardır.",
      },
      {
        subtitle: "Düzeltme ve Silme Hakkı",
        text: "Eksik veya yanlış işlenmiş kişisel verilerinizin düzeltilmesini ve silinmesini talep edebilirsiniz.",
      },
      {
        subtitle: "İtiraz Hakkı",
        text: "Kişisel verilerinizin otomatik sistemler ile işlenmesi suretiyle aleyhinize bir sonuç doğması halinde itiraz edebilirsiniz.",
      },
      {
        subtitle: "Aktarım Bilgisi",
        text: "Kişisel verilerinizin yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri öğrenme hakkınız bulunmaktadır.",
      },
      {
        subtitle: "Başvuru Yöntemi",
        text: "Haklarınızı kullanmak için hello@dijitalwebsite.com adresine yazılı olarak başvurabilirsiniz. Başvurunuz en geç 30 gün içinde yanıtlanır.",
      },
    ],
  },
  {
    id: "ucuncu",
    icon: Database,
    title: "7. Üçüncü Taraf Hizmetler ve Veri Aktarımı",
    gradient: "from-pink-600 to-purple-600",
    content: [
      {
        subtitle: "Google Analytics",
        text: "Web sitesi trafiği ve kullanıcı davranışlarını analiz etmek için kullanılır. Anonim veriler toplar.",
      },
      {
        subtitle: "Hosting Sağlayıcıları",
        text: "Vercel, AWS gibi güvenilir hosting sağlayıcıları kullanılır. Verileriniz güvenli data center'larda saklanır.",
      },
      {
        subtitle: "Payment Processors",
        text: "Ödeme işlemlerinde iyzico, Stripe gibi PCI-DSS uyumlu payment gateway'ler kullanılır.",
      },
      {
        subtitle: "Yurt Dışı Aktarım",
        text: "Bazı hizmet sağlayıcılar AB veya ABD'de olabilir. Verileriniz GDPR standartlarına uygun şekilde aktarılır.",
      },
    ],
  },
  {
    id: "degisiklik",
    icon: FileText,
    title: "8. Politika Değişiklikleri",
    gradient: "from-red-600 to-pink-500",
    content: [
      {
        subtitle: "Güncelleme Hakkı",
        text: "Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada yayınlanır.",
      },
      {
        subtitle: "Bildirim",
        text: "Önemli değişiklikler durumunda, kayıtlı e-posta adresinize bildirim gönderilebilir.",
      },
      {
        subtitle: "Son Güncelleme",
        text: "Bu politika en son 26 Ekim 2025 tarihinde güncellenmiştir.",
      },
    ],
  },
  {
    id: "iletisim",
    icon: Mail,
    title: "9. İletişim Bilgileri",
    gradient: "from-cyan-600 to-blue-500",
    content: [
      {
        subtitle: "Veri Sorumlusu",
        text: "Dijital Website - Web Tasarım ve SEO Ajansı",
      },
      {
        subtitle: "Adres",
        text: "İstanbul, Türkiye",
      },
      {
        subtitle: "E-posta",
        text: "hello@dijitalwebsite.com (KVKK başvuruları için)",
      },
      {
        subtitle: "Telefon",
        text: "+90 532 166 76 97",
      },
    ],
  },
];

export default function GizlilikPolitikasiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Gizlilik Politikası - Dijital Website",
    description: "Dijital Website web tasarım ajansı gizlilik politikası ve KVKK uyum bilgileri",
    url: "https://dijitalwebsite.com/gizlilik-politikasi",
  };

  return (
    <>
      <Script
        id="privacy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-black">
        <Header />

        {/* Hero */}
        <section className="relative overflow-hidden bg-black pt-32 pb-16">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600/15 to-cyan-500/15 blur-[150px]"
            />
          </div>

          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 text-center"
            >
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-500/30 bg-blue-600/10 px-6 py-2.5 backdrop-blur-xl">
                <Shield className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-bold uppercase tracking-widest text-blue-400">
                  Legal Document
                </span>
              </div>

              <h1 className="mb-6 text-5xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
                Gizlilik Politikası
              </h1>

              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
                Kişisel Verilerin Korunması Kanunu (KVKK) ve GDPR uyumlu gizlilik ve veri koruma politikası.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Son Güncelleme:</span>
                  <span className="font-semibold text-white">26 Ekim 2025</span>
                </div>
                <span className="h-1 w-1 rounded-full bg-gray-600" />
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
                    ✓ KVKK Uyumlu
                  </span>
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400">
                    ✓ GDPR Compliant
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="relative bg-black py-12">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-10 backdrop-blur-xl"
            >
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-500" />

              <h2 className="mb-6 text-2xl font-bold text-white">
                İçindekiler
              </h2>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {tableOfContents.map((item, i) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-blue-500/50 hover:bg-white/10"
                  >
                    <span className="text-sm text-gray-400 transition-colors group-hover:text-white">
                      {item.title}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Privacy Sections */}
        <section className="relative bg-black py-20 pb-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="space-y-12">
              {privacySections.map((section, i) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="scroll-mt-24"
                >
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-10 backdrop-blur-xl md:p-12">
                    <div className={`absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r ${section.gradient}`} />

                    {/* Section Header */}
                    <div className="mb-8 flex items-center gap-4">
                      <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${section.gradient} p-[1px]`}>
                        <div className="flex h-full w-full items-center justify-center rounded-[15px] bg-black">
                          <section.icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-black text-white">
                        {section.title}
                      </h2>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      {section.content.map((item, idx) => (
                        <div key={idx} className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
                          <h3 className="mb-3 text-lg font-bold text-white">
                            {item.subtitle}
                          </h3>
                          <p className="text-sm leading-relaxed text-gray-400">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative bg-black py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/10 blur-[150px]" />
          </div>

          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-12 backdrop-blur-xl md:p-16"
            >
              <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-blue-500 via-[#d4af37] to-blue-500" />

              <div className="mb-8 text-center">
                <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10">
                  <Mail className="h-10 w-10 text-blue-400" />
                </div>
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  KVKK Başvuruları
                </h2>
                <p className="text-base text-gray-400">
                  Kişisel verilerinizle ilgili talepleriniz için aşağıdaki kanallardan bize ulaşabilirsiniz.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <a
                  href="mailto:hello@dijitalwebsite.com"
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-blue-500/50 hover:bg-white/10"
                >
                  <Mail className="h-8 w-8 text-blue-400" />
                  <div className="text-center">
                    <div className="mb-1 text-sm font-semibold text-white">E-posta</div>
                    <div className="text-sm text-gray-400">hello@dijitalwebsite.com</div>
                  </div>
                </a>

                <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <FileText className="h-8 w-8 text-gray-400" />
                  <div className="text-center">
                    <div className="mb-1 text-sm font-semibold text-white">Yanıt Süresi</div>
                    <div className="text-sm text-gray-400">En geç 30 gün</div>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-center text-xs text-gray-500">
                Başvurularınız KVKK madde 13 uyarınca değerlendirilir ve yasal süre içinde yanıtlanır.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="relative bg-black py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 text-center">
              <h3 className="text-xl font-bold text-white">Daha Fazla Bilgi</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Link
                href="/"
                className="group rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-white/30 hover:bg-white/10"
              >
                <span className="text-sm font-semibold text-white">Ana Sayfa</span>
              </Link>
              <Link
                href="/hakkimizda"
                className="group rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-white/30 hover:bg-white/10"
              >
                <span className="text-sm font-semibold text-white">Hakkımızda</span>
              </Link>
              <Link
                href="/teklif-al"
                className="group rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-white/30 hover:bg-white/10"
              >
                <span className="text-sm font-semibold text-white">Teklif Al</span>
              </Link>
              <Link
                href="/#hizmetler"
                className="group rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-white/30 hover:bg-white/10"
              >
                <span className="text-sm font-semibold text-white">Hizmetlerimiz</span>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}


