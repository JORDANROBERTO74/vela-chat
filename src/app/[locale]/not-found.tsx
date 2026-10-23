import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="font-serif text-2xl tracking-tight text-brand">vela</p>
      <h1 className="max-w-md font-serif text-3xl tracking-tight">
        This page does not exist. / Esta página no existe.
      </h1>
      <div className="flex items-center gap-3 text-sm">
        <Link
          href="/en"
          className="rounded-lg bg-brand px-4 py-2 font-medium text-white transition hover:bg-brand-strong"
        >
          English
        </Link>
        <Link
          href="/es"
          className="rounded-lg border border-line bg-surface px-4 py-2 font-medium text-ink transition hover:bg-brand-soft"
        >
          Español
        </Link>
      </div>
    </main>
  );
}
