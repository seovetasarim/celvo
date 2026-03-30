/** Celvo iletişim — ürün / genel teklif mesajları için wa.me linkleri */
export const WHATSAPP_NUMBER = "905067000827";

const DEFAULT_MESSAGE = "Merhaba, fiyat teklifi almak istiyorum.";

export function whatsappHref(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
