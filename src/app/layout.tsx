import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Celvo - Premium Tekstil Ürünleri | Şık ve Kaliteli Ev Tekstili",
    template: "%s | Celvo",
  },
  description:
    "Celvo ile yaşam alanlarınızı premium tekstil ürünleriyle süsleyin. Kaliteli kumaşlar, şık tasarımlar ve modern ev tekstili ürünleri.",
  keywords: [
    "celvo",
    "tekstil",
    "ev tekstili",
    "premium tekstil",
    "kaliteli kumaş",
    "şık tasarım",
    "ev dekorasyonu",
    "tekstil ürünleri",
    "modern tekstil",
  ],
  metadataBase: new URL("http://celvo.com.tr"),
  authors: [{ name: "Yusuf Tutar - Celvo Tekstil" }],
  creator: "Celvo - Yusuf Tutar",
  publisher: "Celvo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Celvo - Premium Tekstil Ürünleri",
    description:
      "Kaliteli ve şık tekstil ürünleriyle yaşam alanlarınıza değer katın.",
    type: "website",
    locale: "tr_TR",
    url: "http://celvo.com.tr",
    siteName: "Celvo",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Celvo - Premium Tekstil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Celvo - Premium Tekstil Ürünleri",
    description:
      "Kaliteli ve şık tekstil ürünleriyle yaşam alanlarınıza değer katın.",
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "http://celvo.com.tr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
