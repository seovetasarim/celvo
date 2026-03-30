"use client";

import { FormEvent, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export default function IletisimPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-white">
      <Header />
      <main className="bg-white pt-28 pb-16">
        <section className="mx-auto max-w-6xl px-6">
          <div className="mb-10 border-b border-stone-300 pb-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">İletişim</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
              Teklif ve bilgi için bize ulaşın
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-600 sm:text-base">
              İhtiyacınızı kısa notlarla iletin; en kısa sürede dönüş yapalım.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            <aside className="space-y-4 lg:col-span-2">
              <div className="rounded-2xl border border-stone-300 p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-stone-500">Telefon</p>
                <a href="tel:+905067000827" className="mt-2 block text-base font-semibold text-stone-900">
                  0506 700 08 27
                </a>
              </div>
              <div className="rounded-2xl border border-stone-300 p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-stone-500">E-posta</p>
                <a href="mailto:info@celvo.com.tr" className="mt-2 block text-base font-semibold text-stone-900">
                  info@celvo.com.tr
                </a>
              </div>
              <div className="rounded-2xl border border-stone-300 p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-stone-500">Adres</p>
                <p className="mt-2 text-base font-semibold text-stone-900">Gaziantep / Sehitkamil</p>
              </div>
            </aside>

            <div className="rounded-2xl border border-stone-300 p-6 lg:col-span-3">
              <h2 className="text-xl font-semibold text-stone-900">Mesaj Gönder</h2>
              <p className="mt-1 text-sm text-stone-600">Formu doldurun, size hızlıca ulaşalım.</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <input
                  required
                  type="text"
                    placeholder="Ad Soyad"
                  className="h-11 w-full rounded-lg border border-stone-300 px-3 text-sm text-stone-900 outline-none focus:border-stone-500"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    type="email"
                    placeholder="E-posta"
                    className="h-11 w-full rounded-lg border border-stone-300 px-3 text-sm text-stone-900 outline-none focus:border-stone-500"
                  />
                  <input
                    type="tel"
                    placeholder="Telefon"
                    className="h-11 w-full rounded-lg border border-stone-300 px-3 text-sm text-stone-900 outline-none focus:border-stone-500"
                  />
                </div>
                <textarea
                  required
                  rows={6}
                  placeholder="Mesajınız"
                  className="w-full rounded-lg border border-stone-300 p-3 text-sm text-stone-900 outline-none focus:border-stone-500"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md border border-stone-900 px-4 py-2 text-sm font-semibold text-stone-900 transition hover:bg-stone-900 hover:text-white"
                >
                  Gönder
                </button>
                {sent && <p className="text-sm text-green-700">Mesajınız alındı. En kısa sürede dönüş yapacağız.</p>}
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
