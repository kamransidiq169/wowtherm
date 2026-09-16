import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-ivory-100 px-6 text-center">
      <p className="text-eyebrow text-copper-500 mb-4">404</p>
      <h1 className="text-display-lg text-charcoal-900 mb-4">
        Page not found
      </h1>
      <p className="text-body-lg text-charcoal-500 mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-charcoal-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal-800"
      >
        Return home
      </Link>
    </section>
  );
}
