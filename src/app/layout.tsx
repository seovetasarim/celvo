import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const siteUrl = getSiteUrl();

const poppins = Poppins({
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const siteTitle = "CELVO | Premium Tekstil & Modern Tasarım";
const siteDescription =
  "Modern kadının stilini üretim sanatı ile buluşturuyoruz. Yüksek kaliteli kumaşlar ve zamansız kesimlerle hazırlanan CELVO koleksiyonlarını keşfedin. Sessizliğin gücü, kalitenin imzası.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | CELVO",
  },
  description: siteDescription,
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
  metadataBase: new URL(siteUrl),
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
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
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
    title: siteTitle,
    description: siteDescription,
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
    canonical: siteUrl,
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
