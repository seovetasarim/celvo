"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LogOut,
  Image as ImageIcon,
  FileText,
  Settings,
  Upload,
  Trash2,
  Save,
} from "lucide-react";
import Image from "next/image";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "products" | "images" | "contact" | "settings">("hero");
  const [heroData, setHeroData] = useState<any>(null);
  const [aboutData, setAboutData] = useState<any>(null);
  const [productsData, setProductsData] = useState<any>(null);
  const [contactData, setContactData] = useState<any>(null);
  const [settingsData, setSettingsData] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    loadContent();
    loadImages();
  }, []);

  const loadContent = async () => {
    try {
      const [heroRes, aboutRes, productsRes, contactRes, settingsRes] = await Promise.all([
        fetch("/api/admin/get-content?type=hero"),
        fetch("/api/admin/get-content?type=about"),
        fetch("/api/admin/get-content?type=products"),
        fetch("/api/admin/get-content?type=contact"),
        fetch("/api/admin/get-content?type=settings"),
      ]);

      setHeroData(await heroRes.json());
      setAboutData(await aboutRes.json());
      setProductsData(await productsRes.json());
      setContactData(await contactRes.json());
      setSettingsData(await settingsRes.json());
    } catch (error) {
      console.error("Failed to load content:", error);
    }
  };

  const loadImages = async () => {
    try {
      const response = await fetch("/api/admin/get-content?type=products");
      const data = await response.json();
      const imageList = data.products.map((p: any) => p.image);
      setImages(imageList);
    } catch (error) {
      console.error("Failed to load images:", error);
    }
  };

  const saveContent = async (type: string, data: any) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/update-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, data }),
      });
      const payload = await response.json().catch(() => null);

      if (response.ok) {
        setMessage("✅ Kaydedildi! Sayfa yeniden yüklenecek...");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        const reason =
          payload?.error ||
          payload?.message ||
          `Kaydetme hatası (HTTP ${response.status})`;
        setMessage(`❌ ${reason}`);
      }
    } catch (error) {
      setMessage("❌ Kaydetme hatası: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("✅ Resim yüklendi: " + data.fileName);
        
        // Add to products
        const maxId = productsData.products.reduce((max: number, p: any) => Math.max(max, p.id || 0), 0);
        const newProduct = {
          id: maxId + 1,
          image: data.imagePath,
          name: "Yeni Ürün",
          category: "Tekstil",
        };

        const updatedProducts = {
          products: [...productsData.products, newProduct],
        };

        await saveContent("products", updatedProducts);
        await loadContent();
        await loadImages();
      } else {
        setMessage("❌ " + (data.error || "Yükleme hatası"));
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("❌ Yükleme hatası: " + (error as Error).message);
    } finally {
      setLoading(false);
      // Reset file input
      e.target.value = "";
    }
  };

  const deleteImage = async (productId: number) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;

    setLoading(true);
    setMessage("");
    
    try {
      const deleteRes = await fetch("/api/admin/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (deleteRes.ok) {
        setMessage("✅ Ürün başarıyla silindi!");
        
        // Reload data
        await loadContent();
        await loadImages();
      } else {
        const error = await deleteRes.json();
        setMessage(`❌ Silme hatası: ${error.error || "Bilinmeyen hata"}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("❌ Silme işlemi başarısız oldu");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("❌ Şifreler eşleşmiyor!");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("❌ Şifre en az 6 karakter olmalı!");
      return;
    }

    const updatedSettings = {
      ...settingsData,
      admin: {
        ...settingsData.admin,
        password: newPassword,
      },
    };

    await saveContent("settings", updatedSettings);
    setNewPassword("");
    setConfirmPassword("");
  };

  if (!heroData || !aboutData || !productsData || !contactData || !settingsData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-stone-600">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="admin-light min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-stone-900">CÉLVO Admin</h1>
            <p className="text-xs text-stone-500">İçerik Yönetim Paneli</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-stone-700 transition-all hover:bg-stone-100"
          >
            <LogOut className="h-4 w-4" />
            Çıkış
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {[
            { id: "hero", label: "Ana Sayfa", icon: FileText },
            { id: "about", label: "Hakkımızda", icon: FileText },
            { id: "products", label: "Ürünler", icon: Settings },
            { id: "contact", label: "İletişim", icon: FileText },
            { id: "images", label: "Resimler", icon: ImageIcon },
            { id: "settings", label: "Ayarlar", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 font-medium transition-all ${
                activeTab === tab.id
                  ? "border border-stone-900 bg-stone-900 text-white"
                  : "border border-stone-300 bg-white text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-stone-300 bg-stone-50 p-4 text-center text-stone-700"
          >
            {message}
          </motion.div>
        )}

        {/* Content Area */}
        <div className="rounded-2xl border border-stone-200 bg-white p-8">
          {/* Hero Tab */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <h2 className="mb-6 text-2xl font-bold text-white">
                Ana Sayfa İçeriği
              </h2>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Badge Yazısı
                </label>
                <input
                  type="text"
                  value={heroData.badge}
                  onChange={(e) =>
                    setHeroData({ ...heroData, badge: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Ana Başlık
                </label>
                <input
                  type="text"
                  value={heroData.title}
                  onChange={(e) =>
                    setHeroData({ ...heroData, title: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Açıklama
                </label>
                <textarea
                  value={heroData.description}
                  onChange={(e) =>
                    setHeroData({ ...heroData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Müşteri Sayısı
                </label>
                <input
                  type="text"
                  value={heroData.trustIndicators.customers}
                  onChange={(e) =>
                    setHeroData({
                      ...heroData,
                      trustIndicators: {
                        ...heroData.trustIndicators,
                        customers: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                />
              </div>

              <button
                onClick={() => saveContent("hero", heroData)}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0d882] px-8 py-4 font-semibold text-black transition-all hover:scale-105 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                Kaydet
              </button>
            </div>
          )}

          {/* About Tab */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <h2 className="mb-6 text-2xl font-bold text-white">
                Hakkımızda İçeriği
              </h2>

              <div className="space-y-6 rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5 p-6">
                <h3 className="text-lg font-semibold text-[#d4af37]">Genel Bilgiler</h3>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Ana Başlık
                  </label>
                  <input
                    type="text"
                    value={aboutData.title}
                    onChange={(e) =>
                      setAboutData({ ...aboutData, title: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Slogan
                  </label>
                  <input
                    type="text"
                    value={aboutData.slogan}
                    onChange={(e) =>
                      setAboutData({ ...aboutData, slogan: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Marka Adı
                  </label>
                  <input
                    type="text"
                    value={aboutData.brandName}
                    onChange={(e) =>
                      setAboutData({ ...aboutData, brandName: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>
              </div>

              <div className="space-y-6 rounded-xl border border-white/10 bg-black/20 p-6">
                <h3 className="text-lg font-semibold text-white">Köken ve Anlam</h3>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Başlık
                  </label>
                  <input
                    type="text"
                    value={aboutData.origin.title}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        origin: { ...aboutData.origin, title: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    İçerik
                  </label>
                  <textarea
                    value={aboutData.origin.content}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        origin: { ...aboutData.origin, content: e.target.value },
                      })
                    }
                    rows={4}
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>
              </div>

              <div className="space-y-6 rounded-xl border border-white/10 bg-black/20 p-6">
                <h3 className="text-lg font-semibold text-white">Markanın Felsefesi</h3>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Başlık
                  </label>
                  <input
                    type="text"
                    value={aboutData.philosophy.title}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        philosophy: { ...aboutData.philosophy, title: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    1. Paragraf
                  </label>
                  <textarea
                    value={aboutData.philosophy.paragraphs[0]}
                    onChange={(e) => {
                      const updated = { ...aboutData };
                      updated.philosophy.paragraphs[0] = e.target.value;
                      setAboutData(updated);
                    }}
                    rows={3}
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    2. Paragraf
                  </label>
                  <textarea
                    value={aboutData.philosophy.paragraphs[1]}
                    onChange={(e) => {
                      const updated = { ...aboutData };
                      updated.philosophy.paragraphs[1] = e.target.value;
                      setAboutData(updated);
                    }}
                    rows={3}
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>
              </div>

              <div className="space-y-6 rounded-xl border border-white/10 bg-black/20 p-6">
                <h3 className="text-lg font-semibold text-white">CÉLVO Erkeği</h3>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Başlık
                  </label>
                  <input
                    type="text"
                    value={aboutData.target.title}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        target: { ...aboutData.target, title: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    İçerik
                  </label>
                  <textarea
                    value={aboutData.target.content}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        target: { ...aboutData.target, content: e.target.value },
                      })
                    }
                    rows={4}
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Alt Başlık
                  </label>
                  <input
                    type="text"
                    value={aboutData.target.subtitle}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        target: { ...aboutData.target, subtitle: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>
              </div>

              <div className="space-y-6 rounded-xl border border-white/10 bg-black/20 p-6">
                <h3 className="text-lg font-semibold text-white">Temel Değerler</h3>
                
                {aboutData.values.map((value: any, index: number) => (
                  <div key={index} className="space-y-3 rounded-lg border border-white/5 bg-black/40 p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs text-gray-400">
                          Başlık
                        </label>
                        <input
                          type="text"
                          value={value.title}
                          onChange={(e) => {
                            const updated = { ...aboutData };
                            updated.values[index].title = e.target.value;
                            setAboutData(updated);
                          }}
                          className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-[#d4af37]/50"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs text-gray-400">
                          İkon (sparkles, shield, trending-up, award)
                        </label>
                        <input
                          type="text"
                          value={value.icon}
                          onChange={(e) => {
                            const updated = { ...aboutData };
                            updated.values[index].icon = e.target.value;
                            setAboutData(updated);
                          }}
                          className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-[#d4af37]/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs text-gray-400">
                        Açıklama
                      </label>
                      <textarea
                        value={value.description}
                        onChange={(e) => {
                          const updated = { ...aboutData };
                          updated.values[index].description = e.target.value;
                          setAboutData(updated);
                        }}
                        rows={2}
                        className="w-full resize-none rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-[#d4af37]/50"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => saveContent("about", aboutData)}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0d882] px-8 py-4 font-semibold text-black transition-all hover:scale-105 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                Hakkımızda İçeriğini Kaydet
              </button>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <h2 className="mb-6 text-2xl font-bold text-white">
                Ürün Yönetimi
              </h2>
              <p className="text-sm text-stone-600">
                Buradaki değişiklikler anasayfadaki ürün kartlarına direkt yansır. Resim, ürün ismi (başlık) ve kategoriyi düzenleyip kaydedin.
              </p>

              <div className="space-y-4">
                {productsData.products.map((product: any, index: number) => (
                  <div
                    key={product.id}
                    className="rounded-xl border border-white/10 bg-black/40 p-4"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs text-gray-400">
                          Ürün İsmi (Başlık)
                        </label>
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => {
                            const updated = { ...productsData };
                            updated.products[index].name = e.target.value;
                            setProductsData(updated);
                          }}
                          className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-[#d4af37]/50"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs text-gray-400">
                          Kategori / Alt Başlık
                        </label>
                        <input
                          type="text"
                          value={product.category}
                          onChange={(e) => {
                            const updated = { ...productsData };
                            updated.products[index].category = e.target.value;
                            setProductsData(updated);
                          }}
                          className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-[#d4af37]/50"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="mb-2 block text-xs text-gray-400">
                        Ürün Resmi (URL veya Base64)
                      </label>
                      <input
                        type="text"
                        value={product.image}
                        onChange={(e) => {
                          const updated = { ...productsData };
                          updated.products[index].image = e.target.value;
                          setProductsData(updated);
                        }}
                        className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-[#d4af37]/50"
                      />
                    </div>

                    {/* Product Image Preview */}
                    <div className="mt-4 flex items-center gap-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-white/10">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteImage(product.id);
                        }}
                        disabled={loading}
                        className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400 transition-all hover:border-red-500/40 hover:bg-red-500/20 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        {loading ? "Siliniyor..." : "Sil"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => saveContent("products", productsData)}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0d882] px-8 py-4 font-semibold text-black transition-all hover:scale-105 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                Ürünleri Kaydet
              </button>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <h2 className="mb-6 text-2xl font-bold text-white">
                İletişim Sayfası İçeriği
              </h2>

              <div className="space-y-6 rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5 p-6">
                <h3 className="text-lg font-semibold text-[#d4af37]">Sayfa Başlıkları</h3>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Ana Başlık
                  </label>
                  <input
                    type="text"
                    value={contactData.title}
                    onChange={(e) =>
                      setContactData({ ...contactData, title: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Alt Başlık
                  </label>
                  <input
                    type="text"
                    value={contactData.subtitle}
                    onChange={(e) =>
                      setContactData({ ...contactData, subtitle: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Form Başlığı
                  </label>
                  <input
                    type="text"
                    value={contactData.formTitle}
                    onChange={(e) =>
                      setContactData({ ...contactData, formTitle: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Form Alt Başlık
                  </label>
                  <input
                    type="text"
                    value={contactData.formSubtitle}
                    onChange={(e) =>
                      setContactData({ ...contactData, formSubtitle: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>
              </div>

              <div className="space-y-6 rounded-xl border border-white/10 bg-black/20 p-6">
                <h3 className="text-lg font-semibold text-white">İletişim Bilgileri</h3>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    İsim Soyisim
                  </label>
                  <input
                    type="text"
                    value={contactData.owner}
                    onChange={(e) =>
                      setContactData({ ...contactData, owner: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Telefon (Görünen)
                    </label>
                    <input
                      type="text"
                      value={contactData.phone}
                      onChange={(e) =>
                        setContactData({ ...contactData, phone: e.target.value })
                      }
                      placeholder="0506 700 08 27"
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Telefon Link (+90...)
                    </label>
                    <input
                      type="text"
                      value={contactData.phoneLink}
                      onChange={(e) =>
                        setContactData({ ...contactData, phoneLink: e.target.value })
                      }
                      placeholder="+905067000827"
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={contactData.email}
                    onChange={(e) =>
                      setContactData({ ...contactData, email: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Adres
                  </label>
                  <input
                    type="text"
                    value={contactData.address}
                    onChange={(e) =>
                      setContactData({ ...contactData, address: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>
              </div>

              <button
                onClick={() => saveContent("contact", contactData)}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0d882] px-8 py-4 font-semibold text-black transition-all hover:scale-105 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                İletişim Bilgilerini Kaydet
              </button>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="mb-6 text-2xl font-bold text-white">
                Ayarlar
              </h2>

              <div className="space-y-6 rounded-xl border border-red-500/20 bg-red-500/5 p-6">
                <h3 className="text-lg font-semibold text-red-400">Şifre Değiştir</h3>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Yeni Şifre
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="En az 6 karakter"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Yeni Şifre (Tekrar)
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Şifreyi tekrar girin"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>

                <button
                  onClick={handlePasswordChange}
                  disabled={loading || !newPassword || !confirmPassword}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-8 py-4 font-semibold text-white transition-all hover:scale-105 disabled:opacity-50"
                >
                  <Save className="h-5 w-5" />
                  Şifreyi Değiştir
                </button>
              </div>

              <div className="space-y-6 rounded-xl border border-white/10 bg-black/20 p-6">
                <h3 className="text-lg font-semibold text-white">Site Bilgileri</h3>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Site Adı
                  </label>
                  <input
                    type="text"
                    value={settingsData.site.name}
                    onChange={(e) =>
                      setSettingsData({
                        ...settingsData,
                        site: { ...settingsData.site, name: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={settingsData.site.tagline}
                    onChange={(e) =>
                      setSettingsData({
                        ...settingsData,
                        site: { ...settingsData.site, tagline: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Slogan
                  </label>
                  <input
                    type="text"
                    value={settingsData.site.slogan}
                    onChange={(e) =>
                      setSettingsData({
                        ...settingsData,
                        site: { ...settingsData.site, slogan: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#d4af37]/50"
                  />
                </div>

                <button
                  onClick={() => saveContent("settings", settingsData)}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0d882] px-8 py-4 font-semibold text-black transition-all hover:scale-105 disabled:opacity-50"
                >
                  <Save className="h-5 w-5" />
                  Ayarları Kaydet
                </button>
              </div>
            </div>
          )}

          {/* Images Tab */}
          {activeTab === "images" && (
            <div className="space-y-6">
              <h2 className="mb-6 text-2xl font-bold text-white">
                Resim Yönetimi
              </h2>

              {/* Upload Area */}
              <div className="rounded-xl border-2 border-dashed border-[#d4af37]/30 bg-[#d4af37]/5 p-8 text-center">
                <Upload className="mx-auto mb-4 h-12 w-12 text-[#d4af37]" />
                <p className="mb-4 text-white">Yeni resim yükle</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mx-auto block text-sm text-gray-400 file:mr-4 file:rounded-full file:border-0 file:bg-[#d4af37] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:bg-[#f0d882]"
                />
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {productsData.products.map((product: any) => (
                  <div
                    key={product.id}
                    className="group relative overflow-hidden rounded-xl border border-white/10"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/80 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteImage(product.id);
                        }}
                        disabled={loading}
                        className="rounded-full bg-red-500 p-3 text-white transition-all hover:bg-red-600 disabled:opacity-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-black/80 p-2 text-center text-xs text-white backdrop-blur-sm">
                      {product.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        .admin-light [class*="border-white/10"],
        .admin-light [class*="border-white/5"] {
          border-color: #e7e5e4 !important;
        }

        .admin-light [class*="bg-white/5"],
        .admin-light [class*="bg-black/20"],
        .admin-light [class*="bg-black/40"],
        .admin-light [class*="bg-black/60"] {
          background-color: #ffffff !important;
        }

        .admin-light input,
        .admin-light textarea {
          background-color: #ffffff !important;
          border-color: #d6d3d1 !important;
          color: #1c1917 !important;
        }

        .admin-light input::placeholder,
        .admin-light textarea::placeholder {
          color: #a8a29e !important;
        }

        .admin-light label,
        .admin-light h2,
        .admin-light h3 {
          color: #1f2937 !important;
        }

        .admin-light [class*="text-gray-300"],
        .admin-light [class*="text-gray-400"],
        .admin-light [class*="text-gray-500"] {
          color: #57534e !important;
        }
      `}</style>
    </div>
  );
}

