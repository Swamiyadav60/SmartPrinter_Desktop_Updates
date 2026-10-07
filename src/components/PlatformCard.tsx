import type { PlatformMetadata, ReleaseInfo } from '../types/release';

interface PlatformCardProps {
  platform: PlatformMetadata;
  release: ReleaseInfo;
}

export default function PlatformCard({ platform, release }: PlatformCardProps) {
  const formatBytes = (bytes: number | null): string => {
    if (!bytes) return '';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-800">
            {platform.osBadge}
          </span>
          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-mono font-bold text-emerald-800 border border-emerald-200">
            {platform.architecture}
          </span>
        </div>

        {/* Card Title & Subtitle */}
        <h3 className="mt-4 text-lg font-bold text-slate-900 leading-snug">
          {platform.title}
        </h3>
        <p className="mt-1 text-xs text-slate-500 leading-relaxed">
          {platform.description}
        </p>

        {/* Technical Specification Grid */}
        <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs border border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Supported OS:</span>
            <span className="font-semibold text-slate-800 text-right">{platform.supportedWindows}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Electron Core:</span>
            <span className="font-mono font-semibold text-slate-700">{platform.electronVersion}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Update Channel:</span>
            <span className="font-mono text-[11px] text-slate-600 truncate max-w-[170px]" title={platform.channelPath}>
              {platform.channelPath}
            </span>
          </div>
        </div>

        {/* Live Release Information */}
        <div className="mt-4">
          {release.isLoading ? (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
              <span>Checking release feed...</span>
            </div>
          ) : release.isAvailable && release.version ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 text-xs">
              <div className="flex items-center justify-between font-bold text-emerald-900">
                <span>Version {release.version}</span>
                {release.fileSize && <span>{formatBytes(release.fileSize)}</span>}
              </div>
              {release.releaseDate && (
                <p className="mt-1 text-[11px] text-emerald-700">
                  Published on {formatDate(release.releaseDate)}
                </p>
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center text-xs text-slate-500">
              <span className="block font-medium">Release not available yet.</span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Channel feed: <code className="font-mono">{platform.channelPath}latest.yml</code>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Download Action Button */}
      <div className="mt-6 pt-3 border-t border-slate-100">
        {release.isAvailable && release.downloadUrl ? (
          <a
            href={release.downloadUrl}
            download
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-xs hover:bg-emerald-700 active:scale-[0.99] transition cursor-pointer text-center"
          >
            <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 20 20">
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
            <span>{platform.buttonText}</span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400 cursor-not-allowed text-center"
          >
            <span>Release not available yet</span>
          </button>
        )}
      </div>
    </div>
  );
}
