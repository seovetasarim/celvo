 "use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { useEffect, useState } from "react";

type AboutValue = {
  icon?: string;
  title: string;
  description: string;
};

type AboutData = {
  title: string;
  slogan?: string;
  brandName?: string;
  origin: {
    title: string;
    content: string;
  };
  philosophy: {
    title: string;
    paragraphs: string[];
  };
  target: {
    title: string;
    content: string;
    subtitle?: string;
  };
  values: AboutValue[];
};

const defaultAbout: AboutData = {
  title: "Köklerden Zirveye: Başarıya Giden Sessiz Güç",
  slogan: "Rise in Silence.",
  brandName: "CÉLVO",
  origin: {
    title: "Köken ve Anlam",
    content:
      "CÉLVO, Latince iki güçlü kavramın birleşimiyle doğmuştur: \"Celare\" (gizlemek, örtmek) ve \"Volare\" (yükselmek, uçmak). Bu birleşimden çıkan anlam: \"Sessizce yükselmek.\"",
  },
  philosophy: {
    title: "Markanın Felsefesi",
    paragraphs: [
      "CÉLVO, yaşamın temel direklerinden ilham alır; gösterişten, anlık parıltılardan ve yüzeysel gürültüden uzaktır.",
      "Bu, fırtınalı bir denizde bile sakinliğini koruyan, ancak her an yükselmeye hazır olan gizli bir gücün manifestosudur.",
    ],
  },
  target: {
    title: "CÉLVO Erkeği",
    content:
      "CÉLVO'yu tercih eden erkek, sözlerin geçici, duruşun kalıcı olduğunu bilir. O, kendini kanıtlama çabasına girmez.",
    subtitle: "Onun gücü, derinlikten ve gizli bir vizyondan gelir.",
  },
  values: [],
};

export default function HakkimizdaPage() {
  const [aboutData, setAboutData] = useState<AboutData>(defaultAbout);

  useEffect(() => {
    fetch("/api/admin/get-content?type=about")
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.error) return;
        setAboutData({
          ...defaultAbout,
          ...data,
          origin: { ...defaultAbout.origin, ...(data.origin || {}) },
          philosophy: {
            ...defaultAbout.philosophy,
            ...(data.philosophy || {}),
            paragraphs: Array.isArray(data?.philosophy?.paragraphs)
              ? data.philosophy.paragraphs
              : defaultAbout.philosophy.paragraphs,
          },
          target: { ...defaultAbout.target, ...(data.target || {}) },
          values: Array.isArray(data.values) ? data.values : defaultAbout.values,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-white">
      <Header />
      <main className="bg-white pt-28 pb-16">
        <section className="mx-auto max-w-5xl px-6">
          <div className="mb-10 border-b border-stone-300 pb-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">Hakkımızda (Hikayemiz)</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
              {aboutData.title}
            </h1>
          </div>

          <article className="rounded-2xl border border-stone-300 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">{aboutData.origin.title}</h2>
            <p className="text-sm leading-relaxed text-stone-700 sm:text-base">
              {aboutData.origin.content}
            </p>
          </article>

          <article className="mt-6 rounded-2xl border border-stone-300 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
              {aboutData.philosophy.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-700 sm:text-base">
              {aboutData.philosophy.paragraphs?.[0] || ""}
            </p>
            {aboutData.philosophy.paragraphs?.[1] ? (
              <p className="mt-4 text-sm leading-relaxed text-stone-700 sm:text-base">
                {aboutData.philosophy.paragraphs[1]}
              </p>
            ) : null}
          </article>

          <article className="mt-6 rounded-2xl border border-stone-300 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">{aboutData.target.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-700 sm:text-base">
              {aboutData.target.content}
            </p>
            {aboutData.target.subtitle ? (
              <p className="mt-3 text-sm font-semibold leading-relaxed text-stone-900 sm:text-base">
                {aboutData.target.subtitle}
              </p>
            ) : null}
          </article>

          {aboutData.values.length > 0 ? (
            <article className="mt-6 rounded-2xl border border-stone-300 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">Temel Değerler</h2>
              <ul className="mt-5 space-y-3 text-sm text-stone-700 sm:text-base">
                {aboutData.values.map((value, index) => (
                  <li key={`${value.title}-${index}`}>
                    <span className="font-semibold text-stone-900">{value.title}:</span> {value.description}
                  </li>
                ))}
              </ul>
            </article>
          ) : null}
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
