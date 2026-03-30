"use client";

import { motion } from "framer-motion";
import { Shield, Lock, UserCheck, FileText, Mail, Calendar, Database, Scale, AlertCircle, CheckCircle2, Target } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const tableOfContents = [
  { id: "veri-sorumlusu", title: "1. Veri Sorumlusu" },
  { id: "islenen-veriler", title: "2. İşlenen Kişisel Veriler" },
  { id: "toplama", title: "3. Kişisel Verilerin Toplanma Yöntemi" },
  { id: "hukuki-sebep", title: "4. Hukuki Sebep" },
  { id: "amac", title: "5. İşleme Amaçları" },
  { id: "aktarim", title: "6. Kişisel Verilerin Aktarılması" },
  { id: "haklariniz", title: "7. Kişisel Veri Sahibinin Hakları" },
  { id: "basvuru", title: "8. Başvuru Yöntemi" },
];

const kvkkSections = [
  {
    id: "veri-sorumlusu",
    icon: Shield,
    title: "1. Veri Sorumlusu",
    gradient: "from-blue-600 to-cyan-500",
    content: [
      {
        subtitle: "Şirket Unvanı",
        text: "Dijital Website Web Tasarım ve SEO Ajansı",
      },
      {
        subtitle: "Adres",
        text: "İstanbul, Türkiye",
      },
      {
        subtitle: "E-posta",
        text: "hello@dijitalwebsite.com",
      },
      {
        subtitle: "Telefon",
        text: "+90 532 166 76 97",
      },
      {
        subtitle: "MERSİS No",
        text: "Ticari sicil bilgileri mevcut (talep üzerine paylaşılır)",
      },
    ],
  },
  {
    id: "islenen-veriler",
    icon: Database,
    title: "2. İşlenen Kişisel Veriler",
    gradient: "from-green-600 to-emerald-500",
    content: [
      {
        subtitle: "Kimlik Bilgisi",
        text: "Ad, soyad, T.C. kimlik numarası (fatura için gerekli hallerde), doğum tarihi",
        category: "Zorunlu",
      },
      {
        subtitle: "İletişim Bilgisi",
        text: "E-posta adresi, telefon numarası (GSM), adres bilgisi, iş adresi",
        category: "Zorunlu",
      },
      {
        subtitle: "Müşteri İşlem Bilgisi",
        text: "Teklif talep bilgileri, proje detayları, hizmet tercihleri, bütçe bilgisi, sözleşme bilgileri",
        category: "Hizmet Sunumu",
      },
      {
        subtitle: "Finans Bilgisi",
        text: "Banka hesap bilgileri (ödeme için), fatura bilgileri, vergi dairesi, vergi numarası",
        category: "Faturalama",
      },
      {
        subtitle: "İşlem Güvenliği Bilgisi",
        text: "IP adresi, çerez kayıtları, log kayıtları, oturum bilgileri, güvenlik soruları",
        category: "Güvenlik",
      },
      {
        subtitle: "Pazarlama Bilgisi",
        text: "Tercihler, ilgi alanları, alışkanlıklar, kampanya etkileşimleri (açık rıza ile)",
        category: "Pazarlama",
      },
    ],
  },
  {
    id: "toplama",
    icon: FileText,
    title: "3. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi",
    gradient: "from-purple-600 to-pink-500",
    content: [
      {
        subtitle: "Otomatik Yollar",
        text: "Web sitesi ziyaretleri, çerezler (cookies), log dosyaları, Google Analytics ve benzeri analitik araçlar",
      },
      {
        subtitle: "Formlar",
        text: "Teklif formu, iletişim formu, newsletter kaydı, online başvurular",
      },
      {
        subtitle: "E-posta ve Telefon",
        text: "Doğrudan iletişim yoluyla paylaşılan bilgiler",
      },
      {
        subtitle: "Sözleşmeler",
        text: "Hizmet sözleşmeleri, iş anlaşmaları, faturalama süreçleri",
      },
    ],
  },
  {
    id: "hukuki-sebep",
    icon: Scale,
    title: "4. Kişisel Verilerin İşlenmesinin Hukuki Sebepleri",
    gradient: "from-orange-600 to-red-500",
    content: [
      {
        subtitle: "KVKK Madde 5/2 Uyarınca",
        text: "Kişisel verileriniz aşağıdaki hukuki sebeplerle işlenir:",
        items: [
          "a) İlgili kişinin açık rızasının varlığı",
          "b) Kanunlarda açıkça öngörülmesi (Vergi Kanunu, Ticaret Kanunu vb.)",
          "c) Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması",
          "d) Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması",
          "e) İlgili kişinin kendisi tarafından alenileştirilmiş olması",
          "f) Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması",
          "ğ) Veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması",
        ],
      },
    ],
  },
  {
    id: "amac",
    icon: Target,
    title: "5. Kişisel Verilerin İşlenme Amaçları",
    gradient: "from-yellow-600 to-orange-500",
    content: [
      {
        subtitle: "Hizmet Sunumu",
        text: "Web tasarım, SEO, dijital pazarlama hizmetlerinin sunulması, proje yönetimi, müşteri ilişkileri yönetimi",
      },
      {
        subtitle: "Sözleşme İşlemleri",
        text: "Teklif hazırlama, sözleşme imzalama, proje teslimatı, ödeme ve faturalama",
      },
      {
        subtitle: "İletişim",
        text: "Bilgi taleplerine cevap verme, müşteri destek hizmeti, proje güncellemeleri",
      },
      {
        subtitle: "Pazarlama",
        text: "E-posta bültenleri, kampanya duyuruları, özel teklifler (açık rıza ile)",
      },
      {
        subtitle: "Analiz ve Raporlama",
        text: "Web sitesi trafiği analizi, kullanıcı davranış analizi, hizmet kalitesi iyileştirme",
      },
      {
        subtitle: "Yasal Yükümlülükler",
        text: "Vergi, muhasebe ve diğer yasal gerekliliklerin yerine getirilmesi",
      },
    ],
  },
  {
    id: "aktarim",
    icon: Database,
    title: "6. Kişisel Verilerin Aktarılması",
    gradient: "from-indigo-600 to-purple-500",
    content: [
      {
        subtitle: "Yurt İçi Aktarım",
        text: "Kişisel verileriniz, hizmet sunumumuz için gerekli olduğu ölçüde aşağıdaki taraflara aktarılabilir:",
        items: [
          "• Hosting sağlayıcıları (Vercel, AWS - Türkiye sunucuları)",
          "• Payment processors (iyzico, PayTR - Türkiye)",
          "• Muhasebe ve mali müşavirlik hizmeti sağlayıcıları",
          "• Hukuk danışmanları ve noter",
          "• Kargo firmaları (gerekli hallerde)",
        ],
      },
      {
        subtitle: "Yurt Dışı Aktarım",
        text: "Bazı hizmet sağlayıcılarımız AB veya ABD'de bulunabilir:",
        items: [
          "• Google (Analytics, Tag Manager) - GDPR uyumlu",
          "• Vercel/AWS (Cloud hosting) - EU/US Privacy Shield",
          "• GitHub (Kod repository) - Standart sözleşme hükümleri",
          "Yurt dışı aktarımlar KVKK madde 9 ve GDPR uyarınca gerçekleştirilir.",
        ],
      },
    ],
  },
  {
    id: "haklariniz",
    icon: UserCheck,
    title: "7. KVKK Madde 11 Uyarınca Haklarınız",
    gradient: "from-pink-600 to-purple-600",
    content: [
      {
        subtitle: "İlgili Kişi Olarak Haklarınız",
        text: "KVKK'nın 11. maddesi gereğince aşağıdaki haklara sahipsiniz:",
        items: [
          "a) Kişisel veri işlenip işlenmediğini öğrenme",
          "b) Kişisel verileri işlenmişse buna ilişkin bilgi talep etme",
          "c) Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme",
          "d) Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme",
          "e) Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme",
          "f) KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme",
          "g) (e) ve (f) bentleri uyarınca yapılan işlemlerin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme",
          "h) İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme",
          "ı) Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme",
        ],
      },
    ],
  },
  {
    id: "basvuru",
    icon: Mail,
    title: "8. Başvuru Hakkınızın Kullanılması",
    gradient: "from-red-600 to-pink-500",
    content: [
      {
        subtitle: "Başvuru Yöntemleri",
        text: "Haklarınızı kullanmak için aşağıdaki yöntemlerle başvurabilirsiniz:",
        items: [
          "• E-posta: hello@dijitalwebsite.com",
          "• Posta: İstanbul, Türkiye (kayıtlı posta ile)",
          "• Islak imzalı dilekçe ile şahsen başvuru",
        ],
      },
      {
        subtitle: "Başvuruda Bulunması Gerekenler",
        text: "Başvurunuzda aşağıdaki bilgiler yer almalıdır:",
        items: [
          "• Ad, soyad ve başvuru yazılı ise imza",
          "• T.C. kimlik numarası (Türkiye Cumhuriyeti vatandaşları için)",
          "• Tebligata esas yerleşim yeri veya iş yeri adresi",
          "• E-posta adresi, telefon veya faks numarası",
          "• Talep konusu",
        ],
      },
      {
        subtitle: "Yanıt Süresi",
        text: "Başvurunuz, niteliğine göre en kısa sürede ve en geç 30 (otuz) gün içinde ücretsiz olarak sonuçlandırılacaktır. İşlemin ayrıca bir maliyet gerektirmesi halinde, Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki ücret alınabilir.",
      },
      {
        subtitle: "Başvuru Değerlendirme",
        text: "Başvurunuzun reddedilmesi halinde, ret gerekçesi yazılı olarak veya elektronik ortamda bildirilir. Ret kararına karşı, bildirimin öğrenilmesinden itibaren 30 gün içinde Kişisel Verileri Koruma Kurulu'na şikâyette bulunabilirsiniz.",
      },
    ],
  },
];

const dataCategories = [
  {
    category: "Kimlik Verisi",
    examples: ["Ad, Soyad", "T.C. Kimlik No", "Doğum Tarihi"],
    purpose: "Kimlik tespiti ve sözleşme ilişkisi",
    icon: UserCheck,
    color: "from-blue-600 to-cyan-500",
  },
  {
    category: "İletişim Verisi",
    examples: ["E-posta", "Telefon", "Adres"],
    purpose: "İletişim kurma ve bilgilendirme",
    icon: Mail,
    color: "from-green-600 to-emerald-500",
  },
  {
    category: "Müşteri İşlem",
    examples: ["Proje Talepleri", "Teklif Bilgileri", "Sözleşmeler"],
    purpose: "Hizmet sunumu ve sözleşme yönetimi",
    icon: FileText,
    color: "from-purple-600 to-pink-500",
  },
  {
    category: "Finans Verisi",
    examples: ["Fatura Bilgileri", "Ödeme Bilgileri", "Banka Hesabı"],
    purpose: "Ödeme ve faturalama işlemleri",
    icon: Lock,
    color: "from-orange-600 to-red-500",
  },
];

const userRights = [
  "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
  "İşlenmişse bilgi talep etme",
  "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme",
  "Yurt içi veya yurt dışında aktarıldığı 3. kişileri bilme",
  "Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme",
  "KVKK şartları çerçevesinde verilerin silinmesini/yok edilmesini isteme",
  "Düzeltme/silme işlemlerinin 3. kişilere bildirilmesini isteme",
  "Otomatik sistemlerle analiz sonucu aleyhte sonuç çıkmasına itiraz etme",
  "Kanuna aykırı işleme nedeniyle zarara uğrama halinde tazminat talep etme",
];

export default function KVKKPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "KVKK Aydınlatma Metni - Dijital Website",
    description: "6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca hazırlanan aydınlatma metni",
    url: "https://dijitalwebsite.com/kvkk",
  };

  return (
    <>
      <Script
        id="kvkk-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-black">
        <Header />

        {/* Hero */}
        <section className="relative overflow-hidden bg-black pt-32 pb-20">
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
              className="text-center"
            >
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-500/30 bg-blue-600/10 px-6 py-2.5 backdrop-blur-xl">
                <Scale className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-bold uppercase tracking-widest text-blue-400">
                  Legal Compliance
                </span>
              </div>

              <h1 className="mb-6 text-5xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
                KVKK Aydınlatma Metni
              </h1>

              <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-400">
                6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca hazırlanmış aydınlatma metni. 
                Kişisel verilerinizin işlenmesine ilişkin detaylı bilgilendirme.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-500">Yayın Tarihi:</span>
                  <span className="font-semibold text-white">26 Ekim 2025</span>
                </div>
                <span className="h-1 w-1 rounded-full bg-gray-600" />
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-500">Son Güncelleme:</span>
                  <span className="font-semibold text-white">26 Ekim 2025</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-400">
                  ✓ KVKK Uyumlu
                </span>
                <span className="rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-xs font-bold text-green-400">
                  ✓ GDPR Compliant
                </span>
                <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-bold text-purple-400">
                  ✓ ISO 27001 Standards
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="relative bg-black py-16">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-12 backdrop-blur-xl"
            >
              <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />

              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10">
                  <FileText className="h-7 w-7 text-blue-400" />
                </div>
                <h2 className="text-3xl font-black text-white">
                  İçindekiler
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {tableOfContents.map((item, i) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-blue-500/50 hover:bg-white/10"
                  >
                    <span className="text-sm font-medium text-gray-300 transition-colors group-hover:text-white">
                      {item.title}
                    </span>
                    <span className="text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">→</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Data Categories Overview */}
        <section className="relative bg-black py-20">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Veri Kategorileri Özeti
              </h2>
              <p className="text-base text-gray-400">
                İşlenen kişisel veri türleri ve amaçları
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {dataCategories.map((item, i) => (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative"
                >
                  <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent p-6 backdrop-blur-xl transition-all hover:border-white/30">
                    <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${item.color}`} />

                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                      <item.icon className="h-6 w-6 text-gray-400" />
                    </div>

                    <h3 className="mb-3 text-lg font-bold text-white">{item.category}</h3>
                    
                    <ul className="mb-4 space-y-1">
                      {item.examples.map((ex) => (
                        <li key={ex} className="text-xs text-gray-500">• {ex}</li>
                      ))}
                    </ul>

                    <p className="text-xs text-gray-600">
                      <span className="font-semibold text-gray-400">Amaç:</span> {item.purpose}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* KVKK Sections */}
        <section className="relative bg-black py-20 pb-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="space-y-12">
              {kvkkSections.map((section, i) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="scroll-mt-24"
                >
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-10 backdrop-blur-xl md:p-12">
                    <div className={`absolute left-0 top-0 h-2 w-full bg-gradient-to-r ${section.gradient}`} />

                    {/* Section Header */}
                    <div className="mb-10 flex items-center gap-4">
                      <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${section.gradient} p-[1px] shadow-xl`}>
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
                        <div key={idx} className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
                          <h3 className="mb-4 text-lg font-bold text-white">
                            {item.subtitle}
                          </h3>
                          {item.text && (
                            <p className="mb-4 text-sm leading-relaxed text-gray-400">
                              {item.text}
                            </p>
                          )}
                          {"items" in item && item.items && (
                            <ul className="space-y-2">
                              {item.items.map((listItem: string, listIdx: number) => (
                                <li key={listIdx} className="flex items-start gap-3 text-sm text-gray-400">
                                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-blue-400" />
                                  <span>{listItem}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Rights Summary Card */}
        <section className="relative bg-black py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/10 blur-[150px]" />
          </div>

          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/10 to-transparent p-12 backdrop-blur-xl md:p-16"
            >
              <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-[#d4af37] to-[#f0d882]" />

              <div className="mb-8 text-center">
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#d4af37]/10">
                  <UserCheck className="h-10 w-10 text-[#d4af37]" />
                </div>
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  İlgili Kişi Haklarınız
                </h2>
                <p className="text-base text-gray-400">
                  KVKK Madde 11 uyarınca sahip olduğunuz haklar
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {userRights.map((right, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/20">
                      <span className="text-xs font-bold text-[#d4af37]">{i + 1}</span>
                    </div>
                    <span className="text-sm leading-relaxed text-gray-300">{right}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="relative bg-black py-32">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-12 text-center backdrop-blur-xl md:p-16"
            >
              <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-blue-500 via-[#d4af37] to-blue-500" />

              <div className="mb-8">
                <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10">
                  <Mail className="h-10 w-10 text-blue-400" />
                </div>
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  KVKK Başvuruları
                </h2>
                <p className="mx-auto max-w-2xl text-base text-gray-400">
                  Kişisel verilerinizle ilgili haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.
                  Başvurularınız 30 gün içinde değerlendirilir ve yanıtlanır.
                </p>
              </div>

              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <a
                  href="mailto:hello@dijitalwebsite.com?subject=KVKK Başvurusu"
                  className="group flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:border-blue-500/50 hover:bg-white/10"
                >
                  <Mail className="h-10 w-10 text-blue-400" />
                  <div className="text-center">
                    <div className="mb-2 text-sm font-bold text-white">E-posta ile Başvuru</div>
                    <div className="text-sm text-gray-400">hello@dijitalwebsite.com</div>
                  </div>
                </a>

                <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-8">
                  <AlertCircle className="h-10 w-10 text-orange-400" />
                  <div className="text-center">
                    <div className="mb-2 text-sm font-bold text-white">Yanıt Süresi</div>
                    <div className="text-sm text-gray-400">En geç 30 (otuz) gün</div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Başvurularınızda kimlik tespiti için T.C. kimlik numarası, imza ve iletişim bilgileri gereklidir.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="relative bg-black py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 text-center">
              <h3 className="text-xl font-bold text-white">İlgili Sayfalar</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Link
                href="/gizlilik-politikasi"
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-white/30 hover:bg-white/10"
              >
                <span className="text-sm font-semibold text-white">Gizlilik Politikası</span>
              </Link>
              <Link
                href="/hakkimizda"
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-white/30 hover:bg-white/10"
              >
                <span className="text-sm font-semibold text-white">Hakkımızda</span>
              </Link>
              <Link
                href="/teklif-al"
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-white/30 hover:bg-white/10"
              >
                <span className="text-sm font-semibold text-white">Teklif Al</span>
              </Link>
              <Link
                href="/"
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-white/30 hover:bg-white/10"
              >
                <span className="text-sm font-semibold text-white">Ana Sayfa</span>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}



