# CELVO — Premium Tekstil (Next.js)

Modern kadın tekstili markası için Next.js 16 + MySQL yönetim paneli.

## Gereksinimler

- Node.js 20+
- MySQL veritabanı (cPanel / uzak erişim)

## Yerel çalıştırma

```bash
npm install
copy .env.example .env.local
# .env.local içine DB_* ve NEXT_PUBLIC_SITE_URL değerlerini yazın
npm run dev
```

## Vercel’e deploy

1. **GitHub’a push**  
   Repoyu GitHub’a gönderin; Vercel’de “Import Project” ile bağlayın.

2. **Environment Variables** (Project → Settings → Environment Variables) — hepsini **Production** (ve Preview için isteğe bağlı) ekleyin:

| Name | Açıklama |
|------|----------|
| `NEXT_PUBLIC_SITE_URL` | `https://celvo.com.tr` veya geçici olarak `https://proje-adi.vercel.app` |
| `DB_HOST` | MySQL sunucu host’u |
| `DB_USER` | Veritabanı kullanıcısı |
| `DB_PASSWORD` | Veritabanı şifresi |
| `DB_NAME` | Veritabanı adı |
| `DB_PORT` | `3306` |
| `DB_SSL` | Uzak sunucuda genelde `true` |

3. **Build**  
   Framework: Next.js (otomatik). `npm run build` başarılı olmalı.

4. **cPanel → Remote MySQL**  
   Vercel sunucularından bağlantı için MySQL kullanıcısına uzak erişim tanımlayın. Paylaşımlı hostinglerde sıklıkla **`%`** (tüm hostlar) eklenir; güvenlik için mümkünse sabit IP / VPN kullanın.

5. **Özel alan adı**  
   Vercel’de `celvo.com.tr` ekleyin; DNS kayıtlarını Vercel’in verdiği şekilde güncelleyin. Ardından `NEXT_PUBLIC_SITE_URL` değerini kesin URL ile güncelleyin.

## Önemli dosyalar

- `src/lib/db.ts` — MySQL havuzu (Vercel’de `connectionLimit: 1`)
- `src/lib/productsQuery.ts` — Anasayfa ve admin ürün listesi
- `.env.example` — Şablon (gerçek şifreleri repoya koymayın)

## Scriptler

- `scripts/clear-products.sql` — phpMyAdmin’de ürün tablosunu temizlemek için (isteğe bağlı)

## Lisans

Özel proje.
