/**
 * Core Services - Dependency Injection Container
 */

export const ServiceIds = {
  VaultManager: 'VaultManager',
  GraphService: 'GraphService',
  VaultStorage: 'VaultStorage',
  VaultSyncService: 'VaultSyncService',
  VaultBackupService: 'VaultBackupService',
  RelationshipMapper: 'RelationshipMapper',
  ZipImportService: 'ZipImportService',
  BackgroundSyncService: 'BackgroundSyncService',
  ApiKeyService: 'ApiKeyService',
} as const;

type ServiceId = typeof ServiceIds[keyof typeof ServiceIds];

class Container {
  private services: Map<string, any> = new Map();
  private factories: Map<string, () => any> = new Map();

  register<T>(id: ServiceId, factory: () => T): void {
    this.factories.set(id, factory);
  }

  registerInstance<T>(id: ServiceId, instance: T): void {
    this.services.set(id, instance);
  }

  get<T>(id: ServiceId): T {
    if (this.services.has(id)) {
      return this.services.get(id) as T;
    }

    const factory = this.factories.get(id);
    if (factory) {
      const instance = factory();
      this.services.set(id, instance);
      return instance as T;
    }

    throw new Error(`Service ${id} not found in container`);
  }

  has(id: ServiceId): boolean {
    return this.services.has(id) || this.factories.has(id);
  }

  clear(): void {
    this.services.clear();
    this.factories.clear();
  }
}

export const container = new Container();
