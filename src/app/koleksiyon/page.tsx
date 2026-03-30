import Header from "@/components/Header";
import HomeCatalog from "@/components/HomeCatalog";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export const metadata = {
  title: "Koleksiyon - Premium Tekstil Ürünleri",
  description: "Celvo premium tekstil koleksiyonu. Özenle seçilmiş kaliteli ve şık ürünler.",
};

export default function KoleksiyonPage() {
  return (
    <div className="bg-white">
      <Header />
      <main className="bg-white">
        <HomeCatalog />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}












