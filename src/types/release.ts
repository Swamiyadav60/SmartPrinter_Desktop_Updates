export type PlatformKey = 'modern-x64' | 'modern-x86' | 'legacy-x64' | 'legacy-x86';

export interface PlatformMetadata {
  key: PlatformKey;
  title: string;
  subtitle: string;
  osBadge: string;
  supportedWindows: string;
  electronVersion: string;
  architecture: 'x64' | 'x86';
  channelPath: string;
  buttonText: string;
  description: string;
}

export interface ReleaseInfo {
  version: string | null;
  releaseDate: string | null;
  fileName: string | null;
  fileSize: number | null;
  downloadUrl: string | null;
  sha512: string | null;
  isAvailable: boolean;
  isLoading: boolean;
  error: string | null;
}
