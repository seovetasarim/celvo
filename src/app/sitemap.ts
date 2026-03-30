import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Ana Sayfa
    {
      url: 'https://celvo.com.tr',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // Koleksiyon
    {
      url: 'https://celvo.com.tr/koleksiyon',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Hakkımızda
    {
      url: 'https://celvo.com.tr/hakkimizda',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Tanıtım Videosu
    {
      url: 'https://celvo.com.tr/tanitim-videosu',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // İletişim
    {
      url: 'https://celvo.com.tr/iletisim',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Yasal Sayfalar
    {
      url: 'https://celvo.com.tr/kvkk',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://celvo.com.tr/kullanim-kosullari',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://celvo.com.tr/gizlilik-politikasi',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}



