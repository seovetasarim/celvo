import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export default function HakkimizdaPage() {
  return (
    <div className="bg-white">
      <Header />
      <main className="bg-white pt-28 pb-16">
        <section className="mx-auto max-w-5xl px-6">
          <div className="mb-10 border-b border-stone-300 pb-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">Hakkımızda (Hikayemiz)</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
              CELVO: Zarafetin Sessiz Yükselişi
            </h1>
          </div>

          <article className="rounded-2xl border border-stone-300 p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-stone-700 sm:text-base">
              Markanın kökenini ve Gaziantep’ten dünyaya açılan vizyonunu vurgular.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-stone-700 sm:text-base">
              2025 yılında temelleri atılan CELVO, kadın giyiminde "sessiz lüks" anlayışını üretim sanatı ile
              birleştiriyor. Bizim için her dikiş bir hikaye, her kumaş bir karakterdir. Gaziantep’teki üretim
              merkezimizde, modern kadının hem günlük yaşamda hem de en özel anlarında ihtiyaç duyduğu özgüveni,
              yüksek kaliteli materyaller ve kusursuz işçilikle sunuyoruz.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-stone-700 sm:text-base">
              Gösterişten uzak ama fark edilen, abartıdan kaçınan ama kaliteyi hissettiren bir marka olarak;
              üretimin her aşamasında mükemmelliği hedefliyoruz.
            </p>
          </article>

          <article className="mt-6 rounded-2xl border border-stone-300 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
              Kumaştan Tasarıma Kusursuz Süreç
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-700 sm:text-base">
              CELVO olarak sadece bir marka değil, aynı zamanda bir üretim gücüyüz. En üst segment kumaşları,
              ileri teknoloji üretim bandımızla ve usta işçiliğimizle buluşturuyoruz. Kadın giyiminde kalıpların
              gücüne inanıyor, her bedende mükemmel duruşu hedefleyen bir disiplinle çalışıyoruz.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-stone-700 sm:text-base">
              <li>• Yüksek Kalite Standartları</li>
              <li>• Sürdürülebilir Üretim Yaklaşımı</li>
              <li>• Modern ve Özgün Kalıplar</li>
            </ul>
          </article>

          <article className="mt-6 rounded-2xl border border-stone-300 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">Vizyon & Misyon</h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-700 sm:text-base">
              <span className="font-semibold text-stone-900">Vizyonumuz:</span> Türkiye'den çıkan bir "Quiet Luxury"
              (Sessiz Lüks) markası olarak, global moda standartlarını üretim kalitemizle yeniden tanımlamak.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-stone-700 sm:text-base">
              <span className="font-semibold text-stone-900">Misyonumuz:</span> Kadın modasında estetik ve konforu
              birleştirerek, zamansız parçalar üretmek ve tekstil dünyasında kalıcı bir iz bırakmak.
            </p>
          </article>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
