/**
 * Shared Module - Central export point for all shared functionality
 */

// UI Components
export * from './ui';

// Stores
export * from './stores';

// Utils
export * from './lib';

// Services
export { FileSystemService } from './services/FileSystemService';
export { importExportService } from './services/ImportExportService';
export { exportGraphToZip, downloadZip } from './services/graph-export';
export { extractWikilinks, extractTags, extractMentions, parseMarkdownContent, processWikilinks } from './services/markdown-parser';
export type { WikiLink, ParsedContent } from './services/markdown-parser';
export { isOffline, isServiceWorkerReady, getCacheStorageInfo, formatBytes, clearAllCaches, prefetchResources, logCacheStatus } from './services/offline-storage';

// Integrations
export { supabase } from './integrations/supabase/client';
export type { Database } from './integrations/supabase/types';
