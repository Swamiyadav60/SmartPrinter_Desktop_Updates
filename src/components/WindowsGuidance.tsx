export default function WindowsGuidance() {
  return (
    <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-xs">
      <div className="max-w-3xl">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Which version should I install?
        </h2>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          SmartPrinter Desktop offers dedicated platform packages optimized for your specific Windows version and system architecture.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-[10px]">1</span>
              <span>Modern x64</span>
            </div>
            <p className="mt-2 text-slate-600 font-medium">
              For <strong>Windows 10 / Windows 11 (64-bit)</strong>.
            </p>
            <p className="mt-1 text-slate-400">
              Recommended for almost all newer computers, laptops, and kiosks running modern 64-bit Windows.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-[10px]">2</span>
              <span>Modern x86</span>
            </div>
            <p className="mt-2 text-slate-600 font-medium">
              For <strong>Windows 10 32-bit</strong>.
            </p>
            <p className="mt-1 text-slate-400">
              Tailored specifically for 32-bit installations of Windows 10 on budget or legacy-hardware kiosks.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-[10px]">3</span>
              <span>Legacy x64</span>
            </div>
            <p className="mt-2 text-slate-600 font-medium">
              For <strong>Windows 7 SP1, Windows 8, or Windows 8.1 (64-bit)</strong>.
            </p>
            <p className="mt-1 text-slate-400">
              Compatible with older 64-bit Windows environments that lack Windows 10 Action Center toasts.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-[10px]">4</span>
              <span>Legacy x86</span>
            </div>
            <p className="mt-2 text-slate-600 font-medium">
              For <strong>Windows 7 SP1, Windows 8, or Windows 8.1 (32-bit)</strong>.
            </p>
            <p className="mt-1 text-slate-400">
              Built natively for legacy 32-bit point-of-sale computers and early Windows 7/8 print stations.
            </p>
          </div>
        </div>

        {/* Important Windows 11 Note */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900">
          <span className="text-base shrink-0">ℹ️</span>
          <div>
            <strong className="font-bold block text-amber-950">Important Notice regarding Windows 11:</strong>
            <p className="mt-1 leading-relaxed">
              Windows 11 is available only as a 64-bit operating system. The x86 modern build is intended for 32-bit Windows 10.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
