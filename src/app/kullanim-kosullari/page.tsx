"use client";

import { motion } from "framer-motion";
import { FileText, Scale, Shield, AlertTriangle, Ban, Copyright, Mail, Calendar, CheckCircle2, XCircle, Lock } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const tableOfContents = [
  { id: "genel", title: "1. Genel Hükümler" },
  { id: "tanimlar", title: "2. Tanımlar" },
  { id: "hizmetler", title: "3. Hizmetler ve Kullanım" },
  { id: "fikri-mulkiyet", title: "4. Fikri Mülkiyet Hakları" },
  { id: "kullanici", title: "5. Kullanıcı Yükümlülükleri" },
  { id: "yasak", title: "6. Yasak Davranışlar" },
  { id: "sorumluluk", title: "7. Sorumluluk Sınırlamaları" },
  { id: "gizlilik", title: "8. Gizlilik ve Veri Koruma" },
  { id: "degisiklik", title: "9. Değişiklikler" },
  { id: "uyusmazlik", title: "10. Uyuşmazlık Çözümü" },
];

const termsSections = [
  {
    id: "genel",
    icon: FileText,
    title: "1. Genel Hükümler",
    gradient: "from-blue-600 to-cyan-500",
    content: [
      {
        subtitle: "Kabullenme",
        text: "Bu web sitesini (dijitalwebsite.com) kullanarak, aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. Koşulları kabul etmiyorsanız, lütfen siteyi kullanmayınız.",
      },
      {
        subtitle: "Kapsam",
        text: "Bu koşullar, dijitalwebsite.com ana domain'i, tüm alt domainler ve ilgili tüm dijital platformlarımız için geçerlidir.",
      },
      {
        subtitle: "Güncellemeler",
        text: "Dijital Website, bu koşulları önceden haber vermeksizin değiştirme hakkını saklı tutar. Değişiklikler bu sayfada yayınlandığı anda yürürlüğe girer.",
      },
    ],
  },
  {
    id: "tanimlar",
    icon: Scale,
    title: "2. Tanımlar",
    gradient: "from-green-600 to-emerald-500",
    content: [
      {
        subtitle: "Şirket / Biz",
        text: "Dijital Website Web Tasarım ve SEO Ajansı",
      },
      {
        subtitle: "Web Sitesi / Platform",
        text: "dijitalwebsite.com domaini ve alt domainler",
      },
      {
        subtitle: "Kullanıcı / Siz",
        text: "Web sitemizi ziyaret eden, hizmetlerimizi kullanan her gerçek ve tüzel kişi",
      },
      {
        subtitle: "Hizmetler",
        text: "Web tasarım, SEO, dijital pazarlama ve ilgili tüm hizmetlerimiz",
      },
      {
        subtitle: "İçerik",
        text: "Web sitesinde yer alan tüm metin, görsel, kod, tasarım ve diğer materyaller",
      },
    ],
  },
  {
    id: "hizmetler",
    icon: CheckCircle2,
    title: "3. Hizmetler ve Kullanım",
    gradient: "from-purple-600 to-pink-500",
    content: [
      {
        subtitle: "Hizmet Kapsamı",
        text: "Dijital Website aşağıdaki hizmetleri sunar:",
        items: [
          "• Web sitesi tasarımı ve geliştirme",
          "• E-ticaret platformu kurulumu",
          "• UI/UX tasarım hizmetleri",
          "• SEO (Arama Motoru Optimizasyonu)",
          "• Dijital pazarlama ve danışmanlık",
          "• Teknik destek ve bakım hizmetleri",
        ],
      },
      {
        subtitle: "Hizmet Koşulları",
        text: "Hizmetlerimiz, müşteri ile imzalanan ayrı hizmet sözleşmesi veya teklif dokümanında belirtilen koşullar çerçevesinde sunulur. Web sitesi üzerinden yapılan teklif talepleri bağlayıcı sözleşme değildir.",
      },
      {
        subtitle: "Teslimat ve Süre",
        text: "Proje teslimat süreleri, sözleşmede veya teklifte belirtilir. Dijital Website, makul çaba göstermekle birlikte, force majeure durumlarında gecikme sorumluluğu kabul etmez.",
      },
    ],
  },
  {
    id: "fikri-mulkiyet",
    icon: Copyright,
    title: "4. Fikri Mülkiyet Hakları",
    gradient: "from-orange-600 to-red-500",
    content: [
      {
        subtitle: "Telif Hakları",
        text: "Web sitesindeki tüm içerik (metin, görsel, logo, kod, tasarım vb.) Dijital Website'a aittir ve telif hakları ile korunmaktadır.",
        items: [
          "• Yazılı izin olmadan kopyalanamaz, çoğaltılamaz",
          "• Ticari amaçla kullanılamaz",
          "• Değiştirilemez veya türev eser oluşturulamaz",
          "• Başka platformlarda yayınlanamaz",
        ],
      },
      {
        subtitle: "Müşteri Projeleri",
        text: "Müşteriler için geliştirilen projeler, sözleşmede aksi belirtilmedikçe müşteriye devredilir. Ancak Dijital Website, portfolyo ve referans olarak kullanma hakkını saklı tutar.",
      },
      {
        subtitle: "Açık Kaynak",
        text: "Projelerimizde kullanılan açık kaynak kütüphaneler, kendi lisanslarına tabidir.",
      },
    ],
  },
  {
    id: "kullanici",
    icon: Shield,
    title: "5. Kullanıcı Yükümlülükleri",
    gradient: "from-yellow-600 to-orange-500",
    content: [
      {
        subtitle: "Doğru Bilgi",
        text: "Kullanıcılar, form ve başvurularda doğru, güncel ve eksiksiz bilgi vermekle yükümlüdür.",
      },
      {
        subtitle: "Yasal Uyum",
        text: "Web sitemizi Türkiye Cumhuriyeti kanunlarına ve evrensel hukuk normlarına uygun şekilde kullanmalısınız.",
      },
      {
        subtitle: "Güvenlik",
        text: "Hesap bilgilerinizi (varsa) gizli tutmak, yetkisiz erişimi engellemek sizin sorumluluğunuzdadır.",
      },
      {
        subtitle: "Fikri Mülkiyet Saygısı",
        text: "Web sitemizdeki içeriklerin telif haklarına saygı göstermeli, izinsiz kullanımdan kaçınmalısınız.",
      },
    ],
  },
  {
    id: "yasak",
    icon: Ban,
    title: "6. Yasak Davranışlar",
    gradient: "from-red-600 to-pink-600",
    content: [
      {
        subtitle: "Aşağıdaki Davranışlar Kesinlikle Yasaktır",
        text: "",
        items: [
          "• Web sitesine zararlı yazılım, virus, malware yükleme",
          "• Otomatik botlar, scrapers kullanarak veri toplama",
          "• Sistemlere yetkisiz erişim veya hacking girişimi",
          "• Başkalarının haklarını ihlal edici içerik paylaşma",
          "• Spam, phishing veya dolandırıcılık faaliyetleri",
          "• Hizmetleri kötüye kullanma veya sistemleri aşırı yükleme",
          "• Telif haklı içerikleri izinsiz kullanma",
          "• Yanıltıcı veya sahte bilgi verme",
        ],
      },
      {
        subtitle: "İhlal Durumunda",
        text: "Yasak davranışların tespiti halinde, hesabınız askıya alınabilir, yasal işlem başlatılabilir ve zarar tazmin edilebilir.",
      },
    ],
  },
  {
    id: "sorumluluk",
    icon: AlertTriangle,
    title: "7. Sorumluluk Sınırlamaları",
    gradient: "from-indigo-600 to-purple-600",
    content: [
      {
        subtitle: "Hizmet Garantisi",
        text: "Dijital Website, hizmetlerini \"olduğu gibi\" sunar. Web sitesinin kesintisiz ve hatasız çalışacağına dair garanti vermez.",
      },
      {
        subtitle: "Üçüncü Taraf Linkleri",
        text: "Web sitemizde yer alan harici linklerin içeriğinden sorumlu değiliz. Bu sitelerin kullanımı kendi sorumluluğunuzdadır.",
      },
      {
        subtitle: "Zarar Sorumluluğu",
        text: "Dijital Website, web sitesinin kullanımından kaynaklanan dolaylı, arızi veya sonuç olarak doğan zararlardan sorumlu tutulamaz. Sorumluluk, sözleşme bedeli ile sınırlıdır.",
      },
      {
        subtitle: "Force Majeure",
        text: "Doğal afetler, savaş, terör, internet kesintisi gibi kontrol dışı olaylardan kaynaklanan gecikmeler ve aksamalardan sorumlu değiliz.",
      },
    ],
  },
  {
    id: "gizlilik",
    icon: Lock,
    title: "8. Gizlilik ve Veri Koruma",
    gradient: "from-cyan-600 to-blue-500",
    content: [
      {
        subtitle: "Gizlilik Politikası",
        text: "Kişisel verilerinizin işlenmesi, ayrı bir doküman olan Gizlilik Politikası ve KVKK Aydınlatma Metni'nde detaylı olarak açıklanmıştır.",
      },
      {
        subtitle: "Çerezler",
        text: "Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanır. Detaylar için Gizlilik Politikası'na bakınız.",
      },
      {
        subtitle: "Veri Güvenliği",
        text: "Verilerinizin güvenliği için SSL şifreleme, güvenli sunucular ve düzenli güvenlik güncellemeleri uygularız.",
      },
    ],
  },
  {
    id: "degisiklik",
    icon: FileText,
    title: "9. Koşullarda Değişiklik",
    gradient: "from-purple-600 to-pink-500",
    content: [
      {
        subtitle: "Güncelleme Hakkı",
        text: "Dijital Website, bu kullanım koşullarını istediği zaman, önceden haber vermeksizin değiştirme hakkını saklı tutar.",
      },
      {
        subtitle: "Yürürlük",
        text: "Değişiklikler bu sayfada yayınlandığı anda yürürlüğe girer. Önemli değişikliklerde e-posta bildirimi gönderilebilir.",
      },
      {
        subtitle: "Takip Sorumluluğu",
        text: "Kullanıcılar, koşulları düzenli olarak kontrol etmekle yükümlüdür. Değişikliklerden sonra siteyi kullanmaya devam etmek, yeni koşulları kabul ettiğiniz anlamına gelir.",
      },
    ],
  },
  {
    id: "uyusmazlik",
    icon: Scale,
    title: "10. Uyuşmazlık Çözümü ve Yetkili Mahkeme",
    gradient: "from-orange-600 to-red-500",
    content: [
      {
        subtitle: "Uygulanacak Hukuk",
        text: "Bu koşullar Türkiye Cumhuriyeti kanunlarına tabidir ve bu kanunlara göre yorumlanır.",
      },
      {
        subtitle: "Yetkili Mahkeme",
        text: "Bu koşullardan doğan veya bu koşullarla ilgili her türlü uyuşmazlıkta İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri yetkilidir.",
      },
      {
        subtitle: "Tahkim",
        text: "Taraflar, uyuşmazlıkları öncelikle dostane görüşmelerle çözmeyi taahhüt eder. Çözülemezse yukarıdaki mahkemeler yetkilidir.",
      },
    ],
  },
];

const importantNotes = [
  {
    icon: CheckCircle2,
    title: "Yapabilecekleriniz",
    items: [
      "Web sitemizi kişisel ve ticari amaçla ziyaret edebilirsiniz",
      "Hizmetlerimiz hakkında bilgi alabilir, teklif talep edebilirsiniz",
      "Portfolyo ve blog içeriklerini görüntüleyebilirsiniz",
      "İletişim formlarını kullanarak bize ulaşabilirsiniz",
    ],
    color: "from-green-600 to-emerald-500",
  },
  {
    icon: XCircle,
    title: "Yapamayacaklarınız",
    items: [
      "İçerikleri izinsiz kopyalayamaz, çoğaltamazsınız",
      "Sisteme zarar verecek aktivitelerde bulunamazsınız",
      "Otomatik araçlarla veri toplayamazsınız",
      "Başkalarının adına sahte başvuru yapamazsınız",
    ],
    color: "from-red-600 to-pink-600",
  },
];

export default function KullanimKosullariPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Kullanım Koşulları - Dijital Website",
    description: "Dijital Website web sitesi kullanım koşulları ve yasal bilgilendirme",
    url: "https://dijitalwebsite.com/kullanim-kosullari",
  };

  return (
    <>
      <Script
        id="terms-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-black">
        <Header />

        {/* Hero */}
        <section className="relative overflow-hidden bg-black pt-32 pb-16">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600/15 to-pink-500/15 blur-[150px]"
            />
          </div>

          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-purple-500/30 bg-purple-600/10 px-6 py-2.5 backdrop-blur-xl">
                <Scale className="h-5 w-5 text-purple-400" />
                <span className="text-sm font-bold uppercase tracking-widest text-purple-400">
                  Terms of Service
                </span>
              </div>

              <h1 className="mb-6 text-5xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
                Kullanım Koşulları
              </h1>

              <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-400">
                Dijital Website web sitesi ve hizmetlerinin kullanımına ilişkin şartlar ve koşullar.
                Yasal haklar ve yükümlülükleriniz hakkında detaylı bilgi.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Yürürlük Tarihi:</span>
                  <span className="font-semibold text-white">26 Ekim 2025</span>
                </div>
                <span className="h-1 w-1 rounded-full bg-gray-600" />
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Son Güncelleme:</span>
                  <span className="font-semibold text-white">26 Ekim 2025</span>
                </div>
              </div>

              <div className="mt-8">
                <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-bold text-purple-400">
                  ⚖️ Yasal Bağlayıcı Doküman
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="relative bg-black py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {importantNotes.map((note, i) => {
                const NoteIcon = note.icon;
                return (
                  <motion.div
                    key={note.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="relative"
                  >
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent p-10 backdrop-blur-xl">
                      <div className={`absolute left-0 top-0 h-2 w-full bg-gradient-to-r ${note.color}`} />

                      <div className="mb-6 flex items-center gap-4">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${note.color} p-[1px]`}>
                          <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-black">
                            <NoteIcon className="h-7 w-7 text-white" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-black text-white">{note.title}</h3>
                      </div>

                      <ul className="space-y-3">
                        {note.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                            <div className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r ${note.color}`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
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
              <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-purple-500 to-pink-500" />

              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/10">
                  <FileText className="h-7 w-7 text-purple-400" />
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
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-purple-500/50 hover:bg-white/10"
                  >
                    <span className="text-sm font-medium text-gray-300 transition-colors group-hover:text-white">
                      {item.title}
                    </span>
                    <span className="text-purple-400 opacity-0 transition-opacity group-hover:opacity-100">→</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="relative bg-black py-20 pb-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="space-y-12">
              {termsSections.map((section, i) => (
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
                    <div className="mb-10">
                      <h2 className="text-3xl font-black text-white">
                        {section.title}
                      </h2>
                    </div>

                      {/* Content */}
                      <div className="space-y-6">
                      {section.content.map((item, idx) => (
                        <div key={idx} className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
                          {item.subtitle && (
                            <h3 className="mb-4 text-lg font-bold text-white">
                              {item.subtitle}
                            </h3>
                          )}
                          {item.text && (
                            <p className="mb-3 text-sm leading-relaxed text-gray-400">
                              {item.text}
                            </p>
                          )}
                          {"items" in item && item.items && (
                            <ul className="space-y-2">
                              {item.items.map((listItem: string, listIdx: number) => (
                                <li key={listIdx} className="flex items-start gap-3 text-sm text-gray-400">
                                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-purple-400" />
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

        {/* Contact */}
        <section className="relative bg-black py-32">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-12 text-center backdrop-blur-xl md:p-16"
            >
              <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-purple-500 via-[#d4af37] to-purple-500" />

              <div className="mb-8">
                <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/10">
                  <Mail className="h-10 w-10 text-purple-400" />
                </div>
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  Sorularınız mı Var?
                </h2>
                <p className="mx-auto max-w-2xl text-base text-gray-400">
                  Kullanım koşulları hakkında sorularınız veya önerileriniz için bizimle iletişime geçin.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="mailto:hello@dijitalwebsite.com?subject=Kullanım Koşulları Hakkında"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-purple-500/50 transition-all hover:scale-105"
                >
                  <Mail className="h-5 w-5" />
                  hello@dijitalwebsite.com
                </a>

                <a
                  href="tel:+905321667697"
                  className="rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
                >
                  📞 +90 532 166 76 97
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="relative bg-black py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 text-center">
              <h3 className="text-xl font-bold text-white">İlgili Dökümanlar</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Link
                href="/gizlilik-politikasi"
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-white/30 hover:bg-white/10"
              >
                <span className="text-sm font-semibold text-white">Gizlilik Politikası</span>
              </Link>
              <Link
                href="/kvkk"
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-white/30 hover:bg-white/10"
              >
                <span className="text-sm font-semibold text-white">KVKK</span>
              </Link>
              <Link
                href="/hakkimizda"
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-white/30 hover:bg-white/10"
              >
                <span className="text-sm font-semibold text-white">Hakkımızda</span>
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



