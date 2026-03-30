-- CÉLVO Database Setup
-- Database: celvocom_celvo

-- 1. Hero Content Table (Ana Sayfa İçeriği)
CREATE TABLE IF NOT EXISTS hero_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  badge VARCHAR(255) NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  trust_customers VARCHAR(50),
  trust_customers_label VARCHAR(100),
  trust_quality VARCHAR(50),
  trust_quality_label VARCHAR(100),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Initial data for hero
INSERT INTO hero_content (badge, title, description, trust_customers, trust_customers_label, trust_quality, trust_quality_label) 
SELECT 'Premium Tekstil Koleksiyonu', 'Lüks ve Zarafet Evinizde', 'Celvo ile yaşam alanlarınızı premium tekstil ürünleriyle dönüştürün. En kaliteli kumaşlar, zarif tasarımlar ve kusursuz işçilik.', '1000+', 'Mutlu Müşteri', '%100', 'Kalite Garantisi'
WHERE NOT EXISTS (SELECT 1 FROM hero_content LIMIT 1);

-- 2. About Content Table (Hakkımızda)
CREATE TABLE IF NOT EXISTS about_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(500),
  slogan VARCHAR(255),
  brand_name VARCHAR(100),
  origin_title VARCHAR(255),
  origin_content TEXT,
  philosophy_title VARCHAR(255),
  philosophy_paragraph1 TEXT,
  philosophy_paragraph2 TEXT,
  target_title VARCHAR(255),
  target_content TEXT,
  target_subtitle VARCHAR(500),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Initial data for about
INSERT INTO about_content (title, slogan, brand_name, origin_title, origin_content, philosophy_title, philosophy_paragraph1, philosophy_paragraph2, target_title, target_content, target_subtitle)
SELECT 
  'Köklerden Zirveye: Başarıya Giden Sessiz Güç',
  'Rise in Silence.',
  'CÉLVO',
  'Köken ve Anlam',
  'CÉLVO, Latince iki güçlü kavramın birleşimiyle doğmuştur: "Celare" (gizlemek, örtmek) ve "Volare" (yükselmek, uçmak). Bu birleşimden çıkan anlam: "Sessizce yükselmek."',
  'Markanın Felsefesi',
  'CÉLVO, yaşamın temel direklerinden ilham alır; gösterişten, anlık parıltılardan ve yüzeysel gürültüden uzaktır. Marka, başarının kök salmakla başladığına, zirveye ulaşmanın ise sabırlı bir iç disiplin gerektirdiğine inanır.',
  'Bu, fırtınalı bir denizde bile sakinliğini koruyan, ancak her an yükselmeye hazır olan gizli bir gücün manifestosudur.',
  'CÉLVO Erkeği',
  'CÉLVO\'yu tercih eden erkek, sözlerin geçici, duruşun kalıcı olduğunu bilir. O, kendini kanıtlama çabasına girmez; neyi başardığını ve kim olduğunu, lüks sadeliği yansıtan tarzı, tavizsiz kalitesi ve doğal özgüveniyle çevresine sessizce hissettirir.',
  'Onun gücü, derinlikten ve gizli bir vizyondan gelir.'
WHERE NOT EXISTS (SELECT 1 FROM about_content LIMIT 1);

-- 3. Core Values Table (Temel Değerler)
CREATE TABLE IF NOT EXISTS core_values (
  id INT PRIMARY KEY AUTO_INCREMENT,
  icon VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- Initial core values
INSERT INTO core_values (icon, title, description, sort_order)
SELECT 'sparkles', 'Gizli Güç', 'Sessizce ilerleyen, derinlikten gelen güç', 1
WHERE NOT EXISTS (SELECT 1 FROM core_values WHERE sort_order = 1);

INSERT INTO core_values (icon, title, description, sort_order)
SELECT 'shield', 'Lüks Sadelik', 'Gösterişsiz zarafet ve tavizsiz kalite', 2
WHERE NOT EXISTS (SELECT 1 FROM core_values WHERE sort_order = 2);

INSERT INTO core_values (icon, title, description, sort_order)
SELECT 'trending-up', 'Öncü Başarı', 'Köklerden zirveye sabırlı yükseliş', 3
WHERE NOT EXISTS (SELECT 1 FROM core_values WHERE sort_order = 3);

INSERT INTO core_values (icon, title, description, sort_order)
SELECT 'award', 'Derin Öz Güven', 'İçten gelen doğal ve kalıcı güven', 4
WHERE NOT EXISTS (SELECT 1 FROM core_values WHERE sort_order = 4);

-- 4. Products Table (Ürünler)
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_path VARCHAR(500) NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Initial product (demo)
INSERT INTO products (image_path, name, category, sort_order)
SELECT '/images/demo.jpg', 'Premium Koleksiyon', 'Tekstil', 1
WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);

-- 5. Contact Info Table (İletişim Bilgileri)
CREATE TABLE IF NOT EXISTS contact_info (
  id INT PRIMARY KEY AUTO_INCREMENT,
  owner_name VARCHAR(255),
  phone_display VARCHAR(50),
  phone_link VARCHAR(50),
  email VARCHAR(255),
  address VARCHAR(500),
  instagram_url VARCHAR(500),
  instagram_handle VARCHAR(100),
  page_title VARCHAR(255),
  page_subtitle VARCHAR(500),
  form_title VARCHAR(255),
  form_subtitle VARCHAR(500),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Initial contact info
INSERT INTO contact_info (owner_name, phone_display, phone_link, email, address, instagram_url, instagram_handle, page_title, page_subtitle, form_title, form_subtitle)
SELECT 
  'Yusuf Tutar',
  '0506 700 08 27',
  '+905067000827',
  'info@celvo.com.tr',
  'Gaziantep / Şehitkamil',
  'https://www.instagram.com/celvowear/?igsh=bmhtNWpobDJkcG4x&utm_source=qr',
  '@celvowear',
  'Bize Ulaşın',
  'Sorularınız, önerileriniz veya siparişleriniz için bizimle iletişime geçin',
  'Mesaj Gönderin',
  'Formu doldurun, size en kısa sürede dönüş yapalım'
WHERE NOT EXISTS (SELECT 1 FROM contact_info LIMIT 1);

-- 6. Site Settings Table (Site Ayarları)
CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  site_name VARCHAR(100),
  tagline VARCHAR(255),
  slogan VARCHAR(255),
  description TEXT,
  logo_path VARCHAR(500),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Initial site settings
INSERT INTO site_settings (site_name, tagline, slogan, description, logo_path)
SELECT 'CÉLVO', 'Premium Tekstil', 'Rise in Silence.', 'Premium tekstil ürünleriyle yaşam alanlarınıza lüks ve zarafet katın. Sessizce yükselen gücün manifestosu.', '/logo.jpg'
WHERE NOT EXISTS (SELECT 1 FROM site_settings LIMIT 1);

-- 7. Admin Users Table (Admin Kullanıcıları)
CREATE TABLE IF NOT EXISTS admin_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  is_active TINYINT(1) DEFAULT 1,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Initial admin user (password: celvo2025)
INSERT INTO admin_users (username, password_hash, email)
SELECT 'admin', 'celvo2025', 'admin@celvo.com.tr'
WHERE NOT EXISTS (SELECT 1 FROM admin_users WHERE username = 'admin');

-- 8. Hero Images Table (Ana Sayfa Carousel Resimleri)
CREATE TABLE IF NOT EXISTS hero_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_path VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial hero image
INSERT INTO hero_images (image_path, alt_text, sort_order)
SELECT '/images/demo.jpg', 'Celvo Premium Tekstil', 1
WHERE NOT EXISTS (SELECT 1 FROM hero_images LIMIT 1);

-- Indexes for performance
CREATE INDEX idx_products_active ON products(is_active, sort_order);
CREATE INDEX idx_hero_images_active ON hero_images(is_active, sort_order);
CREATE INDEX idx_core_values_order ON core_values(sort_order);
