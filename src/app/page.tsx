import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import HomeCatalog from "@/components/HomeCatalog";
import Script from "next/script";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "http://celvo.com.tr/#website",
        url: "http://celvo.com.tr",
        name: "Celvo - Premium Tekstil Ürünleri",
        description: "Celvo kaliteli ve şık tekstil ürünleriyle yaşam alanlarınıza değer katıyor",
        publisher: {
          "@id": "http://celvo.com.tr/#organization",
        },
        inLanguage: "tr-TR",
      },
      {
        "@type": "Organization",
        "@id": "http://celvo.com.tr/#organization",
        name: "Celvo Tekstil",
        url: "http://celvo.com.tr",
        logo: {
          "@type": "ImageObject",
          url: "http://celvo.com.tr/logo.jpg",
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
        "@id": "http://celvo.com.tr/#webpage",
        url: "http://celvo.com.tr",
        name: "Celvo - Premium Tekstil Ürünleri",
        isPartOf: {
          "@id": "http://celvo.com.tr/#website",
        },
        about: {
          "@id": "http://celvo.com.tr/#organization",
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
