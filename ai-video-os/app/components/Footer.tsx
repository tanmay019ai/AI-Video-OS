import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 py-10 text-sm sm:grid-cols-2 sm:px-6 lg:px-8">
        <div>
          <div className="text-sm font-semibold text-foreground">CineOS</div>
          <div className="mt-2 max-w-md text-sm text-muted">
            Premium cinematic UI for AI video generation. Built with Next.js, Tailwind, and Framer Motion.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <Link className="rounded-2xl px-3 py-2 text-muted hover:bg-surface-2 hover:text-foreground" href="/product">
            Product
          </Link>
          <Link className="rounded-2xl px-3 py-2 text-muted hover:bg-surface-2 hover:text-foreground" href="/pricing">
            Pricing
          </Link>
          <Link className="rounded-2xl px-3 py-2 text-muted hover:bg-surface-2 hover:text-foreground" href="/contact">
            Contact
          </Link>
        </div>

        <div className="text-xs text-muted sm:col-span-2">
          © {new Date().getFullYear()} CineOS. Demo UI only.
        </div>
      </div>
    </footer>
  );
}
