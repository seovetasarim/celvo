import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.message) {
      return NextResponse.json(
        { ok: false, error: "Lütfen gerekli alanları doldurun" },
        { status: 400 }
      );
    }

    // Here you would:
    // 1. Send email notification
    // 2. Save to database
    // 3. Integrate with CRM
    // 4. Send auto-reply email to customer
    
    console.log("Teklif talebi alındı:", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, message: "Talebiniz alındı!" });
  } catch (error) {
    console.error("Teklif formu hatası:", error);
    return NextResponse.json(
      { ok: false, error: "Bir hata oluştu" },
      { status: 500 }
    );
  }
}



