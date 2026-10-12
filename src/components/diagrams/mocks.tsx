/**
 * Abstract UI previews used as visuals (decorative, aria-hidden).
 * They hint at real work without inventing product names or data.
 */

export function ProductMock() {
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-xl border border-white/10 bg-[#0b0e15] shadow-2xl shadow-black/50">
      <div className="flex h-8 items-center justify-between border-b border-white/[0.07] px-3">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-[4px] bg-gradient-to-br from-brand-violet to-brand-blue" />
          <span className="h-1.5 w-14 rounded-full bg-white/15" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-4 w-12 rounded-md border border-white/10" />
          <span className="size-4 rounded-full bg-white/10" />
        </div>
      </div>
      <div className="grid grid-cols-[64px_1fr] sm:grid-cols-[80px_1fr]">
        <div className="space-y-2.5 border-r border-white/[0.07] p-3">
          <span className="block h-1.5 w-full rounded-full bg-brand-violet/60" />
          <span className="block h-1.5 w-4/5 rounded-full bg-white/10" />
          <span className="block h-1.5 w-full rounded-full bg-white/10" />
          <span className="block h-1.5 w-3/5 rounded-full bg-white/10" />
          <span className="block h-1.5 w-4/5 rounded-full bg-white/10" />
        </div>
        <div className="p-3">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-2">
                <span className="block h-1 w-8 rounded-full bg-white/15" />
                <span className="mt-2 block h-2 w-10 rounded-full bg-white/25" />
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-lg border border-white/[0.07] bg-white/[0.02] p-2">
            <svg viewBox="0 0 220 64" className="h-16 w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="mock-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.4" />
                  <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 52 C20 48 30 40 50 42 S80 30 100 32 S130 18 150 22 S190 8 220 10 V64 H0Z"
                fill="url(#mock-area)"
              />
              <path
                d="M0 52 C20 48 30 40 50 42 S80 30 100 32 S130 18 150 22 S190 8 220 10"
                fill="none"
                stroke="#a78bfa"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          <div className="mt-2 space-y-1.5">
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center gap-2 rounded-md border border-white/[0.06] px-2 py-1.5">
                <span className="size-2 rounded-full bg-emerald-400/70" />
                <span className="h-1.5 w-20 rounded-full bg-white/15" />
                <span className="ml-auto h-1.5 w-8 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const k = "text-[#c4b5fd]"; // keyword
const f = "text-brand-sky"; // function / call
const s = "text-[#67e8f9]"; // string
const p = "text-subtle"; // punctuation

export function CodeMock() {
  const lines = [
    <>
      <span className={k}>export const</span> syncOrder <span className={p}>=</span> <span className={f}>flow</span>
      <span className={p}>(</span>
      <span className={s}>&quot;order.created&quot;</span>
      <span className={p}>)</span>
    </>,
    <>
      {"  "}
      <span className={p}>.</span>
      <span className={f}>step</span>
      <span className={p}>(</span>crm.findAccount<span className={p}>)</span>
    </>,
    <>
      {"  "}
      <span className={p}>.</span>
      <span className={f}>step</span>
      <span className={p}>(</span>erp.createInvoice<span className={p}>)</span>
    </>,
    <>
      {"  "}
      <span className={p}>.</span>
      <span className={f}>step</span>
      <span className={p}>(</span>ai.classifyPriority<span className={p}>)</span>
    </>,
    <>
      {"  "}
      <span className={p}>.</span>
      <span className={f}>notify</span>
      <span className={p}>(</span>
      <span className={s}>&quot;#ops&quot;</span>
      <span className={p}>);</span>
    </>,
  ];

  return (
    <div aria-hidden="true" className="overflow-hidden rounded-xl border border-white/10 bg-[#0b0e15] shadow-2xl shadow-black/50">
      <div className="flex h-8 items-center justify-between border-b border-white/[0.07] px-3 font-mono text-[10.5px]">
        <span className="rounded-md bg-white/[0.05] px-2 py-0.5 text-muted">orders.sync.ts</span>
        <span className="flex items-center gap-1.5 text-subtle">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          deployed
        </span>
      </div>
      <pre className="overflow-hidden p-3 font-mono text-[9.5px] leading-6 text-fg sm:text-[11.5px]">
        <code>
          {lines.map((line, i) => (
            <span key={i} className="block whitespace-pre">
              <span className="mr-4 inline-block w-3 text-right text-white/20 select-none">{i + 1}</span>
              {line}
            </span>
          ))}
        </code>
      </pre>
      <div className="flex items-center gap-2 border-t border-white/[0.07] px-3 py-2 font-mono text-[10.5px]">
        {["crm", "erp", "ai", "notify"].map((step, i) => (
          <span key={step} className="flex items-center gap-2">
            {i > 0 ? <span className="h-px w-3 bg-white/20 sm:w-5" /> : null}
            <span className="rounded border border-white/10 px-1.5 py-0.5 text-muted">{step}</span>
          </span>
        ))}
        <span className="ml-auto text-emerald-400/90">✓</span>
      </div>
    </div>
  );
}
