import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import HomeCatalog from "@/components/HomeCatalog";
import { getSiteUrl } from "@/lib/site";
import Script from "next/script";

export default function Home() {
  const base = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: "Celvo - Premium Tekstil Ürünleri",
        description: "Celvo kaliteli ve şık tekstil ürünleriyle yaşam alanlarınıza değer katıyor",
        publisher: {
          "@id": `${base}/#organization`,
        },
        inLanguage: "tr-TR",
      },
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: "Celvo Tekstil",
        url: base,
        logo: {
          "@type": "ImageObject",
          url: `${base}/logo.jpg`,
        },
        description: "Premium tekstil ürünleri ve şık ev tekstili",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Şehitkamil",
          addressRegion: "Gaziantep",
          addressCountry: "TR",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+90-506-700-08-27",
          contactType: "customer service",
          email: "info@celvo.com.tr",
          areaServed: "TR",
          availableLanguage: ["Turkish"],
        },
        founder: {
          "@type": "Person",
          name: "Yusuf Tutar",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${base}/#webpage`,
        url: base,
        name: "Celvo - Premium Tekstil Ürünleri",
        isPartOf: {
          "@id": `${base}/#website`,
        },
        about: {
          "@id": `${base}/#organization`,
        },
        description: "Kaliteli tekstil ürünleri, ev tekstili ve şık tasarımlar",
        inLanguage: "tr-TR",
      },
    ],
  };

  return (
    <>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-white">
        <Header />
        <main className="bg-white">
          <HomeCatalog />
        </main>
        <Footer />
        <FloatingContact />
      </div>
    </>
  );
}
