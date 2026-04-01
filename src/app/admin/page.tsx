"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import AdminDashboard from "./AdminDashboard";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const auth = localStorage.getItem("celvo_admin_auth");
    if (auth === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/get-content?type=settings");
      const settings = await response.json();

      if (
        username === settings.admin.username &&
        password === settings.admin.password
      ) {
        setIsAuthenticated(true);
        localStorage.setItem("celvo_admin_auth", "authenticated");
      } else {
        setError("Kullanıcı adı veya şifre hatalı");
      }
    } catch (error) {
      setError("Giriş yapılırken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("celvo_admin_auth");
    setUsername("");
    setPassword("");
  };

  if (isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-10">
      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="overflow-hidden rounded-2xl border border-stone-300 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-stone-200 p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg border border-stone-200 bg-stone-50">
              <Lock className="h-7 w-7 text-stone-700" />
            </div>
            <h1 className="mb-2 text-2xl font-semibold text-stone-900">
              Admin Paneli
            </h1>
            <p className="text-sm text-stone-500">CÉLVO İçerik Yönetimi</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8">
            <div className="space-y-6">
              {/* Username */}
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 outline-none transition-all focus:border-stone-500"
                  placeholder="admin"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 pr-12 text-stone-900 placeholder-stone-400 outline-none transition-all focus:border-stone-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-400"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full rounded-lg border border-stone-900 bg-stone-900 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </motion.button>
            </div>
          </form>
        </div>

        {/* Info */}
        <p className="mt-5 text-center text-xs text-stone-500">
          Yetkisiz erişim yasaktır
        </p>
      </motion.div>
    </div>
  );
}












