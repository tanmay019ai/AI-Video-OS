import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-2xl border border-border bg-surface-2 p-6 shadow-elevated backdrop-blur">
        <div className="text-xs font-semibold text-muted">Contact</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          Talk to the team
        </h1>
        <p className="mt-3 text-[15px] leading-6 text-muted">
          This is a frontend demo. Replace these details with your real support/sales flow.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface-1 p-4">
            <div className="text-sm font-semibold text-foreground">Sales</div>
            <div className="mt-1 text-sm text-muted">sales@cineos.ai</div>
          </div>
          <div className="rounded-2xl border border-border bg-surface-1 p-4">
            <div className="text-sm font-semibold text-foreground">Support</div>
            <div className="mt-1 text-sm text-muted">support@cineos.ai</div>
          </div>
        </div>

        <div className="mt-6 text-sm text-muted">
          Or explore <Link className="text-foreground underline" href="/pricing">Pricing</Link>.
        </div>
      </div>
    </div>
  );
}
