import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts");

export default async function OpengraphImage() {
  const [semibold, mono] = await Promise.all([
    readFile(join(fontDir, "geist-sans/Geist-SemiBold.ttf")),
    readFile(join(fontDir, "geist-mono/GeistMono-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#05060a",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(79,125,255,0.30), transparent 55%), radial-gradient(circle at 100% 100%, rgba(139,92,246,0.22), transparent 50%), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 100% 100%, 56px 56px, 56px 56px",
          color: "#eef0f5",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="9" fill="#0d1018" />
            <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" stroke="rgba(255,255,255,0.14)" />
            <path
              d="M7 10.5 11.5 21.5 16 13.5 20.5 21.5 25 10.5"
              stroke="#8a8cff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="7" cy="10.5" r="2.1" fill="#6f97ff" />
            <circle cx="16" cy="13.5" r="2.1" fill="#9b7bff" />
            <circle cx="25" cy="10.5" r="2.1" fill="#38d9f5" />
          </svg>
          <div style={{ fontSize: 40, letterSpacing: "-0.02em" }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 86, lineHeight: 1, letterSpacing: "-0.05em" }}>
            Build. Integrate.&nbsp;
            <span
              style={{
                backgroundImage: "linear-gradient(100deg, #8fb0ff 0%, #a78bfa 50%, #67e8f9 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Automate.
            </span>
          </div>
          <div style={{ marginTop: 32, fontSize: 32, color: "#a3a9b8", letterSpacing: "-0.01em", maxWidth: 900 }}>
            Senior-led engineering for integrations, AI, and software products.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            fontFamily: "Geist Mono",
            fontSize: 20,
            letterSpacing: "0.14em",
            color: "#7f8696",
          }}
        >
          {["SAAS", "AI", "INTEGRATIONS", "WEB", "MOBILE", "AUTOMATION"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: semibold, style: "normal", weight: 600 },
        { name: "Geist Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
