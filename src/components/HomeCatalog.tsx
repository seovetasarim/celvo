"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { whatsappHref } from "@/lib/whatsapp";

type Product = {
  id: number | string;
  image: string;
  name?: string;
  category?: string;
};

type HeroData = {
  badge?: string;
  title?: string;
  description?: string;
};

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80";

const DEFAULT_HERO: HeroData = {
  badge: "CELVO Woman",
  title: "Sessizliğin Gücü, Tasarımın Zarafeti.",
  description: "CELVO Woman | Estetiği ve kaliteyi üretimle buluşturan modern kadının yeni imzası.",
};

export default function HomeCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [hero, setHero] = useState<HeroData>(DEFAULT_HERO);

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

    fetch("/api/admin/get-content?type=hero")
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.error) return;
        setHero({
          badge: data.badge || DEFAULT_HERO.badge,
          title: data.title || DEFAULT_HERO.title,
          description: data.description || DEFAULT_HERO.description,
        });
      })
      .catch(() => {
        setHero(DEFAULT_HERO);
      });
  }, []);

  useEffect(() => {
    if (products.length === 0) {
      setVisibleProducts([]);
      return;
    }
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    setVisibleProducts(shuffled.slice(0, 12));
  }, [products]);

  return (
    <section className="w-full pt-24 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="mb-12 overflow-hidden rounded-2xl border border-stone-300">
          <div className="relative aspect-[16/10] w-full bg-stone-100 sm:aspect-[21/8]">
            <img
              src={HERO_IMAGE_URL}
              alt="Celvo Hero Banner"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20 sm:from-black/65 sm:via-black/40 sm:to-black/10" />
            <div className="absolute inset-0 flex items-end p-2.5 sm:p-6 md:p-8">
              <div className="max-w-xl text-white">
                <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.16em] text-white/80 sm:text-xs sm:tracking-[0.2em]">
                  {hero.badge}
                </p>
                <h1 className="text-[28px] font-semibold leading-tight sm:text-2xl md:text-4xl">
                  {hero.title}
                </h1>
                <p className="mt-1.5 line-clamp-3 max-w-md text-[10px] leading-snug text-white/90 sm:mt-2 sm:line-clamp-none sm:text-sm sm:leading-normal md:text-base">
                  {hero.description}
                </p>
                <p className="mt-1 text-[10px] font-medium italic text-white/90 sm:text-sm">
                  Rise in Silence.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                  <Link
                    href="/koleksiyon"
                    className="inline-flex items-center justify-center rounded-md bg-white px-3 py-1.5 text-[10px] font-semibold text-stone-900 transition hover:bg-stone-100 sm:px-4 sm:py-2 sm:text-sm"
                  >
                    Koleksiyonu Keşfet
                  </Link>
                  <Link
                    href="/hakkimizda#uretim-gucumuz"
                    className="inline-flex items-center justify-center rounded-md bg-green-600 px-3 py-1.5 text-[10px] font-semibold text-white transition hover:bg-green-700 sm:px-4 sm:py-2 sm:text-sm"
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
            Henüz listelenecek ürün yok. Ürünleri admin panelden ekleyin; anasayfa ve panel aynı veritabanındaki ürünleri
            kullanır.
          </div>
        )}

        <div className="mb-8 border-b border-stone-300 pb-4">
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">Ürünler</h2>
          <p className="mt-1 text-sm text-stone-600">Beğendiğin ürün için hemen teklif al veya WhatsApp'tan yaz.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visibleProducts.map((product) => {
            const productName = product.name || "Ürün";
            const whatsappUrl = whatsappHref(
              `Merhaba, ${productName} ürünü için fiyat teklifi almak istiyorum.`,
            );
            const detailHref = `/urun/${encodeURIComponent(String(product.id))}`;

            return (
              <article key={product.id} className="overflow-hidden rounded-xl border border-stone-300">
                <Link href={detailHref} className="block">
                  <div className="relative aspect-[4/5] w-full bg-stone-100">
                    <Image
                      src={product.image || "/images/demo.jpg"}
                      alt={productName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized={String(product.image || "").startsWith("data:")}
                    />
                  </div>
                </Link>
                <div className="p-3">
                  <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-stone-500">{product.category || "Tekstil"}</p>
                  <Link href={detailHref} className="mb-3 block text-sm font-semibold text-stone-900 hover:underline">
                    {productName}
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-md border border-green-600 px-2 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-600 hover:text-white"
                  >
                    Teklif Al
                  </a>
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
