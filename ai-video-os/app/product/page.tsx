export default function ProductPage() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-2xl border border-border bg-surface-2 p-6 shadow-elevated backdrop-blur">
        <div className="text-xs font-semibold text-muted">Product</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          What we provide
        </h1>
        <p className="mt-3 text-[15px] leading-6 text-muted">
          A premium AI video SaaS frontend: brand system, auth shell, generation feedback, credits/plan patterns, and polished loading states.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface-1 p-4">
            <div className="text-sm font-semibold text-foreground">Landing + dashboard hybrid</div>
            <div className="mt-1 text-sm text-muted">Marketing context with a real workspace preview.</div>
          </div>
          <div className="rounded-2xl border border-border bg-surface-1 p-4">
            <div className="text-sm font-semibold text-foreground">Richer feedback loops</div>
            <div className="mt-1 text-sm text-muted">Script → Scenes → Rendering with status + progress.</div>
          </div>
          <div className="rounded-2xl border border-border bg-surface-1 p-4">
            <div className="text-sm font-semibold text-foreground">Loading & skeleton system</div>
            <div className="mt-1 text-sm text-muted">Shimmer skeleton cards, overlays, disabled states.</div>
          </div>
          <div className="rounded-2xl border border-border bg-surface-1 p-4">
            <div className="text-sm font-semibold text-foreground">Scalable components</div>
            <div className="mt-1 text-sm text-muted">Composable UI ready for real APIs and billing.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
