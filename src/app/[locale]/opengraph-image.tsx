import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export const alt = "Vela — a quieter place to think";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

let fontsPromise: Promise<{ manrope: Buffer; newsreader: Buffer }> | null =
  null;

function loadFonts(): Promise<{ manrope: Buffer; newsreader: Buffer }> {
  fontsPromise ??= Promise.all([
    readFile(path.join(process.cwd(), "src/assets/Manrope-Regular.ttf")),
    readFile(path.join(process.cwd(), "src/assets/Newsreader-Regular.ttf")),
  ]).then(([manrope, newsreader]) => ({ manrope, newsreader }));

  return fontsPromise;
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  const { manrope, newsreader } = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f8f5ef",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "Manrope",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -140,
            top: -180,
            width: 560,
            height: 560,
            borderRadius: 999,
            backgroundColor: "#e7efec",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="9" fill="#1f5c54" />
            <path
              d="M16.4 7.2v16.2"
              stroke="#f8f5ef"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path d="M16.4 8.6c4.6 2.3 7 6.5 7 11.4h-7z" fill="#f8f5ef" />
            <path
              d="M15.1 11.6c-3.4 2-5.3 5-5.3 8.4h5.3z"
              fill="#f8f5ef"
              opacity="0.7"
            />
            <path
              d="M8.8 24.2h15.2"
              stroke="#f8f5ef"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 7,
              textTransform: "uppercase",
              color: "#6f6a60",
              display: "flex",
            }}
          >
            {dict.common.tagline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Newsreader",
              fontSize: 168,
              lineHeight: 1,
              letterSpacing: -5,
              color: "#1c1b18",
              display: "flex",
            }}
          >
            vela.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 38,
              lineHeight: 1.35,
              color: "#4f4a42",
              maxWidth: 820,
              display: "flex",
            }}
          >
            {dict.empty.subtitle}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#6f6a60" }}>
          vela.chat
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Manrope",
          data: manrope,
          style: "normal",
          weight: 400,
        },
        {
          name: "Newsreader",
          data: newsreader,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
