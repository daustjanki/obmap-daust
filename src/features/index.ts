/**
 * Features Index
 * 
 * Central registry for all feature modules.
 * This follows Feature-Sliced Design (FSD) architecture.
 */

// Feature definitions
export { coreFeature } from './core/feature';
export { authFeature } from './auth/feature';
export { vaultFeature } from './vault/feature';
export { graphFeature } from './graph/feature';
export { syncFeature } from './sync/feature';
export { profileFeature } from './profile/feature';

// All features array for registration
import { coreFeature } from './core/feature';
import { authFeature } from './auth/feature';
import { vaultFeature } from './vault/feature';
import { graphFeature } from './graph/feature';
import { syncFeature } from './sync/feature';
import { profileFeature } from './profile/feature';

export const allFeatures = [
  coreFeature,
  authFeature,
  vaultFeature,
  graphFeature,
  syncFeature,
  profileFeature,
];
