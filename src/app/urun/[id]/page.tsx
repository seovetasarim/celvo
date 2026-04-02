"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { whatsappHref } from "@/lib/whatsapp";

type Product = {
  id: number | string;
  image: string;
  images?: string[];
  name?: string;
  category?: string;
  description?: string;
};

function renderInlineBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

function renderProductDescription(description: string) {
  const lines = description
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line) => line.length > 0);

  if (lines.length === 0) return null;

  const elements: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length === 0) return;
    elements.push(
      <ul key={`list-${elements.length}`} className="list-disc space-y-1 pl-5">
        {listBuffer.map((item, i) => (
          <li key={i}>{renderInlineBold(item)}</li>
        ))}
      </ul>,
    );
    listBuffer = [];
  };

  lines.forEach((line) => {
    if (line.startsWith("- ")) {
      listBuffer.push(line.slice(2));
      return;
    }
    flushList();
    elements.push(
      <p key={`p-${elements.length}`} className="leading-relaxed">
        {renderInlineBold(line)}
      </p>,
    );
  });
  flushList();

  return elements;
}

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const productId = useMemo(() => decodeURIComponent(params?.id ?? ""), [params?.id]);

  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/urunler")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data?.products) ? (data.products as Product[]) : [];
        setAllProducts(list);
        const found =
          list.find((item) => String(item.id) === productId) ??
          list.find((item) => String(item.id) === String(Number(productId)));
        setProduct(found ?? null);
        const firstImage =
          (Array.isArray(found?.images) && found.images.length > 0 ? String(found.images[0]) : "") ||
          found?.image ||
          "";
        setActiveImage(firstImage || "");
      })
      .catch(() => {
        if (!cancelled) {
          setAllProducts([]);
          setProduct(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  const productName = product?.name || "Ürün";
  const productImages = useMemo(() => {
    if (!product) return [];
    const fromArray = Array.isArray(product.images)
      ? product.images.map((img) => String(img ?? "")).filter(Boolean)
      : [];
    if (fromArray.length > 0) return fromArray;
    return product.image ? [String(product.image)] : [];
  }, [product]);
  const whatsappUrl = whatsappHref(
    `Merhaba, ${productName} ürünü hakkında detaylı bilgi ve fiyat teklifi almak istiyorum.`,
  );
  const similarProducts = useMemo(() => {
    if (!product) return [];

    const sameCategory = allProducts.filter(
      (item) =>
        String(item.id) !== String(product.id) &&
        String(item.category || "").toLowerCase() === String(product.category || "").toLowerCase(),
    );

    if (sameCategory.length >= 4) {
      return sameCategory.slice(0, 4);
    }

    const otherProducts = allProducts.filter(
      (item) =>
        String(item.id) !== String(product.id) &&
        !sameCategory.some((same) => String(same.id) === String(item.id)),
    );

    return [...sameCategory, ...otherProducts].slice(0, 4);
  }, [allProducts, product]);

  return (
    <div className="bg-white">
      <Header />
      <main className="mx-auto min-h-[70vh] w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6">
        <Link href="/koleksiyon" className="mb-6 inline-flex text-sm font-medium text-stone-600 hover:text-stone-900">
          ← Koleksiyona geri dön
        </Link>

        {loading && (
          <div className="rounded-2xl border border-stone-300 p-8 text-center text-sm text-stone-600">
            Ürün detayı yükleniyor...
          </div>
        )}

        {!loading && !product && (
          <div className="rounded-2xl border border-dashed border-stone-300 p-8 text-center">
            <p className="text-base font-semibold text-stone-900">Ürün bulunamadı</p>
            <p className="mt-2 text-sm text-stone-600">Ürün kaldırılmış olabilir veya bağlantı geçersiz olabilir.</p>
          </div>
        )}

        {!loading && product && (
          <>
            <section className="grid items-start gap-8 overflow-x-hidden lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-stone-300 bg-stone-100">
                  <Image
                    src={activeImage || product.image || "/images/demo.jpg"}
                    alt={productName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized={String(activeImage || product.image || "").startsWith("data:")}
                  />
                </div>
                {productImages.length > 1 && (
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {productImages.map((img, i) => (
                      <button
                        key={`${img}-${i}`}
                        type="button"
                        onClick={() => setActiveImage(img)}
                        className={`relative aspect-square overflow-hidden rounded-md border ${
                          img === (activeImage || product.image)
                            ? "border-stone-900"
                            : "border-stone-300 hover:border-stone-500"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${productName} ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="120px"
                          unoptimized={String(img).startsWith("data:")}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="min-w-0 lg:col-span-5">
                <div className="p-1 sm:p-2">
                  <div className="mb-4 grid grid-cols-1 gap-3 text-xs text-stone-600 sm:grid-cols-2">
                    <div className="rounded-lg border border-stone-200 bg-white px-3 py-2">
                      <p className="text-[10px] uppercase tracking-wide text-stone-400">Kategori</p>
                      <p className="mt-1 font-medium text-stone-800">{product.category || "Tekstil"}</p>
                    </div>
                    <div className="rounded-lg border border-stone-200 bg-white px-3 py-2">
                      <p className="text-[10px] uppercase tracking-wide text-stone-400">Galeri</p>
                      <p className="mt-1 font-medium text-stone-800">{productImages.length} Görsel</p>
                    </div>
                  </div>

                <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                  {product.category || "Tekstil"}
                </p>
                <h1 className="mt-2 break-words text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">{productName}</h1>
                <div className="mt-4 space-y-2 text-sm text-stone-600 break-words [overflow-wrap:anywhere]">
                  {product.description?.trim()
                    ? renderProductDescription(product.description.trim())
                    : "Bu ürün hakkında kumaş, üretim detayı, minimum sipariş adedi ve fiyat teklifi için bizimle hemen iletisime gecebilirsiniz."}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-md bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 sm:w-auto"
                  >
                    WhatsApp'tan Teklif Al
                  </a>
                  <Link
                    href="/iletisim"
                    className="inline-flex w-full items-center justify-center rounded-md border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-100 sm:w-auto"
                  >
                    İletişim Sayfası
                  </Link>
                </div>
                </div>
              </div>
            </section>

            {similarProducts.length > 0 && (
              <section className="mt-14 border-t border-stone-200 pt-10">
                <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Benzer Ürünler</h2>
                <p className="mt-1 text-sm text-stone-600">Bu ürünle ilgilendiysen bunlara da göz atabilirsin.</p>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {similarProducts.map((item) => (
                    <article key={item.id} className="overflow-hidden rounded-xl border border-stone-300">
                      <Link href={`/urun/${encodeURIComponent(String(item.id))}`} className="block">
                        <div className="relative aspect-[4/5] w-full bg-stone-100">
                          <Image
                            src={item.image || "/images/demo.jpg"}
                            alt={item.name || "Ürün"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            unoptimized={String(item.image || "").startsWith("data:")}
                          />
                        </div>
                      </Link>
                      <div className="p-3">
                        <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-stone-500">
                          {item.category || "Tekstil"}
                        </p>
                        <Link
                          href={`/urun/${encodeURIComponent(String(item.id))}`}
                          className="text-sm font-semibold text-stone-900 hover:underline"
                        >
                          {item.name || "Ürün"}
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
