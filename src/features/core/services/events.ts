/**
 * Core Services - Events
 */

import { EventEmitter } from 'events';

export const EventType = {
  VAULT_CREATED: 'vault:created',
  VAULT_DELETED: 'vault:deleted',
  VAULT_SAVED: 'vault:saved',
  VAULT_RENAMED: 'vault:renamed',
  VAULT_SWITCHED: 'vault:switched',
  GRAPH_UPDATED: 'graph:updated',
  NODE_SELECTED: 'node:selected',
  NODE_UPDATED: 'node:updated',
  NODE_DELETED: 'node:deleted',
  FEATURE_ENABLED: 'feature:enabled',
  FEATURE_DISABLED: 'feature:disabled',
} as const;

export type EventTypeValue = typeof EventType[keyof typeof EventType];

class TypedEventBus extends EventEmitter {
  emit(event: EventTypeValue | string, ...args: any[]): boolean {
    return super.emit(event, ...args);
  }

  on(event: EventTypeValue | string, listener: (...args: any[]) => void): this {
    return super.on(event, listener);
  }

  off(event: EventTypeValue | string, listener: (...args: any[]) => void): this {
    return super.off(event, listener);
  }
}

export const eventBus = new TypedEventBus();

// Helper functions for emitting typed events
export const emitVaultCreated = (vaultId: string, name: string) => 
  eventBus.emit(EventType.VAULT_CREATED, { vaultId, name, timestamp: Date.now() });

export const emitVaultDeleted = (vaultId: string) => 
  eventBus.emit(EventType.VAULT_DELETED, { vaultId, timestamp: Date.now() });

export const emitVaultSaved = (vaultId: string) => 
  eventBus.emit(EventType.VAULT_SAVED, { vaultId, timestamp: Date.now() });

export const emitVaultRenamed = (vaultId: string, oldName: string, newName: string) => 
  eventBus.emit(EventType.VAULT_RENAMED, { vaultId, oldName, newName, timestamp: Date.now() });

export const emitVaultSwitched = (vaultId: string | null) => 
  eventBus.emit(EventType.VAULT_SWITCHED, { vaultId, timestamp: Date.now() });

export const emitGraphUpdated = (vaultId: string, nodeCount: number, linkCount: number) => 
  eventBus.emit(EventType.GRAPH_UPDATED, { vaultId, nodeCount, linkCount, timestamp: Date.now() });
