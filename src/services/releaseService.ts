import yaml from 'js-yaml';
import type { PlatformMetadata, ReleaseInfo } from '../types/release';

export const PLATFORMS: PlatformMetadata[] = [
  {
    key: 'modern-x64',
    title: 'Modern Windows — 64-bit',
    subtitle: 'Primary build for modern 64-bit PCs',
    osBadge: 'Windows 10 / Windows 11',
    supportedWindows: 'Windows 10 (64-bit), Windows 11',
    electronVersion: '31.7.7',
    architecture: 'x64',
    channelPath: '/desktop/x64/',
    buttonText: 'Download SmartPrinter Desktop',
    description: 'Optimized for modern 64-bit systems with Windows 10/11 Action Center notifications.',
  },
  {
    key: 'modern-x86',
    title: 'Modern Windows — 32-bit',
    subtitle: 'For 32-bit installations of Windows 10',
    osBadge: 'Windows 10 32-bit',
    supportedWindows: 'Windows 10 (32-bit only)',
    electronVersion: '31.7.7',
    architecture: 'x86',
    channelPath: '/desktop/x86/',
    buttonText: 'Download SmartPrinter Desktop',
    description: 'Designed natively for 32-bit Windows 10 machines (Windows 11 is 64-bit only).',
  },
  {
    key: 'legacy-x64',
    title: 'Legacy Windows — 64-bit',
    subtitle: 'For older 64-bit Windows systems',
    osBadge: 'Windows 7 / 8 / 8.1 (64-bit)',
    supportedWindows: 'Windows 7 SP1 (x64), Windows 8 (x64), Windows 8.1 (x64)',
    electronVersion: '22.3.27',
    architecture: 'x64',
    channelPath: '/desktop/legacy/x64/',
    buttonText: 'Download SmartPrinter Desktop Legacy',
    description: 'Built with Chromium 108 & .NET 6 for Windows 7/8/8.1 with system tray notification fallback.',
  },
  {
    key: 'legacy-x86',
    title: 'Legacy Windows — 32-bit',
    subtitle: 'For older 32-bit Windows systems',
    osBadge: 'Windows 7 / 8 / 8.1 (32-bit)',
    supportedWindows: 'Windows 7 SP1 (32-bit), Windows 8 (32-bit), Windows 8.1 (32-bit)',
    electronVersion: '22.3.27',
    architecture: 'x86',
    channelPath: '/desktop/legacy/x86/',
    buttonText: 'Download SmartPrinter Desktop Legacy',
    description: 'Dedicated 32-bit build for older kiosks running Windows 7/8/8.1 32-bit editions.',
  },
];

interface LatestYmlStructure {
  version?: string;
  path?: string;
  files?: Array<{ url: string; size?: number; sha512?: string }>;
  sha512?: string;
  releaseDate?: string;
}

export async function fetchChannelRelease(channelPath: string): Promise<ReleaseInfo> {
  const url = `${channelPath.endsWith('/') ? channelPath : channelPath + '/'}latest.yml`;

  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) {
      return {
        version: null,
        releaseDate: null,
        fileName: null,
        fileSize: null,
        downloadUrl: null,
        sha512: null,
        isAvailable: false,
        isLoading: false,
        error: null,
      };
    }

    const text = await res.text();
    const data = yaml.load(text) as LatestYmlStructure;

    if (!data || !data.version) {
      return {
        version: null,
        releaseDate: null,
        fileName: null,
        fileSize: null,
        downloadUrl: null,
        sha512: null,
        isAvailable: false,
        isLoading: false,
        error: 'Invalid release manifest',
      };
    }

    const fileName = data.path || (data.files && data.files[0]?.url) || null;
    const fileSize = data.files && data.files[0]?.size ? data.files[0].size : null;
    const downloadUrl = fileName ? `${channelPath.endsWith('/') ? channelPath : channelPath + '/'}${encodeURIComponent(fileName)}` : null;

    return {
      version: data.version,
      releaseDate: data.releaseDate || null,
      fileName,
      fileSize,
      downloadUrl,
      sha512: data.sha512 || (data.files && data.files[0]?.sha512) || null,
      isAvailable: true,
      isLoading: false,
      error: null,
    };
  } catch {
    return {
      version: null,
      releaseDate: null,
      fileName: null,
      fileSize: null,
      downloadUrl: null,
      sha512: null,
      isAvailable: false,
      isLoading: false,
      error: null,
    };
  }
}
