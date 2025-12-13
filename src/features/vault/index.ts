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
export { VaultManager } from './services/VaultManager';
export { getVaultManager } from './services/VaultManagerSingleton';
export { VaultStorage } from './services/VaultStorage';
export { VaultHistory } from './services/VaultHistory';
export { VaultBackupService } from './services/VaultBackupService';
export { VaultSyncService, vaultSyncService } from './services/VaultSyncService';
export { CloudVaultService } from './services/CloudVaultService';
export type { VaultData, VaultMetadata, StorageStrategy } from './services/types';
