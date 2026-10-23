import { notFound } from "next/navigation";
import { ChatApp } from "@/components/chat/chat-app";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <ChatApp dict={getDictionary(locale)} locale={locale} />;
}
