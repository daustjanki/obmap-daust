/**
 * Feature Registry Index
 * 
 * Registers all core features with the plugin registry.
 * This file bridges the old services structure with the new feature-sliced design.
 */

import { pluginRegistry } from '../plugin-registry';

// Import features from feature definition files (not barrels)
import { coreFeature } from '@/features/core/feature';
import { authFeature } from '@/features/auth/feature';
import { vaultFeature } from '@/features/vault/feature';
import { graphFeature } from '@/features/graph/feature';
import { syncFeature } from '@/features/sync/feature';
import { profileFeature } from '@/features/profile/feature';

// All available features
export const allFeatures = [
  coreFeature,
  authFeature,
  vaultFeature,
  graphFeature,
  syncFeature,
  profileFeature,
];

/**
 * Register all core features
 */
export function registerCoreFeatures(): void {
  console.log('[Features] Registering core features...');
  
  for (const feature of allFeatures) {
    pluginRegistry.register(feature);
  }
  
  console.log('[Features] All core features registered');
}

/**
 * Initialize all enabled features
 */
export async function initializeFeatures(): Promise<void> {
  console.log('[Features] Initializing all features...');
  await pluginRegistry.initializeAll();
  console.log('[Features] All features initialized');
}

/**
 * Cleanup all features
 */
export async function cleanupFeatures(): Promise<void> {
  console.log('[Features] Cleaning up all features...');
  await pluginRegistry.cleanupAll();
  console.log('[Features] All features cleaned up');
}

// Re-export individual features
export { coreFeature, authFeature, vaultFeature, graphFeature, syncFeature, profileFeature };
