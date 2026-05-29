import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "CELVO | Bayan Giyim Üretimi & Tasarım";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadLogo(): Promise<string | null> {
  try {
    const data = await readFile(join(process.cwd(), "public/cs-Photoroom.png"));
    return `data:image/png;base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const logoSrc = await loadLogo();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(120% 120% at 50% 0%, #1c1814 0%, #0c0a08 55%, #050403 100%)",
          position: "relative",
        }}
      >
        {/* Soft gold glow */}
        <div
          style={{
            position: "absolute",
            top: -180,
            width: 720,
            height: 720,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0) 70%)",
            display: "flex",
          }}
        />

        {/* Elegant double border frame */}
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "1px solid rgba(212,175,55,0.45)",
            borderRadius: 18,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 36,
            border: "1px solid rgba(212,175,55,0.18)",
            borderRadius: 12,
            display: "flex",
          }}
        />

        {/* Logo (image if available, otherwise styled wordmark) */}
        {logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoSrc}
            alt="Celvo"
            width={620}
            style={{ objectFit: "contain", marginBottom: 28 }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              fontSize: 150,
              fontWeight: 700,
              letterSpacing: 6,
              color: "#d4af37",
              marginBottom: 28,
            }}
          >
            CELVO
          </div>
        )}

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#e8d9a8",
            fontSize: 30,
            letterSpacing: 8,
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          <div style={{ width: 48, height: 1, background: "rgba(212,175,55,0.6)", display: "flex" }} />
          Bayan Giyim Üretimi & Tasarım
          <div style={{ width: 48, height: 1, background: "rgba(212,175,55,0.6)", display: "flex" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
