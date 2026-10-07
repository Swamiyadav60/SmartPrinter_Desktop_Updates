import { PLATFORMS } from '../services/releaseService';

export default function ReleasesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <section className="max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Release Channels &amp; Architecture
        </h1>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          SmartPrinter Desktop maintains four permanently isolated auto-update channels. Each client query routes to its specific feed to prevent cross-architecture contamination.
        </p>
      </section>

      {/* Channels Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Platform Channel</th>
                <th className="px-5 py-3.5">Target Windows</th>
                <th className="px-5 py-3.5">Arch</th>
                <th className="px-5 py-3.5">Electron</th>
                <th className="px-5 py-3.5">Update URL Feed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {PLATFORMS.map((p) => (
                <tr key={p.key} className="hover:bg-slate-50/60 transition">
                  <td className="px-5 py-4 font-bold text-slate-900">
                    {p.title}
                  </td>
                  <td className="px-5 py-4">
                    {p.supportedWindows}
                  </td>
                  <td className="px-5 py-4 font-mono font-semibold text-emerald-700">
                    {p.architecture}
                  </td>
                  <td className="px-5 py-4 font-mono text-slate-600">
                    {p.electronVersion}
                  </td>
                  <td className="px-5 py-4 font-mono text-slate-800">
                    <a
                      href={`${p.channelPath}latest.yml`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 hover:text-emerald-900 underline"
                    >
                      https://updates.smartprinter.in{p.channelPath}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Auto-Update Protocol Details */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 text-xs">
        <h2 className="text-base font-bold text-slate-900">
          How Electron Auto-Updates Work
        </h2>
        <p className="text-slate-600 leading-relaxed">
          Installed SmartPrinter Desktop clients poll their assigned channel feed for <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">latest.yml</code>.
          When a new version is published:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-slate-600 leading-relaxed">
          <li>
            <strong>Feed Inspection:</strong> The client reads the version number, SHA-512 cryptographic hash, and installer filename from <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">latest.yml</code>.
          </li>
          <li>
            <strong>Delta &amp; Blockmap Download:</strong> The client downloads the binary payload. If <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">.blockmap</code> is present, differential range downloads are used.
          </li>
          <li>
            <strong>Integrity Check:</strong> The client verifies the SHA-512 hash before execution.
          </li>
          <li>
            <strong>Silent Background Update:</strong> The new version is staged and applied upon restarting the application or service.
          </li>
        </ol>
      </section>
    </div>
  );
}
