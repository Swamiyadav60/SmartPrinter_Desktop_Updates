export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white py-10 text-xs text-slate-500">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-slate-800 text-sm">
              SmartPrinter Desktop Update Infrastructure
            </p>
            <p className="mt-1 text-slate-500">
              Official update feeds and binary repository for SmartPrinter Windows clients.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-mono text-slate-600">
              <span>Domain:</span>
              <strong className="text-slate-800">updates.smartprinter.in</strong>
            </span>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px]">
          <p>© {new Date().getFullYear()} Zayvion Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-600">
            <a href="/health" target="_blank" rel="noreferrer" className="hover:text-slate-900 underline">
              Health Status
            </a>
            <a href="https://smartprinter.in" target="_blank" rel="noreferrer" className="hover:text-slate-900 underline">
              SmartPrinter Web
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
