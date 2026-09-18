/**
 * Core Services - Plugin Registry
 */

import React from 'react';

export interface RouteConfig {
  path: string;
  component: string;
  protected?: boolean;
}

export interface ServiceConfig {
  name: string;
  factory: () => Promise<any>;
  singleton?: boolean;
}

export type ComponentFactory = () => Promise<{ default: React.ComponentType<any> } | Record<string, React.ComponentType<any>>>;

export interface Feature {
  id: string;
  name: string;
  version: string;
  dependencies?: string[];
  services?: ServiceConfig[];
  components?: Record<string, ComponentFactory>;
  routes?: RouteConfig[];
  hooks?: Record<string, () => Promise<any>>;
  initialize?: () => Promise<void>;
  cleanup?: () => Promise<void>;
}

export type FeatureStatus = {
  enabled: boolean;
  initialized: boolean;
  error?: Error;
};

interface FeatureEntry {
  feature: Feature;
  status: FeatureStatus;
}

class PluginRegistry {
  private features: Map<string, FeatureEntry> = new Map();

  register(feature: Feature): void {
    if (this.features.has(feature.id)) {
      console.warn(`[PluginRegistry] Feature ${feature.id} already registered`);
      return;
    }

    this.features.set(feature.id, {
      feature,
      status: { enabled: true, initialized: false },
    });
  }

  async initializeAll(): Promise<void> {
    // Sort by dependencies
    const sorted = this.topologicalSort();
    
    for (const featureId of sorted) {
      const entry = this.features.get(featureId);
      if (!entry || !entry.status.enabled) continue;

      try {
        if (entry.feature.initialize) {
          await entry.feature.initialize();
        }
        entry.status.initialized = true;
      } catch (error) {
        entry.status.error = error instanceof Error ? error : new Error(String(error));
        console.error(`[PluginRegistry] Failed to initialize ${featureId}:`, error);
      }
    }
  }

  async cleanupAll(): Promise<void> {
    const sorted = this.topologicalSort().reverse();
    
    for (const featureId of sorted) {
      const entry = this.features.get(featureId);
      if (!entry || !entry.status.initialized) continue;

      try {
        if (entry.feature.cleanup) {
          await entry.feature.cleanup();
        }
        entry.status.initialized = false;
      } catch (error) {
        console.error(`[PluginRegistry] Failed to cleanup ${featureId}:`, error);
      }
    }
  }

  private topologicalSort(): string[] {
    const visited = new Set<string>();
    const result: string[] = [];

    const visit = (id: string) => {
      if (visited.has(id)) return;
      visited.add(id);

      const entry = this.features.get(id);
      if (entry?.feature.dependencies) {
        for (const dep of entry.feature.dependencies) {
          visit(dep);
        }
      }
      result.push(id);
    };

    for (const id of this.features.keys()) {
      visit(id);
    }

    return result;
  }

  get(id: string): Feature | undefined {
    return this.features.get(id)?.feature;
  }

  getStatus(id: string): FeatureStatus | undefined {
    return this.features.get(id)?.status;
  }

  getAll(): Feature[] {
    return Array.from(this.features.values()).map(e => e.feature);
  }

  getAllRoutes(): RouteConfig[] {
    const routes: RouteConfig[] = [];
    for (const entry of this.features.values()) {
      if (entry.status.enabled && entry.feature.routes) {
        routes.push(...entry.feature.routes);
      }
    }
    return routes;
  }

  getAllComponents(): Map<string, ComponentFactory> {
    const components = new Map<string, ComponentFactory>();
    for (const entry of this.features.values()) {
      if (entry.status.enabled && entry.feature.components) {
        for (const [name, factory] of Object.entries(entry.feature.components)) {
          components.set(name, factory);
        }
      }
    }
    return components;
  }

  getAllStatuses(): Array<FeatureStatus & { id: string }> {
    return Array.from(this.features.entries()).map(([id, entry]) => ({
      id,
      ...entry.status,
    }));
  }

  enable(id: string): void {
    const entry = this.features.get(id);
    if (entry) {
      entry.status.enabled = true;
    }
  }

  async disable(id: string): Promise<void> {
    const entry = this.features.get(id);
    if (entry) {
      if (entry.status.initialized && entry.feature.cleanup) {
        await entry.feature.cleanup();
      }
      entry.status.enabled = false;
      entry.status.initialized = false;
    }
  }

  isReady(id: string): boolean {
    const entry = this.features.get(id);
    return entry?.status.enabled === true && entry?.status.initialized === true;
  }
}

export const pluginRegistry = new PluginRegistry();
