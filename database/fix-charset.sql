-- CÉLVO Database Charset Fix
-- Türkçe karakter sorunu çözümü

-- Database'i UTF-8 yap
ALTER DATABASE celvocom_celvo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tüm tabloları UTF-8 yap
ALTER TABLE hero_content CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE about_content CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE core_values CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE products CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE contact_info CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE site_settings CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE admin_users CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE hero_images CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Verileri düzelt (eğer bozuksa yeniden ekle)
UPDATE hero_content SET 
  description = 'Celvo ile yaşam alanlarınızı premium tekstil ürünleriyle dönüştürün. En kaliteli kumaşlar, zarif tasarımlar ve kusursuz işçilik.'
WHERE id = 1;

UPDATE about_content SET
  origin_content = 'CÉLVO, Latince iki güçlü kavramın birleşimiyle doğmuştur: "Celare" (gizlemek, örtmek) ve "Volare" (yükselmek, uçmak). Bu birleşimden çıkan anlam: "Sessizce yükselmek."',
  philosophy_paragraph1 = 'CÉLVO, yaşamın temel direklerinden ilham alır; gösterişten, anlık parıltılardan ve yüzeysel gürültüden uzaktır. Marka, başarının kök salmakla başladığına, zirveye ulaşmanın ise sabırlı bir iç disiplin gerektirdiğine inanır.',
  philosophy_paragraph2 = 'Bu, fırtınalı bir denizde bile sakinliğini koruyan, ancak her an yükselmeye hazır olan gizli bir gücün manifestosudur.',
  target_content = 'CÉLVO\'yu tercih eden erkek, sözlerin geçici, duruşun kalıcı olduğunu bilir. O, kendini kanıtlama çabasına girmez; neyi başardığını ve kim olduğunu, lüks sadeliği yansıtan tarzı, tavizsiz kalitesi ve doğal özgüveniyle çevresine sessizce hissettirir.'
WHERE id = 1;












