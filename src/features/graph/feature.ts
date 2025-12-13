/**
 * Graph Feature Definition
 */

import type { Feature } from '@/features/core/services/plugin-registry';

export const graphFeature: Feature = {
  id: 'graph',
  name: 'Graph Visualization',
  version: '1.0.0',
  dependencies: ['core', 'vault'],
  services: [
    { name: 'GraphService', factory: async () => { const { GraphService } = await import('@/services/graph/GraphService'); return new GraphService(); }, singleton: true },
    { name: 'RelationshipMapper', factory: async () => { const { RelationshipMapper } = await import('@/services/graph/RelationshipMapper'); return new RelationshipMapper(); }, singleton: true },
    { name: 'ZipImportService', factory: async () => { const { ZipImportService } = await import('@/services/graph/ZipImportService'); return new ZipImportService(); }, singleton: true },
  ],
  components: {
    NetworkGraph: () => import('./components/NetworkGraph'),
    NodePanel: () => import('./components/NodePanel'),
    BacklinksPanel: () => import('./components/BacklinksPanel'),
    LinkManager: () => import('./components/LinkManager'),
    DynamicLinkManager: () => import('./components/DynamicLinkManager'),
    GraphMiniMap: () => import('./components/GraphMiniMap'),
    MarkdownRenderer: () => import('./components/MarkdownRenderer'),
    GraphConfigPanel: () => import('./components/config-panel'),
  },
  routes: [],
  hooks: { useAutoLinks: () => import('./hooks/useAutoLinks') },
  initialize: async () => console.log('[GraphFeature] Initialized'),
  cleanup: async () => console.log('[GraphFeature] Cleaned up'),
};
