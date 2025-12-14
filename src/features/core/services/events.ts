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
  VAULT_OPENED: 'vault:opened',
  VAULT_SYNC_COMPLETE: 'vault:sync_complete',
  GRAPH_UPDATED: 'graph:updated',
  NODE_SELECTED: 'node:selected',
  NODE_CREATED: 'node:created',
  NODE_UPDATED: 'node:updated',
  NODE_DELETED: 'node:deleted',
  NODE_MOVED: 'node:moved',
  NOTE_CREATED: 'note:created',
  NOTE_UPDATED: 'note:updated',
  NOTE_SYNC_REQUESTED: 'note:sync_requested',
  FOLDER_CREATED: 'folder:created',
  UNDO_PERFORMED: 'undo:performed',
  REDO_PERFORMED: 'redo:performed',
  FEATURE_ENABLED: 'feature:enabled',
  FEATURE_DISABLED: 'feature:disabled',
} as const;

export type EventTypeValue = typeof EventType[keyof typeof EventType];

// Domain event interface for typed events
export interface DomainEvent<T = any> {
  type: EventTypeValue;
  payload: T;
  timestamp: number;
  vaultId?: string;
}

class TypedEventBus extends EventEmitter {
  emit(event: EventTypeValue | string, payload?: any): boolean {
    return super.emit(event, payload);
  }

  on(event: EventTypeValue | string, listener: (...args: any[]) => void): this {
    return super.on(event, listener);
  }

  off(event: EventTypeValue | string, listener: (...args: any[]) => void): this {
    return super.off(event, listener);
  }

  subscribe<T = any>(event: EventTypeValue | string, listener: (event: DomainEvent<T>) => void): () => void {
    const wrappedListener = (payload: T) => {
      listener({
        type: event as EventTypeValue,
        payload,
        timestamp: Date.now(),
      });
    };
    this.on(event, wrappedListener);
    return () => this.off(event, wrappedListener);
  }
}

export const eventBus = new TypedEventBus();

// Helper functions for emitting typed events
export const emitVaultCreated = (payload: { vaultId: string; vaultName: string; storageStrategy?: string }) => 
  eventBus.emit(EventType.VAULT_CREATED, payload);

export const emitVaultDeleted = (payload: { vaultId: string; wasCloudVault?: boolean }) => 
  eventBus.emit(EventType.VAULT_DELETED, payload);

export const emitVaultSaved = (vaultId: string) => 
  eventBus.emit(EventType.VAULT_SAVED, { vaultId, timestamp: Date.now() });

export const emitVaultRenamed = (payload: { vaultId: string; oldName: string; newName: string }) => 
  eventBus.emit(EventType.VAULT_RENAMED, payload);

export const emitVaultSwitched = (vaultId: string | null) => 
  eventBus.emit(EventType.VAULT_SWITCHED, { vaultId, timestamp: Date.now() });

export const emitGraphUpdated = (vaultId: string, nodeCount: number, linkCount: number) => 
  eventBus.emit(EventType.GRAPH_UPDATED, { vaultId, nodeCount, linkCount, timestamp: Date.now() });
