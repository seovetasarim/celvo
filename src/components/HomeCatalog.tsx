"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number | string;
  image: string;
  name?: string;
  category?: string;
};

const WHATSAPP_NUMBER = "905067000827";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80";

export default function HomeCatalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/urunler")
      .then((res) => res.json())
      .then((data) => {
        const list = data?.products || [];
        setProducts(Array.isArray(list) ? list : []);
      })
      .catch(() => {
        setProducts([]);
      });
  }, []);

  const visibleProducts = useMemo(() => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 12);
  }, [products]);

  return (
    <section className="w-full pt-24 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="mb-12 overflow-hidden rounded-2xl border border-stone-300">
          <div className="relative aspect-[21/8] w-full bg-stone-100">
            <img
              src={HERO_IMAGE_URL}
              alt="Celvo Hero Banner"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/10" />
            <div className="absolute inset-0 flex items-end p-4 sm:p-6 md:p-8">
              <div className="max-w-xl text-white">
                <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/80 sm:text-xs">
                  CELVO Woman
                </p>
                <h1 className="text-lg font-semibold leading-tight sm:text-2xl md:text-4xl">
                  Sessizliğin Gücü, Tasarımın Zarafeti.
                </h1>
                <p className="mt-2 max-w-md text-[11px] text-white/85 sm:text-sm md:text-base">
                  CELVO Woman | Estetiği ve kaliteyi üretimle buluşturan modern kadının yeni imzası.
                </p>
                <p className="mt-1 text-[11px] font-medium italic text-white/90 sm:text-sm">
                  Rise in Silence.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                  <Link
                    href="/koleksiyon"
                    className="inline-flex items-center justify-center rounded-md bg-white px-3 py-1.5 text-[11px] font-semibold text-stone-900 transition hover:bg-stone-100 sm:px-4 sm:py-2 sm:text-sm"
                  >
                    Koleksiyonu Keşfet
                  </Link>
                  <Link
                    href="/hakkimizda#uretim-gucumuz"
                    className="inline-flex items-center justify-center rounded-md bg-green-600 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-green-700 sm:px-4 sm:py-2 sm:text-sm"
                  >
                    Üretim Gücümüzü Tanıyın
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {visibleProducts.length === 0 && (
          <div className="mb-10 rounded-2xl border border-dashed border-stone-300 p-6 text-center text-sm text-stone-600">
            `public/urun` klasörüne 12 ürün görseli eklediğinde burada otomatik listelenecek.
          </div>
        )}

        <div className="mb-8 border-b border-stone-300 pb-4">
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">Ürünler</h2>
          <p className="mt-1 text-sm text-stone-600">Beğendiğin ürün için hemen teklif al veya WhatsApp'tan yaz.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visibleProducts.map((product) => {
            const productName = product.name || "Ürün";
            const quoteUrl = `/teklif-al?urun=${encodeURIComponent(productName)}`;
            const whatsappText = encodeURIComponent(`Merhaba, ${productName} ürünü için fiyat teklifi almak istiyorum.`);
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

            return (
              <article key={product.id} className="overflow-hidden rounded-xl border border-stone-300">
                <div className="relative aspect-[4/5] w-full bg-stone-100">
                  <Image src={product.image || "/images/demo.jpg"} alt={productName} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="p-3">
                  <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-stone-500">{product.category || "Tekstil"}</p>
                  <h3 className="mb-3 text-sm font-semibold text-stone-900">{productName}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={quoteUrl}
                      className="inline-flex items-center justify-center rounded-md border border-stone-900 px-2 py-2 text-xs font-semibold text-stone-900 transition hover:bg-stone-900 hover:text-white"
                    >
                      Teklif Al
                    </Link>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-md border border-green-600 px-2 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-600 hover:text-white"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 w-full border-t border-stone-300 pt-10 text-left">
          <ul className="w-full max-w-none space-y-5 text-sm leading-relaxed text-stone-700 sm:text-base">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b08a20]" aria-hidden />
              <span>
                <span className="font-semibold text-stone-900">Est. 2025:</span> Genç, dinamik ve modanın
                geleceğini okuyan bir vizyon.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b08a20]" aria-hidden />
              <span>
                <span className="font-semibold text-stone-900">Yerli Üretim, Global Vizyon:</span>{" "}
                Gaziantep’in tekstil mirasını dünya standartlarında tasarımlarla buluşturuyoruz.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b08a20]" aria-hidden />
              <span>
                <span className="font-semibold text-stone-900">Sessiz Lüks:</span> Logoların değil, kumaşın ve
                kesimin konuştuğu bir stil anlayışı.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
