import { useState, useEffect } from 'react';
import PlatformCard from '../components/PlatformCard';
import WindowsGuidance from '../components/WindowsGuidance';
import { PLATFORMS, fetchChannelRelease } from '../services/releaseService';
import type { PlatformKey, ReleaseInfo } from '../types/release';

export default function DownloadsPage() {
  const [releases, setReleases] = useState<Record<PlatformKey, ReleaseInfo>>({
    'modern-x64': { version: null, releaseDate: null, fileName: null, fileSize: null, downloadUrl: null, sha512: null, isAvailable: false, isLoading: true, error: null },
    'modern-x86': { version: null, releaseDate: null, fileName: null, fileSize: null, downloadUrl: null, sha512: null, isAvailable: false, isLoading: true, error: null },
    'legacy-x64': { version: null, releaseDate: null, fileName: null, fileSize: null, downloadUrl: null, sha512: null, isAvailable: false, isLoading: true, error: null },
    'legacy-x86': { version: null, releaseDate: null, fileName: null, fileSize: null, downloadUrl: null, sha512: null, isAvailable: false, isLoading: true, error: null },
  });

  useEffect(() => {
    let isMounted = true;

    async function loadReleases() {
      const results = await Promise.all(
        PLATFORMS.map(async (p) => {
          const info = await fetchChannelRelease(p.channelPath);
          return { key: p.key, info };
        })
      );

      if (isMounted) {
        setReleases((prev) => {
          const updated = { ...prev };
          for (const item of results) {
            updated[item.key] = item.info;
          }
          return updated;
        });
      }
    }

    void loadReleases();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Official Desktop Releases</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          SmartPrinter Desktop
        </h1>

        <p className="text-base text-slate-600 leading-relaxed">
          Download the latest SmartPrinter Desktop application for your Windows system.
        </p>
      </section>

      {/* Four Platform Cards Grid */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {PLATFORMS.map((platform) => (
          <PlatformCard
            key={platform.key}
            platform={platform}
            release={releases[platform.key]}
          />
        ))}
      </section>

      {/* Which version should I install? Section */}
      <WindowsGuidance />
    </div>
  );
}
