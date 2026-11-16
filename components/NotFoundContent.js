import Link from 'next/link';

export default function NotFoundContent() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-6 py-32">
      <div className="text-center">
        <div className="font-display text-[7rem] font-semibold leading-none tracking-tightest text-accent sm:text-[10rem]">404</div>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary">Back to home</Link>
          <Link href="/contact" className="btn-ghost">Contact us</Link>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
          <Link href="/services" className="link-underline hover:text-ink">Services</Link>
          <Link href="/portfolio" className="link-underline hover:text-ink">Portfolio</Link>
          <Link href="/blog" className="link-underline hover:text-ink">Blog</Link>
          <Link href="/free-audit" className="link-underline hover:text-ink">Free Audit</Link>
        </div>
      </div>
    </section>
  );
}