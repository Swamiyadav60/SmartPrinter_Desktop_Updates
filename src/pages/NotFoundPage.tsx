import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-700 shadow-xs mb-4">
        🔍
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        Page Not Found
      </h1>
      <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-sm">
        The requested resource or release page could not be found on the SmartPrinter Update Server.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Link
          to="/"
          className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition"
        >
          Return to Downloads
        </Link>
        <Link
          to="/releases"
          className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          View Channels
        </Link>
      </div>
    </div>
  );
}
