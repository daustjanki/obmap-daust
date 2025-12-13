/**
 * Vault Feature Definition
 */

import type { Feature } from '@/features/core/services/plugin-registry';

export const vaultFeature: Feature = {
  id: 'vault',
  name: 'Vault Management',
  version: '1.0.0',
  dependencies: ['core'],
  services: [
    { name: 'VaultManager', factory: async () => { const { getVaultManager } = await import('@/services/vault/VaultManagerSingleton'); return getVaultManager(); }, singleton: true },
    { name: 'VaultStorage', factory: async () => { const { VaultStorage } = await import('@/services/vault/VaultStorage'); return new VaultStorage(); }, singleton: true },
    { name: 'VaultSyncService', factory: async () => { const { VaultSyncService } = await import('@/services/vault/VaultSyncService'); return new VaultSyncService(); }, singleton: true },
    { name: 'VaultBackupService', factory: async () => { const { VaultBackupService } = await import('@/services/vault/VaultBackupService'); return new VaultBackupService(); }, singleton: true },
  ],
  components: {
    VaultDashboard: () => import('@/pages/VaultDashboard'),
    VaultCard: () => import('./components/VaultCard'),
    VaultBackupPanel: () => import('./components/VaultBackupPanel'),
    VaultBackupSettings: () => import('./components/VaultBackupSettings'),
    VaultComparisonView: () => import('./components/VaultComparisonView'),
    VaultModeSelector: () => import('./components/VaultModeSelector'),
    VaultRequiredGate: () => import('./components/VaultRequiredGate'),
    StorageStrategySelector: () => import('./components/StorageStrategySelector'),
    ExportToFileSystem: () => import('./components/ExportToFileSystem'),
  },
  routes: [{ path: '/vaults', component: 'VaultDashboard', protected: true }],
  hooks: {
    useVault: () => import('./hooks/useVault'),
    useVaultSync: () => import('./hooks/useVaultSync'),
    useVaultEvents: () => import('./hooks/useVaultEvents'),
  },
  initialize: async () => console.log('[VaultFeature] Initialized'),
  cleanup: async () => console.log('[VaultFeature] Cleaned up'),
};
