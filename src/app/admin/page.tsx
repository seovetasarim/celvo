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
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/10 via-black to-black" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/5 blur-[150px]" />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl">
          {/* Header */}
          <div className="border-b border-white/10 bg-gradient-to-r from-[#d4af37]/10 to-transparent p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-transparent">
              <Lock className="h-8 w-8 text-[#d4af37]" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-white">
              Admin Paneli
            </h1>
            <p className="text-sm text-gray-400">CÉLVO İçerik Yönetimi</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8">
            <div className="space-y-6">
              {/* Username */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-[#d4af37]/50 focus:bg-white/10"
                  placeholder="admin"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white placeholder-gray-500 outline-none transition-all focus:border-[#d4af37]/50 focus:bg-white/10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
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
                className="w-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0d882] px-8 py-4 text-base font-semibold text-black shadow-lg shadow-[#d4af37]/30 transition-all hover:shadow-xl hover:shadow-[#d4af37]/50 disabled:opacity-50"
              >
                {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </motion.button>
            </div>
          </form>
        </div>

        {/* Info */}
        <p className="mt-6 text-center text-xs text-gray-600">
          Yetkisiz erişim yasaktır
        </p>
      </motion.div>
    </div>
  );
}












