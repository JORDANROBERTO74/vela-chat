const FALLBACK_URL = "https://vela-chat.vercel.app";

function resolveSiteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return (value && value.length > 0 ? value : FALLBACK_URL).replace(/\/+$/, "");
}

export const site = {
  name: "Vela",
  legalName: "Vela Labs",
  domain: "vela.chat",
  url: resolveSiteUrl(),
  email: "hello@vela.chat",
  social: {
    x: "https://x.com/velachat",
    github: "https://github.com/velachat",
  },
} as const;
