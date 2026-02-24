import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="rounded-2xl border border-border bg-surface-2 p-6 shadow-elevated backdrop-blur">
        <div className="text-xs font-semibold text-muted">Pricing</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          Plans built for creators
        </h1>
        <p className="mt-3 text-[15px] leading-6 text-muted">
          Demo pricing UI—wire this to checkout later.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface-1 p-5">
            <div className="text-sm font-semibold text-foreground">Starter</div>
            <div className="mt-1 text-2xl font-semibold text-foreground">$19</div>
            <div className="mt-1 text-sm text-muted">For exploring the workflow</div>
            <div className="mt-4 text-sm text-muted">• 120 credits / month</div>
            <div className="mt-1 text-sm text-muted">• Basic styles</div>
            <div className="mt-1 text-sm text-muted">• Standard queue</div>
            <div className="mt-5">
              <Link href="/login" className="inline-flex w-full">
                <div className="w-full rounded-2xl border border-border bg-surface-2 px-4 py-2 text-center text-sm font-semibold text-foreground hover:bg-surface-1">
                  Choose Starter
                </div>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface-1 p-5 shadow-elevated">
            <div className="text-sm font-semibold text-foreground">Pro</div>
            <div className="mt-1 text-2xl font-semibold text-foreground">$49</div>
            <div className="mt-1 text-sm text-muted">For consistent publishing</div>
            <div className="mt-4 text-sm text-muted">• 600 credits / month</div>
            <div className="mt-1 text-sm text-muted">• Priority queue</div>
            <div className="mt-1 text-sm text-muted">• More styles</div>
            <div className="mt-5">
              <Link href="/login" className="inline-flex w-full">
                <div className="w-full rounded-2xl bg-brand-primary px-4 py-2 text-center text-sm font-semibold text-background hover:opacity-95">
                  Choose Pro
                </div>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface-1 p-5">
            <div className="text-sm font-semibold text-foreground">Studio</div>
            <div className="mt-1 text-2xl font-semibold text-foreground">Custom</div>
            <div className="mt-1 text-sm text-muted">For teams + pipelines</div>
            <div className="mt-4 text-sm text-muted">• SSO / roles</div>
            <div className="mt-1 text-sm text-muted">• Dedicated capacity</div>
            <div className="mt-1 text-sm text-muted">• SLA</div>
            <div className="mt-5">
              <Link href="/contact" className="inline-flex w-full">
                <div className="w-full rounded-2xl border border-border bg-surface-2 px-4 py-2 text-center text-sm font-semibold text-foreground hover:bg-surface-1">
                  Contact sales
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
