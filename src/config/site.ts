const FALLBACK_URL = "https://vela-chat-theta.vercel.app";

function resolveSiteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return (value && value.length > 0 ? value : FALLBACK_URL).replace(/\/+$/, "");
}

export const site = {
  name: "Vela",
  domain: "vela.chat",
  url: resolveSiteUrl(),
} as const;
