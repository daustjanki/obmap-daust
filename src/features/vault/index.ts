/**
 * Vault Feature Module
 */

export { vaultFeature } from './feature';

// Components
export { VaultCard } from './components/VaultCard';
export { VaultModeSelector } from './components/VaultModeSelector';
export { VaultRequiredGate } from './components/VaultRequiredGate';
export { VaultComparisonView } from './components/VaultComparisonView';
export { VaultBackupPanel } from './components/VaultBackupPanel';
export { VaultBackupSettings } from './components/VaultBackupSettings';
export { StorageStrategySelector } from './components/StorageStrategySelector';
export { ExportToFileSystem } from './components/ExportToFileSystem';

// Hooks
export { useVault } from './hooks/useVault';
export { useVaultEvents } from './hooks/useVaultEvents';
export { useVaultSync } from './hooks/useVaultSync';

// Services
export { VaultManager } from '@/services/vault/VaultManager';
export { getVaultManager } from '@/services/vault/VaultManagerSingleton';
export { VaultStorage } from '@/services/vault/VaultStorage';
export { VaultHistory } from '@/services/vault/VaultHistory';
export { VaultBackupService } from '@/services/vault/VaultBackupService';
export { VaultSyncService, vaultSyncService } from '@/services/vault/VaultSyncService';
export { CloudVaultService } from '@/services/vault/CloudVaultService';
export type { VaultData, VaultMetadata, StorageStrategy } from '@/services/vault/types';
